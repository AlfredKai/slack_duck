# https://api.slack.com/methods/conversations.history#arg_channel
from api.request import request


def conversation_history(token, channel_id, cursor=None):
    result = request('GET', '/api/conversations.history',
                     token=token, channel=channel_id, cursor=cursor)
    print(f'get messages {len(result["messages"])}')
    return result
