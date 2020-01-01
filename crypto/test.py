
import datetime
from collections import OrderedDict
import re
from decimal import Decimal
str2 = "? BTC".replace(',',''  )
print(str2)

l =  (re.findall(r"[-+]?\d*\.\d+|\d+", str2))
print(l)

def filter_list(l1):
  #print("do someething here")
  filtered_list = []
  #print(type(l1))
  if(l1[0]=='eth'):
    return(True)
  else:
    return(False)



l2 = [OrderedDict([('\ufeff"CURRENCY"', 'LINK'), ('PAIR', 'BTC')]), OrderedDict([('\ufeff"CURRENCY"', 'ETH'), ('PAIR', 'BTC')])]
for l in l2:
  if(l['\ufeff"CURRENCY"']=='LINK'):
    print("Link FOUND")
print(l2)
l1 = [('btc','etx'),('usd','eth'),('btc','xrp')]
filtered_list = filter(filter_list,l1)
for item in filtered_list:
  print(item)




