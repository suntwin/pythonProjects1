import os
import numpy as np
import pandas as pd
#pathnew = '/users/niteshchawla/Downloads/Bhavcopy/unzipped/'
pathnew = '/users/niteshchawla/Downloads/NasdaqData/NMQ/'
fileslocnew = os.path.abspath(pathnew)
filepath = fileslocnew+'//'+'combined.csv'
fout=open(filepath,"a")
# first file:



for d,dirs,files in os.walk(fileslocnew):
	mydf = pd.DataFrame(columns=['AUTOINT','Symbol','Date','Open','High','Low','Close','Volume','Gross','OpnInt'])
	for x in files:
	 	if (x.endswith(".csv") and x!='combined.csv' and x!='combined.csv'):
			file_name = x
	#print(file_name)
	# open the file as dataframe
			df_file = fileslocnew+'//'+file_name
			print(df_file)
			df = pd.read_csv(df_file)
			frames = [mydf,df]
			mydf = pd.concat(frames)
			# mydf = pd.merge(mydf,df)
			#f.next()#skip header
	mydf.to_csv(filepath)


