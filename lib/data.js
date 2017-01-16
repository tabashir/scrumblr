var conf = require('../base-config.js');
var dbCreator = require('./data/' + conf.type + '.js');

dbCreator.setConnection(conf.dbPort, conf.dbHost);

exports.db = dbCreator.db;
