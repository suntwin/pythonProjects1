from bs4 import BeautifulSoup
import re
import urllib2
url = "htmfile.htm"
page = urllib2.urlopen(url)

soup = BeautifulSoup(page.read)
print(soup)