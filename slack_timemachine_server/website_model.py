from model.dbconnection import connection, Dbconnection


class Website(Dbconnection):

    table_name = 'website'

    def __init__(self, password):
        self.password = password

    @classmethod
    def create_table(cls):
        create_table = f'CREATE TABLE {cls.table_name} ( \
                            password varchar(50) \
                            )'
        connection.cursor().execute(create_table)

    @classmethod
    def get_password(cls):
        query = f'SELECT * FROM {cls.table_name}'
        return Website(*connection.cursor().execute(query).fetchone()).password

    def save(self):
        insert_query = f'INSERT INTO {self.table_name} VALUES (?)'
        connection.cursor().execute(insert_query, self.row)
