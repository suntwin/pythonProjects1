<<<<<<< HEAD
=======


>>>>>>> 539e6d12b122dfe6a90ecb33cc5ffe197fef6dc3
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

from selenium_error import *
import config as cfg
import datetime
from collections import OrderedDict
import re
import time
import sys
<<<<<<< HEAD

sys.getdefaultencoding()
=======
print sys.getdefaultencoding()
>>>>>>> 539e6d12b122dfe6a90ecb33cc5ffe197fef6dc3

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

# create logger
<<<<<<< HEAD
logger=logging.getLogger('logger_bonus')

""" get the file location and other configuration"""

# static_link_file = cfg.settings['STATIC_LINK_FILE']
abspath=cfg.settings['ABS_PATH']
bonus_file=cfg.settings['SPLIT']

bonus_url="https://www.moneycontrol.com/stocks/marketinfo/bonus/index.php"


def get_adjustment_factor(factor_type, factor):
  factor_ret=1
  split_str=factor.split(":")
  arg1=float(split_str[1])
  arg2=float(split_str[0])
  if (factor_type=='bonus'):
    sum=arg1+arg2
    factor_ret=(arg1/sum)
  if (factor_type=='split'):
    factor_ret=arg1/arg2
    print("inside split")
  return (factor_ret)


def get_split_list(year):
  split_url="https://www.moneycontrol.com/stocks/marketinfo/splits/index.php"
  split_list=[]

  try:

    selextractor=SeleniumExtractor(split_url)
    elem=selextractor.get_elem_by_id("sel_year")
    select=Select(elem)
    select.select_by_visible_text(year)
    elem.send_keys(u'\ue007')
    time.sleep(8)
    # now when the year is loaded, start processing the table
    results=selextractor.get_elems_by_class("tbldata14")
    if results:
      rows=results[0]
      rows_t=rows.find_elements(By.TAG_NAME, "tr")
      for row in rows_t[2:]:
        dict_row={}
        elems=row.find_elements(By.TAG_NAME, "td")
        col0=elems[0]
        dict_row['SYMBOL']=col0.text.splitlines(0)[0]
        url=col0.find_elements(By.TAG_NAME, "a")[0].get_attribute("href")
        # print("link is",col0.get_attribute('href'))
        print((col0.text).splitlines(0)[0])
        col1=elems[1]
        col2=elems[2]
        split_ratio=col1.text+":"+col2.text
        dict_row['ADJUSTMENT_TYPE']='split'
        split_factor=get_adjustment_factor('split', split_ratio)
        print(col1.text)
        dict_row['FACTOR']=split_factor
        col3=elems[3]
        dict_row['DATE']=col3.text
        dict_row['URL']=url
        print("url is", url)
        dict_row['NSE']=''
        print(col3.text)
        split_list.append(dict_row)
    else:
      results_bckup=selextractor.get_elems_by_xpath("//*[@id='mc_mainWrapper']/div[3]/div/table[5]/tbody/tr[2]/td[2]/table/tbody/tr[4]/td[4]/table/tbody/tr/td[2]/table/tbody")
      rows=results_bckup[0]
      rows_t=rows.find_elements(By.TAG_NAME, "tr")
      for row in rows_t[3:]:
        dict_row={}
        elems=row.find_elements(By.TAG_NAME, "td")
        col0=elems[0]
        dict_row['SYMBOL']=col0.text.splitlines(0)[0]
        url=col0.find_elements(By.TAG_NAME, "a")[0].get_attribute("href")
        # print("link is",col0.get_attribute('href'))
        print((col0.text).splitlines(0)[0])
        col1=elems[1]
        col2=elems[2]
        split_ratio=col1.text+":"+col2.text
        dict_row['ADJUSTMENT_TYPE']='split'
        split_factor=get_adjustment_factor('split', split_ratio)
        print(col1.text)
        dict_row['FACTOR']=split_factor
        col3=elems[3]
        dict_row['DATE']=col3.text
        dict_row['URL']=url
        print("url is", url)
        dict_row['NSE']=''
        print(col3.text)
        split_list.append(dict_row)

    # row_s = results.find_element_by_xpath("'./tr'")




  except NameError as ne:

    print("do nothing 1")
    logger.error(ne, exc_info=True)
  except Exception as e:
    print("do nothing 2")
    logger.error(e, exc_info=True)


    selextractor.driver.quit()
  except NameError as ne:
    print("do nothing 3")
    logger.error(ne, exc_info=True)
  except Exception as e:
    print("do nothing 4")
    logger.error(e, exc_info=True)
    selextractor.driver.quit()
  return (split_list)


def get_split_details(split_list, year, csvwriter1):
  for split_item in split_list:
    try:
      # static_link_file = cfg.settings['STATIC_LINK_FILE']

      # selextractor=SeleniumExtractor(split_item['URL'])
      # res=selextractor.get_elems_by_class("PB10")
      # nse_elem=res[0].find_element_by_xpath("//*[@id='nChrtPrc']/div[4]/div[1]")
      # print(nse_elem.text)
      # regex=r'\b\w+\b'
      # re_pattern=r"\b"+"NSE"+r"\b"
      # my_list=(re.findall(regex, nse_elem.text))
      # nse_index=my_list.index('NSE')
      # nse=my_list[nse_index+1]
      # split_item['NSE']=nse
      print(split_item)
      csvwriter1.writefile_row(split_item)
      # selextractor.driver.quit()
    except NameError as ne:
      print("do nothing 5")
      logger.error(ne, exc_info=True)
    except Exception as e:
      print("do nothing 6")
      logger.error(e, exc_info=True)

  csvwriter.close_file()
# read the csv file that got created and now we will update ISIN


if __name__=='__main__':
  years_of_split=['2019','2018','2017','2015', '2014', '2013', '2012', '2016',
                  '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004',
                  '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996',
                  '1995']
  # years_of_split=['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012',
  #                 '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004',
  #                 '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996',
  #                 '1995']
  for year in years_of_split:
    split_list=get_split_list(year)
    print("number of entries", len(split_list))

    abspath=cfg.settings['ABS_PATH']
    splitfile="/LinkFile/"+year+"_Split.csv"

    csvwriter=CsvWriter(abspath, splitfile, "SYMBOL,ADJUSTMENT_TYPE,DATE,FACTOR,URL,NSE")
    csvwriter.writefile_header()
    get_split_details(split_list, year, csvwriter)
=======
logger = logging.getLogger('logger_bonus')

""" get the file location and other configuration"""

#static_link_file = cfg.settings['STATIC_LINK_FILE']
abspath = cfg.settings['ABS_PATH']
bonus_file = cfg.settings['SPLIT']

csvwriter = CsvWriter(abspath,bonus_file,"SYMBOL,ADJUSTMENT_TYPE,DATE,FACTOR,URL,NSE")
csvwriter.writefile_header()

bonus_url = "https://www.moneycontrol.com/stocks/marketinfo/bonus/index.php"

    

def get_adjustment_factor(factor_type,factor):
    factor_ret = 1
    split_str = factor.split(":")
    arg1 = float(split_str[1])
    arg2 = float(split_str[0])
    if (factor_type == 'bonus'):     
        sum = arg1 + arg2
        factor_ret = (arg1/sum)
    if(factor_type == 'split'):
        factor_ret = arg1/arg2
        print("inside split")
    return(factor_ret)


def get_split_list():
    years_of_split = ['2019']
    split_url = "https://www.moneycontrol.com/stocks/marketinfo/splits/index.php"
    split_list = []
    for year in years_of_split:
        try:
            selextractor = SeleniumExtractor(split_url)
            elem = selextractor.get_elem_by_id("sel_year")
            select = Select(elem)
            select.select_by_visible_text(year)
            elem.send_keys(u'\ue007')
            time.sleep(8)
            # now when the year is loaded, start processing the table
            results = selextractor.get_elems_by_class("tbldata14")
            rows = results[0]
            rows_t = rows.find_elements(By.TAG_NAME,"tr")
            #row_s = results.find_element_by_xpath("'./tr'")
            print(type(rows_t))
            for row in rows_t[2:]:
                try:
                    dict_row = {}
                    elems = row.find_elements(By.TAG_NAME, "td")
                    col0 = elems[0]
                    dict_row['SYMBOL'] = col0.text.splitlines(0)[0]
                    url = col0.find_elements(By.TAG_NAME, "a")[0].get_attribute("href")
                    #print("link is",col0.get_attribute('href'))
                    print((col0.text).splitlines(0)[0])
                    col1 = elems[1]
                    col2 = elems[2]
                    split_ratio = col1.text+":"+col2.text
                    dict_row['ADJUSTMENT_TYPE'] = 'split'
                    split_factor = get_adjustment_factor('split',split_ratio)
                    print(col1.text)
                    dict_row['FACTOR'] = split_factor
                    col3 = elems[3]
                    dict_row['DATE'] = col3.text
                    dict_row['URL'] = url
                    print("url is",url)
                    dict_row['NSE'] = ''
                    print(col3.text)
                    #csvwriter.writefile_row(dict_row)
                    split_list.append(dict_row)
                except NameError as ne:
                    print("do nothing 1")
                    logger.error(ne,exc_info=True)
                except Exception as e:
                    print("do nothing 2")
                    logger.error(e,exc_info=True)
            selextractor.driver.quit() 
        except NameError as ne:
            print("do nothing 3")
            logger.error(ne,exc_info=True)
        except Exception as e:
            print("do nothing 4")
            logger.error(e,exc_info=True)   
    return(split_list)        

def get_split_details(split_list):
    for split_item in split_list:
        try:
            selextractor = SeleniumExtractor(split_item['URL'])
            res = selextractor.get_elems_by_class("PB10")
            nse_elem=res[0].find_element_by_xpath("//*[@id='nChrtPrc']/div[4]/div[1]")
            print(nse_elem.text)
            regex = r'\b\w+\b'
            re_pattern = r"\b"+"NSE"+r"\b"
            my_list = (re.findall(regex, nse_elem.text))
            nse_index = my_list.index('NSE')
            nse = my_list[nse_index+1]
            split_item['NSE'] = nse
            print(split_item)
            csvwriter.writefile_row(split_item)
            time.sleep(2)
            selextractor.driver.quit()
        except NameError as ne:
            print("do nothing 5")
            logger.error(ne,exc_info=True)
        except Exception as e:
            print("do nothing 6")
            logger.error(e,exc_info=True)


#read the csv file that got created and now we will update ISIN


if __name__ == '__main__':
    split_list = get_split_list()
    print("number of entries",len(split_list))
    get_split_details(split_list)
>>>>>>> 539e6d12b122dfe6a90ecb33cc5ffe197fef6dc3
