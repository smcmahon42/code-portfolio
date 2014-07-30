/*jslint browser: true*/
/*global $, jQuery*/
/*jslint white: true */
/*jslint sloppy: true */

// parent App object 
var App = {};

function initApp(){

  App.Storage = {
    pastlevels : null, //array
    currentlevel : null, // num 
    option : null, //
    hgp_id : null, //num
    playerStatus : null, //num
    nights : null,
    points : null,
    cash: null,
    cashSpent : null,
    progress : null,
    trunks : null,
    slidePosition : null,
    reveal_id : null,
    reveal_part : null,
    reveal_section : 0,
    prizes : null,
    selected_prize : null,
    tncAccepts : 0
  };

  /*
  KEY TO reveal_id
  1 = has at least one trunk and can claim a prize
  2 = can't claim a prize
  3 = no trunks and can claim a prize
  */
  
  App.prizeObj = {
    1 : { 
      title : "10% off at any Hyatt hotel worldwide",
      confirmtitle : "<span class='prizeEmphasis'>10% Off</span> at any Hyatt hotel worldwide",
      content : "Here's your offer code. Jot it down so you can use it for your next Hyatt stay", 
      code : "Offer Code: DISC10 Expires: 1/31/14",
      guid : null
      },
    2 : { 
      title : "15% off at any Hyatt hotel worldwide",
      confirmtitle : "<span class='prizeEmphasis'>15% Off</span> at any Hyatt hotel worldwide",
      content : "Here's your offer code. Jot it down so you can use it for your next Hyatt stay.", 
      code : "Offer Code: DISC15 Expires: 1/31/14",
      guid : null
      },
    3 : { 
      title : "an entry for a chance to win 5 nights at any Hyatt hotel worldwide (subject to <a href='/rules.php#r3' target='_blank'>game rules</a>)",
      confirmtitle : "<span class='prizeEmphasis'>Entry To Win</span>5 nights at any Hyatt hotel worldwide",
      content : "Your Hyatt Gold Passport number has been entered for a chance to win points good for a 5 night stay at any Hyatt property. We will notify the winners by email in early November.", 
      code : null,
      guid : null
      },
    4 : { 
      title : "One (1) night at any Hyatt hotel worldwide*",
      confirmtitle : "<span class='prizeEmphasis'>One (1) Night</span> at any Hyatt hotel worldwide",
      content : "Your reward will be added to your account shortly.", 
      code : null,
      guid : null
      },
    5 : {  
      title : "5,000 Hyatt Gold Passport bonus points",
      confirmtitle : "<span class='prizeEmphasis'>5,000 Points</span> Hyatt Gold Passport bonus points",
      content : "Your reward will be added to your account shortly.", 
      code : null,
      guid : null
      },
    6 : { 
      title : "250 Hyatt Gold Passport bonus points",
      confirmtitle : "<span class='prizeEmphasis'>250 Points</span> Hyatt Gold Passport bonus points",
      content : "Your reward will be added to your account shortly.", 
      code : null,
      guid : null
      },
    7 : { 
      title : "100 Hyatt Gold Passport bonus points",
      confirmtitle : "<span class='prizeEmphasis'>100 Points</span> Hyatt Gold Passport bonus points",
      content : "Your reward will be added to your account shortly.", 
      code : null,
      guid : null
      },
    8 : { 
      title : "a Suite Upgrade",
      confirmtitle : "<span class='prizeEmphasis'>Suite Upgrade</span>",
      content : "Your reward will be added to your account shortly.", 
      code : null,
      guid : null
      },
    9 : { 
      title : "Platinum Status valid through 2/28/15",
      confirmtitle : "<span class='prizeEmphasis'>Platinum Status</span> valid through 2/28/15",
      content : "Your reward will be added to your account shortly.", 
      code : "Expires: 2/28/14",
      guid : null
      },
    10 : { 
      title : "Diamond Status valid through 2/28/15",
      confirmtitle : "<span class='prizeEmphasis'>Diamond Status</span> valid through 2/28/15",
      content : "Your reward will be added to your account shortly.", 
      code : "Expires: 2/28/14",
      guid : null
      }
  };

  var DestInfo = {
  
    level0_opt0 : { location : "New York", shortname : "newyork", stays : 0,    spent1 : [0],       spent2 : [0],       points1 : [0],       points2 : [0],       decision : null, options : [0,1], action : null },
    level1_opt0 : { location : "London", shortname : "london", stays : 2,     spent1 : [850],     spent2 : [0],     points1 : [4250],      points2 : [0],       decision : "right", options : [0,1], action : "Fly to" },
    level1_opt1 : { location : "Paris", shortname : "paris", stays : 2,       spent1 : [2100],    spent2 : [0],     points1 : [10500],     points2 : [0],       decision : "right", options : [1,2], action : "Fly to"  },
    level2_opt0 : { location : "Dubai", shortname : "dubai", stays : 3,       spent1 : [600],     spent2 : [15],      points1 : [8000],      points2 : [75],      decision : "right", options : [0,1], action : "Fly to" },
    level2_opt1 : { location : "Restaurant", shortname : "restaurant", stays : 3, spent1 : [30, 50],    spent2 : [600, 1650], points1 : [150, 250],    points2 : [8000, 13250], decision : "wrong", options : [1,2], action : "Head to the" },
    level2_opt2 : { location : "Hong Kong", shortname : "hongkong", stays : 3,    spent1 : [1650],    spent2 : [20],      points1 : [13250],     points2 : [100],       decision : "right", options : [1,2], action : "Fly to" },
    level3_opt0 : { location : "Tokyo", shortname : "tokyo", stays : 1,       spent1 : [275],     spent2 : [0],     points1 : [1375],    points2 : [0],       decision : "wrong", options : [0,1], action : "Fly to" },
    level3_opt1 : { location : "Spa", shortname : "spa", stays : 1,         spent1 : [325, 700],  spent2 : [0, 0],    points1 : [1625, 3500],  points2 : [0, 0],      decision : "right", options : [0,1], action : "Head to the" },
    level3_opt2 : { location : "Sydney", shortname : "sydney", stays : 1,       spent1 : [650],     spent2 : [0],       points1 : [3250],    points2 : [0],       decision : "wrong", options : [0,1], action : "Fly to" },
    level4_opt0 : { location : "Las Vegas", shortname : "lasvegas", stays : 5,    spent1 : [1250],    spent2 : [0],       points1 : [16250],     points2 : [0],       decision : "right", options : [0], action : "Fly to" },
    level4_opt1 : { location : "S&atilde;o Paulo", shortname : "saopaolo", stays : 4,     spent1 : [1700],    spent2 : [0],     points1 : [18500],     points2 : [0],       decision : "wrong", options : [0], action : "Fly to" },
    level5_opt0 : { location : "Chicago", shortname : "chicago", stays : 0,     spent1 : [0],       spent2 : [0],       points1 : [-15000],    points2 : [0],       decision : null },
    
    check : function(location){
      if(location.shortname === "spa"){
        if(App.Storage.cash === 6535){ return 0; } //london -> Dubai
        if(App.Storage.cash === 6520){ return 0; } //london Restaurant -> Dubai
        if(App.Storage.cash === 4230){ return 1; } //Paris -> Hong-Kong
        if(App.Storage.cash === 4200){ return 1; } //Paris Resaurant -> Hong-Kong
        if(App.Storage.cash === 5845){ return 0; } //London Restaurant
        if(App.Storage.cash === 2700){ return 1; } //Paris Restaurant
      } else if(location.shortname === "restaurant") {
        if(App.Storage.cashSpent === 850){ return 0; } // from London
        if(App.Storage.cashSpent === 2100){ return 1; } // from Paris
      }
      return 0;
    },
    defaultNum : '9AC4E7F3-8901-C873-9EC6-49B0'
  };

  window.mockDestInfo = (function () {
    return DestInfo;
  })();
  
  var ajaxCalls = {
  
    checkHGP : function(id, func){
      var isPlayer = null;
      App.Storage.hgp_id = id;

      if (window.location.host != 'hyt004.local' && window.location.host != 'hyatt.dev') {
        $.ajax({
          type: 'POST',
          url: '/api/',
          data: { 'option' : 'status', 'hgp_id' : id },
          cache: false,
          async: false,
          success: function(data, textStatus, jqXHR){
            App.Storage.playerStatus = data;
          },
          complete: function(xhr, textStatus){
            App.Storage.playerStatus === 0 ? isPlayer = false : isPlayer = true;
            func(isPlayer);
          }
        });
        App.Storage.playerStatus === 0 ? isPlayer = false : isPlayer = true;        
        func(isPlayer);
      } else {
        App.Storage.playerStatus = 1; // Temp code
        App.Storage.playerStatus === 0 ? isPlayer = false : isPlayer = true;        
        func(isPlayer);
      }
        
    },//checkHGP
    
    getPrize : function(id, total, func){
      $.ajax({
        type: 'POST',
        url: '/api/',
        data: { 'option' : 'draw_prizes', 'hgp_id' : id, 'pulls' : total },
        cache: false,
        success: function(data, textStatus, jqXHR){
          //App.Storage.prizes = data;
          App.Storage.prizes = [];
          for (var i = 0; i < data.length; i++){
            App.prizeObj[ data[i].prize_id ].guid = data[i].guid;
            App.Storage.prizes[i] = data[i].prize_id;
          }
          func();
        }
      });
    },//getPrize
    
    sendRegister : function(id, gu_id, func){
      $.ajax({
        type: 'POST',
        url: '/api/',
        data: { 'option' : 'register', 'hgp_id' : id, 'guid' : gu_id },
        cache: false,
        success: function(data, textStatus, jqXHR){
          func();
        }
      });
    },//sendRegister
    
    defaultPrizeRegister : function(id, func){
      $.ajax({
        type: 'POST',
        url: '/api/',
        data: { 'option' : 'register_default', 'hgp_id' : id },
        cache: false,
        success: function(data, textStatus, jqXHR){
          func();
        },
        error : function (jqXHR, textStatus, errorThrown) {

        },
        complete: function(jqXHR, textStatus) {

        }
      });
    },//defaultPrizeRegister
    
    getScreenLock : function(){
      var vlockPage = null;
      $.ajax({
        type: 'GET',
        url: 'pages/screenVlock.php',
        success: function(data, textStatus, jqXHR){
          vlockPage = data;
        },
        complete: function(xhr, textStatus){
          $("#screenVlock").html(vlockPage).fadeIn(100);
        }
      });
    },//getScreenLock
    
    getScreenForm : function(){
      var screenHGPlock = null;
      $.ajax({
        type: 'GET',
        url: 'pages/screenHGPlock.php',
        success: function(data, textStatus, jqXHR){
          screenHGPlock = data;
          $("#screenHGPlock").html(screenHGPlock).fadeIn(100, function(e){
            $("#hgpId").submit(function(){
              checkHGPform($(this));
              return false;
            });
          });
        }
      });
    },//getScreenLock
    
    getLocation : function(location, func){
      var loc = null;
      $.ajax({
        type: 'GET',
        url: 'locations/'+location+'.php',
        success: function(data, textStatus, jqXHR){
          loc = data;

          trigger_omniture(location);
        },
        complete: function(xhr, textStatus){
          $("#imageSlides").append(loc);
          func();
        }
      });
    }//getLocation
  };

//////////////////////////////// REVEAL GAME PRIZES ////////////////////////////////
  
  function replayGame(){
    window.location = location.origin + '/mobile/?id=' + App.Storage.hgp_id;
    /*$("#reveal").fadeOut(300, function(){
      
      $(this).html('');
      $("#intro .step4").fadeOut(0);
      $("#intro .step1").fadeIn(0);
      $("#intro").fadeIn(300).addClass("current");
      $("#gamePlay, #imageSlides, #reveal").removeAttr("style").removeClass('current');
      for(key in App.Storage){ //reset game storage object
        App.Storage[key] = null;
      }
      for(key in Page){ //reset router object
        Page[key] = null;
      }
      $(".forwardBtn:eq(0)").fadeTo(0,1);
      getParameterByName('id');
      setupPlayerInfo();
      introInit();
    });*/
  }
  
  function setupReveal(){
    App.Storage.reveal_part = 1;
    App.Storage.reveal_section = 1;
    if(App.Storage.trunks >= 1 && App.Storage.playerStatus === 1){ 
      App.Storage.reveal_id = 1; //has at least one trunk and can claim a prize
    }else if(App.Storage.trunks < 1 && App.Storage.playerStatus === 1){ 
      App.Storage.reveal_id = 3; //no trunks and can claim a prize
    }else{
      App.Storage.reveal_id = 2; //can't claim a prize
    }
    
    $(document).router(function(){
      
      var trunkmargin = null;
      if(App.Storage.trunks === 3){trunkmargin = 7}
      if(App.Storage.trunks === 2){trunkmargin = 24}
      if(App.Storage.trunks === 1 || App.Storage.trunks === 0){trunkmargin = 40}
      
      if(App.Storage.trunks !== 0){
        for(var i = 1; i <= App.Storage.trunks; i++){
          $(".trunkWrap > .trunk"+i).fadeIn(0);
        }
      }

      $(".exp"+App.Storage.reveal_id).fadeIn(0);
      $(".trunkWrap > .trunk1").css({ marginLeft : trunkmargin+"%" });
      
      if(App.Storage.trunks > 1){ $(".plural").fadeIn(0); }
      
      $(".hgpn").html(App.Storage.hgp_id);
      if(App.Storage.reveal_id !== 2){
        $(".backBtn:eq(1)").fadeTo(300, .35);
        $(".forwardBtn:eq(1)").fadeTo(300, 1).on("click", function(){ part1Cycle(); });
      }else{ /// id of 2 - go no further
        $("#reveal .infoLeft").html("Replay The Game").fadeTo(0, 1);
        $("#reveal .infoRight").html("Book Now").fadeTo(0, 1);
        $("#reveal .bg1").fadeTo(300, 0.5);
        $("#reveal .bg2").fadeTo(0, 0);
        $(".backBtn:eq(1)").fadeTo(300, 1).on("click", function(){ replayGame(); });
        $(".forwardBtn:eq(1)").fadeTo(300, 1).on("click", function(){ window.open("http://www.hyatt.com/hyatt/index.jsp"); });
      }
      
    }, false, "reveal", 0, 200);
  }
  
  function part1Cycle(){
    $("#revealBtnFwd").off("click");
    $("#revealBtnBack").off("click");
    //fade out old reveal slide.
    $(".part"+App.Storage.reveal_section+"of1").fadeOut(300);
    //This variable starts as 0.
    App.Storage.reveal_section++;
    //fade in next reveal slide.
    $(".part"+App.Storage.reveal_section+"of1").delay(300).fadeIn(300);
     
    //This is true until the last slide.
    if(App.Storage.reveal_section < 3 ) {//cycle back through function
      $("#revealBtnFwd").fadeTo(300, 1).on("click", function(){ part1Cycle(); });
      return;
    } else if(App.Storage.reveal_section === 3 ) {//last part of part1 decision point
      $(".trunkWrap > .trunk1, .trunkWrap > .trunk2, .trunkWrap > .trunk3").fadeOut(300);
      //fadeout room image. 
      $("#reveal .bg1").fadeOut(300);
      //change text next to back button. 
      $(".infoLeft").html("Replay The Game")
      //set back button to replay game.
      $("#revealBtnBack").on("click", function(){ replayGame(); });//everyone
      
      if(App.Storage.reveal_id === 1){ /// id of 1 - open trunks
        var trunktotal = App.Storage.trunks -1;
        //Determine text for forward button.
        var isPlural = (App.Storage.trunks > 1) ? "Open The Trunks" : "Open The Trunk";
        //change text next to forward button.
        $(".infoRight").html(isPlural).fadeTo(300, 1);
        $(".infoLeft").fadeTo(300, 1);
        $("#revealBtnFwd").on("click", function(){
          ajaxCalls.getPrize(App.Storage.hgp_id, trunktotal, function(){ //generate rewards
            var revealMargin = 0;
            for(var t = 0; t < App.Storage.prizes.length;  t++){ 
              $(".open"+t).fadeIn(0, function(){
                $(this).attr("name", App.Storage.prizes[t]);
                $(this).children(".offer").html(App.prizeObj[ App.Storage.prizes[t] ].confirmtitle);
              })
              $(".open"+t+" .pin, .open"+t+" .offer, .open"+t+" .tk").on("click", function(){
                App.Storage.selected_prize = $(this).parent().attr('name');
                part3Prizepicked();
              });
              $(".open"+t+" a").attr("href", "rules.php#r"+App.Storage.prizes[t]);
            }
            
            if(App.Storage.prizes.length === 1 || App.Storage.prizes.length === 0){ revealMargin = 36; }
            if(App.Storage.prizes.length === 2){ revealMargin = 19; }
            if(App.Storage.prizes.length === 3){ revealMargin = 5; }
            $(".part2 > .open0").css({ marginLeft : revealMargin+"%" });
            
            part2ChoosePrize();
          });
         });
      }
      
      /*
      if(App.Storage.reveal_id === 2){ /// id of 2 - go no further !!!!! moved to setup reveal !!!!!
        $(".infoRight").html("Book Now");
        $(".forwardBtn:eq(1)").on("click", function(){ window.open("http://www.hyatt.com/hyatt/index.jsp"); });
      }
      */
      
      if(App.Storage.reveal_id === 3){ /// id of 3 - go to confirm page for reward
        $(".infoRight").html("View Reward");
        $("#revealBtnFwd").on("click", function(){  
          //ajax register prize in api
          ajaxCalls.defaultPrizeRegister(App.Storage.hgp_id, function(){});
          part4Confirm(1); 
        });
      }
      
      $(".forwardBtn:eq(1), .backBtn:eq(1), .infoRight, .infoLeft").fadeTo(300, 1);//everyone
      
    }
    

  }//part1Cycle
  
  function part2ChoosePrize(option){
    
    toc();
    if(option !== undefined && option === "back"){
      $("#reveal .controlsWide").fadeOut(300);
      $("#reveal .part3").fadeOut(300, function(){
        $("#reveal .part2").fadeIn(300);
      });
    }else{
      $("#reveal .controlsWide").fadeOut(300);
      $("#reveal .part1").fadeOut(300, function(){
        $("#reveal .part2").fadeIn(300);
      });
    }
  }
  
  function part3Prizepicked(){
    $("#reveal .backBtn, #reveal .forwardBtn").off("click");
    
    $("#reveal .part2").fadeOut(300, function(){
      $(".offerSelected").html(App.prizeObj[ App.Storage.selected_prize ].confirmtitle);
      $("#reveal .part3").fadeIn(300);
      
      $("#reveal .infoLeft").html("Back");
      $("#reveal .infoRight").html("Confirm");
      
      $("#reveal .backBtn").on("click", function(){
        part2ChoosePrize("back");
      });
      $("#reveal .forwardBtn").on("click", function(){
        
        $(".titleObj").html(App.prizeObj[App.Storage.selected_prize].title);
        $(".contentObj").html(App.prizeObj[App.Storage.selected_prize].content);
        $(".codeObj").html(App.prizeObj[App.Storage.selected_prize].code);
        part4Confirm(3);
        //ajax register prize in api
        ajaxCalls.sendRegister(App.Storage.hgp_id, App.prizeObj[ App.Storage.selected_prize ].guid, function(){});
      });
      
      $("#reveal .controlsWide").fadeIn(300);
    });
  }
  
  function part4Confirm(part){
    $("#reveal .controlsWide").fadeOut(300);
    $("#reveal .part"+part).fadeOut(300, function(){
      $("#reveal .part4").fadeIn(300);
    });
    $("#reveal .backBtn, #reveal .forwardBtn").off("click");
  }
  
//////////////////////////////// GAME PLAY SLIDE SHOW ////////////////////////////////
  
  // runs operation to see if destinationn is restaurant or spa and if so what background to show.
  function hideShow(location, func){
    var trunksLeft = App.Storage.trunks;
    
    if(location === "restaurant" || location === "spa"){
      var origin = null;
      var pastDestination = App.Storage.pastlevels[(App.Storage.pastlevels.length - 2)].shortname;
      if(pastDestination === "restaurant"){
        origin = App.Storage.pastlevels[1].shortname;
        if(origin === "london"){ pastDestination = "dubai"; }
        else if(origin === "paris"){ pastDestination = "hongkong"; }
      }
      $("#"+location).find("."+pastDestination+"Show").fadeIn(0);
    }
    
    if(location === "saopaolo" || location === "lasvegas" || location === "tokyo" || location === "sydney"){
      
      var trunkNum = null;
      if(trunksLeft === 0){trunkNum="zero"}
      if(trunksLeft === 1){trunkNum="one"}
      if(trunksLeft === 2){trunkNum="two"}
      if(trunksLeft === 3){trunkNum="three"}
      
      $(".numOfTrunks").html(trunkNum);
      
      if(location === "saopaolo"){
        var PasttrunkNum = null;
        var numOfPastTrunks = trunksLeft+1;
        if(numOfPastTrunks === 1){PasttrunkNum="one"}
        if(numOfPastTrunks === 2){PasttrunkNum="two"}
        if(numOfPastTrunks === 3){PasttrunkNum="three"}
        
        $(".numOfPastTrunks").html( PasttrunkNum );
        
        if(numOfPastTrunks > 1){ 
          $(".pluralOfPastTrunks").fadeIn(0);
          $(".themIt2").html("one of them");
        }
        
        if(numOfPastTrunks === 1){ $(".themIt2").html("the last one"); }
      }
      
      if(trunksLeft > 1){  
        $(".pluralOfTrunks").fadeIn(0);
        $(".themIt").html("them");
      }else if(trunksLeft === 1){ 
        $(".themIt").html("it");
      }
      
    }
    
    if(location === "chicago"){
      if (trunksLeft > 1) {
        $(".theyIt").html("They're").fadeIn(0);
        $(".areTrunks").fadeIn(0);
      } else if (trunksLeft === 1) {
        $(".theyIt").html("It's").fadeIn(0);
        $(".areTrunks").fadeIn(0);
      } else {      
        $(".noTrunks").fadeIn(0);
      }
    }
    func();
  }
  
  function loadDestination( currentObj ){
    var location = currentObj.shortname;
    //ajax call for destination
    ajaxCalls.getLocation(location, function(){
      hideShow(location, function(){
        $("#"+location).fadeIn(0, function(){
          $(this).animate({bottom : '0%'}, 300);
        });
        var numOfSlides = $("#"+location).children("div").length;
        makeSlides(numOfSlides);
        updateSlideBtns(currentObj, numOfSlides);
      });
    });
    
    function makeSlides(numOfSlides){//init slider for destination
      //add white status dots for slider
      $(".progress").fadeTo(200, 0.1).html('').css({width : (numOfSlides*15)+"px"});//make div wrapper wider or shorter
      for(var i=0; i < numOfSlides; i++){
        var classNum = i+1;
        $(".progress").append('<li class="f'+classNum+' off"></li>');
      }
      $(".progress").children("li:eq(0)").removeClass("off").addClass("on").parent().fadeTo(200,1);
    }
    
    function updateSlideBtns(currentObj, numOfSlides){ 
      //add events system for slide show / movement;
      App.Storage.slidePosition = 1;
      var tempId = currentObj.shortname+"_slide";
      if(App.Storage.currentlevel === 0){
        $(".controlsShort").attr("id", tempId);
      }else{
        $(".controlsShort").removeAttr("id").attr("id", tempId);
      }
      
      function slideMove( direction ){
        
        if(direction === "backward" && App.Storage.slidePosition > 1){ //move backward
          $("#"+currentObj.shortname).find(".f"+App.Storage.slidePosition).fadeOut(200, function(){
            $("#"+tempId).find(".f"+App.Storage.slidePosition).fadeTo(150, 0.5); // fade Out white Dot
            App.Storage.slidePosition --; //deduct from slide position
            $("#"+tempId).find(".f"+App.Storage.slidePosition).fadeTo(150, 1);// fade In white Dot
            $("#"+currentObj.shortname).find(".f"+App.Storage.slidePosition).fadeIn(150, function(){
              if(App.Storage.slidePosition === 1){ $("#"+tempId+" > .backBtn").fadeTo(300, 0.35); }
            });
          });
          
          if($("#"+currentObj.shortname).find(".f"+(App.Storage.slidePosition - 1)).hasClass("bonus")){
            $(".bonusLogo").fadeTo(300, 1);
          }else{
            $(".bonusLogo").fadeTo(300, 0);
          }
          
        }
        
        if(direction === "forward" && App.Storage.slidePosition < numOfSlides){ //move forward
          $("#"+tempId+" > .backBtn").fadeTo(300, 1);
          $("#"+currentObj.shortname).find(".f"+App.Storage.slidePosition).fadeOut(200, function(){
            $("#"+tempId).find(".f"+App.Storage.slidePosition).fadeTo(150, 0.5); // fade Out white Dot
            App.Storage.slidePosition ++; //add to from slide position
            $("#"+tempId).find(".f"+App.Storage.slidePosition).fadeTo(150, 1); // fade In white Dot
            $("#"+currentObj.shortname).find(".f"+App.Storage.slidePosition).fadeIn(150);
          });
          
          if($("#"+currentObj.shortname).find(".f"+(App.Storage.slidePosition + 1)).hasClass("subtractTrunk")){
            subtractTrunk();
          }// subtract a trunk 
          
          if($("#"+currentObj.shortname).find(".f"+(App.Storage.slidePosition + 1)).hasClass("calculate")){
            incrementDestination();
          }// calculate totals on specific 
          
          if($("#"+currentObj.shortname).find(".f"+(App.Storage.slidePosition + 1)).hasClass("bonus")){
            $(".bonusLogo").fadeTo(300, 1);
          }else{
            $(".bonusLogo").fadeTo(300, 0);
          }
        }
        
        //switch to next destination
        else if(direction === "forward" && App.Storage.slidePosition === numOfSlides){
          
          var cLevel = App.Storage.currentlevel + 1;
          $(".currentTitle").html(App.Storage.pastlevels[App.Storage.currentlevel].location);
          $("#"+tempId+" > .backBtn").off("click");
          $("#"+tempId+" > .forwardBtn").off("click");
          // exception on chicago last click will send you to new routing to reveal section
          $("#"+currentObj.shortname).animate({bottom : '100%'}, 300, function(){ $(this).fadeOut(300); });
          
          if(currentObj.shortname === "chicago"){
            $("#gamePlay, #imageSlides").fadeOut(300).html('');
            $("#reveal").fadeTo(300, 1);
            setupReveal();
          }else if( (currentObj.shortname === "saopaolo" || currentObj.shortname === "lasvegas") ){ 
            App.Storage.option = currentObj.options[0];
            processDestination();
          }else{
            //add names for next destinations to choose through the current 
            //object options & make binding methods for selections
            var destOneObj = DestInfo[ "level"+(cLevel)+"_opt"+currentObj.options[0] ];
            var destTwoObj = DestInfo[ "level"+(cLevel)+"_opt"+currentObj.options[1] ];
            
            $(".displayOne").find(".place").html( destOneObj.location );
            $(".displayOne").find(".direction").html( destOneObj.action );
            
            $(".displayOne > img").on("click", function(){
              //on selection update App.Storage.option to new option
              App.Storage.option = currentObj.options[0];
              $(".decisionControls").fadeOut(300, function(){ 
                $(".controlsShort").fadeIn(300);
                $("#nextDest").fadeOut(300);
              });
              processDestination();
            });
            
            $(".displayTwo").find(".place").html( destTwoObj.location );
            $(".displayTwo").find(".direction").html( destTwoObj.action );
            $(".displayTwo > img").on("click", function(){ 
              //on selection update App.Storage.option to new option
              App.Storage.option = currentObj.options[1];
              $(".decisionControls").fadeOut(300, function(){ 
                $(".controlsShort").fadeIn(300); 
                $("#nextDest").fadeOut(300);
              });
              processDestination();
            });
            
            //remove current navigation & fade in the navigation to choose next destination and graphics.
            $(".controlsShort").fadeOut(300, function(){ 
              $(".decisionControls").fadeIn(300);
              $("#nextDest").fadeIn(300);
            });
            //fade out selection graphics and navigation & add back the short navigation
          }
        }//else switch to next destionation
      }
      
      $("#"+tempId+" > .backBtn").on("click", function(){ slideMove( "backward" ); }).fadeTo(0, 0.35);
      $("#"+tempId+" > .forwardBtn").on("click", function(){ slideMove("forward"); });
    }
  }//loadDestination
  
  function incrementDestination(){
    
    var currentObj = App.Storage.curObj;
    var thisIndex = App.Storage.thisObjIndex;
    var calNum = App.Storage.calc;
    
    if( (App.Storage.calc === 1 && App.Storage.calcFirst === 0) || (App.Storage.calc === 2 && App.Storage.calcSecond === 0) ){
      
      if( (App.Storage.calc === 1 && App.Storage.curObj.location !== "Restaurant") || (App.Storage.calc === 2 && App.Storage.curObj.location === "Restaurant") ){
        //fadein and out nights stayed
        App.Storage.nights = App.Storage.nights + currentObj.stays;
        $("#staysView").find(".box").html(App.Storage.nights);
      }
      //add points earned
      App.Storage.points = App.Storage.points + currentObj["points"+calNum][thisIndex];
      $("#pointsView").find(".box").text( App.Storage.points ).digits();
      //add cash deduction
      App.Storage.cashSpent = currentObj["spent"+calNum][thisIndex];
      App.Storage.cash = App.Storage.cash - currentObj["spent"+calNum][thisIndex];
      $("#cashView").find(".box").text( "$"+App.Storage.cash ).digits();
      
    }
    
    App.Storage.calc === 1 ? App.Storage.calcFirst = 1 : null ;
    App.Storage.calc === 2 ? App.Storage.calcSecond = 1 : null ;
    
    App.Storage.calc++;
    
    //App.Storage.calcTimes++;
    
  }//incrementDestination
  
  function subtractTrunk(){
    
    if(App.Storage.subtractTrunk === 1){ //1 allows, 0 disallows for one time cycle through per destination
      App.Storage.subtractTrunk = 0;
      $("#twrapper > #t"+App.Storage.trunks).fadeTo(200, 0.35);
    }
    
  }
  
  function processDestination(){
    App.Storage.currentlevel++;
    App.Storage.calc = 1;
    App.Storage.calcFirst = 0;
    App.Storage.calcSecond = 0;
    
    var currentObj = DestInfo["level"+App.Storage.currentlevel+"_opt"+App.Storage.option];
    App.Storage.curObj = currentObj;
    
    var thisIndex = DestInfo.check(currentObj);
    App.Storage.thisObjIndex = thisIndex;
    
    //increment progress
    App.Storage.progress++;
    $("li#dot"+App.Storage.progress).children("div").removeClass("off").addClass("on");
      
    //check if trunks need to be deducted
    if(currentObj.decision === "wrong"){
      App.Storage.trunks --;
      App.Storage.subtractTrunk = 1;
      //$("#twrapper > #t"+App.Storage.trunks).fadeTo(200, 0.35);
    }
    
    App.Storage.pastlevels.push(currentObj);
    
    $(".displayOne > img").off("click");
    $(".displayTwo > img").off("click");
    
    loadDestination(currentObj);
  }//processDestination
  
  //Start button click from intro pages
  $(document).on("click", ".start", function(){
    $(this).router(function(){ //route to game play
      if(!$("#intro").is(':hidden')){ $("#intro").fadeOut(300); }// used for restart of game
      $("#imageSlides").fadeIn(300, function(){ processDestination(); }); //fade in the image slide DIV
      $(this).router(function(){}, false, "imageSlides");
    }, false, '', 0, 300);
  });
  
  //  SLIDE OUT MENU ON RIGHT HAND SIDE ON GAME PLAY SECTION
  $(document).on("click", ".clickMenu", function(){
    var percent = null;
    $sideMenu = $(".sideMenu");
    if($sideMenu.attr("name") === "open"){ percent = '-30%'; }else{ percent = '0%';}
    $sideMenu.animate({right : percent}, 500, function(){
      if($sideMenu.attr("name") === "open"){ $sideMenu.attr("name", "close"); }else{ $sideMenu.attr("name", "open"); } 
    });
  });
  
//////////////////////////////// INTRO HOUSE KEEPING ////////////////////////////////
  
  
  function preloadImgs(){
    iimg = 0;
    function rerunLoader(){
      $("#preloadImg").load("preload.html #preload"+iimg, function() {
        if(iimg < 39){
          iimg++;
          rerunLoader();
        }
      });
    }
    rerunLoader();
  }
  

  
  function setupPlayerInfo(){
    //SETUP GAME INFO BEFORE PLAYER STARTS GAME
    App.Storage.currentlevel = -1;
    App.Storage.pastlevels = [];
    App.Storage.cash = 8000;
    App.Storage.points = 0;
    App.Storage.option = 0;
    App.Storage.trunks = 3;
    App.Storage.progress = 0;
    App.Storage.nights = 0;
  }
  
  function toc(){
    if(App.Storage.tncAccepts < 2) {
      if(App.Storage.progress > 5){
        $(".rulesOptHead").html("TO RECEIVE YOUR REWARD, PLEASE ACCEPT THE TERMS AND CONDITIONS.");
      }else{
        $(".rulesOptHead").html("ACCEPT THE TERMS TO PLAY THE GAME.");
      }
    
      $("#lightbox").fadeIn(300);
      $(".acceptBtn").on("click", function(){
        App.Storage.tncAccepts++;
        $("#lightbox").fadeOut(300); 
        $(".acceptBtn").off("click"); 
        $(".denyBtn").off("click"); 
      });
      $(".denyBtn").on("click", function(){ 
        alert("You must accept the terms of the site to progress futher."); 
      });
    }   
  }
  
  function introInit(){
    //SLIDER ONLY FOR INTRODUCTION PAGES
    function introSlider(id, controlType){
      var slidePosition = 0;
      var slidesLength = $("#"+id).children("div").length - 1;
      var slideArray = [];
      
      $("#"+id).children("div").each(function(i){ slideArray[i] = $(this).attr("class"); });
      //Back button on intro page.
      $("#"+id).find(".backBtn").fadeTo(300, 0.5).on("click", function(){
        if(slidePosition > 0){
          $("#"+id).find(".forwardBtn").off().on("click", function(){
            if(slidePosition < slidesLength){
              $("#"+id).find(".backBtn").fadeTo(300,1);
              $("."+slideArray[slidePosition]).fadeOut(300, function(){
                slidePosition++;
                $("."+slideArray[slidePosition]).fadeIn(300);
              });
            }
          });
          $("."+slideArray[slidePosition]).fadeOut(300, function(){
            slidePosition--;
            $("."+slideArray[(slidePosition)]).fadeIn(300);
          });
        }
        if(slidePosition === 1){ $(this).fadeTo(300, 0.5); }
      });

      //Forward button on intro page.
      $("#"+id).find(".forwardBtn").on("click", function(){
        if(slidePosition < slidesLength){
          $("#"+id).find(".backBtn").fadeTo(300,1);
          $("."+slideArray[slidePosition]).fadeOut(300, function(){
            slidePosition++;
            $("."+slideArray[slidePosition]).fadeIn(300);
          });
        }
        if(slidePosition === (slidesLength - 1)){
          $('#introForward').off().on({
            'click' : function () { $('.js-introStart').trigger('click'); }
          });
        }
      });
    }
    
    if(App.Storage.playerStatus === 1){
      //IF PLAYER HAS AN ID OF 1 COME BACK FROM EVAN TO REMOVE STEP 2 FROM INTRO.PHP
      //AND SHOW CORRECT P TAGS ON STEP 3
      $("#intro > .step1").fadeIn(300);
      $("#intro > .step3").find(".defaultintro").fadeIn(300);
      $("#intro").find(".step2").remove();
      introSlider("intro", "controlsWide");
    }else if(App.Storage.playerStatus === 2){
      //IF PLAYER HAS AN ID OF 2 COME BACK FROM EVAN, DO NOT REMOVE STEP 2 FROM INTRO.PHP
      //AND SHOW THE CORRECT P TAGS ON STEP 3 (.EXCEPTION)
      $("#intro > .step1").fadeIn(300);
      $("#intro > .step3").find(".exception").fadeIn(300);
      introSlider("intro", "controlsWide");
    }
    
    if(App.Storage.playerStatus === 1 || App.Storage.playerStatus === 2){
      $(".acceptBtn").off("click"); 
      $(".denyBtn").off("click");
      toc();
    }
    
  }//introInit

  //form submit check if no HGP number is in the query URL
  function checkHGPform(that){
    var hgpNum = $("input#hgpid").val();
    ajaxCalls.checkHGP(hgpNum, function(isPlayer){
      if(isPlayer){ 
        $("#screenHGPlock").fadeOut(300);
        introInit();
      }else{
        $(".hgpNumAlert").fadeIn(200);
        $("#hgpId > input[name='id']").css({border: "1px red solid"});
      }
    });
  }
  
  //auto Get HGP ID from URL
  function getParameterByName(name) {
    var isPlayer = null;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    var thisResult = results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    
    if(thisResult === ''){
      ajaxCalls.getScreenForm();
    }else{
      ajaxCalls.checkHGP(thisResult, function(isPlayer){
        if(isPlayer){ 
          //do nothing
        }else{
          ajaxCalls.getScreenForm(); 
        }
      });
    }
  }
  
  // call click actions on router classes
  $(document).on("click", ".router", function(){
    $(this).router(function(){
    }, false, 0, 300);
    return false;
  });
  
  // set window lock when phone is vertical
  function sizelock(){
    $("#bodydimensions").html('body, #master, .screenSize, .layer {width:'+$(window).width()+'px; height:'+$(window).height()+'px;}');
    if($(window).width() < $(window).height()){
      ajaxCalls.getScreenLock();
    }else{
      $("#screenVlock").html('').fadeOut(100);
    }
  }

  function setvideo(){
    $(".videoBtn").on("click", function(){ 
      $("#movieBox").fadeIn(200);
    });
    $(".movieClose").on("click", function(){ 
      $("#movieBox").fadeOut(200); 
      $("#chaseMov")[0].pause(); 
    });
  }


  //Trigger Omniture Tracking
  function trigger_omniture(page_name) {
    if( (navigator.userAgent.match(/iphone|iPod/i)) || (navigator.userAgent.match(/Mobile/i) && navigator.userAgent.match(/Android/i)) ){
      s.pageName = "HyattChase_HYT4:Mobile_" + page_name;
      s.server = "hyatt.com";
      s.eVar26 = "en";
      s.prop26 = "en";
      s_code = s.t(); if (s_code) document.write(s_code);
    }
    else {
      s.pageName = "HyattChase_HYT4:Tablet_Home"
      s.server = "hyatt.com"
      s.eVar26 = "en"
      s.prop26 = "en"
      s_code = s.t(); if (s_code) document.write(s_code);
    }
  }

  //When Learn More is clicked, record Omniture click
  $('#link_learn_more').bind('click', function(e){
      // e.preventDefault();
    trigger_omniture('LearnMore');
    //window.open('url to page');
  });
  //When Rules is clicked, redirect to Rules page / record Omniture click
  $('#link_rules').bind('click', function(e){
    //e.preventDefault();
    //window.open('/mobile/rules.php');
    trigger_omniture('Rules');
  });
  //When Learn More is clicked, record Omniture click
  $('#link_terms').bind('click', function(e){
      e.preventDefault();
    trigger_omniture('Terms');
    //window.open('url to page');
  });

  // set window lock when phone is vertical
  $(window).resize(function() { sizelock(); });
  
  // initiate game, load init page
  $(document).router(function(){
    setvideo();
    getParameterByName('id');
    sizelock();
    setupPlayerInfo();
    introInit();
    preloadImgs();
  }, true);
}

//Android namespace
var Android = (function () {
  var fixDimensions = function(){
    /*Slightly modified version of function that sets dimensions of various elements around the page. Added 60px to make up for URL bar.*/

    $('body, #master, .screenSize').css({ 'width' : $(window).width(),  'height' : (window.innerHeight + 60)});

  };

  return {
    fixDimensions : fixDimensions
  }  
})();

 //grab the User Agent String.
  var ua = navigator.userAgent.toLowerCase();
  //Check if Android
  var isAndroid = ua.indexOf("android") > -1; 
if(isAndroid) {
  // Listen for resize/orientation changes
  $(window).on({
    'resize' : function() {
      // Get screen size (inner/outerWidth, inner/outerHeight)
    },
    'orientationchange' : function () {
      setTimeout(Android.fixDimensions, 500);
    }
  });
  Android.fixDimensions();
}


$(function(){
  initApp(); 
  window.addEventListener("load",function() {
    setTimeout(function(){
      window.scrollTo(0, 1);
      window.scrollTo(0, window.innerHeight);
    }, 0);
  }); 
});

$(window).load(function(){
  //Various fixes for Android

   if(isAndroid) {


    //Append Android specific stylesheet to head of page.
    $('<link href="/mobile/assets/style/android.css" rel="stylesheet" type="text/css" />').appendTo('head');

    setTimeout(function(){
      //Scrolling the page to hide URL bar.
      window.scrollTo(0, 1);
      window.scrollTo(0, window.innerHeight);
    }, 1000);

    Android.fixDimensions();
    
  }
})

