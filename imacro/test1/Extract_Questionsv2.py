from bs4 import BeautifulSoup
import bs4
import filehandling as f
import re
import codecs
import urllib2
import csv
import os

url = "C:\\pythonProjects\\imacro\\test1\\htmltest.htm"
soup =BeautifulSoup(open(url))

filesloc = os.path.abspath('/pythonProjects/imacro/test1/csv_out')
fn = filesloc+'\\'+'questions.csv'

def create_sub_html(question_div):
	html_doc_start = """
	<html><head><title>temp_html</title></head><body>
	"""
	html_doc_end = """</body></html>
	"""
	html_doc = html_doc_start+question_div+html_doc_end

	question_soup = BeautifulSoup(html_doc, 'html.parser')
	return(question_soup)



with open(fn,'wb') as csvfile:
	 fieldnames = ['Question', 'Question Type (multiple-choice or multi-select)','Answer Option 1','Answer Option 2','Answer Option 3','Answer Option 4','Answer Option 5','Answer Option 6','Correct Response','Explanation','Knowledge Area','Has_Image_in_Explanation','Has_Image_in_Question']
	 writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
	 writer.writeheader()
	 try:

		 for content in soup.find_all("div",class_="content",limit=60):
		 	# the above finds one content, which is like 1 question 
		 	#once a content is found, one should find the question div
		 	question_ret = ""
		 	feedback_ret = ""
		 	csvline = {}
		 	question_div = content.find("div",class_="qtext").encode("utf-8").replace('\n',' ')
		 	csvline["Question"] = ''
			csvline["Question Type (multiple-choice or multi-select)"] = ''
			csvline["Answer Option 1"] = ''
			csvline["Answer Option 2"] = ''
			csvline["Answer Option 3"] = ''
			csvline["Answer Option 4"] = ''
			csvline["Answer Option 5"] = ''
			csvline["Answer Option 6"] = ''
			csvline["Correct Response"] = ''
			csvline["Explanation"] = ''
			csvline["Knowledge Area"] = ''
			csvline["Has_Image_in_Explanation"] = ''
			csvline["Has_Image_in_Question"] = ''
		 	question_soup = create_sub_html(question_div)
		 	#print('div tag ques',div_tag_question)
		 	for i in question_soup.find_all(['ol','li','p','img']):
		 		if type(i) == type(None):
		 			continue
		 		else:
		 			if (len(i.contents) != 0):
		 				for j in range(len(i.contents)):
		 					#print(i.contents[j].encode("utf-8"))
		 					if(i.contents[j].encode("utf-8").find("img")!=-1):
		 						csvline["Has_Image_in_Question"] = True
		 						i.contents[j] = ""
		 					question_ret = question_ret + i.contents[j].encode("utf-8").replace('\xc3\x82\xc2\xa0',"")

			csvline["Question"]=question_ret			
			answer_div = content.find("div",class_="answer").encode("utf-8").replace('\n',' ')
			answer_soup = create_sub_html(answer_div)
			#print(div_tag_answer)
			#find all the lables in the asnwers
			question_type = answer_soup.find_all('input')
			if (question_type[0]["type"] == "checkbox"):
				csvline["Question Type (multiple-choice or multi-select)"] = 'multi-select'
			else:
				csvline["Question Type (multiple-choice or multi-select)"] = 'multiple-choice'

			
			answer_choices = answer_soup.find_all('label')
			count = 1
			for answer in answer_choices:
				if (count==1):
					csvline["Answer Option 1"] = answer.contents[0].encode("utf-8").split(".")[1]

				if (count==2):
					csvline["Answer Option 2"] = answer.contents[0].encode("utf-8").split(".")[1]

				if (count==3):
					csvline["Answer Option 3"] = answer.contents[0].encode("utf-8").split(".")[1]

				if (count==4):
					csvline["Answer Option 4"] = answer.contents[0].encode("utf-8").split(".")[1]

				if (count==5):
					csvline["Answer Option 5"] = answer.contents[0].encode("utf-8").split(".")[1]

				if (count==6):
					csvline["Answer Option 6"] = answer.contents[0].encode("utf-8").split(".")[1]
				count = count + 1

			feedback_div = content.find("div",class_="generalfeedback").encode("utf-8").replace('\n',' ')

			feedback_soup = create_sub_html(feedback_div)
			#print(div_tag_feedback)
		 	for i in feedback_soup.find_all(['a','p','img','ol','li']):
		 		if type(i) == type(None):
		 			continue
		 		else:
		 			#print("feedback i",(i.name))
		 			if (len(i.contents) != 0):
		 				for j in range(len(i.contents)):
		 					#print(i.contents[j].encode("utf-8"))
		 					#print("j is",j)
		 					if(i.contents[j].encode("utf-8").find("img")!=-1):
		 						csvline["Has_Image_in_Explanation"] = True
		 						i.contents[j] = ""
		 					feedback_ret = feedback_ret + i.contents[j].encode("utf-8").replace('\xc3\x82\xc2\xa0',"")
		 	#print(type(feedback_ret))
			csvline["Explanation"]=feedback_ret			
			

			print(csvline)
		 	writer.writerow(csvline)
	 except UnicodeEncodeError:
		print("Found a Unicode character")

		    	




	 # latest update section with line 22