(function() {
	'use strict';

	angular
		.module('app.routes', [])
		.config(config);


	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('/', {
				url: '/',
				templateUrl: "app/layouts/landing.html",
				controller: 'LandingFormController',
				controllerAs: 'vm'
			})
			.state('/weather', {
				url: '/weather',
				templateUrl: 'app/layouts/weather.html',
				controller: 'WeatherController',
				controllerAs: 'vm'
			});
	}

})();