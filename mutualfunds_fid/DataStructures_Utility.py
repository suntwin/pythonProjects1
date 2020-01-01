# this is a utility class to support the html parser. Mainly all helper methods to transform datastructures
# will be written here

from htmlParser import HtmlParser
from datetime import datetime

class DataStructures_Utility(HtmlParser):

	def __init__(self,htmlurl,fileloc):
		"""this class is inherited from the htmlParser class and hence must call its super constructor"""
		HtmlParser.__init__(self,htmlurl,fileloc)

	def add_fund_and_code(self,data,fund_name,fund_code,field_names):
		"""this method is used to add the fundname and fundcode to the mutual funds holdings data
		it will help in identifying a stock against a fund"""
		
		new_table = []

		for row in data:
			if (row != []):
				new_row = {}
				for i in range(len(row)):
					new_row[field_names[i]] = row[i]
				new_row['Fund_Name'] = fund_name
				new_row['Fund_Code'] = fund_code
				"""time stamp will be good to add, as it will keep track of the datetime, when the data was extracted"""
				new_row['Time_Stamp'] = datetime.now()
				new_table.append(new_row)
		return(new_table)
	
