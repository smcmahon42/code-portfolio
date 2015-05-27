angular.module('progressBar',[])
.service('ProgressSvc', function ( ) {

	// EAMPLE TEST CODE
	// ============================================
	// 1. call ProgressSvc service into your controller
	 
	// 2. Make as many instances you need, one for each section
	// var progressInti = new ProgressSvc.init();
	// var progressVFX = new ProgressSvc.init();
	
	// progressIntial.init([amount of pages], [current page])

	// progressIntial.init(5, 1); --> this runs the animation and figures out the calculation.

	// 	progressIntial.init(5, 3); --> run it again each time the page changes

	// 	progressIntial.reset(); --> reset the progress bar to 100%.

	ProgressSvc = {};

	ProgressSvc.init = function(){
		
		ProgressBar = {};
		ProgressBar.pagePercent = 0;
		
		ProgressBar.init = function(totalPages, currentPage){

			this.pagePercent = (currentPage / totalPages) * 100;
			TweenMax.to($("#coverProgress"), 1, { width: this.pagePercent+"%", ease: Expo.easeInOut });

		};

		ProgressBar.reset = function(){
			TweenMax.to($("#coverProgress"), 1, { width: "100%" });
		};

		return ProgressBar;

	};
	
	return ProgressSvc;

})
.directive('progressLoader', function(){
	return {
		replace: true,
		templateUrl: 'app/global_partials/progress.html',
		link: function(scope, el, attr) {

			function widthResize(){
				$("#progRainbow").width( $(window).width() );
			}

            $( window ).resize(function() {
              widthResize();
            });

			widthResize();

		}
	};

});//app
