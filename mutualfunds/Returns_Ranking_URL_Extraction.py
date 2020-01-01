
from htmlParser import HtmlParser
from csvWriter import CsvWriter
from csvReader import CsvReader
from DataStructures_Utility import DataStructures_Utility
import config as cfg
import time,random
import logging
import logging.config
import gc
from db_functions import DB_Functions


# close any open db connections
gc.collect()

# Reading the configuration file here
db_name = cfg.settings['DB_NAME']
db_user = cfg.settings['DB_USER']
db_password = cfg.settings['DB_PASSWORD']
url_prefix = cfg.settings['MONEYCONTROL_URL_PREFIX']
return_div = cfg.settings['RETURN_DIV']
return_div_class = cfg.settings['RETURN_DIV_CLASS']

# Get an instance to DB_Functions
db_functions = DB_Functions(db_name,db_user,db_password)

#Queries
db_allfunds = "Select * from fundsinfo where fund_returns_url is NULL"
db_upd_funds = "UPDATE fundsinfo SET fund_returns_url = %s where fund_code = %s"

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

# create logger
logger = logging.getLogger('logger_mutualFundsPortfolio')


logger.info('Starting processing the fundsinfo table')

fund_rows = db_functions.db_read(db_allfunds)
logger.debug('Number of funds retreived %d',len(fund_rows))
fund_rows_to_update = fund_rows
try:
	for row in fund_rows:
		try:
			list_temp = []
			return_urls = []
			return_url_tuple = ()
			url = url_prefix+row[2]
			logger.debug("Url being processed is %s ",url)
			sleep_time = random.randint(10, 60)
			logger.debug("Script will sleep for %d seconds",sleep_time)
			time.sleep(sleep_time)
			

			ds_utility = DataStructures_Utility(url,False)
			content = ds_utility.extract_div_tag(return_div,return_div_class)
			logger.debug("Return Url is  %s",content[0])
			print("funds row is ",fund_rows)

			fund_rows[22] = content[0]
			list_temp.append(content[0])
			list_temp.append(row[0])
			return_url_tuple = tuple(list_temp)
			return_urls.append(return_url_tuple)

		 	# after exitting fund_rows should be updated
			logger.debug('return url tuples are %s',return_urls)
			t = (db_upd_funds,return_urls)
	        	logger.debug('execute single is %s %s',db_upd_funds,return_urls)
			db_functions.db_update_multiple(db_upd_funds,return_urls)
			logger.info('DB Updated with Return Urls')
		except Exception as inst:
			logger.error('An error has occoured',exc_info=True)


	db_functions.db_close()
	logger.info("DB connection is closed now")

except Exception as inst:
			logger.error('An error has occoured',exc_info=True)



