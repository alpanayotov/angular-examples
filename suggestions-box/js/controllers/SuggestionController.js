(function() {
	'use_strict';

	angular
		.module('SuggestionController')
		.controller('SuggestionController', SuggestionController);

	SuggestionController.$inject = ['$stateParams', 'suggestions'];
		
	function SuggestionController($stateParams, suggestions) {
		var vm         = this;
		vm.post        = suggestions.posts[$stateParams.suggestionId];
		vm.addComment  = addComment;
		vm.commentText = '';
		vm.upVote      = upVote;
		vm.downVote    = downVote;

		function addComment() {
			var newComment = {
				text: vm.commentText,
				upvotes: 0
			};

			vm.post.comments.push(newComment);
			vm.commentText = '';
		}

		function upVote(comment){
			comment.upvotes++;
		};

		function downVote(comment){
			comment.upvotes--;
		};
	}
})();