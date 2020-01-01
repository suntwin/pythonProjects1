
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
import time
import sys
print sys.getdefaultencoding()

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

""" get the file location and other configuration"""

#static_link_file = cfg.settings['STATIC_LINK_FILE']
abspath = cfg.settings['ABS_PATH']
stock_file = cfg.settings['STOCK_SYMBOLS']
fieldnames = cfg.settings['FIELDNAMES_STOCKS']
screener_file = cfg.settings['SCREENER_FILE']
screener_input = cfg.settings['SCREENER_INPUT']

# csvreader = CsvReader(abspath,nse_file,fieldnames)

# """ read the file here. This will return a list of dictionaries """
# data_list = csvreader.readrows()

# print("data list is",data_list)
# #print('file://'+abspath+static_link_file)
# #url = 'file://'+abspath+static_link_file
def get_symbol_details(symbol):


    elem_company_search = selextractor.get_elems_by_class("u-full-width")
    elem_company_search[1].clear()
    
    elem_company_search[1].send_keys(symbol)
    print("element type",type(elem_company_search[1]))
    time.sleep(2)
    results = selextractor.get_elems_by_css('div.has-addon.right-addon li')
    stock_dict = {}
    stock_dict['symbol'] = symbol
    for item in results[:1]:
        elem_company_search[1].send_keys(Keys.DOWN)
        elem_company_search[1].send_keys(Keys.ENTER)
       
        #get the current url
        print("reached here")
        current_url = selextractor.driver.current_url
        print("current_url is",current_url)
        selextractor.driver.get(current_url)
        """element = WebDriverWait(selextractor.driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "li.four.columns")))"""
        time.sleep(3)
        #selextractor.driver.get(current_url)
        #stock_elems = selextractor.get_elems_by_css("li four columns")
        stock_elems = selextractor.get_elems_by_css("li.four.columns")
        
        i = 0
        for elem in stock_elems:
            
            print(elem.text)
            e = (elem.text).split(":")
            print("e is ",len(e))
            #rint("count of attributes",(elem.text).split(":"))
            if len(e)>1:
                stock_dict[e[0]]=e[1]
            elif(len(e) == 1):
                # if(e[0]=='Company Website'):
                #     stock_dict['Company Website'] = 'Company Website'
                # if(e[0]=='Listed on BSE and NSE'):
                #     stock_dict['Listed on BSE and NSE']='Listed on BSE and NSE'
                if(e[0].find('52 weeks',0,len(e[0]))!=-1):
                    stock_dict['52 weeks HighLow']= e[0]
            i = i + 1
    if (results == []):
        stock_dict = {}
    return(stock_dict)

def get_columns_of_screener():
    columns = ["symbol","52 weeks HighLow","Altman Z Score","Average Earnings 5Year","Average return on equity 3Years","Average return on equity 5Years",
"Average return on equity 7Years",
"Book Value",
"Cash 3Years back",
"Cash 5Years back",
"Cash beginning of last year",
"Cash by market cap",
"Cash end of last year",
#"Company Website",
"Current Price",
"Debt",
"Debt to equity",
"Dividend last year",
"Dividend Yield",
"Enterprise Value",
"Enterprise Value to EBIT",
"EPS",
"EPS last year",
"EVEBITDA",
"Face Value",
"Interest Coverage",
"Intrinsic Value",
#"Listed on BSE and NSE",
"Market Cap",
"NCAVPS",
"Net worth",
"Number of equity shares",
"OPM 5Year",
"Piotroski score",
"Price to Cash Flow",
"Price to Free Cash Flow",
"Price to Sales",
"Profit growth",
"Profit growth 3Years",
"Profit growth 5Years",
"Profit growth 7Years",
"Return on assets",
"Return on capital employed",
"Return on equity",
"Return on invested capital",
"ROCE",
"ROE",
"Sales growth",
"Sales Growth (3Yrs)",
"Sales growth 3Years",
"Sales growth 5Years",
"Sales growth 7Years",
"Stock P/E",
"Volume",
"Working Capital to Sales ratio",
"YOY Quarterly profit growth",
"YOY Quarterly sales growth"]  
    columns_t = ",".join(columns)     
    return(columns_t)

# create logger
logger = logging.getLogger('logger_screener')



""" initialise Selenium Extractor """

"""d1 = datetime.datetime.strptime("21/02/2018", "%d/%m/%Y").strftime("%d-%m-%Y")"""
try:
    stock_list = []
    screener_login = "https://www.screener.in/login/"
    selextractor = SeleniumExtractor(screener_login)
    elem_u = selextractor.get_elem_by_id("id_username")
    elem_p = selextractor.get_elem_by_id("id_password")
    
    elem_u.send_keys('niteshchawla81@gmail.com')
    elem_p.send_keys('hotdog66')
    click_button = selextractor.get_elems_by_class("button-primary")
    print("length",len(click_button))
    #click_button2 = selextractor.get_elem_by_xpath_href('//*[@id="main-area"]/form/p[1]/button', 'attr')
    time.sleep(2)
    click_button[1].click()

  


    csvreader = CsvReader(abspath,screener_input,"symbol,")
    columns1 = get_columns_of_screener()
    csvwriter = CsvWriter(abspath,screener_file,columns1)
    csvwriter.writefile_header()
    data_list = csvreader.readrows()
    print("data list is",data_list)
    stock_list = []

    #for row in data_list[:2]:
    for row in data_list:    
        symbol = row['symbol']
        print("symbol is",symbol)
        stock_dict = get_symbol_details(symbol)
        #sorted_stock_dict = dict(OrderedDict(sorted(stock_dict.items())))
        #stock_list.append(sorted_stock_dict)
        if(bool(stock_dict)!=False):

            csvwriter.writefile_row(stock_dict)
    #print("stock list",stock_list)
    #csvwriter.writefile_rows(stock_list)
    csvwriter.close_file()

except Exception as e:
    print(e)
    logger.error(e,exc_info=True)

# except Driver_Find_Error as e:
#     print("exception type",type(e))
