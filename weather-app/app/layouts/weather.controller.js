(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('WeatherController', WeatherController);

	WeatherController.$inject = ['weatherDataObject', '$state', 'storageService'];

	function WeatherController(weatherDataObject, $state, storageService) {
		var vm                   = this;
		vm.error                 = '';
		vm.weatherDataObject     = weatherDataObject;
		vm.weatherData           = vm.weatherDataObject.weatherData;
		vm.updateLocationData    = updateLocationData;
		vm.changeWeatherLocation = changeWeatherLocation;

		function updateLocationData() {
			storageService.deleteDataByKey('weatherData');
			$state.reload();
		}

		function changeWeatherLocation() {
			$state.go('/');
		}
	}
})();