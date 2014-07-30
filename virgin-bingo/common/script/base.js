$(function(){
	var $window = $(window),
		$document = $(document),
		$master = $('#master'),
		$bg = $('#bkgnd'),
		aspectRatio = $bg.width() / $bg.height();

	window.App = {}; // parent App object 

	App.GameStat = {
		ddcorrect: 0, // 0 = lost small prize or not playing, 1 = won small prize, 2 = won large dd prize , 3 = lost large dd prize
		correctAnswered: 0,
		played: 0,
		incorrectAnswered: 0,
		question: [],
		choices: [],
		currentIndex: 0,
		winningSeq: [],
		losingSeq: [],
		boardNums: []
	};
	
	App.GameInfo = {
		cells: [],
		correctCells: [],
		correctAnswer: []
	},
	
	App.Partners = {
		picked: [],
		singleOffers: null,
		singleId: 0,
		singleTitle: '',
		all: []
	}
	
	//Start
	App.Page = {
		prev: '',
		current: '',
		next: '',
		pages: ['landing','pick_partners','game','defeated','success','register','doubledown','confirm']
	};

	App.LoadPage = {
		init: function(pageName, func){
			$("#game_logo > a").fadeIn(200);
			$('#'+App.Page.current).fadeOut(300, function(){
				
				$('#'+pageName).load(pageName+'.php', function() {
					$("#"+pageName).fadeIn(700);
					bindEvents();
					func();
				});
				
				App.Page.prev = App.Page.current;
				App.Page.current = pageName;
				
			});
		},

		welcome: function(){
			
			$("#game_logo > a").fadeOut(0);
			$('#landing').load('landing.php', function() {
				var played = $.cookie('played');
				
				if(played === "true"){
					App.GameStat.played = 1;
					$(".entertowin").fadeOut(0);
				}else{ 
					App.GameStat.played = 0;
				}
				
				//console.log(App.GameStat.played);
				
				$(this).fadeIn(300);
				bindEvents();
				dailyReward();
			});
			App.Page.current = 'landing';
			App.Page.prev = 'landing';
			
		}
	};

	App.AjaxCalls = {
		apiData: '',

		apiPartners : function(){
			$.ajax({
				type: 'POST',
				url: '/api/',
				data: {'option' : 'partners'},
				cache: false,
				async: false,
				success: function(data, textStatus, jqXHR){
					App.Partners.all = data;
				}
			});
		},
		
		apiPartner : function(p_id){
			$.ajax({
				type: 'POST',
				url: '/api/',
				data: {'option' : 'partner', 'partner_id' : p_id},
				cache: false,
				async: false,
				success: function(data, textStatus, jqXHR){
					App.Partners.singleOffers = data;
				}
			});
		},
		
		apiGame : function(partners, func){
			$.ajax({
				type: 'POST',
				url: '/api/',
				data: {'option' : 'game',
					'partners' : partners
				},
				cache: false,
				success:  function(data, textStatus, jqXHR){;
					App.GameInfo.cells = data[0];
					App.GameInfo.correctAnswer = data[1];
					func();
				}
			});
		},
		
		apiQuestion : function(question_id, func){
			$.ajax({
				type: 'POST',
				url: '/api/',
				data: {'option' : 'question',
					'qid' : question_id
				},
				cache: false,
				success:  function(data, textStatus, jqXHR){
					App.GameStat.question = data['q'];
					App.GameStat.choices = data['a'];
					returntype = textStatus;
					func();
				}
			});
		},

		apiRegister: function(emailAddress, firstname, lastname, elevateNum, prizeid, daily_prize, epic_prize){
			var dataObject = {
				'option' : 'register', 
				'first_name' : firstname, 
				'last_name' : lastname, 
				'email' : emailAddress, 
				'eid' : elevateNum, 
				'enter_daily_prize' : daily_prize, 
				'enter_epic_prize' : epic_prize };
			if(prizeid !== null){ dataObject['prize'] = prizeid; }
			$.ajax({
			    type:   'POST',
			    url:    '/api/',
			    data:   dataObject,
			    cache: false,
			    success: function(data, textStatus, jqXHR){

			    },
			    complete: function(xhr, textStatus){
				    //console.log(data);
			        //func();
			    },
			});
		}
	};

	//Init load of welcome page
	App.LoadPage.welcome();
	registerHash();
	App.AjaxCalls.apiPartners();
	
	function closeGame(){
		var thisDate = $("body").attr("time");
		if(thisDate > 1378598400){
			$("#footer, #landing").fadeOut(200, function(){
				$(this).remove();
				$("#logo").animate({right:"702px"},300);
			});
			$("#main").prepend('<div class="endGame"><p>Unfortunately the game has ended, but you can still grab a seat and learn more about our Elevate<sup>&#174;</sup> partners by visiting <a href="http://www.virginamerica.com/">virginamerica.com</a>.</p></div>');
		}
	}
	closeGame();

	function registerHash(){
		if(window.location.hash === "#entertowin"){
			setTimeout(function(){ loadnextpage('register'); }, 1000);
		}
	}
	
	function customScrollbar(){
		$("#scroll_wrapper").mCustomScrollbar({
			scrollButtons:{enable:true},
			scrollInertia:600,
			autoDraggerLength:false
		});
	};
	
	//load next page
	function loadnextpage(thisPage){
		App.LoadPage.init(thisPage, function(){
			//load Partners from stored api data
			if(thisPage === 'pick_partners'){ partnersLoad(); customScrollbar(); }
			if(thisPage === 'game'){ gameInit(); }
			if(thisPage === 'defeated'){ partnersLoadSorry(); loaddefeatedCopy(); }
			if(thisPage === 'success'){ offerAwarded(); };
			if(thisPage === 'doubledown'){ doubleDownInit(); };
			if(thisPage === 'register'){ dailyReward(); offerAwarded(); registerSubmit(); }  //offerAwarded() 
			if(thisPage === 'confirm'){ offerAwarded("confirm"); socialWinInput(); partnersLoadSorry(); 
					var socialShareInit = new SocialShareInit();
					socialShareInit.init();
			}
		});
	};
		
	//load partners for selection
	function partnersLoad(){
		function makePartner(num, title){
			$('#partner_wrapper #scroll_wrapper').append('<div id="'+num+'" class="partner" data-title="'+title+'"><img src="/images/logos/'+num+'.jpg" /><div class="selectPartner"><span></span>SELECT<div></div></span></div></div>');
		};
		//loop through each partner and place it on page
		$.each(App.Partners.all, function(i, v){
			makePartner(v[0], v[1]);
		});
		//bind click event to each partner logo
		$('.partner').bind('click', function(){
			var partnerId = $(this).attr("id");
			if($(this).hasClass('checked')){
				$(this).removeClass('checked');
				$(this).children("div").children("span").css({ 'backgroundPosition' : 0+'px' });
				$('li#p_'+partnerId).fadeOut(300, function(){ $(this).remove(); });
			}else {
				$(this).addClass('checked');
				$(this).children("div").children("span").css({ 'backgroundPosition' : -22+'px' });
				$('#pickedWrapper').append('<li id="p_'+partnerId+'" style="display:none;"><img src="/images/logos/'+partnerId+'.jpg" /></li>');
				$('li#p_'+partnerId).fadeIn(300);
			}
		});
	};

	function partnersLoadSorry(){
		function makePartner(num, title, url){
			$('#partner_wrapper #logo_wrapper').append('<a href="'+url+'" target="_blank"><div class="partnerSorry" data-title="'+title+'"><img src="/images/logos/'+num+'.jpg" /></div></a>');
		};
		$.each(App.Partners.all, function(i, v){
			makePartner(v[0], v[1], v[3]);
		});
	};
	
	function partnerCookie(){
		// Number(randomNum(1,5))
		var partnersPicked = App.Partners.picked;
		var partnerSelected = '';
		var partnersCookieArray;

		function setPartner(randomNumber){
			var partnerPosition = [];
			partnerPosition =  Number(App.Partners.picked[randomNumber]);
			return partnerPosition;
		};

		//1. get cookie (partner id array)
		$partnersCookie = $.cookie('partners');

		if($partnersCookie === undefined){ //cookie does not exist
			notmatchedPartners = [];
		}else{
			//2. compare partner array to pick 6 array
			//3. filter out matches
			var countW = 0;
			var countA = 0;
			partnersCookieArray = $partnersCookie.split(",");
			var notmatchedPartners = [];

			while(countW < partnersPicked.length){
				var dup = false;
				for(var i=0; i < partnersCookieArray.length; i++){
					if( Number(partnersPicked[countW]) === Number(partnersCookieArray[i]) ){ dup = true; break; }
				}

				if(dup === false){
					notmatchedPartners[countA] = Number(partnersPicked[countW]);
					countA++;
				}
				countW++;
			}
		}

		//4. randomly choose 1 from remanding
		if(notmatchedPartners.length === 0){
			if($partnersCookie !== undefined){
				partnerSelected = Number(partnersCookieArray[0]);
			}else{
				partnerSelected = partnersPicked[0];
			}
		}else if(notmatchedPartners.length === 1){
			partnerSelected = Number(notmatchedPartners[0]);
		}else{
			var newRanNum = Number(randomNum(0,(notmatchedPartners.length -1) ));
			partnerSelected = notmatchedPartners[newRanNum];
		}

		//5. filter out Partner to signle selected partner
		App.AjaxCalls.apiPartner(partnerSelected);
		App.Partners.singleId = partnerSelected;
		for(key in App.Partners.all){
			if(Number(App.Partners.all[key][0]) === Number(partnerSelected)){
				App.Partners.singleTitle = App.Partners.all[key][1];
			}
		}

		//7. reset cookie with new partner id
		if($partnersCookie === undefined){
			$.cookie('partners', partnerSelected, { expires: 30 });
		}else{
			if(partnersCookieArray.length < 6){
				partnersCookieArray.push(partnerSelected); 
			}else{
				partnersCookieArray.shift();
				partnersCookieArray.push(partnerSelected);
			}
			$.cookie('partners', partnersCookieArray, { expires: 30 });
		}
	};

	function randomNum(min, max){
		return random = Math.floor(Math.random() * (max - min + 1)) + min;
	};

	function randomBoardNums(){
		var rows = [],
			numCount = [0,15,30,45,60,75,90],
			boardHTML = '',
			rowIndex = 0,
			cellCount = 1;

		for(i=0; i<6; i++){ // the arrays
			var newArray = [];
			var ii = 0; // position of inner array index

			while(ii < 6){
				var randomnumber = randomNum((numCount[i]+1), numCount[i+1]);
				var duplicate = false;

				for(var j=0; j<newArray.length; j++){ 
					if(newArray[j] === randomnumber){ duplicate = true; break; }
				};

				if(!duplicate){
					newArray[ii] = randomnumber;
					if(ii == 5){ rows[i] = newArray;  }
					ii++;
				}
			};//while
		};//for

		App.GameStat.boardNums = rows;

		//interate of the 36 bingo sponts
		for(var j=0; j<6; j++){ 
			//for the start of each row make a div wrapper
			boardHTML += '<div class="game_row">'; 

			for(var jj=0; jj<6; jj++){
				boardHTML += '<div id="cell' + cellCount + '" class="game_cell open"><span>' + rows[jj][rowIndex] + '</span></div>';
				cellCount++;
			}
			boardHTML += '</div>'; 
			rowIndex++;
		}
		$("#game_board").html(boardHTML);
	};

	function winSeqInit(){
		var winningSeq = [];
		var positionArray = [];
		var pos = 0;

		var winArray = App.GameInfo.cells; //[1,2,3,4,5,6]
		var randomIndex = randomNum(0, 5);
		var lastNum = winArray[randomIndex]; //pull the random number out of the array
		winArray.splice(randomIndex, 1); //Remove lastNum from index
		var randomWinSeq = randomNum(8, 11);

		//make winning Sequence
		while(pos < randomWinSeq){
			var randomnumber=randomNum(1, 36);
			var duplicate = false;
			//check winning numbers
			for(var i=0; i<winArray.length; i++){ 
				if(winArray[i] === randomnumber || lastNum === randomnumber){ duplicate = true; break; }
			}
			//check winningSeq array for duplicates
			for(var j=0; j<winningSeq.length; j++){ 
				if(winningSeq[j] === randomnumber){ duplicate = true; break; }
			}
			if(!duplicate){ // if no duplicates
				winningSeq[pos]= randomnumber; 
				pos++;
			}
		};

		//make positions for winArray to be placed into winningSeq
		while(positionArray.length < 5){
		  var randomnumber = randomNum(1, (randomWinSeq - 1));
		  var found=false;
		  for(var i=0;i<positionArray.length;i++){
		    if(positionArray[i]==randomnumber){found=true;break}
		  }
		  if(!found)positionArray[positionArray.length]=randomnumber;
		}

		//merge winArray numbers into winningSeq positions
		for(i=0; i<5; i++){ winningSeq[positionArray[i]] = winArray[i]; };

		//push last winning number onto last position of winningSeq
		winningSeq.push(lastNum);
		App.GameStat.winningSeq = winningSeq;

//		console.log("lastNum: "+ lastNum);
//		console.log("winArray: "+ winArray);
//		console.log("randomWinSeq: "+ randomWinSeq);
//		console.log("position: "+ positionArray);
//		console.log('winningSeq count: ' + winningSeq.length + ', winningSeq: ' + winningSeq);
		losingSeq();
		return true;
	};

	function losingSeq(seq){
		var loseSeqArray = [];
		var compareArray = [];
		var winSeq = App.GameStat.winningSeq;
		var pos = 0;
		var pos2 = 0;

		while(pos < (36 - winSeq.length)){
			var randomnumber = randomNum(1, 36);
			var duplicate = false;
			
			for(var i=0; i < winSeq.length; i++){ 
				if(winSeq[i] === randomnumber){ duplicate = true; break; }
			}
			//check winningSeq array for duplicates
			for(var j=0; j < loseSeqArray.length; j++){ 
				if(loseSeqArray[j] === randomnumber){ duplicate = true; break; }
			}
			
			if(!duplicate){ // if no duplicates
				loseSeqArray[pos] = randomnumber; 
				pos++;
			}
		}

		App.GameStat.losingSeq = loseSeqArray;
//		console.log('losingSeq count:' + loseSeqArray.length);
//		console.log('losingSeq:' + loseSeqArray);
	};

	//Preload game page 
	function gameInit(){
		var question_id = App.GameInfo.correctAnswer[App.GameStat.currentIndex][0],
			current_answer = App.GameInfo.correctAnswer[App.GameStat.currentIndex][1];

		$('#submit_choice').unbind('click');
		//console.log("hide next q");
		$('#next_question').unbind('click').fadeOut(300);
		
		App.AjaxCalls.apiQuestion(question_id, function(){ //populate question and answer
//			console.log('Current Game Question: ' + App.GameStat.question);
//			console.log('Current Game Choices: ' + App.GameStat.choices);
			App.GameStat.currentIndex ++;

			if(App.GameStat.currentIndex === 1){
				winSeqInit(); //generate game sequences of cell IDs
				randomBoardNums(); //generate visiual numbers
				partnerCookie();
			}else{
				$('#game #answers_wrapper ul li').remove();
			}

			$('#question_wrapper .question').html(App.GameStat.question);
			$.each(App.GameStat.choices, function(i,choice){
				if(choice == ''){
					return false;
				}else {
					$('#game #answers_wrapper ul').append('<li><div class="icon" /><div class="txt">' + choice + '</div></li>');
					$('#game #answers_wrapper ul li').hide();
				}
			});

			$('#game #answers_wrapper ul li').length ? selectChoice(current_answer) : null;

			$('#game #answers_wrapper ul li').each(function(i){
				var h = Math.floor($(this).height());
				var margin =  Math.floor((h - 20) / 2);
				$(this).children("div").eq(0).css({ 'margin-top' : margin+'px', 'margin-bottom' : margin+'px' });
			});
			//return true;
		});
		return true;
	};

	function doubleDownInit(){
		var question_id = App.GameInfo.correctAnswer[0,36][0],
			dd_current_answer = App.GameInfo.correctAnswer[0,36][1];

		App.AjaxCalls.apiQuestion(question_id, function(){ //populate question and answer
//			console.log('Current DD Question: ' + App.GameStat.question);
//			console.log('Current DD Choices: ' + App.GameStat.choices);

			$('#question_wrapper .question').html(App.GameStat.question);
			$.each(App.GameStat.choices, function(i,choice){
				if(choice == ''){
					return false;
				}else {
					$('#doubledown #answers_wrapper ul').append('<li><div class="icon" /><div class="txt">' + choice + '</div></li>');
					$('#doubledown #answers_wrapper ul li').hide();
				}
			});

			$('#doubledown #answers_wrapper ul li').fadeIn(800);
//			console.log('current answer / choice: ' + (dd_current_answer + 1));

			$('#doubledown #answers_wrapper li').hover(
				function(){
					$(this).addClass('hover');
				},
				function(){
					$(this).removeClass('hover');
				}
			).bind('click', function(){
				$('#doubledown #answers_wrapper li').removeClass('selected');
				$(this).addClass('selected');
			});

			$('#submit_dd_choice').bind('click', function(){
				var selected_answer = $('#doubledown #answers_wrapper li.selected').index();

				if($('#doubledown #answers_wrapper li.selected').length < 1){
					var msg = 'please select an answer';
					Function.triggeralertbox(msg);
				}
				else {
					$('#doubledown #answers_wrapper li').addClass('wrong_choice').delay(200).animate({'color': jQuery.Color('#bd727b')}, 500);
					$('#doubledown #answers_wrapper .wrong_choice').eq(dd_current_answer).addClass('correct_choice').removeClass('wrong_choice');

					//Choice is correct Answer
					if(dd_current_answer == selected_answer){
						//start animation
						$('#submit_choice').fadeOut(600);
						$('#response_correct').fadeIn(800);
						App.GameStat.ddcorrect = 2; // === won dd
						setTimeout(function(){loadnextpage('register');},2000);
					}
					else {
						//start animation
						$('#submit_choice').fadeOut(600);
						$('#response_incorrect').fadeIn(800);
						App.GameStat.ddcorrect = 3; // === lost dd
						setTimeout(function(){loadnextpage('defeated');},2000);
					}//Close if user selected an answer
				}
			});
		});
	}

	function partnersSelect(){
		var partnerArray = [],
			count = 0,
			mixedpartnerArray = [],
			positionArray = [];
		//add selected partners to an array
		$('.mCSB_container').children('div').each(function(i){
			if($(this).hasClass('checked')){
				partnerArray[count] = $(this).attr('id');
				count++;
			}
		});
		//check to see if the correct amount of partners have been selected
		//if correct then save data, call game api to load game and continue to next page
		if(partnerArray.length > 6 || partnerArray.length < 6){
			var msg = 'Please make sure you pick six partners in total.';
			Function.triggeralertbox(msg);
		} else {
			//randomize and save partner data
			count = 0
			while(count < partnerArray.length){
				var duplicate = false;
				var tempNumber = randomNum(0,5);
				for(var i=0; i<positionArray.length; i++){
					//console.log(tempNumber +" :: "+ positionArray[i]);
					if(tempNumber == positionArray[i]){ duplicate = true; break; }
				}
				if(!duplicate){
//					console.log("placed "+tempNumber);
					positionArray[count] = tempNumber;
					count++;
				}
			}
			for(var j=0; j<positionArray.length; j++){
				mixedpartnerArray[j] = partnerArray[positionArray[j]];
			}
//			console.log("new array"+ mixedpartnerArray);
			App.Partners.picked = mixedpartnerArray;
			//send out for game setup AJAX call
			App.AjaxCalls.apiGame(mixedpartnerArray, function(){ 
				loadnextpage("game"); //call back to load game page
			}); 
		}
	};

	function selectChoice(current_answer){
		$('#answers_wrapper ul li').fadeIn(800);
//		console.log('current answer / choice: ' + (current_answer + 1));
		$('#answers_wrapper li').hover(
			function(){
				$(this).addClass('hover');
			},
			function(){
				$(this).removeClass('hover');
			}
		).bind('click', function(){
			$('#answers_wrapper li').removeClass('selected');
			$(this).addClass('selected');
		});
		$('#submit_choice').fadeIn(500);
		$('#submit_choice').bind('click', function(){
			var selected_answer = $('#answers_wrapper li.selected').index();

			if($('#answers_wrapper li.selected').length < 1){
				var msg = 'please select an answer';
				Function.triggeralertbox(msg);
			}
			else {
				$('#answers_wrapper li').addClass('wrong_choice').delay(200).animate({'color': jQuery.Color('#bd727b')}, 500);
				$('#answers_wrapper li').eq(current_answer).addClass('correct_choice').removeClass('wrong_choice');

				//Choice is correct Answer
				if(current_answer == selected_answer){
					App.GameStat.correctAnswered ++;

					//start animation
					$('#submit_choice').fadeOut(400, function(){
					$('.game_row .open').animate({'color':'#bd727b'}, 400);
						var blink = setInterval(function(){gridTransition()},100);
						//stop animation
						setTimeout(function(){clearInterval(blink);},2400);
						setTimeout(function(){animateCorrectAnswer(App.GameStat.correctAnswered);},2600);
					});
				}
				else {
					App.GameStat.incorrectAnswered ++;

					//start animation
					$('#submit_choice').fadeOut(400, function(){
						$('.game_row .open').animate({'color':'#bd727b'}, 400);
						var blink = setInterval(function(){gridTransition()},100);
						//stop animation
						setTimeout(function(){clearInterval(blink);},2400);
						setTimeout(function(){animateWrongAnswer(App.GameStat.incorrectAnswered);},2600);
					});
				}//Close if user selected an answer
			}
		});
	};

	//Fade in Cells randomly
	function gridTransition() {
		$('#game_board').each(function(){
			var $cell = $(this).find('.open');
			var cell_amount = $cell.length;
			var random_cell = $cell.eq(Math.floor(cell_amount*Math.random()));

			random_cell.animate({'color': jQuery.Color('#fff')}, 100, function(){
				$(this).animate({'color': jQuery.Color('#bd727b')}, 100);
			});
		});
	}

	function animateCorrectAnswer(numberCorrect){
//		console.log('numberCorrect ' + numberCorrect);
		var correctCell = App.GameStat.winningSeq[numberCorrect-1];
//		console.log('correctCell ' + correctCell);

		$('#cell' + correctCell).removeClass('open').stop(true,true).animate({'color': jQuery.Color('#fff')}, 50, function(){
			var times_run = 0;
			var testing = setInterval(function(){
				times_run += 1;
				if(times_run === 6){clearInterval(testing);}
				$('#cell' + correctCell).animate({'color': jQuery.Color('#bd727b')}, 100, function(){
					$(this).animate({'color': jQuery.Color('#fff')}, 100);
				});
			},100);

			$(this).addClass('correct').append('<div class="correct_badge"><img src="/common/img/icon/bingo_dot.png" alt="" /></div>').children('span').delay(1200).fadeOut(800);
			$(this).children('div').hide().delay(1400).fadeIn(1000);

			//Bingo. 
			if(App.GameStat.correctAnswered == App.GameStat.winningSeq.length) {
				//alert('BINGO! you have earned an award');
				App.GameStat.ddcorrect = 1; //won small prize
				if(App.GameStat.played === 1){
					setTimeout(function(){loadnextpage('confirm');},2000);
				}
				else {
					setTimeout(function(){loadnextpage('success');},2000);
				}
			}
			else {
				nextQuestion();
			}
		});
	};

	function animateWrongAnswer(numberIncorrect){
//		console.log('numberIncorrect ' + numberIncorrect);
		var incorrectCell = App.GameStat.losingSeq[numberIncorrect-1];
//		console.log('incorrectCell ' + incorrectCell);
		$('#cell' + incorrectCell).addClass('incorrect');

		$('#cell' + incorrectCell).removeClass('open').stop(true,true).animate({'color': jQuery.Color('#fff')}, 50, function(){
			var times_run = 0;
			var testing = setInterval(function(){
				times_run += 1;
				if(times_run === 6){clearInterval(testing);}
				$('#cell' + incorrectCell).animate({'color': jQuery.Color('#bd727b')}, 100, function(){
					$(this).animate({'color': jQuery.Color('#fff')}, 100);
				});
			},100);

			$(this).addClass('incorrect').children('span').delay(1300).fadeOut(700, 'easeInQuad');
			setTimeout(function(){$('.incorrect span').rotate({animateTo:720});},1600);

			//Answered incorrect too many times - No more possibilities for a Bingo
			if(App.GameStat.incorrectAnswered > (App.GameStat.losingSeq.length - 1)) {
				//alert('No BINGO for you! you have answered incorrect too many times');
				App.GameStat.ddcorrect = 0; //won nothing
				setTimeout(function(){loadnextpage('defeated');},2000);
			}
			else {
				nextQuestion();
			}
		});
	};

	function nextQuestion(){
		$('#next_question').delay(2300).fadeIn(500).bind('click', function(){
			$(this).hide();
			gameInit();
			$('#game #answers_wrapper ul li').fadeOut(800, function(){
				$('.game_row .open').animate({'color':'#fff'}, 500);
			});
		});
	};

	function offerAwarded(pageType){
		if(App.GameStat.played === 0){
			if(App.GameStat.ddcorrect === 0){ //only registering not playing
				//do nothing
			}else if(App.GameStat.ddcorrect === 1){ //recieved small offer
				$('.awarded_offer').append('<h1>You\'ve Won:</h1><div class="partner_offer"><img src="/images/logos/' + App.Partners.singleId + '.jpg" alt="' + App.Partners.singleTitle + '" /></div><div id="partner_offer_desc">' + App.Partners.singleOffers.offer_small + '</div>');
			}else if(App.GameStat.ddcorrect === 2){ //recieved large offer
				if(pageType === "confirm"){$('.confirmpg').prepend("<h2>Here's your offer:</h2>");}
				$('.awarded_offer').append('<h1>You\'ve Won:</h1><div class="partner_offer"><img src="/images/logos/' + App.Partners.singleId + '.jpg" alt="' + App.Partners.singleTitle + '" /></div><div id="partner_offer_desc">' + App.Partners.singleOffers.offer_large + '</div>');
			}else{
				//do nothing
			}
		}
	}

	function validate_checksum(RelId){
		 if (RelId.length != 11) {
		     return false;
		 }
		 var sum = 0;
		 var factor;
		 var check_digit;
		 for (var i = 0; i < 10; i++) {
		     switch (i) {
		         case 0: factor = 6; break;
		         case 1: factor = 5; break;
		         case 2: factor = 4; break;
		         case 3: factor = 3; break;
		         case 4: factor = 8; break;
		         case 5: factor = 7; break;
		         case 6: factor = 6; break;
		         case 7: factor = 5; break;
		         case 8: factor = 4; break;
		         case 9: factor = 3; break;
		     }
		     sum += (RelId[i] * factor);
		 }
		 var remainder = sum % 11;
		 if (remainder < 2) {
		     check_digit = '0';
		 } else {
		     check_digit = 11 - remainder;
		 }
		 if (check_digit == RelId[10]) {
		     return true;
		 } else {
		     return false;
		 }
	}

	function registerSubmit(){
		
		$("#registerBtn").unbind("click");
		
		$(".mainInputs > input").focus(function(){
			var inputVal = $(this).val();
			if(inputVal === "First Name" || inputVal === "Last Name" || inputVal === "Email" || inputVal === "Elevate #" ){
				$(this).attr("title", inputVal).val('');
			}
		});
		
		$(".mainInputs > input").blur(function(){
			var inputVal = $(this).val();
			if(inputVal === '' ){
				$(this).val( $(this).attr("title") );
			}
		});
		
		$("#dailyPrize, #epicPrize").bind("click", function(){
			//alert($(this).attr("name"));
			if($(this).attr("name") === "false"){
				$(this).attr("name", "true").css({ "backgroundPosition" : -22+'px '+0+'px' });
			}else{
				$(this).attr("name", "false").css({ "backgroundPosition" : 0+'px '+0+'px' });
			}
		});
		
		$("#registerBtn").bind("click", function(){
			var firstnameVal = null,
				lastnameVal = null,
				emailVal = null,
				elIdVal = null,
				prizeid = null,
				daily_prize = 1,
				epic_prize = 1,
				msg = "<ul style='padding-left: 85px; width:65%;'><b>Please correct the following errors:</b> <br>",
				msgObj = { msg1 : "", msg2 : "", msg3 : "", msg4 : "" },
				error = 0;
			//var errorAlert = "There was an issue with the following: \n";
					
			$Rfirstname = $("input[name='firstName']").val(),
			$Rlastname = $("input[name='lastName']").val(),
			$Remail = $("input[name='email']").val(),
			$RelId = $("input[name='elevate']").val();

			if($("#dailyPrize").attr("name") === "true"){ daily_prize = 1; }else{ daily_prize = ''; }
			if($("#epicPrize").attr("name") === "true"){ epic_prize = 1; }else{ epic_prize = ''; }
			
			if($Rfirstname === '' || $Rfirstname === 'First Name'){
				$("input[name='firstName']").css({border: "1px solid red"});
				firstnameVal = '';
				msgObj.msg1 = "<li>Fill out first name</li>";
				error++;
			}else{
				$("input[name='firstName']").css({border: "1px solid #FFF"});
				firstnameVal = $Rfirstname;
				msgObj.msg1 = "";
				error-1;
			}
			
			if($Rlastname === '' || $Rlastname === 'Last Name'){
				$("input[name='lastName']").css({border: "1px solid red"});
				lastnameVal = '';
				msgObj.msg2 = "<li>Fill out last name</li>";
				error++;
			}else{
				$("input[name='lastName']").css({border: "1px solid #FFF"});
				lastnameVal = $Rlastname;
				msgObj.msg2 = "";
				error-1;
			}
			
			var emailuserPat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if( !emailuserPat.test($Remail)){ 
//				console.log("email error");
				$("input[name='email']").css({border: "1px solid red"});
				emailVal = '';
				msgObj.msg3 = "<li>Enter a valid email</li>";
				error++;
			}else{
//				console.log("email works");
				$("input[name='email']").css({border: "1px solid #FFF"});
				emailVal = $Remail;
				msgObj.msg3 = "";
				error-1;
			}
			
			if($RelId === '' || $RelId === 'Elevate #'){
				$("input[name='elevate']").css({border: "1px solid red"});
				elIdVal = '';
				msgObj.msg4 = "<li>Enter a valid Elevate number</li>";
				error++;
			}else{
				if(validate_checksum($RelId)){
					$("input[name='elevate']").css({border: "1px solid #FFF"});
					elIdVal = $RelId;
					msgObj.msg4 = "";
					error-1;
				}else{
					$("input[name='elevate']").css({border: "1px solid red"});
					elIdVal = '';
					msgObj.msg4 = "<li>Enter a valid Elevate number</li>";
					error++;
				}
			}
			
			if(error > 0){ 
				//for(var i=1; i < 5; i++){
				for(key in msgObj){
					//console.log( (msg+String(i)) );
					if(msgObj[key] !== ''){ msg += msgObj[key]; }
				}
				
				Function.triggeralertbox(msg+="</ul>");
			}else{ 
			
				if(App.GameStat.ddcorrect === 0){
					prizeid = null;
				}else if(App.GameStat.ddcorrect === 1){
					prizeid = App.Partners.singleId+"-S";
				}else if(App.GameStat.ddcorrect === 2){
					prizeid = App.Partners.singleId+"-L";
				}else{
					prizeid = null;
				}
				
				// 0 = lost small prize or not playing, 1 = won small prize, 2 = won large dd prize , 3 = lost large dd prize
				App.AjaxCalls.apiRegister(emailVal, firstnameVal, lastnameVal, elIdVal, prizeid, daily_prize, epic_prize);
				$("#gifload").fadeOut(200, function(){
					$("#registerBtn").delay(1000).fadeIn(200);
				});
				
				if(App.GameStat.ddcorrect === 1 || App.GameStat.ddcorrect === 2){
					$.cookie('played', true, { expires: 1 });
				}
				
				loadnextpage('confirm');
				
			};
			
		});
		
	}
	
	function loaddefeatedCopy(){
		if(App.GameStat.ddcorrect === 0){
			$(".defeatedCopy").html("Though you didn't get six in a row, you can always play again or register and enter for the chance to win the daily prize. Check out our <a target='_blank' href='http://www.virginamerica.com/frequent-flyer/elevate-partners.html'>Elevate partners</a> to see the kinds of rewards you'll be in the running for.");
		}
		if(App.GameStat.ddcorrect === 3){
			$(".defeatedCopy").html("Though you didn't get the Double Down question correct, you can always play again or register and enter for the chance to win the daily prize.");
		}
	}
	
	function socialWinInput(){
		var prizeMsg;
		
		if(App.GameStat.ddcorrect === 0){
//			console.log("did not win 1");
			prizeMsg = "I just played Go Big Bingo for the chance to win epic prizes from Virgin America and their top Elevate partners. Get your chance to win here: http://bit.ly/gobigbingo"; //nothing
		}else if(App.GameStat.ddcorrect === 1){
//			console.log("won small");
			prizeMsg = "I just played Go Big Bingo and won "+App.Partners.singleOffers.offer_small+" through "+App.Partners.singleTitle+". Get your chance to win here: http://bit.ly/gobigbingo"; //small prize
		}else if(App.GameStat.ddcorrect === 2){
//			console.log("won big");
			prizeMsg = "I just played Go Big Bingo and won "+App.Partners.singleOffers.offer_large+" through "+App.Partners.singleTitle+". Get your chance to win here: http://bit.ly/gobigbingo"; //large prize
		}else{
//			console.log("did not win 2");
			prizeMsg = "I just played Go Big Bingo for the chance to win epic prizes from Virgin America and their top Elevate partners. Get your chance to win here: http://bit.ly/gobigbingo"; //lost prize
		}
		$("a.js-facebook").attr("data-socialpost", prizeMsg);
	}
	
	function resetGame(){ // reset the game  
		$("div").unbind();
		
		var played = $.cookie('played');
		if(played === "true"){
			App.GameStat.played = 1;
			$(".entertowin").fadeOut(0);
		}else{ 
			App.GameStat.played = 0;
		}
		
		if(App.GameStat.played === 1){ $(".entertowin").fadeOut(0); }
					
		var keepCookie = App.GameStat.played;
		
		for(key in App.GameStat){
			var resettype = null;
			if(typeof key === "number"){
				App.GameStat[key] = 0;
			}else{
				App.GameStat[key] = [];
			}
		}
		
		for( key in App.GameInfo){
			App.GameInfo[key] = [];
		}
		
		App.GameStat.currentIndex = 0;
		App.GameStat.incorrectAnswered = 0;
		App.GameStat.correctAnswered = 0;
		App.GameStat.ddcorrect = 0;
		App.GameStat.played = keepCookie;
		
		App.Partners.picked = [];
		App.Partners.singleOffers = null;
		App.Partners.singleId = 0;
		App.Partners.singleTitle = '';
		App.Partners.all = [];
		
		
		// fade in the landing page and fadeout/remove innerHTML from other divs
		$("#game_logo > a").fadeOut(300);
		$('#landing').fadeIn(300, function landingFadeIn(){ 
			$('#pick_partners, #game, #defeated, #success, #register, #confirm').fadeOut(300, function removeHTML(){
				$(this).html('');
			});

			bindEvents();
			// Reset Page References 
			App.Page.current = 'landing';
			App.Page.prev = 'landing';
			// Call partners and load answer array
			App.AjaxCalls.apiPartners();
		});
		
	};
	
	function dailyReward() {
		var date = new Date(),
			day = String(date.getDate()),
			month = String(date.getMonth()+1);
		$('.dailyPrize').html('<img src="/common/img/daily/'+month+'_'+day+'.png" alt="" />');
	}

	function resizeBg() {
		if(($window.width() / $window.height()) < aspectRatio){
			$bg.removeClass().addClass('bgheight');
		} else {
			$bg.removeClass().addClass('bgwidth');
		}
	}
	$window.resize(resizeBg).trigger('resize');
		
	//Bind Events for ajax calls
	function bindEvents(){
		//Move to next page button click
		$('.btn_continue').bind('click', function(){ 
			var nameVal = $(this).attr("name");
			loadnextpage(nameVal); 
			return false;
		});

		$('.entertowin, #sorryRegister').bind('click', function(){
			loadnextpage('register'); 
			return false;
		});

		//Select Partners on Partners page
		$('#selectSix').bind('click', function(){
			partnersSelect();
			return false;
		});
		
		$('#double_down').bind('click', function(){
			loadnextpage('doubledown');
			return false;
		});

		$('#keep_offer').bind('click', function(){
			loadnextpage('register');
			return false;
		});
		
		$('.reset').bind('click', function(){
			resetGame(); 
			return false; 
		});
	};

	function SocialShareInit(){
		 this.init = function () {
		
			$(".js-facebook").unbind("click");
		    $(".js-twitter").unbind("click");

		    $(".js-facebook").on({
		        click: this.facebook
		    });
		    $(".js-twitter").on({
		        click: this.twitter
		    });
		};
		this.facebook = function () {
		    var e = encodeURIComponent("http://gobigbingo.virginamerica.com/"),
		        t = encodeURIComponent($(this).attr("data-socialtitle")),
		        n = encodeURIComponent($(this).attr("data-socialpost")),
		        r = encodeURIComponent($(this).attr("data-socialimage"));
		    window.open("http://facebook.com/sharer/sharer.php?s=100&p[url]=" + e + "&p[title]=" + t + "&p[images][0]=" + r + "&p[summary]=" + n,+ "_blank", "width=600, height=260");
		};
		this.twitter = function () {
		    var e = encodeURIComponent("http://bit.ly/gobigbingo"),
		        t = encodeURIComponent($(this).attr("data-socialtitle")),
		        n = encodeURIComponent($(this).attr("data-socialpost")),
		        r = encodeURIComponent($(this).attr("data-socialimage"));
		    window.open("https://twitter.com/intent/tweet?text=" + n + "&url=" + e, "_blank", "width=600,height=400");
		};
	};
	
});
