// Namespace
var geo = geo || {};

(function(){
	"use strict"

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
		locatieRij: markerRij = []
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
		}

	}

	geo.gps = {

		// Start een interval welke op basis van REFRESH_RATE de positie updated
		startInterval: function(event){
		    geo.helpers.debugMessage("GPS is beschikbaar, vraag positie.");
		    _update_position();
		    interval = self.setInterval(_update_position, REFRESH_RATE);
		    ET.addListener(POSITION_UPDATED, _check_locations);
		}

		// Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
		_update_position: function(){
		    intervalCounter++;
		    geo_position_js.getCurrentPosition(_set_position, _geo_error_handler, {enableHighAccuracy:true});
		}

		// Callback functie voor het instellen van de huidige positie, vuurt een event af
		_set_position: function(position){
		    currentPosition = position;
		    ET.fire("POSITION_UPDATED");
		    geo.helpers.debugMessage(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);
		}

		// Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
		_check_locations: function(event){
		    // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
		    for (var i = 0; i < locaties.length; i++) {
		        var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

		        if(_calculate_distance(locatie, currentPosition)<locaties[i][2]){

		            // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
		            if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
		                // Probeer local storage, als die bestaat incrementeer de locatie
		                try {
		                    (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
		                } catch(error) {
		                    geo.helpers.debugMessage("Localstorage kan niet aangesproken worden: "+error);
		                }

						// TODO: Animeer de betreffende marker

		                window.location = locaties[i][1];
		                geo.helpers.debugMessage("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
		            }
		        }
		    }
		}

		// Bereken het verchil in meters tussen twee punten
		_calculate_distance: function(p1, p2){
		    var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
		    var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
		    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
		}
	}

	/**

	*/
	geo.map = {

	}

	/**

	*/
	geo.helpers = {

		/**
		 Debug message
		*/
		debugMessage = function() {

		}
	}

})();