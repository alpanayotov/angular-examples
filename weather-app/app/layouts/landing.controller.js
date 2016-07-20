(function() {
	'use strict';

	angular
		.module('app')
		.controller('LandingFormController', LandingFormController);

	LandingFormController.$inject = ['countriesService', '$state'];

	function LandingFormController(countriesService, $state) {
		var vm             = this;
		vm.countriesList   = [];
		vm.selectedCountry = '';
		vm.zipCode         = '';
		vm.setLocationData = setLocationData;

		activate();

		function activate(){
			countriesService.getCountries().then(function(data) {
				vm.countriesList = data;
			});
		}

		function setLocationData() {
			if ( vm.selectedCountry === '' || !vm.selectedCountry ) {
				return;
			}

			if ( vm.zipCode === '' || !vm.zipCode ) {
				return;
			}

			var wheaterAppData = {
				'zipCode' : vm.zipCode,
				'country' : vm.selectedCountry
			}

			localStorage.setItem('wheaterAppData', wheaterAppData);
			
			$state.go('/weather');
		}
	}
})();