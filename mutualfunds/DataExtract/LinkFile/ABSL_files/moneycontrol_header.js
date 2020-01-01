//Global Variables
var AFTERLOGINCALLBACK = '';
var USERNMMC = '';
var LOGIN_API = 'http://www.moneycontrol.com/portfolio_new/mc_login_check.php';
var SITEURL = "http://"+window.location.hostname+"/";
var SITEURL_BS = "http://"+window.location.hostname;
var MC_URL = 'http://www.moneycontrol.com/';

$(document).ready(function() {
	USERNMMC = readCookie("nnmc");
	
	if($('.sub1').length > 0){
		$('.sub1').hover(function(){
			headerTopPopups();
			$(this).find('.submenus').fadeIn();
			},function(){
			$(this).find('.submenus').hide();	
		});
	}
	
	if($('.icon-user').length > 0){
		$('.icon-user').click(function(){
			$('div#autosugg_mc_mobile, .pancakemenu').hide();	
			if($('.ic-search').hasClass('icon-close')){
				$('.ic-search').removeClass("icon-close");
			}
			if($('.iconpancake').hasClass('tpMenucl')){
				$('.iconpancake').removeClass("tpMenucl");
			}
			
			$(".usermenus").toggle();
			//$(this).find(".usermenus").toggle();
		});
	}
	
	if($('.toptab1').length > 0){
		$('.toptab1').hover(function(){
			headerTopPopups();
			$(this).find('.appblock').show();
			},function(){
			$(this).find('.appblock').hide();	
		});
	}
	
	if($('.subscriptionblock').length > 0){
		var premiumSlider = $('.subscriptionblock .app_banner').bxSlider({
			pager:false,   
			slideMargin:5,  
			minSlides: 3, 
			maxSlides: 4, 
			slideWidth: 230,  
			infiniteLoop:true, 
			moveSlides:1, 
		});

		var spec_slider = $('.splist').bxSlider({
				pager:false,   
				slideMargin:15,  
				minSlides:6, 
				maxSlides:6,
				slideWidth:145,  
				infiniteLoop:true, 
				moveSlides:1, 
		});
	}
	
	if($('.toptab2').length > 0){
		$('.toptab2').hover(function(){
			headerTopPopups();
			$(this).find('.subscriptionblock').show();
			premiumSlider.reloadSlider();
			},function(){
			$(this).find('.subscriptionblock').hide();
		});
	}

	if($('.toptab3').length > 0){
		$('.toptab3').hover(function(){
			headerTopPopups();
			$(this).find('.specialsblock').show();
			spec_slider.reloadSlider();
			},function(){
			$(this).find('.specialsblock').hide();	
		});
	}
	
	if($(window).width() <= 1024){
		/*if($('.stickymiddle').length > 0){
			$('.stickymiddle ul li').hover( function(){
				$(this).find('.stickysub').show();
				$('a', this).addClass('actlink');
			}, function(){
				$(this).find('.stickysub').hide();
				$('a', this).removeClass('actlink');
			});
		}*/
	}

	/*
	var navloc = $('.headBotm').offset().top;
	if($(window).width() > 1024){
		if($('.headBotm').length > 0){
			$(window).scroll(function(){
				if($(window).scrollTop() > navloc) {
					$('.headBotm').addClass('stickymenu');
					tophover();
					$('.stickysub').hide();
				} else {
					$('.stickysub.db.actlink').show();
					$('.headBotm').removeClass('stickymenu');
					$(".searchbox").hide();
					$('.ic-search').removeClass('icon-close');
					$('.activelink').unbind('mouseenter mouseleave');
				}
			});
		}
	}
	*/

	if($('.ic-search').length > 0){
		$('.ic-search').click(function(){
			$('div.pancakemenu, #mc_mobile_usermenus').hide();	
			if($('.iconpancake').hasClass('tpMenucl')){
				$('.iconpancake').removeClass("tpMenucl");
			}
			
			$("#autosugg_mc_mobile").toggle();
			$(this).toggleClass("icon-close");
		});
	}
	
	if($('.icpancakeblock #stickysrchCatSelected').length > 0){
		$('.icpancakeblock #stickysrchCatSelected').click( function(){
			$('.srchCat_DDL').toggle();
		});
	}
	
	/*if($('#ul_srchCat_DDL li a').length > 0){
		$('#ul_srchCat_DDL li a').click(function(e) {
            $('#ul_srchCat_DDL li a').removeClass('active');
			$(this).addClass('active');
			
			if($('#ul_srchCat_DDL li a.active').length > 0){
				$("#srchCatSelected").html($('#ul_srchCat_DDL li a.active').text()+' <span class="catDdl_Arrow"></span>');
				$("#form_topsearch #topsearch_type").val($('#ul_srchCat_DDL li a.active').attr('rel'));
				//$("#srch").slideUp();
				$("#srch").show();
			}
			return false;
        });
	}*/
	
	if($("#autosugg_mc1").length > 0){
		$("#autosugg_mc1").mouseleave(function(e) {
			$("#autosugg_mc1").fadeOut();
			return false;
		});
	}
	
	if($(".myaccpop").length > 0){
		$(".myaccpop").mouseleave(function(e) {
			$('.myaccpop').parent('div.dropdown').removeClass('open'); //$(".myaccpop").fadeOut();
			return false;
		});
	}
	
	if($('.iconpancake').length > 0){
		$( ".iconpancake" ).click(function() {
			$('div#autosugg_mc_mobile, #mc_mobile_usermenus').hide();	
			if($('.ic-search').hasClass('icon-close')){
				$('.ic-search').removeClass("icon-close");
			}
			
			$(this).toggleClass('tpMenucl');
			$( ".pancakemenu" ).toggle();
		});
	}
	

	$(".btn-close").click(function(){
		$(this).closest('.dropdown').removeClass('open')
	});
	
	$('.dropdown-menu').click( function(e){
		e.stopPropagation();
	});
});

function getUrlParameter(para_name){
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;
	
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		
		if(sParameterName[0] === para_name){
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
    }
};

function go_on_top(){
	$("html, body").animate({ scrollTop: 0 }, 600);
	return false;
}

function headerTopPopups(){
	//$('ul.submenus, div.appblock, div.subscriptionblock, div.specialsblock, .registerblock, .signinblock, .myaccpop, div#autosugg_mc1').hide();
	$('ul.submenus, div.appblock, div.subscriptionblock, div.specialsblock, div#autosugg_mc1').hide();
	
	$('.signinblock').parent('div.dropdown').removeClass('open');
	$('.registerblock').parent('div.dropdown').removeClass('open');
	$('.myaccpop').parent('div.dropdown').removeClass('open');
	
	if($('.ic-search').length > 0){
		$('.ic-search').removeClass("icon-close");
	}
}

function suggestboxdd(Otext, frmName){
	var form_name = '#form_topsearch';
	frmName = $.trim(frmName);
	
	if(frmName == 'maintop'){
		var form_name = '#form_topsearch';
	}else if(frmName == 'mobile_top'){
		var form_name = '#form_mobile_topsearch';
	}

	/* Added code for GA Event -> Start */
		if( Otext != '' ) {
			var div_id = 'tab' + Otext;
			var option_text = $.trim( $( '#' + div_id ).find('a').text() );
			GAEventTracker( 'SEARCHUSAGE', 'CATEGORY', option_text.toUpperCase() );
		}
	/* End <- Added code for GA Event */

	// For Videos
	if( Otext == 7 ) {
		// $( "#form_topsearch" ).attr( 'action', "http://www.moneycontrol.com/tv/" );
	}

	var dd_val = Otext;
	$(form_name+' #ul_srchCat_DDL li').removeClass('active');
	//$(this).addClass('active');
	$(form_name+" #tab"+dd_val).addClass('active');
	$("#form_topsearch #topsearch_type, #form_mobile_topsearch #topsearch_type").val(dd_val);
	
		getAutosuggesionHeader(form_name);
	
}


function tophover(){
	$('.stickymenu .activelink').hover(function(){
		$(this).find('.stickysub').show();
	},function(){
		$(this).find('.stickysub').hide();
	});
}

/* Added code for GA Event -> Start */
	function track_search_ga_event() {
		var formName = '#form_topsearch';
		var selected_option_id = $.trim( $( formName + " #topsearch_type" ).val() );
		var div_id = 'tab' + selected_option_id;
		var option_text = $.trim( $( '#' + div_id ).find('a').text() );

		GAEventTracker( 'SEARCHUSAGE', 'NO_OF_USERS', 'RESULTCLICK' ); 
		GAEventTracker( 'SEARCHUSAGE', 'RESULTCLICK', option_text.toUpperCase() );
	}
/* End <- Added code for GA Event */

function getSearchKey( event ) {
	if(!event) return;
	var regex = new RegExp("^[a-zA-Z0-9]+$");
    var key = String.fromCharCode(!(event.charCode) ? event.which : event.charCode);
	console.log('GOT KEY', key);
    if (!regex.test(key)) {
       getAutosuggesionHeader( '#form_topsearch', event );
	}
	
	 getAutosuggesionHeader( '#form_topsearch', event, key );
	//func_call( '#form_topsearch', event, key );
}
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
var func_call = debounce(function(a,b,c) {
	getAutosuggesionHeader( a,b,c );
}, 500);

function getAutosuggesionHeader( formName, event, key ) {
	if($.trim(formName) == ''){
		formName = '#form_topsearch';
	}

	var serch_typ_url = "";
    var serch_txt =  $.trim( $( formName + " #search_str" ).val() );
	//console.log('serch_txt : ', serch_txt);
    var serch_typ = $.trim($(formName+" #topsearch_type").val());
	//  serch_typ =1;
	if(serch_typ == 2 || serch_typ == "2"){
		serch_typ_url = "http://www.moneycontrol.com/mf/mf_info/mfsearch.php";
	}else if(serch_typ == 5 || serch_typ == "5"){
		serch_typ_url = "http://www.moneycontrol.com/commodity/commodity-search/";
	}else{
		serch_typ_url = "http://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php";
	}
	
	var div_cls_serach = ' scrollBar ';
	
	if(formName == '#form_mobile_topsearch'){
		div_cls_serach = '';
	}
	
	/* Added code for GA Event -> Start */
		if( serch_txt.length == 1 ) {
			GAEventTracker( 'SEARCHUSAGE', 'NO_OF_USERS', '1LETTER' );
		} else if( serch_txt.length == 2 ) {
			GAEventTracker( 'SEARCHUSAGE', 'NO_OF_USERS', 'AFTER2LETTER' );
		} else if( serch_txt.length == 3 ) {
			GAEventTracker( 'SEARCHUSAGE', 'NO_OF_USERS', 'AFTER3LETTER' );
		} else if( serch_txt.length == 4 ) {
			GAEventTracker( 'SEARCHUSAGE', 'NO_OF_USERS', 'AFTER4LETTER' );
		} else if( serch_txt.length == 5 ) {
			GAEventTracker( 'SEARCHUSAGE', 'NO_OF_USERS', 'AFTER5LETTER' );
		} else if( serch_txt.length == 6 ) {
			GAEventTracker( 'SEARCHUSAGE', 'NO_OF_USERS', 'AFTER6LETTER' );
		}
	/* End <- Added code for GA Event */

	if(((serch_typ == 1 || serch_typ == 2 || serch_typ == 5 || serch_typ == 9 ) && serch_txt.length >= 1) ||
			((serch_typ == 3 || serch_typ == 6 || serch_typ == 7 || serch_typ == 10 )&& serch_txt.length >= 3)
		){
		serch_txt = encodeURIComponent(serch_txt); var wap_para = '';
		
		if($(window).width() <= 767 && JQ_IS_NEWS_SECTION === 1){
			wap_para = "&classic=true";
		}
		
        var main_serch_url = "https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php";
		
		$.ajax({
			url:main_serch_url+"?classic=true&query="+serch_txt+"&type="+serch_typ+"&format=json"+wap_para,
			
            jsonpCallback:"suggest1",
            cache:true,
            type:"GET",
            dataType:"jsonp",
            success:function(str){
                var i = ""; var s = 0; var o = "";
				// console.log(url);
                $.each(str, function(k, v){
					i += "<li>" +
						"	<a href='javascript:void(0);' onClick=\"track_search_ga_event(); trackAndRedirect('" + v.link_src + "','" + v.link_track + "');\">" + v.pdt_dis_nm + "</a>" +
						"</li>";
                    s++;
                });

                if( s > 9 && (serch_typ == 2 || serch_typ == 1 || serch_typ == 5 || serch_typ == 9)){
                    var u = serch_typ_url+"?search_str="+serch_txt+"&topsearch_type="+serch_typ;
                    if(serch_typ == 5){ u = serch_typ_url+serch_txt+".html"; }
					o = '<li><a href="'+u+'"><span>More »</span></a></li>';
				}
				
				var suggestbox_html = ''+
										'<ul class="suglist '+div_cls_serach+'">'
										  +i
										'</ul>'+
										'<div class="brdtp CTR PT5">'+
										'</div>'+
									  '';
				$(formName+" #autosuggestlist").html(suggestbox_html);
				headerTopPopups();
				$(formName+" #autosugg_mc1").show();
                
				if(formName == "#form_mobile_topsearch"){
					$('.ic-search').addClass('icon-close')
				}
				
				$('.scrollBar').jScrollPane({autoReinitialise: true});
			}
		})
    }else{
		if((serch_typ == 4) && serch_txt.length >= 3){
			window.location = 'https://mmb.moneycontrol.com/search/'+encodeURIComponent($.trim(serch_txt))+'/All/';
			return false;
		}else if((serch_typ == 7 || serch_typ == 8) && serch_txt.length >= 3){

			// For Videos
			if( serch_typ == 7 ) {
				$( '#form_topsearch #search_data' ).remove();
				$( '#form_topsearch #cid' ).remove();
				$( '#form_topsearch #mbsearch_str' ).remove();
				$( '#form_topsearch #topsearch_type' ).remove();
			}

			$(formName+'').submit();
			return false;
		}else{
			var suggestbox_html =''+
									'<ul class="suglist '+div_cls_serach+'">'+
									'</ul>'+								
									'<div class="brdtp CTR PT5">'+
									'</div>'+
								  '';
			$(formName+" #autosuggestlist").html(suggestbox_html);
			$(formName+" #autosugg_mc1").hide();
			$('.scrollBar').jScrollPane({autoReinitialise: true});
		}
	}
}

function addBodyClickEvt(element){
	$(document).unbind('click');	
	$(document).bind('click', function(event){
		var $target = $(event.target);
		if(!$target.parents().is(element) && !$target.is(element)){
			$(element).hide();
			$(document).unbind('click');
		}
	});
}

function submit_search_txt(formName){
	if($.trim(formName) == ''){
		formName = '#form_topsearch';
	}
	
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var t = $.trim($(formName+" #search_str").val());
    var n = $.trim($(formName+" #cid").val());
	var r = $.trim($(formName+" #topsearch_type").val());
	var i = "";
	
    if(t == ""){
        alert("Search string cannot be blank!!!");
        $(formName+" #search_str").focus();
        return false
	}
    if(t.length < 1){
        alert("Please enter minimum one characters for search");
        $(formName+" #search_str").focus();
        return false
	}
	if(r == 3 && t.length < 3){
		alert('Please enter minimum three characters for news search');
		$(formName+" #search_str").focus();
		return false;
	}
	if(r == 7 && t.length < 3){
		alert('Please enter minimum three characters for videos search');
		$(formName+" #search_str").focus();
		return false;
	}
	if(r == 10 && t.length < 3){
		alert('Please enter minimum three characters for glossary search');
		$(formName+" #search_str").focus();
		return false;
	}
    
    if(r == 1){
		i = "Price";
	}else if(r == 2){
		i = "MFs";
	}else if(r == 3){
		i = "News";
	}else if(r == 4){
		i = "Keyword";
	}else if(r == 5){
		i = "Commodities";
    }else if(r == 6){
		i = "Notices";
    }else if(r == 7){
		i = "Videos";
    }else if(r == 8){
		i = "All";
    }else if(r == 9){
		i = "Futures";
	}else if (r == 10){
		i= "Glossary";
	}
	
    var s = t;

    if(i == "News"){
        $(formName+" #search_data").val(s);
		$(formName+" #cid").val("News");
		$(formName+"").attr('action', "http://www.moneycontrol.com/mccode/news/searchresult.php?str="+s);
	}else if(i == "Price"){
        var o = t;
        o = o.toUpperCase();
        if(t.length < 2){
            Char = o.charAt(0);
            if(e.indexOf(Char) != -1){ $(formName+"").attr('action', "http://www.moneycontrol.com/india/stockmarket/pricechartquote/"+Char); }
		}else{
            $(formName+"").attr('action', "http://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?fname=price&companyname="+t.replace(/&/,"%26"));
		}
	}else if(i == "MFs"){
		var o = t;
		o = o.toUpperCase();
		if(t.length < 2){
			Char = o.charAt(0);
			if(e.indexOf(Char) != -1){
				$(formName+"").attr('action', "http://www.moneycontrol.com/india/mutualfunds/mutualfundsinfo/snapshot/"+Char);
			}else{
				$(formName+"").attr('action', "http://www.moneycontrol.com/mf/mf_info/mfsearch.php?AMCname="+t);
			}
		}else{
			$(formName+"").attr('action', "http://www.moneycontrol.com/mf/mf_info/mfsearch.php?AMCname="+t);
		}
	}else if(i == "Topic"){
		$(formName+" #mbsearch_str").val(s);
		$(formName+"").attr('action', "http://www.moneycontrol.com/msgboard/viewmsg/find_topic.php");
	}else if(i == "Boarder"){
		$(formName+" #mbsearch_str").val(s);
		$(formName+"").attr('action', "http://www.moneycontrol.com/msgboard/viewmsg/find_boarders.php");
	}else if(i == "Stock"){
		$(formName+" #mbsearch_str").val(s);
		$(formName+"").attr('action', "http://www.moneycontrol.com/msgboard/viewmsg/find_topic_stock.php");
	}else if(i == "Keyword"){
		$(formName+" #mbsearch_str").val(s);
		$(formName+"").attr('action', "https://mmb.moneycontrol.com/india/messageboard/mmb_search_result.php?f_criteria=Keyword&f_Period=1&f_search="+t);
	}else if(i == "Commodities"){
		$(formName+"").attr('method', 'POST');
		$(formName+"").attr('action', "http://www.moneycontrol.com/commodity/commodity-search/"+s+".html");
	}else if(i == "Notices"){
		$(formName+"").attr('action', "http://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?notice_q=1&fname=price&companyname="+t.replace(/&/,"%26"));
	}else if(i == "Web"){
		$(formName+"").attr('action', "http://www.moneycontrol.com/mccode/news/searchresult_archive.php?domains=www.moneycontrol.com&q="+t+"&client=ca-money_test_js&forid=1&channel=7271894659&ie=ISO-8859-1&oe=ISO-8859-1&flav=0000&cof=GALT%3A%230066CC%3BGL%3A1%3BDIV%3A%23999999%3BVLC%3A336633%3BAH%3Acenter%3BBGC%3AFFFFFF%3BLBGC%3AFF9900%3BALC%3A0066CC%3BLC%3A0066CC%3BT%3A000000%3BGFNT%3A666666%3BGIMP%3A666666%3BFORID%3A11&hl=en&x=38&y=9");
	}else if(i == "Videos"){
		$(formName+"").attr('action', "http://www.moneycontrol.com/tv/?search_str="+t);
	}else if(i == "All"){
		$(formName+" #search_data").val(s);
		$(formName+"").attr('action', "http://www.moneycontrol.com/news/websearch.php?search_data="+s);
	}else if(i == "Futures"){
		$(formName+" #search_data").val(s);
		$(formName+"").attr('action', "http://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?companyname="+t.replace(/&/,"%26"));
	} else if (i == "Glossary"){
		// $(formName+" #search_data").val(s)
		$(formName+"").attr('action', "https://www.moneycontrol.com/glossary/");
	}
	
}

/* MC Login and Register code (START) */

function showLoginRegPopup(typ){
	$('.signinblock').parent('div.dropdown').removeClass('open');
	$('.registerblock').parent('div.dropdown').addClass('open');
	
	/*typ = $.trim(typ);
	headerTopPopups();
	
	if(typ == "login"){
		$('.registerblock').fadeOut();
		
		$('.signinblock').fadeIn(50, function(){
			addBodyClickEvt('.signinblock');
		});
	}else if(typ == "signup"){
		$('.signinblock').fadeOut();
		
		$('.registerblock').fadeIn(50, function(){
			addBodyClickEvt('.registerblock');
		});
	}else if(typ == "profile"){
		$('.signinblock, .registerblock').fadeOut();
		
		$('.myaccpop').fadeIn(50, function(){
			addBodyClickEvt('.myaccpop');
		});
	}*/
	return false;
}

function hideLoginRegPopup(){
	//$('.registerblock, .myaccpop, .signinblock').fadeOut();
	return false;
}

function signInMCUser(){
	var user_name = $.trim($('form#signin_mc_frm input#signuname').val());
	var user_pass = $.trim($('form#signin_mc_frm input#signpwd').val());	
    var err = 0;
	
    if(user_name == ""){
        $('form#signin_mc_frm input#signuname').focus();
		alert('Please enter username.');
		err++;
        return false;
	}
	
	if(user_pass == ""){
        $('form#signin_mc_frm input#signpwd').focus();
		alert('Please enter password.');
		err++;
        return false;
	}
	
	if(err == 0){
		var api_url = LOGIN_API+'?username='+user_name+'&password='+SHA1(user_pass)+'&format=json&sh=1';
		$.ajax({
			url : api_url,
			type : "POST",
			dataType : "jsonp",
			crossDomain : true,
			success : function(json_data) {
				var succ_sts = JSON.parse(json_data.succ);
				
				if(succ_sts == 1 || succ_sts == '1'){
					USERNMMC = readCookie("nnmc");
					var redirect_url = getUrlParameter('ref');
					
					if($.trim(AFTERLOGINCALLBACK) != ''){
						//hideLoginRegPopup();
						eval(AFTERLOGINCALLBACK);
					}else if($('form#login').length > 0 || $.trim(redirect_url) == 'http://www.moneycontrol.com/mcplus/portfolio/loginportfolio.php'){
						window.location = 'http://www.moneycontrol.com/bestportfolio/wealth-management-tool/investments';
						return false;
					}else{
						location.reload(true);
					}
				}else if(succ_sts == 0 || succ_sts == '0'){
					alert('Invalid user name or password.');
				}else{
					alert('Error..!!');
				}
			}
		});
    }
    return false
}

function suggest_mcuser_ids(){
    var e = $.trim($("#reg_mc_frm #registerName").val());
	
    if(e.length >= 4){
		$("#div_user_name_not_available ul.userlist").html('');
		var str_li = '';
        
		$.get(MC_URL+"/mccode/common/unameAutosuggest.php?q_f=suggest&uname="+e,function(e){
			if(e.length>0){
                var n=e.split(",");
                
				for(var r = 0; r <= n.length-1; r++){
                    if(r == 6){ break; }
					
					if($.trim(n[r]) != ""){
						//str_li += '<div class="sugginp"><input name="suggrad" onclick="$(\'#registerName\').val($(this).val());$(\'#errDIv\').html(\'\');" type="radio" value="'+n[r]+'"/><span style="word-wrap: break-word;">'+n[r]+"</span></div>"
						str_li += '<li><label><input name="rdo_btn_username" onclick="$(\'#reg_mc_frm #registerName\').val($(this).val()); $(\'#div_user_name_not_available\').hide();" type="radio" value="'+n[r]+'"> '+n[r]+'</label></li>';
					}
				}
				
				$("#div_user_name_not_available ul.userlist").html(str_li);
				$("#div_user_name_not_available").show();
			}else{
				$("#div_user_name_not_available ul.userlist").html('');
				$("#div_user_name_not_available").hide();
			}
        })
	}
}

function checkAvailableMCUserName(){
    var e = $.trim($("#reg_mc_frm #registerName").val());
	
    if(e.length >= 4){
		$.ajax({
			url : MC_URL+"mccode/common/unameAutosuggest.php?q_f=checkuserA&uname="+e+'&format=json',
			type : "GET",
			dataType : "jsonp",
			crossDomain : true,
			success : function(json_data) {
				var succ_sts = $.trim(json_data.msg);
				
				if(succ_sts.length > 0){
					if(succ_sts != "Yes"){
						//alert("Username not available.");
						suggest_mcuser_ids();
					}else{
						$("div#div_user_name_available").show();
						setTimeout(function(){ $("div#div_user_name_available").hide(); }, 2000);
					}
				}
			}
		});
	}else{
		if(e.length > 0){
			alert("Username should be atleast 4 characters.");
			return false
        }
    }
}

function registration_MCUser() {
	var e = $.trim($("#reg_mc_frm #registerName").val());
	var t = $.trim($("#reg_mc_frm #registerPasword").val());
	var n = $.trim($("#reg_mc_frm #registerConfPasword").val());
	var r = $.trim($("#reg_mc_frm #registerEmail").val());
	var i = 0;

	if(e=="" || e=="Username"){
		alert("Please enter username.");
		i=1;
		$("#reg_mc_frm #registerName").focus();
		return false
	}
	
	if(e.length <= 3){
		alert("Username should be atleast 4 characters.");
		i=1;
		$("#reg_mc_frm #registerName").focus();
		return false
	}
	
	if(t == ""){
		alert("Please enter password.");
		i=1;
		$("#reg_mc_frm #registerPasword").focus();
		return false
	}
	
	if(t.length < 8){
		alert("Password should be 8 or more characters.");
	    i =1;
		$("#reg_mc_frm #registerPasword").focus();
	    return false;
	}
	
	var patternpw_numeric = new RegExp(/(?=.*\d)/);
	if(!patternpw_numeric.test(t)){
		alert("Password should contain atleast 1 number.");
		$("#reg_mc_frm #registerPasword").focus();
	    i =1;
	    return false;
	}
	
	var patternpw_caps = new RegExp(/(?=.*[A-Z])/);
	if(!patternpw_caps.test(t)){
		alert("Password should contain atleast 1 upper case letter.");
		$("#reg_mc_frm #registerPasword").focus();
	    i =1;
	    return false;
	}
	
	var patternpw_symbol = new RegExp(/(?=.*\W)/);
	if(!patternpw_symbol.test(t)){
		alert("Password should contain atleast 1 symbol (except #).");
		$("#reg_mc_frm #registerPasword").focus();
	    i =1;
	    return false;
	}
	
	var patternpw = new RegExp(/((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})/);
	if(!patternpw.test(t)){
		alert("Password should be 8 or more characters, atleast 1 number, 1 symbol (except #) and 1 upper case letter.");
		$("#reg_mc_frm #registerPasword").focus();
	    i =1;
	    return false;
	}
	
	if(t.match(/#/)){
		i=1;
		alert("Password should not contain # characters.");
		$("#reg_mc_frm #registerPasword").focus();
		return false
	}
	
	if(n != t){
		alert("Password and confirm password values doesnot match.");
		$("#reg_mc_frm #registerConfPasword").focus();
		i=1;
		return false
	}

	if(r == ""){
		alert("please enter email address.");
		i=1;
		$("#reg_mc_frm #registerEmail").focus();
		return false
	}
	
	var s=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(!s.test(r)){
		alert("please enter valid email address.");
		i=1;
		$("#reg_mc_frm #registerEmail").focus();
		return false
	}

	if(i == 0) {
		$.ajax({
			url : MC_URL+"mccode/common/unameAutosuggest.php?q_f=checkuserA&uname="+e+'&format=json',
			type : "GET",
			dataType : "jsonp",
			crossDomain : true,
			success : function(json_data) {
				var succ_sts = $.trim(json_data.msg);
				
				if(succ_sts == "Yes" && succ_sts.length == 3){
					$("#reg_mc_frm").removeAttr("onsubmit");
					$("#reg_mc_frm").attr("action", MC_URL+"mccode/common/commonRegistration.php");
					$("#reg_mc_frm").submit();
				} else {
					//alert("Username not available.");
					suggest_mcuser_ids();
					$("#reg_mc_frm #registerName").focus();
				}
			}
		})
	}
    return false
}

//Facebook Login Popup
function openFacebookLoginRegPopup(){
	//var e = "http://login.moneycontrol.com/social_user/Login_mc.php?fblogin=1&loginsec=mc&returl";
	var e = "https://mmb.moneycontrol.com/social_user/Login_mc.php?fblogin=1&loginsec=mc&returl";
	
    mctop_setCookie("returl", location.href, 1);
    var t = navigator.userAgent.match("MSIE (.)");
    var n = t&&t.length>1?t[1]:"";
    
	if(n != "" && n > 6){
        fbLoginWindow = window.open(e,"FacebookLogin","toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=850,height=500,left=180,top=15");
	}else{
        fbLoginWindow = window.open(e,"FacebookLogin","toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=850,height=500,left=180,top=15");
	}
	
	if(window.focus){ fbLoginWindow.focus(); }
	return false
}

//Twitter Login Popup
function openTwitterLoginRegPopup() {
	var e = "http://login.moneycontrol.com/social_user/getTwitterDatamc.php?loginsec=mc&twlogin";
	
    mctop_setCookie("returl", location.href, 1);
    var t = navigator.userAgent.match("MSIE (.)");
    var n = t&&t.length>1?t[1]:"";
    
	if(n != "" && n > 6){
        twLoginWindow = window.open(e,"TwitterLogin","toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=400,left=230,top=15");
	}else{
        twLoginWindow = window.open(e,"TwitterLogin","toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=800,height=400,left=230,top=15");
	}
	
	if(window.focus){ twLoginWindow.focus(); }
	
	return false;
}

//Google Login Popup
function openGoogleLoginRegPopup() {
	var e = "http://login.moneycontrol.com/social_user/Login_mc.php?loginsec=mc&glogin";
	
    mctop_setCookie("returl", location.href, 1);
    var t = navigator.userAgent.match("MSIE (.)");
    var n = t&&t.length>1?t[1]:"";
    
	if(n != "" && n > 6){
        ggLoginWindow = window.open(e,"GoogleLogin","toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=400,left=230,top=15");
	}else{
        ggLoginWindow = window.open(e,"GoogleLogin","toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=800,height=400,left=230,top=15");
	}
	
	if(window.focus){ ggLoginWindow.focus(); }
	
	return false;
}

//Yahoo Login Popup(Not in use-openYahooLoginRegPopup)
function openYahooLoginRegPopup() {
	var e = "http://login.moneycontrol.com/social_user/Login_mc.php?ylogin&returl=";
	
    mctop_setCookie("returl", location.href, 1);
    var t = navigator.userAgent.match("MSIE (.)");
    var n = t&&t.length>1?t[1]:"";
	
    if(n != "" && n > 6){
        yhLoginWindow = window.open(e,"YahooLogin","toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=400,left=230,top=15");
	}else{
        yhLoginWindow = window.open(e,"YahooLogin","toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=400,left=230,top=15");
	}
	
	if(window.focus){ yhLoginWindow.focus(); }
	
	return false
}

//Encryption function(SHA1)
function SHA1(msg) {
    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    };
    function lsb_hex(val) {
        var str="";
        var i;
        var vh;
        var vl;
        for( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };
    function cvt_hex(val) {
        var str="";
        var i;
        var v;
        for( i=7; i>=0; i-- ) {
          v = (val>>>(i*4))&0x0f;
          str += v.toString(16);
        }
        return str;
    };
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          }
          else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          }
          else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }
        }
        return utftext;
    };
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for( i=0; i<msg_len-3; i+=4 ) {
        j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
        word_array.push( j );
    }
    switch( msg_len % 4 ) {
        case 0:
          i = 0x080000000;
        break;
        case 1:
          i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
        break;
        case 2:
          i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
        break;
        case 3:
          i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
        break;
    }
    word_array.push( i );
    while( (word_array.length % 16) != 14 ) word_array.push( 0 );
    word_array.push( msg_len>>>29 );
    word_array.push( (msg_len<<3)&0x0ffffffff );
    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
        for( i= 0; i<=19; i++ ) {
          temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
          E = D;
          D = C;
          C = rotate_left(B,30);
          B = A;
          A = temp;
        }
        for( i=20; i<=39; i++ ) {
          temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
          E = D;
          D = C;
          C = rotate_left(B,30);
          B = A;
          A = temp;
        }
        for( i=40; i<=59; i++ ) {
          temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
          E = D;
          D = C;
          C = rotate_left(B,30);
          B = A;
          A = temp;
        }
        for( i=60; i<=79; i++ ) {
          temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
          E = D;
          D = C;
          C = rotate_left(B,30);
          B = A;
          A = temp;
        }
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();

}

/* MC Login and Register code (END) */

function readCookie(e){
	var t=e+"=";
    var n=document.cookie.split(";");
	
    for(var r=0;r<n.length;r++){
		var i=n[r];
        while(i.charAt(0)==" ")i=i.substring(1,i.length);
        if(i.indexOf(t)==0)return i.substring(t.length,i.length)
	}
	
	return false;
}

function mctop_setCookie(e,t,n){
    var r=new Date;
    r.setDate(r.getDate()+n);
    var i=escape(t)+(n==null?"":"; expires="+r.toUTCString())+"; path=/; domain=.moneycontrol.com; ";
	document.cookie=e+"="+i
}

function mctop_getCookie(e){
    var t,n,r,i=document.cookie.split(";");
    for(t=0;t<i.length;t++){
        n=i[t].substr(0,i[t].indexOf("="));
        r=i[t].substr(i[t].indexOf("=")+1);
        n=n.replace(/^\s+|\s+$/g,"");
        if(n==e){
            return unescape(r)
		}
	}
}