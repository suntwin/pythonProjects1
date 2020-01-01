from jira import JIRA

jira_server = 'https://polytely.atlassian.net/'

api_key='QGa5FdkgU01q0fyVUky3B534'
api_str='nitesh'

options = {
 'server': jira_server
}

jira = JIRA(options, basic_auth=('sonamkukreja21@gmail.com',api_key))

print(jira.projects())
