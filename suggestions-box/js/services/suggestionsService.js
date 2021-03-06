(function() {
	'use_strict';

	angular
		.module('SuggestionsService')
		.factory('suggestions', SuggestionsService);

	function SuggestionsService() {
		var demoSuggestions = {
			posts: [
				{
					title: 'Retrofit water fountain with Gatorade',
					upvotes: 7,
					comments: []
				},
				{
					title: 'Free pizza at club meetings',
					upvotes: 15,
					comments: []
				},
				{
					title: 'End all club emails with Laffy Taffy jokes',
					upvotes: 9,
					comments: []
				},
				{
					title: 'Sing Bon Jovi\'s "Living on a Prayer" halfway through meetings',
					upvotes: 3,
					comments: []
				}
			]
		};
		
		return demoSuggestions;
	}
})();