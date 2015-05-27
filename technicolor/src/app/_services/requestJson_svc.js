angular.module('RequestJsonSvc', [])
	.service('RequestJsonSvc', function ( $rootScope, $http, $q ) {

		var RequestJsonSvc = {};

		RequestJsonSvc.rawData = [{

			"empower" : {
				"orderNumber" : 0,
				"chapterFullName" : "Empowering Storytelling/Protecting & Delivering Creative Intent",
				"chapterShortName" : "Empowering Storytelling",
				"chapterUrlName" : "empower",
				"sections" : [
					{ "link" : "empower-next", "text" : "The Next Chapter in Storytelling"},
					{ "link" : "empower-gaming", "text" : "Gaming"},
					{ "link" : "empower-advertising", "text" : "Advertising"},
					{ "link" : "empower-animation", "text" : "Animation"},
					{ "link" : "empower-sound", "text" : "Sound"},
					{ "link" : "empower-picture", "text" : "Picture"},
					{ "link" : "empower-vfx", "text" : "Visual Effects"}
				]
			},

			"colorstory" : {
				"orderNumber" : 1,
				"chapterFullName" : "The Color Story",
				"chapterShortName" : "The Color Story",
				"chapterUrlName" : "colorstory",
				"sections" : [
				    { "link" : "colorstory-future", "text" : "Future"},
					{ "link" : "colorstory-science", "text" : "Color Science & Technology"},
					{ "link" : "colorstory-history", "text" : "History"}
				]
			},

			"innovators" : {
				"orderNumber" : 2,
				"chapterFullName" : "Entertainment Technology Leaders & Innovators",
				"chapterShortName" : "Leaders & Innovators",
				"chapterUrlName" : "innovators",
				"sections" : [
					{ "link" : "innovators-technology-licensing-patents", "text" : "Technology Licensing and Patents"},
					{ "link" : "innovators-standards", "text" : "Industry Standards"},
					{ "link" : "innovators-digital-encoding", "text" : "Three Core Research Areas"}
				]
			},

			"homebeyond" : {
				"orderNumber" : 3,
				"chapterFullName" : "Home & Beyond",
				"chapterShortName" : "Home & Beyond",
				"chapterUrlName" : "homebeyond",
				"sections" : [
					{ "link" : "homebeyond-distribution", "text" : "Distribution"},
					{ "link" : "homebeyond-gateways", "text" : "Gateways/Set-top Boxes"},
					{ "link" : "homebeyond-digital-home", "text" : "Connected Home & Digital Life"},
					{ "link" : "homebeyond-entertainment", "text" : "Home Entertainment"}
				]
			},

			"talent" : {
				"orderNumber" : 4,
				"chapterFullName" : "Talent",
				"chapterShortName" : "Talent",
				"chapterUrlName" : "talent",
				"sections" : [
					{ "link" : "talent-creative", "text" : "Creative"},
					{ "link" : "talent-technology", "text" : "Technology"},
					{ "link" : "talent-all", "text" : "All"}
				]
			},

			"fin" : {
				"orderNumber" : 5,
				"chapterFullName" : "Fin",
				"chapterShortName" : "Fin",
				"chapterUrlName" : "fin",
				"sections" : []
			}

		}];

		RequestJsonSvc.chapters = {};
		RequestJsonSvc.chapterMap = [];

		RequestJsonSvc.makeChapters = function(){

			var data = RequestJsonSvc.rawData[0];
			
			//make chapters
			for(prop in data){
				var newSections = {};
				for (var i = 0; i < data[prop].sections.length; i++) { //empower sections
					newSections[ data[prop].sections[i]['link'] ] = data[prop].sections[i]['text'] //empower sections data
				};
				data[prop]['objSections'] = newSections;
			}

			//make chapter Map
			for(pos in data){
				RequestJsonSvc.chapterMap[data[pos]["orderNumber"]] = data[pos];
			}

			RequestJsonSvc.chapters = data;

		}();	

		return RequestJsonSvc;

});//app
