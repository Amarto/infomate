
var router = require('express').Router();

router.get('/extract',function(req, res){
    var articleUrl = req.query.url;

    if (!articleUrl)
        return res.status(400).json({error:' url not found'});
    else {
        req.readability.getText(articleUrl, function(err, text) {
            req.relationship_extraction.extract({text:text, dataset:'ie-en-news'}, function (err, result){
                if (err)
                    res.json(err);
                else {
                    res.json({xml:result});
                }
            });
        })
    }
})


module.exports = router;