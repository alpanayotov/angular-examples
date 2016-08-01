(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('WeatherController', WeatherController);

	WeatherController.$inject = ['weatherData'];

	function WeatherController(weatherData) {
		var vm           = this;
		vm.error         = '';
		vm.weatherObject = weatherData;
	}
})();