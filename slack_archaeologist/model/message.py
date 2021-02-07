from model.dbconnection import connection, Dbconnection


class Message(Dbconnection):

    table_name = 'message'

    def __init__(self, id, ts, user_id, bot_id, subtype, text, img_64, username, thread_ts, is_thread):
        self.id = id
        self.ts = ts
        self.user_id = user_id
        self.bot_id = bot_id
        self.subtype = subtype
        self.text = text
        self.img_64 = img_64
        self.username = username
        self.thread_ts = thread_ts
        self.is_thread = is_thread

    @classmethod
    def create_table(cls):
        create_table = f"CREATE TABLE {cls.table_name} (\
                            id INTEGER PRIMARY KEY AUTOINCREMENT,\
                            ts TIMESTAMP,\
                            user_id VARCHAR(50),\
                            bot_id VARCHAR(50), \
                            subtype VARCHAR(50), \
                            text TEXT, \
                            img_64 TEXT, \
                            username VARCHAR(50), \
                            thread_ts TIMESTAMP, \
                            is_thread INT2 \
                            )"
        connection.cursor().execute(create_table)

    @classmethod
    def get_user_ids(cls):
        query = f'SELECT DISTINCT user_id FROM {cls.table_name} WHERE user_id IS NOT NULL'
        return list(map(lambda x: x[0], connection.cursor().execute(query).fetchall()))

    @classmethod
    def get_messages(cls, offset=0, limit=20):
        query = f'SELECT * FROM {cls.table_name} order by ts LIMIT ?, ?'
        return list(map(lambda x: Message(*x), connection.cursor().execute(query, (offset, limit)).fetchall()))
