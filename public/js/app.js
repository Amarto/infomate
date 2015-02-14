function AppViewModel() {
	this.url_field = ko.observable("");
	
	self.send_url = function() {
		$.ajax("url_readability", {
            data: ko.toJSON(this.url_field),
            type: "post", contentType: "application/json",
            success: function(result) {
				if (typeof result.content === 'string') {
					alert('resp text: ' + result.content);
				}
				if (typeof result.error === 'string') {
					// show an error message
				}
				else {
					// show another error message
				}
			}
		});
	};
}

// Activates knockout.js
ko.applyBindings(new AppViewModel(), document.getElementById('main'));