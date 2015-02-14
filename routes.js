/* This file is required by app.js. 
 * It sets up the application endpoints/routes.
 */

module.exports = function(app){
	app.get('/login', function(req,res){
		res.render('login.ejs');
	});
	
	app.get('/register', function(req,res){
		res.render('register.ejs');
	});
	
	app.get('/dashboard', function(req,res){
		res.render('dashboard.ejs');
	});
	
	app.post('/api/url_readability', function(req, res) {
		res.send({content : 'check'});
	});
	
	app.get('/*', function(req, res){
		res.render('login.ejs');
	});
};
