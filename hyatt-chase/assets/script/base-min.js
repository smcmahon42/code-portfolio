function initApp(){function c(){window.location=location.origin+"/mobile/?id="+App.Storage.hgp_id}function d(){App.Storage.reveal_part=1,App.Storage.reveal_section=1,App.Storage.reveal_id=App.Storage.trunks>=1&&1===App.Storage.playerStatus?1:App.Storage.trunks<1&&1===App.Storage.playerStatus?3:2,$(document).router(function(){var a=null;if(3===App.Storage.trunks&&(a=7),2===App.Storage.trunks&&(a=24),(1===App.Storage.trunks||0===App.Storage.trunks)&&(a=40),0!==App.Storage.trunks)for(var b=1;b<=App.Storage.trunks;b++)$(".trunkWrap > .trunk"+b).fadeIn(0);$(".exp"+App.Storage.reveal_id).fadeIn(0),$(".trunkWrap > .trunk1").css({marginLeft:a+"%"}),App.Storage.trunks>1&&$(".plural").fadeIn(0),$(".hgpn").html(App.Storage.hgp_id),2!==App.Storage.reveal_id?($(".backBtn:eq(1)").fadeTo(300,.35),$(".forwardBtn:eq(1)").fadeTo(300,1).on("click",function(){e()})):($("#reveal .infoLeft").html("Replay The Game").fadeTo(0,1),$("#reveal .infoRight").html("Book Now").fadeTo(0,1),$("#reveal .bg1").fadeTo(300,.5),$("#reveal .bg2").fadeTo(0,0),$(".backBtn:eq(1)").fadeTo(300,1).on("click",function(){c()}),$(".forwardBtn:eq(1)").fadeTo(300,1).on("click",function(){window.open("http://www.hyatt.com/hyatt/index.jsp")}))},!1,"reveal",0,200)}function e(){if($("#revealBtnFwd").off("click"),$("#revealBtnBack").off("click"),$(".part"+App.Storage.reveal_section+"of1").fadeOut(300),App.Storage.reveal_section++,$(".part"+App.Storage.reveal_section+"of1").delay(300).fadeIn(300),App.Storage.reveal_section<3)return $("#revealBtnFwd").fadeTo(300,1).on("click",function(){e()}),void 0;if(3===App.Storage.reveal_section){if($(".trunkWrap > .trunk1, .trunkWrap > .trunk2, .trunkWrap > .trunk3").fadeOut(300),$("#reveal .bg1").fadeOut(300),$(".infoLeft").html("Replay The Game"),$("#revealBtnBack").on("click",function(){c()}),1===App.Storage.reveal_id){var a=App.Storage.trunks-1,d=App.Storage.trunks>1?"Open The Trunks":"Open The Trunk";$(".infoRight").html(d).fadeTo(300,1),$(".infoLeft").fadeTo(300,1),$("#revealBtnFwd").on("click",function(){b.getPrize(App.Storage.hgp_id,a,function(){for(var a=0,b=0;b<App.Storage.prizes.length;b++)$(".open"+b).fadeIn(0,function(){$(this).attr("name",App.Storage.prizes[b]),$(this).children(".offer").html(App.prizeObj[App.Storage.prizes[b]].confirmtitle)}),$(".open"+b+" .pin, .open"+b+" .offer, .open"+b+" .tk").on("click",function(){App.Storage.selected_prize=$(this).parent().attr("name"),g()}),$(".open"+b+" a").attr("href","rules.php#r"+App.Storage.prizes[b]);(1===App.Storage.prizes.length||0===App.Storage.prizes.length)&&(a=36),2===App.Storage.prizes.length&&(a=19),3===App.Storage.prizes.length&&(a=5),$(".part2 > .open0").css({marginLeft:a+"%"}),f()})})}3===App.Storage.reveal_id&&($(".infoRight").html("View Reward"),$("#revealBtnFwd").on("click",function(){b.defaultPrizeRegister(App.Storage.hgp_id,function(){}),h(1)})),$(".forwardBtn:eq(1), .backBtn:eq(1), .infoRight, .infoLeft").fadeTo(300,1)}}function f(a){p(),void 0!==a&&"back"===a?($("#reveal .controlsWide").fadeOut(300),$("#reveal .part3").fadeOut(300,function(){$("#reveal .part2").fadeIn(300)})):($("#reveal .controlsWide").fadeOut(300),$("#reveal .part1").fadeOut(300,function(){$("#reveal .part2").fadeIn(300)}))}function g(){$("#reveal .backBtn, #reveal .forwardBtn").off("click"),$("#reveal .part2").fadeOut(300,function(){$(".offerSelected").html(App.prizeObj[App.Storage.selected_prize].confirmtitle),$("#reveal .part3").fadeIn(300),$("#reveal .infoLeft").html("Back"),$("#reveal .infoRight").html("Confirm"),$("#reveal .backBtn").on("click",function(){f("back")}),$("#reveal .forwardBtn").on("click",function(){$(".titleObj").html(App.prizeObj[App.Storage.selected_prize].title),$(".contentObj").html(App.prizeObj[App.Storage.selected_prize].content),$(".codeObj").html(App.prizeObj[App.Storage.selected_prize].code),h(3),b.sendRegister(App.Storage.hgp_id,App.prizeObj[App.Storage.selected_prize].guid,function(){})}),$("#reveal .controlsWide").fadeIn(300)})}function h(a){$("#reveal .controlsWide").fadeOut(300),$("#reveal .part"+a).fadeOut(300,function(){$("#reveal .part4").fadeIn(300)}),$("#reveal .backBtn, #reveal .forwardBtn").off("click")}function i(a,b){var c=App.Storage.trunks;if("restaurant"===a||"spa"===a){var d=null,e=App.Storage.pastlevels[App.Storage.pastlevels.length-2].shortname;"restaurant"===e&&(d=App.Storage.pastlevels[1].shortname,"london"===d?e="dubai":"paris"===d&&(e="hongkong")),$("#"+a).find("."+e+"Show").fadeIn(0)}if("saopaolo"===a||"lasvegas"===a||"tokyo"===a||"sydney"===a){var f=null;if(0===c&&(f="zero"),1===c&&(f="one"),2===c&&(f="two"),3===c&&(f="three"),$(".numOfTrunks").html(f),"saopaolo"===a){var g=null,h=c+1;1===h&&(g="one"),2===h&&(g="two"),3===h&&(g="three"),$(".numOfPastTrunks").html(g),h>1&&($(".pluralOfPastTrunks").fadeIn(0),$(".themIt2").html("one of them")),1===h&&$(".themIt2").html("the last one")}c>1?($(".pluralOfTrunks").fadeIn(0),$(".themIt").html("them")):1===c&&$(".themIt").html("it")}"chicago"===a&&(c>1?($(".theyIt").html("They're").fadeIn(0),$(".areTrunks").fadeIn(0)):1===c?($(".theyIt").html("It's").fadeIn(0),$(".areTrunks").fadeIn(0)):$(".noTrunks").fadeIn(0)),b()}function j(c){function f(a){$(".progress").fadeTo(200,.1).html("").css({width:15*a+"px"});for(var b=0;a>b;b++){var c=b+1;$(".progress").append('<li class="f'+c+' off"></li>')}$(".progress").children("li:eq(0)").removeClass("off").addClass("on").parent().fadeTo(200,1)}function g(b,c){function f(f){if("backward"===f&&App.Storage.slidePosition>1&&($("#"+b.shortname).find(".f"+App.Storage.slidePosition).fadeOut(200,function(){$("#"+e).find(".f"+App.Storage.slidePosition).fadeTo(150,.5),App.Storage.slidePosition--,$("#"+e).find(".f"+App.Storage.slidePosition).fadeTo(150,1),$("#"+b.shortname).find(".f"+App.Storage.slidePosition).fadeIn(150,function(){1===App.Storage.slidePosition&&$("#"+e+" > .backBtn").fadeTo(300,.35)})}),$("#"+b.shortname).find(".f"+(App.Storage.slidePosition-1)).hasClass("bonus")?$(".bonusLogo").fadeTo(300,1):$(".bonusLogo").fadeTo(300,0)),"forward"===f&&App.Storage.slidePosition<c)$("#"+e+" > .backBtn").fadeTo(300,1),$("#"+b.shortname).find(".f"+App.Storage.slidePosition).fadeOut(200,function(){$("#"+e).find(".f"+App.Storage.slidePosition).fadeTo(150,.5),App.Storage.slidePosition++,$("#"+e).find(".f"+App.Storage.slidePosition).fadeTo(150,1),$("#"+b.shortname).find(".f"+App.Storage.slidePosition).fadeIn(150)}),$("#"+b.shortname).find(".f"+(App.Storage.slidePosition+1)).hasClass("subtractTrunk")&&l(),$("#"+b.shortname).find(".f"+(App.Storage.slidePosition+1)).hasClass("calculate")&&k(),$("#"+b.shortname).find(".f"+(App.Storage.slidePosition+1)).hasClass("bonus")?$(".bonusLogo").fadeTo(300,1):$(".bonusLogo").fadeTo(300,0);else if("forward"===f&&App.Storage.slidePosition===c){var g=App.Storage.currentlevel+1;if($(".currentTitle").html(App.Storage.pastlevels[App.Storage.currentlevel].location),$("#"+e+" > .backBtn").off("click"),$("#"+e+" > .forwardBtn").off("click"),$("#"+b.shortname).animate({bottom:"100%"},300,function(){$(this).fadeOut(300)}),"chicago"===b.shortname)$("#gamePlay, #imageSlides").fadeOut(300).html(""),$("#reveal").fadeTo(300,1),d();else if("saopaolo"===b.shortname||"lasvegas"===b.shortname)App.Storage.option=b.options[0],m();else{var h=a["level"+g+"_opt"+b.options[0]],i=a["level"+g+"_opt"+b.options[1]];$(".displayOne").find(".place").html(h.location),$(".displayOne").find(".direction").html(h.action),$(".displayOne > img").on("click",function(){App.Storage.option=b.options[0],$(".decisionControls").fadeOut(300,function(){$(".controlsShort").fadeIn(300),$("#nextDest").fadeOut(300)}),m()}),$(".displayTwo").find(".place").html(i.location),$(".displayTwo").find(".direction").html(i.action),$(".displayTwo > img").on("click",function(){App.Storage.option=b.options[1],$(".decisionControls").fadeOut(300,function(){$(".controlsShort").fadeIn(300),$("#nextDest").fadeOut(300)}),m()}),$(".controlsShort").fadeOut(300,function(){$(".decisionControls").fadeIn(300),$("#nextDest").fadeIn(300)})}}}App.Storage.slidePosition=1;var e=b.shortname+"_slide";0===App.Storage.currentlevel?$(".controlsShort").attr("id",e):$(".controlsShort").removeAttr("id").attr("id",e),$("#"+e+" > .backBtn").on("click",function(){f("backward")}).fadeTo(0,.35),$("#"+e+" > .forwardBtn").on("click",function(){f("forward")})}var e=c.shortname;b.getLocation(e,function(){i(e,function(){$("#"+e).fadeIn(0,function(){$(this).animate({bottom:"0%"},300)});var a=$("#"+e).children("div").length;f(a),g(c,a)})})}function k(){var a=App.Storage.curObj,b=App.Storage.thisObjIndex,c=App.Storage.calc;(1===App.Storage.calc&&0===App.Storage.calcFirst||2===App.Storage.calc&&0===App.Storage.calcSecond)&&((1===App.Storage.calc&&"Restaurant"!==App.Storage.curObj.location||2===App.Storage.calc&&"Restaurant"===App.Storage.curObj.location)&&(App.Storage.nights=App.Storage.nights+a.stays,$("#staysView").find(".box").html(App.Storage.nights)),App.Storage.points=App.Storage.points+a["points"+c][b],$("#pointsView").find(".box").text(App.Storage.points).digits(),App.Storage.cashSpent=a["spent"+c][b],App.Storage.cash=App.Storage.cash-a["spent"+c][b],$("#cashView").find(".box").text("$"+App.Storage.cash).digits()),1===App.Storage.calc?App.Storage.calcFirst=1:null,2===App.Storage.calc?App.Storage.calcSecond=1:null,App.Storage.calc++}function l(){1===App.Storage.subtractTrunk&&(App.Storage.subtractTrunk=0,$("#twrapper > #t"+App.Storage.trunks).fadeTo(200,.35))}function m(){App.Storage.currentlevel++,App.Storage.calc=1,App.Storage.calcFirst=0,App.Storage.calcSecond=0;var b=a["level"+App.Storage.currentlevel+"_opt"+App.Storage.option];App.Storage.curObj=b;var c=a.check(b);App.Storage.thisObjIndex=c,App.Storage.progress++,$("li#dot"+App.Storage.progress).children("div").removeClass("off").addClass("on"),"wrong"===b.decision&&(App.Storage.trunks--,App.Storage.subtractTrunk=1),App.Storage.pastlevels.push(b),$(".displayOne > img").off("click"),$(".displayTwo > img").off("click"),j(b)}function n(){function a(){$("#preloadImg").load("preload.html #preload"+iimg,function(){39>iimg&&(iimg++,a())})}iimg=0,a()}function o(){App.Storage.currentlevel=-1,App.Storage.pastlevels=[],App.Storage.cash=8e3,App.Storage.points=0,App.Storage.option=0,App.Storage.trunks=3,App.Storage.progress=0,App.Storage.nights=0}function p(){App.Storage.tncAccepts<2&&(App.Storage.progress>5?$(".rulesOptHead").html("TO RECEIVE YOUR REWARD, PLEASE ACCEPT THE TERMS AND CONDITIONS."):$(".rulesOptHead").html("ACCEPT THE TERMS TO PLAY THE GAME."),$("#lightbox").fadeIn(300),$(".acceptBtn").on("click",function(){App.Storage.tncAccepts++,$("#lightbox").fadeOut(300),$(".acceptBtn").off("click"),$(".denyBtn").off("click")}),$(".denyBtn").on("click",function(){alert("You must accept the terms of the site to progress futher.")}))}function q(){function a(a){var c=0,d=$("#"+a).children("div").length-1,e=[];$("#"+a).children("div").each(function(a){e[a]=$(this).attr("class")}),$("#"+a).find(".backBtn").fadeTo(300,.5).on("click",function(){c>0&&($("#"+a).find(".forwardBtn").off().on("click",function(){d>c&&($("#"+a).find(".backBtn").fadeTo(300,1),$("."+e[c]).fadeOut(300,function(){c++,$("."+e[c]).fadeIn(300)}))}),$("."+e[c]).fadeOut(300,function(){c--,$("."+e[c]).fadeIn(300)})),1===c&&$(this).fadeTo(300,.5)}),$("#"+a).find(".forwardBtn").on("click",function(){d>c&&($("#"+a).find(".backBtn").fadeTo(300,1),$("."+e[c]).fadeOut(300,function(){c++,$("."+e[c]).fadeIn(300)})),c===d-1&&$("#introForward").off().on({click:function(){$(".js-introStart").trigger("click")}})})}1===App.Storage.playerStatus?($("#intro > .step1").fadeIn(300),$("#intro > .step3").find(".defaultintro").fadeIn(300),$("#intro").find(".step2").remove(),a("intro","controlsWide")):2===App.Storage.playerStatus&&($("#intro > .step1").fadeIn(300),$("#intro > .step3").find(".exception").fadeIn(300),a("intro","controlsWide")),(1===App.Storage.playerStatus||2===App.Storage.playerStatus)&&($(".acceptBtn").off("click"),$(".denyBtn").off("click"),p())}function r(){var c=$("input#hgpid").val();b.checkHGP(c,function(a){a?($("#screenHGPlock").fadeOut(300),q()):($(".hgpNumAlert").fadeIn(200),$("#hgpId > input[name='id']").css({border:"1px red solid"}))})}function t(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var d=new RegExp("[\\?&]"+a+"=([^&#]*)"),e=d.exec(location.search),f=null===e?"":decodeURIComponent(e[1].replace(/\+/g," "));""===f?b.getScreenForm():b.checkHGP(f,function(a){a||b.getScreenForm()})}function u(){$("#bodydimensions").html("body, #master, .screenSize, .layer {width:"+$(window).width()+"px; height:"+$(window).height()+"px;}"),$(window).width()<$(window).height()?b.getScreenLock():$("#screenVlock").html("").fadeOut(100)}function v(){$(".videoBtn").on("click",function(){$("#movieBox").fadeIn(200)}),$(".movieClose").on("click",function(){$("#movieBox").fadeOut(200),$("#chaseMov")[0].pause()})}function w(a){navigator.userAgent.match(/iphone|iPod/i)||navigator.userAgent.match(/Mobile/i)&&navigator.userAgent.match(/Android/i)?(s.pageName="HyattChase_HYT4:Mobile_"+a,s.server="hyatt.com",s.eVar26="en",s.prop26="en",s_code=s.t(),s_code&&document.write(s_code)):(s.pageName="HyattChase_HYT4:Tablet_Home",s.server="hyatt.com",s.eVar26="en",s.prop26="en",s_code=s.t(),s_code&&document.write(s_code))}App.Storage={pastlevels:null,currentlevel:null,option:null,hgp_id:null,playerStatus:null,nights:null,points:null,cash:null,cashSpent:null,progress:null,trunks:null,slidePosition:null,reveal_id:null,reveal_part:null,reveal_section:0,prizes:null,selected_prize:null,tncAccepts:0},App.prizeObj={1:{title:"10% off at any Hyatt hotel worldwide",confirmtitle:"<span class='prizeEmphasis'>10% Off</span> at any Hyatt hotel worldwide",content:"Here's your offer code. Jot it down so you can use it for your next Hyatt stay",code:"Offer Code: DISC10 Expires: 1/31/14",guid:null},2:{title:"15% off at any Hyatt hotel worldwide",confirmtitle:"<span class='prizeEmphasis'>15% Off</span> at any Hyatt hotel worldwide",content:"Here's your offer code. Jot it down so you can use it for your next Hyatt stay.",code:"Offer Code: DISC15 Expires: 1/31/14",guid:null},3:{title:"an entry for a chance to win 5 nights at any Hyatt hotel worldwide (subject to <a href='/rules.php#r3' target='_blank'>game rules</a>)",confirmtitle:"<span class='prizeEmphasis'>Entry To Win</span>5 nights at any Hyatt hotel worldwide",content:"Your Hyatt Gold Passport number has been entered for a chance to win points good for a 5 night stay at any Hyatt property. We will notify the winners by email in early November.",code:null,guid:null},4:{title:"One (1) night at any Hyatt hotel worldwide*",confirmtitle:"<span class='prizeEmphasis'>One (1) Night</span> at any Hyatt hotel worldwide",content:"Your reward will be added to your account shortly.",code:null,guid:null},5:{title:"5,000 Hyatt Gold Passport bonus points",confirmtitle:"<span class='prizeEmphasis'>5,000 Points</span> Hyatt Gold Passport bonus points",content:"Your reward will be added to your account shortly.",code:null,guid:null},6:{title:"250 Hyatt Gold Passport bonus points",confirmtitle:"<span class='prizeEmphasis'>250 Points</span> Hyatt Gold Passport bonus points",content:"Your reward will be added to your account shortly.",code:null,guid:null},7:{title:"100 Hyatt Gold Passport bonus points",confirmtitle:"<span class='prizeEmphasis'>100 Points</span> Hyatt Gold Passport bonus points",content:"Your reward will be added to your account shortly.",code:null,guid:null},8:{title:"a Suite Upgrade",confirmtitle:"<span class='prizeEmphasis'>Suite Upgrade</span>",content:"Your reward will be added to your account shortly.",code:null,guid:null},9:{title:"Platinum Status valid through 2/28/15",confirmtitle:"<span class='prizeEmphasis'>Platinum Status</span> valid through 2/28/15",content:"Your reward will be added to your account shortly.",code:"Expires: 2/28/14",guid:null},10:{title:"Diamond Status valid through 2/28/15",confirmtitle:"<span class='prizeEmphasis'>Diamond Status</span> valid through 2/28/15",content:"Your reward will be added to your account shortly.",code:"Expires: 2/28/14",guid:null}};var a={level0_opt0:{location:"New York",shortname:"newyork",stays:0,spent1:[0],spent2:[0],points1:[0],points2:[0],decision:null,options:[0,1],action:null},level1_opt0:{location:"London",shortname:"london",stays:2,spent1:[850],spent2:[0],points1:[4250],points2:[0],decision:"right",options:[0,1],action:"Fly to"},level1_opt1:{location:"Paris",shortname:"paris",stays:2,spent1:[2100],spent2:[0],points1:[10500],points2:[0],decision:"right",options:[1,2],action:"Fly to"},level2_opt0:{location:"Dubai",shortname:"dubai",stays:3,spent1:[600],spent2:[15],points1:[8e3],points2:[75],decision:"right",options:[0,1],action:"Fly to"},level2_opt1:{location:"Restaurant",shortname:"restaurant",stays:3,spent1:[30,50],spent2:[600,1650],points1:[150,250],points2:[8e3,13250],decision:"wrong",options:[1,2],action:"Head to the"},level2_opt2:{location:"Hong Kong",shortname:"hongkong",stays:3,spent1:[1650],spent2:[20],points1:[13250],points2:[100],decision:"right",options:[1,2],action:"Fly to"},level3_opt0:{location:"Tokyo",shortname:"tokyo",stays:1,spent1:[275],spent2:[0],points1:[1375],points2:[0],decision:"wrong",options:[0,1],action:"Fly to"},level3_opt1:{location:"Spa",shortname:"spa",stays:1,spent1:[325,700],spent2:[0,0],points1:[1625,3500],points2:[0,0],decision:"right",options:[0,1],action:"Head to the"},level3_opt2:{location:"Sydney",shortname:"sydney",stays:1,spent1:[650],spent2:[0],points1:[3250],points2:[0],decision:"wrong",options:[0,1],action:"Fly to"},level4_opt0:{location:"Las Vegas",shortname:"lasvegas",stays:5,spent1:[1250],spent2:[0],points1:[16250],points2:[0],decision:"right",options:[0],action:"Fly to"},level4_opt1:{location:"S&atilde;o Paulo",shortname:"saopaolo",stays:4,spent1:[1700],spent2:[0],points1:[18500],points2:[0],decision:"wrong",options:[0],action:"Fly to"},level5_opt0:{location:"Chicago",shortname:"chicago",stays:0,spent1:[0],spent2:[0],points1:[-15e3],points2:[0],decision:null},check:function(a){if("spa"===a.shortname){if(6535===App.Storage.cash)return 0;if(6520===App.Storage.cash)return 0;if(4230===App.Storage.cash)return 1;if(4200===App.Storage.cash)return 1;if(5845===App.Storage.cash)return 0;if(2700===App.Storage.cash)return 1}else if("restaurant"===a.shortname){if(850===App.Storage.cashSpent)return 0;if(2100===App.Storage.cashSpent)return 1}return 0},defaultNum:"9AC4E7F3-8901-C873-9EC6-49B0"};window.mockDestInfo=function(){return a}();var b={checkHGP:function(a,b){var c=null;App.Storage.hgp_id=a,"hyt004.local"!=window.location.host&&"hyatt.dev"!=window.location.host?($.ajax({type:"POST",url:"/api/",data:{option:"status",hgp_id:a},cache:!1,async:!1,success:function(a){App.Storage.playerStatus=a},complete:function(){c=0===App.Storage.playerStatus?!1:!0,b(c)}}),c=0===App.Storage.playerStatus?!1:!0,b(c)):(App.Storage.playerStatus=1,c=0===App.Storage.playerStatus?!1:!0,b(c))},getPrize:function(a,b,c){$.ajax({type:"POST",url:"/api/",data:{option:"draw_prizes",hgp_id:a,pulls:b},cache:!1,success:function(a){App.Storage.prizes=[];for(var e=0;e<a.length;e++)App.prizeObj[a[e].prize_id].guid=a[e].guid,App.Storage.prizes[e]=a[e].prize_id;c()}})},sendRegister:function(a,b,c){$.ajax({type:"POST",url:"/api/",data:{option:"register",hgp_id:a,guid:b},cache:!1,success:function(){c()}})},defaultPrizeRegister:function(a,b){$.ajax({type:"POST",url:"/api/",data:{option:"register_default",hgp_id:a},cache:!1,success:function(){b()},error:function(){},complete:function(){}})},getScreenLock:function(){var a=null;$.ajax({type:"GET",url:"pages/screenVlock.php",success:function(b){a=b},complete:function(){$("#screenVlock").html(a).fadeIn(100)}})},getScreenForm:function(){var a=null;$.ajax({type:"GET",url:"pages/screenHGPlock.php",success:function(b){a=b,$("#screenHGPlock").html(a).fadeIn(100,function(){$("#hgpId").submit(function(){return r($(this)),!1})})}})},getLocation:function(a,b){var c=null;$.ajax({type:"GET",url:"locations/"+a+".php",success:function(b){c=b,w(a)},complete:function(){$("#imageSlides").append(c),b()}})}};$(document).on("click",".start",function(){$(this).router(function(){$("#intro").is(":hidden")||$("#intro").fadeOut(300),$("#imageSlides").fadeIn(300,function(){m()}),$(this).router(function(){},!1,"imageSlides")},!1,"",0,300)}),$(document).on("click",".clickMenu",function(){var a=null;$sideMenu=$(".sideMenu"),a="open"===$sideMenu.attr("name")?"-30%":"0%",$sideMenu.animate({right:a},500,function(){"open"===$sideMenu.attr("name")?$sideMenu.attr("name","close"):$sideMenu.attr("name","open")})}),$(document).on("click",".router",function(){return $(this).router(function(){},!1,0,300),!1}),$("#link_learn_more").bind("click",function(){w("LearnMore")}),$("#link_rules").bind("click",function(){w("Rules")}),$("#link_terms").bind("click",function(a){a.preventDefault(),w("Terms")}),$(window).resize(function(){u()}),$(document).router(function(){v(),t("id"),u(),o(),q(),n()},!0)}var App={},Android=function(){var a=function(){$("body, #master, .screenSize").css({width:$(window).width(),height:window.innerHeight+60})};return{fixDimensions:a}}(),ua=navigator.userAgent.toLowerCase(),isAndroid=ua.indexOf("android")>-1;isAndroid&&($(window).on({resize:function(){},orientationchange:function(){setTimeout(Android.fixDimensions,500)}}),Android.fixDimensions()),$(function(){initApp(),window.addEventListener("load",function(){setTimeout(function(){window.scrollTo(0,1),window.scrollTo(0,window.innerHeight)},0)})}),$(window).load(function(){isAndroid&&($('<link href="/mobile/assets/style/android.css" rel="stylesheet" type="text/css" />').appendTo("head"),setTimeout(function(){window.scrollTo(0,1),window.scrollTo(0,window.innerHeight)},1e3),Android.fixDimensions())});