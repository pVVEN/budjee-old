/*function (){
	
}*/


/*
Angular test stuff
*/
angular.module('angularTestApp', [])
	.controller('AngularTestController', function($scope)
	{
		$scope.todos = [{
			text: "Learn AngularJS"
		}];

		$scope.addTodo = function(todoText)
		{
			var todo = {
				text: todoText
			};

			$scope.todos.push(todo);
		}

		$scope.removeTodo = function(index)
		{
			$scope.todos.splice(index, 1);
		}
	});

