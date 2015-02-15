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
					alert('error: result not defined');
				}
				else {
					alert('error');
					// show another error message
				}
			}
		});
	};
}

// Activates knockout.js
ko.applyBindings(new AppViewModel(), document.getElementById('main'));