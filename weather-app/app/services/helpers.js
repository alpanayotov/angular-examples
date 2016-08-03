(function() {
	'use strict';

	angular
		.module('app.core')
		.service('helpers', helpers);

	function helpers() {
		var helpers = {
			generateCacheKey: generateCacheKey
		};

		return helpers;

		////////////////

		function generateCacheKey(requestData) {
			var method = requestData.method;
			var cacheKey;

			if ( method === 'byZip' ) {
				cacheKey = requestData.zipCode + '_' + requestData.country;
			} else {
				cacheKey = requestData.lat.toString() + '_' + requestData.lang.toString();
			}	

			return cacheKey;
		}
	}
})();