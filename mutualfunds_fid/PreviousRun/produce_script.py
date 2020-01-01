#need to read the urls from the csv files, for that pandas will be good enough
# read each row of csv in a loop and that will give the urls, the company name and the code


import os
import numpy as np
import pandas as pd

def produce_script_snippet(row):
	url = row[3]
	code = row[2]
	name = row[1]
	full_line = "URL GOTO="+ url +"\n"
	fins.write(full_line)
	table_line = "TAG POS=3 TYPE=TABLE ATTR=TXT:* EXTRACT=TXT"+"\n"
	fins.write(table_line)
	save_line = "SAVEAS TYPE=EXTRACT FOLDER=C:\pythonProjects\mutualfunds\All FILE="+row[1]+'_'+row[2]+'.csv'+"\n"
	fins.write(save_line)
	wait_line = "WAIT SEC
['birla-sl-emer-leaders-sr-1-dp_MBS1821.csv', 'birla-sl-emer-leaders-ONDS=15"+"\n"
	fins.write(wait_line)

files_loc = os.path.abspath('/pythonProjects/mutualfunds')
print(files_loc)
print(files_loc)
url_file_path = os.path.dirname(__file__) + '\URLsWithDomains.csv'
script_file_path = os.path.dirname(__file__)+'\script_1.txt'
fin = open(url_file_path)
# open the other file in write mode
fins = open(script_file_path,'w')
st0_only1="SET !EXTRACT_TEST_POPUP NO"+"\n"
st1_only1="VERSION BUILD=11.5.497.9113\n"
st2_only1="TAB T=1\n"
st3_only1="TAB CLOSEALLOTHERS\n"
fins.write(st0_only1)
fins.write(st1_only1)
fins.write(st2_only1)
fins.write(st3_only1)
df = pd.read_csv("URLsWithDomains.csv");
code_series = df.Code
url_series = df.Url
name_series = df['Fund Name']

for row in df.itertuples():
	#print(row[2])
	produce_script_snippet(row)


