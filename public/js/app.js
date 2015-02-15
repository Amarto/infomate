

function AppViewModel() {
	var self = this;
	
	this.url_field = ko.observable();
	this.myTextBox = ko.observable();
	this.questionsArray = ko.observableArray();
	
	this.send_url = function() {	
		$.ajax("api/extract", {
			data: {
				url : this.url_field
			},
      type: "get", 
			contentType: "application/json",
      success: function(result) {
      	alert(JSON.stringify(result));
				if (typeof result.doc === 'string') {
					self.myTextBox(result.doc);
					$('.plain-text-content').show();
				}
				else if (typeof result.error === 'string') {
					// show an error message
				}
				else {
					alert('hi');
					// show another error message
				}
			},
			complete: function(text, status) {
				if (status === 'sucess') {
					alert("success!");
				}
			}
		});
	};
}

// Activates knockout.js
ko.applyBindings(new AppViewModel(), document.getElementById('main'));