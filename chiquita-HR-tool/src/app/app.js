define([
	/* Define Module File paths here */
	'require', 
	'angular', 
	'_services/logic',
	'welcome/welcome_mod',
	'page1/page1_mod',
	'page2/page2_mod',
	'page3/page3_mod',
	'page4/page4_mod'
	], function () {
		'use strict';

		// Declare app main module which depends on filters, and services
		return angular.module('tool',
			[
			//Module Dependents go here
			'ui.router',
			'angulartics',
			'angulartics.google.analytics',
			//'base64',
			//'ngCookies',
			
			//Services
			//'logicSvc',

			//Section Modules
			'welcomeMod',
			'page1Mod',
			'page2Mod',
			'page3Mod',
			'page4Mod'
			])

			.run(['$state', '$location', '$rootScope', function ($state, $location, $rootScope) {
				$state.go('welcome');
			}])

			.controller('mainController', ['$rootScope', '$scope', '$http', '$state', '$location', '$analytics',
				function($rootScope, $scope, $http, $state, $location, $analytics ) {

				$analytics.eventTrack('page loaded', {  category: 'Page Type', label: 'intial load' });

				////////START SCOPES/////////
				
				$scope.planOptions = {};

				$scope.user = { 
					'nameFirst' : null,					
					page2 : {
						'planType' : null, // single / employee-children / employee-spouse / employee-family
						'partnerHasCoverage' : null, //only if planType is family (true or false)
						'cdhpEnroll' : null, //true or false (will enroll in HRA)
						'hraBal' : null // floating point number
					},
					page3 : {
						'userType' : null //light, moderate, frequent
					}

				};

				$scope.rootVal = {
					pages : 5,
					isfirstPageHit : true,
				};

				$scope.backgroundWelcome = true;

				////////END SCOPES/////////

				$scope.resetprogram = function (){

					for (var i = 1; i <= 3; i++) {
						for( var prop in $scope.user['page'+i] ){
							$scope.user['page'+i][prop] = null;
						}						
					}

					$scope.rootVal.isfirstPageHit = true;
					$state.go('welcome');
				};
				
				var getCalculationData = function(){
					$http.get('app/calcData.json').
					    success(function(data, status, headers, config) {
					      $scope.planOptions = data[0];
					    }).
					    error(function(data, status, headers, config) {
					      // log error
					    });
				};

				var breadCrumbsInit = function(){
					var marginRight = 0,
							crumbsW = 0;

					var constructFinish = function(){
						var liW = $("#breadCrumbs li").outerWidth(true);
						var liM = parseInt($("#breadCrumbs li").css('marginRight'));
						var crumbsW =  Math.floor( ((liW * $scope.rootVal.pages) - liM) / 2 ) - 30;

						$("#breadCrumbs").css({'marginLeft': "-"+crumbsW+'px' });
						$("#breadCrumbs > li:last").css({'margin' : '0px'});
					};
					
					for(var i=1; i <= $scope.rootVal.pages; i++){
						var classType = 'off';
						$("#breadCrumbs").append('<li class="progression bc'+i+' off">'+i+'</li>');
					}

					constructFinish();
				};

				var breadCrumbChange = function(pageNum){
					
					var pix = pageNum * 80;
					var pageNumbers = parseInt(pageNum) + 1;

					$(".bc"+pageNum).removeClass('off').addClass('on');
					for (var i = pageNumbers; i <= $scope.rootVal.pages; i++) {
						$(".bc"+i).removeClass('on').addClass('off');
					}
					$(".prog").animate({ 'width' : pix+'px'}, 400);
				};

				//changes size of ui-view area on change start
				//changes position of bread crumb progression bar
                $rootScope.$on('$stateChangeStart', function(event, toState){
                	
                	var current = $state.current.name;                	
                	$('#'+current).fadeOut(400);

                	//swap out background image
                	if( (toState.url === '/welcome') || (toState.url === '/p1') ){
                		$scope.backgroundWelcome = true;
                	}else{
                		$scope.backgroundWelcome = false;
                	}

                    if(toState.url != '/welcome'){
                    	
                    	// if did not start from the begining then send them back to the beinging. 
                    	if($scope.rootVal.isfirstPageHit){ 
                    		$location.path('/welcome');
                    		breadCrumbChange(1);
                    	}

                     	var pageNum = toState.url.split('p')[1];
                     	breadCrumbChange(pageNum);
                    }

                });

                //changes size of ui-view area on load
                $rootScope.$on('$viewContentLoaded', function(event, toState){

                	var current = $state.current.name;
                	$('#'+current).fadeIn(400);


					setTimeout(function(){
						//IE 8&9 FIX placeholders for input
					    $('[placeholder]').focus(function() {
					      var input = $(this);
					      if (input.val() == input.attr('placeholder')) {
					        input.val('');
					        input.removeClass('placeholder');
					      }
					    }).blur(function() {
					      var input = $(this);
					      if( (input.val() == '') || (input.val() == input.attr('placeholder')) ) {
					        input.addClass('placeholder');
					        input.val(input.attr('placeholder'));
					      }
					    }).blur();

					}, 0);

                });

				getCalculationData();
				breadCrumbsInit();

			}]);//app
});
