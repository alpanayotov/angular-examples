(function() {
	'use strict';

	angular
		.module('app')
		.controller('LandingFormController', LandingFormController);

	LandingFormController.$inject = ['storageService', '$state', '$geolocation', 'countriesData'];

	function LandingFormController(storageService, $state, $geolocation, countriesData) {
		var vm                = this;
		vm.countriesList      = countriesData;
		vm.selectedCountry    = '';
		vm.zipCode            = '';
		vm.setRequestData     = setRequestData;
		vm.getBrowserPosition = getBrowserPosition;
		vm.handleFormSubmit   = handleFormSubmit;
		vm.requestData        = {};

		function setRequestData() {
			storageService.setRequestData(vm.requestData);
			$state.go('weather');
		}

		function handleFormSubmit(){
			if ( !vm.zipCode || !vm.selectedCountry ) {
				return;
			}

			vm.requestData = {
				'zipCode' : vm.zipCode,
				'country' : vm.selectedCountry,
				'method' : 'byZip'
			};

			setRequestData();
		}

		function getBrowserPosition(){
			$geolocation.getCurrentPosition({
				timeout: 60000
			}).then(function(position) {
				
				vm.requestData = {
					'lat'   : position.coords.latitude,
					'lang'  : position.coords.longitude,
					'method' : 'byCoordinates'
				};

				setRequestData();
				
			});
		}
	}
})();