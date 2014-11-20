define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('page4Mod', [])

		.config(['$stateProvider', '$analyticsProvider', function($stateProvider, $analyticsProvider) {
			
			$stateProvider.state('p4', {
				url: "/p4",
				templateUrl: "app/page4/page4.tpl.html",
				controller: 'page4Ctrl'
			});

		}])

		.controller('page4Ctrl', ['$rootScope', '$scope', '$location', '$state', '$analytics', function($rootScope, $scope, $location, $state, $analytics) {

			$analytics.eventTrack('page loaded', {  category: 'Page Type', label: 'Page 4' });

			$scope.calc = {
				'cdhp' : {
					'healthcareLevelUse' : 0,
					'hsaFund' : 0,
					'oopCareCost' : 0,
					'annualPayCont' : 0,
					'spouseCharge' : 0,
					'oopCost' : 0,
					'remainingBalance' : 0
				},
				'ppo' : {
					'healthcareLevelUse' : 0,
					'hsaFund' : 0,
					'oopCareCost' : 0,
					'annualPayCont' : 0,
					'spouseCharge' : 0,
					'oopCost' : 0,
					'remainingBalance' : 0
				},
			};


			$scope.calculations = function(calcType){

				var pType = $scope.user.page2.planType,
					uType = $scope.user.page3.userType,
					planOptObj = $scope.planOptions[calcType][pType];

				//Get Healthcare cost based on selected level of use
				$scope.calc[calcType].healthcareLevelUse 	= planOptObj['cost-use'][uType];

				//Get HSA Fund
				if(calcType === 'cdhp'){
					$scope.calc[calcType].hsaFund 	= planOptObj['employer-hsa'][uType] + Number($scope.user.page2.hraBal);	
				}else{
					$scope.calc[calcType].hsaFund 	= 0;
				}
				
				if($scope.calc[calcType].hsaFund > planOptObj['cost-use'][uType]){
					$scope.calc[calcType].oopCareCost 		= 0;
					$scope.calc[calcType].remainingBalance	= Math.abs( planOptObj['cost-use'][uType] - $scope.calc[calcType].hsaFund );
				}else{
					$scope.calc[calcType].oopCareCost		= Math.abs( planOptObj['cost-use'][uType] - $scope.calc[calcType].hsaFund );
					$scope.calc[calcType].remainingBalance	= 0;
				}

				//spouse charge 
				if( (pType === 'employee-family' || pType === 'employee-spouse') && $scope.user.page2.partnerHasCoverage == "true"){
					$scope.calc[calcType].spouseCharge = planOptObj.spouse;
				}

				$scope.calc[calcType].annualPayCont = planOptObj['annual-paycheck'][uType];
				$scope.calc[calcType].oopCost 		= $scope.calc[calcType].spouseCharge + $scope.calc[calcType].oopCareCost + $scope.calc[calcType].annualPayCont;

			};

		  	$scope.newWindow = function(){
		  		var hrefLocation = $location.host() + '/final.html';
		  		window.open('final.html?name='+$scope.user.nameFirst, 'mywin', 'left=0,top=0,width=1040,height=930,toolbar=0,resizable=1'); 
		  		return false;
		  	};

			$scope.nextPage = function(pagenum){
				$state.go('p'+pagenum);
			};

			$scope.lastPage = function(pagenum){
				$state.go('p'+pagenum);
			};

			$scope.calculations('cdhp');
			$scope.calculations('ppo');

		}]);//app
});