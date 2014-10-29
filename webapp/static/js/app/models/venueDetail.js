(function(){
	
	var VenueDetail = function(data) {

		this.path = "http://api.artsholland.com/rest";

		this.events = new Events();

		this.type = false;

		this.init = function() {
			console.log("Initialize VenueDetail model");
		}

		/**
			Get single object gets a single object from a type and given cidn
			@type string 'event'
			@cidn string '2008-A-047-0143827'
		*/
		this.get = function(cidn) {

			var _self = this;
			var cidn = cidn.toLowerCase();
			var url = this.path + "/venue/" + cidn + ".json";

			JSONP({
				url: url,
			    success: function(data) {
			    	_self.getEvents(data);
			    },
			    error: this.onErrorHandler
			});
		};

		this.getEvents = function(data) {
			console.log("getEvents");

			var _self = this;
			var venueResults = data.results[0];
			var cidn = venueResults.cidn;
			var url = this.path + "/venue/" + cidn + "/event.json";

			JSONP({
				url: url,
			    success: function(data) {
			    	_self.filterSingelObj({
			    		venue: venueResults,
			    		events: data.results
			    	});
			    },
			    error: this.onErrorHandler
			});
		}

		this.filterSingelObj = function(obj) {

			var result = obj;

			console.log(result);

			this.events.emit("loadDataComplete", result);
		};

		this.onErrorHandler = function(data) {
			alert("ERROR: " + data);
		};

		this.init(data);
	}

	FedApp.Models.VenueDetail = VenueDetail;

})();