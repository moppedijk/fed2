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

})();;(function(){
	
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

})();;(function(){

	FedApp.Components.Loader = {
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

	var List = function() {

		this.path = "http://api.artsholland.com/rest";

		this.events = new Events();

		this.init = function() {
			console.log("Initialize List model");
		}

		this.get = function(obj) {

			var _self = this;
			var type = obj.type;
			if(!obj.params.locality)
				obj.params.locality = "amsterdam";

			var params = obj.params;
			var url = this.path + "/" + type + ".json";

			JSONP({
				url: url,
				data: params,
			    success: function(data) {
					_self.filterList({
						type: type,
						data: data
					});
			    },
			    error: this.onErrorHandler
			});
		};

		this.filterList = function(obj) {

			var data = obj.data;

	    	for(var i = 0; i < data.results.length; i++) {
				var result = data.results[i];
					result.listType = obj.type;

				if(!result.attachment)
					result.attachment = "No attachment";
				if(!result.created)
					result.created = "No created date";
				if(!result.description)
					result.description = "No description";
				if(!result.eventStatus)
					result.eventStatus = "No event status";
				if(!result.genre)
					result.genre = "No genre";
				if(!result.hasBeginning)
					result.hasBeginning = "Has no beginning";
				if(!result.hasEnd)
					result.hasEnd = "Has no end";
				if(!result.homepage)
					result.homepage = "Has no homepage";
				if(!result.languageNoProblem)
					result.languageNoProblem = "No language problems";
				if(!result.modified)
					result.modified = "Not mofified";
				if(!result.offers)
					result.offers = "No offers";
				if(!result.production)
					result.production = "No production";
				if(!result.productionType)
					result.productionType = "Has no production type";
				if(!result.sameAs)
					result.sameAs = "Nothing the same as";
				if(!result.title)
					result.title = "Undefined";
				if(!result.type)
					result.type = "Has no type";
				if(!result.uri)
					result.uri = "Has no uri";
				if(!result.venue)
					result.venue = "Has no venue";
				if(!result.venueType)
					result.venueType = "Has no venue type";
	    	}

		    data.metadata.listType = obj.type;

			this.events.emit("loadDataComplete", data);
		}

		this.onErrorHandler = function(data) {
			alert("ERROR: " + data);
		};

		this.init();
	}

	FedApp.Models.List = List;

})();;(function(){
	
	var SingleObject = function(data) {

		this.path = "http://api.artsholland.com/rest";

		this.events = new Events();

		this.type = false;

		this.init = function() {
			console.log("Initialize SingelObject model");
		}

		/**
			Get single object gets a single object from a type and given cidn
			@type string 'event'
			@cidn string '2008-A-047-0143827'
		*/
		this.get = function(data) {

			console.log(data);

			var _self = this;
			var cidn = data.cidn.toLowerCase();

			this.type = data.type;

			var url = this.path + "/" + this.type + "/" + cidn + ".json";

			JSONP({
				url: url,
			    success: function(data) {
			    	_self.filterSingelObj(data);
			    },
			    error: this.onErrorHandler
			});
		};

		this.filterSingelObj = function(data) {

			var result = data.results[0];

			console.log(result);

			if(!result.created)
				result.created = "No data about creation";
			if(!result.description)
				result.description = "No description";
			if(!result.email)
				result.email = "No email";
			if(!result.homepage)
				result.homepage = "No homepage";
			if(!result.locationAddress)
				result.locationAddress = "No location address";
			if(!result.listType)
				result.listType = this.type;
			if(!result.modified) {
				result.modified = "No information about modification";
			}else{
				if(typeof(result.modified) == typeof([])) {
					var output = "";
					for(var i = 0; i < result.modified.length; i++) {
						output += ", " + result.modified[i];
					}
					result.modified = output.slice(2);
				}
			};
			if(!result.sameAs)
				result.sameAs = "Noting same as";
			if(!result.shortDescription)
				result.shortDescription = "No short description";
			if(!result.telephone)
				result.telephone = "No telephone";
			if(!result.title)
				result.title = "Untitled";
			if(!result.type)
				result.type = "No type";
			if(!result.uri)
				result.uri = "No uri";
			if(!result.venueType)
				result.venueType = "No venue type";

			this.events.emit("loadDataComplete", result);
		};

		this.onErrorHandler = function(data) {
			alert("ERROR: " + data);
		};

		this.init(data);
	}

	FedApp.Models.SingleObject = SingleObject;

})();;(function() {

	var About = function (data) {

		this.template = "template-about";

		this.model = false;

		this.events = new Events();

		this.init = function(data) {
			console.log("Initalize About");
		};

		this.render = function () {
			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile( source );

			return template();
		}

		this.init(data);
	}

	FedApp.Views.About = About;

})();;(function(){

	var Detail = function(data) {

		this.template = "template-detail";

		this.model = false;

		this.events = new Events();

		this.init = function(data) {
			console.log("Initialize Detail View");
			this.model = data;
		};

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template(this.model)
		};

		this.afterRender = function() {
			console.log("afterRender");
		}

		this.dispose = function() {

		};

		this.init(data);
	};

	FedApp.Views.Detail = Detail;

})();;(function(){

	var List = function(data) {

		this.template = "template-list";

		this.model = false;

		this.events = new Events();

		this.init = function(data) {
			console.log("Initialize List view");
			this.model = data;
		};

		this.render = function() {

			var templateId = document.getElementById(this.template);

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template(this.model);
		};

		this.afterRender = function() {

			console.log("List afterRender");

			var searchBtn = document.getElementById("form-btn-submit");
			searchBtn.addEventListener("click", this.onClickHandler);
		};

		this.dispose = function() {

		};

		/*
		 	User input handlers
		*/
		
		this.onClickHandler = function(e) {

			var inputLocality = document.getElementById("form-input-locality");

			console.log(window);

			if(!inputLocality){
				alert("Graag een stad invullen");
			}else {
				alert("Zoek: " + inputLocality.value);
			}
		};

		this.onKeyPressHandler = function(e) {

	        if (e.keyCode == 13) {
				
				console.log(data);

	        	var listType = "event";
	        	var query = e.target.value;
				routie("main/" + listType + "/" + query);
	        };
		};

		/*
			Intialize constructor
		*/

		this.init(data);
	};

	FedApp.Views.List = List;

})();;(function(){

	var Main = function(obj) {

		this.template = "template-main";

		this.model = false;

		this.events = new Events();

		this.init = function(obj) {
			console.log("Initialize main");
		};

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template();
		}

		this.init(obj);
	}

	FedApp.Views.Main = Main;

})();;(function(){

	var Page404 = function(obj) {

		this.template = "template-404";

		this.events = new Events();

		this.init = function(obj) {
			this.render();
		}

		this.render = function() {

			var templateId = document.getElementById( this.template );

			var source   = templateId.innerHTML;
			var template = Handlebars.compile(source);

			return template();
		}

		this.init(obj);
	}

	FedApp.Views.Page404 = Page404;

})();