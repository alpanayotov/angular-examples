(function() {
	'use_strict';

	angular.module('SuggestionsBox', [
		'ui.router',
		'SuggestionsBoxController', 
		'SuggestionController',
		'SuggestionsService'
	]);

	// controllers
	angular.module('SuggestionsBoxController', []);
	angular.module('SuggestionController', []);

	// services
	angular.module('SuggestionsService', []);
})();