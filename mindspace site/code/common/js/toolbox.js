var slidePosition;
var ie = false;

//
// jQuery plugins. These can get put someplace else.
//
// - $.fn.scaleToCover - centers a background image
//
(function($) {
	$.fn.extend({

		// Rescales and centers an image. Uses jquery.imagesloaded;
		//
		//   {  src: '/path/to/image.jpg',
		//     what: $('object-to-cover'),
		//    where: $('where-to-append-image') }
		//
		scaleToCover: function(options) {
			var $window     = $(window);

			return this.each(function() {
				var $img        = $(this);
				var $what       = $(options.what);
				var $where      = $(options.where);
				var imgAspect   = 0.0;
				var initialized = false;

				var init = function() {
					initialized = true;
					$img.appendTo($('body'));
					imgAspect = $img.width() / $img.height();
					rescale();
					$img.appendTo($where);
				}

				var tryRescale = function() {
					if (!initialized) return; // skip if not yet initialized
					if ($img.is(":animated") || $img.is(":hidden")) return; // skip if the image is not visible
					rescale();
				}

				var rescale = function() {
					var ww = $what.width(), wh = $what.height();
					var scaledImgWidth = imgAspect * wh;
					if (scaledImgWidth > ww) {
						$img.height(wh).css({ width: 'auto', left: ((scaledImgWidth - ww) / -2), top: 0, visibility: 'visible' });
					} else {
						var scaledImgHeight = ww / imgAspect;
						$img.width(ww).css({ height: 'auto', top: ((scaledImgHeight - wh) / -2), left: 0, visibility: 'visible' });
					}
				};

				$img
					.css({ visibilty: 'hidden', position: 'fixed' })
					.attr('src', options.src)
					.imagesLoaded(init);

				$window.resize(tryRescale);
			});
		}

	});
})(jQuery);

function checkForIE()
{
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
		var ieversion = new Number(RegExp.$1);
		if(ieversion >= 9)
		{
			trace("IE 9+");
			ie = false;
		} else if(ieversion >= 8) {
			trace("IE 8+");
			ie = true;
		} else if(ieversion >= 7) {
			trace("IE 7+");
			ie = true;
		}
	}
}

function checkForSession()
{
	var sessionSet = getCookie("sid");
	if(sessionSet)
	{
		// if there's a sid cookie, compare sid with db
		return true;
	} else {
		return false;
	}
}

function setTextScale() {

    var scaleWidth = $('#container').width(),
        maxWidth = 1280, //this depends on your design
        minWidth = 1000, //this depends on your design
        fontSize = scaleWidth / maxWidth * 62.5;
        maxScale = 62.5,
        minScale = minWidth / maxWidth * 62.5;

    if (fontSize > maxScale) fontSize = maxScale;
    if (fontSize < minScale) fontSize = minScale;

    $('body').css('font-size', fontSize + '%');
}

function menuDrop()
{
	$('#navControl').hoverIntent(openMenu, closeMenu);
}

function openMenu() {
	$('h4').stop().animate({marginTop: '0'}, 400);
	$('#navbar').stop().animate({marginTop: '0'}, 400);
	$('#navWrap').stop().animate({height: '291px'}, 400, function(){
		$('.activeMenu').stop().animate({boxShadow: "0 0 2px 1px rgba(0,0,0,0.30)", backgroundColor: '#fff'}, 200);
	});
}

function closeMenu() {
	$('.activeMenu').stop().animate({boxShadow: "0 0 0 rgba(68,68,68,0.6)", backgroundColor: '#fafaf8'}, 200, function(){
		$('h4').stop().animate({marginTop: '-25px'}, 400);
		$('#navbar').stop().animate({marginTop: '-71px'}, 400);
		$('#navWrap').stop().animate({height: '25px'}, 400);
	});
}

function setOverlaySize()
{
	$win = $(window);
	$('#overlay').css('width', $win.width() + 'px');
	$('#overlay').css('height', $win.height() + 'px');
	//$('#alertbox').css('margin-left', ($win.width() - $('#alertbox').width()) / 2 + 'px');
	//$('#alertbox').css('top', ($win.height() - $('#alertbox').height()) / 2 - 50 + 'px');
}

function mainHeight(windowHeight, mainWidth) {
	$('#mainContent').css('height', (windowHeight - 100));
	$('#mainContent').css('width', (mainWidth));
}

function backImageCenter(winWidth) {
	var bgImageWidth = $('.backgroundImage').width();
	if (bgImageWidth > winWidth) {
		$('.backgroundImage').css('left', Math.min(((winWidth - bgImageWidth) / 2), 0));
	} else {
		$('.backgroundImage').css('left', 0);
	}
}

function positionLayers()
{
	var currentPage = getCurrentPage();
	$win = $(window);
	var winWidth = $win.width();
	var layerLeft = (winWidth - 780) / 2;
	$('.layer').css('left',layerLeft + 'px');

	if(currentPage == 'gallery')
	{
		var lft = (winWidth - 1195) / 2;
		$('#layer1').css('left', lft + 'px');
	}

	$('#backgrounds').find('img').css('width',winWidth + 'px');
}

function openWebScreen(which)
{
	$('#overlay').fadeIn('fast');
	var scr = document.createElement('img');
	$(scr).attr('src','/images/gallery-' + which + '-screen.png');
	$(scr).css('margin-top','110px');
	$('#overlay').append(scr);
	setOverlaySize();
}

function positionSlide()
{
	/*if(!$('#question-box').hasClass('in'))
	{
		slidePosition = $win.height() - parseInt($('#bg-1').css('top'));
		slidePosition = slidePosition - 70;
		$('#question-box').css('top', slidePosition + 'px');
	}*/

	$('#question-box > img').css('height', $win.height() + 'px');
	$('#question-box > img').css('width', $win.width() + 'px');
	$('#question-box > #quiz-container').css('left', ($(window).width() - $('#question-box > div').width()) / 2 + 'px');

}

function showAlert(element_id) {
	var $win = $(window);
	$win.data('last-scroll', $win.scrollTop());
	$win.scrollTop(0);
	$('.page-ghost').hide();

	closeMenu();

	$('#overlay').css('width', $win.width() + 'px');
	$('#overlay').css('height', $win.height() + 'px');

    $('#points-alert').hide();
    $('#login-alert').hide();
    $('#reg-alert').hide();
    $('#contact-form-alert').hide();

    $('#' + element_id).show();

	// which == 4 -> #wrongpass-alert
	// which == 5 -> #wrongemail-alert

	$('#overlay').show();
	$('#alertBox').show();
}

function closeAlert() {
	var $overlay = $('#overlay');
	$('#alertBox, .alert-msg').hide();

	$('.page-ghost').show();
	$window.scrollTop($window.data('last-scroll'));

	$overlay.fadeOut('fast', function() {
		$overlay.find('img').remove();
		$('#content-main:hidden').fadeIn('fast');
	});
}

function setNav(so)
{
	for(var i = 0; i < 12; i++)
	{
		var t = i+1;
		var pgCost = so.costs['t'+t];

		var ul = so.MScheckTask(t);
		if(ul)
		{
			$('#task-' + t).find('.cost').html('<img src="/images/icon-unlocked-small.png" />');
			$('#task-' + t).find('.cost-top').html('');
			$('#task-' + t).find('img.burstMenuTop').attr('src','/images/burstMenuUnlocked.png');
		} else {
			$('#task-' + t).find('.cost').html('-' + pgCost);
			$('#task-' + t).find('.cost-top').html('-' + pgCost);
			$('#task-' + t).find('img.burstMenuTop').attr('src','/images/burstMenuTop.png');
		}


	}

	var page = getCurrentPage();

	if(page == 'services' || page == 'webservices' || page == 'otherservices' || page == 'failedcampaigns')
	{
		$('#section-1').addClass('activeMenu');
		$('#section-2, #section-3').removeClass('activeMenu');
	} else if(page == 'gamification' || page == 'gamificationoptions' || page == 'process' || page == 'ourbook') {
		$('#section-2').addClass('activeMenu');
		$('#section-1, #section-3').removeClass('activeMenu');
	} else if(page == 'about' || page == 'playing' || page == 'people' || page == 'gallery') {
		$('#section-3').addClass('activeMenu');
		$('#section-1, #section-2').removeClass('activeMenu');
	}
}

function setProgressBar(numUnlocked)
{
	var percUnlocked;
	if(numUnlocked < 4)
	{

		percUnlocked = Math.round((numUnlocked / 4) * 100);
		$('#progBar01').css('width', percUnlocked + '%');

	} else if(numUnlocked >= 4 && numUnlocked < 8) {
		$('#progBar01').css('width', '100%');

		$('#ribbon01').removeClass('ribbon-locked');
		$('#ribbon01').addClass('ribbon-unlocked');
		$('#giftCount').html('1');
		$('#redeem-gifts').show();

		percUnlocked = Math.round(((numUnlocked - 4) / 4) * 100);
		$('#progBar02').css('width', percUnlocked + '%');
	} else if(numUnlocked >= 8 && numUnlocked < 12) {
		$('#progBar01').css('width', '100%');
		$('#progBar02').css('width', '100%');

		$('#ribbon01').removeClass('ribbon-locked');
		$('#ribbon01').addClass('ribbon-unlocked');
		$('#ribbon02').removeClass('ribbon-locked');
		$('#ribbon02').addClass('ribbon-unlocked');
		$('#giftCount').html('2');
		$('#redeem-gifts').show();

		percUnlocked = Math.round(((numUnlocked - 8) / 4) * 100);
		$('#progBar03').css('width', percUnlocked + '%');
	} else {
		$('#progBar01').css('width', '100%');
		$('#progBar02').css('width', '100%');
		$('#progBar03').css('width', '100%');

		$('#ribbon01').removeClass('ribbon-locked');
		$('#ribbon01').addClass('ribbon-unlocked');
		$('#ribbon02').removeClass('ribbon-locked');
		$('#ribbon02').addClass('ribbon-unlocked');
		$('#ribbon03').removeClass('ribbon-locked');
		$('#ribbon03').addClass('ribbon-unlocked');
		$('#giftCount').html('3');
		$('#redeem-gifts').show();
	}
}

function getCurrentPage()
{
	return $('body').attr('id');
}

function getCookie(name)
{
	trace("Getting Cookie " + name);
	var i, c_name, c_val;
	var cookies = document.cookie.split(';');
	for(i = 0; i < cookies.length; i++)
	{
		c_name = cookies[i].substr(0, cookies[i].indexOf("="));
		c_name = c_name.replace(/^\s+|\s+$/g,"");
		trace("Cookie Name = " + c_name);
		if(c_name == name)
		{
			trace("Found it!!");
			return cookies[i];
		}
	}

	return false;
}

function setCookie(name, value, expires)
{ 
	document.cookie = name + "=" + value + expires + "; path=/";
}

function doLoginStep2()
{
	/*$('.login-step').animate({
		top: '-=200px'
	}, 750);*/
	trace('checking for ' + $('#email').val());

	var email = $('#email').val();

	$.ajax({
		url: 'checkuser/',
		type: 'POST',
		data: "email=" + email,
		dataType: 'json',
		success: function(data) {
			trace("Got " + data.msg);
			if(data.msg == true)
			{
				$('.login-step').animate({
					top:'-=200px'
				}, 750, function(){
					//$('#liStep01').hide();
					//$('#liStep03').hide();
				});
			} else {
				$('#liStep02').hide();
				$('.login-step').animate({
					top:'-=200px'
				},750);
			}
		},
		fail: function(){
			trace("FAILURE!!");
		},
		error : function(xhr, ajaxOptions, thrownError){
			trace("ERROR: " + thrownError);
		}
	});
}

function doLogin()
{
	trace('LOGIN');
	var email;
	var pass;

	if($('#login-alert:visible'))
	{
		email = $('#l-email').val();
		pass = $('#l-pass').val();
	} else if($('#tryagain-email:visible')) {
		email = $('#l-email-2').val();
		pass = $('#l-pass-2').val();
	}

	var currPage = getCurrentPage();

	$.ajax({
		url: currPage + '/loginuser',
		type: 'POST',
		data: 'email=' + email + '&pass=' + pass,
		dataType: 'json',
		success: function(data) {
			trace(data.msg);
			if(data.msg != 'invalid')
			{
				closeAlert();
				$('#login-link').hide();
				$('#spacer').hide();
				setCookie("sid", data.msg, "");
			} else {
				$('#liStep02').prepend('<p style="color:red">Try again hoss!</p>');
			}
		}
	});
}

function registerUser()
{
	var email = $('#r-email').val();
	var nPass = $('#r-pass').val();
	var cPass = $('#r-pass-confirm').val();
	var currPage = getCurrentPage();

	if(nPass == '' || cPass == '')
	{
		//$('#liStep03').prepend('<p style="color:red">You gotta fill out the fields dude</p>');
	} else if(nPass != cPass) {
		//$('#liStep03').prepend('<p style="color:red">The passwords you entered didn\'t match. Try again.</p>');
	} else {
		$.ajax({
			url: currPage + '/registerUser',
			type: 'POST',
			data: 'email=' + email + '&pass=' + nPass,
			dataType: 'json',
			success: function(data){
				trace("REG = " + data.msg);
				if(data.msg == 'good')
				{
					closeAlert();
				} else {
					//$('#liStep03').prepend('<p style="color:red">Something went wrong. Try again in a bit.</p>');
					trace("ERROR: " + data.msg);
				}
			}
		});
	}

}

function sendContactInfo($form, success_callback) {
	$.post("/contactmail.php", $form.serialize(), function(data) {
		if (arguments.length > 1) success_callback(data);
	});
}

function trace(message) {
	if(window.console) console.log(message);
}

$(function() {
	var currPage = getCurrentPage();
	var $overlay = $('#overlay');

	window.$window = $(window);
	window.$scrollDirective = $('#scroll-directive');

	checkForIE();

	$window.resize(function(){
        //setTextScale();
		//backImageCenter($(window).width());
		//mainHeight($(window).height(), $('#main').width());
		if ($overlay.css('display') == 'block') setOverlaySize();

		positionLayers();
		positionSlide();
    });

	// ORIGINAL PARALLAX STUFF
	$window.scroll(function() {
		checkPagePosition(currPage, $window);
	});

	//setTextScale();
	positionLayers();

	//mainHeight($window.height(), $('#main').width());

	menuDrop();

	// Close alert when overlay or closer is clicked
	$overlay.add('#alertBox a.closer').click(function(e) {
		e.preventDefault();
		closeAlert();
	});

	//// COMMENTED OUT UNTIL POINTS SYSTEM IS COMPLETE

	// does the player have a point balance??
	//$.points.setPointsBalance();

	//var session = checkForSession();
	/*if(session)
	{
		trace("User is logged in");
	} else {
		trace("User is not logged in");
	}*/

	/*if(currPage != "home")
	{
		var unlocked = $.points.pageIsUnlocked(currPage);

		if(unlocked)
		{
			trace("Page is already unlocked.");
		} else {
			// check available credits again
			// in case user used a direct link to page
			var cb = $.points.getBalance();
			var pc = $.points.getPoints(currPage);

			if(cb >= pc)
			{
				// user has enough credits... unlock page
				$.points.unlockPage(currPage);
			} else {
				// TO-DO: show an alert indicating user needs more credits to visit page
				showAlert("points-alert");
				$('#container').hide();
			}

		}
	}*/

	//$.points.setProgressBar();

	$.slider = (function() {
		//
		// Sliders and dots - will only work for "singleton" dots and sliders -- one per page.
		// (Refactor if more are needed.)
		//
		// (used on failedcampaigns and people)
		//
		var $dots = $('.dots').find('.dot');

		// Return the current index of the selected dot (zero-based)
		//
		var currentIndex = function() {
			return $dots.index($dots.filter('.dot-on'));
		}

		// Nudge the slider in a direction, either 'right' or 'left'
		//
		var nudgeSlider = function(direction) {
			var nextSlide, currSlide = currentIndex() + 1;

			if (direction == 'right') {
				nextSlide = currSlide + 1;
				if(nextSlide > $dots.length) nextSlide = 1;
			} else if (direction == 'left') {
				nextSlide = currSlide - 1;
				if(nextSlide < 1) nextSlide = $dots.length;
			}

			doSlide(currSlide, nextSlide);
		}

		// Perform the slide
		//
		var doSlide = function(fromNumber, toNumber) {
			$outgoing = $($.map(relevantPrefixes, function(prefix) { return prefix + fromNumber; }).join());
			$incoming = $($.map(relevantPrefixes, function(prefix) { return prefix + toNumber; }).join());

			$outgoing.animate({left: (fromNumber < toNumber ? '-1000' : '1000'), opacity: 0}, function() { $outgoing.hide(); });
			$incoming.hide().css({opacity: 0, left: (fromNumber < toNumber ? '1000px' : '-1000px')}).show();
			$incoming.animate({left: 0, opacity: 1});

			$dots.removeClass('dot-on');
			$($dots[toNumber-1]).addClass('dot-on');
		}

		// Setup id prefixes for the "slide show"
		//
		var relevantPrefixes = [];
		if ($('#people').length)
			relevantPrefixes = [ '#p-image-', '#p-blurb-', '#p-sub-' ];
		else if ($('#failedcampaigns').length)
			relevantPrefixes = [ '#explanation-', '#tag-', '#c-image-' ];

		// Handle dot clicks
		//
		$('.dots .dot').on('click', function() {
			var $dot = $(this);
			var fromNumber = currentIndex() + 1;
			$dots.removeClass('dot-on');
			$dot.addClass('dot-on');
			doSlide(fromNumber, currentIndex() + 1);
		});

		// Attach to the arrows
		//
		$('#failedcampaigns .arrow-left, #people .arrow-left').on('click', function(e) {
			e.preventDefault();
			nudgeSlider("left");
		});

		$('#failedcampaigns .arrow-right, #people .arrow-right').on('click', function(e) {
			e.preventDefault();
		 	nudgeSlider("right");
		});

		// Expose some methods to jQuery
		//
		return {
			nudge: nudgeSlider
		};
	})();

	$('#login-link').click(function(e) {
		e.preventDefault();
		showAlert('login-alert');
	});

	$('#li-goStep2').click(function(e) {
		e.preventDefault();
		doLoginStep2();
	});

	$('#tryagain-btn-1').click(function(){
		closeAlert();
		showAlert('login-alert');
		return false;
	});

	$('#tryagain-btn-2').click(function(){
		if($('#retrieve-btns:visible'))
		{
			$('#retrieve-btns').hide();
			$('#retrieve-email').hide();
		}

		$('#tryagain-email').show();
		$('#tryagain-pass').show();
		$('#tryagain-btns').show();
		return false;
	});

	$('#email-pass-btn').click(function(){
		if($('#tryagain-btns:visible'))
		{
			$('#tryagain-email').hide();
			$('#tryagain-pass').hide();
			$('#tryagain-btns').hide();
		}

		$('#retrieve-email').show();
		$('#retrieve-btns').show();
		return false;
	});

	$('.cancel-alert-btn').click(function(){
		closeAlert();
		return false;
	});

	$('#quiz-container input[type=radio]').change(function() {
		$('#submit-quiz-btn').addClass('enabled');
	});

	// Randomiation of quiz label
	$('#quiz-container h2').html([ "Impossible Challenge Question:", "Pretty Hard Question:", "Stupefying Question:" ][Math.floor(Math.random() * 3)]);

	// Account registration form display

	$('#save-prog, .register-btn').click(function(e) {
		e.preventDefault();
		showAlert('reg-alert');
	});

	// Save progress - register for a new account

	(function() {
		var $form = $('#form-register');
		var $pass = $('#r-pass');
		var $confirm = $('#r-pass-confirm');
		var $username = $("#r-email");

		// Perform custom validation after submit is clicked, but before it triggers the submit (handler is defined below)
		$('#form-register a.save').click(function(event) {
			// don't do custom checking unless the form is otherwise valid
			if (!$form.checkValidity()) return;

			if ($pass.val() != $confirm.val()) {
				$confirm.setCustomValidity('Password confirmation does not match.');
			} else {
				$confirm.setCustomValidity('');
			}

			$.ajax({
				type: 'POST',
				url: '/',
				data: { "option": 'check-username', "username": $username.val() },
				cache: true,
				async: false,
				success : function(data) {
					if (data == 1) {
						// username exists
						$username.setCustomValidity('Username is already taken.');
					} else {
						$username.setCustomValidity('');
					}
				}
			});
		});
		$('#register-done-btn').click(function(){
			$('#loginbox').hide();
			$overlay.hide();
			return false;
		});
	})();

	// Login form

	(function() {
		var $form = $('#form-login');
		var $email = $('#l-email');
		var $pass = $('#l-pass');
		var rotate = function(variants) {
			var variant = 0;
			return function() { return variants[variant++ % variants.length] };	};
		var noDiceUser = rotate([ 'No match could be found.', 'Still no love.', 'Maybe it\'s your username.', 'Seriously, no dice.', 'Try again hoss!' ]);
		var noDicePass = rotate([ 'No match was found.', 'Could be your password...', 'Seriously, no dice.', 'Time for an alternate plan.' ]);

		// Form will post unless there are validity errors.
		$('#form-login a.login').click(function(event) {
			// Clear custom validators
			$email.setCustomValidity('');
			$pass.setCustomValidity('');

			// don't do custom checking unless the form is otherwise valid
			if (!$form.checkValidity()) return;

			$.ajax({
				type: 'POST',
				url: '/',
				data: { 'option': 'login-ajax',
				        'username': $email.val(),
				        'password': $pass.val() },
				cache: true,
				async: false,
				success: function(data) {
					if (data == 0) { // Invalid user/pass
						if (Math.random() > 0.5)
							$email.setCustomValidity(noDiceUser());
						else
							$pass.setCustomValidity(noDicePass());
					}
				}
			});
		});
	})();

	// Contact forms

	$('form.contact a.submit-for > span').html($('#c-meta').data('points'));
	$('form.contact').submit(function(event) {
		// Never submit the form normally
		event.preventDefault();

		// score the action
		var task_id = parseInt($('#c-meta').data('task-id'));
		var points = parseInt($('#c-meta').data('points'));
		score_it(points, task_id);

		// send the contact mail
		sendContactInfo($(this), function(data) {
			// window.console.log(data);
		});

		// and show the alert
		showAlert('contact-thanks-alert');
		return false;
	})

	// Common form submit button handler
	$('#form-login a.login, #form-register a.save, form.contact a.submit-for').click(function(event) {
		event.preventDefault();
		$(this).closest('form').find('input[type=submit]').click();
	});


	layoutPage(currPage);

	// test
	//showAlert('points-alert');

});
