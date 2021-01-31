import sqlite3


connection = sqlite3.connect('data.db')
cursor = connection.cursor()


class Db():

    @staticmethod
    def commit():
        connection.commit()

    @classmethod
    def drop_table(cls):
        cursor.execute(f"DROP TABLE IF Exists {cls.table_name}")
