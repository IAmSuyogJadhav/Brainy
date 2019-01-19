import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'

    # The value of the secret key is set as an expression with two terms,
    # joined by the or operator. The first term looks for the value of an
    # environment variable, also called SECRET_KEY. The second term, is
    # just a hardcoded string.
    # The idea is that a value sourced from an environment variable is
    # preferred, but if the environment does not define the variable,
    # then the hardcoded string is used instead.
    # When you are developing this application, the security requirements
    # are low, so you can just ignore this setting and let the hardcoded
    # string be used. But when this application is deployed
    # on a production server, I will be setting a unique and difficult
    # to guess value in the environment, so that the server has a secure
    # key that nobody else knows.

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMYTRACK_MODIFICATIONS = False

    # For mailing
    MAIL_SERVER = 'smtp.googlemail.com'  # default
    MAIL_PORT = 587
    MAIL_USE_TLS = 1
    MAIL_USE_SSL = 0  # default
    # MAIL_DEBUG = app.debug  # default
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = None  # default
    MAIL_MAX_EMAILS = None  # default
    # MAIL_SUPPRESS_SEND = app.testing   # default
    MAIL_ASCII_ATTACHMENTS = False  # default
