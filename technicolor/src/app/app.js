angular.module('story',
			[
			//Module Dependents go here
			'ui.router',
			'ngSanitize',
			'ngAnimate',
			'ngTouch',
			'swipe',
			'ngKookies',

			//Services
			'RequestJsonSvc',
			'StateChangeSvc',
			'ResizeBgSvc',
			'TrackImgSvc',
			'ResizeBgStaticSvc',

			//Directives
			'footerTitle',
			'mainNav',
			'preloader',
			'alertMsgs',
			'progressBar',
			'overlayEffect',
			'colorMileStones',
			'gameSlider',
			'patentMileStones',
			'technicalMileStones',
			'technitrivia',
			'talentDisplay',
			'howtoUse',

			//App Section Modules
			'errorMod',
			'introMod',
			'empowerMod',
			'colorstoryMod',
			'homebeyondMod',
			'innovatorsMod',
			'talentMod',
			'endMod'
			])
			.constant('TweenMax', TweenMax)
			.constant('Draggable', Draggable)
			// .constant('IScroll', IScroll)
			.run(function($state, $location){
		        if ($location.url() === '') {
						  $state.go("intro");
		        }
			});//app


