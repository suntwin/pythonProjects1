from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import logging
import logging.config

""" logging configureation done here """
logging.config.fileConfig('logging.conf')

# create logger
logger = logging.getLogger('logger_ratios')

driver = webdriver.Chrome()
driver.get("https://www.screener.in/login")
# assert "Python" in driver.title
# elem = driver.find_element_by_name("q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# #driver.close()
try:
	elem_user = driver.find_element_by_id("id_username")
	elem_pass = driver.find_element_by_id("id_password")
	elem_user.send_keys("niteshchawla81@gmail.com")
	elem_pass.send_keys("hotdog66")
	elem_button2 = driver.find_element_by_xpath("//html/body/main/form/p/button")
	elem_button = driver.find_element_by_class_name('button-primary')
	elem_button2.click()

	
except Exception as e:
	logger.error(e,exc_info=True)