(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('weatherService', weatherService);

	weatherService.$inject = ['$http', 'storageService', '$q'];
	function weatherService($http, storageService, $q) {
		var API_KEY = 'af9ea6fc78a5d7f1afbf445eaa8f14f4';
		var API_URL = 'http://api.openweathermap.org/data/2.5/weather';

		var locationData  = storageService.getWeatherData();
		var cacheTreshold = 7200000; // 2 hours is ms
		var weatherData   = {
			getWeatherData : getWeatherData,
			getStoredWeatherData : getStoredWeatherData
		};

		return weatherData;

		function getWeatherData() {
			var storedData = getStoredWeatherData();

			if ( Object.keys(storedData).length !== 0 ) {
				return $q.resolve(storedData);
			}

			var url    = '';
			var method = locationData.method;

			if ( method === 'byZip' ) {
				url = API_URL + '?zip='+ locationData.zipCode +','+ locationData.country +'&units=metric&appid=' + API_KEY;
			} else {
				url = API_URL + '?lat='+ locationData.lat +'&lon='+ locationData.lang +'&units=metric&appid=' + API_KEY;
			}

			return $http
				.get(url)
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

		function getStoredWeatherData() {
			var data = {};

			if ( locationData === null ){
				var error = {
					'error': 'No available data'
				};

				data = error;
			} else if ( locationData.hasOwnProperty('weatherData') ) {
				if ( !isCacheExpired(locationData.time)) {
					data = locationData;
				}
			} 

			return data;
		}

		function isCacheExpired(timestamp) {
			return Date.now() - timestamp > cacheTreshold;
		}
	}

})();