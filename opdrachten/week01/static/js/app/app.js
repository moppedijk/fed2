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
		}
	}

})();