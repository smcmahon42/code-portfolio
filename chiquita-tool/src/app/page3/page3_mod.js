define(['angular'], function (angular) {
	'use strict';
	
	return angular.module('page3Mod', [])

		.config(['$stateProvider', '$analyticsProvider', function($stateProvider, $analyticsProvider) {
			
			$stateProvider.state('p3', {
				url: "/p3",
				templateUrl: "app/page3/page3.tpl.html",
				controller: 'page3Ctrl'
			});

		}])

		.controller('page3Ctrl', ['$rootScope', '$scope', '$state', '$analytics', function($rootScope, $scope, $state, $analytics) {

			$analytics.eventTrack('page loaded', {  category: 'Page Type', label: 'Page 3' });

			$scope.buttonDisplay = {
				'light' : 'Show More',
				'med' : 'Show More',
				'heavy' : 'Show More'
			};

			$scope.showHide = function(el, planType) {
				var $el = $('.'+el).find('ul');
				if( $el.is(":visible") ) {
					$el.slideUp(300);
					$scope.buttonDisplay[el] = 'Show More';
				}else{
					$el.slideDown(300);
					$scope.buttonDisplay[el] = 'Hide';
				}
			};
		  
			$scope.nextPage = function(pagenum){

				if($scope.user.page3.userType !== null){
					$state.go('p'+pagenum);		
				}else{
					alert('Please select a estimate user type.');
				}
				
			};//nextPage	

			$scope.lastPage = function(pagenum){
				$state.go('p'+pagenum);
			};//lastPage

		}]);//app
});