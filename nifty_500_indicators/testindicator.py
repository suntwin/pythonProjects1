import os
import numpy as np
import pandas as pd
<<<<<<< HEAD
from stockstats import StockDataFrame as Sdf

=======
from stockstats import *
>>>>>>> 539e6d12b122dfe6a90ecb33cc5ffe197fef6dc3

# from csvWriter import CsvWriter
# from csvReader import CsvReader

<<<<<<< HEAD
stock = Sdf.retype(pd.read_csv('nifty_500.csv'))
#stock = stock.start_from('2019-04-03')
print(type(stock))

#print(stock.nlargest(20,'date'))
#print((stock['macd'])
print("macd",(stock['macd']['2019-05-07']))
print("macd signal",(stock['macds']['2019-05-07']))
print("macd hist",(stock['macdh']['2019-05-07']))
print("macd",(stock['macd']['2019-06-19']))
print("macd signal",(stock['macds']['2019-06-19']))
print("macd hist",(stock['macdh']['2019-06-19']))
=======
stock = StockDataFrame.retype(pd.read_csv('nifty_500.csv'))
print(stock.columns)
#print(stock.nlargest(20,'date'))
print((stock['macd']).count())
>>>>>>> 539e6d12b122dfe6a90ecb33cc5ffe197fef6dc3
