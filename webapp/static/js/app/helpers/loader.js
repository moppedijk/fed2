(function(){

	fedApp.helpers.loader = {
		loading: false,
		show: function() {
			var loader = document.getElementById("loader");

			if(loader.hasClass('loader--inactive') ) {
				loader.addClass('loader--isactive');
				loader.removeClass('loader--inactive');
			}
		},
		hide: function() {
			var loader = document.getElementById("loader");
			if(loader.hasClass('loader--isactive') ) {
				loader.addClass('loader--inactive');
				loader.removeClass('loader--isactive');
			}
		}
	}

})();