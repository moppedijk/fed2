(function(){
	
	fedApp.router = {

		currentView: false,

		init: function () {

			routie({
				'': function() {
					console.log("show main");
					fedApp.helpers.loader.show();
					fedApp.router.showHome();
				},
				'main': function() {
					console.log("show main");
					fedApp.helpers.loader.show();
					fedApp.router.showMain();
				},
				'main/:type': function(type) {
					console.log("show " + type);
					fedApp.helpers.loader.show();
					fedApp.router.showList(type);
				},
				'main/:type/:cidn': function(type, cidn) {
					console.log("show " + type + " : " + cidn);
					fedApp.helpers.loader.show();
					fedApp.router.showDetail(type, cidn);
				},
				'about': function() {
					console.log("show about");
					fedApp.helpers.loader.show();
					fedApp.router.showAbout();
				},
				'*': function() {
					fedApp.helpers.loader.show();
					fedApp.router.showPage404();
				}
			});
		},
		showMain: function() {
			console.log("showMain");

			//Show view
			var view = new fedApp.views.Main();
			fedApp.router.showView(view);
		},
		showList: function(type) {
			console.log("show Event");

			// Create new data object
			var ArtsApi = new fedApp.data.ArtsApi();

			// Get data from api
			ArtsApi.getList({
				type: type,
				params: {
					per_page: 20,
					page: 1,
					locality: "utrecht"
				}
			});

			// Wait for response and render view
			ArtsApi.events.on("loadListComplete", function(data){

				//Show view
				var view = new fedApp.views.List(data);
				fedApp.router.showView(view);

				ArtsApi.events.off("loadListComplete");
			});
		},
		showDetail: function(type, cidn) {
			console.log("showDetail");

			// Load Data
			var ArtsApi = new fedApp.data.ArtsApi();

			ArtsApi.getSingleObject({
				type: type,
				cidn: cidn
			});

			ArtsApi.events.on("loadSingleComplete", function(data){

				//Show view
				var view = new fedApp.views.Detail(data);
				fedApp.router.showView(view);

				ArtsApi.events.off("loadSingleComplete");
			});
		},
		showAbout: function () {
			console.log("showAbout");
			var view = new fedApp.views.About();
			this.showView(view);
		},
		showPage404: function () {
			console.log("showPage404");
			var view = new fedApp.views.Page404();
			this.showView(view);
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

			fedApp.helpers.loader.hide();
		}
	}

})();