
import logging
import logging.config
from csvWriter import CsvWriter
from csvReader import CsvReader
from seleniumextractor import SeleniumExtractor
from selenium_error import *
import config as cfg

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

""" get the file location and other configuration"""

#static_link_file = cfg.settings['STATIC_LINK_FILE']
abspath = cfg.settings['ABS_PATH']
fieldnames = cfg.settings['FIELD_NAMES_LINKS_DATA']
file_name = cfg.settings['CSV_FUND_HOUSE_LINK_FILE']
url_file = cfg.settings['CSV_FUND_HOUSE_URL_FILE']
field_names = fieldnames.split(',')

#print('file://'+abspath+static_link_file)
#url = 'file://'+abspath+static_link_file

csvreader = CsvReader(abspath,url_file,fieldnames)

url_links = csvreader.readrows()


# create logger
logger = logging.getLogger('logger_ratios')


"""initialise a csvwriter to write a csv file for output"""
csvwriter =  CsvWriter(abspath,file_name,fieldnames)
#csvwriterplain =  CsvWriterPlain(abspath,file_name,fieldnames)

logger.info('Starting File Processing')
csvwriter.writefile_header()

""" initialise Selenium Extractor """


try:
    for url in url_links:
        try:
            logger.debug('Url being processed is %s',url['fundhouse_url'])
            fund_house = url['fundhouse_url']
            selextractor = SeleniumExtractor(fund_house)
          
            #elem = selextractor.get_elem_by_class(class_name='dgrey_12')
            rows = selextractor.get_table_rows_by_class(class_name='boxBg1')
            print("rows count",len(rows))
            link_list = []
            i = 2
            #i=len(rows)
            #k=1
            while((i<=len(rows))):
#                if(i!=len(rows)):
#                    i+=1
#                    continue
                fund_link={}
                data_list = []

                str1 = "//html//body//div[3]//div[3]//div[1]//div[2]//div[1]//table[1]//tbody//tr[%d]//td[1]//a" % i
                str2 = "//html//body//div[3]//div[3]//div[1]//div[2]//div[1]//table[1]//tbody//tr[%d]//td[4]" % i
                linktext = selextractor.get_elem_by_xpath_href(xpath=str1,attr='href')
                print("lintext is",linktext)
                fundname = selextractor.get_elem_by_xpath_href(xpath=str1,attr='innerText')
                print("fundname is",fundname)
                fundtype = selextractor.get_elem_by_xpath_href(xpath=str2,attr='innerText')
                print("fundtype is",fundtype)
                fundsplit = linktext.split('/')
                fundcode = fundsplit[-1]
                
                data_list.append(fundname)
                data_list.append(fundcode)
                data_list.append(linktext)
                data_list.append('')
                data_list.append(fundtype)
                print("datalist is",data_list)

                #fundtype = selextractor.get_elem_by_xpath_href(xpath='//html//body//div[3]//div[1]//div[5]//table[2]//tbody/tr[row]/td[2]//p//a',attr='innerText')
                
                #print("after get elem inside main script",linktext,fundtype)
                print("i is",i)
                for j in range(len(field_names)):
                    
                    fund_link[field_names[j]] = data_list[j]
                print("fund link",fund_link)
                link_list.append(fund_link)
                #print(" k is",k)
                #k+=1
                i+=1
                #i-=1
                #print("after get elem inside main script",linktext)


            """ write the data now in the csv file"""
            print(link_list)
            csvwriter.writefile_rows(link_list)
            selextractor.driver.quit()
        except Exception as e:
            print("A general exception has occured, print on the console",e)
            logger.error(e,exc_info=True) 
        except Driver_Find_Error as e:
            print("exception type",type(e))
            logger.error(e.expt,exc_info=True)

       
    

except Exception as e:
    print(e)
    logger.error(e.expt,exc_info=True)
except Driver_Find_Error as e:
    print("exception type",type(e))
    logger.error(e,exc_info=True)