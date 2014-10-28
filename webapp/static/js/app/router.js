(function(){
	
	FedApp.Router = {

		currentView: false,

		init: function () {

			var routes = {
				'': function() {
					console.log("empty");
					FedApp.Components.Loader.show();
					FedApp.Router.showMain();
				},
				'/home': function() {
					console.log("/home");
					FedApp.Components.Loader.show();
					FedApp.Router.showMain();
				},
				'/about': function() {
					console.log("/about");
					FedApp.Components.Loader.show();
					FedApp.Router.showAbout();
				},
				'/main':{
					'/:type': {
						on: function(type) {
							console.log("main/" + type);
							FedApp.Components.Loader.show();
							FedApp.Router.showList({
								type: type,
								locality: false
							});
						}
					}
				},
				'/main/:type/search': {
					'/:search': {
						on: function(type, search) {
							console.log("/main/" + type + "/search/" + search);
							FedApp.Components.Loader.show();
							FedApp.Router.showList({
								type: type,
								locality: search
							});
						}
					}
				},
				'/main/:type/detail': {
					'/:cidn': {
						on: function(type, cidn) {
							console.log("/main/:" + type + "/detail/" + cidn);
							FedApp.Components.Loader.show();
							FedApp.Router.showDetail({
								type: type,
								cidn: cidn
							});
						}
					}
				},
				'/*': function() {
					FedApp.Components.Loader.show();
					FedApp.Router.showPage404();
				}
			};

			var router = Router(routes).init();

		},
		showMain: function() {
			console.log("show main");

			var view = new FedApp.Views.Main();

			FedApp.Router.showView(view);
		},
		showList: function(obj) {
			console.log("show list");

			var listModel = new FedApp.Models.List();

			listModel.get({
				type: obj.type,
				params: {
					page: 1,
					per_page: 100,
					locality: obj.locality,
					after: "2014-10-22"
				}
			});

			listModel.events.on("loadDataComplete", function(data) {

				console.log(data);

				var view = new FedApp.Views.List(data);
				FedApp.Router.showView(view);

				listModel.events.off("loadDataComplete");
			});

		},
		showDetail: function(obj) {
			console.log("show detail");

			// Load Data
			var singleObject = new FedApp.Models.SingleObject();

			singleObject.get({
				type: obj.type,
				cidn: obj.cidn
			})

			singleObject.events.on("loadDataComplete", function(data){

				console.log(data);

				var view = new FedApp.Views.Detail(data);
				FedApp.Router.showView(view);

				singleObject.events.off("loadDataComplete");
			});
		},
		showAbout: function () {
			console.log("show about");

			var view = new FedApp.Views.About();
			
			this.showView(view);
		},
		showPage404: function () {
			console.log("show Page404");

			var view = new FedApp.Views.Page404();

			console.log(view);

			view.events.on("load404Complete", function(view){

				this.showView(view);
			});
		},
		showView: function (view) {
			console.log("show View");

			FedApp.Router.currentView = view;

			var container = document.getElementById(FedApp.Config.appId);
			container.innerHTML = FedApp.Router.currentView.render();

			if(FedApp.Router.currentView.afterRender)
				FedApp.Router.currentView.afterRender();

			// Hide Loader
			FedApp.Components.Loader.hide();
		}
	}

})();