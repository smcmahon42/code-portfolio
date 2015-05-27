angular.module('errorMod', [])

.config(['$stateProvider', function($stateProvider) {
	
	$stateProvider.state('error', {
		url: "/error",
		templateUrl: "app/error_page/error.tpl.html",
		controller: 'ErrorController'
	});

}])

.controller('ErrorController', ['$rootScope', '$scope', '$state', function($rootScope, $scope, $state) {
  
}]);//app
