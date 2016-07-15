( function() {
	var app;
	app = angular.module('toDos', []);

	app.controller('listController', ['$http', function( $http ) {

		var vm         = this;
		vm.todoText    = '';
		vm.listTitle   = 'TODOS Angular App';
		vm.listItems   = [];
		vm.addTodo     = addTodo;
		vm.removeTodo  = removeTodo;
		vm.changeState = changeState;

		if ( !localStorage.getItem('todo-items' ) ) {
			$http.get('js/list.json')
				.success( function( data ){
					setToLocalStorage( data );	

					vm.listItems = getFromLocalStorage();
				})
				.error( function(){
					alert('No TODO!');
				});
		} else {
			vm.listItems = getFromLocalStorage();
		}

		function addTodo() {
			var newTodo = {
				text: vm.todoText,
				isDone: false
			};

			vm.listItems.push(newTodo);
			vm.todoText = ''

			setToLocalStorage(vm.listItems);
		};

		function removeTodo( index ) {
			vm.listItems = getFromLocalStorage();
			vm.listItems.splice(index, 1);
			
			setToLocalStorage( vm.listItems );
		}

		function changeState( index ) {
			vm.listItems = getFromLocalStorage();
			var todo = vm.listItems[index];

			todo.isDone = !todo.isDone;

			setToLocalStorage( vm.listItems );
		};

		function getFromLocalStorage() {
			return JSON.parse(localStorage.getItem('todo-items'));
		};

		function setToLocalStorage( data ) {
			localStorage.setItem( 'todo-items', JSON.stringify( data ) );
		};

	}]);

	app.directive( 'listItem', function() { 
		return {
			restrict: 'E',
			templateUrl: 'js/directives/list-item.html'
		}
	});
	
})();