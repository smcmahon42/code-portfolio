
angular.module('talentDisplay',[])
.directive('talentDisplay', function($rootScope, $timeout, $q, $http, $filter, ResizeBgStaticSvc) {
	return {
		replace: true,
		restrict: 'E',
		scope : {},
		templateUrl: 'app/global_partials/talent.html',
		link: function(scope, el, attr) {

			var displaytype = attr.displaytype;
			scope.talentType = displaytype;
			scope.talentPersons;

			//Get Talent by JSON data http request
			var get_talentJson = function(){
				
				var deferred = $q.defer();
				var directory = 'app/json/talent-all.json';

				var talent = $http.get(directory)
				.success(function(data, status, headers, config) {
					deferred.resolve(data);
				})
				.error(function(data, status, headers, config) {
					deferred.reject(false);
				});

				return deferred.promise;
			};

			//Set Data to be displayed
			var set_talentPersons = function(data){
				scope.talentGroups = data;
			};

			//filter data based on talentType
			var filterData = function(data){
				if(displaytype === 'all'){
					return data;
				}else{
					return $filter('filter')(data, {"talentType" : displaytype});
				}
			};

			var reOrderData = function(data){
				var groupCount = 0;
				var tempArray = [];
				var groups = Math.ceil(data.length / 3);
				
				for(var i = 0; i <= data.length; i++){
					if(data[i] === undefined){
						continue;
						groupCount++;
					}
					if(i % 3 === 0){
						tempArray[groupCount] = {};
						tempArray[groupCount].groupId = groupCount;
						tempArray[groupCount].talentPersons = [];
						tempArray[groupCount].talentPersons[0] = data[i];
					}
					if(i % 3 === 1){
						tempArray[groupCount].talentPersons[1] = data[i];
					}
					if(i % 3 === 2){
						tempArray[groupCount].talentPersons[2] = data[i];
						groupCount++;
					}
				}
				return tempArray;
			};//reOrderData

			var correctPositioning = function(){
				// talentSlide
				// talentUl

				var $talentUl = el.find(".talentUl");
				var $talentSlide = el.find(".talentSlide");
				var wrapperHeight = $("#mainViewPoint").height();
				var wrapperWidth = $("#mainViewPoint").width();
				var $talentColumn = el.find(".talentGreenMask > .talentColumn");
				var talentColumnRows = $talentColumn.length;

				// calucate height and center if over 750px
				if($talentUl.height() >= 690){
					liTop = Math.floor(Math.abs(wrapperHeight - $talentUl.height()) / 2);
					TweenMax.to($talentSlide, 0.5, { top: liTop+"px" });
				}else{
					TweenMax.to($talentSlide, 0.5, { top: 0+"px" });
				}

				// count rows of talent
				var ULWidth = talentColumnRows * 230;
				if(wrapperWidth >= ULWidth){
					ULWidth = wrapperWidth;
				}

				TweenMax.to($talentSlide, 0.5, { width: ULWidth+"px" });
				TweenMax.to($talentUl, 0.5, { width: ULWidth+"px" });


				if($rootScope.deviceType === "tablet"){
					//Add Tablet Swipe navigation
					// Draggable.create(el.find(".talentSlide"), {type:"x", bounds: el, edgeResistance:0.25, throwProps:true});
				}else{
					//Center Desktop Browser Slide
					TweenMax.to(el.find(".talentSlide"), 1, {
						transform: 'translate(0px, 0px)', 
						ease: Power2.easeOut
					});
				}

			};//correctPositioning

			//Track Mouse on Desktop
			scope.mousetrack = function(){

				self = this;

				var trackSlider = function(SlideObj, imgX){

					var leftBumper = 120;
					var rightBumper = 120;

					var diff = Math.abs(SlideObj.parentWidth - SlideObj.slideSelectionW);
					var ratio = diff / SlideObj.parentWidth;
					var newPostionW = -Math.abs(ratio * imgX);

					//Bumper padding for the left
					if(imgX <= (SlideObj.parentWidth / 2) ){
						newPostionW += leftBumper;
					}
					//Bumper padding for the right
					if(imgX >= (SlideObj.parentWidth / 2) ){
						newPostionW -= rightBumper;
					}

					TweenMax.killTweensOf(SlideObj.slideSelection);
					TweenMax.to(SlideObj.slideSelection, 3, { 
						transform: 'translate('+newPostionW+'px, 0px)',
						ease: Power2.easeOut
					}); 


				}//trackSlider

				el.on("mouseenter", function(){
					var SlideObj = {};
					SlideObj.sliderSelection_l = $(".talentSlide").offset().left;
					SlideObj.slideSelection = el.find(".talentSlide");
					SlideObj.slideSelectionW = el.find(".talentSlide").width();
					SlideObj.parentWidth = $("#mainViewPoint").width();

					$(this).on("mousemove", function(e){
						trackSlider(SlideObj, e.pageX);
					});
				});//on

				el.on("mouseleave", function(){
					$(this).off("mousemove");
					correctPositioning();
				});//off

			};//scope.mousetrack

			//ng-click show talent and copy
			scope.showTalent = function(e){
				
				var $target = $(e.currentTarget);
				var direction = $target.parent().hasClass('lastColumn') ? "-230" : "230";


				var closeActiveTalent = function(returnFunc){
					var closeTalent = new TimelineMax();
					closeTalent.to($(".activeTalent").find(".talentCopy"), 0.25, {transform: 'translate(0px, 0px)' }, 0);
					closeTalent.to($(".activeTalent").find(".talentCopy"), 0, { opacity: 0, display: 'none'}, "+=0.30");
					closeTalent.to($(".activeTalent").find(".bioImage"), 0.5, {opacity : 0});
					closeTalent.to($(".activeTalent"), 0, {zIndex: 1});
					closeTalent.eventCallback("onComplete", returnFunc, []);
				};

				var openATalent = function(){
					$target.addClass("activeTalent");
					var openTalent = new TimelineMax();
					openTalent.to($target, 0, {zIndex: 4}, 0);
					openTalent.to($target.find(".bioImage"), 0.5, {opacity : 1});
					openTalent.to($target.find(".talentCopy"), 0, { opacity: 1, display: 'block'});
					openTalent.to($target.find(".talentCopy"), 0.25, { transform: 'translate('+direction+'px, 0px)' });
					// openTalent.eventCallback("onComplete", function(){}, []);
				};

				$timeout(function(){
					if($target.hasClass("activeTalent")){
						closeActiveTalent(function(){
							$(".talentReveal li").removeClass("activeTalent");
						});
					}else{
						closeActiveTalent(function(){
							$(".talentReveal li").removeClass("activeTalent");
							openATalent();
						});
					}
				}, 200);

			}//scope.showTalent


			// Hover Show Image for Desktop
			if($rootScope.deviceType === "desktop"){

				var revealTalentImg = function(){
					if($(this).hasClass("activeTalent")){
						return false;
					}
					var self = $(this);
					var addClassHover = function(){
						self.addClass("hoverTalent");
					};
					TweenMax.to($(this).find(".bioImage"), 0.5, { opacity : 1, onComplete : addClassHover });
				};

				var hideTalentImg = function(){
					if($(this).hasClass("activeTalent")){
						return false;
					}
					var self = $(this);
					var removeClassHover = function(){
						self.removeClass("hoverTalent");
					};
					TweenMax.to($(this).find(".bioImage"), 0.5, { opacity : 0, onComplete : removeClassHover });
				};

				$(".talentReveal").hoverIntent({
				    over: revealTalentImg,
				    out: hideTalentImg,
				    selector: 'li'
				});

			}

			if($rootScope.deviceType === "tablet"){
				//Add Tablet Swipe navigation
				Draggable.create(el.find(".talentSlide"), {type:"x", bounds: el, edgeResistance:0.25, throwProps:true});
			}

			var promiseData = get_talentJson();
			promiseData.then(function(data) {
				
				var filteredData = filterData(data);
				var orderedData = reOrderData(filteredData);
				set_talentPersons(orderedData);
				
				$timeout(function(){
					correctPositioning();
				}, 100);
					
			}, function(issue) {
			  //console.log('error');
			});

			var resizeTalentTimeOut = null;
			$(window).resize(function(){
				clearTimeout(resizeTalentTimeOut);
				resizeTalentTimeOut = setTimeout(function() {
			   		correctPositioning();
				}, 200);
			});

			if($rootScope.deviceType == "desktop"){
				scope.mousetrack();
			}// if

		}// object return
	};

});//app



