from model.dbconnection import connection, Dbconnection
import config


class Channel(Dbconnection):

    table_name = 'channel'

    def __init__(self, id, name, topic, description, creator, create_ts):
        self.id = id
        self.name = name
        self.topic = topic
        self.description = description
        self.creator = creator
        self.create_ts = create_ts

    @classmethod
    def create_table(cls):
        create_table = f"CREATE TABLE {cls.table_name} (\
                            id VARCHAR(50) PRIMARY KEY,\
                            name VARCHAR(50),\
                            topic TEXT,\
                            description TEXT, \
                            creator VARCHAR(50), \
                            create_ts TIMESTAMP \
                            )"
        connection.cursor().execute(create_table)

    @classmethod
    def get_channel_info(cls):
        query = f'SELECT * FROM {cls.table_name}' # support only one channel for now
        data = connection.cursor().execute(query).fetchone()
        return Channel(*data)
