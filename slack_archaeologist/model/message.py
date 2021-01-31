from model.dbconnection import cursor, Db


class Message(Db):

    table_name = 'Message'

    def __init__(self, ts, user_id, bot_id, subtype, text):
        self.ts = ts
        self.user_id = user_id
        self.bot_id = bot_id
        self.subtype = subtype
        self.text = text

    @classmethod
    def create_table(cls):
        create_table = f"CREATE TABLE {cls.table_name} (\
                            id INTEGER PRIMARY KEY AUTOINCREMENT,\
                            ts TIMESTAMP,\
                            user_id VARCHAR(50),\
                            bot_id VARCHAR(50), \
                            subtype VARCHAR(50), \
                            text TEXT\
                            )"
        cursor.execute(create_table)

    @classmethod
    def get_user_ids(cls):
        query = f'SELECT DISTINCT user_id FROM {cls.table_name} WHERE user_id IS NOT NULL'
        return list(map(lambda x: x[0], cursor.execute(query).fetchall()))

    def save(self):
        data = (None, self.ts, self.user_id, self.bot_id, self.subtype, self.text)
        insert_query = f'INSERT INTO {self.table_name} VALUES (?, ?, ?, ?, ?, ?)'
        cursor.execute(insert_query, data)
