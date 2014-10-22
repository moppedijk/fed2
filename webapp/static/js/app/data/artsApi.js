(function(){

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

})();