from htmlParser import HtmlParser
from csvWriter import CsvWriter
from csvReader import CsvReader
from bs4 import BeautifulSoup
from CoinMarket_Error import *
import re
from seleniumextractor import SeleniumExtractor
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from db_functions import DB_Functions
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from decimal import *
from selenium_error import *
import config as cfg
import datetime
import time
from csvReader import CsvReader
from DataStructures_Utility import DataStructures_Utility
import pandas as pd
import numpy as np

import config as cfg
import random
import logging
import logging.config

""" logging configureation done here """
logging.config.fileConfig('logging.conf')
coinmarket_url=cfg.settings['COINMARKET_URL']
file_name = cfg.settings['CSV_BINANCE_FILE']
abspath = cfg.settings['ABS_PATH']
print(coinmarket_url)

# create logger
# create logger
logger=logging.getLogger('logger_coinmarketcap')
logger.info("coinmarketcap has started")

# df = pd.read_csv("binance.csv")
#
# curr_series=df['CURRENCY']
# curr_pair=df['PAIR']
# print(curr_series)
csvreader = CsvReader(abspath,file_name,"CURRENCY,PAIR")
curr_pairs = csvreader.readrows()
print(curr_pairs)



selextractor=SeleniumExtractor(coinmarket_url)

elem_banner=selextractor.get_elem_by_wait_class("banner-alert-close-button")

print("elem_banner", elem_banner)
elem_banner.click()


def get_data_by_curr(curr_type, elems):
  col_id=elems[0].text
  col_name=elems[1].text
  col_symbol=elems[2].text
  col_pairagainst = curr_type
  col_marketcap=elems[3].text
  col_price=elems[4].text
  col_supply=elems[5].text
  col_volume24h=elems[6].text
  col_percent1h=elems[7].text
  col_percent24h=elems[8].text
  col_percent7d=elems[9].text

  #currency independent fields
  col_id = int(col_id)
  #print("type of colid",type(col_id))
  col_percent1h=float(str_to_num(col_percent1h))


  col_percent24h=float(str_to_num(col_percent24h))


  col_percent7d=float(str_to_num(col_percent7d))

  # col_percent1h=float(str_to_num(col_percent1h))
  # col_percent24h=float(str_to_num(col_percent24h))
  # col_percent7d=float(str_to_num(col_percent7d))
  curr_timestamp=datetime.datetime.now()
  curr_date=datetime.datetime.strftime(datetime.date.today(), "%Y-%m-%d")
  ts=time.time()
  timestamp=datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

  #if (curr=='BTC'):
  col_marketcap=float(str_to_num(col_marketcap))

  col_price = float(str_to_num(col_price))

  col_supply = float(str_to_num(col_supply))

  col_volume24h = float(str_to_num(col_volume24h))

  return((col_id,col_name,col_symbol,col_pairagainst,col_marketcap,col_price,col_supply,col_volume24h,col_percent1h,col_percent24h,col_percent7d,curr_date,curr_timestamp.strftime('%Y-%m-%d %H:%M:%S')))

def str_to_num(str):
  str = str.replace(',',''  )
  num = (re.findall(r"[-+]?\d*\.\d+|\d+", str))
  if(len(num)==0):
    return(0)
  else:
    return(num[0])



def filter_binance(coinmarket_list_item):
  match_bool = False
  #print("currpairs inside filter",curr_pairs)
  for curr_pair in curr_pairs:
    #print("curr_pair is",curr_pair['CURRENCY'],"COINMARKETLISTITEM3",coinmarket_list_item[3])
    if(coinmarket_list_item[2]==curr_pair['CURRENCY']):
      match_bool = True
      break
  if(match_bool==True):
    return(True)
  else:
    return(False)




def get_tuples_of_crypto_data(curr_type,rows):
  coinmarket_list=[]
  for row in rows[1:]:
      elems=row.find_elements(By.TAG_NAME, "td")
      tuple_val = get_data_by_curr(curr_type,elems)
      #print("tuple val",tuple_val)
      #df.loc[(df['CURRENCY']==tuple_val[])&(df['column_name']==B)]
      coinmarket_list.append(tuple_val)

  return(coinmarket_list)



def coinmarket_curr_selector(selector,curr_type):
  elem_cur_switch_div=selextractor.get_elem_by_id("currency-switch")
  elem_cur_switch_div.click()
  time.sleep(2)
  if(curr_type=='USD'):
    elem_drop_down=selextractor.get_elem_by_xpath("//*[@id='currency-switch']/ul/li[2]")
  if (curr_type=='BTC'):
    elem_drop_down=selextractor.get_elem_by_xpath("//*[@id='currency-switch']/ul/li[3]")
  elem_drop_down.click()
  time.sleep(2)
  tbl_data=selextractor.get_elems_by_class("summary-table")
  rows=tbl_data[0]
  rows_t=rows.find_elements(By.TAG_NAME, "tr")
  return(rows_t)




try:
  # get the BTC list first
  db_functions=DB_Functions(host='localhost', user='nitesh', password='Hotdog@66', database='crypto')
  rows_btc = coinmarket_curr_selector(selextractor,'BTC')
  coinmarket_list_btc = get_tuples_of_crypto_data('BTC',rows_btc)
  coinmarket_list_btc_filtered = filter(filter_binance,coinmarket_list_btc)
  coinmarket_list_btc_filtered_db = []
  for item in coinmarket_list_btc_filtered:
    #print("filtered list",item)
    coinmarket_list_btc_filtered_db.append(item)

  # %d,%s,%s,%f,%f,%f,%f,%f,%f,%f,%s,%s
  sql="""
          INSERT INTO coinmarket(id,symbolname,symbol,pair_against,marketcap,price,supply,volume24h,percent1h,percent4h,percent7d,daterun,run_timestamp) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
          """
  db_functions.insert(query=sql, values=coinmarket_list_btc_filtered_db)
  rows_usd=coinmarket_curr_selector(selextractor, 'USD')
  coinmarket_list_usd=get_tuples_of_crypto_data('USD',rows_usd)
  coinmarket_list_usd_filtered=filter(filter_binance, coinmarket_list_usd)
  coinmarket_list_usd_filtered_db=[]
  for item in coinmarket_list_usd_filtered:
    coinmarket_list_usd_filtered_db.append(item)
  db_functions.insert(query=sql, values=coinmarket_list_usd_filtered_db)


  selextractor.driver.quit()


except Exception as e:
  print(e)
  logger.error(e, exc_info=True)

except Driver_Find_Error as e:
  print("exception type", type(e))
