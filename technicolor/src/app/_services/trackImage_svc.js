angular.module('TrackImgSvc', [])
	.service('TrackImgSvc', function (TweenMax) {

			var TrackImgSvc = {};

			TrackImgSvc.init = function(){

				var trackImagePosition = function(objArg){

					this.mainElement = objArg.thisInstance;
					this.resizeBg = objArg.resizeInstance;
					this.isStatic = objArg.isStatic;

					//Get Container Info
					this.$container_h = $("#mainViewPoint").height();
					this.$container_w = $("#mainViewPoint").width();

					//Get Image Info
					this.$image = this.mainElement.find(".track-image");
					var self = this;

					//Run Mouse Enter Leave Actions to initalize
					this.run = function(){
						this.mainElement.on("mouseenter", function(){

							self.$container_h = $("#mainViewPoint").height();
							self.$container_w = $("#mainViewPoint").width();
							self.$image = self.mainElement.find(".track-image");
							
							//check if element had text-shadow data-opacity attributes
							if(self.mainElement.find(".text-shadow").attr("data-opacity")){
								self.$textShadow = self.mainElement.find(".text-shadow");
								self.$textShadowOpacity = self.$textShadow.attr("data-opacity");
							}else{
								self.$textShadow = false;
							}
	
							if(!self.$image){return false;}
							
							//check if $image is undefinded
							if(self.$image.offset()){
								self.$image_t = Math.floor(self.$image.offset().top);
								self.$image_l = Math.floor(self.$image.offset().left);
							}else{
								self.$image_t = 0;
								self.$image_l = 0;
							}

							self.trackContainter(self, $(this));

						});
						this.mainElement.on("mouseleave", function(){
							self.untrackContainter(self);
						});
					};

					this.trackContainter = function(parent, $jparent){

						//true if width-100, false if height-100
						var $isWidth100 = $jparent.find(".track-image").hasClass('width-100');

						var runCalc = function(imgX, imgY){

							var ratioW = Math.abs(parent.$image_l * 2) / parent.$container_w;	
							var newPostionW = -Math.abs(Math.floor(imgX * ratioW));

							var ratioH = Math.abs(parent.$image_t * 2) / parent.$container_h;	
							var newPostionH = -Math.abs(Math.floor(imgY * ratioH));

							if( 
								Math.abs(newPostionW) > Math.abs(parent.$image.attr("data-offset-w") * 2) ||
								Math.abs(newPostionH) > Math.abs(parent.$image.attr("data-offset-h") * 2)
							){
								return false;
							}else{

								TweenMax.killTweensOf(parent.$image);
								
								TweenMax.to(parent.$image, 4, { 
									transform: 'translate('+newPostionW+'px, '+newPostionH+'px)',
									ease: Power3.easeOut
								}); 
	
								fadeOutShadow();
								
							}
						};//runCalc

						var runCalc_w = function(imgX){
							//top will be divided by  container height to make ratio
							//ratio will be ratio == 1pixel motion
							var container_half = Math.floor(parent.$container_w / 2);
							var ratio = Math.abs(parent.$image_l) / container_half;	
							var newPostion = -Math.abs(Math.floor(imgX * ratio));
							TweenMax.killTweensOf(parent.$image);
							TweenMax.to(parent.$image, 2, { left: newPostion}); 

							fadeOutShadow();

						};//runCalc_w

						var runCalc_h = function(imgY){
							//top will be divided by  container height to make ratio
							//ratio will be ratio == 1pixel motion
							var container_half = Math.floor(parent.$container_h / 2);
							var ratio = Math.abs(parent.$image_t) / container_half;
							var newPostion = -Math.abs(Math.floor(imgY * ratio));

							TweenMax.killTweensOf(parent.$image);
							TweenMax.to(parent.$image, 2, { top: newPostion});

							fadeOutShadow();

						};//runCalc_h

						var fadeOutShadow = function(){

							//Fade out text shadow
							var fadeShadowIn = function(){
								TweenMax.to(parent.$textShadow, 1, {backgroundColor: 'rgba(0,0,0,'+parent.$textShadowOpacity+')'}); 
							};
							
							if(self.$textShadow){
								TweenMax.killTweensOf(parent.$textShadow);
								TweenMax.to(parent.$textShadow, 1.5, {backgroundColor: 'rgba(0,0,0,0.0)', onComplete:fadeShadowIn}); 
							}

						};

						$jparent.on("mousemove", function(e){
							
							if(parent.isStatic){
								if( $isWidth100 ){ runCalc_h(e.pageY); }else{ runCalc_w(e.pageX); }
							}else{
								runCalc(e.pageX, e.pageY);	
							}

						});

					};//trackContainter

					this.untrackContainter = function(parent){
						$(this).off("mousemove");
						self.resizeBg(false, false, false, 4);

						//Fade in text shadow
						if(self.$textShadow){
							TweenMax.killTweensOf(self.$textShadow);
							TweenMax.to(self.$textShadow, 1, {backgroundColor: 'rgba(0,0,0,'+self.$textShadowOpacity+')'}); 
						}

					};

				};

				return trackImagePosition;

			};

			return TrackImgSvc;

});//app