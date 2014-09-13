// Namespace
var geo = geo || {};

(function () {
  "use strict";

	/**
	 Geo app
	*/
	geo.app = {

		// Geo initialize function
		init: function( settings ) {
			geo.helpers.debugMessage("Check if gps is available");
			geo.config.settings = this.settings;

    		ET.addListener(geo.config.gpsAvailable, geo.gps.startInterval);
    		ET.addListener(geo.config.gpsUnavailable, function(){geo.helpers.debugMessage('Gps not available')});

    		(geo_position_js.init())?ET.fire(geo.config.gpsAvailable):ET.fire(geo.config.gpsUnavailable);	
		},
	}

})();;// Namespace
var geo = geo || {};

(function() {
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
		locatieRij: false,
		locations: []
	}

})();;// Namespace
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
		},
	}
})();;// Namespace
var geo = geo || {};

(function(){
	"use strict";

	/**
	 Helpers
	*/
	geo.helpers = {

		isNumber: function( n ) {
  			return !isNaN(parseFloat(n)) && isFinite(n);
		},

		geoErrorHandler: function( code, message ) {
    		geo.helpers.debugMessage('geo.js error: ' + code + ': ' + message);
		},

		/**
		 Debug message
		*/
		debugMessage: function( message ) {
    		(geo.config.customDebugging && geo.config.debugId) ? document.getElementById(geo.config.debugId).innerHTML : console.log(message);
		},

		/**
		 setCustomDebugging
		*/
		setCustomDebugging: function( debugId ){
    		geo.config.debugId = this.debugId;
    		geo.condig.customDebugging = true;
		}
	}

})();;// Namespace
var geo = geo || {};

(function() {
	"use strict";

	/**
	 Map
	*/
	geo.map = {

		routeList: [],
		markerLatLng: false,
		markerList: [],
		marker: false,
		generateMap: function( myOptions, canvasId ) {

			// TODO: Kan ik hier asynchroon nog de google maps api aanroepen? dit scheelt calls
		    geo.helpers.debugMessage("Genereer een Google Maps kaart en toon deze in #" + canvasId)
		    geo.config.map = new google.maps.Map(document.getElementById(canvasId), myOptions);

		    // Voeg de markers toe aan de map afhankelijk van het tourtype
		    geo.helpers.debugMessage("Locaties intekenen, tourtype is: " + tourType);

		    for (var i = 0; i < geo.config.locations.length; i++) {

		        // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de geo.config.locations toe
		        try {
		            (localStorage.visited == undefined || geo.helpers.isNumber(localStorage.visited)) ? localStorage[geo.config.locations[i][0]] = false : null;
		        } catch (error) {
		            geo.helpers.debugMessage("Localstorage kan niet aangesproken worden: " + error);
		        }

		        this.markerLatLng = new google.maps.LatLng(geo.config.locations[i][3], geo.config.locations[i][4]);
		        this.routeList.push(this.markerLatLng);

		        this.markerList[i] = {};
		        for (var attr in locatieMarker) {
		            this.markerList[i][attr] = locatieMarker[attr];
		        }

		        this.markerList[i].scale = geo.config.locations[i][2]/3;

		        this.marker = new google.maps.Marker({
		            position: markerLatLng,
		            map: map,
		            icon: this.markerList[i],
		            title: geo.config.locations[i][0]
		        });
		    }

			// TODO: Kleur aanpassen op het huidige punt van de tour

		    if(tourType == geo.config.lineair){
		        // Trek lijnen tussen de punten
		        geo.helpers.debugMessage("Route intekenen");

		        var route = new google.maps.Polyline({
		            clickable: false,
		            map: map,
		            path: routeList,
		            strokeColor: 'Black',
		            strokeOpacity: .6,
		            strokeWeight: 3
		        });

		    }

		    // Voeg de locatie van de persoon door
		    currentPositionMarker = new google.maps.Marker({
		        position: kaartOpties.center,
		        map: map,
		        icon: positieMarker,
		        title: 'U bevindt zich hier'
		    });

		    // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
		    ET.addListener(geo.config.positionUpdated, geo.gps.updatePosition);
		}
	}
})();