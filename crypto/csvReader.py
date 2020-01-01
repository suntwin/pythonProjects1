import os
import csv


class CsvReader():

  def __init__(self, abspath, file_name, field_names):
    self.actual_location = os.path.abspath(abspath) + file_name
    self.field_names = field_names.split(',')
    file_descriptor = open(self.actual_location, 'r',encoding='utf-8-sig')
    self.filereader = csv.DictReader(file_descriptor)

  def readrows(self):
    data_list = []
    for row in self.filereader:
      data_list.append(row)
    return (data_list)
