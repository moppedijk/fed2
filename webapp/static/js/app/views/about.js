(function() {

	var About = function (data) {

		this.template = "template-about";

		this.model = false;

		this.events = new Events();

		this.init = function(data) {
			console.log("Initalize About");
		};

		this.render = function () {
			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile( source );

			return template();
		}

		this.init(data);
	}

	FedApp.Views.About = About;

})();