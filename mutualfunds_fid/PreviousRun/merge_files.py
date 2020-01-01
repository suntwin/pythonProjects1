import os
pathnew = '/pythonProjects/mutualfunds/All/Done'
fileslocnew = os.path.abspath(pathnew)
filepath = fileslocnew+'\\'+'combined.csv'
fout=open(filepath,"a")
# first file:



for d,dirs,files in os.walk(fileslocnew):
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