import os
import csv

class CsvWriterPlain():

    def __init__(self,abspath,file_name,field_names): 
        self.actual_location = os.path.abspath(abspath)+file_name
        self.field_names = field_names.split(',')
        self.file_descriptor = open(self.actual_location,'wb')
        self.filewriter = csv.writer(self.file_descriptor)
        

    def writefile_header(self):
        # write the first row as headers
        self.filewriter.writerow(self.field_names)

  
    def writefile_rows(self,rows):
        # this method receives a dictionary and writes it to the csv file
        #convert dict to list
     
        for x in rows:
            row = x.values()
            print("record is",row)
            self.filewriter.writerow(row)
    
    def close_file(self):
        self.file_descriptor.close()


    


         



             




