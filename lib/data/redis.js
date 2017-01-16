var redis = require("redis")
var async = require("async");
var redisClient = null;
var redis_prefix = '#scrumblr#';

var setConnection = function(port, host) {
	console.log('************ DATABASE *************');
	console.log(' connecting to: ' + host + ' on port: ' + port);
  redisClient = redis.createClient(port, host);
}

var setPrefix = function(port, host) {
	redis_prefix = prefix;
}

var db = function(callback) { 
	redisClient.on("connect", function (err) {
		callback();
	});
	
	redisClient.on("error", function (err) {
		console.log("Redis error: " + err);
	});
	
}

db.prototype = {
	clearRoom: function(room, callback) {
		redisClient.del(redis_prefix + '-room:/demo-cards', function (err, res) {
			redisClient.del(redis_prefix + '-room:/demo-columns', function (err, res) {
				callback();
			});
		});
	},
	
	getAllRooms: function(callback) {
		redisClient.keys(redis_prefix + '-room:*-cards', function(err, res) {
			var roomIds = res.map(function(item) {
				return item.replace("#scrumblr#-room:/", "").replace("-cards", "");
			});
			callback(roomIds);
		});
	},

	// theme commands
	setTheme: function(room, theme) {
		redisClient.set(redis_prefix + '-room:' + room + '-theme', theme);
	},

	getTheme: function(room, callback) {
		redisClient.get(redis_prefix + '-room:' + room + '-theme', function (err, res) {
			callback(res);
		});
	},

	// Column commands
	createColumn: function(room, name, callback) {
		redisClient.rpush(redis_prefix + '-room:' + room + '-columns', name, 
			function (err, res) {
	if (typeof callback != "undefined" && callback !== null) callback();
			}
		);
	},

	getAllColumns: function(room, callback) {
		redisClient.lrange(redis_prefix + '-room:' + room + '-columns', 0, -1, function(err, res) {
			callback(res);
		});
	},

	deleteColumn: function(room) {
		redisClient.rpop(redis_prefix + '-room:' + room + '-columns');
	},

	setColumns: function(room, columns) {
		//1. first delete all columns
		redisClient.del(redis_prefix + '-room:' + room + '-columns', function () {
			//2. now add columns for each thingy
			async.forEachSeries(
				columns,
				function( item, callback ) {
					//console.log('rpush: ' + redis_prefix + '-room:' + room + '-columns' + ' -- ' + item);												 
					redisClient.rpush(redis_prefix + '-room:' + room + '-columns', item, 
						function (err, res) {
							callback();
						}
					);
				},
				function() {
					//this happens when the series is complete
				}
			);
		});
	},

	// Card commands
	createCard: function(room, id, card) {
		var cardString = JSON.stringify(card);
		redisClient.hset(
			redis_prefix + '-room:' + room + '-cards',
			id,
			cardString
		);
	},

	getAllCards: function(room, callback) {
		redisClient.hgetall(redis_prefix + '-room:' + room + '-cards', function (err, res) {
								
			var cards = [];
								
			for (i in res) {
				cards.push( JSON.parse(res[i]) );
			}
			//console.dir(cards);
								
			callback(cards);
		});
	},

	cardEdit: function(room, id, text) {
		redisClient.hget(redis_prefix + '-room:' + room + '-cards', id, function(err, res) {
			var card = JSON.parse(res);
			if (card !== null) {
				card.text = text;
				redisClient.hset(redis_prefix + '-room:' + room + '-cards', id, JSON.stringify(card));
			}
		});
	},

	cardSetXY: function(room, id, x, y) {
		redisClient.hget(redis_prefix + '-room:' + room + '-cards', id, function(err, res) {
			var card = JSON.parse(res);
			if (card !== null) {
				card.x = x;
				card.y = y;
				redisClient.hset(redis_prefix + '-room:' + room + '-cards', id, JSON.stringify(card));
			}
		});
	},

	deleteCard: function(room, id) {
		redisClient.hdel(
			redis_prefix + '-room:' + room + '-cards',
			id
		);
	},

	addSticker: function(room, cardId, stickerId) {
		redisClient.hget(redis_prefix + '-room:' + room + '-cards', cardId, function(err, res) {
			var card = JSON.parse(res);
			if (card !== null) {
				card.sticker = stickerId;
				redisClient.hset(redis_prefix + '-room:' + room + '-cards', cardId, JSON.stringify(card));
			}
		});
	},
	
	setBoardSize: function(room, size) {
		redisClient.set(redis_prefix + '-room:' + room + '-size', JSON.stringify(size));
	},
	
	getBoardSize: function(room, callback) {
		redisClient.get(redis_prefix + '-room:' + room + '-size', function (err, res) {
			callback(JSON.parse(res));
		});	
	}
	
};
exports.db = db;
exports.setPrefix = setPrefix;
exports.setConnection	= setConnection;
