from datetime import datetime
import pandas as pd
from scipy.stats import linregress
import matplotlib.pyplot as plt
import numpy as np
#%matplotlib inline
# plt.rcParams["figure.figsize"] = (10, 6) # (w, h)
# plt.ioff()
tickers = pd.read_csv('/Users/niteshchawla/Ownstuff/pythonProjects/btTraderNew/data/base_data/nifty_500.csv').symbol.to_list()


stocks = (
    (pd.concat([pd.read_csv(f"/Users/niteshchawla/Ownstuff/pythonProjects/btTraderNew/data/{ticker}.csv",index_col='DATE', parse_dates=True)['CLOSE'].rename(ticker)for ticker in tickers],axis=1,sort=True)
    )
)
"""the below will return a dataframe and all duplicate rows removed by checking all columns"""
stocks = stocks.loc[:,~stocks.columns.duplicated()]
#print(type(stocks))
stocks.to_csv("/Users/niteshchawla/Ownstuff/pythonProjects/btTraderNew/data/base_data/alldata.csv")


def momentum(closes):
    returns = np.log(closes)
    #print("rets inside momentum",returns)
    x = np.arange(len(returns))
    slope, _, rvalue, _, _ = linregress(x, returns)
    return ((1 + slope) ** 252) * (rvalue ** 2)  # annualize slope and multiply by R^2

momentums = stocks.copy(deep=True)
"""When deep=True (default), a new object will be created with a copy of the calling object’s data and indices. Modifications to the data or indices of the copy will not be reflected in the original object (see notes below).
"""

for ticker in tickers:


    momentums[ticker] = stocks[ticker].rolling(90).apply(momentum, raw=False)
    #print("momentum ticker for ", ticker, momentums[ticker])
print("momentums",momentums)
plt.figure(figsize=(12, 9))
plt.xlabel('Days')
plt.ylabel('Stock Price')

bests = momentums.max().sort_values(ascending=False).index[:4]
for best in bests:
    print("inside best",best)
    end = momentums[best].index.get_loc(momentums[best].idxmax())

    if(end==230):
        end = 133
    print("end is",end)
    rets = np.log(stocks[best].iloc[end - 90 : end])
    x = np.arange(len(rets))
    print("len(rets)",len(rets))
    slope, intercept, r_value, p_value, std_err = linregress(x, rets)
   # the jagged line

    plt.plot(np.arange(180), stocks[best][end-90:end+90])
   # the exponential curve
    plt.plot(x, np.e ** (intercept + slope*x))

plt.show()