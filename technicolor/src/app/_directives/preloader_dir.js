angular.module('preloader',[])
.factory('PreloaderSvc', function ( $q, $rootScope, $timeout ) {

	PreloadSvc = {};
	PreloadSvc.memory = {};

	PreloadSvc.loadData = function(manifest, directory, chapter){

		var deferred = $q.defer();
		var preload = new createjs.LoadQueue(true, directory);
		var self = this;

		//If already loaded Chapter return promise as true and resloved
		//|| (navigator.userAgent.match(/Windows/i))
		if (typeof self.memory[chapter] !== "undefined"  ) {
			deferred.resolve(true);
			return deferred.promise;
		}

		//Global Scope to call actions on preload directive and animations
		$rootScope.startStopPreload = true;
		self.loadPercent = true;

		//PreloadJS api
		preload.loadManifest(manifest);
		preload.on('progress', handleOverallProgress);
		preload.on('error', handleError);

	    var colorStrips = [
	      'one',
	      'two',
	      'three',
	      'four',
	      'five',
	      'six',
	      'seven',
	      'eight',
	      'nine',
	      'ten',
	      'eleven',
	      'twelve',
	      'thirteen',
	      'fourteen',
	    ];

    	var previousPercent = 0;

		// recursive percentage of all file manifest load
		function handleOverallProgress(event) {

			if(event.loaded == 1 ){//loaded at 100%
				self.memory[chapter] = 1;
				$rootScope.startStopPreload = false;
				deferred.resolve(true);
			}

			var percent = event.loaded * 100;
			displayProgress(percent, previousPercent);
			previousPercent = percent;
		}

   		// display the strips according to the percentage
		function displayProgress(percent, previousPercent) {
    		// calculate the corresponding value of the percentage for the correct strip
			var currentBar  = Math.round((percent * 14) / 100);
			var previousBar = Math.round((previousPercent * 14) / 100);

      		//display each strip from the previous strip to the current strip
			for (index = previousBar; index <= currentBar; index++) {
				TweenMax.to($('.' + colorStrips[index]), 0, { opacity: 1 });
			}
		}

		function handleError(event) {
			deferred.reject(false);
			$rootScope.startStopPreload = false;
		}

		return deferred.promise;

	};

	return PreloadSvc;

})
.animation('.preloadBg-animation', function () {
	return {
		addClass: function (element, className, done) {
			TweenMax.to(element, 0.35, {display:"block", opacity: 1});
		},
		removeClass: function (element, className, done) {
			TweenMax.to(element, 1, {
				opacity: 0,
				onComplete:function(){
					TweenMax.to(element, 0, {display:"none"});
				  $('.strip').css('opacity', 0);
				}
			});
		}
	};
})
.directive('preLoader', function(){
	return {
		replace: true,
		templateUrl: 'app/global_partials/preloader.html'
	};

});//app
