(function(){

	var Detail = function(data) {

		this.template = "template-detail";

		this.model = false;

		this.events = new Events();

		this.init = function(data) {
			console.log("Initialize Detail View");
			this.model = data;
		};

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template(this.model)
		};

		this.afterRender = function() {
			console.log("afterRender");
		}

		this.dispose = function() {

		};

		this.init(data);
	};

	FedApp.Views.Detail = Detail;

})();