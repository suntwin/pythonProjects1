# this is a utility class to support the html parser. Mainly all helper methods to transform datastructures
# will be written here

from htmlParser import HtmlParser
from datetime import datetime

import re

def format_current_timestamp():
		ts = datetime.now()
		yearstr = str(datetime.now().year)
		datestr = str(datetime.now().day).rjust(2,'0')
		monthstr = str(datetime.now().month).rjust(2,'0')
		return(yearstr+monthstr+datestr)

def remove_special_char(element):
		element = re.sub('-','',element)
		element = re.sub(',','',element)
		return(element)

class DataStructures_Utility(HtmlParser):

	def __init__(self,htmlurl,fileloc):
		"""this class is inherited from the htmlParser class and hence must call its super constructor"""
		HtmlParser.__init__(self,htmlurl,fileloc)

	
	# def format_current_timestamp():
	# 	ts = datetime.now()
	# 	yearstr = str(datetime.now().year)
	# 	datestr = str(datetime.now().day).rjust(2,'0')
	# 	monthstr = str(datetime.now().month).rjust(2,'0')
	# 	return(yearstr+monthstr+datestr)
	
	

	def add_fund_and_code(self,data,fund_name,fund_code,fund_category,field_names):
		"""this method is used to add the fundname and fundcode to the mutual funds holdings data
		it will help in identifying a stock against a fund"""


		
		new_table = []

		for row in data:
			if (row != []):
				print("row is",row)
				new_row = {}
				for i in range(len(row)):
					row[i] = remove_special_char(row[i])

					
					if(field_names[i] == 'Qty' and row[i]!=""):
						"""below statement first removes the comma inside the qty and
							then it converts the string to float and finally convert
							the float into an integer number as QTY will always be an integer


						"""

						new_row[field_names[i]] = int(float(row[i].replace(',','')))
					else:
						new_row[field_names[i]] = row[i]

				new_row['Fund_Name'] = fund_name
				new_row['Fund_Code'] = fund_code
				new_row['Fund_Type'] = fund_category
				"""time stamp will be good to add, as it will keep track of the datetime, when the data was extracted"""
				new_row['Time_Stamp'] = format_current_timestamp()
				new_table.append(new_row)
		return(new_table)

	
