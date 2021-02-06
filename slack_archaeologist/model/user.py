from model.dbconnection import connection, Dbconnection


class User(Dbconnection):

    table_name = 'user'

    def __init__(self, user_id, name, title, real_name, display_name, img_org, img_48):
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
        connection.cursor().execute(create_table)

    @classmethod
    def get_users(cls):
        query = f'SELECT * FROM {cls.table_name}'
        return list(map(lambda x: User(*x), connection.cursor().execute(query).fetchall()))

    def save(self):
        insert_query = f'INSERT INTO {self.table_name} VALUES (?, ?, ?, ?, ?, ?, ?)'
        connection.cursor().execute(insert_query, self.row)
