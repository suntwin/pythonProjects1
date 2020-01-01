# this script is used to extract the portfolio holdings of a mutual fund. The mutual fund url will be read from a csv
# file and all the holdings of that fund are saved in another csv file


from htmlParser import HtmlParser
from csvWriter import CsvWriter
from csvReader import CsvReader
from bs4 import BeautifulSoup
import MutualFunds_Error
from MutualFunds_Error import MutualFunds_URL_Error
from DataStructures_Utility import DataStructures_Utility
import urllib2
import config as cfg
import time,random
import logging
import logging.config

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

# create logger
logger = logging.getLogger('logger_mutualFundsPortfolio')

""" read the configuration file """

fieldnames_link = cfg.settings['FIELD_NAMES_LINKS_DATA']
portfolio_fieldnames = cfg.settings['PORTFOLIO_FIELD_NAMES']
file_name = cfg.settings['CSV_LINK_FILE']
portfolio_url = cfg.settings['PORTFOLIO_URL']
abspath = cfg.settings['ABS_PATH']
portfolio_class = cfg.settings['PORTFOLIO_HOLDINGS_TABLE_CLASS_NAME'] 
file_name_portfolio = cfg.settings['CSV_PORTFOLIO_FILE']
file_exception = cfg.settings['EXCEPTION_FILE']

""" initialise the csv reader to read the Urls of Mutual funds"""
csvreader = CsvReader(abspath,file_name,fieldnames_link)


""" read the file here. This will return a list of dictionaries """
data_list = csvreader.readrows()

""" initialise the CSV writer to ,portfolio_fieldnames) 
write the header for the filecsvwritstart writing the holdings in a separate csv file
"""

csvwriter = CsvWriter(abspath,file_name_portfolio,portfolio_fieldnames)
csvwriter2 = CsvWriter(abspath,file_exception,fieldnames_link)

""" write the header """
csvwriter.writefile_header()

""" write the individual lines under the header line """
logger.info("Start Processing the Fund Urls One at a time")
for row in data_list:
    if(row['Do_Not_Use']!='X'):
        """certain links are just not correct. Hence the above flag is added in the csv file to ignore the link
        incase the link is a bad one"""

        """construct the portfolio holding url based on the code"""
        portfolio_holdings_url = portfolio_url+row['code']
        logger.debug("Processing Url for fund %s %s %s %s",row['code'],row['fundname'],row['fund_category'],portfolio_holdings_url)

        """generate a random and sleep randomly. This is to add a bit of random delay while accesing the website"""
        sleep_time = random.randint(1, 10)
        time.sleep(sleep_time)

        logger.debug("script slept for %d",sleep_time)
        ds_utility = None
        try:
            """Initialise the Url for Beautiful Soup Parsing"""
            ds_utility = DataStructures_Utility(portfolio_holdings_url,False)
        except Exception as e:
            logger.error('An error has occoured',exc_info=True)



    
        if (ds_utility != None):
            try:

                print("ds_utility",ds_utility)
                table = ds_utility.extract_table_by_class(portfolio_class)
                """Extract the table containing the Holdings inside the html page. Usually it has a specific class
                that can be configured in the cfg file"""


                """Update the returned table with extra information for querying purposes such as fund code, fundname and timestamp"""
                table_with_codes = ds_utility.add_fund_and_code(table,row['fundname'],row['code'],row['fund_category'],portfolio_fieldnames.split(','))

                

                """finally write the above rows into rhe csv file"""
#
#                for row in table_with_codes:
#                    csvwriter.writefile_row(row)
#                    logger.debug('portfolio row %s',row)
#                    print("Inside portfolio script",row)
                logger.info("number of records are %d",len(table_with_codes))
                csvwriter.writefile_rows(table_with_codes)
                
                logger.info("File Writing is finished")
            except Exception as e:
                print("A general exception has occured, print on the console",e)
            except MutualFunds_Error as e:
                print("exception type",type(e))
                logger.error(e.expt,exc_info=True)
                
                if(e.code == '104'):
                    
                     csvwriter2.writefile_row(row)
                    
               
logger.info("File Writing is completely finished")               
#csvwriterplain.close_file()
csvwriter.close_file()   
csvwriter2.close_file()   
    