//var pathArray = window.location.pathname.split("/");
if($("#redirecturl").length){
	if($("#redirecturl").val()!=''){
		var pathArray = $("#redirecturl").val().split("/");
		var secondLevelPath = pathArray[3];
	}else{
		var pathArray = window.location.pathname.split("/");
		var secondLevelPath = pathArray[1];
	}
}else{
	var pathArray = window.location.pathname.split("/");
	var secondLevelPath = pathArray[1];
}


var pageName = secondLevelPath.replace("-", ""); 
var pageName = pageName.replace(" ", ""); 
$(document).ready(function(e) { 

	$('.registerbtn').click(function(){

		var err_msg = "success";
		var brokerval = $("#reg_broker").val();
		var broker_interested_arr = [];
	    $.each($("input[name='interested_in_broker']:checked"), function(){ 
            broker_interested_arr.push($(this).val());
        });
        var broker_interested_arr_join = '';
        broker_interested_arr_join = broker_interested_arr.join(",");
	   
	    if(broker_interested_arr_join.length < 1){
			alert("Please select interested in");
			var err_interested_msg = "fail";
		}else{
			var err_interested_msg ='success';
			
		}
		/*START: validate form*/
		var err_name_msg = "success";
		if($("#tname").val() == ''){
			$("#en_alph").html("Enter your name");
			$("#en_alph").show();
			$("#name").removeClass('success');
			$("#name").addClass('error');
			err_name_msg = "fail";
			//return false;
			
		}

		var err_number_msg = "success";
		if($("#tnumber").val() ==''){
			$("#en_number").html("Enter your contact number");
			$("#en_number").show();
			$("#contact").removeClass('success');
			$("#contact").addClass('error');
			err_number_msg = "fail";
			//return false;

		}

		err_email_msg = "success";
		if($("#temail").val() ==''){
			$("#en_email").html("Enter your email id");
			$("#en_email").show();
			$("#emailid").removeClass('success');
			$("#emailid").addClass('error');
			err_email_msg = "fail";
			//return false;

		}
		
		/*END: validate form*/
		if(err_name_msg == "success" && err_number_msg == "success" && err_email_msg == "success" && err_interested_msg == 'success'){	

			$( "#register_nw_btn" ).hide();

			/*START: Ajax call*/
			var SITE_LINK = window.location.hostname;
			var ajax_link = TRADENOW_AJAX_PATH + 'tradenow/ajax_trade_now.php?classic=true';

			var tname = $("#tname").val();
			var tnumber = $("#tnumber").val();
			var temail = $("#temail").val();
			var tcity = $("#city").val();
			var tsite = $("#site").val();
			var tbroker = broker_interested_arr_join;
			var chkval = 1;
			
				
				$.ajax({
					type: "POST",
					url: ajax_link,
					data: { user_name: tname, user_email: temail, user_number:tnumber, user_city:tcity, user_pincode:'', user_remark:'', broker_flag:tbroker, site:tsite, user_chkval: chkval },
					jsonpCallback: 'brokermsg',
					dataType : "jsonp",
					crossDomain: true,
					error: function(obj, errorMsg, d) {
						
					},
					success: function(outputmsg) {
						if(outputmsg.msg=='success'){
							$('#registerblock').hide();
							$('.reg_thankbxtrd').fadeIn();
							GAEventTracker('TRADENOWUSAGE', 'Registration', ''+pageName+'');
						} else {
							$( "#register_nw_btn" ).show();
							alert(outputmsg.msg);
							return false;
						}
					}
				});
			return false;
			/*END: Ajax call*/
		}else{
			return false
		}
	});

	$('.load_morecnt').click( function(){
		$('.cmpr_cont').toggleClass('colaps');
		$('.lodmorecnt').hide();
	});
	/*
	$(window).scroll(function(){
		if ($(this).scrollTop() > 400) {
			$('.accountedit').fadeIn('slow');
		} else {
			$('.accountedit').fadeOut('slow');
		}
	});
	*/
	$('.accountedit').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 500);
		return false;
	});


});

if($(window).width()<=768){
	$('.table_header').css('opacity', '0');
	$(window).scroll(function(){
		if( $( '.table_header' ).is( ':visible' ) ) {
			if($(window).scrollTop()+60 >= $('.table-scroll').offset().top){
				$('.table_header').css('opacity', '1');
			} else {
				$('.table_header').css('opacity', '0');
			}
		}
	});
	$('.table-scroll, .header-scroll').scroll(function(){
		$(".header-scroll").scrollLeft($(this).scrollLeft());
		$(".table-scroll").scrollLeft($(this).scrollLeft());  
	});
};

function tradepopup(isinid,ex,exid){

	//$('.popup_block_trade').fadeIn();
		var redirecturl = window.location.href;
		var sitehost = window.location.hostname;
		var site= 'web';
		if(sitehost == 'm.moneycontrol.com'){
			site= 'wap';
		}else{
			site= 'web';
		}
		
		var url = 'https://www.moneycontrol.com/techmvc/tradenow?classic=true&script_id='+isinid+'&ex='+ex+'&site='+site+'&asset_class=stock&redirecturl='+redirecturl;
		window.open(url, '_parent');

}
function backtomoneycontrol(){
	var moneycontrolurl = $("#redirecturl").val();
	window.open(moneycontrolurl, '_parent');
}
function allLetter(){  
	var inputtxt = $("#tname").val();
   var regex = /^[a-zA-Z0-9 ]+$/;
   if(inputtxt!=''){
		if(!regex.test(inputtxt)){
			$("#en_alph").html("Please enter alphabets only");
			$("#en_alph").show();
			$("#name").removeClass('success');
			$("#name").addClass('error');
			return false;
		} else{
			$("#en_alph").hide();
			$("#name").addClass('success');
			$("#name").removeClass('error');
		}
	} else{
		$("#en_alph").html("Enter your name");
		$("#en_alph").show();
		$("#name").removeClass('success');
		$("#name").addClass('error');
		return false;
	}
 }

function isDigit (){
	var s = $("#tnumber").val();
	var numberReg =  /^[0-9]+$/;
	//alert(s.length);
	if(s!=''){
	   if(!numberReg.test(s)){
			$("#en_number").html("Enter digits only");
			$("#en_number").show();
	     	$("#contact").addClass('error'); 
			return false;
		}

		if(s.length < 10 || s.length > 10){
			
				$("#en_number").html("Enter 10 digits only");
				$("#en_number").show();
		     	$("#contact").addClass('error'); 
				return false;

		}else{
				$("#contact").removeClass('error'); 
		    	$("#contact").addClass('success'); 
		    	$("#en_number").hide();
				return true;
			
		}
	}else{
		$("#en_number").html("Enter your contact number");
		$("#en_number").show();
		$("#contact").removeClass('success');
		$("#contact").addClass('error');
		return false;
	}
}

function isEmail (){
	var em = $("#temail").val();
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(em!=''){
		if(!emailReg.test(em)){
			$("#en_email").html("Enter valid email id");
			$("#en_email").show();
	     	$("#emailid").addClass('error'); 
			return false;
		}else{
			$("#emailid").removeClass('error'); 
	    	$("#emailid").addClass('success'); 
	    	$("#en_email").hide();
			return true;
		}
	}else{
		$("#en_email").html("Enter your email id");
		$("#en_email").show();
		$("#emailid").removeClass('success');
		$("#emailid").addClass('error');
		return false;
	}
}

function signinbtn() {

	var id = $.trim( $( 'input[name=radio]:checked' ).val() );
	var sign_in_path = $.trim( $( 'input[name=radio]:checked' ).attr( 'sign_in_path' ) );

	if( id == '' || id == undefined || id == 'both' ) {
		alert('Please select the Broker');
		return false;
	}

	GAEventTracker('TRADENOWUSAGE', 'Signin', ''+pageName+'');

	if( sign_in_path != '' ) {
		window.open( sign_in_path, '_blank' );
	}

}

function compare_broker(){
	var broker_compare_arr = [];
	$.each($("input[name='broker_check']:checked"), function(){ 
		broker_compare_arr.push($(this).val());
	});

	if(broker_compare_arr.length <= 3 && broker_compare_arr.length > 0){
		$("#compare_table").show();
		$('.comparebrokerli').each(function (index) {
			$(this).hide();
		});
		$.each( broker_compare_arr, function( i, val ) {
			// $( "#" + val ).show();
			$( "#" + val ).css('display','inline-block');
			$( "#" + val + '_hd' ).show();
		});
	} else {
		alert("Please select up to 3 brokers only");
	}
}