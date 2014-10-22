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

})();;(function(){
	
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

})();;(function(){

	fedApp.helpers.loader = {
		loading: false,
		show: function() {
			var loader = document.getElementById("loader");

			if(loader.hasClass('loader--inactive') ) {
				loader.addClass('loader--isactive');
				loader.removeClass('loader--inactive');
			}
		},
		hide: function() {
			var loader = document.getElementById("loader");
			if(loader.hasClass('loader--isactive') ) {
				loader.addClass('loader--inactive');
				loader.removeClass('loader--isactive');
			}
		}
	}

})();;(function(){

	var ArtsApi = function () {

		this.path = "http://api.artsholland.com/rest";

		this.events = new Events();

		/**
		 	Get list function gets a list with objects from a given type
		 	@type string 'event'
		 	@params object {}
		*/
		this.getList = function(obj) {

			var _self = this;
			var type = obj.type;
			var params = obj.params

			var url = this.path + "/" + type + ".json";

			JSONP({
				url: url,
				data: params,
			    success: function(data) {

			    	// Add list type to data object
			    	for(var i = 0; i < data.results.length; i++) {
						data.results[i].listType = type;		    		
			    	}

			    	_self.events.emit("loadListComplete", data);
			    },
			    error: this.onErrorHandler
			});
		}

		/**
			Get single object gets a single object from a type and given cidn
			@type string 'event'
			@cidn string '2008-A-047-0143827'
		*/
		this.getSingleObject = function(obj) {

			var _self = this;
			var type = obj.type;
			var cidn = obj.cidn.toLowerCase();

			var url = this.path + "/" + type + "/" + cidn + ".json";

			JSONP({
				url: url,
			    success: function(data) {

			    	data.results[0].listType = type;

			    	_self.events.emit("loadSingleComplete", data);
			    },
			    error: this.onErrorHandler
			});
		}

		this.getChildRelations = function(obj) {

			var _self = this;
			var type = obj.type;
			var cidn = obj.cidn.toLowerCase();
			var relation = obj.relation;

			var url = this.path + "/" + type + "/" + cidn + "/" + relation;

			JSONP({
				url: url,
			    success: function(data) {
			    	_self.events.emit("loadChildRelationsComplete", data);
			    },
			    error: this.onErrorHandler
			});
		}

		this.onErrorHandler = function(data) {
			alert("ERROR: " + data);
		}
	}

	fedApp.data.ArtsApi = ArtsApi;

})();;(function() {

	var About = function () {

		this.template = "template-about";

		this.render = function () {
			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile( source );

			return template();
		}
	}

	fedApp.views.About = About;

})();;(function(){

	var Detail = function(data) {

		this.template = "template-detail";

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template(data.results[0]);
		}
	}

	fedApp.views.Detail = Detail;

})();;(function(){

	var List = function(data) {

		this.template = "template-list";

		this.render = function() {

			console.log(data);

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template(data);
		}
	}

	fedApp.views.List = List;

})();;(function(){

	var Main = function(data) {

		this.template = "template-main";

		this.render = function() {

			console.log(data);

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template(data);
		}
	}

	fedApp.views.Main = Main;

})();;(function(){

	var Page404 = function() {

		this.template = "template-404";

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template();
		}
	}

	fedApp.views.Page404 = Page404;

})();