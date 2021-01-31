import http.client
import json


connection = http.client.HTTPSConnection("slack.com", 443)


def dict2query_params(params):
    query_params = '?'
    for key, val in params.items():
        if not val:
            continue
        if query_params != '?':
            query_params += '&'
        query_params += key + '=' + val
    return query_params


def request(method, url, **kwargs):
    params = dict2query_params(kwargs)
    connection.request(method, url+params)
    response = connection.getresponse()
    print(f'{method} {url+params} \nstatus: {response.status} reason: {response.reason}')
    data_str = response.read().decode()
    return json.loads(data_str)
