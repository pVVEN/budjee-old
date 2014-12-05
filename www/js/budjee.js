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
	'ngStorage',
	'ui.bootstrap'])
	.config(function($routeProvider){
		$routeProvider
			.when('/calendar', {templateUrl: 'partials/p_calendar.html', controller: 'c_Calendar'})
			.when('/transactions', {templateUrl: 'partials/p_transactions.html', controller: 'c_Transactions'})
			.when('/settings', {templateUrl: 'partials/p_settings.html', controller: 'c_Settings'})
			.when('/about', {templateUrl: 'partials/p_about.html', controller: 'c_About'})
			.otherwise({redirectTo: '/home', templateUrl: 'partials/p_home.html', controller: 'c_Home'});
	})

	/****
	SERVICES
	*****/

	.service('s_Transactions', function(){
		return {};
	})

	.service('s_TimeTranslator', function(){
		this.getDate = function(dateTime){
			var dt = new Date(dateTime);
			return dt.toLocaleDateString();
		};

		this.getTime = function(dateTime){
			var dt = new Date(dateTime);
			return dt.toLocaleTimeString();
		};
	})

	/****
	CONTROLLERS
	*****/
	.controller('c_Main', function(
			$scope, 
			$location, 
			$localStorage, 
			$sessionStorage, 
			s_Transactions,
			s_TimeTranslator
		){
		$scope.greetMe = 'World';

		//set defaults here
		//read from localstorage here

	    $scope.transactionsService = s_Transactions;
	    $scope.transactionsService.transactions = [
			{
				title: "Rent",
				dateTime: "2014-01-26T13:00:00.312Z",
				amount: "754.31",
				type: "-",
				desc: "Rent for the month"
			},
			{
				title: "Car insurance",
				dateTime: "2014-01-26T15:00:00.312Z",
				amount: "120.21",
				type: "-",
				desc: "Monthly car insurance payment"
			},
			{
				title: "Car payment",
				dateTime: "2014-01-26T08:03:00.312Z",
				amount: "169.51",
				type: "-",
				desc: "First half of payment"
			},
			{
				title: "Paycheck",
				dateTime: "2014-01-26T08:13:00.312Z",
				amount: "1234.56",
				type: "+",
				desc: "Pay day!!"
			},
			{
				title: "Phone bill",
				dateTime: "2014-01-27T13:00:00.312Z",
				amount: "169.99",
				type: "-",
				desc: "Payment for T-Mobile"
			}
		];
		$scope.timeTranslatorService = s_TimeTranslator;

		$scope.setRoute = function(route)
		{
			$location.path(route);
		}

		$scope.isActive = function (viewLocation)
		{
			return viewLocation === $location.path();
	    };
	})
	.controller('c_Home', function($scope, $localStorage, $filter){
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
			dateTime: "",
			amount: "",
			type: "",
			desc: ""
		};
		$scope.quType = "w";
		$scope.dateOptions = {
			showWeeks: false,
			showButtonBar: false
		};
		$scope.today = function() {
			$scope.quDatePicker = new Date();
		};
		$scope.today();
		var d = new Date();
		d.setHours( 8 );
		d.setMinutes( 0 );
		$scope.quTimePicker = d;
		$scope.setNow = function($event) {
			$scope.quTimePicker = new Date();
		};
		$scope.submit = function(){
			if($scope.quTitle != "")
			{
				$scope.formData.title = $scope.quTitle;
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

			var tempDateTime = new Date();
			tempDateTime.setMonth($scope.quDatePicker.getMonth());
			tempDateTime.setDate($scope.quDatePicker.getDate());
			tempDateTime.setFullYear($scope.quDatePicker.getFullYear());
			tempDateTime.setHours($scope.quTimePicker.getHours());
			tempDateTime.setMinutes($scope.quTimePicker.getMinutes());
			tempDateTime.setSeconds(0);
			$scope.formData.dateTime = tempDateTime;

			if($scope.quDesc != "")
			{
				$scope.formData.desc = $scope.quDesc;
			}

			$scope.transactionsService.transactions.push($scope.formData);
		}
	})
	.controller('c_Calendar', function($scope){
	})
	.controller('c_Transactions', function($scope){
		$scope.tempTransactions = $scope.transactionsService.transactions;
		//$scope.getDate = $scope.timeTranslatorService.getDate();
		//$scope.getTime = $scope.timeTranslatorService.getTime();

		$scope.sortAscending = function(){
			$scope.tempTransactions.sort(function(x, y){
				date1 = new Date(x.dateTime);
				date2 = new Date(y.dateTime);
				return date1 - date2;
			});
		};

		$scope.sortDescending = function(){
			$scope.tempTransactions.sort(function(x, y){
				date1 = new Date(x.dateTime);
				date2 = new Date(y.dateTime);
				return date2 - date1;
			});
		};

		$scope.sortAscending();
	})
	.controller('c_Settings', function($scope){
	})
	.controller('c_About', function($scope){ });