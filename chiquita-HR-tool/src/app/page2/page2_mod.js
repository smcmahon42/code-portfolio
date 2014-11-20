define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('page2Mod', [])

		.config(['$stateProvider', '$analyticsProvider', function($stateProvider, $analyticsProvider) {
			
			$stateProvider.state('p2', {
				url: "/p2",
				templateUrl: "app/page2/page2.tpl.html",
				controller: 'page2Ctrl'
			});

		}])

		.controller('page2Ctrl', ['$rootScope', '$scope', '$state', '$analytics', function($rootScope, $scope, $state, $analytics) {

			$analytics.eventTrack('page loaded', {  category: 'Page Type', label: 'Page 2' });

		  	$scope.pTypes = [
		  	{ "type" : "single", "plan" : "Single" },
		  	{ "type" : "employee-children", "plan" : "Employee + Child(ren)" },
		  	{ "type" : "employee-spouse", "plan" : "Employee + Spouse" },
		  	{ "type" : "employee-family", "plan" : "Employee + Family" }
		  	];

		  	$scope.getAssocType = function(assocType){
		  		return assocType.plan;
		  	};


		  	$scope.checkQuestion = function(){
		  		if($scope.user.page2.cdhpEnroll === "false"){
		  			$scope.user.page2.hraBal = 0;
		  		}
		  	};

			$scope.checkAmount = function(){
				if($scope.user.page2.hraBal === null || isNaN($scope.user.page2.hraBal) ){
					$('#hraBal').addClass('error');
					$('#hraBal').val('');
				}else{
					$('#hraBal').removeClass('error');
				}
			};

			$scope.nextPage = function(pagenum){
				
				$scope.checkAmount();

				for( var prop in $scope.user.page2 ){
					if($scope.user.page2[prop] === null){
						alert('Please fill out all information to proceed.');
						return false;
					}
				}

				$state.go('p'+pagenum);		
			};//nextPage	

			$scope.lastPage = function(pagenum){
				$state.go('p'+pagenum);
			};


		}]);//app
});