import imageio
import SimpleITK as sitk
from app import app
from keras.models import load_model
from scipy.ndimage import zoom
from functools import partial
import tensorflow as tf
import numpy as np
from keras import backend as K
import cv2
import os
from multiprocessing.pool import ThreadPool

K.set_image_dim_ordering('tf')
K.set_image_data_format('channels_first')


def read_img(img_path):
    return sitk.GetArrayFromImage(sitk.ReadImage(img_path))


def preprocess(img, out_shape=None, labels=False):
    if out_shape is not None:
        factors = (out_shape[0] / 155, out_shape[1] / 240, out_shape[2] / 240)
        img_ = zoom(img, factors)
    else:
        img_ = img.copy()

    if not labels:
        mean = img_.mean()
        std = img_.std()
        img_ = (img_ - mean) / std
    return img_


def postprocess(mask):
    kernel = np.ones((3, 3))
    for i in range(mask.shape[0]):
        for j in range(mask.shape[1]):
            mask[i, j, ...] = cv2.dilate(mask[i, j, ...], kernel, iterations=1)


def dice_coefficient(y_true, y_pred, smooth=1.):
    y_true_f = K.flatten(y_true)
    y_pred_f = K.flatten(y_pred)
    intersection = K.sum(y_true_f * y_pred_f)
    return (2. * intersection + smooth) / (K.sum(y_true_f) + K.sum(y_pred_f) + smooth)


def dice_coefficient_loss(y_true, y_pred):
    return -dice_coefficient(y_true, y_pred)


def weighted_dice_coefficient(y_true, y_pred, axis=(-3, -2, -1), smooth=0.00001):
    """
    Weighted dice coefficient. Default axis assumes a "channels first" data structure
    :param smooth:
    :param y_true:
    :param y_pred:
    :param axis:
    :return:
    """
    return K.mean(2. * (K.sum(y_true * y_pred,
                              axis=axis) + smooth/2)/(K.sum(y_true,
                                                            axis=axis) + K.sum(y_pred,
                                                                               axis=axis) + smooth))


def weighted_dice_coefficient_loss(y_true, y_pred):
    return -weighted_dice_coefficient(y_true, y_pred)


def label_wise_dice_coefficient(y_true, y_pred, label_index):
    return dice_coefficient(y_true[:, label_index], y_pred[:, label_index])


def get_label_dice_coefficient_function(label_index):
    f = partial(label_wise_dice_coefficient, label_index=label_index)
    f.__setattr__('__name__', 'label_{0}_dice_coef'.format(label_index))
    return f


dice_coef = dice_coefficient
dice_coef_loss = dice_coefficient_loss


def load_old_model(model_file):
    print("Loading pre-trained model")
    custom_objects = {'dice_coefficient_loss': dice_coefficient_loss, 'dice_coefficient': dice_coefficient,
                      'dice_coef': dice_coef, 'dice_coef_loss': dice_coef_loss,
                      'weighted_dice_coefficient': weighted_dice_coefficient,
                      'weighted_dice_coefficient_loss': weighted_dice_coefficient_loss}
    try:
        from keras_contrib.layers import InstanceNormalization
        custom_objects["InstanceNormalization"] = InstanceNormalization
    except ImportError:
        pass
    try:
        return load_model(model_file, custom_objects=custom_objects)
    except ValueError as error:
        if 'InstanceNormalization' in str(error):
            raise ValueError(str(error) + "\n\nPlease install keras-contrib to use InstanceNormalization:\n"
                                          "'pip install git+https://www.github.com/keras-team/keras-contrib.git'")
        else:
            raise error


def predict(img):
    global model, graph
    with graph.as_default():
        pred = model.predict(img[None, ...]).squeeze() >= 0.5
    return pred


def make_gif(file):
    global model, graph
    pred = []
    if 'model' not in globals():
        model = load_old_model(app.config['MODEL'])
        graph = tf.get_default_graph()

    img = np.load(f'{app.config["UPLOAD_FOLDER"]}/{file}')
    img = np.array([
        preprocess(img[m],  out_shape=(80, 96, 64), labels=True)
        for m in range(4)
        ])
    # Setting labels to True so that normalization doesn't happen right away
    # and make the GIFs look bad.

    def get(i, image):
        img1 = image[2][i, ...]
        img1[0, 0] = 1
        return img1

    path = app.config['UPLOAD_FOLDER']
    imageio.mimsave(f'{path}/gifs/t1.gif',
                    [get(i, img) for i in range(img[0].shape[0])], fps=10)
    imageio.mimsave(f'{path}/gifs/t2.gif',
                    [get(i, img) for i in range(img[1].shape[0])], fps=10)
    imageio.mimsave(f'{path}/gifs/t1ce.gif',
                    [get(i, img) for i in range(img[2].shape[0])], fps=10)
    imageio.mimsave(f'{path}/gifs/flair.gif',
                    [get(i, img) for i in range(img[3].shape[0])], fps=10)

    blob = preprocess(img)
    pool = ThreadPool(processes=1)
    pred = pool.apply(predict, (blob,))

    path = app.config['UPLOAD_FOLDER']

    # Coloring the segmentation
    colors=[
        np.array([255, 0, 0], dtype=np.uint8),  # NCR/NET: label 1, slice no. 0
        np.array([0, 255, 0], dtype=np.uint8),  # ED: label 2, slice no. 1
        np.array([0, 0, 255], dtype=np.uint8)  # ET: label 4, slice no. 2
    ]

    img_out = np.stack([img, img, img], axis=-1).astype(np.uint8)

    masks = np.stack([pred, pred, pred], axis=-1).astype(np.uint8)
    for i in range(3):
        color = colors[i]
        masks[i] *= color

    alpha = 0.4
    for m in range(img_out.shape[0]):
        for i in range(3):
            cv2.addWeighted(masks[i], alpha, img_out[m], 1-alpha, 0, img_out[m])

    imageio.mimsave(f'{path}/gifs/t1_seg.gif',
                    [get(i, img_out) for i in range(img_out[0].shape[0])], fps=10)
    imageio.mimsave(f'{path}/gifs/t2_seg.gif',
                    [get(i, img_out) for i in range(img_out[1].shape[0])], fps=10)
    imageio.mimsave(f'{path}/gifs/t1ce_seg.gif',
                    [get(i, img_out) for i in range(img_out[2].shape[0])], fps=10)
    imageio.mimsave(f'{path}/gifs/flair_seg.gif',
                    [get(i, img_out) for i in range(img_out[3].shape[0])], fps=10)

    name = f'{file[:-5]}_mask'
    np.save(os.path.join(app.config['UPLOAD_FOLDER'], name), img_out)

    pred = []
    return name


def save_nii(file, name):
    """
    Saves input numpy array in nii.gz file.
    """
    dir = app.config['EXPORT_FOLDER']

    writer = sitk.ImageFileWriter()
    os.makedirs(dir, exist_ok=True)
    path = os.path.join(dir, f'{name}.nii.gz' if not name.endswith('nii.gz') else name)
    writer.SetFileName(path)
    writer.Execute(sitk.GetImageFromArray(file))
    print(f"Succesfully saved {path}")
