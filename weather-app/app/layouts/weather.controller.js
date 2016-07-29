(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('WeatherController', WeatherController);

	WeatherController.$inject = ['weatherService'];

	function WeatherController(weatherService) {
		var vm         = this;
		vm.title       = 'WeatherController';
		vm.weatherData = [];

		activate();

		////////////////

		function activate() {
			weatherService.getWeatherData().then(function(data) {
				vm.weatherData = data;
				console.log(vm.weatherData);
			});	
		}
	}
})();