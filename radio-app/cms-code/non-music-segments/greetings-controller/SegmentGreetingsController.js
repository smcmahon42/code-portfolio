'use strict';

define(['require', 'app/app'], function(require, app) {

	app.controller('GreetingsSegmentCtrl', function($sce, $scope, apiSvc, $http) {
		var tempId,
			fileDataQueue = {},
			editDataQueue = {};
		$scope.isEditLocked = true;
		$scope.segmentForm = {};
		$scope.segmentEdit = {};
		$scope.segmentDataList = {};
		$scope.displayImage = false;
		$scope.globalOption = {};

		// Global Setting Options ---------------------------------------------------------------------

		$scope.displayGlobalOptions = function(){
			apiSvc.call('get','/affiliates/1')
			.success(function(data, status, headers, config){
			    $scope.globalOption.promoFrequency = data.promoFrequency;
			}).error(function(data){
				alert("displayGlobalOptions: No Data Found");
				return false;
			});
		}

		$scope.editGlobalOptions = function(){
			apiSvc.call('PUT', '/affiliates/1', { data: $scope.globalOption } )
			.success(function(data, status, headers, config){
			}).error(function(data){
				alert("editSegment Title error");
				return false;
			});
		}

		// Add Segment --------------------------------------------------------------------------------

		$scope.resetSegmentDataForm = function(){
			jQuery('form[name="SegmentsUploadForm"]').each(function(){
				this.reset();
			});

			jQuery(".fileUploadWrapper").fadeOut(300, function(){
				jQuery(".uploadTextWrapper").fadeIn(300);
				jQuery("#audiouploadsys, #imageuploadsys").removeClass('uploadFileSuccess');
			});	
		}

		$scope.displaySegmentDatalist = function(){
			apiSvc.call('get','/greetings')
			.success(function(data, status, headers, config){
			    jQuery.each(data, function(){
			    	//$sce clears the media URLs to be used for security purposes.
			    	this.audio_location = $sce.trustAsResourceUrl(this.audio_location);
			    	this.image_location = $sce.trustAsResourceUrl(this.image_location);
			    });
			    $scope.segmentDataList = data;
			}).error(function(data){
				alert("displaySegmentDatalist: No Data Found");
				return false;
			});
		}

		$scope.deleteSegmentData = function(id){
			var c = confirm("Are you sure you want to perminatly delete this data?");
			if(c){
				apiSvc.call('DELETE', '/greetings/'+id)
				.success(function(data, status, headers, config){
					$scope.displaySegmentDatalist();
				}).error(function(data){
					alert("deleteSegmentData error");
					return false;
				});
			}
		}

		$scope.getSegmentDataId = function(id){
			tempId = id;
			if(tempId !== ''){
				jQuery(".uploadTextWrapper").fadeOut(300, function(){
					jQuery(".fileUploadWrapper").fadeIn(300);
					$scope.segmentForm.title = ''; //clear value
					$scope.segmentForm.subtitle = ''; //clear value
				});			
			}else{
				alert("Undfined Segment Id");
				return false;
			}
		}

		$scope.setSegmentData = function(){
			if(Object.keys($scope.segmentForm).length === 2 &&
			  ($scope.segmentForm.title !== undefined && $scope.segmentForm.subtitle !== undefined) && 
			  ($scope.segmentForm.title !== "" && $scope.segmentForm.subtitle !== "") ){

				apiSvc.call('POST', '/greetings', { data: $scope.segmentForm } )
				.success(function(data, status, headers, config){
					$scope.getSegmentDataId(data.id);
				}).error(function(data){
					alert("setSegmentData error");
					return false;
				});
				
			}else{
				alert("Both a Title and Sub-title must be added to continue.");
				return false;
			}
		}

		$scope.updatePublishType = function(e){
			var imageLocation = e.segmentData.image_location,
				audioLocation = e.segmentData.audio_location,
				bool = e.segmentData.is_published,
				id = e.segmentData.id;

			if( imageLocation !== null || audioLocation !== null ){
				bool ? bool = false : bool = true;
				apiSvc.call('PUT', '/greetings/'+id, { data: {"is_published" : bool} } )
				.success(function(data, status, headers, config){
					$scope.displaySegmentDatalist();
				}).error(function(data){
					alert("updatePublishType error");
					return false;
				});
			}else{
				alert("An Audio File needs to be set to this segment in order for it to be published.");
				return false;
			}
		}

		$scope.uploadSegmentFileReset = function(fileType){
			var parentId = fileType+"FileLocation",
			fileId = fileType+"uploadsys",
			duplicateFile = jQuery("#"+parentId).html();
			jQuery("#"+parentId).html('').html(duplicateFile);
			jQuery("#"+fileId).removeClass("uploadFileError uploadFileSuccess");
			delete fileDataQueue[fileType];
		}

		$scope.uploadSegmentFileQueue = function(element){
			var imageTypes = ["jpeg", "jpg", "png", "gif"],
			mediaType = element.id.split("uploadsys").shift(),
			mediaExtension = element.value.split(".").pop();

			if(mediaType === "image"){
				if(jQuery.inArray(mediaExtension,imageTypes) > -1){
					addtoQue();
				}else{
					jQuery("#"+element.id).addClass('uploadFileError');
					alert("Upload Error: Please make sure you image format is either a .jpg, .png, or .gif");
					return false;
				}
			}else{
				if(mediaExtension === "mp3"){
					addtoQue();
				}else{
					jQuery("#"+element.id).addClass('uploadFileError');
					alert("Upload Error: Please make sure you audio format is .mp3");
					return false;
				}
			}

			function addtoQue() {
				var fd = new FormData();
				var file=element.files[0];
				fd.append("file", file);
				fileDataQueue[mediaType] = fd;
				jQuery("#"+element.id).removeClass('uploadFileError');
				jQuery("#"+element.id).addClass('uploadFileSuccess');
			}
		}

		$scope.uploadSegmentFile = function(){
			if(Object.keys(fileDataQueue).length > 0){
				for(var mediaType in fileDataQueue){
					$http.put(api_base+'/greetings/'+tempId+'/upload/'+mediaType, fileDataQueue[mediaType], {
						headers: {'Content-Type': undefined,token: apiSvc.authToken },
						transformRequest: angular.identity
					}).success(function(){
						$scope.displaySegmentDatalist();
						$scope.resetForm();
					}).error(function(data){
						alert("uploadSegmentFile error");
						return false;
					});
				}
			}else{
				alert("You must add an audio file to finish the process.");
				return false;
			}
		}

		// Edit Segments --------------------------------------------------------------------------------
		

		$scope.editSegmentFileReset = function(element, fileType){
			var elementReset = jQuery(element).parent().find('span'),
				duplicateFile = jQuery(elementReset).html();

			jQuery(elementReset).html('').html(duplicateFile);
			jQuery(elementReset).children().removeClass("uploadFileError uploadFileSuccess");
			delete fileDataQueue[fileType];
		}

		$scope.editRowBtn = function(){
			jQuery(document).off("click", ".segment-editBtn")
			.on("click", ".segment-editBtn", function(){
				var that = jQuery(this);
				
				if(!$scope.isEditLocked && that.attr("name") !== 'unlocked'){ return false; }
				if(that.next().is(":hidden")){
					jQuery(".segment-editBtn").attr("name", 'locked');
					that.attr("name", 'unlocked').next().slideDown('300');
					$scope.isEditLocked = false;
				}else{
					that.next().slideUp('300');
					$scope.isEditLocked = true;
				}
			});
		}

		$scope.editSegmentFileQueue = function(element){
			var imageTypes     = ["jpeg", "jpg", "png", "gif"],
				mediaType      = element.className.split("uploadsys").shift(),
				mediaExtension = element.value.split(".").pop();

			if(mediaType === "image"){
				if(jQuery.inArray(mediaExtension,imageTypes) > -1){
					addtoEditQue();
				}else{
					jQuery(element).addClass('uploadFileError');
					alert("Upload Error: Please make sure you image format is either a .jpg, .png, or .gif");
					return false;
				}
			}else{
				if(mediaExtension === "mp3"){
					addtoEditQue();
				}else{
					jQuery(element).addClass('uploadFileError');
					alert("Upload Error: Please make sure you audio format is .mp3");
					return false;
				}
			}

			function addtoEditQue() {
				var fd = new FormData(),
					file=element.files[0];
				fd.append("file", file);
				editDataQueue[mediaType] = fd;
				jQuery(element).removeClass('uploadFileError');
				jQuery(element).addClass('uploadFileSuccess');
			}
		}

		$scope.editSegment = function(thisRow, element){
			var titlesObj = {},
				RowId = thisRow.segmentData.id;

			if(thisRow.segmentData.title !== ''){ titlesObj['title'] = thisRow.segmentData.title; }
			if(thisRow.segmentData.subtitle !== ''){ titlesObj['subtitle'] = thisRow.segmentData.subtitle; }
			if(titlesObj.title || titlesObj.subtitle){
				apiSvc.call('PUT', '/greetings/'+RowId, { data: titlesObj } )
				.success(function(data, status, headers, config){
					$scope.displaySegmentDatalist();

				}).error(function(data){
					alert("editSegment Title error");
					return false;
				});
			}

			for(var mediaType in editDataQueue){
				$http.put(api_base+'/greetings/'+RowId+'/upload/'+mediaType, editDataQueue[mediaType], {
					headers: {'Content-Type': undefined,token: apiSvc.authToken },
					transformRequest: angular.identity
				}).success(function(data){
					$scope.displaySegmentDatalist();
				}).error(function(data){
					alert("editSegment File error");
					return false;
				});
			}

			$scope.isEditLocked = true;
		}

		// Init fuctions --------------------------------------------------------------------------------

		$scope.displayGlobalOptions();
		$scope.displaySegmentDatalist();
		$scope.editRowBtn();

	});//app

		// Filter to change object into arrays for ordering by ID ---------------------------------------
		app.filter('orderObjectBy', function() {
			return function(items, field, reverse) {
				var filtered = [];
				angular.forEach(items, function(item) {
				filtered.push(item);
			});
			filtered.sort(function (a, b) {
				return (a[field] > b[field]);
			});
			if(reverse) filtered.reverse();
				return filtered;
			};
		});

});







