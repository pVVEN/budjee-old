document.addEventListener("deviceready", function() {
	// retrieve the DOM element that had the ng-app attribute
	var domElement = document.getElementById("deviceready");
	angular.bootstrap(domElement, ["app_Budjee"]);
}, false);

/******

Storage object....

currentAmount
transactions
	title
	type
	date
	time
	amount
	desc

read dates as 01/01/2015
or (asterisk)/01/2015 where the * indicates an infinitely recurring value
or x#/01/2015 where x indicates it recurres a certain number (#) of times

recurring options:
one-time
daily
weekly
bi-weekly
monthly
yearly

textbox "for [] times (leave as 0 if infinite)"

*******/

angular.module('app_Budjee', 
	['ngRoute', 
	'ngTouch',
	'ngStorage'])
	.config(function($routeProvider){
		$routeProvider
			.when('/about', {templateUrl: 'partials/p_about.html', controller: 'c_About'})
			.when('/calendar', {templateUrl: 'partials/p_calendar.html', controller: 'c_Calendar'})
			.when('/transactions', {templateUrl: 'partials/p_transactions.html', controller: 'c_Transactions'})
			.when('/settings', {templateUrl: 'partials/p_settings.html', controller: 'c_Settings'})
			.otherwise({redirectTo: '/home', templateUrl: 'partials/p_home.html', controller: 'c_Home'});
	})

	/****
	SERVICES
	*****/

	.service('s_Transactions', function(){
		return {};
	})



	/****
	CONTROLLERS
	*****/
	.controller('c_Main', function($scope, $location, $localStorage, $sessionStorage, s_Transactions){
		$scope.greetMe = 'World';

		//set defaults here
		//read from localstorage here

	    $scope.transactionsService = s_Transactions;
	    $scope.transactionsService.transactions = [
			{
				title: "Rent",
				date: "01/14/2015",
				time: "7:00",
				amount: "754.31",
				type: "-",
				desc: "Rent for the month"
			},
			{
				title: "Car insurance",
				date: "01/12/2015",
				time: "9:12",
				amount: "120.21",
				type: "-",
				desc: "Monthly car insurance payment"
			},
			{
				title: "Car payment",
				date: "01/11/2015",
				time: "8:00",
				amount: "169.51",
				type: "-",
				desc: "First half of payment"
			},
			{
				title: "Paycheck",
				date: "01/03/2015",
				time: "23:59",
				amount: "1234.56",
				type: "+",
				desc: "Pay day!!"
			},
			{
				title: "Phone bill",
				date: "01/01/2015",
				time: "8:00",
				amount: "169.99",
				type: "-",
				desc: "Payment for T-Mobile"
			}
		];

		$scope.setRoute = function(route)
		{
			$location.path(route);
		}

		$scope.isActive = function (viewLocation)
		{
			return viewLocation === $location.path();
	    };
	})
	.controller('c_Home', function($scope, $localStorage){
		$scope.title = "Home Page";
		$scope.body = "This is the home body.";

		$scope.amtAvailable = "300.00";
		$scope.amtNextAvailable = "0";
		$scope.amtAvailableColor = "color-green";
		$scope.amtNextAvailableColor = "";

		$scope.scheduledPayment = $scope.transactionsService.transactions[$scope.transactionsService.transactions.length-1];

		if($scope.scheduledPayment.type == "-")
		{
			$scope.amtNextAvailable = +($scope.amtAvailable) - +($scope.scheduledPayment.amount);
		}else if($scope.scheduledPayment.type == "+"){
			$scope.amtNextAvailable = +($scope.amtAvailable) + +($scope.scheduledPayment.amount);
		}
		
		if($scope.amtNextAvailable > 0)
		{
			$scope.amtNextAvailableColor = "color-green";
		}else{
			$scope.amtNextAvailableColor = "color-red";
		}

		$scope.formData = {
			title: "",
			date: "",
			time: "",
			amount: "",
			type: "",
			desc: ""
		};
		$scope.submit = function(){
			if($scope.quTitle != "")
			{
				$scope.formData.title = $scope.quTitle;
			}

			if($scope.quDate == "today")
			{
				$scope.formData.date = "01/01/2015";
			}else{
				if($scope.quDateSpecifiedText != "")
				{
					$scope.formData.date = $scope.quDateSpecifiedText;
				}
			}

			if($scope.quTime == "now")
			{
				$scope.formData.time = "11:59";
			}else{
				if($scope.quTimeSpecifiedText != "")
				{
					$scope.formData.time = $scope.quTimeSpecifiedText;
				}
			}

			if($scope.quAmount != "")
			{
				$scope.formData.amount = $scope.quAmount;
			}

			if($scope.quType == "d")
			{
				$scope.formData.type = "+";
			}else if($scope.quType == "w"){
				$scope.formData.type = "-";
			}

			if($scope.quDesc != "")
			{
				$scope.formData.desc = $scope.quDesc;
			}
		}
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

		//$scope.transactions = ;
	})
	.controller('c_Settings', function($scope){
		$scope.title = "Settings Page";
		$scope.body = "This is the settings body.";
	});