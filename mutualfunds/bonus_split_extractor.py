from htmlParser import HtmlParser
from csvWriter import CsvWriter
from csvWriterPlain import CsvWriterPlain
from csvReader import CsvReader
from DataStructures_Utility import DataStructures_Utility
import config as cfg
import time,random
import logging
import logging.config
import re

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

# create loggeclr
logger = logging.getLogger('logger_mutualFundsLink')

fieldnames_link = cfg.settings['FIELD_NAMES_BONUS_SPLIT']
#file_name_split = cfg.settings['CSV_SPLIT_FILE']
file_name_bonus = cfg.settings['CSV_BONUS_FILE']
abspath = cfg.settings['ABS_PATH']


csvreader = CsvReader(abspath,file_name_bonus,fieldnames_link)



"""read the file here """
url_links = csvreader.readrows()
url_links_mod = []

#print(url_links)
for url in url_links:
  stock_url=url['URL']
  sleep_time=random.randint(1, 2)
  time.sleep(sleep_time)
  ds_utility=None
  try:
    ds_utility=DataStructures_Utility(stock_url, False)
  except Exception as inst:
    logger.error('An error has occoured', exc_info=True)
  if (ds_utility!=None):
    stock_name_info = ds_utility.extract_info_from_tag("bsns_pcst","p")
    #print(stock_name_info)
    stock_name_info2=ds_utility.extract_info_from_tag("mob-hide", "ctag")
    #print(stock_name_info2)
    print(stock_name_info2[0].contents[3].string)
    if (stock_name_info2[0].contents[3].string != None):
      #only append the NSE STOCKS
      url['SYMBOL']=stock_name_info2[0].contents[3].string
      url_links_mod.append(url)





#split_file_mod = '/LinkFile/split_modified.csv'
bonus_file_mod = '/LinkFile/bonus_modified.csv'
csvwriter=CsvWriter(abspath, bonus_file_mod, "COUNT,SYMBOL,ADJUSTMENT_TYPE,DATE,FACTOR,URL,NSE")
csvwriter.writefile_header()
csvwriter.writefile_rows(url_links_mod)



