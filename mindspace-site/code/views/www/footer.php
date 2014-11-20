    </div><!-- /container -->
	<div id="footer">
        <div class="links"><!-- <a href="#">employment</a> |  --><a href="/contact">contact</a> | <a href="/redeem">redeem gifts</a></div>
        <div id="contactLink">
        	<a id="footerContact" title="Contact" href="/contact"><span class="points">+25</span><span class="title">Contact</span></a>
        </div>
		<div id="phoneNumber">
			<div id="preFix">480.</div><div id="number">941.8497</div>
		</div>
    </div>

	<!-- scripts -->
	<!--<script src="/js/css3-mediaqueries.js"></script>
	<script src="/js/css3-multi-column.js"></script>-->
	<script src="/js/jquery-plugins.js"></script>
	<!--<script src="/js/jquery.points.js"></script>
	<script src="/js/jquery.inview.min.js"></script>-->

    <!-- Points -->
    <?php
        if ($_SESSION['guest']['guest_id'] > 0) {
            $guest_id = $_SESSION['guest']['guest_id'];
        } else {
            $guest_id = '0';
        }
    ?>
    <script type="text/javascript" src="/js/ms_score.js"></script>
    <script>
    	
        function score_it (points, task_id) {
            var score = new msScore(<?= $guest_id ?>);
            
            //tasks not made yet
                        
            if (task_id > 0) {
                var taskvar = score.MSevent(points, task_id);
            }
            //tasks made
            //console.log(score["tasks"]);
            
            //console.log(score['tasks']); 
            //console.log(JSON.stringify(msScore(), null, 4));
            //console.log(JSON.stringify(taskvar, null, 4));
            //console.log(JSON.stringify(score, null, 4));
            
            $("#creditsNum").html(score.MSgetPoints());
            //console.log(score.MSgetPoints());    
			var progress = score.MScheckProgress();
			trace("Number of Pages Unlocked = " + progress);
			setProgressBar(progress);
        }

		function check_it (task)
		{
			var chk = new msScore(<?= $guest_id ?>);
			var unlocked = chk.MScheckTask(task);
			if(!unlocked)
			{
				var cost = chk.costs['t'+task];
				var pts = chk.MSgetPoints();
				trace("PAGE COSTS: " + cost + " & YOU HAVE: " + pts);
				if(pts < cost)
				{
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}

		}

        $(document).ready(function(){
            if (<?= $this->registry->new_registrant ?> == 1) {
                var new_score = new msScore(<?= $guest_id ?>);
                new_score.MSsyncToDB();
            }

            var task_id = parseInt($("#meta").data("task-id"));
            var points = parseInt($("#meta").data("points"));
            score_it(points, task_id);

			// set costs in main nav
			var so = new msScore(<?= $guest_id ?>);
			setNav(so);

			// set points earned
			var pgEarns = parseInt($('#q-meta').data('points'));
			$('#quiz-link').find('span').html(pgEarns);
			$('.cta-medallion').html(pgEarns);
			$('#submit-quiz-btn').find('span').html(pgEarns);

			// check if quiz was done
			var quizDone = so.MScheckTask(parseInt($('#q-meta').data('task-id')));
			if(quizDone)
			{
				$('#quiz-link').hide();
				$('#blue-link').hide();
			}

			// handle clicks on nav links
			$('.navlink').on('click.mindspace', function(e) {
				e.preventDefault();

				var taskID = $(this).attr('id').split('-')[1];
				var destination = $(this).attr('href');
				var gate = check_it(taskID);

				if(!gate) {
					showAlert('points-alert');
				} else {
					window.location = $(this).attr('href');
				}
			});

			$('#submit-quiz-btn').click(function() {
				if ($(this).is('.enabled')) {
					var task_id = parseInt($("#q-meta").data("task-id"));
		            var points = parseInt($("#q-meta").data("points"));
		            score_it(points, task_id);
					$('ul.quiz').hide();
					$('#submit-quiz-btn').hide();
					$('#forget-btn').html('DONE');
					$('#quiz-done').show();

					$('#quiz-link').hide();
					$('#blue-link').hide();
				}
			});
        });

    </script>

	<!-- various support -->
	<script src="/js/jquery.imagesloaded.min.js"></script>
	<script src="/js/jquery.hoverintent.min.js"></script>

	<!-- FOR SCROLLING -->
	<script src="/js/jquery.scrollTo-1.4.2-min.js"></script>
	<script src="/js/jquery.scrolling-parallax.js"></script>
	<script src="/js/jquery.transform-0.9.3.js"></script>
	<script src="/js/jquery.colorbox-min.js"></script>
	<script src="/js/toolbox.js"></script>

	<!-- LAYOUT DATA -->
	<script src="/js/layouts.js"></script>
	<!-- end scripts-->

	<div id="c-meta" style="display: none;" data-task-id="25" data-points="25"></div>
</body>
</html>
