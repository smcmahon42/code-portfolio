var slideDistance;

function showQuiz()
{
	var pg = getCurrentPage();
	//slideDistance = $('#bg-1').offset().top;
	slideDistance = $('.page-ghost').height();
	//slideDistance = $(window).height() + $('#bg-1').offset().top;
	trace("BG Top = " + slideDistance);

	$('.layer').fadeOut('slow', function(){
		if(pg == 'gallery')
		{
			$('#question-box').fadeIn('fast');
		}
	});

	if(pg != 'gallery')
	{
		$('#bg-1').animate({
			top:'-=' + slideDistance
		}, 1500, function(){
			$('#bg-1').hide();
		});
	}

}

function hideQuiz()
{
	var pg = getCurrentPage();
	if(pg == 'gallery')
	{
		$('#question-box').fadeOut('fast', function(){
			$('.layer').fadeIn('slow');
		});
	} else {
		$('#bg-1').show();
		$('#bg-1').animate({
			top:'+=' + slideDistance
		}, 800, function(){
			$('.layer').fadeIn('slow');
		});
	}

}

function showQuizLink()
{
	if(!$('#blue-link').hasClass('in'))
	{
		$('#blue-link').addClass('in');
		$('#cta-left').animate({
			left:'0'
		},800);
		$('#cta-right').animate({
			left:'0'
		},800, function(){
			$('.cta-medallion').fadeIn('fast', function(){
				$('#cta-label').fadeIn('fast');
			});
		});
	}
}

function setBackground()
{
	var page = getCurrentPage();
	var $qbox = $('#question-box')

	// Main background
	$('<img id="bg-1"/>')
		.css('z-index', 30)
		.scaleToCover({ src: '/images/bg-' + page + '-1.jpg', what: window, where: '#content-main' });


	// Quiz background
	if ($qbox[0])
		$('<img id="bg-2"/>')
			.css('z-index', -10)
			.scaleToCover({ src: '/images/bg-' + page + '-2.jpg', what: window, where: $qbox });
}

function setCircle(circle, w, h, t, l, transform)
{
	var $c = $(circle);
	var radius = Math.round(w/2);

	$c.css('width',w + 'px');
	$c.css('height', h + 'px');
	if(l == 0)
	{
		$c.css('margin','0 auto');
	} else {
		$c.css('margin-left', l + 'px');
	}
	$c.css('margin-top', t + 'px');


	$c.find('img.circle-bg, img.link').css('width', w + 'px');
	$c.find('img.circle-bg, img.link').css('height', h + 'px');
	$c.find('map area[shape=circle]').attr('coords', radius + ',' + radius + ',' + radius);

	if(transform)
	{
		if(ie)
		{
			$c.hide();
		} else {
			var oX = $c.width() / 2;
			var oY = $c.height() / 2;
			$c.transform({
				scale : [0,0],
				origin : [oX+'px',oY+'px']
			});
		}

	}
}

// LAYOUT INFORMATION
function layoutPage(page)
{

	if($('#blue-link'))
	{
		$('#quiz-link').click(function(){
			//$.scrollTo('100%',2000);
			showQuiz();
			return false;
		});

		$('#bot-q-link').click(function(){
			showQuiz();
			return false;
		});

		$('#forget-btn').click(function(){
			hideQuiz();
			return false;
		});
	}

	if(page == 'home')
	{
		setCircle('#circle-1', 184, 184, 15, 0, false);

		// $('#layer1').scrollingParallax({
		// 	staticSpeed : 1.7,
		// 	staticScrollLimit : false
		// });

		setBackground();
	}

	if(page == 'gamification')
	{

		// Init Layers

		setCircle('#white-2', 240, 240, 100, 363, true);
		setCircle('#white-3', 300, 300, 225, 445, true);
		setCircle('#white-4', 320, 320, 222, 382, true);
		setCircle('#black-1', 313, 313, 845, 124, true);
		setCircle('#black-2', 320, 320, 700, 76, true);
		setCircle('#black-3', 360, 360, 225, 282, true);

		if(ie)
		{
			$('#banner').hide();
			$('#pie-chart').hide();
		} else {
			$('#banner').transform({
				scaleX: 0,
				origin: ['0','0']
			});

			$('#pie-chart').transform({
				scale: [0,0],
				origin: ['109px','117px']
			});
		}


		$('.page-ghost').css('height', '1950px');

		// White circles
		$('#layer1').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		// Black Circles
		$('#layer2').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		// Blue Elements
		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();

	}

	if(page == 'services')
	{
		$('.page-ghost').css('height', '1200px');

		setCircle('#circle-1', 284, 284, 310, 66, false);
		setCircle('#circle-2', 191, 191, 180, 242, false);
		setCircle('#circle-3', 332, 332, 518, 448, true);
		setCircle('#circle-4', 164, 164, 177, 240, true);

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		// Black Circles
		$('#layer2').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		// Blue Elements
		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'webservices')
	{
		$('.page-ghost').css('height', '1380px');

		setCircle('#circle-1', 272, 272, 238, 0, false);
		setCircle('#circle-2', 150, 150, 245, 0, false);
		setCircle('#circle-6', 130, 130, 351, 238, true);
		setCircle('#circle-7', 125, 125, 680, 218, true);
		setCircle('#circle-8', 186, 186, 165, 305, true);

		if(ie)
		{
			$('#circle-3, #circle-4, #circle-5').hide();
		} else {
			$('#circle-3, #circle-4, #circle-5').transform({
				scale: [0,0],
				origin: ['120px', '120px']
			});
		}

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		// Black Circles
		$('#layer2').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		// Blue Elements
		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'otherservices')
	{
		$('.page-ghost').css('height', '1350px');

		setCircle('#circle-2', 166, 166, 460, 385, true);
		setCircle('#circle-3', 338, 338, 406, 220, true);
		setCircle('#circle-4', 326, 326, 456, 405, true);
		setCircle('#circle-5', 230, 230, 640, 0, true);

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		// Black Circles
		$('#layer2').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		// Blue Elements
		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'failedcampaigns')
	{
		$('.page-ghost').css('height', '1005px');

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'process')
	{
		$('.page-ghost').css('height', '1875px');

		$('.acc-slide').mouseenter(function(){
			var id = $(this).attr('id');
			$('.acc-slide').each(function(){
				$(this).clearQueue();
				if($(this).attr('id') != id)
				{
					$(this).find('.slide-num').fadeOut('fast');
					$(this).animate({
						width:'26px'
					},500);
				} else {
					$(this).find('.slide-num').fadeIn('fast');
					$(this).animate({
						width:'653px'
					},500);
				}
			});
		});

		$('.content-accordion').mouseleave(function(){
			$('.acc-slide').each(function(){
				$(this).find('.slide-num').fadeIn('fast');
				$(this).animate({
					width:'130px'
				},500);
			})
		});

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		// Black Circles
		$('#layer2').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		// Blue Elements
		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		/*$('#layer4').scrollingParallax({
			staticSpeed : 1.5,
			staticScrollLimit : false
		});*/

		$('#layer5').scrollingParallax({
			staticSpeed : 1.5,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'gamificationoptions')
	{
		$('.page-ghost').css('height', '1500px');

		if(ie)
		{
			$('#pudding-circle').hide();
		} else {
			$('#pudding-circle').transform({
				scale: [0,0],
				origin: ['69px','69px']
			});
		}


		$('.acc-slide').mouseenter(function(){
			var id = $(this).attr('id');
			$('.acc-slide').each(function(){
				$(this).clearQueue();
				if($(this).attr('id') != id)
				{
					$(this).animate({
						width:'115px'
					},500);
				} else {
					$(this).animate({
						width:'560px'
					},500);
				}
			});
		});

		$('.content-accordion').mouseleave(function(){
			$('.acc-slide').each(function(){
				$(this).animate({
					width:'260px'
				},500);
			})
		});

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		// Black Circles
		$('#layer2').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		// Blue Elements
		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();
	} // END GAMIFICATION OPTIONS

	if(page == 'ourbook')
	{

		$('.page-ghost').css('height', '1300px');

		if(ie)
		{
			$('#cricket-circle').hide();
		} else {
			$('#cricket-circle').transform({
				scale: [0,0],
				origin: ['55px','55px']
			});
		}

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();

	} // END OUR BOOK

	if(page == 'about')
	{
		$('.page-ghost').css('height', '1550px');

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'playing')
	{
		$('.page-ghost').css('height', '1860px');

		if(ie)
		{
			$('#badge-1').hide();
			$('#contact-med').hide();
			$('#contact-ribbon').hide();
		} else {
			$('#badge-1').transform({
				scale: [0,0],
				origin: ['60px','61px']
			});

			$('#contact-med').transform({
				scale: [0,0],
				origin: ['46px','46px']
			});

			$('#contact-ribbon').transform({
				scale: [0,0],
				origin: ['0','20px']
			});
		}

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'people')
	{

		$('.page-ghost').css('height', '1170px');

		$('#p-link-1').click(function(){
			$.slider.nudge('right');
		});

		setCircle('#circle-1', 369, 369, 333, 0, false);
		setCircle('#circle-2', 163, 163, 725, 253, false);
		setCircle('#circle-3', 245, 245, 150, 447, false);
		setCircle('#circle-4', 280, 280, 25, 0, false);
		setCircle('#circle-5', 280, 280, 25, 0, false);
		setCircle('#circle-6', 280, 280, 25, 0, false);

		// brent
		setCircle('#circle-7', 178, 178, 227, 100, false);
		setCircle('#circle-8', 214, 214, 290, 550, false);
		setCircle('#circle-9', 175, 175, 120, 195, false);
		setCircle('#circle-10', 192, 192, 50, 446, false);

		// richard
		setCircle('#circle-11', 193, 193, 220, 90, false);
		setCircle('#circle-12', 200, 200, 90, 160, false);
		setCircle('#circle-13', 225, 225, 155, 545, false);
		setCircle('#circle-14', 225, 225, 58, 440, false);

		// darren
		setCircle('#circle-15', 178, 178, 195, 40, false);
		setCircle('#circle-16', 259, 259, 122, 75, false);
		setCircle('#circle-17', 178, 178, 190, 490, false);
		setCircle('#circle-18', 224, 224, 106, 390, false);

		$('#page-head').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'gallery')
	{
		$('.g-client').mouseenter(function(){
			$(this).attr('src','/images/gallery-client-over.png');
		});

		$('.g-client').mouseleave(function(){
			$(this).attr('src','/images/gallery-' + $(this).attr('id') + '.png');
		});

		$('#addy').mouseenter(function(){
			$(this).attr('src','/images/gallery-3-1-off.png');
		});

		$('#addy').mouseleave(function(){
			$(this).attr('src','/images/gallery-3-1-over.png');
		});

		$('#ace').mouseenter(function(){
			$(this).attr('src','/images/gallery-3-5-off.png');
		});

		$('#ace').mouseleave(function(){
			$(this).attr('src','/images/gallery-3-5-over.png');
		});

		$('#addybest').mouseenter(function(){
			$(this).attr('src', '/images/gallery-4-3-off.png');
		});

		$('#addybest').mouseleave(function(){
			$(this).attr('src','/images/gallery-4-3-over.png');
		});

		$('#quill').mouseenter(function(){
			$(this).attr('src', '/images/gallery-5-1-off.png');
		});

		$('#quill').mouseleave(function(){
			$(this).attr('src','/images/gallery-5-1-over.png');
		});

		$('#logos').mouseenter(function(){
			$(this).attr('src', '/images/gallery-6-2-off.png');
		});

		$('#logos').mouseleave(function(){
			$(this).attr('src','/images/gallery-6-2-over.png');
		});

		$('#copywriter').mouseenter(function(){
			$(this).attr('src', '/images/gallery-7-3-off.png');
		});

		$('#copywriter').mouseleave(function(){
			$(this).attr('src','/images/gallery-3-1-over.png');
		});

		$('#ada').mouseenter(function(){
			$(this).attr('src', '/images/gallery-8-2-off.png');
		});

		$('#ada').mouseleave(function(){
			$(this).attr('src','/images/gallery-8-2-over.png');
		});

		$('.cb-video').colorbox({innerWidth:"700px", innerHeight:"410px"});
		$('a.cb-web').click(function(){
			openWebScreen($(this).attr('id'));
			return false;
		});

		///////

		/*$('#layer1').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		$.scrollingParallax('/images/bg-gallery.png', {
			bgHeight : '100%',
			bgRepeat : false,
			staticSpeed : 0.1,
			staticScrollLimit : false,
			loopIt : false,
			elementID : 'bg-1',
			appendTo : 'content-main'
		});*/

		$('html').css('background','black url(/images/bg-gallery-pattern.png)');
		var bg = document.createElement('img');
		$(bg).attr('src','/images/bg-gallery.png');
		//$(bg).attr('src','/images/bg-gallery-1.jpg');
		$(bg).css('width', $(window).width() + 'px');
		$('#backgrounds').append(bg);
	}

	if(page == 'contact')
	{
		$('.page-ghost').css('height', '1100px');

		setCircle('#circle-1', 277, 277, 325, 42, false);
		setCircle('#circle-2', 201, 201, 175, 332, false);
		setCircle('#circle-3', 201, 201, 25, 180, false);
		setCircle('#circle-4', 227, 227, 58, 405, false);
		setCircle('#circle-5', 165, 165, 0, 1, false);
		setCircle('#circle-6', 165, 165, 0, 10, false);
		setCircle('#circle-7', 165, 165, 0, 10, false);
		setCircle('#circle-8', 239, 239, 0, 10, false);
		setCircle('#circle-9', 162, 162, 0, 223, false);
		setCircle('#circle-10', 162, 162, 0, -5, false);

		$('#circle-9').css('cursor','pointer');
		$('#circle-9').click(function(){
			showAlert('directions-alert');
		});

		$('#circle-10').css('cursor', 'pointer');
		$('#circle-10').click(function(){
			showAlert('directions-alert-2');
		});

		$('#contact-form-link').click(function(e) {
			e.preventDefault();
			showAlert('contact-form-alert');
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		$('#layer3').scrollingParallax({
			staticSpeed : 1.75,
			staticScrollLimit : false
		});

		$('#page-head').scrollingParallax({
			staticSpeed : 1.85,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'redeem')
	{
		$('.page-ghost').css('height', '900px');

		setCircle('#circle-1', 237, 236, 0, 1, false);
		setCircle('#circle-2', 237, 236, 0, 30, false);
		setCircle('#circle-3', 237, 236, 0, 30, false);

		checkGiftUnlocks();

		$('.gift-unlocked').mouseenter(function(){
			$(this).find('p').show();
			$(this).find('.gift-off').hide();
			$(this).find('.gift-over').show();
		});

		$('.gift-unlocked').mouseleave(function(){
			$(this).find('p').hide();
			$(this).find('.gift-off').show();
			$(this).find('.gift-over').hide();
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'videogift')
	{
		$('.page-ghost').css('height', '900px');

		setCircle('#circle-1', 220, 220, 40, 135, false);
		setCircle('#circle-2', 250, 250, 350, 390, false);
		setCircle('#circle-3', 250, 250, 76, 120, false);

		$('#download-btn').colorbox({innerWidth:"700px", innerHeight:"410px"});

		$('#page-head').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 1.85,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'screengift')
	{
		$('.page-ghost').css('height', '900px');

		setCircle('#circle-1', 265, 265, 151, 120, false);
		setCircle('#circle-2', 322, 349, 240, 358, false);
		setCircle('#circle-3', 234, 234, 463, 280, false);

		$('#page-head').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 1.85,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		$('#layer3').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		setBackground();
	}

	if(page == 'bookgift')
	{
		$('.page-ghost').css('height', '900px');

		setCircle('#circle-1', 295, 295, 75, 48, false);
		setCircle('#circle-2', 338, 335, 340, 350, false);
		setCircle('#circle-3', 214, 214, 720, 225, false);
		setCircle('#circle-4', 214, 214, 283, 440, false);
		setCircle('#circle-5', 214, 214, 314, 210, false);

		$('#page-head').scrollingParallax({
			staticSpeed : 2.1,
			staticScrollLimit : false
		});

		$('#layer1').scrollingParallax({
			staticSpeed : 1.85,
			staticScrollLimit : false
		});

		$('#layer2').scrollingParallax({
			staticSpeed : 1.7,
			staticScrollLimit : false
		});

		$('#layer3').scrollingParallax({
			staticSpeed : 1.9,
			staticScrollLimit : false
		});

		setBackground();
	}

	positionSlide();
}

function checkGiftUnlocks()
{
	var ribbons = $('#progress').children('.ribbon-unlocked');
	var circles = $('#layer1 > div').children('.circle');

	for (var i = 0; i < ribbons.length; i++) {
		$(circles[i]).removeClass('gift-locked');
		$(circles[i]).find('.gift-off').attr('src','/images/gift-unlock-' + (i+1) + '.png');
		$(circles[i]).addClass('gift-unlocked');
	}

	if (ribbons.length == 0)
		$('#content-main h2').html('Thanks for being an optimist, but you haven’t earned any gifts yet. Keep exploring the site to earn points and they’ll be yours in no time.');
	else if (ribbons.length < 3)
		$('#content-main h2').html('It’s not every day you get presents for reading and answering impossible challenge questions! Enjoy—you’ve earned it.');
}

// ANIMATION CUE POINTS

function checkPagePosition(page, $window)
{
	var st = $window.scrollTop();
	var oX;
	var oY;

	var $sd = window.$scrollDirective;

	trace(st);

	if(st == 0)
	{
		if($sd.hasClass('out'))
		{
			$sd.removeClass('out');
			$sd.fadeIn('slow');
		}
	}

	if(st >= 76)
	{
		if(!$sd.hasClass('out'))
		{
			$sd.addClass('out');
			$sd.fadeOut('slow');
		}

	}

	if(page == 'gamification')
	{

		var $banner = $('#banner');
		var $c2 = $('#white-2');

		if(st >= 40)
		{
			// blue banner
			if(!$banner.hasClass('in'))
			{
				$banner.addClass('in');
				if(ie)
				{
					$banner.fadeIn('fast');
				} else {
					oX = $banner.width() / 2;
					oY = $banner.height() / 2;
					$banner.animate({scaleX:1, origin:['0','0']},500);
				}

			}

		}

		if(st >= 156)
		{
			// white 2
			if(!$c2.hasClass('in'))
			{
				$c2.addClass('in');
				if(ie)
				{
					$c2.fadeIn('fast');
				} else {
					oX = $c2.width() / 2;
					oY = $c2.height() / 2;
					$c2.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 256)
		{
			// black 1
			if(!$('#black-1').hasClass('in'))
			{
				$('#black-1').addClass('in');
				if(ie)
				{
					$('#black-1').fadeIn('fast');
				} else {
					oX = $('#black-1').width() / 2;
					oY = $('#black-1').height() / 2;
					$('#black-1').animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 444)
		{
			// white 3 then pie-chart
			if(!$('#white-3').hasClass('in'))
			{
				$('#white-3').addClass('in');
				if(ie)
				{
					$('#white-3').fadeIn('fast', function(){
						$('#pie-chart').addClass('in');
						$('#pie-chart').fadeIn('fast');
					});
				} else {
					oX = $('#white-3').width() / 2;
					oY = $('#white-3').height() / 2;
					$('#white-3').animate({scale:[1,1], origin:[oX+'px',oY+'px']},100, function(){
						$('#pie-chart').addClass('in');
						$('#pie-chart').animate({scale:[1,1], origin:['109px','117px']}, 300);
					});
				}

			}

			var pie = Math.round((st-444) / 10);
			if(pie > 10) { pie = 10; }
			if(pie < 0) { pie = 0; }

			if($('#pie-chart').hasClass('in'))
			{
				var pies = $('#pie-chart').children('img');
				for(var i = 0; i < pies.length; i++)
				{
					if($(pies[i]).attr('id') == 'pie-' + pie)
					{
						$(pies[i]).show();
					} else {
						$(pies[i]).hide();
					}
				}

				var pieLabel;

				switch(pie)
				{
					case 0:
						pieLabel = '0';
						break;
					case 1:
						pieLabel = '5';
						break;
					case 2:
						pieLabel = '10';
						break;
					case 3:
						pieLabel = '14';
						break;
					case 4:
						pieLabel = '30';
						break;
					case 5:
						pieLabel = '40';
						break;
					case 6:
						pieLabel = '45';
						break;
					case 7:
						pieLabel = '49';
						break;
					case 8:
						pieLabel = '60';
						break;
					case 9:
						pieLabel = '65';
						break;
					case 10:
						pieLabel = '70';
						break;
				}

				$('#pie-label').html(pieLabel + '%');
			}

		}

		if(st >= 627)
		{
			// black 2 then wired
			if(!$('#black-2').hasClass('in'))
			{
				$('#black-2').addClass('in');
				if(ie)
				{
					$('#black-2').fadeIn('fast', function(){
						$('#white-4').addClass('in');
						$('#white-4').fadeIn('fast');
					});
				} else {
					oX = $('#black-2').width() / 2;
					oY = $('#black-2').height() / 2;
					$('#black-2').animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300, function(){
						$('#white-4').addClass('in');
						oX = $('#white-4').width() / 2;
						oY = $('#white-4').height() / 2;
						$('#white-4').animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
					});
				}

			}

			var step = Math.round((st-627) / 20);
			trace("Step = " + step);
			if($('#white-4').hasClass('in'))
			{
				var layers = $('#white-4').children('img');
				for(var i = 0; i < layers.length; i++)
				{
					if($(layers[i]).attr('id') == 'pink-' + step)
					{
						$(layers[i]).show();
					} else {
						$(layers[i]).hide();
					}
				}
			}
		}

		if(st >= 1028)
		{
			// black 3
			if(!$('#black-3').hasClass('in'))
			{
				$('#black-3').addClass('in');
				if(ie)
				{
					$('#black-3').fadeIn('fast');
				} else {
					oX = $('#black-3').width() / 2;
					oY = $('#black-3').height() / 2;
					$('#black-3').animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 1082)
		{
			showQuizLink();
		}

	} // END GAMIFICATION

	// GAMIFICATION PROCESS
	else if(page == 'process')
	{
		// diagram buttons
		if(st >= 240 && st < 292)
		{
			if(!$('#diagram-btn-1').hasClass('in'))
			{
				$('#diagram-btn-1').addClass('in');

				$('#diag-ms-btn-on').fadeIn('fast');
				$('#diag-ms-btn-off').fadeOut('fast');

				$('#diag-game-btn-on').fadeOut('fast');
				$('#diag-game-btn-off').fadeIn('fast');

				$('#diag-soft-btn-on').fadeOut('fast');
				$('#diag-soft-btn-off').fadeIn('fast');

				$('#diagram-1').fadeIn('fast');
			}

			$('#diagram-btn-2').removeClass('in');
			$('#diagram-btn-3').removeClass('in');

			$('#diagram-2').fadeOut('fast');
			$('#diagram-3').fadeOut('fast');
		}

		if(st >= 388 && st < 436)
		{
			if(!$('#diagram-btn-2').hasClass('in'))
			{
				$('#diagram-btn-2').addClass('in');

				$('#diag-ms-btn-on').fadeOut('fast');
				$('#diag-ms-btn-off').fadeIn('fast');

				$('#diag-game-btn-on').fadeIn('fast');
				$('#diag-game-btn-off').fadeOut('fast');

				$('#diag-soft-btn-on').fadeOut('fast');
				$('#diag-soft-btn-off').fadeIn('fast');

				$('#diagram-2').fadeIn('fast');
			}

			$('#diagram-btn-1').removeClass('in');
			$('#diagram-btn-3').removeClass('in');

			$('#diagram-1').fadeOut('fast');
			$('#diagram-3').fadeOut('fast');

		}

		if(st >= 536 && st < 584)
		{
			if(!$('#diagram-btn-3').hasClass('in'))
			{
				$('#diagram-btn-3').addClass('in');

				$('#diag-ms-btn-on').fadeOut('fast');
				$('#diag-ms-btn-off').fadeIn('fast');

				$('#diag-game-btn-on').fadeOut('fast');
				$('#diag-game-btn-off').fadeIn('fast');

				$('#diag-soft-btn-on').fadeIn('fast');
				$('#diag-soft-btn-off').fadeOut('fast');

				$('#diagram-3').fadeIn('fast');
			}

			$('#diagram-btn-1').removeClass('in');
			$('#diagram-btn-2').removeClass('in');

			$('#diagram-1').fadeOut('fast');
			$('#diagram-2').fadeOut('fast');

		}


		if(st < 240)
		{
			if($('#layer4:visible'))
			{
				$('#layer4').fadeOut('fast');
			}
		}

		if(st >= 688)
		{
			if($('#layer4:visible'))
			{
				$('#layer4').fadeOut('fast');
			}
		}

		if(st >= 240 && st < 688)
		{
			if($('#layer4:hidden'))
			{
				$('#layer4').fadeIn('fast');
			}
		}

		// black 1
		/*if(!$('#black-1').hasClass('in'))
		{
			$('#black-1').addClass('in');
			var oX = $('#black-1').width() / 2;
			var oY = $('#black-1').height() / 2;
			$('#black-1').animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
		}*/

		if(st >= 1110)
		{
			showQuizLink();
		}

	} // END PROCESS

	else if(page == 'gamificationoptions')
	{
		if(st >= 252)
		{
			var $pudding = $('#pudding-circle');
			if(!$pudding.hasClass('in'))
			{
				$pudding.addClass('in');
				if(ie)
				{
					$pudding.fadeIn('fast');
				} else {
					oX = $pudding.width() / 2;
					oY = $pudding.height() / 2;
					$pudding.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 772)
		{
			showQuizLink();
		}
	} // END OPTIONS

	else if(page == 'ourbook')
	{
		if(st >= 268)
		{
			var $cs = $('#cricket-circle');
			if(!$cs.hasClass('in'))
			{
				$cs.addClass('in');
				if(ie)
				{
					$cs.fadeIn('fast');
				} else {
					oX = $cs.width() / 2;
					oY = $cs.height() / 2;
					$cs.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 576)
		{
			showQuizLink();
		}
	} // END OUR BOOK

	else if(page == 'about')
	{
		/*if(st >= 76)
		{
			var $c2 = $('#circle-2');
			if(!$c2.hasClass('in'))
			{
				$c2.addClass('in');
				var oX = $c2.width() / 2;
				var oY = $c2.height() / 2;
				$c2.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
			}
		}*/

		if(st >= 839)
		{
			showQuizLink();
		}
	}

	else if(page == 'services')
	{
		var $c3 = $('#circle-3');
		var $c4 = $('#circle-4');

		if(st >= 72)
		{
			if(!$c3.hasClass('in'))
			{
				$c3.addClass('in');
				if(ie)
				{
					$c3.fadeIn('fast');
				} else {
					oX = $c3.width() / 2;
					oY = $c3.height() / 2;
					$c3.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 328)
		{

			if(!$c4.hasClass('in'))
			{
				$c4.addClass('in');
				if(ie)
				{
					$c4.fadeIn('fast');
				} else {
					oX = $c4.width() / 2;
					oY = $c4.height() / 2;
					$c4.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 410)
		{
			showQuizLink();
		}
	}

	else if(page == 'webservices')
	{
		$c3 = $('#circle-3');
		$c4 = $('#circle-4');
		$c5 = $('#circle-5');
		$c6 = $('#circle-6');
		$c7 = $('#circle-7');
		$c8 = $('#circle-8');

		if(st >= 130)
		{
			if(!$c3.hasClass('in'))
			{
				$c3.addClass('in');
				if(ie)
				{
					$c3.fadeIn('fast', function(){
						$c4.fadeIn('fast', function(){
							$c5.fadeIn('fast');
						});
					});
				} else {
					oX = $c3.width() / 2;
					oY = $c3.height() / 2;
					$c3.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300, function(){
						$c4.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300, function(){
							$c5.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
						});
					});
				}

			}
		}

		if(st >= 240)
		{
			if(!$c6.hasClass('in'))
			{
				$c6.addClass('in');
				if(ie)
				{
					$c6.fadeIn('fast');
				} else {
					oX = $c6.width() / 2;
					oY = $c6.height() / 2;
					$c6.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 380)
		{
			if(!$c7.hasClass('in'))
			{
				$c7.addClass('in');
				if(ie)
				{
					$c7.fadeIn('fast', function(){
						$c8.fadeIn('fast');
					});
				} else {
					oX = $c7.width() / 2;
					oY = $c7.height() / 2;
					$c7.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300, function(){
						oX = $c8.width() / 2;
						oY = $c8.height() / 2;
						$c8.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
					});
				}

			}
		}

		if(st >= 600)
		{
			showQuizLink();
		}
	}

	else if(page == 'otherservices')
	{
		var $c2 = $('#circle-2');
		var $c3 = $('#circle-3');
		var $c4 = $('#circle-4');
		var $c5 = $('#circle-5');

		var oX;
		var oY;

		if(st >= 100)
		{
			if(!$c2.hasClass('in'))
			{
				$c2.addClass('in');
				if(ie)
				{
					$c2.fadeIn('fast');
				} else {
					oX = $c2.width() / 2;
					oY = $c2.height() / 2;
					$c2.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 190)
		{
			if(!$c3.hasClass('in'))
			{
				$c3.addClass('in');
				if(ie)
				{
					$c3.fadeIn('fast');
				} else {
					oX = $c3.width() / 2;
					oY = $c3.height() / 2;
					$c3.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 300)
		{
			if(!$c4.hasClass('in'))
			{
				$c4.addClass('in');
				if(ie)
				{
					$c4.fadeIn('fast');
				} else {
					oX = $c4.width() / 2;
					oY = $c4.height() / 2;
					$c4.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 350)
		{
			if(!$c5.hasClass('in'))
			{
				$c5.addClass('in');
				if(ie)
				{
					$c5.fadeIn('fast');
				} else {
					oX = $c5.width() / 2;
					oY = $c5.width() / 2;
					$c5.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 640)
		{
			showQuizLink();
		}
	}

	else if(page == 'failedcampaigns')
	{
		if(st >= 360)
		{
			showQuizLink();
		}
	}

	else if(page == 'playing')
	{
		var $b1 = $('#badge-1');
		var $lockClosed = $('#lock-closed');
		var $lockOpen = $('#lock-open');
		var $c1 = $('#contact-med');
		var $r1 = $('#ribbon-1');
		var $r2 = $('#ribbon-2');
		var $r3 = $('#ribbon-3');
		var $c2 = $('#contact-ribbon');

		if(st >= 80)
		{
			if(!$b1.hasClass('in'))
			{
				$b1.addClass('in');
				if(ie) {
					$b1.fadeIn('fast');
				} else {
					oX = $b1.width() / 2;
					oY = $b1.height() / 2;
					$b1.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300);
				}

			}
		}

		if(st >= 495)
		{

			if(!$lockClosed.hasClass('in'))
			{
				$lockClosed.addClass('in');
				$lockClosed.hide();
				$lockOpen.show();

				$r1.fadeIn('fast', function(){
					$r2.fadeIn('fast', function(){
						$r3.fadeIn('fast');
					});
				});
			}
		}

		if(st >= 702)
		{

			if(!$c1.hasClass('in'))
			{
				$c1.addClass('in');
				if(ie)
				{
					$c1.fadeIn('fast', function(){
						$c2.fadeIn('fast');
					});
				} else {
					oX = $c1.width() / 2;
					oY = $c1.height() / 2;
					$c1.animate({scale:[1,1], origin:[oX+'px',oY+'px']}, 300, function(){
						oX = $c2.height() / 2;
						$c2.animate({scale:[1,1], origin:[oX+'px','20px']}, 300);
					});
				}

			}
		}

		if(st >= 1070)
		{
			showQuizLink();
		}
	}

	else if(page == 'people')
	{
		if(st >= 551) showQuizLink();
	}

	else if(page == 'gallery')
	{
		if(st >= 1563)
		{
			showQuizLink();
		}
	}

	else if(page == 'contact')
	{
		if(st >= 698)
		{
			showQuizLink();
		}
	}
}
