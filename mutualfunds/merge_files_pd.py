import os
import numpy as np
import pandas as pd
<<<<<<< HEAD
=======
pathnew = '/users/niteshchawla/Downloads/Bhavcopy/unzipped/'
fileslocnew = os.path.abspath(pathnew)
filepath = fileslocnew+'//'+'combined.csv'
fout=open(filepath,"a")
# first file:
>>>>>>> 539e6d12b122dfe6a90ecb33cc5ffe197fef6dc3


pathnew="/users/niteshchawla/Downloads/Bhavcopy/Yahoo_Nifty_500/"
fileslocnew=os.path.abspath(pathnew)
filepath=fileslocnew+'//'+'combined.csv'
fout=open(filepath, "a")
# first file:


<<<<<<< HEAD
for d, dirs, files in os.walk(fileslocnew):
	mydf=pd.DataFrame(
		columns=['AUTOINT', 'SYMBOL', 'SERIES', 'OPEN', 'HIGH', 'LOW', 'CLOSE','Adj Close', 'LAST', 'PREVCLOSE', 'TOTTRDQTY',
							 'TOTTRDVAL', 'TIMESTAMP', 'TOTALTRADES', 'ISIN'])
	for x in files:
		if (x.endswith(".csv") and x!='combined.csv' and x!='combined.csv'):
			file_name=x
				# print(file_name)
				# open the file as dataframe
			df_file=fileslocnew+'//'+file_name
=======
for d,dirs,files in os.walk(fileslocnew):
	mydf = pd.DataFrame(columns=['AUTOINT','SYMBOL','SERIES','OPEN','HIGH','LOW','CLOSE','LAST','PREVCLOSE','TOTTRDQTY','TOTTRDVAL','TIMESTAMP','TOTALTRADES','ISIN'])
	for x in files:
	 	if (x.endswith(".csv") and x!='combined.csv' and x!='combined.csv'):
			file_name = x
	#print(file_name)
	# open the file as dataframe
			df_file = fileslocnew+'//'+file_name
>>>>>>> 539e6d12b122dfe6a90ecb33cc5ffe197fef6dc3
			print(df_file)
			df=pd.read_csv(df_file)
			df['Date']=pd.to_datetime(df.Date)
			frames=[mydf, df]
			mydf=pd.concat(frames)
			# mydf = pd.merge(mydf,df)
		# f.next()#skip header
	mydf.to_csv(filepath)


