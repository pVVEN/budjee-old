document.addEventListener("deviceready", function() {
	// retrieve the DOM element that had the ng-app attribute
	var domElement = document.getElementById("deviceready");
	angular.bootstrap(domElement, ["app_Budjee"]);
}, false);

angular.module('app_Budjee', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider
			.when('/about', {templateUrl: 'partials/p_about.html', controller: 'c_About'})
			.when('/calendar', {templateUrl: 'partials/p_calendar.html', controller: 'c_Calendar'})
			.when('/transactions', {templateUrl: 'partials/p_transactions.html', controller: 'c_Transactions'})
			.otherwise({redirectTo: '/home', templateUrl: 'partials/p_home.html', controller: 'c_Home'});
	})
	.controller('c_Main', function($scope){
		$scope.greetMe = 'World';

		$scope.setRoute = function(route)
		{
			$location.path(route);
		}
	})
	.controller('c_Home', function($scope){
		$scope.title = "Home Page";
		$scope.body = "This is the home body.";


	})
	.controller('c_About', function($scope){
		$scope.title = "About Page";
		$scope.body = "This is the about body.";

		
	})
	.controller('c_Calendar', function($scope){
		$scope.title = "Calendar Page";
		$scope.body = "This is the calendar body.";

		
	})
	.controller('c_Transactions', function($scope){
		$scope.title = "Transactions Page";
		$scope.body = "This is the transactions body.";

		
	});