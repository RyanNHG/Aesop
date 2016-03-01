var express = require('express');
var app = express();

var scraper = require('./scraper');

app.get('/scrape', scraper);

app.listen('8080');

console.log('Web server is running on port 8080');

exports = module.exports = app;

