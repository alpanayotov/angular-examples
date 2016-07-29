(function() {
	'use strict';

	angular
		.module('app')
		.service('weatherService', weatherService);

	weatherService.$inject = ['$http', 'storageService', '$q'];

	function weatherService($http, storageService, $q) {
		var API_KEY       = 'af9ea6fc78a5d7f1afbf445eaa8f14f4';

		var locationData  = storageService.getWeatherData();
		var cacheTreshold = 7200000; // 2 hours is ms
		var weatherData   = {
			getWeatherData : getWeatherData
		};

		return weatherData;

		function getWeatherData() {
			if ( locationData.hasOwnProperty('weatherData') ) {
				if ( !isCacheExpired(locationData.time)) {
					return $q.resolve(locationData);
				}
			} 
			
			return $http
				.get('http://api.openweathermap.org/data/2.5/weather?zip='+ locationData.zipCode +','+ locationData.country +'&appid=' + API_KEY )
				.then(getWeatherDataComplete)
				.catch( function(error){
					console.log(error);
				});

			function getWeatherDataComplete(data){
				if ( data.data.cod !== 200 ){
					return $q.reject(data.data.message);
				}

				locationData.weatherData = data.data;
				locationData.time        = Date.now(); 
				storageService.setWeatherData(locationData);
				return locationData;
			}
		};

		function isCacheExpired(timestamp) {
			return Date.now() - timestamp > cacheTreshold;
		}
	}

})();