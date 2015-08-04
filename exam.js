var nlp = require('./index');

nlp('./access.log', function(logs) {
  console.log('logs good:' + logs.length);
})
