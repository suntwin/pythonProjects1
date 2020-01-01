import os
import numpy as np
import pandas as pd
def openfile_from_abs_path(abspath,mode,filename):
	filesloc = os.path.abspath(abspath)
	fp = filesloc+'\\'+filename
	fins = open(fp,mode)
	return fins


def merge_csv_files(abspath,csv_file_name):
	filesloc = os.path.abspath(abspath)
	write_file_loc = filesloc+'\\'+csv_file_name
	fout = open(filepath,"a")
	for d,dirs,files in os.walk(filesloc):
		for x in files:
	 		if (x.endswith(".csv") and x!='combined.csv' and x!='combine.csv'):
				file_name = x
	#print(file_name)
				f = open(fileslocnew+'\\'+file_name)
			#f.next()#skip header
				f.readline()
				for line in f:
					fout.write(line)
				f.close()
	fout.close()

def merge_csv_files_pd(abspath,csv_file_name,csv_cols_list):
	filesloc = os.path.abspath(abspath)
	write_file_loc = filesloc+'\\'+csv_file_name
	fout = open(filepath,"a")
	mydf = pd.DataFrame(columns=csv_cols_list)
	for d,dirs,files in os.walk(filesloc):
		for x in files:
			if (x.endswith(".csv") and x!='combined.csv' and x!='combined.csv'):
				file_name = x
				df_file = fileslocnew+'\\'+file_name
				print(df_file)
				df = pd.read_csv(df_file)
				frames = [mydf,df]
				mydf = pd.concat(frames)
		mydf.to_csv(filepath)





