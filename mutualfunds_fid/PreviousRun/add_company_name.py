# read the directory All for each file there
# read the file name in a variable
# open the file in rw mode
# for each row add an additional column which is the filename

import os
import numpy as np
import pandas as pd
list = []
def update_file(fp,fn):
	pathnew = '/pythonProjects/mutualfunds/All/Done'
	print("pathnew")
	fileslocnew = os.path.abspath(pathnew)
	filespathnew = fileslocnew+'\\'+'new'+fn
	fp = fp+'\\'+fn
	fins = open(fp,'r+')
	#from the file path split at _
	arr = fn.split("_")
	print('array 1 is',arr)
	fund_name = arr[0]
	fund_code = arr[1]
	arr2 = fund_code.split(".")
	fund_code = arr2[0]
	#read each row
	print("filename is before df",fp)
	df = pd.read_csv(fp)
	print('columns are')
	print(df.columns)
	df['company_name'] = fund_name
	df['company_code'] = fund_code
	df.to_csv(filespathnew)

if __name__ == '__main__':
	list = []
	path = '/pythonProjects/mutualfunds/All'
	files_loc = os.path.abspath(path)
#	print(files_loc)

	# for files in os.walk(path):
	# 	for dirpath, subdirs, x in files:
	# 		file_name = x
	# 		print(file_name)
	# 		if x.endswith(".csv"):
	# 			file_path = files_loc+'\\'+x
	# 			print('nitesh')
	# 			update_file(file_path,file_name)

for d,dirs,files in os.walk(files_loc):
	for x in files:
	 	if x.endswith(".csv"):
			file_name = x
	#print(file_name)
			update_file(d,file_name)

# csvfiles = [os.path.join(d, x)
#             for d, dirs, files in os.walk(files_loc)
#             for x in files if x.endswith(".csv")]
# print(csvfiles)

