var extractor = require('unfluff');
var router = require('express').Router();
var request = require('request');

var makeRequest = function(articleUrl, callback) {
	var options = {
		url: articleUrl,
		method: 'GET',
		json: true
	}
	
	var req = request(options, function(err, response, body) {
		if (err) {
			callback(err);
		} else {
			callback(null, body);
		}
	})
	
	return req;
}	

router.get('/extract',function(req, res){
    var articleUrl = req.query.url;

    if (!articleUrl) 
        return res.status(400).json({error:' url not found'});
    else {
        makeRequest(articleUrl, function(err, text) {
			var justText = extractor(text, 'en');
		
            req.relationship_extraction.extract({text:justText['text'], dataset:'ie-en-news'}, function (err, result){
                if (err)
                    res.json(err);
                else {
					// text -- plaintext
					// parse -- watsonified version
                    res.json({
						'watson' : result
					});
                }
            });
        })
    }
})


module.exports = router;