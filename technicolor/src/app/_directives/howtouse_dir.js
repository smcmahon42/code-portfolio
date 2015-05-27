angular.module('howtoUse',[])
.directive('howtoUse', function($rootScope, $kookies, $state){

	return {
        restrict: 'E',
		replace: true,
		templateUrl: 'app/global_partials/howto.html',
        link: function(scope, el, attr) {

            $rootScope.howToBtn = false;

            var get_hasHowto = function(){
               return $kookies.get('hasHowto');
            };

            var set_hasHowto = function(){
                $kookies.set('hasHowto', 'true', {expires: 365, path: '/'});
            };

            var showHowto = function(){
                TweenMax.to($("#howto"), 1, {opacity: 1, display:'block'});
            };

            var hideHowto = function(){
                TweenMax.to($("#howto"), 1, {opacity: 0, display:'none'});
            };

            var runCheck = function(){

                // if($state.current.name === "intro" || $state.current.name === ""){
                //     return false;
                // }

                if(!get_hasHowto()){
                    //notSet
                    $rootScope.howToBtn = true;
                    showHowto();
                }

            };

            $rootScope.$watch(function(scope){
                if(scope.howToBtn){
                    showHowto();
                }else{
                    hideHowto();
                }
            });

            scope.gotit = function(){
                set_hasHowto();
                hideHowto();
                $rootScope.howToBtn = false;
            };
            
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                runCheck();
            });

            runCheck();

        }
	};

});//app