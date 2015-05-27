angular.module('introMod', [])

.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state('intro', {
		url: "/intro",
		templateUrl: "app/chapter_intro/intro.tpl.html",
		controller: 'IntroController',
		resolve: {

			PreloaderSvc : "PreloaderSvc",
			
			loadPage : function(PreloaderSvc){

				var manifest = [
					{ id: 'img1', src: "the-wizard-of-oz.jpg" },
					{ id: 'img2', src: "blur-the-wizard-of-oz.jpg" },
					{ id: 'img3', src: "intro-animation1.svg" },
					{ id: 'img4', src: "intro-animation2.svg" },
					{ id: 'img5', src: "armstrongs-walk-landing.jpg" },
					{ id: 'img6', src: "blur-armstrongs-walk-landing.jpg" }
				];

				var promise = PreloaderSvc.loadData(manifest, "images/intro/", 'intro');
				
				promise.then(function(status) { //success
				   //console.log(status);
				}, function(status) { //error
				   //console.log(status); 
				}, function(status) { //notify
				   //console.log(status);
				});

				return promise; 

			}//loadPage

		}//reslove
	});

}])

.controller('IntroController', function($kookies, $rootScope, $state, $scope, $timeout, ProgressSvc, TweenMax, ResizeBgStaticSvc, TrackImgSvc) {


	//Intialize videos for each section
	//===========================================================================
	$rootScope.videos = {};

	var initIntroMusic = function(){
		var fired = 0;
		$rootScope.videos.introMusic = videojs('audio-intro-music');
		$rootScope.videos.introMusic.src([
			{ type: "audio/mpeg",  src: "video/intro/IntroTech.mp3" }
		]);
		$rootScope.videos.introMusic.load();
	};

	initIntroMusic();
	
	// Dispose of All Video Instances when finished with Section / Chapter
	//==============================================================================
	var disposeVideos = function(){
    	for(videoObj in $rootScope.videos){
	    	if($rootScope.videos[videoObj] !== undefined){
	    		$rootScope.videos[videoObj].dispose();
	    	}
    	}
	};

	// Resize Background images on demand with Greensock animation
	//==============================================================================
	//Resize http://jsfiddle.net/mblase75/fq882/197/
	var resizeTimeOut = null;
	var noResizeVar = false;
	var resizeStaticBg = new ResizeBgStaticSvc.init();

	window.onresize = function() {
	    clearTimeout(resizeTimeOut);
	    resizeTimeOut = setTimeout(function() {
	    	resizeStaticBg(false, noResizeVar, false, 0.5, false);
	    }, 200);
	};
	resizeStaticBg(true, false, "intro1", 0.5, false);

	$timeout(function(){
		noResizeVar = true;
	}, 3000);


	// Progress Bar
	//==============================================================================
	var progressInit = new ProgressSvc.init();
	progressInit.init(1, 1);

	// Redirect Function
	//==============================================================================

	var redirectTo = function(){
		$(".mainNavBtn-animation").fadeIn(200);
		$state.go("empower", {id: "empower-init"});
	};

	$scope.redirectInit = function(){
		TweenMax.to(("#intro"), 1, {opacity:0, onComplete: redirectTo});
	};

	// GreenSock animations for intro
	//==============================================================================
	$(".mainNavBtn-animation").fadeOut(200);

	var tl1 = new TimelineMax();
	var tl2 = new TimelineMax({paused: true});
	var tl3 = new TimelineMax({paused: true});
	var tl4 = new TimelineMax({paused: true});
	var tl5 = new TimelineMax({paused: true});
	var tl6 = new TimelineMax({paused: true});
	var tl7 = new TimelineMax({paused: true});
	var tl8 = new TimelineMax({paused: true});
	var tl9 = new TimelineMax({paused: true});


    //Cookie watch for howto button if how to cookie undefined then pause intro animation
    $rootScope.$watch(function(scope){
        if(scope.howToBtn){
	    	tl1.pause();
        }else{
        	tl1.play();
        }
    });
	
	//Intro section 1
	tl1.delay(0);
	tl1.to($("#intro1"), 0, {opacity:1}); //open intro1 opacity
	tl1.to($("#intro"), 3, {opacity:1}); //5 sec

	tl1.to($("#intro1").find("img"), 4.25, { scale: 2.1, yPercent:'-25', xPercent:'-23'}, 1); //start 4 sec
	tl1.to($("#intro1").find("img"), 2, {rotation:100}, 2.5); //start 9.25 sec
	tl1.to($("#intro1").find(".past-text"), 2, {opacity:1}, 1.25); //start 8.25 sec
	tl1.to($("#intro1").find(".future-text"), 2, {x:'140', opacity:1}, 2.5);
	tl1.to($("#intro2"), 0, {opacity:1, display: 'block'}, 1); //start 8.25 sec  / open intro2 opacity-display
	tl1.to($("#intro1").find("img"), 2, {opacity:0}, 4);
	tl1.to($("#intro1"), 1, {backgroundColor:"rgba(47,187,234,0)"}, 4.25);
	tl1.call(function(){ 
		tl2.play();
		$rootScope.videos.introMusic.play();
	}, [], this,  5);
	
	//Intro section 2
	tl2.to($("#intro3"), 0, {opacity:1, display: 'block'}); //open intro3 opacity-display
	tl2.to($("#intro1 > .text-containter"), 1.5, {opacity:0}, 0.5);
	tl2.to($("#intro2"), 2, {opacity:0}, 0.5);
	tl2.call(function(){ tl3.play(); }, [], this,  1);
	
	//Intro section 3
	tl3.to($("#intro3 > .zoomSpan"), 16, {scale:1.35}, 0);
	tl3.to($("#intro3 > .text"), 2, {opacity:1}, 1);
	tl3.to($("#intro4"), 0, {opacity:1, display: 'block'}, 3); //open intro4 opacity-display
	tl3.to($("#intro3 > .text"), 2, {opacity:0}, 4);
	tl3.to($("#blurIntro3"), 1, {opacity:1}, 5);
	tl3.to($("#intro3"), 5, {opacity:0}, 5.5);
	tl3.call(function(){ tl4.play(); }, [], this,  4);

	//Intro section 4
	tl4.to($("#intro4 > .zoomSpan"), 20, {scale:1.35, xPercent:'-15', yPercent:'14'}, 0);
	tl4.to($("#intro4 > .text"), 4, {opacity:1}, 1.5);
	tl4.to($("#intro5"), 0, {opacity:1, display: 'block'}, 3); //open intro5 opacity-display
	tl4.to($("#intro4 > .text"), 2, {opacity:0},  4);
	tl4.to($("#blurIntro4"), 3, {opacity:1}, 5);
	tl4.to($("#intro4"), 4, {opacity:0}, 5.5);
	tl4.call(function(){ tl5.play(); }, [], this,  4);

	//Intro section 5
	tl5.to($("#intro5 > .zoomSpan"), 20, {scale:1.35}, 0);
	tl5.to($("#intro5 > .text"), 4, {opacity:1}, 1.5);
	tl5.to($("#intro6"), 0, {opacity:1, display: 'block'}, 3); //open intro5 opacity-display
	tl5.to($("#intro5 > .text"), 2, {opacity:0}, 4);
	tl5.to($("#blurIntro5"), 3, {opacity:1}, 5);
	tl5.to($("#intro5"), 4, {opacity:0}, 5.5);
	tl5.call(function(){ tl6.play(); }, [], this,  5);

	//Intro section 6
	tl6.to($("#intro6 > .zoomSpan"), 20, {scale:1.35, xPercent:'15', yPercent:'-14'}, 0);
	tl6.to($("#intro6 > .text1"), 2, {opacity:1}, 2);
	tl6.to($("#blurIntro6"), 2, {opacity:1}, 4);
	tl6.to($("#intro6 > .text1"), 1, {opacity:0}, 4);
	tl6.to($("#intro6 > .text2"), 2, {opacity:1}, 5);
	tl6.to($("#intro6 > .text2"), 2, {opacity:0}, 9);
	tl6.to($("#intro6"), 2, {opacity:0}, 9);
	tl6.call(function(){ tl7.play(); }, [], this,  9.35);

	//Intro section 7
	tl7.to($("#intro7"), 1, {opacity:1}, 0);
	tl7.to($("#intro7 > .text"), 0, {opacity:1}, 1);
	tl7.to($("#intro7"), 1, {opacity:0}, 2.5);
	tl7.call(function(){ tl8.play(); }, [], this,  2.5);

	//Intro section 8
	tl8.to($("#intro8"), 1, {opacity:1}, 0);
	tl8.to($("#intro8 > .text"), 0, {opacity:1}, 1);
	tl8.to($("#intro8"), 1, {opacity:0}, 2.5);
	tl8.call(function(){ tl9.play(); }, [], this,  2.5);

	//Intro section 9
	tl9.to($("#intro9 > .text"), 0, {opacity:1}, 0);
	tl9.to($("#intro9"), 2, {opacity:1}, 1);
	tl9.to($("#intro9"), 2, {opacity:0}, 3);

	//Fadeout Intro and redirect to Empowerment Section
	tl9.to($("#intro"), 4, {opacity:0}, 3);
	tl9.call(function(){
		if($state.current.controller === "IntroController"){
			redirectTo();
		}
	}, [], this, "+=1.2");

	// Angular $destroy Action called just before switching to new Section or Chapter
	//==============================================================================
    $scope.$on("$destroy", function() {
    	disposeVideos();
    	$(document).off("keydown");
    	$(".introScroll").off("click");
    	$("#intro").off('mousewheel');
    });

	//Redirect to new page on Click, Tap, and Scroll mouseWheel - using iScroll5
	//Redirect Click
	$scope.skipIntro = function(){
		$scope.redirectInit();
	};

	// //Redirect MouseWheel
	var myScrollInit = new IScroll("#intro", {
		mouseWheel: true,
		disableMouse: true,
		disablePointer: true,
		disableTouch: true
	});
	myScrollInit.on('scrollStart', function(){
		$scope.redirectInit();
	});

});//app
