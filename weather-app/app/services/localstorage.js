(function() {
	'use strict';

	angular
		.module('app.core')
		.service('storageService', storageService);

	function storageService() {
		var storageServices = {
			setRequestData : setRequestData,
			getRequestData : getRequestData,
			deleteDataByKey : deleteDataByKey,
			setWeatherData : setWeatherData,
			getWeatherData : getWeatherData
		}

		return storageServices;

		function setWeatherData(data){
			var cache = getWeatherData();

			if ( !cache ){
				cache = {};
			}

			cache[data.cacheKey] = data;
			localStorage.setItem('weatherAppData', JSON.stringify(cache));
		}

		function getWeatherData() {
			return JSON.parse(localStorage.getItem('weatherAppData'));
		}

		function setRequestData(data) {
			localStorage.setItem('weatherAppRequest', JSON.stringify(data));
		}

		function getRequestData() {
			return JSON.parse(localStorage.getItem('weatherAppRequest'));
		}

		function deleteDataByKey(key){
			var data = getRequestData();
			delete data[key];
			
			setRequestData(data);
		}
	}
})();