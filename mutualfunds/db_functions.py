
import config as cfg
import mysql.connector as db_connector
import MutualFunds_Error

class DB_Functions():
	def __init__(self,db_name,username,password):
		self.cnx = db_connector.connect(user=username, password=password,
                              host='127.0.0.1',
                              database=db_name)
		_db_holdings = ("INSERT INTO portfolio_holdings "
               "(Equity,fund_code,sector,value,fund_percent,Qty,date_of_run) "
               "VALUES (%s, %s, %s, %f, %f,%d,%s)")

	def db_insert_with_check(self,insert_stock_row):
		# before inserting read the database and find the record for fund_Code and stock
		# then compare if the value, percent or qty have changed
		# if change then dont perform an insert, rather raise an error and exit
		
		 cursor = self.cnx.cursor()
		 c = cursor.execute("SELECT Equity, fund_code from portfolio_holdings where ( value <> %s or Qty <> %d or fund_percent <> %f",(insert_stock_row['Value'],insert_stock_row['Qty'],insert_stock_row['%']))	
		 for result in c:

		 	if(result.with_rows):
		 		#close the current cursor and treat it like a normal insert
		 		cursor.close()
		 		db_insert(insert_stock_row)
		 	else:
		 		raise MutualFunds_Do_Not_Insert("Record already exists, no need to inserta new row",'DB100')
		 	

	def db_insert(self,insert_stock_row):
		#insert without any restriction
		db_holdings = _db_holdings
		cursor = self.cnx.cursor()
		insert_rec = (insert_stock_row['Equity'],insert_stock_row['Fund_Code'],insert_stock_row['Sector'],insert_stock_row['Value'],insert_stock_row['%'],insert_stock_row['Qty'],now)
		cursor.execute(db_holdings,insert_rec)
		self.cnx.commit()
		cursor.close()

	def db_read(self,query):
		cursor = self.cnx.cursor()
		cursor.execute(query)	
		data = cursor.fetchall()
		cursor.close()
		return(data)

	def db_close(self):
		self.cnx.close()
		

	def db_update_multiple(self,query,values):
		cursor = self.cnx.cursor()
		cursor.executemany(query,values)	
		cursor.close()
		self.cnx.commit()


	def db_update_single(self,query,values):
		cursor = self.cnx.cursor()
		cursor.execute(query,values)	
		cursor.close()
		self.cnx.commit()
		
		



			

