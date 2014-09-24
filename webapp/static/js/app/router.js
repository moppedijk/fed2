(function(){
	
	fedApp.router = {

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
				}
			})
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
		}
	}

})();