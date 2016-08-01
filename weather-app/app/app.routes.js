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
					weatherDataObject: getWeatherDataFromService
				}
			});
	}

	getWeatherDataFromService.$inject = ['weatherService', '$state'];

	function getWeatherDataFromService(weatherService, $state) {
		return weatherService.getWeatherData()
			.then(function(data) {
				if ( data !== undefined ) {
					if ( data.hasOwnProperty('error') ) {
						$state.go('/');
					}

					return data;
				} 
			})
			.catch(function(error){
				console.log(error);
			});
	}	
})();