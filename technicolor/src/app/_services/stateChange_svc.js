angular.module('StateChangeSvc', [])
	.service('StateChangeSvc', function ( $rootScope, $location, RequestJsonSvc ) {

			var StateChange = {};

			//Check to see if the main menu should be open or closed
			StateChange.isMenuOpen = false;
			StateChange.isMenuTriviaOpen = false;

			StateChange.chapters   = RequestJsonSvc.chapters
			StateChange.chapterMap = RequestJsonSvc.chapterMap;

			//Global track ui-router state parameter id
			StateChange.uiState = {
				toParamId : '',
				fromParamId : '',
				toChapter : '',
				fromChapter : ''
			}

			//Global footer message
			StateChange.chapterMsg = {
				chapter : "",
				section : ""
			};

			StateChange.setChapterMsgInit = function(){

				if ($location.path() == "") { return false; }

				var res = $location.path().split("/");
				
				if(res[1] == "intro"){ 
					StateChange.uiState.toChapter = "intro"
					return false;
				} //skip since this is the intro seciton.

				StateChange.chapterMsg.chapter = StateChange.chapters[res[1]].chapterShortName;
				StateChange.uiState.toChapter  = res[1];
				StateChange.uiState.toParamId = res[2];
				
				if(res[2] == "init" || res[2] == "" || res[2] == undefined){
					StateChange.chapterMsg.section = "";
				}else{
					StateChange.chapterMsg.section = StateChange.chapters[res[1]].objSections[res[2]];
				}
			};

			StateChange.setChapterMsg = function (pId, toState){
				if(toState.name == "intro"){ // intro section gets no footer names
					StateChange.chapterMsg.chapter = "";
					StateChange.chapterMsg.section = "";
				}else{
					StateChange.chapterMsg.chapter = RequestJsonSvc.chapters[toState.name].chapterShortName;
					StateChange.chapterMsg.section = StateChange.uiState.toParamId == "init" ? "" :  RequestJsonSvc.chapters[toState.name].objSections[pId];
				}
			};

			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
				//Adds state parameter id so we can track active state of 
				StateChange.uiState.toParamId = toParams.id;
				StateChange.uiState.fromParamId = fromParams.id;
				//Adds state name so we can track active state of chapter
				StateChange.uiState.toChapter = toState.name;
				StateChange.uiState.fromChapter = fromState.name;
				//removes main menu when a link is clicked and the stat changes.
				StateChange.isMenuOpen = false;
				StateChange.isMenuTriviaOpen = false;
				//change footer display
				StateChange.setChapterMsg(StateChange.uiState.toParamId, toState);
			});

			StateChange.setChapterMsgInit();

			return StateChange;

});//app
