var extractor = require('unfluff');
var router = require('express').Router();
var request = require('request');

var Entity = function(aName, aType) {
	this.question = '';
	this.answer = '';
	this.name = aName;
	this.type = aType;
};

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

router.post('/ask', function(req, res) {
    var entities = req.body; // TODO
    // console.log(JSON.stringify(req.body));

    //parse each entity of the JSON
    var questionArray = [];
    for (var i = 0; i < entities.length; i++) {
        var currentQuestion = 'Is ' + entities[i].name + ' ' + entities[i].answer;
        questionArray.push(currentQuestion);
    }

    console.log(questionArray);

    var answerArray = [];
    questionArray.forEach(function(question, index){
        req.question_and_answer.ask({text: question}, function(err,result) {
            answerArray.push({
                question: result[0]['question'].questionText, 
                answer:   result[0]['question']['evidencelist'][0].text 
            });
            
            if (index === (questionArray.length - 1)){
                console.log(answerArray);
                res.json(answerArray);
            }
        });
    });
});

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


                    var JSONoutput = JSON.parse(require('xml2json').toJson(result));
                    var entities = JSONoutput.doc.entities;

                    var questions = [];

                    for (var i = 0; i < entities.entity.length; i++)
                    {
                        var entityScore = parseFloat(JSON.stringify(entities.entity[i].score));
                      	
                        if (entityScore >= .5 && entities.entity[i].mentref[0] !== undefined) {
														var entityName = JSON.stringify(entities.entity[i].mentref[0].$t);
														entityName = entityName.substring(1, entityName.length - 1);
														var entityType = JSON.stringify(entities.entity[i].type);
														
														var currentEntity = new Entity(entityName, entityType);
                            
														var shouldPush = false;
														
                            if (entityType === '"PERSON"') {
                                currentEntity.question = 'Who is ' + entityName + '?';
																shouldPush = true;
														} else if (entityType === '"GPE"') {
                                currentEntity.question = 'Where is ' + entityName + '?';
																shouldPush = true;
														} else if (entityType === '"ORGANIZATION"') {
                                currentEntity.question = 'What is ' + entityName + '?';
																shouldPush = true;
														}
														
														if (shouldPush)
															questions.push(currentEntity);
                        } 
                    }

                    console.log(questions);
                    res.json(questions);
                }
            });
        })
    }
})


module.exports = router;