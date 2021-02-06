import sys
sys.path.append("../slack_archaeologist")
from website_model import Website
from model.message import Message
from model.user import User
from flask import Flask, request
import click
import bcrypt


app = Flask(__name__, static_folder='../slack_timemachine/build',
            static_url_path='/')


def model_list(func):
    def wrapper():
        return {func.__name__: list(map(lambda x: x.__dict__, func()))}
    globals()['wrapper'] = wrapper
    wrapper.__name__ = 'wrapper_' + func.__name__
    return wrapper


@app.route('/users')
@model_list
def users():
    return User.get_users()


@app.route('/messages')
@model_list
def messages():
    params = {}
    for key, val in request.args.items():
        if key in ('limit', 'offset'):
            params[key] = val
    return Message.get_messages(**params)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/enter',  methods=['POST'])
def enter():
    data = request.get_json(force=True)
    if bcrypt.checkpw(data['password'].encode(), Website.get_password()):
        return {"ok": True}
    else:
        return {"ok": False}


@app.cli.command("set_pwd")
@click.argument("password")
def set_pwd(password):
    Website.drop_table()
    Website.create_table()
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    Website(hashed).save()
    Website.commit()
