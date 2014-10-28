(function(){

	var List = function(data) {

		this.template = "template-list";

		this.model = false;

		this.events = new Events();

		this.init = function(data) {
			console.log("Initialize List view");
			this.model = data;
		};

		this.render = function() {

			var templateId = document.getElementById(this.template);

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template(this.model);
		};

		this.afterRender = function() {

			console.log("List afterRender");

			var searchBtn = document.getElementById("form-btn-submit");
			searchBtn.addEventListener("click", this.onClickHandler);
		};

		this.dispose = function() {

		};

		/*
		 	User input handlers
		*/
		
		this.onClickHandler = function(e) {

			var inputLocality = document.getElementById("form-input-locality");

			console.log(window);

			if(!inputLocality){
				alert("Graag een stad invullen");
			}else {
				alert("Zoek: " + inputLocality.value);
			}
		};

		this.onKeyPressHandler = function(e) {

	        if (e.keyCode == 13) {
				
				console.log(data);

	        	var listType = "event";
	        	var query = e.target.value;
				routie("main/" + listType + "/" + query);
	        };
		};

		/*
			Intialize constructor
		*/

		this.init(data);
	};

	FedApp.Views.List = List;

})();