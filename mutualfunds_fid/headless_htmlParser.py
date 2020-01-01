import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options


chrome_options = Options() 
print(chrome_options)
chrome_options.add_argument("--headless")
chrome_options.binary_location = '/Applications/Google Chrome   Canary.app/Contents/MacOS/Google Chrome Canary'
driver = webdriver.Chrome(executable_path=os.path.abspath("chromedriver"),chrome_options=chrome_options)
