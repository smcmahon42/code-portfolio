angular.module('talentMod', [])

.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state('talent', {
		url: "/talent/:id",
		templateUrl: "app/chapter_talent/talent.tpl.html",
		controller: 'TalentController',
		resolve: {

			PreloaderSvc : "PreloaderSvc",

			loadPage : function(PreloaderSvc){

				var manifest = [
					{ id: 'img1', src: "intro.jpg" },
					{ id: 'img2', src: "Alexander_Kruger.jpg" },		
					{ id: 'img3', src: "Anna_Behlmer.jpg" },
					{ id: 'img4', src: "Brian_Eriksson.jpg" },
					{ id: 'img5', src: "Caroline_Baillard.jpg" },
					{ id: 'img6', src: "Chris_Kutchka.jpg" },
					{ id: 'img7', src: "Christel_Chamaret.jpg" },
					{ id: 'img8', src: "Craig_Mann.jpg" },
					{ id: 'img9', src: "David_Register.jpg" },
					{ id: 'img10', src: "Gareth_Cook.jpg" },
					{ id: 'img11', src: "Gary_MeGregian.jpg" },
					{ id: 'img12', src: "Greg_Russell.jpg" },
					{ id: 'img13', src: "Hassane_Guermoud.jpg" },
					{ id: 'img14', src: "Jaideep_Chandrashekar.jpg" }
				];

				var promise = PreloaderSvc.loadData(manifest, "images/talent/", 'talent');

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

.controller('TalentController', function($stateParams, $animate, $rootScope, $scope, $state, $timeout, TrackImgSvc, ResizeBgStaticSvc, ResizeBgSvc, ProgressSvc) {
	
	$scope.isTalentSection = true;
	$scope.chapter = "talent";	
	$scope.nextChapter = "fin";
	$scope.currentSection = $stateParams.id;
	$scope.sections = {
		"talent-init" : {
			pages : 3,
			currentPage : 1,
			lastSection : "none",
			nextSection : "talent-all",
			initVideos : function(){}
		},
		"talent-all" : {
			pages : 1,
			currentPage : 1,
			lastSection : "talent-init",	
			nextSection : "talent-technology",
			initVideos : function(){}
		},
		"talent-technology" : {
			pages : 1,
			currentPage : 1,
			lastSection : "talent-all",
			nextSection : "talent-creative",
			initVideos : function(){}
		},
		"talent-creative" : {
			pages : 1,
			currentPage : 1,
			lastSection : "talent-technology",
			nextSection : "none",
			initVideos : function(){}
		}
	};
	
	Direction = {
		Y : 0
	};


	//Hide Show of Talent Sub Navigation 
	//===========================================================================
	var showTalentSubNav = function(){

		//Inital Hide of Talent Sub Nav
		if( $scope.currentSection === 'talent-init' || 
			$rootScope.stateChange.uiState.fromParamId === '' || 
			$rootScope.stateChange.uiState.fromParamId === 'talent-init' 
		){
			TweenMax.to($("#talentNav"), 0, {opacity: 0, display: 'none'});
		}

		if( $scope.currentSection !== 'talent-init' &&
			( $rootScope.stateChange.uiState.fromParamId === 'talent-init' ||
			$rootScope.stateChange.uiState.fromParamId === '' )
		){
			TweenMax.to($("#talentNav"), 1, {opacity: 1, display: 'block', delay: 1});
		}

		if($scope.currentSection === 'talent-init'){
			TweenMax.to($("#talentNav"), 0, {opacity: 0, display: 'none'});
		}

	};

	showTalentSubNav();	


	//Zoom In and Out of the intro page of the Chapter
	//===========================================================================
	var zoomOut = function(){
		if( $scope.currentSection.match(/init/)){
			TweenMax.to($("#" + $scope.currentSection + " .zoomSpan"), 14, {scale:1, ease: Power1.easeInOut, onComplete:zoomIn });
		}else{
			return false;
		}
	};
	var zoomIn = function(){
		if( $scope.currentSection.match(/init/)){
			TweenMax.to($("#" + $scope.currentSection + " .zoomSpan"), 14, {scale:1.10, ease: Power1.easeInOut, onComplete:zoomOut });	
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
	progressInit.init($scope.sections[$scope.currentSection].pages, 1);



	//PageActions object to hold all action animation sequences for each page of each section.
	//===========================================================================
	var PageActions = {};

	var speed = 0.85;

	var textShadowSpeed = 2;

	PageActions["talent-init"] = function(currentPage, lastPage){
		
		var thisSection = $scope.currentSection;

		// TweenMax.killAll(false, false, false, true);

		var ei1 = new TimelineMax();
		ei1.pause()
			// Remove Animations
			.to($('#'+thisSection+' .p2') , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			// Add Animations
			.to($("#" + $scope.currentSection + " .p1 .full-bg") , 1, {opacity: 1, display:'block'}, 0)
			.to($("#" + $scope.currentSection) , 1, {opacity: 1, display:'block'}, 0)
			.to($("#" + $scope.currentSection + " .bg-containter.p1") , 1, {opacity: 1, display:'block'}, 0)
			.to($("#" + $scope.currentSection + " .text-shadow.p1"), 1,  {opacity: 1, display:'block'}, 0)
			.to($("#" + $scope.currentSection + " .p1 .chapterNumber") , 1, {opacity: 1, display:'inline-block'}, 2)
			.to($("#" + $scope.currentSection + " .p1 .chapterTitle") , 1, {opacity: 1, display:'block'}, 2)
			.to($("#" + $scope.currentSection + " .p1 .sectionText") , 1, {opacity: 1, display:'block'}, 2)
			.to($('#'+thisSection+' .text-shadow.p'+currentPage), textShadowSpeed, {backgroundColor: 'rgba(0,0,0,0.5)'}, speed);

		var ei2 = new TimelineMax();
		ei2.pause()
			// Remove Animations
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			.to($('#'+thisSection+' .p1') , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .p1 .chapterNumber') , 1, {opacity: 0, display:'none'}, 0)
			.to($('#'+thisSection+' .p1 .chapterTitle') , 1, {opacity: 0, display:'none'}, 0)
			.to($('#'+thisSection+' .p1 .sectionText') , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p2') , 1, {opacity: 1, display:'block'}, 0);

		var ei3 = new TimelineMax();
		ei3.pause()
			// Remove Animations
			.to($('#'+thisSection+' .text-shadow.p'+lastPage), speed, {backgroundColor: 'rgba(0,0,0,0.0)'})
			.to($('#'+thisSection+' .p2') , 1, {opacity: 0, display:'none'})
			.to($('#'+thisSection+' .p2 .chapterNumber') , 1, {opacity: 0, display:'none'}, 0)
			.to($('#'+thisSection+' .p2 .chapterTitle') , 1, {opacity: 0, display:'none'}, 0)
			.to($('#'+thisSection+' .p2 .sectionText') , 1, {opacity: 0, display:'none'}, 0)
			// Add Animations
			.to($('#'+thisSection+' .p3') , 1, {opacity: 1, display:'block'}, 0);

		switch(currentPage) {
		    case 1:
		       	ei1.play();
		        break;
		    case 2:
		        ei2.play();
		        break;
		    case 3:
		        ei3.play();
		        break;
		}//end switch

	};

	PageActions["talent-all"] = function(currentPage, lastPage){

	};

	PageActions["talent-technology"] = function(currentPage, lastPage){

	};

	PageActions["talent-creative"] = function(currentPage, lastPage){

	};


	// Angular $destroy Action called just before switching to new Section or Chapter
	//==============================================================================
    $scope.$on("$destroy", function() {
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
