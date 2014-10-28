(function(){

	var Page404 = function(obj) {

		this.template = "template-404";

		this.events = new Events();

		this.init = function(obj) {
			this.render();
		}

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template();
		}

		this.init(obj);
	}

	FedApp.Views.Page404 = Page404;

})();