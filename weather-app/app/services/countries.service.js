(function() {
	'use strict';

	angular
		.module('app')
		.service('countriesService', countriesService);

	countriesService.$inject = ['$http'];

	function countriesService($http) {
		var countriesList = {
			getCountries: getCountries
		}; 

		return countriesList;

		function getCountries() {
			return $http.get('content/countries.json')
				.then(getCountriesComplete)
				.catch(function(message) {
					var error = {
						error: message
					};

					return error;
				});

			function getCountriesComplete(data){
				return data.data;
			}
		};
	}
})();