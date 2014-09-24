(function(){

	fedApp.views.home = {
		template: "template-home",
		init: function () {
		},
		render: function () {
			var templateId = document.getElementById( fedApp.views.home.template );

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