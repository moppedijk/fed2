(function(){

	var Detail = function(data) {

		this.template = "template-detail";

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template(data.results[0]);
		}
	}

	fedApp.views.Detail = Detail;

})();