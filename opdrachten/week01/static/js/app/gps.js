// Namespace
var geo = geo || {};

(function() {

	/**
	 Geo gps
	*/
	geo.gps = {

		// Starts an interval that updates the position by refreshRate
		startInterval: function(event) {
		    geo.helpers.debugMessage("Gps is available, ask position");
		    geo.gps.updatePosition();
		    geo.config.interval = self.setInterval(geo.gps.updatePosition, geo.config.refreshRate);
		    ET.addListener(geo.config.positionUpdated, geo.gps.checkLocations);
		},

		// Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
		updatePosition: function() {
		    geo.config.intervalCounter++;

		    geo_position_js.getCurrentPosition (
		    	geo.gps.setPosition, 
		    	geo.helpers.geoErrorHandler, 
		    	{
		    		enableHighAccuracy: true
		    	}
		    );
		},

		// Callback functie voor het instellen van de huidige positie, vuurt een event af
		setPosition: function(position) {

		    geo.config.currentPosition = position;
		    ET.fire("POSITION_UPDATED");
		    geo.helpers.debugMessage(geo.config.intervalCounter + " positie lat:" + geo.config.currentPosition.coords.latitude + " long:" + geo.config.currentPosition.coords.longitude);
		},

		// Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
		checkLocations: function(event) {

		    for (var i = 0; i < geo.config.locations.length; i++) {

		        var locatie = {
		        	coords: {
		        		latitude: geo.config.locations[i][3],
		        		longitude: geo.config.locations[i][4]
		        	}
		        };

		        if(this.calculateDistance(locatie, geo.config.currentPosition) < geo.config.locations[i][2]) {

		            // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
		            if(window.location != geo.config.locations[i][1] && localStorage[geo.config.locations[i][0]] == "false") {
		                // Probeer local storage, als die bestaat incrementeer de locatie
		                try {
		                    (localStorage[geo.config.locations[i][0]] == "false") ? localStorage[geo.config.locations[i][0]] = 1 : localStorage[geo.config.locations[i][0]]++;
		                } catch(error) {
		                    geo.helpers.debugMessage("Localstorage kan niet aangesproken worden: " + error);
		                }

						// TODO: Animeer de betreffende marker

		                window.location = geo.config.locations[i][1];
		                geo.helpers.debugMessage("Speler is binnen een straal van "+ geo.config.locations[i][2] +" meter van "+geo.config.locations[i][0]);
		            }
		        }
		    }
		},

		// Bereken het verchil in meters tussen twee punten
		calculateDistance: function(p1, p2) {
		    var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
		    var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);

		    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
		}
	}
})();