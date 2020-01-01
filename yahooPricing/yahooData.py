from zipline.data import bundles
import os
import pandas as pd
from zipline.data.bundles import register, load
from zipline.data.bundles.csvdir import csvdir_equities
from zipline.data.bundles.yahoo import yahoo_stock_data
from zipline.data.data_portal import DataPortal
from zipline import run_algorithm
from zipline.api import schedule_function
from zipline.pipeline.data import Column
from zipline.pipeline.pipeline import Pipeline
from zipline.api import *
from zipline.pipeline.data import USEquityPricing
from zipline.pipeline.engine import SimplePipelineEngine
from zipline.pipeline.loaders import USEquityPricingLoader
from trading_calendars.trading_calendar import TradingCalendar
from trading_calendars import get_calendar
import itertools
from zipline.pipeline.filters import StaticAssets

# Import visualization
import matplotlib.pyplot as plt

from zipline.utils.events import (
  date_rules,
  time_rules,
  Always,
  ComposedRule,
  Never,
  OncePerDay,
)
from zipline.api import (
  attach_pipeline,
  date_rules,
  order_target_percent,
  pipeline_output,
  record,
  schedule_function,
  symbols,
  symbol,
  sid,
)

start_session=pd.Timestamp('2015-01-01', tz='utc')
end_session=pd.Timestamp('2019-12-13', tz='utc')
import numpy as np
from scipy import stats
from zipline.api import order_target, record, symbol

register('yahoo-bundle', yahoo_stock_data,
         calendar_name="XNSE",
         start_session=start_session,
         end_session=end_session
         )

bundle=load('yahoo-bundle')
all_assets=bundle.asset_finder.retrieve_all(bundle.asset_finder.sids)
# create a python set
symbols=set(
  str(asset.symbol) for asset in bundle.asset_finder.retrieve_all(bundle.asset_finder.equities_sids)
)

list_symbols=list(symbols)
# print(type(list_symbols))
# print("list of symbols", list_symbols)
data_por=DataPortal(bundle.asset_finder,
                    get_calendar("XNSE"),
                    bundle.equity_daily_bar_reader.first_trading_day,
                    equity_minute_reader=bundle.equity_minute_bar_reader,
                    equity_daily_reader=bundle.equity_daily_bar_reader,
                    adjustment_reader=bundle.adjustment_reader)

close_prices=data_por.get_spot_value(bundle.asset_finder.retrieve_all(bundle.asset_finder.equities_sids), 'close',
                                     pd.Timestamp('2007-02-02', tz='utc'), 'daily')
close_prices_list=data_por.get_spot_value(bundle.asset_finder.retrieve_all(bundle.asset_finder.equities_sids), 'close',
                                          pd.Timestamp('2017-12-31', tz='utc'), 'daily')

list_sids=list(bundle.asset_finder.sids)


# print((close_prices))


def _slope(ts):
  x=np.arange(len(ts))
  slope, intercept, r_value, p_value, std_err=stats.linregress(x, ts)
  annualized_slope=(np.power(np.exp(slope), 250)-1)*100
  return annualized_slope*(r_value**2)


def initialize(context):
  """
  Called once at the start of the algorithm.
  """
  # Setting global parameters
  # context.assets = symbol('3MINDIA')
  context.market=symbol('NIFTY.NS')
  context.market_window=200
  context.momentum_window=30
  context.minimum_momentum=30
  context.number_of_stocks=10
  # --------------------------

  """Set
  up
  pipeline
  engine"""

  # Loader for pricing
  pipeline_loader=USEquityPricingLoader(
    bundle.equity_daily_bar_reader,
    bundle.adjustment_reader,
  )

  def choose_loader(column):
    if column in USEquityPricing.columns:
      return pipeline_loader

    raise ValueError(
      'No PipelineLoader registered for column %s.'%column
    )

  engine=SimplePipelineEngine(
    get_loader=choose_loader,
    calendar=get_calendar("XNSE").all_sessions,
    asset_finder=bundle.asset_finder,
  )

  pipe=make_pipeline()

  results=engine.run_pipeline(pipe,
                              pd.to_datetime('2015-01-01', utc=True),
                              pd.to_datetime('2019-12-13', utc=True))

  # print(results.head(1200))
  context.pipeline_data=results
  # print("type results",type(results))
  # Create our dynamic stock selector.
  attach_pipeline(pipe, 'make_pipeline')

  # Rebalance monthly
  # schedule_function(my_rebalance, date_rules.month_start(), time_rules.market_open(hours=1))

  """close_prices_list=data_por.get_spot_value(bundle.asset_finder.retrieve_all(bundle.asset_finder.equities_sids), 'close',
                                          pd.Timestamp('2018-12-03', tz='utc'), 'daily')"""

  # print("type of close prices", type(close_prices_list))
  schedule_function(my_rebalance, date_rules.week_end(days_offset=2))
  # schedule_function(my_rebalance, date_rules.month_end())


#

def output_progress(context):

  """
  Output some performance numbers during backtest run
  This code just prints out the past month's performance
  so that we have something to look at while the backtest runs.
  """
  from zipline.api import get_datetime

  # Get today's date
  today=get_datetime().date()

  # Calculate percent difference since last month
  perf_pct=(context.portfolio.portfolio_value/context.last_month)-1

  # Print performance, format as percent with two decimals.
  print("{} - Last Month Result: {:.2%}".format(today, perf_pct))

  # Remember today's portfolio value for next month's calculation
  context.last_month=context.portfolio.portfolio_value

def make_pipeline():
  """
  This will return the top 500 US stocks by market cap, dynically updated.
  """
  # Base universe set to the Q500US
  base_universe=(StaticAssets(all_assets))

  # print(type(base_universe))
  yesterday_close=close_prices_list

  pipe=Pipeline(
    screen=base_universe,
    columns={
      'close': USEquityPricing.close.latest,
      'volume': USEquityPricing.volume.latest,
      'open': USEquityPricing.open.latest,
    }
  )
  return pipe


def get_change(current, previous):
  if current==previous:
    return 100.0
  try:
    return ((current-previous)/previous)*100.0
  except ZeroDivisionError:
    return 0


def before_trading_start(context, data):
  print("inside before trading start")
  # context.pipeline_data=pipeline_output(name='make_pipeline')


def handle_data(context, data):
  # context.pipeline_data=pipeline_output('make_pipeline')
  # window_1 = data.history(context.assets,'high',1, '1d')
  # print(window_1)
  # schedule_function(my_rebalance(context, data), date_rules.week_end(days_offset=3))
  pass


def my_rebalance(context, data):
  """
  Our monthly rebalancing
  """
  output_progress(context)
  # context.pipeline_data=pipeline_output('us_500')
  # context.output=pipeline_output('us_500')  # update the current top 500 us stocks
  # context.pipeline_data=pipeline_output('us_500')
  algo_run_timestamp=str(context.datetime)+"T00:00.000000000"
  print("has hit rebalance on date", algo_run_timestamp)
  market_history=data.history(context.market, "close", context.market_window, "1d")  ##NIFTY##
  market_price_algo_day=market_history.get(algo_run_timestamp)
  market_sma_200=data.history(context.market, 'close', bar_count=200, frequency="1d").mean()
  market_cond=market_price_algo_day>market_sma_200
  market_chg=get_change(market_price_algo_day, market_sma_200)
  print("market chg is", market_chg)
  market_chg_cond=(market_chg<0.5)
  if (market_chg_cond):
    print(str(algo_run_timestamp))
    print("nothing to buy")
    return

  my_dict={}
  for x in range(len(list_sids)):
    my_dict[x]=sid(list_sids[x])

  context.security_list=list(my_dict.values())

  momentum_list=np.log(data.history(context.security_list, "close", context.momentum_window, "1d")).apply(_slope)

  # print("momentum list is", momentum_list.sort_values(ascending=False))
  ranking_table=momentum_list.sort_values(ascending=False)  # Sorted

  # print("price at a particular time",market_history.get(algo_run_timestamp))

  # print("market history",market_history)
  # market details
  print("Nifty current price and 200Sma", market_price_algo_day, market_sma_200)
  buy_list=ranking_table[:context.number_of_stocks]  # These we want to buy
  print("buy list", buy_list)
  print("context portfolio positions", context.portfolio.positions)
  # Let's trade!
  for security in context.portfolio.positions:
    if security not in buy_list:
      print("making this", security, 0)
      order_target(security, 0)  # If a stock in the portfolio is not in buy list, sell it!

  for security in context.security_list:
    if security in buy_list:
      sma_100=data.history(security, 'price', bar_count=100, frequency="1d").mean()
      sma_50=data.history(security, 'price', bar_count=50, frequency="1d").mean()
      print("security details", security)

      if buy_list[security]<context.minimum_momentum:
        weight=0.0
      else:
        weight=1.0/context.number_of_stocks  # Equal size to keep simple
      cond1=sma_50>sma_100
      cond2=market_price_algo_day>market_sma_200
      print("security 50 and 100 sma", sma_50, sma_100)

      if (cond1 and cond2):
        order_target_percent(security, weight)  # Trade!
        print("ordering this", security)



