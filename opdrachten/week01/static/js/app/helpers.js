// Namespace
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
    		geo.config.customDebugging = true;
		}
	}

})();