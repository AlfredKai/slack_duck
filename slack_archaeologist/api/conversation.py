from api.request import request


# https://api.slack.com/methods/conversations.history
def history(token, channel_id, cursor=None):
    result = request('GET', '/api/conversations.history',
                     token=token, channel=channel_id, cursor=cursor)
    print(f'get messages {len(result)}')
    return result['messages'], result['response_metadata']['next_cursor'] if 'response_metadata' in result and 'next_cursor' in result['response_metadata'] else None


# https://api.slack.com/methods/conversations.replies
def replies(token, channel_id, ts, cursor=None):
    result = request('GET', '/api/conversations.replies',
                     token=token, channel=channel_id, cursor=cursor, ts=ts)
    print(f'get replies {len(result["messages"]) - 1}')
    return result['messages'][1:], result['response_metadata']['next_cursor'] if 'response_metadata' in result and 'next_cursor' in result['response_metadata'] else None
