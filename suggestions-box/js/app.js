(function() {
	'use_strict';
	
	angular.module('SuggestionsBox', [
		'ui.router', 
		'SuggestionsBoxController', 
		'SuggestionsService'
	]);

	// controllers
	angular.module('SuggestionsBoxController', []);

	// services
	angular.module('SuggestionsService', []);
})();