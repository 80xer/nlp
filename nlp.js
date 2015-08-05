#! /usr/bin/env node

/*

nlp

*/

var nlp = require('./index')
  , fs = require('fs')
  , path = require('path')
;

var logPath = process.argv[2];
var configFile = process.argv[3];

configFile = configFile || './config.json';

if (!logPath) {
  console.log(' eg: nlp ./access.log config.json');
  process.exit();
}

console.log('Reading ' + logPath + ' ...');

fs.readFile(logPath, function (err, buffer) {
  if (!!err) throw err;
  var config = JSON.parse(fs.readFileSync(configFile));
  nlp(logPath, config, function (logs) {
  });
});
