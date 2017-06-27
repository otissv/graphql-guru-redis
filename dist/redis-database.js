'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connection = connection;
exports.connect = connect;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _promiseRedis = require('promise-redis');

var _promiseRedis2 = _interopRequireDefault(_promiseRedis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* redis connection
*/

function connection(_ref) {
  var port = _ref.port,
      uri = _ref.uri;

  var redis = (0, _promiseRedis2.default)(function (resolver) {
    return new _bluebird2.default(resolver);
  });
  var client = void 0;

  client = redis.createClient({ port: port, uri: uri });

  // Event handlers
  client.on('connect', function () {
    console.log('Redis connected to ' + uri + ':' + port);
  });

  client.on('end', function () {
    console.log('Redis disconnected');
    client.quit();
  });

  client.on('error', function (error) {
    console.log('Error ' + error);
  });

  // Return instance of redis client
  return client;
}

function connect(options) {
  return connection(options);
}
//# sourceMappingURL=redis-database.js.map