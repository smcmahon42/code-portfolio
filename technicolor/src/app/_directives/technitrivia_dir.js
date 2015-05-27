angular.module('technitrivia',[])
.directive('technitrivia', function(){
	return {
		replace: true,
		restrict: 'E',
		templateUrl: 'app/global_partials/technitrivia.html',
		controller: 'technitriviaController'
	};

}).controller('technitriviaController', function($scope, StateChangeSvc){

    $scope.rotateTechnitrivia = function () {
    	console.log("rotate TT");
       $scope.stateChange.isTechnitriviaOpen = StateChangeSvc.isMenuTriviaOpen = !$scope.stateChange.isTechnitriviaOpen;
       getTechnitrivia();
    };

    function getTechnitrivia() {
		if ($scope.sections[$scope.currentSection].hasOwnProperty('technitrivia')) {
			$scope.sections[$scope.currentSection].technitrivia.forEach(function (trivia) {
				if (trivia.page === $scope.sections[$scope.currentSection].currentPage)  {
					$scope.currentTechnitrivia = trivia.trivia;
				}
			});
		}
    }
});//app
