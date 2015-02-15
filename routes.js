/* This file is required by app.js.
 * It sets up the application endpoints/routes.
 */

module.exports = function(app, watson){
	app.post('/api/url_readability', function(req, res) {
		// var articleText = 'Tigers hate Barack Obama';
		// watson.extract(articleText, )

		res.send({content : 'check'});

	});

	app.get('/*', function(req, res){
		res.render('home.ejs');
	});


};
