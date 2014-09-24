var fedApp = fedApp || {};
	fedApp.views = fedApp.views || {};
	fedApp.config = fedApp.config || {};
	fedApp.manager = fedApp.manager || {};

(function(){
	
	fedApp.app = {

		init: function (data) {
			// load data
			fedApp.config = data;

			// start router
			fedApp.router.init();
		}
	}

})();;(function(){
	
	fedApp.router = {

		currentView: false,

		init: function () {
			routie({
				'': function() {
					console.log("show home");
					fedApp.router.showHome();
				},
				'home': function() {
					console.log("show home");
					fedApp.router.showHome();
				},
				'about': function() {
					console.log("show about");
					fedApp.router.showAbout();
				},
				'contact': function() {
					console.log("show Contact");
					fedApp.router.showContact();
				}
			});
		},
		showHome: function () {
			console.log("showHome");
			var view = fedApp.views.home.render();
			var container = document.getElementById(fedApp.config.appId);

			container.innerHTML = view();
		},
		showAbout: function () {
			console.log("showAbout");
			var view = fedApp.views.about.render();
			var container = document.getElementById(fedApp.config.appId);

			container.innerHTML = view();
		},
		showContact: function () {
			console.log("showContact");
			var view = new fedApp.views.Contact();
			fedApp.router.showView(view);
		},
		showView: function (view) {
			console.log("show View");

			// Check if view is currtent vies, if true remove view
			if(fedApp.router.currentView) {
				//dispose view
				console.log("remove view");
			}

			fedApp.router.currentView = view;

			var container = document.getElementById(fedApp.config.appId);
			container.innerHTML = fedApp.router.currentView.render();
		}
	}

})();;(function(){

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

})();;// construcor object
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

})();;(function(){

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