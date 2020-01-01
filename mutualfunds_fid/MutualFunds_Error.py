class MutualFunds_Error(Exception):
	"""Basic exception raised for all mutual funds errors """
	pass




class MutualFunds_URL_Error(MutualFunds_Error):
	"""Basic exception raised for all mutual funds errors """
	def __init__(self, message=None, code=None):
		if(message is not None):
			message=unicode(message).encode("utf-8")

		self.message = message
		self.code = code

class MutualFunds_IO_Error(MutualFunds_Error):
	"""Basic exception raised for all mutual funds errors """
	def __init__(self, message=None, code=None):
		if(message is not None):
			message=unicode(message).encode("utf-8")

		self.message = message
		self.code = code

class MutualFunds_TableByClass_Extraction_Error(MutualFunds_Error):
	"""Basic exception raised for all mutual funds errors """
	def __init__(self, message=None, code=None):
		if(message is not None):
			message=unicode(message).encode("utf-8")

		self.message = message
		self.code = code

class MutualFunds_HyperLink_Extraction_Error(MutualFunds_Error):
	"""Basic exception raised for all mutual funds errors """
	def __init__(self, message=None, code=None):
		if(message is not None):
			message=unicode(message).encode("utf-8")

		self.message = message
		self.code = code