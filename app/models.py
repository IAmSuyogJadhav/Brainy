from app import db, login
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# UserMixin adds the methods needed by flask_login for the User class
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # The user_id field was initialized as a foreign key to user.id,
    # which means that it references an id value from the users table.
    # In this reference the user part is the name of the database table
    # for the model. It is an unfortunate inconsistency that in some instances
    # such as in a db.relationship() call, the model is referenced by the model
    # class, which typically starts with an uppercase character, while in other
    # cases such as this db.ForeignKey() declaration, a model is given by its
    # database table name, for which SQLAlchemy automatically uses
    # lowercase characters and, for multi-word model names, snake case.

    def __repr__(self):
        return f'<Post {self.body}>'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))

    # Because Flask-Login knows nothing about databases,
    # it needs the application's help in loading a user.
    # For that reason, the extension expects that the application
    # will configure a user loader function, that can be called to
    # load a user given the ID.
    # The user loader is registered using the @login.user_loader decorator
