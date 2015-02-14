/* This file is required by app.js. 
 * It sets up the application endpoints/routes.
 */

module.exports = function(app){
	app.post('/api/url_readability', function(req, res) {
		res.send({content : 'check'});
	});
	
	app.get('/*', function(req, res){
		res.render('home.ejs');
	});
};
