angular.module('ResizeBgStaticSvc', [])
	.service('ResizeBgStaticSvc', function (TweenMax) {

			var ResizeBgStaticSvc = {}

			ResizeBgStaticSvc.init = function(){

				var resizeStaticBg = function  (initalRun, noResize, classN, speed, returnData) {

					//To Work each element needs 3 things
					// 1. class="static-bg" 
					// 2. data-img-width="700" 
					// 3. data-img-height="394"

					//Extra variable to add matrix transition instead of left/top position.
					// 4. data-matrix="true"

					// initalRun = first time running function
					// noReisize = removes Reisize from specific class 
					// classN = target the class you dont want to resize
					// returnData = returns data about each static element does not run tween


					var parentView  = $("#mainViewPoint");
					var $bg         = $(".static-bg");

					if(initalRun){
						var speed = 0;	
					}

					var returnObj = [];

					$bg.each(function(i, el){

						if(classN){
							//kill resize on a specific loop. 
							if(noResize && $(el).parent().is("#"+classN)){
								return false;
							}
						}
						
						var imgW = Number($(el).attr("data-img-width"));
						var imgH = Number($(el).attr("data-img-height"));
						var hasMatrix = $(el).attr("data-matrix");
						var pH = parentView.height();
						var pW = parentView.width();

						var imgRatio = imgW > imgH ? (imgH / imgW) : (imgW / imgH);
						var parentRatio = pW > pH ? (pH / pW) : (pW / pH);

						if (  parentRatio > imgRatio ) { //Hight is 100%
							
							$(this).addClass("height-100").removeClass('width-100');
							var imgNewW =  Math.ceil( ( pH / imgH ) * imgW );
							var offSetW = -Math.abs( (imgNewW - pW ) / 2 );

							$(this).attr("data-offset-w", offSetW);
							$(this).attr("data-offSet-h", 0);
							$(this).attr("data-newimg-w", imgNewW);

							if(returnData){
								returnObj[i] = {
									'element' : el,
									'data-offset-w': offSetW,
									'data-offSet-h': 0,
									'data-newimg-w': imgNewW,
									'data-newimg-h': 0
								}
							}else{

								if(hasMatrix){
									TweenMax.to($(this), speed, { 
										transform: "translate("+offSetW+"px, 0px)", 
										width: imgNewW+"px", 
										height: '100%',
										ease: Power4.easeOut 
									});
								}else{
									TweenMax.to($(this), speed, { 
										left:offSetW+"px", top:'0px', 
										width: imgNewW+"px", 
										height: '100%',
										ease: Power4.easeOut 
									});
								}

							}

						} else { //Width is 100%

							$(this).addClass("width-100").removeClass('height-100');
							var imgNewH =  Math.ceil( ( pW / imgW ) * imgH ); 
							var offSetH = -Math.abs( (imgNewH - pH ) / 2 );

							$(this).attr("data-offset-w", 0);
							$(this).attr("data-offSet-h", offSetH);
							$(this).attr("data-newimg-h", imgNewH);

							if(returnData){
								returnObj[i] = {
									'element' : el,
									'data-offset-w': 0,
									'data-offSet-h': offSetH,
									'data-newimg-h': imgNewH,
									'data-newimg-w': 0
								};
							
							}else{

								if(hasMatrix){
									TweenMax.to($(this), speed, { 
										transform: "translate(0px, "+offSetH+"px)", 
										width: imgNewW+"px", 
										height: '100%',
										ease: Power4.easeOut
									});
								}else{
									TweenMax.to($(this), speed, { 
										left:'0px', top:offSetH+"px", 
										height: imgNewH+"px", 
										width: '100%',
										ease: Power4.easeOut
									});
								}

							}
							
						}	

					});//$bg.each


					if(returnData){
						return returnObj;
					}

				};

				return resizeStaticBg;

			}

			return ResizeBgStaticSvc;

});//app
