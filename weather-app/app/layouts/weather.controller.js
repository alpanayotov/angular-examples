(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('WeatherController', WeatherController);

	WeatherController.$inject = ['weatherService'];

	function WeatherController(weatherService) {
		var vm         = this;
		vm.error       = '';
		vm.weatherObject = [];

		activate();

		////////////////

		function activate() {
			weatherService.getWeatherData().then(function(data) {
				if ( data !== undefined ) {
					vm.weatherObject = data;
					console.log(vm.weatherObject);
				} else {
					vm.error = 'No data is currently available!';
				}
			});	
		}
	}
})();