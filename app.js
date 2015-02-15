var port = 4000;

/** Set up Express with module dependencies */
var express = require('express'),
	watson = require('extract-relationships'),
	request = require('request'),
	bodyParser = require('body-parser'),
	http = require('http');

var app = module.exports = express();

var readability_token = 'befac10f8f98a1eb820dff6763b4bbbf7e251a85';

/** Configuration */
// all environments
app.set('port', process.env.PORT || port);
app.use(bodyParser.json()); // set middleware to only accept JSON

/** Routes */
// serve all asset files from necessary directories
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/fonts", express.static(__dirname + "/public/fonts"));
app.use("/img", express.static(__dirname + "/public/img"));

/* linking */
require('./routes')(app, watson, request, readability_token); // sets up endpoints

/** Start Server */
http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
