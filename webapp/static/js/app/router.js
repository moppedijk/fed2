(function(){
	
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

})();