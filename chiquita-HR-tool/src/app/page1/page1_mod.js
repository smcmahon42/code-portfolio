define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('page1Mod', [])

		.config(['$stateProvider', '$analyticsProvider', function($stateProvider, $analyticsProvider) {
			
			$stateProvider.state('p1', {
				url: "/p1",
				templateUrl: "app/page1/page1.tpl.html",
				controller: 'page1Ctrl'
			});

		}])

		.controller('page1Ctrl', ['$rootScope', '$scope', '$state', '$analytics', function($rootScope, $scope, $state, $analytics) {

			$analytics.eventTrack('page loaded', {  category: 'Page Type', label: 'Page 1' });

			$scope.nextPage = function(pagenum){
				$state.go('p'+pagenum);				
			};//nextPage	

			$scope.lastPage = function(pagenum){
				$state.go('p'+pagenum);
			};//lastPage	

		}]);//app
});