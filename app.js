/** Set up Express with module dependencies */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    watson = require('watson-developer-cloud-alpha'),
    config = require('./config'),
    relationship_extraction = watson.relationship_extraction(config.relationship_extraction),
    question_and_answer = watson.question_and_answer(config.question_and_answer);
// express configuration
app.use(bodyParser.json()); // set middleware to only accept JSON
app.use(express.static(__dirname + '/public'));

// Filter
app.use(function(req, res, next) {
    req.relationship_extraction = relationship_extraction;
    req.question_and_answer = question_and_answer;
    next();
});

require('./routes/index')(app);

app.set('port', process.env.PORT || 4000);
app.listen(app.get('port'));
