		<section id="section_wrapper">
			<div id="partner_wrapper">
				<div id="scroll_wrapper">
				</div>
			</div>
		</section>

		<aside id="sidebar">			
			<p>PICK YOUR PARTNERS. Choose the six Elevate partner brands that'll go on your game board-and give you some special offers if you play your cards right.</p>
			<p class="partner_tip">Want to brush up on your Elevate Partners, <a href="http://www.virginamerica.com/frequent-flyer/elevate-partners.html" target="_blank">check out more here</a>.</p>

			<div id="selectSix" class="btn"></div>

			<ul id="pickedWrapper"></ul>
		</aside>

		<script>
		$(function(){
			$(window).load(function(){
				/* custom scrollbar fn call */
				$("#scroll_wrapper").mCustomScrollbar({
					scrollButtons:{enable:true},
					scrollInertia:600,
					autoDraggerLength:false
				});
			});
		});
		</script>