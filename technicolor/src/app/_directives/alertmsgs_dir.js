angular.module('alertMsgs',[])
.directive('alertMsgsModal', function($rootScope){

	return {
        restrict: 'E',
		replace: true,
		templateUrl: 'app/global_partials/alertmsg.html',
        link: function(scope, el, attr) {

            var deviceType = '';
            
            function mobileRedirect(){

                if(
                    (navigator.userAgent.match(/iPhone|iPod/i)) || 
                    (navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Mobile/i)) || 
                    (navigator.userAgent.match(/Windows/i) && navigator.userAgent.match(/Phone/i)) || 
                    (navigator.userAgent.match(/BlackBerry/i)) || 
                    (navigator.userAgent.match(/IEMobile/i))
                ){
                    return 'phone';
                }

                if(
                    (navigator.userAgent.match(/iPad/i)) || 
                    (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i)) || 
                    (navigator.userAgent.match(/Windows/i) && navigator.userAgent.match(/ARM/i)) ||
                    (navigator.userAgent.match(/Windows/i) && navigator.userAgent.match(/WOW64/i) && navigator.userAgent.match(/Touch/i))
                ){
                    return 'tablet';
                } 

                return 'desktop';

            }

            function resizeLandscape(){
                if(deviceType === 'tablet'){

                    if($(window).width() < $(window).height()){
                        $(".isPortrait").fadeIn(0, function(){
                            $(".deviceAlerts").fadeIn(300);
                        });
                        
                    }else{
                        $(".deviceAlerts").fadeOut(0, function(){
                            $(".isPortrait").fadeOut(0);
                        });
                    }

                }

            }

            function init(){

                deviceType = mobileRedirect();
                
                $rootScope.deviceType = deviceType;

                if(deviceType === 'phone'){
                    $(".isPhone").fadeIn(0, function(){
                        $(".deviceAlerts").fadeIn(100);
                    });
                }

                if(deviceType === 'tablet'){
                    resizeLandscape();
                }

                if(navigator.userAgent.match(/iPad/i)){
                    $("head").append('<link rel="stylesheet" type="text/css" media="all" href="css/ipad.css" />');
                }
                if(navigator.userAgent.match(/Windows/i)){
                    $("head").append('<link rel="stylesheet" type="text/css" media="all" href="css/ie.css" />');
                }

            }

            init();

            $( window ).resize(function() {
              resizeLandscape();
            });
    
        }
	};

});//app