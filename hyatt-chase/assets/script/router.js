	var Page = {
		current : null,
		data : null,
		pageName : null,
		gameplayCount : null
	};

(function ($){
	
	$.fn.router = function(func, isInit, routName, fadeDelay, fadeTime) {
		fadeDelay = fadeDelay === 'undefined' ? 700 : fadeDelay;
		fadeTime = fadeTime === 'undefined' ? 300 : fadeDelay;

		if(routName === undefined || routName ===  ''){ routName = null; }
		var hashUrl = window.location.hash,
			pName = '',
			response = '';
		
		if(isInit){ 
			Page.gameplayCount = 0;
			if(hashUrl !== ''){ //hash tag load
				pName = hashUrl.split('#/');
				Page.pageName = pName[1];
			}else{ // home page load
				Page.prev = Page.current = Page.pageName = "intro";
			}
			
		}else{
			if(routName !== null){
				Page.pageName = routName;
			}else{
				Page.pageName = this.attr("goto");
			}
		}
		
		function runFadeIn(){ 
			//console.log("fadein "+Page.pageName);
			$("#"+Page.pageName).addClass("current").delay(fadeDelay).fadeIn(fadeTime); 
		}
		
		$.ajax({
			type: 'GET',
			url: 'pages/'+Page.pageName+'.php',
			success: function(data, textStatus, jqXHR){
				Page.data = data;
			},
			beforeSend: function(){
				//console.log("show load img");
				
			},
			complete: function(xhr, textStatus){
				//console.log("hide load img");
				
				$("#"+Page.pageName).html(Page.data);
				
				//console.log("Page.gameplayCount "+Page.gameplayCount);
				if(!isInit){
					if(Page.current === "gamePlay" && Page.gameplayCount === 1){
						$("#"+Page.current).fadeIn(300);
						runFadeIn(); 
					}else{
						$("#"+Page.current).removeClass("current").fadeOut(300, function(){ runFadeIn(); });
					}
					
				}else{
					$("#"+Page.pageName).addClass("current").fadeIn(300); 
				}
				
				Page.current = Page.pageName;
				if(func !== undefined){ func(); }
				return this;
				
			
			}
		});
		
		if(Page.pageName === "gamePlay"){Page.gameplayCount++}
		//console.log(Page.current);
		//console.log(Page.pageName);

	};
	
	
	//add commas to hundreds and thousands places
	$.fn.digits = function(){ 
	    return this.each(function(){ 
	        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
	    })
	};
	
}(jQuery));


