(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('WeatherController', WeatherController);

	WeatherController.$inject = ['weatherDataObject', '$state', 'storageService', 'helpers'];

	function WeatherController(weatherDataObject, $state, storageService, helpers) {
		var vm                   = this;
		vm.weatherDataObject     = weatherDataObject;
		vm.weatherData           = vm.weatherDataObject.weatherData;
		vm.updateLocationData    = updateLocationData;
		vm.changeWeatherLocation = changeWeatherLocation;

		function updateLocationData() {
			var currentRequest = storageService.getRequestData();
			var cacheKey = helpers.generateCacheKey(currentRequest);

			if ( cacheKey ) {
				storageService.deleteDataByKey(cacheKey);
				$state.reload();
			} else {
				alert( 'Something went wrong! Please try again later!' );
			}
		}

		function changeWeatherLocation() {
			$state.go('/');
		}
	}
})();