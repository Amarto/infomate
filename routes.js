// send request as explained here http://www.sitepoint.com/making-http-requests-in-node-js/
var readability_request = function(url, request_module, token) {
	// example readability request  available at https://www.readability.com/developers/api/parser
	var readability_prefix = "https://readability.com/api/content/v1/parser?url=";
	
	request_module({
			uri: readability_prefix + url + "&token=" + token,
			method: "GET",
	}, 
	function(error, response, body) {
		var jsonObj = JSON.parse(body)['content'];
		return "response: " + jsonObj;
	});
};

/* This file is required by app.js.
 * It sets up the application endpoints/routes.
 */

module.exports = function(app, watson, request_module, token){
	app.post('/api/url_readability', function(req, res) {
		
		var testVar = readability_request(
			req.body['url'],
			request_module,
			token);

		// console.log(testVar);
		// var articleText = 'Tigers hate Barack Obama';
		// watson	.extract(articleText, )
		
		//res.send({content : "test: " + testVar});

	});
};
