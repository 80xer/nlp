var nginxparsewith = require('./nginxparsewidth'),
  Spreadsheet = require('edit-google-spreadsheet')
  url = require('url');

function nlp(logfile, callback) {

  function shouldShowPrerenderedPage(log) {
    var crawlerUserAgents = [
      // 'googlebot',
      // 'yahoo',
      // 'bingbot',
      'baiduspider',
      'facebookexternalhit',
      'twitterbot',
      'rogerbot',
      'linkedinbot',
      'embedly',
      'quora link preview',
      'showyoubot',
      'outbrain',
      'pinterest',
      'developers.google.com/+/web/snippet',
      'slackbot',
      'vkShare',
      'W3C_Validator',
      'redditbot'
    ];

    extensionsToIgnore = [
      '.js',
      '.css',
      '.xml',
      '.less',
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.pdf',
      '.doc',
      '.txt',
      '.ico',
      '.rss',
      '.zip',
      '.mp3',
      '.rar',
      '.exe',
      '.wmv',
      '.doc',
      '.avi',
      '.ppt',
      '.mpg',
      '.mpeg',
      '.tif',
      '.wav',
      '.mov',
      '.psd',
      '.ai',
      '.xls',
      '.mp4',
      '.m4a',
      '.swf',
      '.dat',
      '.dmg',
      '.iso',
      '.flv',
      '.m4v',
      '.torrent',
      '.woff',
      '.ttf'
    ];

    var userAgent = log['http_user_agent']
      , bufferAgent = log['x-bufferbot']
      , request = log['request'].split(' ')
      , method = request[0]
      , requrl = request[1]
      , isRequestingPrerenderedPage = false;

    if(!userAgent) return false;
    if(method != 'GET' && method != 'HEAD') return false;

    //if it contains _escaped_fragment_, show prerendered page
    var parsedQuery = url.parse(requrl, true).query;
    if(parsedQuery && parsedQuery.hasOwnProperty('_escaped_fragment_')) isRequestingPrerenderedPage = true;

    //if it is a bot...show prerendered page
    if(crawlerUserAgents.some(function(crawlerUserAgent){ return userAgent.toLowerCase().indexOf(crawlerUserAgent.toLowerCase()) !== -1;})) isRequestingPrerenderedPage = true;

    //if it is BufferBot...show prerendered page
    if(bufferAgent) isRequestingPrerenderedPage = true;

    //if it is a bot and is requesting a resource...dont prerender
    if(extensionsToIgnore.some(function(extension){return requrl.indexOf(extension) !== -1;})) return false;

    return isRequestingPrerenderedPage;
  };

  var logs = [];

  nginxparsewith(logfile, logs, shouldShowPrerenderedPage, function(logs) {
    console.log(logfile + ' successfully parsed and fileterd by prerender (current parsed: %d items)', logs.length);
    console.log(logs[0]);
    console.log('complete!');
    callback && callback(logs);

    Spreadsheet.load({
      debug: true,
      spreadsheetName: 'prerender log',
      worksheetName: 'sh1',
      oauth : {
        email: '748744049605@developer.gserviceaccount.com',
        keyFile: './googlekey.pem'
      },
    }, function sheetReady(err, spreadsheet) {
      if(err) throw err;
      spreadsheet.add({ 3: { 5: "hello!" } });
      spreadsheet.send(function(err) {
        if(err) throw err;
        console.log("Updated Cell at row 3, column 5 to 'hello!'");
      });
      spreadsheet.receive(function(err, rows, info) {
        if(err) throw err;
        console.log("Found rows:", rows);
      });

      spreadsheet.metadata(function(err, metadata){
        if(err) throw err;
        console.log(metadata);
      });

      spreadsheet.metadata({
        title: 'sheet1',
        rowCount: 100,
        colCount: 20
      }, function(err, metadata){
        if(err) throw err;
        console.log(metadata);
      });
    });
  });
}

module.exports = nlp;
