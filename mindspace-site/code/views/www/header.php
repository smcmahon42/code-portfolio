<!doctype html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>		<html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>		<html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="<?= $this->registry->description; ?>">
	<meta name="author" content="Mindspace.net">
	<meta name="DC.language" content="en" />
	<meta name="keywords" content="<?= $this->registry->keywords; ?>" />
	<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0,
            maximum-scale=1.0, width=device-width, user-scalable=no">
    <title><?= $this->registry->page_title; ?></title>
	<script type="text/javascript" src="http://use.typekit.com/zpb3cmv.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

	<link rel="shortcut icon" href="/images/favicon.ico">
	<link rel="stylesheet" href="/css/style.css" type="text/css" media="all" />
	<link rel="stylesheet" href="/css/colorbox.css" type="text/css" media="all" />

	<!--[if IE]>
		<link rel="stylesheet" href="/css/ie.css" type="text/css" media="all" />
	<![endif]-->

	<script src="/js/modernizr-2.5.3.min.js"></script>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script>window.jQuery || document.write("<script src='/js/jquery-1.7.1.min.js'>\x3C/script>")</script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>

	<script src="/js/js-webshim/minified/polyfiller.js"></script>
	<script type="text/javascript">
		$.webshims.polyfill('forms');
	</script>

	<script type="text/javascript">
        // var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_trackPageview']];
        // (function(d, t) {
        //     var g = d.createElement(t),
        //         s = d.getElementsByTagName(t)[0];
        //         g.async = true;
        //         g.src = '//www.google-analytics.com/ga.js';
        //         s.parentNode.insertBefore(g, s);
        // })(document, 'script');
	</script>

</head>

<body id="<?= $this->registry->page_id;?>" class="<?= $this->registry->page_class;?>">

<div id="overlay">&nbsp;</div>
<div id="alertBox">
	<div id="points-alert" class="alert-msg" style="display:none">
		<h2>not enough points</h2>
		<div class="circle white" style="width:203px; height:203px; margin-left:146px; margin-top:20px">
			<p style="top:50px">Oops! Looks like<br/>your vigorous<br/>page-clicking has<br/>run down your<br/>credits.</p>
			<img src="/images/white-circle.png" style="width:203px; height:203px; "/>
		</div>
		<div class="circle white" style="330px; height:330px; margin-left:307px; margin-top:-124px ">
			<p style="top:75px">Don't worry, you can replenish<br/>your stash and keep exploring<br/>by participating in some simple<br/>bribery! Enter your name and<br/>email below, and we'll gladly<br/>give you 100 million credits (or<br/>whatever the default is that<br/>ensures you can still play).</p>
			<img src="/images/white-circle.png" style="width:330px; height:330px" />
		</div>

		<form id="contact-points" class='contact'>
			<input type="submit" style="display:none" name="submit">

			<div class="circle white" style="width:165px; height:165px; margin-left:143px; margin-top:-80px">
				<p style="top:50px">NAME<br/><input type="text" name="name" placeholder="(enter name)" required /></p>
				<img src="/images/white-circle.png" style="width:165px; height:165px" />
			</div>

			<div class="circle white" style="width:165px; height:165px; margin-left:302px; margin-top:-80px">
				<p style="top:50px">EMAIL<br/><input type="email" name="email" placeholder="(enter email)" required /></p>
				<img src="/images/white-circle.png" style="width:165px; height:165px" />
			</div>

			<!-- <a class="submit-for" id="submit-contact-btn" alt="Submit button" href='#'><span>Submit</span></a> -->

			<a class="submit-for quiz-submit-btn proxima" href='#' style="display: inline-block; position:relative; left: 475px; top:-50px; margin:0;"><img src="/images/submit-for-btn.png" /><span class="proxima" style="color: white; font-size: 16px; position: absolute; left: 103px; width: 39px; height: 39px; line-height: 39px; display: block; text-align: center; top: 0;"></span></a>
		</form>
	</div>

	<div id="login-alert" class="alert-msg" style="display:none">
		<form id="form-login" action="<?= $_SERVER['REQUEST_URI'] ?>" method="post">
			<input type="submit" style="display:none" name="submit">
			<input type="hidden" name="option" value="login">
			<h2>login</h2>
			<div class="circle white" style="width:165px; height:165px; margin-top:20px; margin-left:235px">
				<p style="top:50px">EMAIL<br/><input type="email" id="l-email" name="username" placeholder="(enter email)" required /></p>
				<img src="/images/white-circle.png" style="width:165px; height:165px" />
			</div>

			<div class="circle white" style="width:165px; height:165px; margin-left:376px; margin-top:-50px">
				<p style="top:50px">PASSWORD<br/><input type="password" id="l-pass" name="password" placeholder="(enter password)" required /></p>
				<img src="/images/white-circle.png" style="width:165px; height:165px" />
			</div>

			<div style="width:280px; margin:0 auto; margin-top:20px">
				<p style="font-size:14px; color:white; line-height:16px; text-align: center;" class="proxima">Don't have an account yet?<br/><a class="register-btn" href="#">Click here</a> to get one.</p>
				<a class="generic-btn proxima login" id="login-btn" href='#' style="float:left; margin-right:20px">LOGIN</a>
				<a class="generic-btn proxima" id="cancel-btn" href='#' style="float:left">FORGET IT</a>
				<div class="clearer"></div>
			</div>
        </form>
	</div>

	<div id="reg-alert" class="alert-msg" style="display:none">
		<form id="form-register" action="<?= $_SERVER['REQUEST_URI'] ?>" method="post">
			<input type="submit" style="display:none" name="submit">
			<input type="hidden" name="option" value="register">
			<h2>save progress</h2>
			<div class="circle white" style="width:248px; height:248px; margin-top:20px; margin-left:266px">
				<p style="top:70px">Want us to remember<br/>you when you come<br/>back? Enter your email<br/>and a password to<br/>save your progress.</p>
				<img src="/images/white-circle.png" style="width:248px; height:248px" />
			</div>

			<div class="circle white" style="width:165px; height:165px; margin-left:170px">
				<p style="top:50px">EMAIL<br/><input type="email" id="r-email" name="username" placeholder="(enter email)" required /></p>
				<img src="/images/white-circle.png" style="width:165px; height:165px" />
			</div>

			<div class="circle white" style="width:165px; height:165px; margin-left:390px; margin-top:-90px">
				<p style="top:40px">PASSWORD<br/><input type="password" id="r-pass" name="password" placeholder="(enter password)" required style="width:75%"/><br/><input type="password" id="r-pass-confirm" name="password_confirm" placeholder="(confirm password)" required style="width:75%" /></p>
				<img src="/images/white-circle.png" style="width:165px; height:165px" />
			</div>

			<div style="width:280px; margin:0 auto; margin-top:20px">
				<a class="generic-btn proxima save" href='#' style="float:left; margin-right:20px">SAVE</a>
				<a class="generic-btn proxima cancel-alert-btn" href='#' style="float:left">FORGET IT</a>
				<div class="clearer"></div>
			</div>
		</form>
	</div>

	<div id="wrongpass-alert" class="alert-msg" style="display:none">
		<h2>whoops</h2>
		<div class="circle white" style="width:219px; height:219px; margin-top:20px; margin-left:180px">
			<p style="top:50px">That wasn't the<br/>right password.<br/>We'll email it to<br/>you if you like, just<br/>enter your address<br/>below.</p>
			<img src="/images/white-circle.png" style="width:219px; height:219px" />
		</div>

		<div class="circle white" style="width:165px; height:165px; margin-left:360px; margin-top:-50px">
			<p style="top:50px">EMAIL<br/><input type="text" id="wp-email" value="(enter email)" /></p>
			<img src="/images/white-circle.png" style="width:165px; height:165px" />
		</div>

		<div style="width:280px; margin:0 auto; margin-top:20px">
			<a class="generic-btn proxima" id="wp-submit-btn" href='#' style="float:left; margin-right:20px">SUBMIT</a>
			<a class="generic-btn proxima" id="tryagain-btn-1" href='#' style="float:left">TRY AGAIN</a>
			<div class="clearer"></div>
		</div>
	</div>

	<div id="wrongemail-alert" class="alert-msg" style="display:none">
		<h2>whoops</h2>
		<div class="circle white" style="width:175px; height:175px; margin-top:20px; margin-left:320px">
			<p style="top:50px">That wasn't a<br/>correct login.<br/>You've got a<br/>couple options.</p>
			<img src="/images/white-circle.png" style="width:175px; height:175px" />
		</div>

		<div class="circle white" style="width:296px; height:296px; margin-left:130px; margin-top:-30px">
			<p style="top:50px">
				<strong>1</strong><br/>
				<a href="#" id="tryagain-btn-2">Try again</a>; maybe your pointer<br/>finger betrayed you and<br/>entered the wrong letter<br/>
				<strong>2</strong><br/>We can <a href="#" id="email-pass-btn">email you your<br/>password</a> if you forgot it<br/>
				<strong>3</strong><br/>You can <a href="#" class="register-btn">create a<br/>new account</a>
			</p>
			<img src="/images/white-circle.png" style="width:296px; height:296px" />
		</div>

		<div class="circle white" style="width:165px; height:165px; margin-left:450px; margin-top:-250px; display:none" id="tryagain-email">
			<p style="top:50px">EMAIL<br/><input type="text" id="l-email-2" placeholder="(enter email)" /></p>
			<img src="/images/white-circle.png" style="width:165px; height:165px" />
		</div>

		<div class="circle white" style="width:165px; height:165px; margin-left:576px; display:none" id="tryagain-pass">
			<p style="top:50px">PASSWORD<br/><input type="password" id="l-pass-2" placeholder="(enter password)" /></p>
			<img src="/images/white-circle.png" style="width:165px; height:165px" />
		</div>

		<div class="circle white" style="width:165px; height:165px; margin-left:450px; margin-top:-250px; display:none" id="retrieve-email">
			<p style="top:50px">EMAIL<br/><input type="text" id="wp-email-2" placeholder="(enter email)" /></p>
			<img src="/images/white-circle.png" style="width:165px; height:165px" />
		</div>

		<div id="tryagain-btns" style="width:280px; margin:0 auto; margin-top:20px; display:none">
			<a class="generic-btn proxima" class="login-btn" href='#' style="float:left; margin-right:20px">SUBMIT</a>
			<a class="generic-btn proxima cancel-alert-btn" href='#' style="float:left">FORGET IT</a>
			<div class="clearer"></div>
		</div>

		<div id="retrieve-btns" style="width:280px; margin:0 auto; margin-top:120px; display:none">
			<a class="generic-btn proxima" class="retrieve-pass-btn" href='#' style="float:left; margin-right:20px">SUBMIT</a>
			<a class="generic-btn proxima cancel-alert-btn" href='#' style="float:left">FORGET IT</a>
			<div class="clearer"></div>
		</div>
	</div>

	<div id="directions-alert" class="alert-msg" style="display:none">
		<h2>if you're coming from bulgaria:</h2>
		<p>Take a plane to Paris, France. It's about a two-hour flight from Sofia, Bulgaria, so if you eat beforehand you can probably go without having to buy a snack in the airport. Next, fly from Paris, France to Atlanta, Georgia. They'll serve you lunch on that one, so again, avoid those high airport costs! We hope you're flight isn't late, because if it is, you might be kind of squeezed to catch your flight to Phoenix. But, since they're coming and going all day long from Atlanta (which is nice if you're a Phoenician in a long-distance relationship with someone in Atlanta, right?), you can always just catch the next one. So then you'll ride happily into Phoenix Sky Harbor International Airport, and you have a few options: 1) Rent a car, and drive to Mindspace. You'll follow the signs for the East exit (pay attention! If you miss it you'll have to loop around all four terminals again, and who wants to do that?!), toward the Loop 202 freeway. Take the freeway for a few miles, looking for the Scottsdale Rd/Rural Rd exit (they're the same road, it's just they change names like halfway through). Exit at Scottsdale/Rural, and take a Right at the light. You'll now travel through Arizona State University territory, so watch out for big sunglasses and people on bikes. You'll go through a few lights, maybe like 7 or 8, and when you get to Broadway, you'll want to be in the right lane. Don't turn right, just get in the right lane, because soon you're going to go through another light called Broadmor (did they have to have two such similarly-named roads that close together?). After you've gone through Broadmor, start paying attention to the building numbers. You only need to go down a little ways until you see a two-story, grey brick building with a funking-looking metal roof. That's our building. So turn into the lot, find a parking spot that is marked with a Mindspace sign, and that means you can park there. Now don't be fooled &mdash; the stairs are at the back of the building, the side that's away from the street. So you'll go up the stairs, and go through the door on your Left. You can go in the Right too, but the Welcome Committee is on the Left, and that’s usually the best group to encounter first. So that was just the first option. 2) Hail a cab from the middle curb at the airport, and the driver will assume the lead on the remaining steps from option 1, but then it's up to you for the stairs, Welcome Committee door, etc. 3) Find the lightrail shuttle bus at the airport, get on board, and ride the train East to the Tyler/Terrace stop. When you exit, you'll walk about a mile and a half south, same directions as the latter part of option 1. 4) Bike ridin.' (We wouldn't recommend walking; there are some sketchball neighborhoods near the airport). So that's how you get here.</p>
		<a href="#" class="closer generic-btn proxmia">Okay</a>
	</div>

	<div id="directions-alert-2" class="alert-msg" style="display:none">
		<h2>if you're coming from somewhere else:</h2>
		<p style="text-align:center"><a href="http://maps.google.com/maps?q=Mindspace,+South+Rural+Road,+Tempe,+AZ&hl=en&sll=35.506762,-82.604542&sspn=0.013363,0.02135&oq=mindspace+tempe&hq=Mindspace,+South+Rural+Road,+Tempe,+AZ&t=m&z=15" target="_blank" style="color:white; text-decoration:underline">Just Google it.</a></p>
		<a href="#" class="closer generic-btn proxmia">Great</a>
	</div>

	<div id="contact-thanks-alert" class="alert-msg" style="display:none">
		<h2>thank you for your note.<br/>we will get in touch with you shortly.</h2>
		<p style="text-align:center">We will also add you to the mailing list for our bi-daily newsletter so that you'll always<br/>know the latest Mindspace news, like when we're hungry and stuff.</p>
		<a href="/" style="margin: 15px auto;" class="generic-btn-wide proxmia">Keep exploring the site.</a>
		<a href="#" class="closer generic-btn-wide proxmia">I'll hang here for a while.</a>
	</div>

	<div id="contact-form-alert" class="alert-msg" style="display: none;">
		<h2>we can't wait to hear from you.</h2>
		<form id="contact-internet-route" class='contact'>
			<input type="submit" style="display:none" name="submit">
			<p>NAME:<br/><input type="text" name="name" placeholder="(enter name)" required /></p>
			<p>PHONE:<br/><input type="text" name="phone" placeholder="(enter phone)"/></p>
			<p>EMAIL:<br/><input type="email" name="email" placeholder="(enter email)" required /></p>
			<p>COMMENTS:<br/><textarea name="comments" placeholder="(what's on your mind?)"></textarea></p>
			<a class="submit-for" id="submit-contact-btn" alt="Submit button" href='#'><span>Submit</span></a>
		</form>
	</div>
</div>

<div id="backgrounds" style="background:none"></div>

<!-- START TOPBAR -->
<div id="header" class="group">
	<div id="headerWrap">
		<div id="tip">
			<img src="/images/tip.png" />
			<span class="proxima bold">RUNNING LOW ON CREDITS?</span> Earn 25 by contacting us so we can spam you every day.*
		</div>
		<div id="hud" class="group">
			<div id="hudLeft" class="hud-side">
				<span class="ostrich hud-num" id="creditsNum">100</span><span id="credits" class="kepler em hud-label">credits</span>
			</div>
			<div id="hudCenter">
				<a id="msLogo" href="/">
					<span id="msLogo">&nbsp;mindspace</span>
				</a>
			</div>
			<div id="hudRight" class="hud-side">
				<span class="ostrich hud-num" id="giftsNum"><span id="giftCount">0</span><span class="smaller">/</span>3</span><span id="gifts" class="kepler em hud-label">gifts</span>
			</div>
		</div>
		<!-- PROGRESS BAR -->
		<div id="progress">
			<span id="pagesUn">PAGES UNLOCKED</span>
			<span id="saveProg">
                <?php
                    if ($_SESSION['guest']['guest_id'] > 0) {
                        echo strtoupper($_SESSION['guest']['username']);
                    } else { ?>
				        <a id="login-link" href="">LOGIN</a> <span id="spacer">&nbsp;|&nbsp;</span> <a id="save-prog" href="">SAVE PROGRESS</a>
                <?php } ?>
			</span>
			<br class="clearer" />
			<div id="progContainer01" class="progContainer">
				<div id="progBar01" class="progBar">

				</div>
			</div>
			<img id="ribbon01" class="ribbon ribbon-locked" src="/images/ribbon.png" />
			<div id="progContainer02" class="progContainer">
				<div id="progBar02" class="progBar">

				</div>
			</div>
			<img id="ribbon02" class="ribbon ribbon-locked" src="/images/ribbon.png" />
			<div id="progContainer03" class="progContainer">
				<div id="progBar03" class="progBar">

				</div>
			</div>
			<img id="ribbon03" class="ribbon ribbon-locked" src="/images/ribbon.png" />
			<span id="redeem-gifts" style="display:none">
				<a href="/redeem">REDEEM GIFTS</a>
			</span>
		</div> <!-- END PROGRESS BAR -->
		<div class="clearer"></div>
	</div>

	<div id="navWrap">
		<div id="navControl">
			<div id="h4bg"></div>
			<nav id="mainNav" class="group">
				<div id="h4Wrap">
					<h4><img src="/images/lockOpen.png" />unlock all 12 pages below</h4>
				</div>
				<ul id="navbar" class="group">
					<li id="section-1" style="margin-right:10px">
						<ul>
							<li>
								<a href="/services" id="task-1" class="navlink">
									<div class="cost-top">-2</div>
									<div><img src="/images/burstMenuTop.png" class="burstMenuTop" /></div>
									<div class="nav-label-top">services</div>
								</a>
							</li>
							<li>
								<a href="/webservices" id="task-2" class="navlink">
									<div class="cost">-2</div>
									<div class="nav-label" style="margin-top:5px">digital marketing</div>
									<div class="clearer"></div>
								</a>
							</li>
							<li>
								<a href="/otherservices" id="task-3" class="navlink">
									<div class="cost">-2</div>
									<div class="nav-label">other<br/>things<br/>we do</div>
									<div class="clearer"></div>
								</a>
							</li>
							<li>
								<a href="/failedcampaigns" id="task-4" class="navlink">
									<div class="cost">-2</div>
									<div class="nav-label" style="margin-top:5px">failed<br/>campaigns</div>
									<div class="clearer"></div>
								</a>
							</li>
						</ul>
					</li>

					<li id="section-2" class="activeMenu">
						<ul>
							<li>
								<a href="/gamification" id="task-5" class="navlink">
									<div class="cost-top">-2</div>
									<div><img src="/images/burstMenuTop.png" class="burstMenuTop" /></div>
									<div class="nav-label-top">gamification</div>
								</a>
							</li>
							<li>
								<a href="/gamificationoptions" id="task-6" class="navlink">
									<div class="cost">-2</div>
									<div class="nav-label">your<br/>gamification<br/>options</div>
									<div class="clearer"></div>
								</a>
							</li>
							<li>
								<a href="/process" id="task-7" class="navlink">
									<div class="cost">-2</div>
									<div class="nav-label">the<br/>mindspace<br/>process</div>
									<div class="clearer"></div>
								</a>
							</li>
							<li>
								<a href="/ourbook" id="task-8" class="navlink">
									<div class="cost">-2</div>
									<div class="nav-label" style="margin-top:5px">our<br/>book</div>
									<div class="clearer"></div>
								</a>
							</li>
						</ul>
					</li>

					<li id="section-3" style="margin-left:10px;">
						<ul>
							<li>
								<a href="/about" id="task-9" class="navlink">
									<div class="cost-top">-2</div>
									<div><img src="/images/burstMenuTop.png" class="burstMenuTop" /></div>
									<div class="nav-label-top">about</div>
								</a>
							</li>
							<li>
								<a href="/playing" id="task-10" class="navlink">
									<div class="cost">-2</div>
									<div class="nav-label" style="margin-top:5px">playing<br/>this site</div>
									<div class="clearer"></div>
								</a>
							</li>
							<li>
								<a href="/people" id="task-11" class="navlink">
									<div class="cost">-2</div>
									<div class="nav-label" style="margin-top:10px">our people</div>
									<div class="clearer"></div>
								</a>
							</li>
							<li>
								<a href="/gallery" id="task-12" class="navlink">
									<div class="cost">-2</div>
									<div class="nav-label" style="margin-top:5px">gallery of<br/>greatness</div>
									<div class="clearer"></div>
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</div>

<div id="container">


	<!-- END TOPBAR -->
