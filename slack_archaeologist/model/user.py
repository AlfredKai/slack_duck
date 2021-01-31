from model.dbconnection import cursor, Db


class User(Db):

    table_name = 'User'

    def __init__(self, user_id, name, title, real_name, display_name, img_org, img_48):
        self.id = id
        self.user_id = user_id
        self.name = name
        self.title = title
        self.real_name = real_name
        self.display_name = display_name
        self.img_org = img_org
        self.img_48 = img_48

    @classmethod
    def create_table(cls):
        create_table = f'CREATE TABLE {cls.table_name} ( \
                            id varchar(50) PRIMARY KEY, \
                            name varchar(50), \
                            title VARCHAR(300), \
                            real_name varchar(50), \
                            display_name varchar(50), \
                            img_org text, \
                            img_48 text\
                            )'
        cursor.execute(create_table)

    def save(self):
        data = (self.user_id, self.name, self.title, self.real_name, self.display_name, self.img_org, self.img_48)
        insert_query = f'INSERT INTO {self.table_name} VALUES (?, ?, ?, ?, ?, ?, ?)'
        cursor.execute(insert_query, data)
