var fs = require('fs');
var dash = require('lodash');
var config = null;

var baseConfig = {
	type: 'redis',
	prefix: '#scrumblr#',
	dbPort: '6379',
	dbHost: '127.0.0.1',

	jiraUrl: 'https://jira.example.com/',
	jiraUser: 'username',
	jiraPass: 'password'
};

if (fs.existsSync('./conf/config.js')) {
	var additionalConfig = require('./conf/config.js').additionalConfig;
	config = dash.merge(baseConfig, additionalConfig);
}

module.exports = config;
