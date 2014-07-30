<div id="register" class="page_wrapper">
		<section id="register_wrapper">
			<div class="articleCopy">
				<p>Congratulations, high roller. You went big and it seriously paid off. Now all you have to 
				do is register or sign in with your Elevate number, and we'll email your reward right to you.</p>
			</div>
			
			<div class="awarded_offer"></div>
			<p>When you register, you can enter for the chance to win the daily or epic prize:</p>
			<a href="/prizes.php" target="_blank"><div class="epicPrize"><img src="/common/img/epic/reward_500k_pts.png" alt="Epic Reward"/></div></a>
			<a href="/prizes.php#sec_daily_prize" target="_blank"><div class="dailyPrize"><img src="common/img/test/TESTdailyPrize.jpg"/></div></a>
		</section>
		
		<aside id="sidebar" class="registerBar">			
			

			<!-- <div class="hr"></div> -->

			<p>Use your Elevate number to claim <b>the</b> prize you've already won <b>and be entered</b> to win the daily prize or an epic 500,000 Elevate points. Not an Elevate member? <a href="http://www.virginamerica.com/frequent-flyer/join-elevate.html" target="_blank">Click here</a> to start earning points, perks, and reward flights with no blackout dates.</p>
			
			<form id="registerForm" >
				<div class="mainInputs">
					<input type="text" name="firstName" value="First Name" />
					<input type="text" name="lastName" value="Last Name" />
					<input type="email" name="email" value="Email" />
					<input type="text" name="elevate" value="Elevate #" />
				</div>

				<ul class="accountLinks">
					<li><a href="https://www.virginamerica.com/createProfile.do?int=gobigbongo" target="_blank">Create Account</a></li>
					<li class="linksBorder"></li>
					<li><a href="http://www.virginamerica.com/frequent-flyer/elevate-program.html?int=gobigbongo" target="_blank">Forgot Elevate #</a></li>
				</ul>

				<ul class="check1">
					<!-- <li><input type="checkbox" id="checkbx1" name="dailyPrize" value="yes" /></li> -->
					<li><div id="dailyPrize" class="checkbox" name="true"></div></li>
					<li class="checkText">Enter me into Virgin America's <b>Daily Prize</b> drawing.</li>
					<li><a href="/dailyrules.php" target="_blank">Rules</a></li>
				</ul>

				<ul class="check2">
				<!-- <input type="checkbox" id="checkbx2" name="epicPrize" value="yes" /> -->
					<li><div id="epicPrize" class="checkbox" name="true"></div></li>
					<li class="checkText">Enter me into Virgin America's <b>Epic Prize</b> drawing.</li>
					<li><a href="/epicrules.php" target="_blank">Rules</a></li>
				</ul>
			</form>
			 <img id="gifload" src="/common/img/loader.gif" />
			<div id="registerBtn"></div>			
		</aside>
</div>