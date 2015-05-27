angular.module('ResizeBgSvc', [])
	.service('ResizeBgSvc', function (TweenMax) {

			var ResizeBgSvc = {}

			ResizeBgSvc.init = function(){

				var resizeBg = function  (initalRun, noResize, classN, speed) {

					//To Work each element needs 3 things
					// 1. class="full-bg" 
					// 2. data-img-width="700" 
					// 3. data-img-height="394"

					// initalRun = first time running function
					// noReisize = removes Reisize from specific class 
					// classN = target the class you dont want to resize

					var parentView    = $("#mainViewPoint");
					var $bg           = $(".full-bg");
					var hiddenPercent = 25;

					if(initalRun){
						var speed = 0;	
					}

					$bg.each(function(i, el){

						if(classN){
							//kill resize on a specific loop. 
							if(noResize && $(el).parent().is("#"+classN)){
								return false;
							}
						}
						
						var imgW = $(el).attr("data-img-width");
						var imgH = $(el).attr("data-img-height");
						var pH = parentView.height();
						var pW = parentView.width();

						var imgRatio = imgW > imgH ? (imgH / imgW) : (imgW / imgH);
						var parentRatio = pW > pH ? (pH / pW) : (pW / pH);

						if (  parentRatio > imgRatio ) { //Hight is 100%
							$(this).addClass("height-100").removeClass('width-100');

							var imgNewW =  Math.ceil( ( pH / imgH ) * imgW );
							var imgWPercentIncrease = Math.floor((hiddenPercent / 100) * imgNewW) + imgNewW;
							var imgHPercentIncrease = Math.floor((hiddenPercent / 100) * pH) + pH;
							var offSetW = -Math.abs( (imgWPercentIncrease - pW ) / 2 );
							var offSetH = -Math.abs( (imgHPercentIncrease - pH ) / 2 );

							$(this).attr("data-offset-w", offSetW);
							$(this).attr("data-offSet-h", offSetH);

							TweenMax.to($(this), speed, { 
								transform: "matrix(1, 0, 0, 1, "+offSetW+", "+offSetH+")", 
								width: imgWPercentIncrease+"px", 
								height: imgHPercentIncrease+"px",
								ease: Power4.easeOut
							});

						} else { //Width is 100%
							$(this).addClass("width-100").removeClass('height-100');

							var imgNewH =  Math.ceil( ( pW / imgW ) * imgH ); 
							var imgHPercentIncrease = Math.floor((hiddenPercent / 100) * imgNewH) + imgNewH;
							var imgWPercentIncrease = Math.floor((hiddenPercent / 100) * pW) + pW;
							var offSetH = -Math.abs( (imgHPercentIncrease - pH ) / 2 );
							var offSetW = -Math.abs( (imgWPercentIncrease - pW ) / 2 );

							$(this).attr("data-offset-w", offSetW);
							$(this).attr("data-offSet-h", offSetH);
							
							TweenMax.to($(this), speed, { 
								transform: "matrix(1, 0, 0, 1, "+offSetW+", "+offSetH+")", 
								width: imgWPercentIncrease+"px", 
								height: imgHPercentIncrease+"px",
								ease: Power4.easeOut
							});
						}	
					});

				};

				return resizeBg;

			}

			return ResizeBgSvc;

});//app