# https://api.slack.com/methods/users.info#arg_user

from api.request import request


def user_info(token, user_id):
    result = request('GET', '/api/users.info',
                     token=token, user=user_id)
    return result
