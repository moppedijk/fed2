(function(){

	var VenueDetail = function(data) {

		this.template = "template-detail";

		this.subTemplate = "template-venue-detail";

		this.model = false;

		this.events = new Events();

		this.init = function(data) {
			console.log("Initialize VenueDetail View");
			this.model = data;
		};

		this.render = function() {

			var templateId = document.getElementById( this.template );
			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template();
		};

		this.afterRender = function() {
			var templateId = document.getElementById(this.subTemplate);
			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);
			var subView = document.getElementById("main-content");
				subView.innerHTML = template(this.model);
		}

		this.dispose = function() {

		};

		this.init(data);
	};

	FedApp.Views.VenueDetail = VenueDetail;

})();