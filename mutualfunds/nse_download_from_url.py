import logging
import logging.config
from csvWriter import CsvWriter
from csvReader import CsvReader
from seleniumextractor import SeleniumExtractor

from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from csvReader import CsvReader
from selenium_error import *
import config as cfg
import datetime
from collections import OrderedDict
import re
import time
import sys
import os

file_path = "/users/niteshchawla/Downloads/Bhavcopy/"

print(sys.getdefaultencoding())

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

# create logger
logger=logging.getLogger('logger_bonus')

""" get the file location and other configuration"""

# static_link_file = cfg.settings['STATIC_LINK_FILE']
abspath=cfg.settings['ABS_PATH']
url_file=cfg.settings['CSV_URL_FILE']

""" initialise the csv reader to read the Urls of Mutual funds"""
csvreader = CsvReader(abspath,url_file,"URL")
url_list = csvreader.readrows()

try:
  for url in url_list:
    #print(type(url))
    selextractor=SeleniumExtractor(url['URL'])
    file_path_mod = ""
    file_path_mod = file_path+url["FILENAME"]
    url_timer = time.time()
    file_cond = not os.path.exists(file_path_mod)
    timer_cond = 0
    while file_cond and time.time()-url_timer < 10:
      #print("Inside While")
      #print("file path is",file_path_mod)
      time.sleep(1)
    if(os.path.isfile(file_path_mod)):
      #print("file downloaded",file_path_mod)
      pass
    selextractor.driver.quit()
except Exception as e:
  print("A general exception has occured, print on the console", e)

