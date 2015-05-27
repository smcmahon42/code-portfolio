angular.module('innovatorsMod', [])

.config(['$stateProvider', function($stateProvider, $timeout) {

	$stateProvider.state('innovators', {
		url: "/innovators/:id",
		templateUrl: "app/chapter_innovators/innovators.tpl.html",
		controller: 'InnovatorsController',
		resolve: {

			PreloaderSvc : "PreloaderSvc",

			loadPage : function(PreloaderSvc){

				var manifest = [
					{ id: 'img1', src: "intro.jpg" },
					{ id: 'img2', src: "intro-section.svg" },
					{ id: 'img3', src: "three-core-areas-intro.jpg" },
					{ id: 'img4', src: "standard-page2.jpg" },
					{ id: 'img5', src: "tech-licensing.jpg" }
				];

				var promise = PreloaderSvc.loadData(manifest, "images/innovators/", 'innovators');

				promise.then(function(status) { //success
				}, function(status) { //error
				}, function(status) { //notify
				});

				return promise;

			}//loadPage
		}//reslove
	});

}])

.controller('InnovatorsController', function($stateParams, $rootScope, $scope, $state, $timeout, TrackImgSvc, ResizeBgStaticSvc, ResizeBgSvc, ProgressSvc) {
	
	//Intialize videos for each section
	//===========================================================================
	var initEncodingVideos = function(){
			// $scope.videos.lifeOfPi = videojs('video-empower-vfx');
			// $scope.videos.lifeOfPi.poster('images/empower/life-pi-cover.jpg');
	};

	$scope.chapter = "innovators";
	$scope.nextChapter = "homebeyond";
	$scope.currentSection = $stateParams.id;
	$scope.sections = {
		"innovators-init" : {
			pages : 1,
			currentPage : 1,
			lastSection : "none",
			nextSection : "innovators-digital-encoding",
			initVideos : function(){}
		},
		"innovators-digital-encoding" : {
			pages : 5,
			currentPage : 1,
			lastSection : "innovators-init",
			nextSection : "innovators-standards",
			initVideos : function(){
				initEncodingVideos();
			}
		},
		"innovators-standards" : {
			pages : 2,
			currentPage : 1,
			lastSection : "innovators-digital-encoding",
			nextSection : "innovators-technology-licensing-patents",
			initVideos : function(){
			},
			technitrivia :  [
				{ page: 2, trivia : 'Before the film shot by the crew of Apollo 11 could go through Technicolor processing, each magazine was run through a sterilizing autoclave to remove any possible "space germs".' }
			]	
		},
		"innovators-technology-licensing-patents" : {
			pages : 5,
			currentPage : 1,
			lastSection : "innovators-standards",
			nextSection : "none",
			initVideos : function(){
			}
		}		

	};
	
	Direction = {
		Y : 0
	};

	$scope.videos = {};

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
		  .to($("#" + $scope.currentSection + " .bg-containter.p1") , 1, {opacity: 1, display:'block'}, 0)
		  .to($("#" + $scope.currentSection + " .text-shadow.p1"), 1,  {opacity: 1, display:'block'}, 0)
		  .to($("#" + $scope.currentSection + " .p1 .chapterNumber") , 1, {opacity: 1, display:'inline-block'}, 2)
		  .to($("#" + $scope.currentSection + " .p1 .chapterTitle") , 1, {opacity: 1, display:'block'}, 2)
		  .to($("#" + $scope.currentSection + " .p1 .sectionText") , 1, {opacity: 1, display:'block'}, 2)
		  .to($("#" + $scope.currentSection + " .text-shadow.p1"), 4, {backgroundColor: 'rgba(0,0,0,0.5)'}, 1)
		  .call(zoomIn, [], this, 2.5);

	var progressInit = new ProgressSvc.init();
	$scope.sections[$scope.currentSection].initVideos();
	progressInit.init($scope.sections[$scope.currentSection].pages, 1);


	//PageActions object to hold all action animation sequences for each page of each section.
	//===========================================================================
	var PageActions = {};

	var speed = 0.85;

	var textShadowSpeed = 2;

	PageActions["innovators-init"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		TweenMax.killAll(false, false, false, true);

		var ei1 = new TimelineMax();
		ei1.pause()
			// Remove Animations
			.to($('#'+thisSection+' .p2') , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// Add Animations
			.to($('#'+thisSection+' .bg-containter.p1') , 1, {opacity: 1, display:'block'}, 0)
			.to($('#'+thisSection+' .p1 .full-bg, #empower-init #introPage1') , 1, {opacity: 1, display:'block'}, 0)
			.to($('#'+thisSection+' .p1 .chapterNumber') , 1, {opacity: 1, display:'inline-block'}, 1)
			.to($('#'+thisSection+' .p1 .chapterTitle') , 1, {opacity: 1, display:'block'}, 1.15)
			.to($('#'+thisSection+' .p1 .sectionText') , 1, {opacity: 1, display:'block'}, 1.25);
			

		var ei2 = new TimelineMax();
		ei2.pause()
			// Remove Animations
			.to($('#'+thisSection+' .p1') , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			.to($('#'+thisSection+' .p1 .chapterNumber') , 1, {opacity: 0, display:'none'}, 0)
			.to($('#'+thisSection+' .p1 .chapterTitle') , 1, {opacity: 0, display:'none'}, 0)
			.to($('#'+thisSection+' .p1 .sectionText') , 1, {opacity: 0, display:'none'}, 0)
			.to($('#'+thisSection+' .p2') , 1, {opacity: 1, display:'block'}, 0)
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.5)'}, speed);

		switch(currentPage) {
		    case 1:
		       	ei1.play();
		        break;
		    case 2:
		        ei2.play();
		        break;
		}//end switch

		// Videos.lifeOfPi.dispose();

	};//innovators-init

	PageActions["innovators-digital-encoding"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		TweenMax.killAll(false, false, false, true);

		var ev1 = new TimelineMax();
		ev1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'});

		var ev2 = new TimelineMax();
		ev2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev3 = new TimelineMax();
		ev3.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p3') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev4 = new TimelineMax();
		ev4.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p4') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev5 = new TimelineMax();
		ev5.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p5') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev6 = new TimelineMax();
		ev6.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p6') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		switch(currentPage) {
		    case 1:
		       	ev1.play();
		        break;
		    case 2:
		        ev2.play();
		        break;
		    case 3:
		        ev3.play();
		        break;
		    case 4:
		        ev4.play();
		        break;
		    case 5:
		        ev5.play();
		        break;
		    case 6:
		        ev6.play();
		        break;
		}//end switch

	}; //innovators-digital-encoding


	PageActions["innovators-standards"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		TweenMax.killAll(false, false, false, true);

		var ev1 = new TimelineMax();
		ev1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'}, 0);

		var ev2 = new TimelineMax();
		ev2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'}, 0);

		// var ev3 = new TimelineMax();
		// ev3.pause()
		// 	// Remove Animations
		// 	.to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
		// 	.to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
		// 	// Add Animations
		// 	.to($('#'+thisSection+' .p3') , 1, {opacity: 1, display:'block'}, 0);

		// var ev4 = new TimelineMax();
		// ev4.pause()
		// 	// Remove Animations
		// 	.to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
		// 	.to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
		// 	// Add Animations
		// 	.to($('#'+thisSection+' .p4') , 1, {opacity: 1, display:'block'}, 0);

		// var ev5 = new TimelineMax();
		// ev5.pause()
		// 	// Remove Animations
		// 	.to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
		// 	.to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
		// 	// Add Animations
		// 	.to($('#'+thisSection+' .p5') , 1, {opacity: 1, display:'block'}, 0);

		// var ev6 = new TimelineMax();
		// ev6.pause()
		// 	// Remove Animations
		// 	.to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
		// 	.to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
		// 	// Add Animations
		// 	.to($('#'+thisSection+' .p6') , 1, {opacity: 1, display:'block'}, 0);

		switch(currentPage) {
		    case 1:
		       	ev1.play();
		        break;
		    case 2:
		        ev2.play();
		        break;
		    // case 3:
		    //     ev3.play();
		    //     break;
		    // case 4:
		    //     ev4.play();
		    //     break;
		    // case 5:
		    //     ev5.play();
		    //     break;
		    // case 6:
		    //     ev6.play();
		    //     break;
		}//end switch

	}; //innovators-digital-encoding


	PageActions["innovators-technology-licensing-patents"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		TweenMax.killAll(false, false, false, true);

		var ev1 = new TimelineMax();
		ev1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'}, 0);

		var ev2 = new TimelineMax();
		ev2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'}, 0)
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev3 = new TimelineMax();
		ev3.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p3') , speed, {opacity: 1, display:'block'}, 0)
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev4 = new TimelineMax();
		ev4.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p4') , speed, {opacity: 1, display:'block'}, 0);

		var ev5 = new TimelineMax();
		ev5.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p5') , speed, {opacity: 1, display:'block'}, 0);

		var ev6 = new TimelineMax();
		ev6.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p6') , speed, {opacity: 1, display:'block'}, 0);


		switch(currentPage) {
		    case 1:
		       	ev1.play();
		        break;
		    case 2:
		        ev2.play();
		        break;
		    case 3:
		        ev3.play();
		        break;
		    case 4:
		        ev4.play();
		        break;
		    case 5:
		        ev5.play();
		        break;
		    case 6:
		        ev6.play();
		        break;
		}//end switch

	}; //innovators-technology-licensing-patents


	// Dispose of All Video Instances when finished with Section / Chapter
	//==============================================================================
	var disposeVideos = function(){
    	for(videoObj in $scope.videos){
	    	if($scope.videos[videoObj] !== undefined){
	    		$scope.videos[videoObj].dispose();
	    	}
    	}
	};

	// Pause Video Behavior
	//==============================================================================
	$scope.pauseAction = function(clickFrom, record) {
		if (clickFrom === 'videoBtn') {
			$scope.isPaused = $scope.videos[record].paused();
		}
		else if (clickFrom === 'pauseBtn') {
			$scope.videos[record].play();
			$scope.isPaused = $scope.videos[record].paused();
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
    }

    $(window).resize(function(){
        setBodyScale();
    });

    //Fire it when the page first loads:
    setBodyScale();

});//app
