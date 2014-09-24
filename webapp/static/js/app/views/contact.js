// construcor object
(function(){

	var Contact = function() {

		/*
		 * Abstract view maken en een extensie maken van deze view 
		 */
		this.template = "template-contact";

		this.render = function () {
			console.log("render contact");
			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile( source );

			return template();
		};
	};

	fedApp.views.Contact = Contact;

})();