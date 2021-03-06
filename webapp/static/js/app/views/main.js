(function(){

	var Main = function(obj) {

		this.template = "template-main";

		this.subTemplate = "template-home";

		this.model = false;

		this.events = new Events();

		this.init = function(obj) {
			console.log("Initialize main");
		};

		this.render = function() {

			var templateId = document.getElementById(this.template);
			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template();
		};

		this.afterRender = function() {
			
			var templateId = document.getElementById(this.subTemplate);
			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);
			var subView = document.getElementById("main-content");
				subView.innerHTML = template();

		};

		this.init(obj);
	}

	FedApp.Views.Main = Main;

})();