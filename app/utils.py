import imageio
# import nibabel as nib  # for nii.gz
import SimpleITK as io  # for .mha
from app import app
from flask import url_for
from keras.models import load_model
from scipy.ndimage import zoom
from functools import partial
from keras.optimizers import Adam
import numpy as np
from keras import backend as K
K.set_image_dim_ordering('tf')
K.set_image_data_format('channels_first')


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
    f._setattr('name', 'label{0}_dice_coef'.format(label_index))
    return f


dice_coef = dice_coefficient
dice_coef_loss = dice_coefficient_loss

model = load_model(app.config['MODEL'], custom_objects={'dice_coefficient':dice_coef,'dice_coefficient_loss': dice_coef_loss})


def make_gif(PATH):
    # For .mha
    img = io.ReadImage(PATH)
    img = io.GetArrayFromImage(img)

    # For .nii.gz
    # img = nib.load(PATH)
    # img = img.get_fdata()

    def get(i, axes):
        if axes == 0:
            img1 = img[i, :, :]
            img1[0, 0] = 1
        elif axes == 1:
            img1 = img[:, i, :]
            img1[0, 0] = 1
        elif axes == 2:
            img1 = img[:, :, i]
            img1[0, 0] = 1
        return img1

    path = app.config['UPLOAD_FOLDER']
    imageio.mimsave(f'{path}/gifs/x.gif',
                    [get(i, axes=0) for i in range(img.shape[0])], fps=20)
    imageio.mimsave(f'{path}/gifs/y.gif',
                    [get(i, axes=1) for i in range(img.shape[1])], fps=20)
    imageio.mimsave(f'{path}/gifs/z.gif',
                    [get(i, axes=2) for i in range(img.shape[2])], fps=20)

    pad = zoom(img, (.776, .5, .5))
    img_out = model.predict(pad[None, None, ...]).squeeze()

    path = app.config['UPLOAD_FOLDER']
    imageio.mimsave(f'{path}/gifs/x_out.gif',
                    [get(i, axes=0) for i in range(img_out.shape[0])], fps=20)
    imageio.mimsave(f'{path}/gifs/y_out.gif',
                    [get(i, axes=1) for i in range(img_out.shape[1])], fps=20)
    imageio.mimsave(f'{path}/gifs/z_out.gif',
                    [get(i, axes=2) for i in range(img_out.shape[2])], fps=20)
