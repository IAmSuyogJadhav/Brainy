from app import app
from flask import render_template, flash, redirect, url_for, request, send_from_directory
from werkzeug import secure_filename
from app.utils import make_gif, read_img, save_nii
import os
import re
import numpy as np


@app.route('/')
@app.route('/index')
def index():
    files = [file for file in os.listdir(app.config['UPLOAD_FOLDER'])
             if file.endswith('.mmri')]
    return render_template('index.html', title='Home', files=files)


@app.route('/upload')
def upload_file():
    return render_template('upload.html', title='Upload the MRI files')


@app.route('/uploader', methods=['POST'])
def upload_file_():
    cause = ''  # For catching specific cause of error
    modalities = ['t1', 't2w', 't1ce', 'flair']
    pat = re.compile(r'[^\.]*\.(.*)')
    formats = {m: pat.findall(request.files[m].filename)[0] for m in modalities}
    if request.method == 'POST':
        try:
            cause = 'while uploading the files. Ensure that the files'
            ' are accessible and try again. '
            for m in modalities:
                f = request.files[m]
                f.save(
                 os.path.join(
                   app.config['UPLOAD_FOLDER'],
                   secure_filename(f"{request.form['name']}_{m}.{formats[m]}")
                   )
                )
            flash('Files were uploaded succesfully.')

            cause = 'while exporting the files into a single multimodal-MRI'
            ' (.mmri) file. Make sure the uploaded files are valid MRI files'
            ' and try again.'
            img = np.array(
             [
               read_img(
                 os.path.join(
                   app.config['UPLOAD_FOLDER'],
                   secure_filename(f"{request.form['name']}_{m}.{formats[m]}")
                 )
               )
               for m in modalities
             ]
            )

            np.save(os.path.join(
              app.config['UPLOAD_FOLDER'],
              secure_filename(f"{request.form['name']}")
            ), img)

            os.rename(
                os.path.join(
                    app.config['UPLOAD_FOLDER'],
                    secure_filename(f"{request.form['name']}.npy")
                    ),
                os.path.join(
                    app.config['UPLOAD_FOLDER'],
                    secure_filename(f"{request.form['name']}.mmri")
                    )
                )
            cause = 'while cleaning up the temporary files. Make sure this '
            f'path is accessible and try again:{app.config["UPLOAD_FOLDER"]}'
            [os.remove(
              os.path.join(
                app.config['UPLOAD_FOLDER'],
                f'{request.form["name"]}_{m}.{formats[m]}'
                )
            ) for m in modalities]

            cause = None

        except Exception as e:
            flash(
                f'An error occured {cause}' if cause is not None else
                'An unknown error occured.')
            return f"""<div class="w3-container">
              <h1 class="w3-xxxlarge w3-text-black"><b>Sorry Something Went Wrong.</b></h1>
              <hr style="width:50px;border:5px solid red" class="w3-round">
              <p>An error occured while uploading the MRI files. See below for more info.</p>
              <br />
              <h3 class="w3-xlarge w3-text-black"><b>Error Text:</b></h3>
              <hr>
              <p> {e} </p>
              <a href='/upload'><h3 class="w3-xlarge w3-text-black">
                <b>&lt; Go back and try again.</b></h3></a>
            </div>"""
        return redirect(url_for('index'))
    return redirect(url_for('index'))


@app.route('/analyze', methods=['GET', 'POST'])
def analyze():
    if request.method == 'POST':
        file = request.form.get('files_dropdown')
        print(file)
        print(app.config["UPLOAD_FOLDER"])
        # try:
        out_file = make_gif(file)
        success = True
        error = None
        # except Exception as e:
        #     success = False
        #     error = str(e)

        return render_template('analyze.html', title='Results', success=success,
                               file=out_file, error=error, folder=app.config["UPLOAD_FOLDER"])
    elif request.method == 'GET':
        if app.config['TESTING_ANALYZE']:
            return render_template('analyze.html', title='Testing Analyze', success=True,
                                   file='Test', error='error', folder=app.config["UPLOAD_FOLDER"])
        else:
            flash('Select a MMRI file from the list or add your own to get the prediction result.')
            return redirect(url_for('index'))


@app.route('/download-mask/<file>/<mod>', methods=['GET'])
def download(file, mod):
    if request.method == 'GET':
        mods = {'t1': 0, 't2': 1, 't1ce': 2, 'flair':3}

        img = np.load(f'{app.config["UPLOAD_FOLDER"]}/{file}.npy')
        save = img[mods[mod]]
        name = f'{file[:-5]}_{mod}.nii.gz'
        save_nii(save, name)
        return redirect(url_for('static', filename=app.config['EXPORT_FOLDER_REL']+name), code=301)
