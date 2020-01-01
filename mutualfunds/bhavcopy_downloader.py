
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
nse_file = cfg.settings['NSEDATES']
fieldnames = cfg.settings['FIELDNAMES_NSE']

csvreader = CsvReader(abspath,nse_file,fieldnames)

""" read the file here. This will return a list of dictionaries """
data_list = csvreader.readrows()

print("data list is",data_list)
#print('file://'+abspath+static_link_file)
#url = 'file://'+abspath+static_link_file



# create logger
logger = logging.getLogger('logger_bhav')

""" initialise Selenium Extractor """

"""d1 = datetime.datetime.strptime("21/02/2018", "%d/%m/%Y").strftime("%d-%m-%Y")"""
bhav_url = "https://www.nseindia.com/products/content/equities/equities/archieve_eq.htm"
selextractor = SeleniumExtractor(bhav_url)
try:
    for row in data_list:
        try:
            print("row",row)
            d1 = datetime.datetime.strptime(row['nsedate'], "%d/%m/%y").strftime("%d-%m-%Y")
            
            elem = selextractor.get_elem_by_id("h_filetype")
            print("elem is",elem)
            select = Select(elem)
            select.select_by_visible_text('Bhavcopy')
           
            date1= selextractor.get_elem_by_id("date")
            date1.clear()
            time.sleep(1)
            date1.send_keys(d1)
            archive_s_box = selextractor.get_elems_by_class("archive_search")
            #archive_s_box = WebDriverWait(selextractor.driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "archive_search")))
            
            click_button = selextractor.get_elems_by_class("getdata-button")
            #click_button = WebDriverWait(selextractor.driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "getdata-button")))
            print("click type",type(click_button))
            archive_s_box[0].click()
            time.sleep(2)
            click_button[0].click()
            time.sleep(3)
            print("click_button",click_button)
            time.sleep(2)
            link_path = "bhav.csv.zip"
            download_link = selextractor.get_elems_by_partial_text(link_path)
            #element = WebDriverWait(selextractor.driver, 10).until(EC.presence_of_element_located((By.PARTIAL_LINK_TEXT, download_link)))
            print("download_link",download_link)
            if(download_link!=[]):
                download_link[0].click()
                time.sleep(3)

            
            #selextractor.driver.quit()
        except Exception as e:
            print("A general exception has occured, print on the console",e)
            print("date in question",d1)
            logger.error(e,exc_info=True) 
            #selextractor.driver.quit()
        except Driver_Find_Error as e:
            print("exception type",type(e))
            logger.error(e.expt,exc_info=True)
            #selextractor.driver.quit() 

   
    selextractor.driver.quit()    
except Exception as e:
    print(e)
    logger.error(e,exc_info=True)

except Driver_Find_Error as e:
    print("exception type",type(e))
