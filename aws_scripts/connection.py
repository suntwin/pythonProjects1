import boto3
import config as cfg

class Connection:

	def __init__(self,region_name,profile_name):
		self.session = boto3.Session(region_name=region_name,profile_name=profile_name)
		#self.session = boto3.Session(region_name='ap-southeast-2',profile_name='default')

	def get_session(self):
		return(self.session)

	def get_aws_service(self,service):
		return(self.session.resource(service))

