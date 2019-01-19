from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
mail = Mail(app)

# Flask-Login provides a very useful feature that forces users
# to log in before they can view certain pages of the application.
# For this feature to be implemented, Flask-Login needs to know
# what is the view function that handles logins.
login.login_view = 'login'

# 'app' below is our package (named app) and not the Flask object defined above
from app import routes, models
# routes module is imported at the bottom and not at the top of the script
# as it is always done. The bottom import is a workaround to circular imports,
# a common problem with Flask applications. You are going to see that the
# routes module needs to import the app variable defined in this script,
# so putting one of the reciprocal imports at the bottom avoids
# the error that results from the mutual references between these two files.
