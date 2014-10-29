(function(){
	
	FedApp.Router = {

		currentView: false,

		init: function () {

			var routes = {
				'': function() {
					console.log("empty");
					FedApp.Components.Loader.show();
					setTimeout(function(){
						FedApp.Router.showMain();
					}, 300);
				},
				'/home': function() {
					console.log("/home");
					FedApp.Components.Loader.show();
					setTimeout(function(){
						FedApp.Router.showMain();
					}, 300);
				},
				'/about': function() {
					console.log("/about");
					FedApp.Components.Loader.show();
					setTimeout(function(){
						FedApp.Router.showAbout();
					}, 300);
				},
				'/main':{
					'/:type': {
						on: function(type) {
							console.log("main/" + type);
							FedApp.Components.Loader.show();
							setTimeout(function(){
								FedApp.Router.showList({
									type: type,
									locality: false
								});
							}, 300);
						}
					}
				},
				'/main/:type/search': {
					'/:search': {
						on: function(type, search) {
							console.log("/main/" + type + "/search/" + search);
							FedApp.Components.Loader.show();
							setTimeout(function(){
								FedApp.Router.showList({
									type: type,
									locality: search
								});
							}, 300);
						}
					}
				},
				'/main/venue/detail': {
					'/:cidn': {
						on: function(cidn) {
							console.log("/main/venue/detail/" + cidn);
							FedApp.Components.Loader.show();
							setTimeout(function(){
								FedApp.Router.showVenueDetail(cidn);
							}, 300);
						}
					}
				},
				'/main/production/detail': {
					'/:cidn': {
						on: function(cidn) {
							console.log("/main/production/detail/" + cidn);
							FedApp.Components.Loader.show();
							setTimeout(function(){
								FedApp.Router.showDetail({
									type: "production",
									cidn: cidn
								});
							}, 300);
						}
					}
				},
				'/main/event/detail': {
					'/:cidn': {
						on: function(cidn) {
							console.log("/main/event/detail/" + cidn);
							FedApp.Components.Loader.show();
							setTimeout(function(){
								FedApp.Router.showDetail({
									type: "event",
									cidn: cidn
								});
							}, 300);
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
			FedApp.Router.showMenuState("home");
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
				FedApp.Router.showMenuState(obj.type);

				listModel.events.off("loadDataComplete");
			});

		},
		showVenueDetail: function(cidn) {
			var venueDetail = new FedApp.Models.VenueDetail();

			venueDetail.get(cidn);
			venueDetail.events.on("loadDataComplete", function(data){
				var view = new FedApp.Views.VenueDetail(data);
				FedApp.Router.showView(view);

				venueDetail.events.off("loadDataComplete");
			});
		},
		showDetail: function(obj) {
			console.log("show detail");

			// Load Data
			var detail = new FedApp.Models.Detail();

			detail.get({
				type: obj.type,
				cidn: obj.cidn
			})

			detail.events.on("loadDataComplete", function(data){

				console.log(data);

				var view = new FedApp.Views.Detail(data);
				FedApp.Router.showView(view);

				detail.events.off("loadDataComplete");
			});
		},
		showAbout: function () {
			console.log("show about");

			var view = new FedApp.Views.About();
			
			FedApp.Router.showView(view);
			FedApp.Router.showMenuState("about");
		},
		showPage404: function () {
			console.log("show Page404");

			var view = new FedApp.Views.Page404();

			console.log(view);

			view.events.on("load404Complete", function(view){

				FedApp.Router.showView(view);
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
		},
		showMenuState: function(view) {
			var globalNav = document.getElementById("global-nav");
			var globalNavItems = new Array("global-nav--home", "global-nav--about");
			var mainNav = document.getElementById("main-nav");
			var mainNavItems = new Array("main__nav--event", "main__nav--venue", "main__nav--production");

			switch(view) {
				case "home":
					FedApp.Router.setMenuState({
						items: globalNavItems,
						active: "global-nav--home",
						target: globalNav
					});
					break;
				case "about":
					FedApp.Router.setMenuState({
						items: globalNavItems,
						active: "global-nav--about",
						target: globalNav
					});
					break;
				case "event":
					FedApp.Router.setMenuState({
						items: mainNavItems,
						active: "main__nav--event",
						target: mainNav
					});
					FedApp.Router.setMenuState({
						items: globalNavItems,
						active: false,
						target: globalNav
					});
					break;
				case "venue":
					FedApp.Router.setMenuState({
						items: mainNavItems,
						active: "main__nav--venue",
						target: mainNav
					});
					FedApp.Router.setMenuState({
						items: globalNavItems,
						active: false,
						target: globalNav
					});
					break;
				case "production":
					FedApp.Router.setMenuState({
						items: mainNavItems,
						active: "main__nav--production",
						target: mainNav
					});
					FedApp.Router.setMenuState({
						items: globalNavItems,
						active: false,
						target: globalNav
					});
					break;
			}
		},
		setMenuState: function(obj) {
			for(var i = 0;i < obj.items.length; i++) {
				if(obj.target.hasClass(obj.items[i])){
					obj.target.removeClass(obj.items[i]);
				}
				if(obj.active) {
					obj.target.addClass(obj.active);
				}
			}
		}
	}

})();