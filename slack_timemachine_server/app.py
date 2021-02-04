from flask import Flask, request
import sys
sys.path.append("../slack_archaeologist")
from model.user import User
from model.message import Message

from config import wellcome_message

app = Flask(__name__)


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
def hello_world():
    return wellcome_message
