class Selenium_Error(Exception):
  """Basic exception raised for all mutual funds errors """
  pass


class Driver_Find_Error(Selenium_Error):
  """Basic exception raised for all mutual funds errors """

  def __init__(self, message=None, code=None, expt=None):
    if (message is not None):
      message = unicode(message).encode("utf-8")

    self.message = message
    self.code = code
    self.expt = expt