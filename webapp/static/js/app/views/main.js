(function(){

	var Main = function(data) {

		this.template = "template-main";

		this.render = function() {

			console.log(data);

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template(data);
		}
	}

	fedApp.views.Main = Main;

})();