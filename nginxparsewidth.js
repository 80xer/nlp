var Promise = require('bluebird'),
  NginxParser = require('nginxparser');

function nginxParseWidth(path, collection, condition, callback) {
  var parser = new NginxParser('$remote_addr - $remote_user [$time_local] "$request" ' +
    '$status $body_bytes_sent "$http_referer" ' +
    '"$http_user_agent" "$http_x_forwarded_for"');

  var parse = function (path, collection, condition) {
      return new Promise(function (resolve, reject) {
        parser.read(path, function onRowReceived (log) {
          if (condition(log)) {
            collection.push(log);
          }
        }, function onFinish(err) {
          if (err) { return reject(err); }
          return resolve(collection);
        });
      });
  };

  parse(path, collection, condition)
    .then(function(logs) {
      callback && callback(logs);
    });
}

module.exports = nginxParseWidth;
