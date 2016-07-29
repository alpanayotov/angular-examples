(function() {
	'use strict';

	angular
		.module('app')
		.controller('LandingFormController', LandingFormController);

	LandingFormController.$inject = ['countriesService', 'storageService', '$state', '$geolocation'];

	function LandingFormController(countriesService, storageService, $state, $geolocation) {
		var vm                = this;
		vm.countriesList      = [];
		vm.selectedCountry    = '';
		vm.zipCode            = '';
		vm.setLocationData    = setLocationData;
		vm.getBrowserPosition = getBrowserPosition;
		vm.getFormData        = getFormData;
		vm.weatherAppData     = {};

		activate();

		function activate(){
			countriesService.getCountries().then(function(data) {
				vm.countriesList = data;
			});
		}

		function setLocationData() {
			storageService.deleteWeatherData();
			storageService.setWeatherData(vm.weatherAppData);
			$state.go('/weather');
		}

		function getFormData(){
			if ( vm.selectedCountry === '' || !vm.selectedCountry ) {
				return;
			}

			if ( vm.zipCode === '' || !vm.zipCode ) {
				return;
			}

			vm.weatherAppData = {
				'zipCode' : vm.zipCode,
				'country' : vm.selectedCountry,
				'method'  : 'byZip'
			}

			setLocationData();
		}

		function getBrowserPosition(){
			$geolocation.getCurrentPosition({
				timeout: 60000
			}).then(function(position) {
								   
				vm.weatherAppData = {
					'lat'   : position.coords.latitude,
					'lang'  : position.coords.longitude,
					'method': 'byCoordinates'
				}

				setLocationData();
				
			});
		}
	}
})();