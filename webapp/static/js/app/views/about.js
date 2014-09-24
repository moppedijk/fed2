(function(){

	fedApp.views.about = {
		template: "template-about",
		init: function () {
		},
		render: function () {
			var templateId = document.getElementById( fedApp.views.about.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile( source );

			return template;
		},
		afterRender: function () {
			
		},
		dispose: function () {

		}
	}

})();