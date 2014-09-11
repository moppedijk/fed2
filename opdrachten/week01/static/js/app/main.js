// Namespace
var geo = geo || {};

(function () {
  "use strict";

  /**
   	Geo config
  */
		geo.config = {
				sanbox: "SANDBOX",
				lineair: "LINEAIR",
				gpsAvailable: 'GPS_AVAILABLE',
				gpsUnavailable: 'GPS_UNAVAILABLE',
				positionUpdated: 'POSITION_UPDATED',
				refreshRate: 1000,
				currentPosition: false,
				currentPositionMarker: false,
				customDebugging: false,
				debugId: false,
				map: false,
				interval: false,
				intervalCounter: false,
				updateMap: false,
				locatieRij: markerRij = [],
				locations: []

		/**
		 "name": "Theo Thijssenhuis",
            "description": "",
            "coordinate": {
                "latitude": 52.35955620231157,
                "longitude": 4.908019635968003
            },
            "radius": 50,
            "onEnter":"theothijssen.html",
            "onExit":"naarbennopremsela.html"
		*/
	}

	/**
	 Geo controller
	*/
	geo.controller = {

		init: function() {
			geo.helpers.debugMessage("Controleer of GPS beschikbaar is...");

    		ET.addListener(geo.config.gpsAvailable, geo.gps.startInterval);
    		ET.addListener(geo.config.gpsUnavailable, function(){geo.helpers.debugMessage('GPS is niet beschikbaar.')});

    		(geo_position_js.init())?ET.fire(geo.config.gpsAvailable):ET.fire(geo.config.gpsUnavailable);	
		},

		info: function() {
			// info paga
		}

	}

	/**
	 Geo gps
	*/
	geo.gps = {

		// Start een interval welke op basis van refreshRate de positie updated
		startInterval: function(event) {
		    geo.helpers.debugMessage("GPS is beschikbaar, vraag positie.");
		    this.updatePosition();
		    geo.config.interval = self.setInterval(this.updatePosition, geo.config.refreshRate);
		    ET.addListener(geo.config.positionUpdated, this.checkLocations);
		},

		// Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
		updatePosition: function() {
		    geo.config.intervalCounter++;
		    geo_position_js.getCurrentPosition (
		    	this.setPosition, 
		    	_geo_error_handler, 
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
		},
	}

	/**

	*/
	geo.map = {

	}

	/**

	*/
	geo.helpers = {

		isNumber: function (n) {
  			return !isNaN(parseFloat(n)) && isFinite(n);
		},

		geo_error_handler: function (code, message) {
    		debug_message('geo.js error: ' + code + ': ' + message);
		},

		/**
		 Debug message
		*/
		debugMessage: function(message) {
    		(geo.config.customDebugging && geo.config.debugId) ? document.getElementById(geo.config.debugId).innerHTML : console.log(message);
		},

		/**
		 setCustomDebugging
		*/
		setCustomDebugging: function(debugId){
    		geo.config.debugId = this.debugId;
    		geo.condig.customDebugging = true;
		}
	}

})();