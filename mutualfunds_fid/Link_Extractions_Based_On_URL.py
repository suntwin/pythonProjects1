"""this script is used to extract the links of mutual funds from the list of all the mutual funds inside
 a table control inside the html page returned"""



from htmlParser import HtmlParser
from csvWriter import CsvWriter
from csvReader import CsvReader
from DataStructures_Utility import DataStructures_Utility
import config as cfg
import time,random
import logging
import logging.config

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

# create logger
logger = logging.getLogger('logger_mutualFundsPortfolio')



"""read the configuration file parameters"""

fieldnames_link = cfg.settings['FIELD_NAMES_LINKS_DATA']
large_cap_link = cfg.settings['LARGE_CAPS_URL']
fieldnames = cfg.settings['FIELD_NAMES_LINKS_DATA']
file_name = cfg.settings['CSV_LINK_FILE']
abspath = cfg.settings['ABS_PATH']
url_file_name = cfg.settings['CSV_FILE_WITH_FUNDS_URLS']




"""read the urls from the file"""

csvreader = CsvReader(abspath,url_file_name,fieldnames_link)

"""read the file here """
url_links = csvreader.readrows()

"""initialise a csvwriter to write a csv file for output"""
csvwriter =  CsvWriter(abspath,file_name,fieldnames)

logger.info('Starting File Processing')

"""loop each url from the read file and process the data to write in another file one url at a time"""
for url in url_links:
	"""generate a random and sleep randomly. This is to add a bit of random delay while accesing the website"""
	logger.debug('Url being processed is %s',url['Link'])
	sleep_time = random.randint(1, 10)
	time.sleep(sleep_time)
	ds_utility = None

	try:
		ds_utility = DataStructures_Utility(url['Link'],False)
	except Exception as inst:
			logger.error('An error has occoured',exc_info=True)
			

	if(ds_utility != None):
		try:

			table = ds_utility.extract_link_table_tag()				
			logger.info("the table name returned is %s",table)
			links = ds_utility.extract_hyper_links_from_table(cfg.settings['SMALL_CAPS_CLASS_NAME'],table)
			links_data= ds_utility.extract_hyper_link_info(links,fieldnames.split(','))

			logger.info("Links Data Extracted Successfully")
			"""once you have the links data just write it into a csv file
			write a header of the file first"""
			logger.info("Begin Writing the file")
			csvwriter.writefile_header()
			for row in links_data:
				csvwriter.writefile_row(row)
			logger.info("File Writing is finished")
		except Exception as e:
			logger.error('An error has occoured',exc_info=True)


	



 