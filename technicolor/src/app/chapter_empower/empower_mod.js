angular.module('empowerMod', [])

.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state('empower', {
		url: "/empower/:id",
		templateUrl: "app/chapter_empower/empower.tpl.html",
		controller: 'EmpowerController',
		resolve: {

			PreloaderSvc : "PreloaderSvc",

			loadPage : function(PreloaderSvc){
				var manifest = [
					{ id: 'img1', src: "intro-birdman.jpg" },
					{ id: 'img2', src: "VFX-mpc-mrx.png" },
					{ id: 'img3', src: "intro-section.svg" },
					{ id: 'img4', src: "sound-technicolor-paramount-stage-1.jpg" },
					{ id: 'img5', src: "animation-tree.jpg" },
					{ id: 'img6', src: "advertising-page1.jpg" },
					{ id: 'img7', src: "tomb-raider.jpg" },
					{ id: 'img8', src: "next-birdman.jpg" },
					{ id: 'img9', src: "picture-page2.jpg" }
				];

				var promise = PreloaderSvc.loadData(manifest, "images/empower/", 'empower');

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

.controller('EmpowerController', function($stateParams, $rootScope, $scope, $state, $timeout, TrackImgSvc, ResizeBgStaticSvc, ResizeBgSvc, ProgressSvc) {

	
	//Intialize videos for each section
	//===========================================================================
	var initVfxVideos = function(){
		$scope.isPaused = false;

		$rootScope.videos.lifeOfPi = videojs('video-empower-vfx');
		$rootScope.videos.lifeOfPi.poster('images/empower/life-pi-cover.jpg');
		$rootScope.videos.lifeOfPi.src([
			{ type: "video/mp4",  src: "video/empower/visual effects/LifeOfPi_TECH.mp4" },
			{ type: "video/webm", src: "video/empower/visual effects/LifeOfPi_TECH.webm" },
			{ type: "video/ogg",  src: "video/empower/visual effects/LifeOfPi_TECH.ogv" }
		]);
		$rootScope.videos.lifeOfPi.load();
		$rootScope.videos.lifeOfPi.on('ended', function() {
			this.currentTime(0);
			$scope.nextPage('down');
			this.trigger('loadstart');
		});

		$rootScope.videos.mpc = videojs('video-empower-mpc');
		$rootScope.videos.mpc.src([
			{ type: "video/mp4",  src: "video/empower/visual effects/mpcReel.mp4" },
			{ type: "video/webm", src: "video/empower/visual effects/mpcReel.webm" },
			{ type: "video/ogg",  src: "video/empower/visual effects/mpcReel.ogv" }
		]);
		$rootScope.videos.mpc.load();
		$rootScope.videos.mpc.on('ended', function() {
			this.currentTime(0);
			$scope.nextPage('down');
			this.trigger('loadstart');
		});

		$rootScope.videos.mrx = videojs('video-empower-mrx');
		$rootScope.videos.mrx.src([
			{ type: "video/mp4",  src: "video/empower/visual effects/mrxReel.mp4" },
			{ type: "video/webm", src: "video/empower/visual effects/mrxReel.webm" },
			{ type: "video/ogg",  src: "video/empower/visual effects/mrxReel.ogv" }
		]);
		$rootScope.videos.mrx.load();
		$rootScope.videos.mrx.on('ended', function() {
			this.currentTime(0);
			$scope.nextPage('down');
			this.trigger('loadstart');
		});
	};
	var initSoundVideos = function(){
		$rootScope.videos.whiplash = videojs('audio-empower-whiplash');
		$rootScope.videos.whiplash.src([
			{ type: "audio/mpeg",  src: "video/empower/sound/whiplashClip.mp3" }
		]);
		$rootScope.videos.whiplash.load();
		$rootScope.videos.whiplash.on('ended', function() {
			this.currentTime(0);
			this.trigger('loadstart');
			$scope.nextPage('down');
		});
	};
	var initAnimationVideos = function(){
		$rootScope.videos.animation = videojs('video-empower-animation');
		$rootScope.videos.animation.src([
			{ type: "video/mp4",  src: "video/empower/animation/AnimationReel.mp4" },
			{ type: "video/webm", src: "video/empower/animation/AnimationReel.webm" },
			{ type: "video/ogg",  src: "video/empower/animation/AnimationReel.ogv" }
		]);
		$rootScope.videos.animation.load();
		$rootScope.videos.animation.on('ended', function() {
			this.currentTime(0);
			$scope.nextPage('down');
			this.trigger('loadstart');
		});
	};
	var initAdvVideos = function(){
		$rootScope.videos.advertising = videojs('video-empower-advertising');
		$rootScope.videos.advertising.src([
			{ type: "video/mp4",  src: "video/empower/advertising/AdvertisingReel.mp4" },
			{ type: "video/webm", src: "video/empower/advertising/AdvertisingReel.webm" },
			{ type: "video/ogg",  src: "video/empower/advertising/AdvertisingReel.ogv" }
		]);
		$rootScope.videos.advertising.load();
		$rootScope.videos.advertising.on('ended', function() {
			this.currentTime(0);
			$scope.nextPage('down');
			this.trigger('loadstart');
		});
	};
	var initGamingVideos = function(){
		$rootScope.videos.gaming = videojs('video-empower-gaming');
		$rootScope.videos.gaming.src([
			{ type: "video/mp4",  src: "video/empower/gaming/GamingReel.mp4" },
			{ type: "video/webm", src: "video/empower/gaming/GamingReel.webm" },
			{ type: "video/ogg",  src: "video/empower/gaming/GamingReel.ogv" }
		]);
		$rootScope.videos.gaming.load();
		$rootScope.videos.gaming.on('ended', function() {
			this.currentTime(0);
			$scope.nextPage('down');
			this.trigger('loadstart');
		});
	};

	$scope.chapter = "empower";
	$scope.nextChapter = "colorstory";
	$scope.currentSection = $stateParams.id;
	$scope.sections = {
		"empower-init" : {
			pages : 1,
			currentPage : 1,
			lastSection : "none",
			nextSection : "empower-vfx",
			initVideos : function(){}
		},
		"empower-vfx" : {
			pages : 7,
			currentPage : 1,
			lastSection : "empower-init",
			nextSection : "empower-picture",
			initVideos : function(){
				initVfxVideos();
			},
			technitrivia :  [
				{page: 2, trivia : 'The "tech" in our company name is a nod to our founder' + "'" + 's alma mater, MIT, and its popular student yearbook "Tech-nique"' },
				{page: 6, trivia : "1928's The Viking was the first Technicolor feature in sound even though that was confined to music and effects." }				
			]
		},
		"empower-picture" : {
			pages : 2,
			currentPage : 1,
			lastSection : "empower-vfx",
			nextSection : "empower-sound",
			initVideos : function(){
			}
		},		
		"empower-sound" : {
			pages : 5,
			currentPage : 1,
			lastSection : "empower-picture",
			nextSection : "empower-animation",
			initVideos : function(){
				initSoundVideos();
			}
		},
		"empower-animation" : {
			pages : 4,
			currentPage : 1,
			lastSection : "empower-sound",
			nextSection : "empower-advertising",
			initVideos : function(){
				initAnimationVideos();
			},
			technitrivia :  [
				{ page: 2, trivia : "The first Academy Award won by Disney was also their first theatrical short in full Technicolor, 1932's Flowers and Trees. Technicolor won our first Technical Achievement SciTech award for our color cartoon process on the film." }
			]			
		},
		"empower-advertising" : {
			pages : 3,
			currentPage : 1,
			lastSection : "empower-animation",
			nextSection : "empower-gaming",
			initVideos : function(){
				initAdvVideos();
			}
		},
		"empower-gaming" : {
			pages : 5,
			currentPage : 1,
			lastSection : "empower-advertising",
			nextSection : "empower-next",
			initVideos : function(){
				initGamingVideos();
			}
		},
		"empower-next" : {
			pages : 2,
			currentPage : 1,
			lastSection : "empower-gaming",
			nextSection : "none",
			initVideos : function(){
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
			TweenMax.to($("#" + $scope.currentSection + " .zoomSpan"), 18, {scale:1, ease: Power1.easeInOut, onComplete:zoomIn });
		}else{
			return false;
		}
	};
	var zoomIn = function(){
		if( $scope.currentSection.match(/init/)){
			TweenMax.to($("#" + $scope.currentSection + " .zoomSpan"), 18, {scale:1.10, ease: Power1.easeInOut, onComplete:zoomOut });	
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

	PageActions["empower-init"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

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
			.to($('#'+thisSection+' .p1 .sectionText') , 1, {opacity: 1, display:'block'}, 1.25)
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.5)'}, speed);
			
		switch(currentPage) {
		    case 1:
		       	ei1.play();
		        break;
		}//end switch

	};//empower-init

	PageActions["empower-vfx"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);

		var ev1 = new TimelineMax();
		ev1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p1'), speed, {opacity: 1, display:'block'}, speed);

		var ev2 = new TimelineMax();
		ev2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p2'), speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev3 = new TimelineMax();
		ev3.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter"), speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p3'), speed, {opacity: 1, display:'block'});

		var ev4 = new TimelineMax();
		ev4.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter"), speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p4'), speed, {opacity: 1, display:'block'});

		var ev5 = new TimelineMax();
		ev5.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter"), speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p5'), speed, {opacity: 1, display:'block'});

		var ev6 = new TimelineMax();
		ev6.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p6'), speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev7 = new TimelineMax();
		ev7.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p7'), speed, {opacity: 1, display:'block'});

		var ev8 = new TimelineMax();
		ev8.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 1)
			// Add Animations
			.to($('#'+thisSection+' .p8'), speed, {opacity: 1, display:'block'});

		//Pause MPC video
		if ($rootScope.videos.mpc != undefined) {
			if ($rootScope.videos.mpc.paused() === false) {
				$rootScope.videos.mpc.pause();
			}
		}

		//Pause Mr X video
		if ($rootScope.videos.mrx != undefined) {
			if ($rootScope.videos.mrx.paused() === false) {
				$rootScope.videos.mrx.pause();
			}
		}

		//Pause Life Of Pi video
		if ($rootScope.videos.lifeOfPi != undefined) {
			if ($rootScope.videos.lifeOfPi.paused() === false) {
				$rootScope.videos.lifeOfPi.pause();
				$scope.isPaused = true;
			}
		}

		// if (hasTechnitrivia(thisSection)) {
		// 	getTechnitrivia(thisSection, currentPage);
		// }
		switch(currentPage) {
		    case 1:
		       	ev1.play();
		        break;
		    case 2:
				ev2.play();
		        break;
		    case 3:
		        ev3.play();
				$rootScope.videos.mpc.play();
		        break;
		    case 4:
		        ev4.play();
		        break;
		    case 5:
		        ev5.play();
				$rootScope.videos.lifeOfPi.play();
		        break;
		    case 6:
		        ev6.play();
		        break;
		    case 7:
		        ev7.play();
				$rootScope.videos.mrx.play();
		        break;
		}//end switch
		
	}; //empower-vfx

	PageActions["empower-picture"] = function(currentPage, lastPage){
		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);

		var picture1 = new TimelineMax();
		picture1.pause()
			// Remove Animations
			.to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p1') , 1, {opacity: 1, display:'block'}, speed);
			

		var picture2 = new TimelineMax();
		picture2.pause()
			// Remove Animations
			.to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p2') , 1, {opacity: 1, display:'block'}, 0)
			.to($('#'+thisSection+' .full-bg.p2') , 1, {opacity: 0.75, display:'block'}, 0);

		switch(currentPage) {
		    case 1:
		       	picture1.play();
		        break;
		    case 2:
		        picture2.play();
		        break;
		}//end switch

	}; //empower-picture	
	
	PageActions["empower-sound"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);

		var ev1 = new TimelineMax();
		ev1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'}, speed);

		var ev2 = new TimelineMax();
		ev2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .full-bg.p2'), speed, {opacity: 0.7, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.7)'}, speed);

		var ev3 = new TimelineMax();
		ev3.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p3'), speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .full-bg.p3'), speed, {opacity: 0.7, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev4 = new TimelineMax();
		ev4.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p4'), speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var ev5 = new TimelineMax();
		ev5.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p5'), speed, {opacity: 1, display:'block'});

		//Pause Whiplash audio
		if ($rootScope.videos.whiplash != undefined) {
			if ($rootScope.videos.whiplash.paused() === false) {
				$rootScope.videos.whiplash.pause();
				$scope.isPaused = true;
			}
		}

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
				$scope.isPaused = false;
				$rootScope.videos.whiplash.play();
		        break;
		    case 5:
		        ev5.play();
		        break;
		}//end switch

	}; //empower-sound

	PageActions["empower-animation"] = function(currentPage, lastPage){
		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);
		
		var ea1 = new TimelineMax();
		ea1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p2') , 1, {opacity: 0, display:'none'})
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'});

		var ea2 = new TimelineMax();
		ea2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .bg-containter.p2') , 1, {opacity: 1, display:'block'}, 1)
			.to($('#'+thisSection+' .p2 .full-bg') , 1, {opacity: 1, display:'block'}, 1)
			.to($('#'+thisSection+' .p2 .pageCopy2-3') , 2, {opacity: 1, display:'block'}, 2)
			.to($('#'+thisSection+' .p2 .dash') , 2, {opacity: 1, display:'block'}, 2.25)
			.to($('#'+thisSection+' .p2 .text') , 2, {opacity: 1, display:'block'}, 2.25)
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.4)'}, speed);
			

		var ea3 = new TimelineMax();
		ea3.pause()
			// Remove Animations	
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p3 .textTitle, #empower-animation .p3 .text') , 0.5, {color: '#FFF', textShadow: 'none'})
			.to($('#'+thisSection+' .p3') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .full-bg.p3') , speed, {opacity: 0.7, display:'block'});

		var ea4 = new TimelineMax();
		ea4.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			.to($('#'+thisSection+' .p3 .textTitle, #empower-animation .p3 .text') , 1, {color: 'transparent', textShadow: '0 0 10px rgba(255,255,255,0.5)'})
			.to($('#'+thisSection+' .p3 .dash') , speed, {opacity: 0, display:'none'}, 0)
			.to($('#'+thisSection+' .p3') , speed, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p4') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.4)'}, speed);


		//Pause animation video
		if ($rootScope.videos.animation != undefined) {
			if ($rootScope.videos.animation.paused() === false) {
				$rootScope.videos.animation.pause();
			}
		}

		switch(currentPage) {
		    case 1:
		       	ea1.play();
		        break;
		    case 2:
		        ea2.play();
		        break;
		    case 3:
		        ea3.play();
				$rootScope.videos.animation.play();
		        break;
		    case 4:
		        ea4.play();
		        break;
		}//end switch

	}; //empower-animation

	PageActions["empower-advertising"] = function(currentPage, lastPage){
		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);

		var eadv1 = new TimelineMax();
		eadv1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'}, 0);
			

		var eadv2 = new TimelineMax();
		eadv2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'}, 0)
			.to($('#'+thisSection+' .full-bg.p2') , speed, {opacity: 0.8, display:'block'}, 0)
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var eadv3 = new TimelineMax();
		eadv3.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p3') , speed, {opacity: 1, display:'block'}, 0);

		//Pause advertising video
		if ($rootScope.videos.advertising != undefined) {
			if ($rootScope.videos.advertising.paused() === false) {
				$rootScope.videos.advertising.pause();
			}
		}

		switch(currentPage) {
		    case 1:
		       	eadv1.play();
		        break;
		    case 2:
		        eadv2.play();
		        break;
		    case 3:
		        eadv3.play();
				$rootScope.videos.advertising.play();
		        break;
		}//end switch

	}; //empower-advertising

	PageActions["empower-gaming"] = function(currentPage, lastPage){

		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);

		var eg1 = new TimelineMax();
		eg1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p1'), speed, {opacity: 1, display:'block'});

		var eg2 = new TimelineMax();
		eg2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .full-bg.p2') , speed, {opacity: 0.85, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		var eg3 = new TimelineMax();
		eg3.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p3') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.4)'}, speed);

		var eg4 = new TimelineMax();
		eg4.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p4') , speed, {opacity: 1, display:'block'});

		var eg5 = new TimelineMax();
		eg5.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p5') , speed, {opacity: 1, display:'block'});

		//Pause Gaming video
		if ($rootScope.videos.gaming != undefined) {
			if ($rootScope.videos.gaming.paused() === false) {
				$rootScope.videos.gaming.pause();
			}
		}

		switch(currentPage) {
		    case 1:
		       	eg1.play();
		        break;
		    case 2:
		        eg2.play();
		        break;
		    case 3:
		        eg3.play();
		        break;
		    case 4:
		        eg4.play();
			    $rootScope.videos.gaming.play();
		        break;
		    case 5:
		        eg5.play();
		        break;
		}//end switch

	};//empower-gaming

	PageActions["empower-next"] = function(currentPage, lastPage){
		var thisSection = $scope.currentSection;

		$rootScope.volumeController();

		TweenMax.killAll(false, false, false, true);

		var next1 = new TimelineMax();
		next1.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p1') , speed, {opacity: 1, display:'block'});
			

		var next2 = new TimelineMax();
		next2.pause()
			// Remove Animations
			.to($('#'+$scope.chapter+" .bg-containter") , speed, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .p'+lastPage) , 1, {opacity: 0, display:'none'})
			// .to($('#'+thisSection+' .full-bg.p'+lastPage) , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p2') , speed, {opacity: 1, display:'block'})
			.to($('#'+thisSection+' .full-bg.p2') , speed, {opacity: 0.75, display:'block'})
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.6)'}, speed);

		switch(currentPage) {
		    case 1:
		       	next1.play();
		        break;
		    case 2:
		        next2.play();
		        break;
		}//end switch

	}; //empower-next

	// Dispose of All Video Instances when finished with Section / Chapter
	//==============================================================================
	var disposeVideos = function(){
    	for(videoObj in $rootScope.videos){
	    	if($rootScope.videos[videoObj] !== undefined){
	    		$rootScope.videos[videoObj].dispose();
	    	}
    	}
	};

	// Pause Player Behavior
	//==============================================================================
	//The paramater is for the name of the record to play
	$scope.pauseAction = function(record) {
		var isPlayerPaused = $rootScope.videos[record].paused();

		(isPlayerPaused === true) ? $rootScope.videos[record].play() : $rootScope.videos[record].pause();
		$scope.isPaused  = !$scope.isPaused;
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
    };

    $(window).resize(function(){
        setBodyScale();
    });

    //Fire it when the page first loads:
    setBodyScale();

});//app
