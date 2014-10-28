(function(){

	var Main = function(obj) {

		this.template = "template-main";

		this.model = false;

		this.events = new Events();

		this.init = function(obj) {
			console.log("Initialize main");
		};

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template();
		}

		this.init(obj);
	}

	FedApp.Views.Main = Main;

})();