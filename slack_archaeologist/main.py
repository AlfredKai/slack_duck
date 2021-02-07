import time

from api import conversation
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
        data, cursor = conversation.history(config.token, config.channel_id, cursor)
        print(cursor)
        first_msg = data[0]
        print('first message', time.strftime('%Y-%m-%d %H:%M:%S',
                                             time.localtime(float(first_msg["ts"]))), first_msg['text'])
        print(cursor)
        def save_messages(messages, is_thread):
            nonlocal count
            for msg in messages:
                Message(None,
                        msg["ts"],
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
                    data, cursor = conversation.replies(config.token, config.channel_id, msg['thread_ts'])
                    save_messages(data, True)

        save_messages(data, False)

        if not cursor:
            break

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
