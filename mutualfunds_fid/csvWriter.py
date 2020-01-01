import os
import csv

class CsvWriter():

	def __init__(self,abspath,file_name,field_names): 
		self.actual_location = os.path.abspath(abspath)+file_name
		self.field_names = field_names.split(',')
		file_descriptor = open(self.actual_location,'wb')
		self.filewriter = csv.DictWriter(file_descriptor, fieldnames=self.field_names)
		

	def writefile_header(self):
		# write the first row as headers
		self.filewriter.writeheader()


	def writefile_row(self,row):
		# this method receives a dictionary and writes it to the csv file
	 		csvline = {}
	 		for i in range(len(self.field_names)):
	 			#print("is is",self.field_names,"row is",row)
	 		# the row of the dictionary should match the csvline dictionary
	 			print row[self.field_names[i]]
	 			csvline[self.field_names[i]] = row[self.field_names[i]]
	 	# write the row now into the csvfile
	 		print(csvline)
	 		self.filewriter.writerow(csvline)


	


	 	



	 		




