import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import os, shutil


def clean_csv_folder(path):
  for the_file in os.listdir(path):
    file_path=os.path.join(path, the_file)
    try:
      if os.path.isfile(file_path):
        os.unlink(file_path)
      # elif os.path.isdir(file_path): shutil.rmtree(file_path)
    except Exception as e:
      print(e)

clean_csv_folder("/Users/niteshchawla/Ownstuff/pythonProjects/btTraderNew/daily/")

df_symbols = pd.read_csv("/Users/niteshchawla/Ownstuff/pythonProjects/btTraderNew/base_data/nifty_500.csv")
print(df_symbols.symbol)
series_symbols=df_symbols.symbol
list_symbols=series_symbols.to_list()
print(list_symbols)
df_stocks_price = pd.read_csv("/Users/niteshchawla/Ownstuff/pythonProjects/btTraderNew/base_data/nifty_500_Jan2018_to_July2019.csv")



for symbol in list_symbols:
  """query the dataframe for that symbol"""
  print("symbol",symbol)
  temp_df=pd.DataFrame()
  temp_df=df_stocks_price[df_stocks_price.SYMBOL==symbol]
  temp_reduced_df = temp_df[['TIMESTAMP','OPEN','HIGH','LOW','CLOSE','TOTTRDVOL']]
  temp_reduced_df=temp_reduced_df.drop_duplicates(subset='TIMESTAMP', keep="last")
  temp_reduced_df =  temp_reduced_df.sort_values(by=['TIMESTAMP'])
  print(temp_reduced_df.columns)
  file_name = symbol+".csv"
  file_path = "/Users/niteshchawla/Ownstuff/pythonProjects/btTraderNew/daily/"
  temp_reduced_df.rename(columns={"TOTTRDVOL": "VOLUME",
                                  "DATE":"date",
                                  "OPEN":"open",
                                  "HIGH":"high",
                                  "LOW":"low",
                                  "CLOSE":"close",
                                  "VOLUME":"volume"})
  temp_reduced_df.columns=['date', 'open', 'high', 'low', 'close', 'volume']
  # remove any duplicates before saving the file
  temp_reduced_df =  temp_reduced_df.drop_duplicates(subset='date', keep="last")
  temp_reduced_df =  temp_reduced_df.sort_values(by=['date'])
  print(temp_reduced_df.columns)
  temp_reduced_df.to_csv(file_path+file_name,index=False)