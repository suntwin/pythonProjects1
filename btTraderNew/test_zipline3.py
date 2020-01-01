from zipline.data import bundles
import os
import pandas as pd
from zipline.data.bundles import register, load
from zipline.data.bundles.csvdir import csvdir_equities
from zipline.data.data_portal import DataPortal
from zipline.api import schedule_function,get_open_orders,cancel_order,set_slippage
from zipline.pipeline.data import Column
from zipline.pipeline.pipeline import Pipeline
from zipline.pipeline.data import USEquityPricing
from zipline.pipeline.factors.basic import SimpleMovingAverage
from zipline.pipeline.engine import SimplePipelineEngine
from zipline.pipeline.loaders import USEquityPricingLoader
from zipline.finance import slippage
from trading_calendars.trading_calendar import TradingCalendar
from trading_calendars import get_calendar
import itertools
import talib
from zipline.pipeline.filters import StaticAssets
import pyfolio as pf
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
  order_target_percent,
  pipeline_output,
  record,
  schedule_function,
  symbols,
  symbol,
  sid,
)

start_session=pd.Timestamp('2018-09-01', tz='utc')
end_session=pd.Timestamp('2019-07-31', tz='utc')
import numpy as np
from scipy import stats
from zipline.api import order_target, record, symbol
from zipline.finance.execution import LimitOrder

register(
  'nse-bundle',
  csvdir_equities(
    ["daily"],
    '/Users/niteshchawla/Ownstuff/pythonProjects/btTraderNew/'
  ),
  calendar_name="XNSE",
  start_session=start_session,
  end_session=end_session
)

bundle=load('nse-bundle')
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
                                     pd.Timestamp('2018-09-01', tz='utc'), 'daily')
close_prices_list=data_por.get_spot_value(bundle.asset_finder.retrieve_all(bundle.asset_finder.equities_sids), 'close',
                                          pd.Timestamp('2018-09-01', tz='utc'), 'daily')

list_sids=list(bundle.asset_finder.sids)


# print((close_prices))

def slope(ts):  ## new version
  x=np.arange(len(ts))
  log_ts=np.log(ts)
  slope, intercept, r_value, p_value, std_err=stats.linregress(x, log_ts)
  annualized_slope=(np.power(np.exp(slope), 250)-1)*100
  return annualized_slope*(r_value**2)


def _slope(ts):
  x=np.arange(len(ts))
  slope, intercept, r_value, p_value, std_err=stats.linregress(x, ts)
  annualized_slope=(np.power(np.exp(slope), 250)-1)*100
  return annualized_slope*(r_value**2)


def cancel_open_orders(context, data):
  open_orders=get_open_orders()
  for security in open_orders:
    for order in open_orders[security]:
      cancel_order(order)


def initialize(context):
  """
  Called once at the start of the algorithm.
  """
  # Setting global parameters
  # context.assets = symbol('3MINDIA')
  context.market=symbol('NIFTY500')
  context.market_window=200
  context.momentum_window=90
  context.minimum_momentum=30
  context.number_of_stocks=10
  context.market_window=200
  context.atr_window=20
  context.talib_window=context.atr_window+5
  context.risk_factor=0.003
  # context.risk_factor=0.03
  context.momentum_window_length=90
  context.market_cap_limit=700
  context.rank_table_percentile=.30
  context.significant_position_difference=0.1
  context.min_momentum=30.0
  context.leverage_factor=1.0  # 1=2154%. Guy's version is 1.4=3226%
  context.use_stock_trend_filter=0  # either 0 = Off, 1 = On
  context.sma_window_length=100  # Used for the stock trend filter
  context.use_market_trend_filter=1  # either 0 = Off, 1 = On. Filter on SPY
  context.use_average_true_range=1  # either 0 = Off, 1 = On. Manage risk with individual stock volatility
  context.average_true_rage_multipl_factor=1  # Change the weight of the ATR. 1327%
  my_dict={}
  for x in range(len(list_sids)):
    my_dict[x]=sid(list_sids[x])

  context.assets=list(my_dict.values())

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
                              pd.to_datetime('2018-01-03', utc=True),
                              pd.to_datetime('2019-07-31', utc=True))

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
  # schedule_function(my_rebalance, date_rules.week_end(days_offset=2))
  # Schedule my rebalance function
  schedule_function(my_rebalance,
                    date_rules.month_start(),
                    time_rules.market_open(hours=1))

  # Cancel all open orders at the end of each day.
  schedule_function(cancel_open_orders, date_rules.every_day(), time_rules.market_close())
  set_slippage(slippage.FixedSlippage(spread=0.00))

  # Cancel all open orders at the end of each day.
  # schedule_function(cancel_open_orders, date_rules.every_day(), time_rules.market_close())
  # set_slippage(slippage.FixedSlippage(spread=0.00))
  # schedule_function(my_rebalance, date_rules.month_end())


#


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
  latest_price=USEquityPricing.close.latest

  #   sma = SimpleMovingAverage(inputs=[USEquityPricing.close], window_length=50)
  #   print("sma for equity is",sma)
  #   above_sma = (latest_price > sma)
  #   pipe.set_screen(above_sma,overwrite=True)
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


def get_position_size(context, highs, lows, closes, security):
  try:
    average_true_range=talib.ATR(highs.ffill().dropna().tail(context.talib_window),
                                 lows.ffill().dropna().tail(context.talib_window),
                                 closes.ffill().dropna().tail(context.talib_window),
                                 context.atr_window)[
      -1]  # [-1] gets the last value, as all talib methods are rolling calculations#
    if not context.use_average_true_range:  # average_true_range
      average_true_range=1  # divide by 1 gives... same initial number
      context.average_true_rage_multipl_factor=1

    return (context.portfolio.portfolio_value*context.risk_factor)/(
      average_true_range*context.average_true_rage_multipl_factor)
  except:
    # log.warn('Insufficient history to calculate risk adjusted size for {0.symbol}'.format(security))
    return 0


def significant_change_in_position_size(context, new_position_size, old_position_size):
  return np.abs((new_position_size-old_position_size)/old_position_size)>context.significant_position_difference


def handle_data(context, data):
  # context.pipeline_data=pipeline_output('make_pipeline')
  # window_1 = data.history(context.assets,'high',1, '1d')
  # print(window_1)
  # schedule_function(my_rebalance(context, data), date_rules.week_end(days_offset=3))
  pass


def my_rebalance(context, data):
  algo_run_timestamp=str(context.datetime)+"T00:00.000000000"
  # print("has hit rebalance on date", algo_run_timestamp)
  highs=data.history(context.assets, "high", context.talib_window, "1d")
  lows=data.history(context.assets, "low", context.talib_window, "1d")
  closes=data.history(context.assets, "price", context.market_window, "1d")

  estimated_cash_balance=context.portfolio.cash
  # print("estimated cash balance",estimated_cash_balance)
  slopes=closes[context.assets].tail(context.momentum_window_length).apply(slope)

  slopes.sort_values(ascending=False).head(10)
  slopes=slopes[slopes>context.min_momentum]
  ranking_table=slopes[slopes>slopes.quantile(1-context.rank_table_percentile)].sort_values(ascending=False)
  # log.info(len(ranking_table.index))
  # close positions that are no longer in the top of the ranking table
  print("Stocks ranking on", algo_run_timestamp, "\n", ranking_table)
  positions=context.portfolio.positions
  print("positions are", positions)
  for security in positions:
    price=data.current(security, "price")
    position_size=positions[security].amount
    if data.can_trade(security) and security not in ranking_table.index:
      order_target(security, 0, style=LimitOrder(price))
      estimated_cash_balance+=price*position_size
    elif data.can_trade(security):
      new_position_size=get_position_size(context, highs[security], lows[security], closes[security], security)
      if significant_change_in_position_size(context, new_position_size, position_size):
        estimated_cost=price*(new_position_size*context.leverage_factor-position_size)
        order_target(security, new_position_size*context.leverage_factor, style=LimitOrder(price))
        estimated_cash_balance-=estimated_cost

  # Market history is not used with the trend filter disabled
  # Removed for efficiency
  if context.use_market_trend_filter:
    market_history=data.history(context.market, "price", context.market_window, "1d")  ##SPY##
    current_market_price=market_history[-1]
    average_market_price=market_history.mean()
  else:
    average_market_price=0

  if (current_market_price>average_market_price):  # if average is 0 then jump in
    for security in ranking_table.index:
      if data.can_trade(security) and security not in context.portfolio.positions and security.symbol != 'YESBANK':
        new_position_size=get_position_size(context, highs[security], lows[security], closes[security],
                                            security)
        estimated_cost=data.current(security, "price")*new_position_size*context.leverage_factor
        if estimated_cash_balance>estimated_cost:
          order_target(security, new_position_size*context.leverage_factor,
                       style=LimitOrder(data.current(security, "price")))
          estimated_cash_balance-=estimated_cost
#   """
#   Our monthly rebalancing
#   """
#   # context.pipeline_data=pipeline_output('us_500')
#   # context.output=pipeline_output('us_500')  # update the current top 500 us stocks
#   # context.pipeline_data=pipeline_output('us_500')
#   algo_run_timestamp=str(context.datetime)+"T00:00.000000000"
#   print("has hit rebalance on date", algo_run_timestamp)
#   market_history=data.history(context.market, "close", context.market_window, "1d")  ##NIFTY##
#   market_price_algo_day=market_history.get(algo_run_timestamp)
#   market_sma_200=data.history(context.market, 'price', bar_count=200, frequency="1d").mean()
#   market_cond=market_price_algo_day>market_sma_200
#   market_chg=get_change(market_price_algo_day, market_sma_200)
#   print("market chg is", market_chg)
#   market_chg_cond=(market_chg<0.5)
#   if (market_chg_cond):
#     print(str(algo_run_timestamp))
#     print("nothing to buy")
#     return

#   my_dict={}
#   for x in range(len(list_sids)):
#     my_dict[x]=sid(list_sids[x])

#   context.security_list=list(my_dict.values())

#   momentum_list=np.log(data.history(context.security_list, "close", context.momentum_window, "1d")).apply(_slope)

#   # print("momentum list is", momentum_list.sort_values(ascending=False))
#   ranking_table=momentum_list.sort_values(ascending=False)  # Sorted

#   # print("price at a particular time",market_history.get(algo_run_timestamp))

#   # print("market history",market_history)
#   # market details
#   print("Nifty current price and 200Sma", market_price_algo_day, market_sma_200)
#   buy_list=ranking_table[:context.number_of_stocks]  # These we want to buy
#   print("buy list", buy_list)
#   print("context portfolio positions", context.portfolio.positions)
#   # Let's trade!
#   positions = context.portfolio.positions
#   for security in positions:
#         price = data.current(security, "price")
#         position_size = positions[security].amount
#         if data.can_trade(security) and security not in ranking_table.index:
#             order_target(security, 0, style=LimitOrder(price))
#             estimated_cash_balance += price * position_size
#         elif data.can_trade(security):
#             new_position_size = get_position_size(context, highs[security], lows[security], closes[security],security)
#             if significant_change_in_position_size(context, new_position_size, position_size):
#                 estimated_cost = price * (new_position_size * context.leverage_factor - position_size)
#                 order_target(security, new_position_size * context.leverage_factor, style=LimitOrder(price))
#                 estimated_cash_balance -= estimated_cost

# import pandas as pd
#
# results = pd.read_pickle('nse_weekly2.pickle')
# returns, positions, transactions = pf.utils.extract_rets_pos_txn_from_zipline(results)
# print("done")