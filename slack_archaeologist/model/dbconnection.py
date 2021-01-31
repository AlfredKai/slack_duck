import sqlite3
from os import path, getcwd


abs_cwd = (path.join(getcwd(), path.dirname(__file__)))

connection = sqlite3.connect(path.join(abs_cwd, "data.db"))
cursor = connection.cursor()


class Db():

    @staticmethod
    def commit():
        connection.commit()

    @classmethod
    def drop_table(cls):
        cursor.execute(f"DROP TABLE IF Exists {cls.table_name}")
