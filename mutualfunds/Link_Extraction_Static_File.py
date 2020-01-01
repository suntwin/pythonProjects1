import logging
import logging.config
from csvWriter import CsvWriter
from seleniumextractor import SeleniumExtractor
import config as cfg

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

""" get the file location and other configuration"""

static_link_file = cfg.settings['STATIC_LINK_FILE']
abspath = cfg.settings['ABS_PATH']
fieldnames = cfg.settings['FIELD_NAMES_LINKS_DATA']
file_name = cfg.settings['CSV_LINK_FILE']
field_names = fieldnames.split(',')

print('file://'+abspath+static_link_file)
url = 'file://'+abspath+static_link_file
# create logger
logger = logging.getLogger('logger_ratios')


"""initialise a csvwriter to write a csv file for output"""
csvwriter =  CsvWriter(abspath,file_name,fieldnames)
#csvwriterplain =  CsvWriterPlain(abspath,file_name,fieldnames)

logger.info('Starting File Processing')
csvwriter.writefile_header()

""" initialise Selenium Extractor """
try:
    selextractor = SeleniumExtractor(url)
  
    #elem = selextractor.get_elem_by_class(class_name='dgrey_12')
    rows = selextractor.get_table_rows_by_class(class_name='tblfund')
    print("rows count",len(rows))
    link_list = []
    i = 2
    while(i<=len(rows)):
        fund_link={}
        data_list = []
        str1 = "//html//body//div[3]//div[1]//div[5]//table[2]//tbody//tr[%d]//td[1]//p//a" % i
        str2 = "//html//body//div[3]//div[1]//div[5]//table[2]//tbody//tr[%d]//td[3]//p//a" % i
        
        linktext = selextractor.get_elem_by_xpath_href(xpath=str1,attr='href')
        fundname = selextractor.get_elem_by_xpath_href(xpath=str1,attr='innerText')
        fundtype = selextractor.get_elem_by_xpath_href(xpath=str2,attr='innerText')
        fundsplit = linktext.split('/')
        fundcode = fundsplit[-1]
        
        data_list.append(fundname)
        data_list.append(fundcode)
        data_list.append(linktext)
        data_list.append('')
        data_list.append(fundtype)
        #print("datalist is",data_list)

        #fundtype = selextractor.get_elem_by_xpath_href(xpath='//html//body//div[3]//div[1]//div[5]//table[2]//tbody/tr[row]/td[2]//p//a',attr='innerText')
        
        #print("after get elem inside main script",linktext,fundtype)
        for j in range(len(field_names)):
            print("i is",i)
            fund_link[field_names[j]] = data_list[j]
        print("fund link",fund_link)
        link_list.append(fund_link)
        
        i+=1
        #print("after get elem inside main script",linktext)


    """ write the data now in the csv file"""
    csvwriter.writefile_rows(link_list)       
except Exception as e:
    print(e)
    logger.error(e,exc_info=True)