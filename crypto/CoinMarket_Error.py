class CoinMarket_Error(Exception):
  """Basic exception raised for all mutual funds errors """
  pass


class CoinMarket_URL_Error(CoinMarket_Error):

  def __init__(self, message=None, code=None, expt=None):
    if (message is not None):
      message = unicode(message).encode("utf-8")

    self.message = message
    self.code = code
    self.expt = expt


class CoinMarket_IO_Error(CoinMarket_Error):

  def __init__(self, message=None, code=None, expt=None):
    if (message is not None):
      message = unicode(message).encode("utf-8")

    self.message = message
    self.code = code
    self.expt = expt


class CoinMarket_TableByClass_Extraction_Error(CoinMarket_Error):

  def __init__(self, message=None, code=None, expt=None):
    if (message is not None):
      message = unicode(message).encode("utf-8")

    self.message = message
    self.code = code
    self.expt = expt


class CoinMarket_HyperLink_Extraction_Error(CoinMarket_Error):

  def __init__(self, message=None, code=None, expt=None):
    if (message is not None):
      message = unicode(message).encode("utf-8")

    self.message = message
    self.code = code
    self.expt = expt
