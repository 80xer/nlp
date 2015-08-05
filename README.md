# nlp
parse nginx log files, and pass to google spreadsheet in node.js (use nginxparser)

Usage
-----

Usage example:

```bash
nlp acceess.log config_file
```

Or:

``` javascript
var nlp = require('nlp'),
  fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json'));

nlp('./access.log', config, function(logs) {
  console.log('logs good:' + logs.length);
})

```

Config file
-----
``` javascript
{
  "email": "google service account email address",
  "keyFile": "/path/to/your_key.pem",
  "spreadsheetId": "spreadsheet id",
  "worksheetId": "worksheet id"
  "spreadsheetName": "spreadsheet name",
  "worksheetName": "worksheet name"
}
``` 
'spreadsheet id' or 'spreadsheet name' is required
'worksheet id' or 'worksheet name' is required
