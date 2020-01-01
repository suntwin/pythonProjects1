import os
import numpy as np
import pandas as pd
pathnew = '/pythonProjects/mutualfunds/All/Done'
fileslocnew = os.path.abspath(pathnew)
filepath = fileslocnew+'\\'+'combined.csv'
fout=open(filepath,"a")
# first file:



for d,dirs,files in os.walk(fileslocnew):
	mydf = pd.DataFrame(columns=['Equity','Sector','Qty','Value  (Rs cr)','%','company_name','company_code'])
	for x in files:
	 	if (x.endswith(".csv") and x!='combined.csv' and x!='combined.csv'):
			file_name = x
	#print(file_name)
	# open the file as dataframe
			df_file = fileslocnew+'\\'+file_name
			print(df_file)
			df = pd.read_csv(df_file)
			frames = [mydf,df]
			mydf = pd.concat(frames)
			# mydf = pd.merge(mydf,df)
			#f.next()#skip header
	mydf.to_csv(filepath)
