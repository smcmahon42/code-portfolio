angular.module('gameSlider',[])
.directive('gameSlider', function($rootScope, $timeout, TrackImgSvc) {
	return {
		replace: true,
		restrict: 'E',
		templateUrl: 'app/global_partials/gameSlider.html',
		link: function(scope, el, attr) {

			// Calculate how many LI sections 
			// Risize the sections
			// Fix positioning
			GameSlider = {};

			GameSlider.resizeInfoSlider = function(){

				var $slideSelection = el.find(".slideSectionContainer");
				var wrapperHight = $("#mainViewPoint").height();
				var $listItemsArray = el.find("li");
				var centerPosition = 0;
				var slideSectionWidth = 0;
				var imgWArray = [];
				var percentVal;
				var newImgW = 0;


				//Kill All Tweens and Start Fresh
				TweenMax.killTweensOf($slideSelection);
				TweenMax.killTweensOf($listItemsArray);

				// Reset Opacity 
				$(".milestoneSegment").each(function(){
					if($(this).hasClass('active')){ 
						$(this).removeClass('active');
						TweenMax.to($(this).find("img"), 1, { opacity: 0.5 });
					}				
				});	

				// find slide Section Width in pixels
				el.find(".gameSegment > img").each(function(i){
					var imgNH = $(this)[0].naturalHeight;
					var imgNW = $(this)[0].naturalWidth;
					var newImgW = Math.ceil( ( wrapperHight / imgNH ) * imgNW );
					slideSectionWidth += newImgW;
					imgWArray[i] = newImgW;
				});

				//Set ul width
				TweenMax.to($slideSelection, 0.5, { width : slideSectionWidth+"px" });
								
				// find slideSection li width percentage
				el.find(".gameSegment").each(function(i){
					var percentVal = (imgWArray[i] / slideSectionWidth) * 100;
					//Set Width of Li's
					TweenMax.to($(this), 0.5, {width : percentVal+"%" });
				});


				if($rootScope.deviceType === "tablet"){
					//Add Tablet Swipe navigation
					Draggable.create($slideSelection, {type:"x", bounds: el, edgeResistance:0.25, throwProps:true});
				}else{
					//Center Desktop Browser Slide
					centerPosition = slideSectionWidth / 4;
					TweenMax.to($slideSelection, 1, {
						transform: 'translate('+-Math.abs(centerPosition)+'px, 0px)', 
						ease: Power2.easeOut
					});
				}

			};//GameSlider.resizeInfoSlider


			//Track Mouse on Desktop
			GameSlider.mousetrack = function(){

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


				}//trackSlider

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

			};//GameSlider.mousetrack

			scope.highlight = function(num){
			
				var $listItem = el.find('li:eq('+num+')');
				if($listItem.hasClass('active')){ 
					$listItem.removeClass('active');
					TweenMax.to($listItem.find("img"), 0.75, { opacity: 0.5 });
					return false; 
				}else{
					$listItem.addClass('active');
					TweenMax.to($listItem.find("img"), 0.75, { opacity: 1 });
				}
			
			};//scope.showCopy

			//wait till all images load
			$(".gameSegment img").on("load", function(){
				GameSlider.resizeInfoSlider();
			});

			var resizeInfoSliderTimeOut = null;
			$(window).resize(function(){
				clearTimeout(resizeInfoSliderTimeOut);
				resizeInfoSliderTimeOut = setTimeout(function() {
			   		GameSlider.resizeInfoSlider();
				}, 200);
			});

			if($rootScope.deviceType == "desktop"){
				GameSlider.mousetrack();
			}// if

		}//link
	};

});//app


