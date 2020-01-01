import pandas as pd
from zipline.data.bundles import register
from zipline.data.bundles.csvdir import csvdir_equities

start_session = pd.Timestamp('2018-07-02', tz='utc')
end_session = pd.Timestamp('2019-07-31', tz='utc')

register(
    'nse-bundle',
    csvdir_equities(
        ["data"],
        '/Users/niteshchawla/Ownstuff/pythonProjects/btTraderNew/'
    ),
    calendar_name="XNSE",
    start_session=start_session,
    end_session=end_session
)