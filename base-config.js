var fs = require('fs');

exports.database = {
	type: 'redis',
	prefix: '#scrumblr#',
	dbPort: '6379',
	dbHost: 'redis'
};


if (fs.existsSync('./conf/config.js')) {
	exports.config = require('./conf/config.js').additionalConfig;
}
