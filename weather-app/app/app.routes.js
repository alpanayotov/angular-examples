(function() {
	'use strict';

	angular
		.module('app.routes', [])
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];
		
	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('/', {
				url: '/',
				templateUrl: 'app/layouts/landing.html',
				controller: 'LandingFormController',
				controllerAs: 'vm'
			})
			.state('/weather', {
				url: '/weather',
				templateUrl: 'app/layouts/weather.html',
				controller: 'WeatherController',
				controllerAs: 'vm',
				resolve: {
					weatherData: getWeatherDataFromService
				}
			});
	}

	getWeatherDataFromService.$inject = ['weatherService'];

	function getWeatherDataFromService(weatherService) {
		return weatherService.getWeatherData()
			.then(function(data) {
				if ( data !== undefined ) {
					return data;
				} 

				return 'No data is currently available!';
			});
	}	
})();