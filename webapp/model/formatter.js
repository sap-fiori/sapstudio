sap.ui.define([], function() {
	"use strict";

	return {
		
		/**
		 * Formats an address to a static google maps image
		 * @public
		 * @param {string} sStreet the street
		 * @param {string} sZIP the postal code
		 * @param {string} sCity the city
		 * @param {string} sCountry the country
		 * @returns {string} sValue a google maps URL that can be bound to an image
		 */
		formatMapUrl: function(sStreet, sZIP, sCity, sCountry) {
			return "https:" + "//maps.googleapis.com/maps/api/staticmap?zoom=13&size=640x640" 
			+ "&key=AIzaSyD9r8w6y4MTKKKUUwhivYH5aeintu9nzn8" 
			+ "&markers="
				+ jQuery.sap.encodeURL(sStreet + ", " + sZIP +  " " + sCity + ", " + sCountry);
		},
			
		delivery: function(iWeight, sMeasure) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle(),
				sResult = "";

			if(sMeasure === "G") {
				iWeight = iWeight / 1000;
			}
			if (iWeight < 0.5) {
				sResult = oResourceBundle.getText("formatterMailDelivery");
			} else if (iWeight < 5) {
				sResult = oResourceBundle.getText("formatterParcelDelivery");
			} else {
				sResult = oResourceBundle.getText("formatterCarrierDelivery");
			}

			return sResult;
		},
		
		/**
         * Expects a Base64 string and trims the first 104 bytes from it and returns 
         * a Data Uri using the trimmed Base64 string.
         */ 
        trimSuperfluousBytes : function (sVal) {
          var sTrimmed;
          var sResult;
          if(typeof sVal === "string"){
             sTrimmed = sVal.substr(104);
             sResult = "data:image/bmp;base64," + sTrimmed;
          }
          return sResult;
        }
	};
});
