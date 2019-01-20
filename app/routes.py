from app import app, db
from app.forms import LoginForm, RegistrationForm
from flask import render_template, flash, redirect, url_for, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User
from werkzeug.urls import url_parse
from werkzeug import secure_filename
from app.utils import make_gif
import os

# Routes are assigned to handlers (called view functions) using app.route
# decorator. You can map the same function to more than one routes too.


@app.route('/')
@app.route('/index')
@login_required  # To force login
def index():
    files = [file for file in os.listdir(app.config['UPLOAD_FOLDER'])
             if file.endswith('.mha')]
    return render_template('index.html', title='Home', files=files)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid Username or Password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)

        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)

    return render_template('login.html', title='Sign-In', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('You have registered succesfully! Now login to continue.')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


@app.route('/upload')
def upload_file():
    return render_template('upload.html', title='Upload an MRI file')


@app.route('/uploader', methods=['POST'])
def upload_file_():
    if request.method == 'POST':
        f = request.files['file']
        f.save(os.path.join(app.config['UPLOAD_FOLDER'],
                            secure_filename(f.filename)))
        flash('File uploaded succesfully.')
        return redirect(url_for('index'))
    return redirect(url_for('index'))


@app.route('/analyze', methods=['GET', 'POST'])
def analyze():
    if request.method == 'POST':
        file = request.form.get('files_dropdown')
        print(file)
        print(app.config["UPLOAD_FOLDER"])
        try:
            make_gif(f'{app.config["UPLOAD_FOLDER"]}/{file}')
            success = True
            error = None
        except Exception as e:
            success = False
            error = str(e)

        return render_template('analyze.html', title='Results', success=success,
                               error=error, folder=app.config["UPLOAD_FOLDER"])


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))
