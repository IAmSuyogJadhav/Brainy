import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = 'secret'
    TEMPLATES_AUTO_RELOAD = True
    UPLOAD_FOLDER = './app/static/images'
    EXPORT_FOLDER = './app/static/images/exported'
    EXPORT_FOLDER_REL = 'images/exported/'
    MAX_CONTENT_PATH = 5e6
    TESTING_ANALYZE = os.environ.get('TESTING_ANALYZE', 0)

    DEBUG = True
    MODEL = './app/static/models/Model_1.h5'
