var extractor = require('unfluff');
var router = require('express').Router();
var request = require('request');

var Entity = function(aName, aType) {
	question : "",
	answer : "",
	name : aName,
	type : aType
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
                    // var JSONoutput = JSON.parse(require('xml2json').toJson(result));
                    // var entities = JSONoutput.entities;
                    // var mostImportantEntity = entities.entity[0].mentref[0].$t;  //???!!

                    var JSONoutput = JSON.parse(require('xml2json').toJson(result));
                    var entities = JSONoutput.doc.entities;
                    // var mostImportantEntity = entities[0];
                    var mostImportantName = JSON.stringify(entities.entity[0].mentref[0].$t);
                    console.log(mostImportantName);
                    console.log(JSON.stringify(entities.entity[0].eid));

                    // var mostImportantRelation = JSON.stringify(JSONoutput.doc.relations.relation[0]);
                    // console.log(mostImportantRelation);

                    // var relation = JSON.stringify(JSONoutput.doc.relations.relation[0].type);

                    // var otherEntityeid = JSON.stringify(JSONoutput.doc.relations.relation[0].rel_entity_arg[1].eid);

                    // var otherEntityNum = parseInt(otherEntityeid.substring(3, otherEntityeid.length - 1));
                    // // console.log(otherEntityNum);
                    // var otherEntityName = (JSON.stringify(entities.entity[otherEntityNum].mentref[0].$t));

                    // var question = mostImportantName + relation + otherEntityName;
                    // console.log(question);

                    console.log(entities.entity);

                    var questions = [];

                    for (var i = 0; i < entities.entity.length; i++)
                    {
                        var entityScore = parseFloat(JSON.stringify(entities.entity[i].score));
                      	
                        if (entityScore >= .5 && entities.entity[i].mentref[0] !== undefined) {
														var entityName = JSON.stringify(entities.entity[i].mentref[0].$t);
														var entityType = JSON.stringify(entities.entity[i].type);
														
														var currentEntity = new Entity(entityName, entityType);
                            
														var shouldPush = false;
														
                            if (entityType === '"PERSON"') {
                                currentType.question = 'Who is ' + entityName + '?';
																shouldPush = true;
														} else if (entityType === '"GPE"') {
                                currentType.question = 'Where is ' + entityName + '?';
																shouldPush = true;
														} else if (entityType === '"ORGANIZATION"') {
                                currentType.question = 'What is ' + entityName + '?';
																shouldPush = true;
														}
														
														if (shouldPush)
															questions.push(currentEntity);
                        } 
                    }

                    console.log(questions);

                    res.json(JSONoutput);
                }
            });
        })
    }
})


module.exports = router;