angular.module('overlayEffect',[])
.directive('overlayLoader', function($rootScope, $timeout, ResizeBgStaticSvc) {
	return {
		replace: true,
		restrict: 'E',
		templateUrl: 'app/global_partials/overlay.html',
		link: function(scope, el, attr) {

			//General Actions
			// 1. Initial setup of page cliping image poistion
			// 2. Changing Slide and cliping area
			// 3. On window resize recalculate cliping area, image position, slider position

			var resizeStaticBg = new ResizeBgStaticSvc.init();

			function get_imageData(){
				
				var data;
				//Use Resize Service to get calculations for images
				data = resizeStaticBg(false, false, false, 0, true);
				for(var i = 0; i < data.length; i++){
					if(data[i].element.className.match(/image2/i)){
						return data[i];
						break;
					}
				}

			} //get_imageData


			function calculateImgPos(objArgs){

				var $image2 = el.find(".image2"),
					parentH = $("#mainViewPoint").height(),
					parentW = $("#mainViewPoint").width(),
					imageData = get_imageData(),
					clipData = {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
					};

				if($("#imgSlideCtrl").length == 0){
					return false;
				}

				//Init Calculations 
				if(objArgs.init){

					if($image2.hasClass("height-100")){
						clipData.right  = imageData["data-newimg-w"];
						clipData.bottom = parentH;
						
						if($rootScope.deviceType == 'tablet'){
							clipData.left = parentW / 2;	
						}else{
							clipData.left   = imageData["data-newimg-w"] / 2;
						}
					}else{
						clipData.right  = parentW;
						clipData.bottom = imageData["data-newimg-h"];
						clipData.left = parentW / 2;
					}

					TweenMax.to($image2, 0, { 
						clip: "rect("+clipData.top+"px, "+clipData.right+"px, "+clipData.bottom+"px, "+clipData.left+"px)" 
					});

				}

				//Adjust on Slide Action & Resize on Window change Calculations
				if(objArgs.adjust || objArgs.resize){

					var slidePostionLeft = $("#imgSlideCtrl").position().left;
					var slideOuterWidth = $("#imgSlideCtrl").outerWidth();

					if( objArgs.resize){
						//Reposition #imgSlideCtrl if overflow of parent element
						var moveSlideToLeft = (parentW / 2) - (slideOuterWidth / 2);
						if(slidePostionLeft < -2){
							TweenMax.to($("#imgSlideCtrl"), 0.5, { 
								transform: "translate3d("+-Math.abs(moveSlideToLeft)+"px, 0px, 0px)"
							});
						}
						if((slidePostionLeft + slideOuterWidth) > parentW){
							TweenMax.to($("#imgSlideCtrl"), 0.5, { 
								transform: "translate3d("+-Math.abs(moveSlideToLeft)+"px, 0px, 0px)"
							});
						}
					}

					if($image2.hasClass("height-100")){
						clipData.right  = imageData["data-newimg-w"];
						clipData.bottom = parentH;
					}else{
						clipData.right  = parentW;
						clipData.bottom = imageData["data-newimg-h"];
					}

					//FIX CLIPING IMAGE TO PARENT WIDTH WHEN ON A TABLET
					if($rootScope.deviceType == 'tablet'){ clipData.right = parentW; }



					// console.log(clipData);

					//CHANGE OFFSET LEFT WHEN ADJUSTING WITH SLIDER AND ON TABLET
					var offsetLeft = ($rootScope.deviceType == 'tablet' && objArgs.adjust) ? 0 : imageData["data-offset-w"];

					clipData.left = $("#imgSlideCtrl").position().left + ($("#imgSlideCtrl").outerWidth() / 2) - offsetLeft;

					TweenMax.to($image2, 0, { 
						clip: "rect("+clipData.top+"px, "+clipData.right+"px, "+clipData.bottom+"px, "+clipData.left+"px)" 
					});

				}


			} //calculateImgPos

	   		calculateImgPos({
	   			init: true,
	   			resize: false,
	   			adjust: false
	   		});

			var resizeSliderTimeOut = null;
			$(window).resize(function(){
				clearTimeout(resizeSliderTimeOut);
				resizeSliderTimeOut = setTimeout(function() {
			   		calculateImgPos({
			   			init: false,
			   			resize: true,
			   			adjust: false
			   		});
				}, 200);
			});
			
			var x = Draggable.create("#imgSlideCtrl", {
			   type:"x",
			   bounds: $(".overlaySection"),
			   throwProps:false,
			   cursor:"pointer",
			   onDrag:function(){
			   		calculateImgPos({
			   			init: false,
			   			resize: false,
			   			adjust: true
			   		});
			   }
			});

		    // scope.$on("$destroy", function() {
		    // 	$(window).off("resize");
		    // });

		}
	};

});//app


