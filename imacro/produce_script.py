import os
files_loc = os.path.abspath('/pythonProjects/imacro/test6')
print(files_loc)
print(files_loc)
url_file_path = os.path.dirname(__file__) + '\urls.txt'
script_file_path = os.path.dirname(__file__)+'\script_6.txt'
fin = open(url_file_path)
# open the other file in write mode
fins = open(script_file_path,'w')


def produce_script_snippet():
	st1_only1="VERSION BUILD=11.5.499.3066\n"
	fins.write(st1_only1)
	st2="TAB T=1\n"
	fins.write(st2)
	st3="TAB CLOSEALLOTHERS\n"
	fins.write(st3)
	st4="SET !PLAYBACKDELAY 0.2\n"
	fins.write(st4)
	#retrieve the url



def full_script():

	
	counter=1
	produce_script_snippet()
	for line in fin:
		full_line = "URL GOTO="+line
		# write the snippet
		
		# write the full line
		fins.write(full_line)
		st5="SAVEAS TYPE=PNG FOLDER="+files_loc+" "+"FILE="+str(counter)+"\n"
		counter=counter+1
		fins.write(st5)
		#st6="TAG POS=1 TYPE=A ATTR=TXT:Next<SP>"+"\n"
		#fins.write(st6)
	#url_construct = url
	#return(url_construct)




if __name__ == '__main__':
	full_script()
	
