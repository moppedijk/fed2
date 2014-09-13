// Namespace
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

})();