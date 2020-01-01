
import logging
import logging.config
from csvWriter import CsvWriter
from seleniumextractor import SeleniumExtractor
import config_q as cfg

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

""" get the file location and other configuration"""

test_file = cfg.settings['TEST_FILE']
abspath = cfg.settings['ABS_PATH']
fieldnames = cfg.settings['FIELD_NAMES']
file_name = cfg.settings['CSV_OUTPUT_FILE']
field_names = fieldnames.split(',')

print('file://'+abspath+test_file)
url = 'file://'+abspath+test_file
# create logger
logger = logging.getLogger('logger_quiz')


"""initialise a csvwriter to write a csv file for output"""
csvwriter =  CsvWriter(abspath,file_name,fieldnames)
#csvwriterplain =  CsvWriterPlain(abspath,file_name,fieldnames)

logger.info('Starting File Processing')
csvwriter.writefile_header()

""" initialise Selenium Extractor """
try:
    selextractor = SeleniumExtractor(url)
  
    #elem = selextractor.get_elem_by_class(class_name='dgrey_12')
    questions = selextractor.get_elems_by_class('question-box-border')
    print("rows count",len(questions))
    print(questions)
    for q in questions:
        question_text = questions.


except Exception as e:
    print(e)
    logger.error(e,exc_info=True)
