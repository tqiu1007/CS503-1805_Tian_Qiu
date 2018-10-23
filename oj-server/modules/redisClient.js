var redis = require('redis'); // redisClient.js
var client = redis.createClient(); // only one client is created

// we only call out own wapper set and get to store and get values from redis
function set(key, value, callback) {
    // error is the first parameter, so that we don't forget to handle the error
	client.set(key, value, (err, res) => {
		if (err) {
			console.log(err);
			return;
		}

		callback(res);
	});
}

// redisClient.js
function get(key, callback) {
    // error is the first argument, so that we don't forget the handle the error
    client.get(key, (err, res) => {
		if (err) {
			console.log(err);
			return;
		}

		callback(res);
	});
}

// only store the keys in timeInSeconds seconds.  Once expired, keys will be deleted.
// since the cache is limited and may not be synchooused with database, data only valid during a period of time
function expire(key, timeInSeconds) {
	client.expire(key, timeInSeconds);
}

function quit() {
	client.quit();
}

module.exports = {
	get: get,
	set: set,
	expire: expire,
	quit: quit,
	redisPrint: redis.print
}