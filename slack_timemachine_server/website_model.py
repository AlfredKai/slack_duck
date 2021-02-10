from model.dbconnection import connection, Dbconnection


class Website(Dbconnection):

    table_name = 'website'

    @classmethod
    def create_table(cls):
        create_table = f'CREATE TABLE {cls.table_name} ( \
                            password varchar(50) DEFAULT "", \
                            visit_count INT DEFAULT 0 \
                            )'
        connection.cursor().execute(create_table)
        query = f'INSERT INTO {cls.table_name} DEFAULT VALUES'
        connection.cursor().execute(query)
        cls.commit()

    @classmethod
    def get_password(cls):
        query = f'SELECT * FROM {cls.table_name}'
        return connection.cursor().execute(query).fetchone()[0]

    @classmethod
    def set_password(cls, password):
        query = f'UPDATE {cls.table_name} SET password = (?)'
        connection.cursor().execute(query, (password,))
        cls.commit()

    @classmethod
    def update_visit_count(cls):
        query = f'UPDATE {cls.table_name} SET visit_count = visit_count + 1'
        connection.cursor().execute(query)
        cls.commit()

    @classmethod
    def get_visit_count(cls):
        query = f'SELECT * FROM {cls.table_name}'
        return connection.cursor().execute(query).fetchone()[1]
