# for setting our open and close times
from datetime import time
# for setting our start and end sessions
import pandas as pd
# for setting which days of the week we trade on
from pandas.tseries.offsets import CustomBusinessDay
# for setting our timezone
from pytz import timezone

# for creating and registering our calendar
from trading_calendars import register_calendar, TradingCalendar
from zipline.utils.memoize import lazyval

class NSEExchangeCalendar(TradingCalendar):
  """
  An exchange calendar for trading assets 24/7.

  Open Time: 12AM, UTC
  Close Time: 11:59PM, UTC
  """

  @property
  def name(self):
    """
    The name of the exchange, which Zipline will look for
    when we run our algorithm and pass TFS to
    the --trading-calendar CLI flag.
    """
    return "NSE"

  @property
  def tz(self):
    """
    The timezone in which we'll be running our algorithm.
    """
    return timezone("UTC")

  @property
  def open_time(self):
    """
    The time in which our exchange will open each day.
    """
    return time(9, 0)

  @property
  def close_time(self):
    """
    The time in which our exchange will close each day.
    """
    return time(15, 30)

  @lazyval
  def day(self):
    """
    The days on which our exchange will be open.
    """
    weekmask = "Mon Tue Wed Thu Fri"
    return CustomBusinessDay(
      weekmask=weekmask
    )

  @property
  def regular_holidays(self):
    return HolidayCalendar([
      '2018-01-26',
      '2018-02-13',
      '2018-03-02',
      '2018-03-29',
      '2018-03-30',
      '2018-05-01',
      '2018-08-15',
      '2018-08-22',
      '2018-09-13',
      '2018-09-20',
      '2018-10-02',
      '2018-10-18',
      '2018-11-08',
      '2018-11-23',
      '2018-12-25',
      '2019-03-04',
      '2019-03-21',
      '2019-04-17',
      '2019-04-19',
      '2019-04-29',
      '2019-05-01',
      '2019-06-05',
      '2019-08-12',
      '2019-08-15',
      '2019-09-02',
      '2019-09-10',
      '2019-10-02',
      '2019-10-08',
      '2019-10-21',
      '2019-10-28',
      '2019-11-12',
      '2019-12-25'
    ])