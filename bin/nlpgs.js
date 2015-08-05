#! /usr/bin/env node

/*

nlp

*/

var nlp = require('../src/index')
  , fs = require('fs')
;

var logPath = process.argv[2];
var configFile = process.argv[3];

if (!logPath || !configFile) {
  console.log(' eg: nlp ./access.log config.json');
  console.log(' read https://github.com/80xer/nlp-gs');
  process.exit();
}

console.log('Reading ' + logPath + ' ...');

fs.readFile(logPath, function (err, buffer) {
  if (!!err) throw err;
  fs.readFile(configFile, function (err, config) {
    if (!!err) throw err;
    config = JSON.parse(config);
    nlp(logPath, config, function (logs) {
    });
  });
});
