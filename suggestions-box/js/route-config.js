(function() {
	'use_strict';

	angular
	.module('SuggestionsBox')
	.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('/home', {
				url: '/home',
				templateUrl: "views/home.html",
				controller: 'HomeController',
				controllerAs: 'vm'
			})
			.state('suggestion', {
				url: '/suggestions/:suggestionId',
				templateUrl: 'views/suggestion.html',
				controller: 'SuggestionController',
				controllerAs: 'vm',
			});
	}

})();