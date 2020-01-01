import mysql.connector as db_connector
import MySQLdb

class DB_Functions():

  def __init__(self, host='', user='', password='', database=''):
    self.__host=host
    self.__user=user
    self.__password=password
    self.__database=database

  def __open(self):
    try:
      cnx=MySQLdb.connect(self.__host, self.__user, self.__password, self.__database)
      self.__connection=cnx
      self.__session=cnx.cursor()
    except MySQLdb.Error as e:
      print
      "Error %d: %s"%(e.args[0], e.args[1])

  def __close(self):
    self.__session.close()
    self.__connection.close()
    ## End def __close

  def insert(self,query,values):


    self.__open()
    self.__session.executemany(query, values)
    self.__connection.commit()
    self.__close()