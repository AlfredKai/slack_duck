import time

from api.conversation_history import conversation_history
from api.user_info import user_info
from model.message import Message
from model.user import User

import config


def save_channel_history():
    Message.drop_table()
    Message.create_table()

    cursor = None
    count = 0

    while True:
        data = conversation_history(config.token, config.channel_id, cursor)
        first_msg = data["messages"][0]
        print('first message', time.strftime('%Y-%m-%d %H:%M:%S',
                            time.localtime(float(first_msg["ts"]))), first_msg['text'])

        for msg in data['messages']:
            Message(None, msg["ts"], msg.get('user', None), msg.get(
                'bot_id', None), msg.get('subtype', None), msg["text"]).save()
            count += 1

        if 'response_metadata' not in data or 'next_cursor' not in data['response_metadata']:
            break
        cursor = data['response_metadata']['next_cursor']

    Message.commit()
    print(f'saved {count} messages.')


def save_users(user_ids):
    User.drop_table()
    User.create_table()

    count = 0

    for id in user_ids:
        data = user_info(config.token, id)
        user = data['user']
        profile = user['profile']
        if user['name'] == 'hikaru4':
            profile['title'] = '我是阿光|負責搜尋/站內推薦|我愛管閒事脾氣不好但很有耐心低'
        User(user['id'], user['name'], profile['title'],
             profile['real_name'], profile['display_name'], profile.get('image_original', None), profile['image_48']).save()
        count += 1

    User.commit()
    print(f'saved {count} users.')


save_channel_history()
save_users(Message.get_user_ids())
