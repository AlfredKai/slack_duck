import sqlite3
from os import path, getcwd


abs_cwd = (path.join(getcwd(), path.dirname(__file__)))

connection = sqlite3.connect(path.join(abs_cwd, "data.db"), check_same_thread=False)


class Dbconnection():

    @staticmethod
    def commit():
        connection.commit()

    @classmethod
    def drop_table(cls):
        connection.cursor().execute(f"DROP TABLE IF Exists {cls.table_name}")

    @property
    def row(self):
        return tuple(self.__dict__.values())

    def save(self):
        values_str = '(?' + ',?' * (len(self.__dict__) - 1) + ')'
        insert_query = f'INSERT INTO {self.table_name} VALUES {values_str}'
        connection.cursor().execute(insert_query, self.row)
