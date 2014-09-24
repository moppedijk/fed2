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

})();