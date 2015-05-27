angular.module('colorstoryMod', [])

.config(['$stateProvider', function($stateProvider) {
	
	$stateProvider.state('colorstory', {
		url: "/colorstory/:id",
		templateUrl: "app/chapter_colorstory/colorstory.tpl.html",
		controller: 'colorstoryCtrl',
		resolve: {

			PreloaderSvc : "PreloaderSvc",
			
			loadPage : function(PreloaderSvc){

				var manifest = [
					{ id: 'img1', src: "color-history-page1.jpg" },
					{ id: 'img2', src: "intro-section.svg" },
					{ id: 'img3', src: "color-history-page2.jpg" },
					{ id: 'img4', src: "future-page2.jpg" },
					{ id: 'img5', src: "science-page3.jpg" },
					{ id: 'img6', src: "science-page2-revamp.jpg" },
					{ id: 'img7', src: "color-history-page3.jpg" },
					// { id: 'video1', src: "video/future/Stock_Abstract.mp4" },
					{ id: 'video2', src: "video/light-movement/Light_movement_BG.mp4" }
				];

				var promise = PreloaderSvc.loadData(manifest, "images/color-story/", 'colorstory');
				
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

.controller('colorstoryCtrl', function($stateParams, $rootScope, $scope, $state, $timeout, TrackImgSvc, ResizeBgStaticSvc, ResizeBgSvc, ProgressSvc) {

	//Intialize videos for each section
	//===========================================================================
	var initScienceVideos = function(){

		$rootScope.videos.DPLights = videojs('video-color-story-science');
		$rootScope.videos.DPLights.poster('images/color-story/science-page4.jpg');
		$rootScope.videos.DPLights.src([
			{ type: "video/mp4",  src: "images/color-story/video/dp-lights/DPLights.mp4" },
			{ type: "video/webm", src: "images/color-story/video/dp-lights/DPLights.webm" },
			{ type: "video/ogg",  src: "images/color-story/video/dp-lights/DPLights.ogv" }
		]);
		
		$rootScope.videos.DPLights.load();
		$rootScope.videos.DPLights.on('ended', function() {
			this.currentTime(0);
			$scope.nextPage('down');
			this.trigger('loadstart');
		});

		$rootScope.videos.lightMovement = videojs('video-color-light-movement');
		$rootScope.videos.lightMovement.src([
			{ type: "video/mp4",  src: "images/color-story/video/light-movement/Light_movement_BG.mp4" },
			{ type: "video/webm", src: "images/color-story/video/light-movement/Light_movement_BG.webm" },
			{ type: "video/ogg",  src: "images/color-story/video/light-movement/Light_movement_BG.ogv" }
		]);

		$rootScope.videos.lightMovement.load();
		$rootScope.videos.lightMovement.on('ended', function() {
			this.currentTime(0);
			this.play();
		});

	};

	var initFutureVideos = function(){
		
	// 	$rootScope.videos.stockAbstract = videojs('video-abstract-color');
	// 	$rootScope.videos.stockAbstract.src([
	// 		{ type: "video/mp4",  src: "images/color-story/video/future/Stock_Abstract.mp4" },
	// 		{ type: "video/webm", src: "images/color-story/video/future/Stock_Abstract.webm" },
	// 		{ type: "video/ogg",  src: "images/color-story/video/future/Stock_Abstract.ogv" }
	// 	]);
	// 	$rootScope.videos.stockAbstract.load();
	// 	$rootScope.videos.stockAbstract.on('ended', function() {
	// 		this.currentTime(0);
	// 		this.play();
	// 	});

	};
	
	$scope.chapter = "colorstory";	
	$scope.nextChapter = "innovators";
	$scope.currentSection = $stateParams.id;
	$scope.sections = {
		"colorstory-init" : {
			pages : 1,
			currentPage : 1,
			lastSection : "none",
			nextSection : "colorstory-history",
			initVideos : function(){},
			technitrivia :  [
				{page: 1, trivia : 'The 1936 romance The Trail of the Lonesome Pine was the first "Technicolor 3-strip" color feature.' }
			]			
		},
		"colorstory-history" : {
			pages : 4,
			currentPage : 1,
			lastSection : "colorstory-init",	
			nextSection : "colorstory-science",
			initVideos : function(){},
			technitrivia :  [
				{page: 3, trivia : 'In 1939 there were only 7 Technicolor cameras in existence. And Gone With The Wind producer David O. Selznick used every one of them to cover the pivotal burning of Atlanta sequence' }
			]			
		},
		"colorstory-science" : {
			pages : 5,
			currentPage : 1,
			lastSection : "colorstory-history",
			nextSection : "colorstory-future",
			initVideos : function(){
				initScienceVideos();
			},
			technitrivia :  [
				{ page: 2, trivia : 'Due to the vast amount of lighting required for colors to properly register, temperatures on the Wizard of Oz set often topped 100 degrees during the grueling six-month shoot.' }
			]				
		},
		"colorstory-future" : {
			pages : 3,
			currentPage : 1,
			lastSection : "colorstory-science",
			nextSection : "none",
			initVideos : function(){
				initFutureVideos();
			}
		}		
	};
	
	Direction = {
		Y : 0
	};

	$rootScope.videos = {};

	//Zoom In and Out of the intro page of the Chapter
	//===========================================================================
	var zoomOut = function(){
		if( $scope.currentSection.match(/init/)){
			TweenMax.to($("#" + $scope.currentSection + " .zoomSpan"), 12, {scale:1, ease: Power1.easeInOut, onComplete:zoomIn });
		}else{
			return false;
		}
	};
	var zoomIn = function(){
		if( $scope.currentSection.match(/init/)){
			TweenMax.to($("#" + $scope.currentSection + " .zoomSpan"), 12, {scale:1.10, ease: Power1.easeInOut, onComplete:zoomOut });	
		}else{
			return false;
		}
	};


	//Initial Setup for each section to fade in Section and set progression bar
	//===========================================================================
	var initTl = new TimelineMax();
	initTl.to($("#" + $scope.currentSection + " .p1 .full-bg") , 1, {opacity: 1, display:'block'}, 0)
		  .to($("#" + $scope.currentSection) , 1, {opacity: 1, display:'block'}, 0)
		  .to($("#" + $scope.currentSection + " .bg-containter")  , 1, {display:'block'}, 0)
		  .to($("#" + $scope.currentSection + " .bg-containter")  , 1, {display:'none'}, 0)
		  .to($("#" + $scope.currentSection + " .bg-containter.p1") , 1, {opacity: 1, display:'block'}, 0)
		  .to($("#" + $scope.currentSection + " .p1 .chapterNumber") , 1, {opacity: 1, display:'inline-block'})
		  .to($("#" + $scope.currentSection + " .p1 .chapterTitle") , 1, {opacity: 1, display:'block'}, 1.25)
		  .to($("#" + $scope.currentSection + " .p1 .sectionText") , 1, {opacity: 1, display:'block'}, 1.5)
		  .to($("#" + $scope.currentSection + " .text-shadow.p1"), 4, {backgroundColor: 'rgba(0,0,0,0.5)'}, speed)
		  .call(zoomIn, [], this, 2.5);

	var progressInit = new ProgressSvc.init();
	$scope.sections[$scope.currentSection].initVideos();
	progressInit.init($scope.sections[$scope.currentSection].pages, 1);


	//PageActions object to hold all action animation sequences for each page of each section.
	//===========================================================================
	var PageActions = {};
	
	var speed = 0.85;

	var textShadowSpeed = 2;

	PageActions["colorstory-init"] = function(currentPage, lastPage){
		//no action needed yet since it is just one page
	};

	PageActions["colorstory-history"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);

		var ch1 = new TimelineMax();
		ch1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 0, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 0, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'});

		var ch2 = new TimelineMax();
		ch2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 0, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 0, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .full-bg.p2') , speed, {opacity: 0.75, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.5)'}, speed);

		var ch3 = new TimelineMax();
		ch3.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 0, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 0, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p3') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .full-bg.p3') , speed, {opacity: 0.75, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.5)'}, speed);

		var ch4 = new TimelineMax();
		ch4.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p4') , speed, {opacity: 1, display:'block'}, 0)
			.to($('#'+thisSection+' .full-bg.p4') , speed, {opacity: 0.75, display:'block'});

		var ch5 = new TimelineMax();
		ch5.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p4') , speed, {opacity: 1, display:'block'}, 0);			

		switch(currentPage) {
		    case 1:
		       	ch1.play();
		        break;
		    case 2:
		        ch2.play();
		        break;
		    case 3:
		        ch3.play();
		        break;
		    case 4:
		        ch4.play();
		        break;
		    case 5: 
		    	ch5.play();
		    	break;
		}//end switch

	};

	PageActions["colorstory-science"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);

		var cs1 = new TimelineMax();
		cs1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'});

		var cs2 = new TimelineMax();
		cs2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.5)'}, speed);

		var cs3 = new TimelineMax();
		cs3.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p3') , speed, {opacity: 1, display:'block'}, 1)
			// .to($('#'+thisSection+' .overlaySection') , 1, {opacity: 1}, 2.3)
			.to($('#'+thisSection+' .full-bg.p3') , speed, {opacity: 0.75, display:'block'}, 1)
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.5)'}, speed);

		var cs4 = new TimelineMax();
		cs4.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p4') , speed, {opacity: 1, display:'block'});

		var cs5 = new TimelineMax();
		cs5.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p5') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		//Pause DP Lights video
		if ($rootScope.videos.DPLights != undefined) {
			if ($rootScope.videos.DPLights.paused() === false) {
				$rootScope.videos.DPLights.pause();
			}
		}

		switch(currentPage) {
		    case 1:
		       	cs1.play();
		        break;
		    case 2:
		        cs2.play();
				$rootScope.videos.lightMovement.play();
		        break;
		    case 3:
		        cs3.play();
		        break;
		    case 4:
		        cs4.play();
				$rootScope.videos.DPLights.play();
		        break;
		    case 5:
		        cs5.play();
		        break;
		}//end switch

	};

	PageActions["colorstory-future"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);

		var cs1 = new TimelineMax();
		cs1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'});

		var cs2 = new TimelineMax();
		cs2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var cs3 = new TimelineMax();
		cs3.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p3') , speed, {opacity: 1, display:'block'}, 1)
			.to($('#'+thisSection+' .overlaySection') , speed, {opacity: 1}, 2.3)
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.35)'}, speed);

		//Pause Stock Abstract video
		// if ($rootScope.videos.stockAbstract != undefined) {
		// 	if ($rootScope.videos.stockAbstract.paused() === false) {
		// 		$rootScope.videos.stockAbstract.pause();
		// 	}
		// }

		switch(currentPage) {
		    case 1:
		       	cs1.play();
		        break;
		    case 2:
		        cs2.play();
				// $rootScope.videos.stockAbstract.play();
		        break;
		    case 3:
		        cs3.play();
		        break;
		}//end switch

	};	

	// Dispose of All Video Instances when finished with Section / Chapter
	//==============================================================================
	var disposeVideos = function(){
    	for(videoObj in $rootScope.videos){
	    	if($rootScope.videos[videoObj] !== undefined){
	    		$rootScope.videos[videoObj].dispose();
	    	}
    	}
	};

	// Angular $destroy Action called just before switching to new Section or Chapter
	//==============================================================================
    $scope.$on("$destroy", function() {
    	disposeVideos();
    	$(document).off("keydown");
    	$("#"+$scope.currentSection).off("mousewheel");
    });

	// MouseWheel Event with iscroll
	//==============================================================================
	// We only need one of these since it will be reset
	// once you go to the next section

	$("#"+$scope.currentSection).on('mousewheel', function(event) {
		Direction.Y = event.deltaY;
	});
	var myScrollInit = new IScroll("#"+$scope.currentSection, {
		mouseWheel: true,
		disableMouse: true,
		disablePointer: true,
		disableTouch: true
	});
	myScrollInit.on('scrollStart', function(){
		var position = moveTo($scope.currentSection, [false]);
		if(!position[0]){ return false; }

		var lastPage = position[1];
		var currentPage = position[0];
		//run your animation funciton method
		PageActions[$scope.currentSection](currentPage, lastPage);
	});

	// Keypress Event
	//==============================================================================
	$(document).on("keydown", function(event){
		$scope.nextPage(event.keyCode);
	});

	// Click / Swipe  Event
	//==============================================================================
	//Does the same thing as iScroll Event but with a few changes for an click event
	$scope.nextPage = function(direction){
		//for key press for arrow up and down
		if(!isNaN(direction)){
			if(direction === 38){
				direction = 'up';
			}else if(direction === 40){
				dirction = 'down';
			}else{
				return false;
			}
		}
		// moveTo array argument needs to be an array true and the direction you are going
		// direction will be either 'up' or 'down' that will be set in the ng-click
		// ng-click="clickNext(up)"
		var position = moveTo($scope.currentSection, [true, direction]);
		if(!position[0]){ return false; }

		var lastPage = position[1];
		var currentPage = position[0];
		$timeout(function(){
			PageActions[$scope.currentSection](currentPage, lastPage);
		}, 1000);
	};

	// Resize Background images on demand with Greensock animation
	//==============================================================================
	var resizeTimeOut = null;
	var noResizeVar = false;
	var resizeBg = new ResizeBgSvc.init();
	var resizeStaticBg = new ResizeBgStaticSvc.init();

	window.onresize = function() {
	    clearTimeout(resizeTimeOut);
	    resizeTimeOut = setTimeout(function() {
	    	if($rootScope.deviceType === 'tablet'){ return false; }
	    	resizeBg(false, noResizeVar, false, 3);
	    	resizeStaticBg(false, noResizeVar, false, 3, false);
	    }, 200);
	};

	resizeBg(false, noResizeVar, false, 0.5);
	resizeStaticBg(false, noResizeVar, false, 0.5, false);
	

	

	// Track Image with Mouse
	//==============================================================================
	// parent -> .track-container
	// child  -> .track-image
	var TrackImagePosition = new TrackImgSvc.init();

	$(".track-container").each(function(){

		if($(this).find(".track-image").hasClass("static-bg")){
			//Install instance of static resize
			var track = new TrackImagePosition({
				thisInstance : $(this), 
				resizeInstance : resizeStaticBg, 
				isStatic : true
			});
		}else{
			//Install instance of normal resize
			var track = new TrackImagePosition({
				thisInstance : $(this), 
				resizeInstance : resizeBg, 
				isStatic : false
			});
		}
		
		track.run();
	});

	// Scroll handler
	//==============================================================================
	//moveTo("empower-init", [true, up])
	//use [true, up/down] if a click event, if a scroll event use [false]
	//returns array of [false] if at the begining of chapter or array [new page, prev page]
	var moveTo = function(section, click){

		var isDown;
		var prevPage = $scope.sections[section].currentPage;

		if(!click[0]){
			isDown = Direction.Y < 0 ? true : false;
		}else{
			isDown = click[1] == "up" ? false : true;
		}

		//stop if at begining
		// if(sectionArray[1] === "init" && !isDown){ return [false]; }
		// if($scope.sections[section].currentPage <= 1 && !isDown){ return [false]; }
		//stop if at technitrivia
		if($scope.stateChange.isTechnitriviaOpen){ return [false]; }		

		//if at begining stop and go to next section
		if($scope.sections[section].currentPage == 1 && !isDown){
			if($scope.sections[section].lastSection == "none"){
				return [false];
			}else{
				//Go to last Section
				$state.go($scope.chapter, {id: $scope.sections[section].lastSection});
			}
		}

		//if at end stop and go to next section
		if($scope.sections[section].currentPage == $scope.sections[section].pages && isDown){
			if($scope.sections[section].nextSection == "none"){
				//Go to next Chapter

				TweenMax.to($("#"+$scope.chapter), 0.25, {opacity: 0, display: 'none', onComplete:function(){
					$state.go($scope.nextChapter, {id: $scope.nextChapter+"-init"});
				}});

			}else{
				//Go to next Section
				$state.go($scope.chapter, {id: $scope.sections[section].nextSection});
			}
		}

		//not at end or begining then interate to next section
		if(isDown){
			$scope.sections[section].currentPage++;
		}else{
			$scope.sections[section].currentPage--;
		}
		//change progress bar position
		progressInit.init($scope.sections[$scope.currentSection].pages, $scope.sections[section].currentPage);
		//return page positions in an array of new postion and previous postion
		return [$scope.sections[section].currentPage, prevPage];
	};


	// Scale Text for Section
	//==============================================================================
	// If you need to repsonsively scale text use a .scaleText class on the parent element.
    var setBodyScale = function() {
    	$('.scaleText').each(function(){

	    	var $empAnime = $(this); //Cache this for performance
	        var scaleSource = $(window).width(),
	            scaleFactor = 0.35,
	            maxScale = 600,
	            minScale = 30; //Tweak these values to taste

	        var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:

	        if (fontSize > maxScale) fontSize = maxScale;
	        if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums

	        $empAnime.css('font-size', fontSize + '%');

    	});
    };

    $(window).resize(function(){
        setBodyScale();
    });

    //Fire it when the page first loads:
    setBodyScale();


});//app
