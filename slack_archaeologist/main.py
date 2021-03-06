import time

from api import conversation
from api.user_info import user_info
from model.message import Message
from model.user import User
from model.channel import Channel

import config


def save_channel_history(token, channel_id):
    Message.drop_table()
    Message.create_table()

    cursor = None
    count = 0

    while True:
        data, cursor = conversation.history(token, channel_id, cursor)
        first_msg = data[0]
        print('first message', time.strftime('%Y-%m-%d %H:%M:%S',
                                             time.localtime(float(first_msg["ts"]))), first_msg['text'])

        def save_messages(messages, is_thread):
            nonlocal count
            for msg in messages:
                Message(None,
                        msg["ts"],
                        channel_id,
                        msg.get('user', None),
                        msg.get('bot_id', None),
                        msg.get('subtype', None),
                        msg["text"],
                        msg.get('icons', {}).get('image_64', None),
                        msg.get('username', None),
                        msg.get('thread_ts', None),
                        is_thread
                        ).save()
                count += 1

                if 'thread_ts' in msg and not is_thread:
                    data, cursor = conversation.replies(
                        token, channel_id, msg['thread_ts'])
                    save_messages(data, True)

        save_messages(data, False)

        if not cursor:
            break

    Message.commit()
    print(f'saved {count} messages.')


def save_users(token, user_ids):
    User.drop_table()
    User.create_table()

    count = 0

    for id in user_ids:
        data = user_info(token, id)
        user = data['user']
        profile = user['profile']
        if user['name'] == 'hikaru4':
            profile['title'] = '我是阿光|負責搜尋/站內推薦|我愛管閒事脾氣不好但很有耐心低'
        User(user['id'], user['name'], profile['title'],
             profile['real_name'], profile['display_name'], profile.get('image_original', None), profile['image_48']).save()
        count += 1

    User.commit()
    print(f'saved {count} users.')


def save_channel_info(token, channel_id):
    Channel.drop_table()
    Channel.create_table()

    data = conversation.info(token, channel_id)

    Channel(data['id'], data['name'], data['topic']['value'],
            data['purpose']['value'], data['creator'], data['created']).save()
    Channel.commit()

    print(f'saved channel info.')


save_channel_info(config.token, config.channel_id)
save_channel_history(config.token, config.channel_id)
save_users(config.token, Message.get_user_ids())
