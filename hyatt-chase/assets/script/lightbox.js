
window.boxStatus = {
	opened: false
};

$(function(){
	$("#footer nav li:first").css({border:"none"});
	
	Function.prototype.triggeralertbox = function( message ){
		$("#frame").html('<p class="ligtboxMsg">'+message+'</p>');
		$("#lightbox").css({"width":"50%","min-height":"100px","left":"25%"}).fadeIn(100);
		boxStatus.opened = true;
	}
	
	//if contact page
	$("a.contact").bind("click", function(){
		if(!boxStatus.opened){
			$('#frame').load('contact.php', function() {
				$("#lightbox").fadeIn(200);
				$("#contactFname").focus();
				boxStatus.opened = true;
				bindContactForm();
			});
		}
		return false;
	});
	
	$("#boxCloseBtn").bind("click", function(){
		$("#lightbox").fadeOut(200, function(){
			$("#submitContact").unbind("click", function(){
				$('#frame').html("");
			});
		}).removeAttr("style");
		boxStatus.opened = false;
		return false;
	});
	
	function validation(){
		var error = 0,
		FormArray = {firstname:'', lastname:'', email:'', issue:''},
		$firstname = $("#contactFname").val(),
		$lastname = $("#contactLname").val(),
		$email = $("#contactEmail").val(),
		$text = $("#contactText").val();

		if($firstname === ''){
			$("label[name='contactFname']").children("span").text("Missing First Name");
			FormArray.firstname = '';
			error++;
		}else{
			$("label[for='contactFname']").children("span").text("");
			FormArray.firstname = $firstname;
			error-1;
		}
		
		if($lastname === ''){
			$("label[name='contactLname']").children("span").text("Missing Last Name");
			FormArray.lastname = '';
			error++;
		}else{
			$("label[for='contactLname']").children("span").text("");
			FormArray.lastname = $lastname;
			error-1;
		}
		
		if($text === ''){
			$("label[name='contactText']").children("span").text("Please Explaine Your Issue");
			FormArray.issue = '';
			error++;
		}else{
			$("label[name='contactText']").children("span").text("");
			FormArray.issue = $text;
			error-1;
		}
		
		var emailuserPat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if( !emailuserPat.test($email)){ 
			$("label[name='contactEmail']").children("span").text("Need A Valid Email");
			FormArray.email = '';
			error++;
		}else{
			$("label[name='contactEmail']").children("span").text("");
			FormArray.email = $email;
			error-1;
		}
		
		if(error > 0){ return false; }else{ return FormArray; };
	};
	
	function bindContactForm(){
		$("#submitContact").bind("click", function(){
			var obj = validation();
			if(obj){
				$.ajax({
				url: 'mailrouter.php',
				type: 'POST',
				data: obj,
				dataType: 'html',
				cache: false,
				success: function(data, html, textStatus, jqXHR) {
					if(html === "success"){
						$(".formLeft, .formRight").fadeOut(200, function(){
							$(".messageAlert > p").text('Thank You. Your message has been sent.');
						});
					}
				}
				});
			}
			return false;
		});
	}
});





