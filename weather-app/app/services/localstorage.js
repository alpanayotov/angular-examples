(function() {
	'use strict';

	angular
		.module('app.core')
		.service('storageService', storageService);

	function storageService() {
		var storageServices = {
			setWeatherData : setWeatherData,
			getWeatherData : getWeatherData,
			deleteWeatherData : deleteWeatherData,
			deleteDataByKey : deleteDataByKey
		}

		return storageServices;

		function setWeatherData(data) {
			localStorage.setItem('weatherAppData', JSON.stringify(data));
		}

		function getWeatherData() {
			return JSON.parse(localStorage.getItem('weatherAppData'));
		}

		function deleteWeatherData(){
			localStorage.removeItem('weatherAppData')	
		}

		function deleteDataByKey(key){
			var data = getWeatherData();
			delete data[key];
			
			setWeatherData(data);
		}
	}
})();