module.exports = function(app) {
	app.use('/api',require('./api'))
	//app.use('/admin',require('./admin'))

	app.get('/*', function(req, res){
		res.render('home.ejs');
	});
}