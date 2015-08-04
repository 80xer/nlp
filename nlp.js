#! /usr/bin/env node

/*

nlp

*/

var nlp = require('./index')
  , fs = require('fs')
  , path = require('path')
;

var logPath = process.argv[2];

if (!logPath) {
  console.log(' eg: nlp ./access.log');
  process.exit();
}

console.log('Reading ' + logPath + ' ...');

fs.readFile(logPath, function (err, buffer) {
  if (!!err) throw err;

  nlp(logPath,function (collection) {
        console.log(logPath + ' successfully parsed and fileterd by prerender (current parsed: %d items)', collection.length);
        console.log(collection[0]);
        console.log('complete!');
    });
});
