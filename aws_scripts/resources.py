class Res:

	def __init__(self,resource_type):
		self.resource_type = resource_type



	def get_ec2_resources_on_taginfo(self,**kwargs):

		instance_list=[]
		tag_instance_list=[]
		# get all the running instances
		instances = self.resource_type.instances.filter(
		Filters=[
		{'Name':'instance-state-name','Values':['running']},
		]
		
		)

		#print("runninng instances",instances)
		#print("kwargs",kwargs)
		if "taginfo" in kwargs:
			print("isnide taginfo")
			for instance in instances:
				if(instance.tags == None):
					instance_list.append(instance.id)
		

		if "tagonly" in kwargs:
			#print("tagonly found")
			key = kwargs['tagonly']
			#print("i am in tag only")

			for instance in instances:
				if(instance.tags != None):
					for tags in instance.tags:
						print("key is",key)
						print("Tags[Key]",tags['Key'])
						if (key == tags['Key']):
							instance_list.append(instance.id)
							print("found instance with key",key)


		if ("key" in kwargs and "value" in kwargs):
			key = kwargs['key']
			value = kwargs['value']
			#print("has both key and value")
			for instance in instances:
				if(instance.tags != None):
					for tags in instance.tags:
						#print("key is",key)
						#print("Tags[Key]",tags['Key'])
						if (key == tags['Key'] and value == tags['Value']):
							instance_list.append(instance.id)
							#print("found instance with key",key)

		return(instance_list)




	