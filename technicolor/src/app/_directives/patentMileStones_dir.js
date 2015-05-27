angular.module('patentMileStones',[])
.directive('patentMileStones', function($rootScope, $timeout, TrackImgSvc) {
	return {
		replace: true,
		restrict: 'E',
		templateUrl: 'app/global_partials/patentMileStones.html',
		link: function(scope, el, attr) {

			MileStonesSlider = {};
			MileStonesSlider.ulWidth = 0;
			MileStonesSlider.ulCenter = 0;

			MileStonesSlider.checkDesktopNav = function(){

				var self = this;

				if($rootScope.deviceType == "desktop"){
					// MileStonesSlider.mousetrack();

					$(".mileSonesNav").fadeIn(200);

					//Hover over arrow icons to move list items left and right
					//////////////////////////////////////////////////////////
					var slideMove = function(){

						var $slideSelection = el.find(".slideSectionContainer");
						var direction = '';

						if($(this).hasClass('slideRight')){
							//Slide Left
							var wrapperWidth = $("#mainViewPoint").width();
							var newPostionW = -Math.abs(Math.abs(self.ulWidth - 20) - wrapperWidth) - 100;
							TweenMax.to($slideSelection, 6, { 
								transform: 'translate('+newPostionW+'px, 0px)',
								ease: Power0.easeNone
							}); 
						}else{
							//Slide Right
							TweenMax.to($slideSelection, 6, { 
								transform: 'translate(100px, 0px)',
								ease: Power0.easeNone
							}); 
						}

					};

					var slideStop = function(){
						var $slideSelection = el.find(".slideSectionContainer");
						TweenMax.killTweensOf($slideSelection);
					};
					
					$(".mileSonesNav").hoverIntent({
					    over: slideMove,
					    out: slideStop,
					    selector: 'div',
					    interval: 50
					});

					//Hover over list items to show content
					///////////////////////////////////////
					var revealContent = function(){
						$listItem = $(this);
						TweenMax.to($listItem.find("img"), 0.75, { top: '-33%' });
						TweenMax.to($listItem.find(".textarea"), 0.75, { top: '50%' });
						TweenMax.to($listItem.find(".textarea"), 0.75, { delay : 0.35, opacity: 1 });
					};

					var hideContent = function(){
						$listItem = $(this);
						TweenMax.to($listItem.find("img"), 0.75, { top: '0%' });
						TweenMax.to($listItem.find(".textarea"), 0.75, { top: '1%', opacity: 0 });
					};

					$(".slideSectionContainer").hoverIntent({
					    over: revealContent,
					    out: hideContent,
					    selector: 'li',
					    interval: 50
					});

				}// if desktop

			};


			MileStonesSlider.resizeInfoSlider = function(){

				var $slideSelection = el.find(".slideSectionContainer");
				var wrapperHight = $("#mainViewPoint").height();
				var $listItemsArray = el.find("li");
				var centerPosition = 0;
				var slideSectionWidth;
				var liSize;
				var percentVal;
				var liTop;

				$(".milestoneSegment").each(function(){
					if($(this).hasClass('active')){ 
						$(this).removeClass('active');
						TweenMax.to($(this).find("img"), 1, { top: '0%' });
						TweenMax.to($(this).find(".textarea"), 1, { top: '1%', opacity: 0 });
					}				
				});	

				// wrapper parent height / 1.5 (2/3) plus 20 pixels in margin times total amount of LI elements to get slide container width
				// plus 20 pixels margine left on the first li element
				slideSectionWidth = ((Math.ceil(wrapperHight / 1.8) + 20) * $listItemsArray.length) + 20;
				liSize = Math.floor(wrapperHight / 1.8);
				percentVal = (liSize / slideSectionWidth) * 100;

				liTop = Math.abs(Math.floor(wrapperHight / 2) - wrapperHight) / 2;
				centerPosition = slideSectionWidth / 4;

				$slideSelection.attr("data-offset-w", slideSectionWidth);
				// $slideSelection.attr("data-img-height", $("#mainViewPoint").width());
				
				//Kill All Tweens and Start Fresh
				TweenMax.killTweensOf($slideSelection);
				//Set ul width
				TweenMax.to($slideSelection, 0.75, { width : slideSectionWidth+"px" });
				//Set Width of Li's
				TweenMax.to($listItemsArray, 0.75, {width : percentVal+"%", top: liTop+"px" });

				if($rootScope.deviceType === "tablet"){
					//Add Tablet Swipe navigation
					Draggable.create($slideSelection, {type:"x", bounds: el, edgeResistance:0.25, throwProps:true});
				}else{
					//Center Desktop Browser Slide
					TweenMax.to($slideSelection, 1, {
						transform: 'translate('+-Math.abs(centerPosition)+'px, 0px)', 
						ease: Power2.easeOut
					});
				}

				this.ulWidth = slideSectionWidth;
				this.ulCenter = centerPosition;

				this.checkDesktopNav();

			};//MileStonesSlider.resizeInfoSlider


		    MileStonesSlider.scaleTypeLI = function() {
		    	$('.slideSectionContainer li').each(function(){
			    	var $empAnime = $(this); //Cache this for performance
			        var scaleSource = $(window).width(),
			            scaleFactor = 0.35,
			            maxScale = 600,
			            minScale = 400; //Tweak these values to taste
			        var fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:
			        if (fontSize > maxScale) fontSize = maxScale;
			        if (fontSize < minScale) fontSize = minScale; //Enforce the minimum and maximums
			        $empAnime.css('font-size', fontSize + '%');
		    	});
		    };//MileStonesSlider.scaleTypeLI


			//Track Mouse on Desktop
			MileStonesSlider.mousetrack = function(){

				self = this;

				var trackSlider = function(SlideObj, imgX){

					var leftBumper = 150;
					var rightBumper = 150;

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

				};//trackSlider

				el.on("mouseenter", function(){

					var SlideObj = {};
					SlideObj.sliderSelection_l = $(".slideSectionContainer").offset().left;
					SlideObj.slideSelection = el.find(".slideSectionContainer");
					SlideObj.slideSelectionW = el.find(".slideSectionContainer").width();
					SlideObj.parentWidth = $("#mainViewPoint").width();

					$(this).on("mousemove", function(e){
						trackSlider(SlideObj, e.pageX);
					});
				});//on

				el.on("mouseleave", function(){
					$(this).off("mousemove");
					self.resizeInfoSlider();
				});//off

			};//MileStonesSlider.mousetrack

			scope.showCopy = function(num){

				if($rootScope.deviceType !== "desktop"){
			
					var $listItem = el.find('li:eq('+num+')');
					if($listItem.hasClass('active')){ 
						$listItem.removeClass('active');
						TweenMax.to($listItem.find("img"), 0.75, { top: '0%' });
						TweenMax.to($listItem.find(".textarea"), 0.75, { top: '1%', opacity: 0 });
						return false; 
					}else{
						$listItem.addClass('active');
						TweenMax.to($listItem.find("img"), 0.75, { top: '-33%' });
						TweenMax.to($listItem.find(".textarea"), 0.75, { top: '50%' });
						TweenMax.to($listItem.find(".textarea"), 0.75, { delay : 0.35, opacity: 1 });
					}

				}//if

			};//scope.showCopy

		    MileStonesSlider.scaleTypeLI();
			MileStonesSlider.resizeInfoSlider();

			var resizeInfoSliderTimeOut = null;
			$(window).resize(function(){
				clearTimeout(resizeInfoSliderTimeOut);
				resizeInfoSliderTimeOut = setTimeout(function() {
			   		MileStonesSlider.resizeInfoSlider();
				}, 200);
			});


		}//link
	};

});//app


