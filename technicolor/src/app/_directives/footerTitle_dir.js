angular.module('footerTitle',[])
.controller('FooterTitleController',  function($rootScope, $scope, $timeout, StateChangeSvc, TweenMax){

	$scope.footerData = {
		titleHide : false,
		title : '',
		imageName : 'intro'
	};

	$scope.showinfoButton = false;

	var swapTitleVal = function(){
		$scope.footerData.titleHide = !$scope.footerData.titleHide;
	};

	var getTitle = function(){
		$scope.footerData.title = StateChangeSvc.chapterMsg.section == "" || StateChangeSvc.chapterMsg.section == undefined ? "" : "<span class='"+StateChangeSvc.uiState.toChapter+"'>" + StateChangeSvc.chapterMsg.section + " /</span> ";
		$scope.footerData.title += StateChangeSvc.chapterMsg.chapter == "" ? "" : " " + StateChangeSvc.chapterMsg.chapter;
		$scope.footerData.imageName = StateChangeSvc.uiState.toChapter == "" ? "intro" : StateChangeSvc.uiState.toChapter;
	};

	$rootScope.$on('$stateChangeStart', function(){
		swapTitleVal();
		$timeout( function(){
			getTitle();
			swapTitleVal();
		}, 900 );
	});

	$rootScope.$watch(function(scope){
	    if(scope.howToBtn){
	        $scope.showinfoButton = false;
	    }else{
	        $scope.showinfoButton = true;
	    }
	});

	getTitle();

	//volume global actions
	$rootScope.volumeActive = true;

	$scope.volumeAction = function() {
		$rootScope.volumeActive = !$rootScope.volumeActive;
		$rootScope.volumeController();
		
	};

	$rootScope.volumeController = function() {
		if ($rootScope.volumeActive === true) {
			for (video in $rootScope.videos) {
				$rootScope.videos[video].volume(1);
			}
		}
		else {
			for (video in $rootScope.videos) {
				$rootScope.videos[video].volume(0);
			}
		}
	};

	$scope.openCloseHowTo = function(){
		$rootScope.howToBtn = !$rootScope.howToBtn;	
	};

})
.animation('.footerLogo-animation', function() {
    return {
        addClass: function (element, className, done) {
        	TweenMax.to($(element), 1, {opacity:0});
        },
        removeClass: function (element, className, done) {
        	TweenMax.to($(element), 1, {opacity:1});
        }
    };
})
.animation('.footerTitle-animation', function() {
    return {
        addClass: function (element, className, done) {
        	TweenMax.to($(element), 1, {opacity:0, right:'75px'});
        	TweenMax.to($(element), 0, {opacity:0, right:'50px', delay:1});
        	TweenMax.to($(element), 1, {opacity:1, right:'75px', delay:1.15});
        }
    };
})
.directive('footerTitle', function(){

	return {
		replace: true,
		templateUrl: 'app/global_partials/footerTitle.html',
		controller: 'FooterTitleController'
	};

});//app
