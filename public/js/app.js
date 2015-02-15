var Entity = function(aName, aType) {
	this.question = "";
	this.answer = "";
	this.name = aName;
	this.type = aType;
};

var parseEntities = function(str, observArr) {
		var entities = str;

    //parse each entity of the JSON
    for (var i = 0; i < entities.length; i++) {
        var currentQuestion = {
					question: entities[i].question,
					answer: entities[i].answer,
					name: entities[i].name,
					type: entities[i].type
				};
        observArr.push(currentQuestion);
    }
};

function AppViewModel() {
	var self = this;
	
	this.urlField = ko.observable();
	this.myTextBox = ko.observable();
	
	var demoQuestion = {
		question : 'Who is Barack Obama?',
		name : 'Barack Obama',
		type : '"PERSON"',
		answer : ''
	};

	var demoQuestion2 = {
		question : 'Where is Venezuela?',
		name : 'Venezuela',
		type : '"GPE"',
		answer : ''
	};
	
	this.questionsArray = ko.observableArray([]);

	this.send_url = function() {
		$.ajax("api/extract", {
			data: {
				url : this.urlField
			},
      type: "get", 
			contentType: "application/json",
      success: function(result) {
      		alert(JSON.stringify(result));
			self.questionsArray = parseEntities(result, self.questionsArray);
			if (typeof result.error === 'string') {
					alert('error: result not defined');
				}
			}
		});
	};
	
	this.sendAnswers = function() {
		$.ajax("api/ask", {
				data: ko.toJSON(this.questionsArray),
				type: "post", 
				contentType: "application/json",
				success: function(result) {
					alert(JSON.stringify(result));
					if (typeof result === 'string') {
						alert('in send answers callback: ' + result);
					}
					else if (typeof result.error === 'string') {
						alert('error: result not defined');
					}
				}
			});
		};
}

// Activates knockout.js
ko.applyBindings(new AppViewModel(), document.getElementById('main'));