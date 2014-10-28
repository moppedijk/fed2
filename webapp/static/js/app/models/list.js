(function(){

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

})();