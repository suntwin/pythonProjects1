
import logging
import logging.config
from csvWriter import CsvWriter
from csvReader import CsvReader
from seleniumextractor import SeleniumExtractor
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

from selenium.webdriver.support.ui import Select
from selenium_error import *
import config as cfg
import datetime
import time


""" logging configureation done here """
logging.config.fileConfig('logging.conf')

""" get the file location and other configuration"""

#static_link_file = cfg.settings['STATIC_LINK_FILE']
abspath = cfg.settings['ABS_PATH']
stocklink_file = cfg.settings['STOCK_LINK']
fieldnames = cfg.settings['STOCK_LINK_FIELDNAMES']
moneycontrol_symbols_file = cfg.settings['MONEYCONTROL_SYMBOLS']

csvreader = CsvReader(abspath,stocklink_file,fieldnames)
csvwriter = CsvWriter(abspath,moneycontrol_symbols_file,"Stock_Name,Link")
csvwriter.writefile_header()
data_list = csvreader.readrows()

for link in data_list[:1]:
	print("link",link['Link'])
	selextractor = SeleniumExtractor(link['Link'])
	elems = selextractor.get_elems_by_css("a.bl_12")
	all_items = []
	for elem in elems:
		dict1 = {}
		print(elem.get_attribute("href"))
		print(elem.get_attribute("title"))
		dict1['Stock_Name'] = elem.get_attribute("title")
		dict1['Link'] = elem.get_attribute("href")
		if(elem.get_attribute("title") != ''):

			all_items.append(dict1)
	csvwriter.writefile_rows(all_items)
	
