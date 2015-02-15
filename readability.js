
var request = require('request');

function Readability(token) {
	this.token = token;
	this.url = 'https://readability.com/api/content/v1/parser';
}

Readability.prototype.getText = function(articleUrl, callback) {
	console.log('token:', this.token);
	var options = {
		url: this.url,
		qs: { 
			url: articleUrl,
			token: this.token },
		method: 'GET',
		json: true
	}

	var req = request(options,function (err, response, body) {
		if (err)
			callback(err);
		else{
			console.log(body);

			callback(null, body.content);
		}
	})
	return req;
}	

module.exports = Readability;