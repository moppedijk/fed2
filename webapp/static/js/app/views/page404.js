(function(){

	var Page404 = function() {

		this.template = "template-404";

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template();
		}
	}

	fedApp.views.Page404 = Page404;

})();