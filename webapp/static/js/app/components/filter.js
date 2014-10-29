(function(){

	FedApp.Components.Filter = {
		removeHtml: function(string) {
		 	if(string){
		 		var str = JSON.stringify(string);
		 	 	var strInputCode = str.replace(/&(lt|gt);/g, function (strMatch, p1){
		 		 	return (p1 == "lt")? "<" : ">";
		 		});
		 		var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
		 		str = strTagStrippedText;
		 	}
			return str;
		},
		trimString: function(string, number) {

			var str = string;
			var subStr = "";

			if(str.length > number) {
				subStr = str.substring(0, number);
			}else {
				subStr = str;
			}

			return subStr;
		},
		createStringFromObject: function(obj) {

			return string;
		}
	}

})();