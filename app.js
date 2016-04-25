var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var scraper = require('./scraper');
var api = require('./api');

// Serves static files
app.use('/static', express.static(__dirname + '/webapp/dist/static/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/templates', express.static(__dirname + '/webapp/dist/templates/'));

// Routes to web scraper
// app.get('/scrape', scraper);

// Helps with POST Requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//  Send all /api calls to the api
api(app);

//  Send all other requests to the webapp.
app.use(function(req, res){
	console.log(req.method, req.url);
    res.status(200).sendFile(__dirname+'/webapp/dist/index.html');
});

//  Start the server
if (module === require.main) {
    var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;

