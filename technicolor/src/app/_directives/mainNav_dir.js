angular.module('mainNav',[])
.controller('MainNavController', function($scope, StateChangeSvc){
    
    //Example Site -> http://www.hugeinc.com/

	$scope.stateChange = StateChangeSvc;
	$scope.chapterMap  = StateChangeSvc.chapterMap;

	// toggle true or false to open and close the main menu, will also send data back to stateChange service
	$scope.rotate = function () {
        if (!$scope.stateChange.isTechnitriviaOpen){
	       $scope.stateChange.isMenuOpen = StateChangeSvc.isMenuOpen = !$scope.stateChange.isMenuOpen;
        } else {
            $scope.stateChange.isTechnitriviaOpen = StateChangeSvc.isMenuTriviaOpen = !$scope.stateChange.isTechnitriviaOpen;   
        }
	}
    
})
.animation('.mainNavBtn-animation', function (TweenMax) {
    return {
        addClass: function (element, className, done) {
        	if(className == 'rotateNavBtn' || className === 'rotateNavBtnTrivia'){

                TweenMax.killTweensOf($(element));
                TweenMax.killTweensOf($(element).find(".middle"));
                TweenMax.killTweensOf($(element).find(".top"));
                TweenMax.killTweensOf($(element).find(".end"));

        		TweenMax.to($(element).find(".middle"), 0.25, {opacity:0});
        		TweenMax.to($(element), 0.15, {opacity:0});
        		TweenMax.to($(element), 0.15, {opacity:1, delay:0.15});
        		TweenMax.to($(element).find(".top"), 0.20, {rotation:-45, transformOrigin:"right top", delay:0.15});
        		TweenMax.to($(element).find(".end"), 0.20, {rotation:45, transformOrigin:"right bottom", delay:0.15});
               
        	}
        },
        removeClass: function (element, className, done) {
        	if(className == 'rotateNavBtn' || className === 'rotateNavBtnTrivia'){

                TweenMax.killTweensOf($(element));
                TweenMax.killTweensOf($(element).find(".middle"));
                TweenMax.killTweensOf($(element).find(".top"));
                TweenMax.killTweensOf($(element).find(".end"));
                
        		TweenMax.to($(element).find(".middle"), 0.25, {opacity:1, delay:0.25});
        		TweenMax.to($(element), 0.15, {opacity:0});
        		TweenMax.to($(element), 0.15, {opacity:1, delay:0.15});
        		TweenMax.to($(element).find(".top"), 0.25, {rotation:0, transformOrigin:"right top"});
        		TweenMax.to($(element).find(".end"), 0.25, {rotation:0, transformOrigin:"right bottom"});
        	}
        }
    };
})
// .animation('.mainMenu-animation', function (TweenMax) {
.animation('.expandMenu', function (TweenMax) {
    return {
        addClass: function (element, className, done) {
        	TweenMax.to(element, 0.5, {display:"block", opacity: 1});
        	TweenMax.to($(element).find(".chapterNavWrapper"), 0.75, {top:'0px'});
        },
        beforeRemoveClass: function (element, className, done) {
        	TweenMax.to($(element).find(".chapterNavWrapper"), 0.75, {top:'40px'});
        	TweenMax.to(element, 0.5, {
        		opacity: 0, 
        		onComplete: function(){
        			$(element).removeAttr('style');
                    $(element).removeClass('expandMenu');
        			TweenMax.to($(element).find(".chapterNavWrapper"), 0, {top:'-40px'});
        		} 
        	});
        }
    };
})
.animation('.expandMenutrivia', function (TweenMax) {
    return {
        addClass: function (element, className, done) {
            TweenMax.to($('.text-animation'), 0.5, {display:"block", top:'30%'});
            TweenMax.to($('.technitrivia-overlay'), 0.5, {display:"block"});
            $(element).find(".chapterNavWrapper").hide();
        },
        beforeRemoveClass: function (element, className, done) {
            TweenMax.to($('.technitrivia-overlay'), 0.5, {
                opacity: 0, 
                onComplete: function(){
                    $('.text-animation').removeAttr('style');
                    $('.technitrivia-overlay').removeAttr('style');
                    $(element).removeClass('expandMenutrivia');
                    $(element).find(".chapterNavWrapper").show();
                } 
            });
        }
    };
    // rotateNavBtnTrivia
})
.directive('mainNavHamburgerBtn', function(){

	return {
		replace: true,
		templateUrl: 'app/global_partials/mainNavBtn.html',
		controller: 'MainNavController'
	};

})
.directive('mainMenu', function(){

	return {
		replace: true,
		templateUrl: 'app/global_partials/mainMenu.html',
		controller: 'MainNavController'
	};

});//app
