<?php require_once("includes/header.php"); ?>
<script>
	$(function(){
		$("#game_logo > a").fadeIn(0);
		
		var played = $.cookie('played');
		if(played === "true"){
			$(".entertowin").fadeOut(0);
		}
	});
</script>

	<div class="prizesMain">
		<div id="prizes" class="page_wrapper">
			<div class="prizesTop prizeSection">
				<div class="prizesHeader">
					<h2 class="prizesHeadText"><img class="prizesHeadImg" src="/common/img/prizesEpic.png" /> <span class="headerTextWrap"><b class="virginBold">Reward</b> &mdash; 500,000 ELEVATE REWARD POINTS</span></h2>
					<p class="prizesHeadSubText">How far can you get with half a million Elevate reward points? We've got some ideas.* GET GLOBETROTTING.</p>
				</div>
				<div class="prizesTopContent prizesContent group">
					<div class="fewIdeas">
						<h3 class="fewIdeasHeader">Here are a Few ideas</h3>
						<ul class="fewIdeasList">
							<li class="idea">Take our First Class seats for a spin (or several)</li>
							<li class="idea">Get some playa in Cancun, Cabo, or Puerto Vallarta</li>
							<li class="idea">See how the Upper Class lives on a Virgin Atlantic trip to London</li>
							<li class="idea">Start your world tour in Singapore</li>
							<li class="idea">Escape to Maui with your main squeeze</li>
							<li class="idea">See what goes down when you bring your mates Down Under</li>
							<li class="idea">Take over a hundred mood-lit mini-breaks on us</li>
						</ul>
					</div>
					<img class="prizesMap" src="/common/img/prizesMap.png" alt="" />
				</div>
			</div>
			<div class="prizesTable prizeSection">
				<a name="sec_daily_prize"></a>
				<div class="prizesHeader">
					<h2 class="prizesHeadText"><img class="prizesHeadImg" src="/common/img/prizesDaily.png" /> <span class="headerTextWrap"><b class="virginBold tableBold">Rewards</b></span></h2>
					<p class="prizesHeadSubText">Get the chance to cash in on sweet rewards from your favorite partners.</p>
				</div>
				<div class="prizesTableContent prizesContent group">
					<table>
						<tbody>
							<tr>
								<th>Date</th>
								<th>Partner</th>
								<th>Prize</th>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Thursday, August 08 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-partners.html" target="_blank"><img src="/common/img/prizesLogos/virginAmerica.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>25,000 Elevate reward points</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Friday, August 09 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-car-partners.html?int=elevate_car" target="_blank"><img src="/common/img/prizesLogos/budget.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>1 Free Day Rental certificate (10 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Saturday, August 10 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#morgan" target="_blank"><img src="/common/img/prizesLogos/mondrian.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Two-night stay in a Balcony Suite and two complimentary drinks at Skybar at Mondrian Los Angeles</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Sunday, August 11 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-car-partners.html?int=elevate_car" target="_blank"><img src="/common/img/prizesLogos/avis.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>15 Days of free car rentals (2 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Monday, August 12 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-shopping.html" target="_blank"><img src="/common/img/prizesLogos/virginSwagShop.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>1 Fan Pack: Rickshaw Weekender Bag, water bottle, and Main Cabin model airplane</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Tuesday, August 13 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/vx/lifestyle" target="_blank"><img src="/common/img/prizesLogos/crunch.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>1 Free year of Crunch</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Wednesday, August 14 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#palmilla" target="_blank"><img src="/common/img/prizesLogos/oneAndOnly.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Two nights in a luxurious Beach Front Terrace Junior Suite</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Thursday, August 15 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#morgan" target="_blank"><img src="/common/img/prizesLogos/mondrianSouth.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Two-night stay with a couples massage at Mondrian South Beach</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Friday, August 16 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#pointshound" target="_blank"><img src="/common/img/prizesLogos/pointsHound.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>3-night Mexico Getaway Package valued at $1250, 3 nights in Mexico, Hotel stay covered up to $1,000, Ground transfer included, One tour/activity</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Saturday, August 17 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-car-partners.html?int=elevate_car" target="_blank"><img src="/common/img/prizesLogos/silverCar.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Free 3-day high-tech Audi A4 Silvercar rental (3 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Sunday, August 18 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#mohg" target="_blank"><img src="/common/img/prizesLogos/mandarinSanFran.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Two-night stay (2 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Monday, August 19 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#joie" target="_blank"><img src="/common/img/prizesLogos/joieDeVivre.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>1 free night at the Hotel Rex - San Francisco</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Tuesday, August 20 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#rocketmiles" target="_blank"><img src="/common/img/prizesLogos/rocketmiles.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>$100 Rocketmiles credit (6 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Wednesday, August 21 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-shopping.html" target="_blank"><img src="/common/img/prizesLogos/gilt.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>$100 e-Gift Card to Gilt.com (3 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Thursday, August 22 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-airline-partners.html?int=elevate_airline" target="_blank"><img src="/common/img/prizesLogos/singaporeAirlines.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>2 Round-trip economy tickets to north Asia</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Friday, August 23 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-shopping.html" target="_blank"><img src="/common/img/prizesLogos/ftd.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>$50 FTD Gift Cards (10 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Saturday, August 24 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-car-partners.html?int=elevate_car" target="_blank"><img src="/common/img/prizesLogos/carey.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>$200 Carey gift certificate</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Sunday, August 25 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#morgan" target="_blank"><img src="/common/img/prizesLogos/hudson.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>One-night stay with a $50 F&B credit at Hudson</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Monday, August 26 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#marriott" target="_blank"><img src="/common/img/prizesLogos/adagio.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Two-night stay at Hotel Adagio - Autograph Collection</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Tuesday, August 27 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-car-partners.html?int=elevate_car" target="_blank"><img src="/common/img/prizesLogos/sixt.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Free weekend car rental in the U.S. (6 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Wednesday, August 28 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#mohg" target="_blank"><img src="/common/img/prizesLogos/mandarinNewYork.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Two-night stay (2 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Thursday, August 29 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#hilton" target="_blank"><img src="/common/img/prizesLogos/hiltonHonors.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>1-night free certificate (5 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Friday, August 30 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/vx/lifestyle" target="_blank"><img src="/common/img/prizesLogos/mogl.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>3,000 Elevate points courtesy of MOGL (3 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Saturday, August 31 2013</td>
								<td class="logo"><a href=" http://www.virginamerica.com/frequent-flyer/elevate-airline-partners.html?int=elevate_airline" target="_blank"><img src="/common/img/prizesLogos/virginAustralia.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>2 economy round trip tickets from Los Angeles to Australia</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Sunday, September 1 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-car-partners.html?int=elevate_car" target="_blank"><img src="/common/img/prizesLogos/hertz.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Free Day Rental Certificate (4 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Monday, September 2 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#pointshound" target="_blank"><img src="/common/img/prizesLogos/pointsHound.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>2-night Las Vegas Weekend Package valued at $1500 - 2 nights at the Four Seasons Hotel, Ground transfer included, One tour/activity</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Tuesday, September 3 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-airline-partners.html?int=elevate_airline" target="_blank"><img src="/common/img/prizesLogos/hawaiianAirlines.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Two round-trips from the West Coast to Hawaii</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Wednesday, September 4 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#mohg" target="_blank"><img src="/common/img/prizesLogos/mandarinLasVegas.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Two-night stay (2 winners)</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Thursday, September 5 2013</td>
								<td class="logo"><a href=" http://www.virginamerica.com/vx/vacations?int=elevate_vacations" target="_blank"><img src="/common/img/prizesLogos/portico.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>2 night stay at a Portico residence in Las Vegas</td>
							</tr>
							<tr>
								<td class="date"><div class="prizesCellBorderLeft"></div><div class="prizesCellBorder"></div>Friday, September 6 2013</td>
								<td class="logo"><a href="http://www.virginamerica.com/frequent-flyer/elevate-hotel-partners.html#morgan" target="_blank"><img src="/common/img/prizesLogos/clift.png" alt="" /></a></td>
								<td class="prize"><div class="prizesCellBorder"></div>Dinner for two in Velvet Room at Clift</td>
							</tr>
						</tbody>
					</table>
					<br><br>
					<small><p>*Points required to redeem an Elevate travel reward on Virgin America will be publicly available on a seat and flight-specific basis and are subject to change. Domestic reward bookings are subject to a security fee of $2.50 per segment, payable by credit card or Virgin America credit file. The Passenger Facility Charge and Segment Fees are waived for domestic reward bookings. For international reward bookings, Virgin America guests are responsible for the taxes and fees incurred from international travel. These taxes and fees are subject to change at the discretion of each country's government and also vary from country to country depending on the origin and destination.  Applicable taxes, charges, surcharges and fees are payable and communicated by our Call Center at the time of availability. All redemptions quoted are Reward Seats, subject to availability and to the Elevate Terms and Conditions. Reward bookings are not eligible to earn Points. Point levels are based on an adult booking. Infant redemption bookings are not permitted.</p><p>Partner Airline Rewards are as set out on our website and are subject to change. The number of reward Points shown in the Partner Airline points calculator are for information only and actual reward Points needed for travel will be provided by a Virgin America call center agent. Reward redemptions for Partner Airline flights are subject to availability and capacity control. Partner airlines may limit the number of reward seats available on any flight and may prohibit travel on certain days. Note that the partner airline routes described on our website might not be direct flights and that connections may apply. Reward flight redemptions do not include any applicable passenger taxes, fees, charges and surcharges, which may cost up to $2,000 and which will be charged to and payable by each guest. The amount of such fees is subject to change and are payable at the time of booking.</p></small>
				</div><!-- /prizesTableContent -->
			</div><!-- /prizesTable -->
		</div><!-- /prizes -->
	</div><!-- /prizesMain -->
<?php require_once("includes/footer.php"); ?>