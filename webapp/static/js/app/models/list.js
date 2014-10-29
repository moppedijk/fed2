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
			var filter = FedApp.Components.Filter;

	    	for(var i = 0; i < data.results.length; i++) {
				var result = data.results[i];
					result.listType = obj.type;

				if(!result.attachment)
					result.attachment = false;
				if(!result.created){
					result.created = "No date";
				}else {
					var created = filter.trimString(result.created, 10);
					result.created = created;
				}
				if(!result.description)
					result.description = "No description";
				if(!result.eventStatus)
					result.eventStatus = false;
				if(!result.genre)
					result.genre = false;
				if(!result.hasBeginning)
					result.hasBeginning = false;
				if(!result.hasEnd)
					result.hasEnd = false;
				if(!result.homepage)
					result.homepage = false;
				if(!result.languageNoProblem)
					result.languageNoProblem = false;
				if(!result.modified)
					result.modified = false;
				if(!result.offers)
					result.offers = false;
				if(!result.production)
					result.production = false;
				if(!result.productionType)
					result.productionType = false;
				if(!result.shortDescription){
					var description = filter.removeHtml(result.description);
					var shortDescription = filter.trimString(description, 75);
					result.shortDescription = shortDescription;
				}else {
					var description = filter.removeHtml(result.shortDescription);
					var shortDescription = filter.trimString(description, 75);
					result.shortDescription = shortDescription;
				}
				if(!result.sameAs)
					result.sameAs = false
				if(!result.title)
					result.title = "Untitled";
				if(!result.type)
					result.type = false
				if(!result.uri)
					result.uri = false;
				if(!result.venue)
					result.venue = false
				if(!result.venueType)
					result.venueType = false;
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