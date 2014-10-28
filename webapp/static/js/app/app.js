var FedApp = FedApp || {};
	FedApp.Components = FedApp.Components || {};
	FedApp.Models = FedApp.Models || {};
	FedApp.Views = FedApp.Views || {};	

(function(){
	
	/**
	 	Controller object that initializes the application
	*/
	FedApp.App = {

		init: function () {
			console.log("Initialize App");
			
			FedApp.Config = {
				appId: "fed-app"
			}

			this.startApp();
		},
		startApp: function () {
			FedApp.Router.init();
		}
	}

})();