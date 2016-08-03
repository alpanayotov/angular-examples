(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('weatherService', weatherService);

	weatherService.$inject = ['$http', 'storageService', '$q', 'helpers'];
	function weatherService($http, storageService, $q, helpers) {
		var API_KEY       = 'a80057dbcf5b3a9ce4b0eb090b2f15b1';
		var API_URL       = 'http://api.openweathermap.org/data/2.5/weather';
		
		var cacheTreshold = 7200000; // 2 hours is ms

		var weatherData = {
			getWeatherData : getWeatherData
		};

		return weatherData;

		function getWeatherData() {
			var requestData = storageService.getRequestData();
			var method      = requestData.method;
			var cacheKey    = helpers.generateCacheKey(requestData);
			var cachedData  = checkForCachedData(cacheKey);
			var url;

			if ( cachedData ) {
				return $q.resolve(cachedData);
			}
			
			if ( method === 'byZip' ) {
				url = API_URL + '?zip='+ requestData.zipCode +','+ requestData.country +'&units=metric&appid=' + API_KEY;
			} else {
				url = API_URL + '?lat='+ requestData.lat +'&lon='+ requestData.lang +'&units=metric&appid=' + API_KEY;
			}

			return $http
				.get(url)
				.then(getWeatherDataComplete)
				.catch( function(error){
					var error = {
						'error' : error
					}

					return error;
				});

			function getWeatherDataComplete(data){
				if ( data.data.cod !== 200 ){
					var error = {
						error : data.data.message
					};

					return $q.reject(error);
				}

				var cacheKey     = helpers.generateCacheKey(requestData);
				var locationData = {};

				locationData = {
					weatherData: data.data,
					method: method,
					time: Date.now(),
					cacheKey: cacheKey
				};

				storageService.setWeatherData(locationData);

				return locationData;
			}
		};

		function checkForCachedData(cacheKey) {
			var cachedData = storageService.getWeatherData();

			if ( ! cachedData.hasOwnProperty(cacheKey) ) { 
				return false;
			}
			
			if ( isCacheExpired(cachedData[cacheKey].time ) ) {
				storageService.deleteDataByKey(cacheKey);
				return false
			} 

			return cachedData[cacheKey];
		}

		function isCacheExpired(timestamp) {
			return Date.now() - timestamp > cacheTreshold;
		}
		
	}

})();