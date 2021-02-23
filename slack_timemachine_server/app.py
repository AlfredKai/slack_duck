import sys

from flask.globals import session
sys.path.append("../slack_archaeologist")
import bcrypt
import click
import functools
import config
from collections import defaultdict
from flask import Flask, request
from model.channel import Channel
from model.user import User
from model.message import Message
from website_model import Website


app = Flask(__name__, static_folder='../slack_timemachine/build',
            static_url_path='/')

app.secret_key = config.app_secret_key

def model_list(func):
    @functools.wraps(func)
    def wrapper():
        return {func.__name__: list(map(lambda x: x.__dict__, func()))}
    return wrapper


def auth_required(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if 'auth' not in session or not session['auth']:
            return {}, 401
        return func(*args, **kwargs)
    return wrapper


@app.route('/users')
@auth_required
@model_list
def users():
    return User.get_users()


@app.route('/messages')
@auth_required
def messages():
    params = {}
    for key, val in request.args.items():
        if key in ('limit', 'offset'):
            params[key] = val

    thread_tss = []
    messages = Message.get_messages(**params)
    for msg in messages:
        thread_tss.append(msg.thread_ts)

    reply_users = defaultdict(set)
    reply_counts = defaultdict(int)
    for reply in Message.get_replies(thread_tss):
        if reply.is_thread:
            reply_users[reply.thread_ts].add(reply.user_id)
            reply_counts[reply.thread_ts] += 1

    resp = {'messages': []}
    for msg in messages:
        if 'thread_ts' in msg.__dict__ and msg.thread_ts != None:
            temp = msg.__dict__
            temp['reply_count'] = reply_counts[msg.thread_ts]
            temp['reply_users'] = list(reply_users[msg.thread_ts])
            resp['messages'].append(temp)
        else:
            resp['messages'].append(msg.__dict__)

    return resp


@app.route('/replies')
@auth_required
@model_list
def replies():
    thread_ts = request.args.get('thread_ts', None)

    return Message.get_replies([thread_ts])


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/enter',  methods=['POST'])
def enter():
    data = request.get_json(force=True)
    if bcrypt.checkpw(data['password'].encode(), Website.get_password()):
        session['auth'] = True 
        return {"ok": True}
    else:
        return {"ok": False}


@app.route('/channel_info')
@auth_required
def get_channel_info():
    return {"channel": Channel.get_channel_info().__dict__}


@app.route('/visit', methods=['POST'])
def update_visit_count():
    Website.update_visit_count()
    return {"ok": True}


@app.route('/visit')
def get_visit_count():
    return {"visit_count": Website.get_visit_count()}


# flask set_pwd xxx
@app.cli.command("set_pwd")
@click.argument("password")
def set_pwd(password):
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    Website.set_password(hashed)


@app.cli.command("clear_website")
def clear_website():
    Website.drop_table()
    Website.create_table()
