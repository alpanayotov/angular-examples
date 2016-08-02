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
				controllerAs: 'vm',
				resolve: {
					countriesData: getCountriesData
				}
			})
			.state('weather', {
				url: '/weather',
				templateUrl: 'app/layouts/weather.html',
				controller: 'WeatherController',
				controllerAs: 'vm',
				resolve: {
					weatherDataObject: getWeatherDataFromService
				}
			});
	}

	getWeatherDataFromService.$inject = ['weatherService'];

	function getWeatherDataFromService(weatherService) {
		return weatherService.getWeatherData()
			.then(function(data) {
				return data;
			})
			.catch(function(error){
				var error = {
					error: error
				};

				return error;
			});
	};

	getCountriesData.$inject = ['countriesService'];

	function getCountriesData(countriesService){
		return countriesService.getCountries().then(function(data) {
			return data;
		});
	};	
})();