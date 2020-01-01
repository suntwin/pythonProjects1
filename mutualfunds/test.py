
import datetime
import re
from decimal import Decimal
str2 = "0.02592323 BTC".replace(',',''  )
print(str2)

l = (re.findall(r"[-+]?\d*\.\d+|\d+", "Current Level: -13.2 db or 14.2 or 3"))
print(type(l))