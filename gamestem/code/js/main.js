//ipad rotate resize
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
  var viewportmeta = document.querySelector('meta[name="viewport"]');
  if (viewportmeta) {
    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
    document.body.addEventListener('gesturestart', function() {
      viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// Scalled Background image for all devices
$(window).load(function() {    
	var theWindow   = $(window),
	    $bg         = $("#bg"),
	    aspectRatio = $bg.width() / $bg.height();
	function resizeBg() {
		if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
		    $bg.removeClass().addClass('bgheight');
		} else {
		    $bg.removeClass().addClass('bgwidth');
		}
	}
	theWindow.resize(resizeBg).trigger("resize");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

$(function(){
	
	//Makes the 3 lines in the top bart of the bar
	$(".topdrop").html("<div></div><div></div><div></div>");
	
	//Main Drop Downs 
	$(".bottomdrop, .topdrop").bind("click touch", function(){
		var target = $(this).parent().attr("id");

		if($(this).parent().attr("class") == "down"){
			
			//iPad fadeOut to mask ios issue;
			$("#"+target).children().each(function(index){
				if(index == 1){ $(this).fadeOut(300); }
			});
			
			$("#"+target+" > .definition").slideUp(300, function(){
				$("#"+target+" > .bottomdrop").removeAttr( 'style' );
			});
			
			$(this).parent().removeClass("down");
			//:after triangles hide show
			$("#"+target+'> .bottomdrop').removeClass().addClass('bottomdrop');
			$("#"+target+'> .topdrop').removeClass().addClass('topdrop ' + 'none');
			
		}else{
			$("#"+target+" > .definition").slideDown(300, function(){
				$("#"+target+" > .bottomdrop").css({
				'color':'#01CCFF','text-shadow':'0px -1px 25px rgba(1, 255, 255, 1)'});
			})
			//iPad fadeIn to mask ios issue;
			$("#"+target).children().each(function(index){
				if(index == 1){ $(this).fadeIn(300); }
			});
			$(this).parent().addClass("down");
			//:after triangles hide show
			$("#"+target+'> .topdrop').removeClass().addClass('topdrop');
			$("#"+target+'> .bottomdrop').removeClass().addClass('bottomdrop ' + 'none');
		}
		
	});
	
	//Secondary Drop Downs inside definition class tags
	$("li > span").bind("click touch", function(){ secDropDown(this); });
	
	function secDropDown(drop){
		
		var liClass = $(drop).parent().attr("class");
		var liTarget = $("."+liClass+" > ul");
		
		var splitClass = liClass.split("_");
		var classNumber = splitClass[0].replace("c", "");
		var whichDrop = "#drop"+classNumber;
		var cUl = new RegExp("^c"+classNumber+"_");
		
		$("ul").each(function(){
			if(cUl.test($(this).parent().attr("class"))
			&&  $(this).attr("class") == "down"
			&&  $(this).parent().attr('class') != liClass)
			{
				
				$(this).fadeOut(300);
				$(this).slideUp(300);
				$(this).removeClass("down");
				$(this).prev("span").css('color', 'rgba(255, 255, 255, 0.5)');
			}
		});
		
		setTimeout(function(){ 
			if(liTarget.attr("class") != "down"){
				$(drop).css('color','#FFF');
				liTarget.slideDown(300);
				liTarget.fadeIn(300);
				liTarget.addClass("down");
			}
		 },350);

	}
	
	//First Drop Down open up on load of page inside definition class tags
	$(".definition").each(function(index){
		var classIndex = index + 1;
		$(".c"+classIndex+"_1 > span").css('color','#FFF');
		$(".c"+classIndex+"_1 > ul").css("display", "block").attr("class", "down");
	});

	// Check and Uncheck checkbox and text
	$("ul[name='level2'] > li").bind("click touch", function(){
		if($(this).children("input").attr("checked") == "checked"){
			$(this).children("img").attr("src", "img/checkOff.png");
			$(this).children("input").removeAttr("checked");
			$(this).animate({
				color: jQuery.Color("rgba(255, 255, 255, 0.5);") }, 300, function(){
				$(this).removeAttr("style");
			} );
		}else{
			$(this).children("img").attr("src", "img/checkOn.png");
			$(this).children("input").attr("checked", "checked");
			$(this).animate({
				color: jQuery.Color("#FFF")
			}, 300 );
		}
	});
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//Anaylize Button funciton / Animation 
	$("#analyzeBtn").bind("click touch", function(){
		$("#form-filter").fadeOut(300, function(){
			$("#analyzewrap").animate({"bottom":"0px"}, 2000, "swing", function(){
				//start animation
				var blink = setInterval(function(){animateBlink()},100);
				//stop animation
				setTimeout(function(){ clearInterval(blink);},5000);
				setTimeout(function(){ showWordLinks(); },5500);
			});
			$("#words, #wordbar").fadeIn(500);
		});
	});
	
			//Animate Processing Blinking of Words
			function animateBlink(){
				var lastNum = $("#words > span:last").attr("name");
				var numRand = Math.floor(Math.random()*lastNum);
				$("#words > span[name='"+numRand+"']").animate({ color: jQuery.Color("#0182b7") }, 100, function(){
					$("#words > span[name='"+numRand+"']").delay(1500).animate({ color: jQuery.Color("#444444") }, 300 );
				});
			}
			
			//Animate Analyzing flashing
			function showWordLinks(){
				$("#analyzewrap").animate({"bottom":"0px"}, 1000, "swing", function(){
					$("#emailBtn").show(800, function(){
						$("#emailBtn > img, #emailBtn > span").fadeIn(350);
					});
					$("#analyzeBtn").fadeOut(400);
					
					$("#words > span[class='true']").animate({ color: jQuery.Color("#FFF") }, 1000);
				});
			}

/////////////////////////////////////////////////////////////////////////////////////////////////////////	

	//Click word displayed
	$("#words > span[class='true']").bind("click touch", function(){
		//add the deffintion to the definition box
		var wordId = $(this).attr("id");
		$("#defTitle").append($(this).html());
		$("#defBody").append($("#defStorage > ."+wordId).html()); 
		$("#definition").animate({ position:"relative", top: "120px"}, 700);
		$("#coverWords").css({display: "block", height: "70%"});
	});
	
	//Close Button
	$("#definition > #closeBtn").bind("click touch", function(){ closeBtn(); });
	function closeBtn(){
		$("#coverWords").css({display: "none", height: "0%"});
		$("#definition").animate({ position:"relative", top: "1000px"}, 700, function(){
			$("#defTitle").html("");
			$("#defBody").html("");
			$(this).delay(500).removeAttr("style");
		});
	}
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	//Button Links
	$("#homeBtn").bind("click touch", function(){
		window.location = "../";
	});
	
	$("#emailBtn").bind("click touch", function(){ 
		$("#emailwrap").animate({ top: "100px" }, 700); 
	});
	
	$("#emailwrap > #closeBtn").bind("click touch", function(){ 
		$("#emailwrap").animate({ top: "1000px" }, 700); 
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

	//Reset Button
	$("#resetBtn > img").bind("click touch", function(){
		//Reset all ul Dropdowns	
			$("ul").each(function(){
				var initClass = $(this).attr("class");
				if(initClass == "down"){
					var collapsUl = $(this).prev();//span
					$(this).slideUp(300);
					$(this).fadeOut(300);
					$(this).removeClass("down");
					collapsUl.css('color', 'rgba(255, 255, 255, 0.5)');
				}
			}); 
		//uncheck all checkboxes 
			$("input[type='checkbox']").removeAttr("checked");
			$("ul[name='level2'] > li").removeAttr("style");
			$("img[id^='tick_img_criteria']").attr("src", "img/checkOff.png");
		//Close all Ul's except the first
			if($("#definition").attr("style") != undefined){ closeBtn(); }
		//Make sure Definition pop up is in the closed position
			$("#words, #wordbar").fadeOut(500, function(){
				//Show Selection lists
				$("#form-filter").fadeIn(300);
			});
		//Make sure the words that have links fade to gray and the wordwrap div closes
			$("span.true").animate({ color: jQuery.Color("#444") }, 1000, function(){
				$("span.true").removeAttr("style");
			});
		//hide email button
			var emailstatus = $("#emailBtn").attr("style");
			if(emailstatus == "display: block;"){
				$("#emailBtn > img, #emailBtn > span").fadeOut(300, function(){
					$("#emailBtn").hide(350);
				});
			}
		//Fade In Analyze Btn
		$("#analyzeBtn").fadeIn(350);
		//Fade Out Email Btn
		$("#emailBtn > img, #emailBtn > span").fadeOut(800, function(){
			$("#emailBtn").hide(350);
		});
		
		//Slide Main dropdowns up
		$(".definition").each(function(index){
			var target = $(this).parent().attr("id");
			if($(this).parent().attr("class") == "down"){
				$("#"+target+" > .definition").slideUp(300, function(){
					$("#"+target+" > .bottomdrop").removeAttr( 'style' );
				});
				//iPad fadeOut to mask ios issue;
				$("#"+target).children().each(function(index){
					if(index == 1){ $(this).fadeOut(300); }
				});
				$(this).parent().removeClass("down");
				//:after triangles hide show
				$("#"+target+'> .bottomdrop').removeClass().addClass('bottomdrop');
				$("#"+target+'> .topdrop').removeClass().addClass('topdrop ' + 'none');
			}
		}); 
		
	});
	
});
