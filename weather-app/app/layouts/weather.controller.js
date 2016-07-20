(function() {
	'use strict';

	angular
		.module('app.core')
		.controller('WeatherController', WeatherController);

	WeatherController.$inject = [];

	function WeatherController() {
		var vm = this;
		vm.title = 'WeatherController';

		activate();

		////////////////

		function activate() {
		}
	}
})();