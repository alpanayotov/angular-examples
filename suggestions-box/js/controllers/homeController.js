(function() {
	'use_strict';

	angular
		.module('SuggestionsBoxController')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['suggestions'];

	function HomeController(suggestions){
		var vm             = this;
		vm.pageTitle       = 'Suggestions Box with AngularJS!';
		vm.suggestionTitle = '';
		vm.suggestions     = [];
		vm.addSuggestion   = addSuggestion;
		vm.upVote          = upVote;
		vm.downVote        = downVote;

		activate();

		function activate() {
			return vm.suggestions = suggestions.posts;
		}

		function addSuggestion() {

			if ( !vm.suggestionTitle || vm.suggestionTitle === '' ) {
				return;
			}

			var newSuggestion = {
				title: vm.suggestionTitle,
				upvotes: 0,
				comments: []
			}

			vm.suggestionTitle = '';

			vm.suggestions.push(newSuggestion)
		};

		function upVote(suggestion){
			suggestion.upvotes++;
		};

		function downVote(suggestion){
			suggestion.upvotes--;
		};
	}

})();