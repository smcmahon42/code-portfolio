angular.module('endMod', [])

.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state('fin', {
		url: "/fin",
		templateUrl: "app/chapter_end/end.tpl.html",
		controller: 'endController'
	});

}])

.controller('endController', function($stateParams, $animate, $rootScope, $scope, $state, $timeout, TrackImgSvc, ResizeBgStaticSvc, ResizeBgSvc, ProgressSvc) {
	
	TweenMax.to($("#preloader"), 0, {opacity: 0, display: 'none'});
	TweenMax.to($("#end .endImage"), 1, {opacity: 1, marginTop: "17%", delay: 0.5});
	TweenMax.to($("#end .text"), 1, {opacity: 1, delay: 0.5});
	TweenMax.to($("#end .restartBtn"), 1, {opacity: 1, marginTop: "2%", delay: 1.5});

});//app
