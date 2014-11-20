<?php
//note that the server name is sent to flash below

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>Data Exchanger</title>
<meta http-equiv="content-type" content="text/html; charset=iso-8859-1">
	<style type="text/css" media="screen">
		body { background:#000;}
		#container { width:800px; margin:0 auto;}
	</style>
<!--[if IE 6]>
	<link rel="stylesheet" href="/css/ie6.css" type="text/css" media="screen" charset="utf-8">
	<script type="text/javascript" src="/js/iepngfix_tilebg.js"></script>
<![endif]-->
<!--[if lte IE 7]>
	<link rel="stylesheet" href="/css/ie.css" type="text/css" media="screen" charset="utf-8">
<![endif]-->
	<!--<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>-->
	<!--<script type="text/javascript" src="/js/ui.js"></script>-->
	<script type="text/javascript" src="/js/swfobject.js"></script>

	<!--<script type="text/javascript" src="/js/cufon-yui.js"></script>-->
	<!--<script type="text/javascript" src="/js/fontname.js"></script>-->
	<!--<script type="text/javascript">Cufon.replace('h1');</script>-->
</head>
<body>
<div id="container">
	<div id="flash"></div>
</div><!-- END CONTENT -->
	
</div><!-- END CONTAINER -->
<script type="text/javascript">
	// <![CDATA[
	var flashvars = {};
	flashvars.domain = "<?= $_SERVER['HTTP_HOST'];?>";
	var params = {};
	params.wmode = "transparent";
	params.salign = "tl";
	params.scale = "noscale";
	var attributes = {};

	swfobject.embedSWF("/flash/exchange.swf", "flash", "800", "600", "10.0.22", "/flash/expressinstall.swf", flashvars, params, attributes);
	// ]]>
</script>
<!-- <script type="text/javascript"> Cufon.now(); </script> -->
<script type="text/javascript">
//GA HERE
</script>
</body>
</html>
