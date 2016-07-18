(function(){
	angular
		.module('SuggestionsBoxController')
		.controller('homeController', ['suggestions', function(suggestions){
			var vm             = this;
			vm.pageTitle       = 'Suggestions Box with Angular';
			vm.suggestionTitle = '';
			vm.suggestions     = suggestions.posts;
			vm.addSuggestion   = addSuggestion;
			vm.upVote          = upVote;
			vm.downVote        = downVote;

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
		}]);

})();