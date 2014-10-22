(function() {

	var About = function () {

		this.template = "template-about";

		this.render = function () {
			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile( source );

			return template();
		}
	}

	fedApp.views.About = About;

})();