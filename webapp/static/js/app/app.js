var fedApp = fedApp || {};
	fedApp.helpers = fedApp.helpers || {};
	fedApp.data = fedApp.data || {};
	fedApp.views = fedApp.views || {};	

(function(){
	
	fedApp.app = {

		init: function () {
			
			fedApp.config = {
				appId: "fed-app"
			}

			this.startApp();
		},
		startApp: function () {
			fedApp.router.init();
			console.log("router init");
		}
	}

})();