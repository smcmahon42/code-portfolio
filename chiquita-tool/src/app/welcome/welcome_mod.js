define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('welcomeMod', [])

		.config(['$stateProvider', '$analyticsProvider', function($stateProvider, $analyticsProvider) {
			
			$stateProvider.state('welcome', {
				url: "/welcome",
				templateUrl: "app/welcome/welcome.tpl.html",
				controller: 'welcomeCtrl'
			});

		}])

		.controller('welcomeCtrl', ['$rootScope', '$scope', '$state', '$analytics', function($rootScope, $scope, $state, $analytics) {
		  
		  	$analytics.eventTrack('page loaded', {  category: 'Page Type', label: 'welcome' });

		  	$scope.rootVal.isfirstPageHit = false;

			$scope.nextPage = function(pagenum){

				if($scope.user.nameFirst === null){
					alert('Please fill out all information to proceed.');
				}else{
					$("#breadCrumbs").css('visibility','visible').hide().fadeIn(300);
					$state.go('p'+pagenum);
				}

			};

		}]);//app
});