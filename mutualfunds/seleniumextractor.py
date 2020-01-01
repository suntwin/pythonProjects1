from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium_error import *
from selenium.webdriver.chrome.options import Options

class SeleniumExtractor:

	def __init__(self,url):
		#print("inside constructor")
		options = Options()
		options.add_experimental_option("prefs", {
		  "download.default_directory": "/users/niteshchawla/Downloads/Bhavcopy",
		  "download.prompt_for_download": False,
		  "download.directory_upgrade": True,
		  "safebrowsing.enabled": True
		})
		self.url = url
		self.driver = webdriver.Chrome('/users/niteshchawla/Downloads/docs/chromedriver',chrome_options=options)
		self.loadedpage = self.driver.get(url)
		
	


	def get_table_rows_by_class(self,class_name):
		#print("inside get rows")
		try:
			table_id = self.driver.find_element_by_class_name(class_name)
			#print("table id is",table_id)
			body = table_id.find_element_by_tag_name("tbody")
			#print("table body is",body)
			rows = body.find_elements_by_tag_name("tr")


		except Exception as e:
			raise Driver_Find_Error("Error while extracting based on class name",'s104',e)
		return(rows)


	def get_elem_by_xpath_href(self,xpath,attr):
		
		try:
			print("xpath",xpath)
			elem = self.driver.find_elements_by_xpath(xpath)
			if(elem=="-"):
				print("elem is",elem)
				linktext = ""
			else:
				print("elem else is",elem)
				linktext = elem.get_attribute(attr).encode("utf-8")
		except Exception as e:
			raise Driver_Find_Error("Error while extracting based on xpath",'s105',e)
		return(linktext)

	def get_elems_by_class(self,class_name):

		#print("inside get elems by class")
		try:
			elems = self.driver.find_elements_by_class_name(class_name)



		except Exception as e:
			raise Driver_Find_Error("Error while extracting elements based on class name",'s106',e)
		return(elems)

<<<<<<< HEAD
	def get_elems_by_xpath(self,xpath):

		#print("inside get elems by class")
		try:
			elems = self.driver.find_elements_by_xpath(xpath)



		except Exception as e:
			raise Driver_Find_Error("Error while extracting elements based on xpath",'s107',e)
		return(elems)

=======
>>>>>>> 539e6d12b122dfe6a90ecb33cc5ffe197fef6dc3

	def get_elem_by_id(self,id):

		#print("inside get elems by class")
		try:
			elems = self.driver.find_element_by_id(id)



		except Exception as e:
			raise Driver_Find_Error("Error while extracting elements based on class name",'s107',e)
		return(elems)

	def get_elems_by_partial_text(self,linktext):

		#print("inside get elems by class")
		try:
			print("linktext is",linktext)
			elems = self.driver.find_elements_by_partial_link_text(linktext)
			return(elems)
		except Exception as e:
			raise Driver_Find_Error("Error while extracting elements based on class name",'s108',e)
		return(elems)

	def get_elems_by_css(self,path):

		#print("inside get elems by class")
		try:
			print("css path",path)
			elems = self.driver.find_elements_by_css_selector(path)
			return(elems)


		except Exception as e:
			raise Driver_Find_Error("Error while extracting elements based on class name",'s109',e)
		return(elems)
