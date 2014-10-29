(function(){
	
	var Detail = function(data) {

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

	FedApp.Models.Detail = Detail;

})();