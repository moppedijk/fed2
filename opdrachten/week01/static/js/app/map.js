// Namespace
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