var menu_sh = 0;
var m_popupid = 0;
//var men_sel = "2";
var more_men=1;
var secglbVar=1;
// var login_api = '/watchlist1/login_check.php';
var login_api = 'https://www.moneycontrol.com/portfolio_new/mc_login_check.php';

function tab_ser(obj)
{
	for(var i=1; i<=7; i++)
	{
		if(obj==i)
		{
			document.getElementById('tab'+i).className = "on";
		}
		else
		{
			document.getElementById('tab'+i).className= '';
		}
	}
	document.getElementById('topsearch_type').value=obj;
}

function LTrim(value)
{
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}
	
function RTrim(value)
{
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}

function search_post()
{
	var ValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var search_str = LTrim(RTrim(document.topsearch.search_str.value));
	var section = document.topsearch.cid.value;
	if(search_str == "Type Here")
	{
		alert("Search string cannot be blank!!!");
		document.topsearch.search_str.focus();
		return false;
	}
	
	if(search_str.length < 3)
	{
		alert("Please enter minimum 3 characters for search");
		document.topsearch.search_str.focus();
		return false;
	}

	var topsearch_type=document.topsearch.topsearch_type.value;
	if(topsearch_type==1)
		var ser_typ="Price";
	else if(topsearch_type==2)
		var ser_typ="MFs";
	else if(topsearch_type==3)
		var ser_typ="News";
	else if(topsearch_type==4)
		var ser_typ="Keyword";
	else if(topsearch_type==5)
		var ser_typ="Commodities";
	else if(topsearch_type==6)
		var ser_typ="Notices";
	else if(topsearch_type==7)
		var ser_typ="Videos";
	else if(topsearch_type==8)
		var ser_typ="All";
	else if(topsearch_type==9)
		var ser_typ="Futures";

	var search_val=document.topsearch.search_str.value; 
	if(ser_typ == "News")
	{
		//document.topsearch.action = "/news/newssearch/newscat.php";
		//document.topsearch.action = "https://www.moneycontrol.com/mccode/news/searchresult.php";
		document.topsearch.search_data.value = search_val;
		document.topsearch.cid.value = 'News';
		document.topsearch.action = "https://www.moneycontrol.com/mccode/news/searchresult.php?str="+search_val;
	}
	else if(ser_typ == "Price")
	{
		var sText=document.topsearch.search_str.value;
		sText=sText.toUpperCase();
		if(search_str.length <2)
		{
			Char = sText.charAt(0); 	 
			if (ValidChars.indexOf(Char) != -1) 
				document.topsearch.action ="https://www.moneycontrol.com/india/stockmarket/pricechartquote/"+Char;
		}
		else
		{
			document.topsearch.action = "https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?fname=price&companyname="+(document.topsearch.search_str.value).replace(/&/,"%26");
		}
	}
	else if(ser_typ == "MFs")
	{
		var sText=document.topsearch.search_str.value;
		sText=sText.toUpperCase();
		if(search_str.length <2)
		{
			Char = sText.charAt(0); 	 
			if (ValidChars.indexOf(Char) != -1) 
				document.topsearch.action ="https://www.moneycontrol.com/india/mutualfunds/mutualfundsinfo/snapshot/"+Char;
			else
				document.topsearch.action = "https://www.moneycontrol.com/mf/mf_info/mfsearch.php?AMCname="+document.topsearch.search_str.value;
		}	
		else
		{
			document.topsearch.action = "https://www.moneycontrol.com/mf/mf_info/mfsearch.php?AMCname="+document.topsearch.search_str.value;
		}
	}
	else if(ser_typ == "Topic")
	{
		document.topsearch.mbsearch_str.value = search_val;
		document.topsearch.action = "https://www.moneycontrol.com/msgboard/viewmsg/find_topic.php";
	}
	else if(ser_typ == "Boarder")
	{
		document.topsearch.mbsearch_str.value = search_val;
		document.topsearch.action="https://www.moneycontrol.com/msgboard/viewmsg/find_boarders.php";
	}
	else if(ser_typ == "Stock")
	{
		document.topsearch.mbsearch_str.value = search_val;
		document.topsearch.action="https://www.moneycontrol.com/msgboard/viewmsg/find_topic_stock.php";
	}
	else if(ser_typ == "Keyword")
	{
		document.topsearch.mbsearch_str.value = search_val;
		document.topsearch.action="https://mmb.moneycontrol.com/india/messageboard/mmb_search_result.php?f_criteria=Keyword&f_Period=1&f_search="+document.topsearch.search_str.value;
	}
	else if(ser_typ == "Commodities")
	{
		document.topsearch.method="POST";
		document.topsearch.action = "https://www.moneycontrol.com/commodity/commodity-search/"+search_val+".html";
		 
	}
	else if(ser_typ == "Notices")
	{
		document.topsearch.action = "https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?notice_q=1&fname=price&companyname="+(document.topsearch.search_str.value).replace(/&/,"%26");
	}
	else if(ser_typ == "Web")
	{
		document.topsearch.action = "https://www.moneycontrol.com/mccode/news/searchresult_archive.php?domains=www.moneycontrol.com&q=" + document.topsearch.search_str.value + "&client=ca-money_test_js&forid=1&channel=7271894659&ie=ISO-8859-1&oe=ISO-8859-1&flav=0000&cof=GALT%3A%230066CC%3BGL%3A1%3BDIV%3A%23999999%3BVLC%3A336633%3BAH%3Acenter%3BBGC%3AFFFFFF%3BLBGC%3AFF9900%3BALC%3A0066CC%3BLC%3A0066CC%3BT%3A000000%3BGFNT%3A666666%3BGIMP%3A666666%3BFORID%3A11&hl=en&x=38&y=9";
	}
	else if(ser_typ == "Videos")
	{
		document.topsearch.action = "https://www.moneycontrol.com/tv/search_videos.php?search_str=" + document.topsearch.search_str.value;
	}
	else if(ser_typ == "All")
	{
		document.topsearch.search_data.value = search_val;
		document.topsearch.action = "https://www.moneycontrol.com/news/websearch.php?search_data="+search_val;
	}
	else if(ser_typ == "Futures")
	{
		document.topsearch.search_data.value = search_val;
		document.topsearch.action = "https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php?companyname="+(document.topsearch.search_str.value).replace(/&/,"%26");
	}
}
function closebellPost(msgid,dvid,data)
{
	var bmsg = $.trim(document.cs_bell_m3.r_message.value);	
	act_div=41;call_param=msgid;
	if(bmsg!='' && bmsg!='Join the discussion. Your views will be discussed on air.')
	{
		if(readCookie('nnmc'))
		{
		  document.cs_bell_m3.submit(); 
		}
		else
		{ 
			$.ajax({
				url: host+'india/messageboard/msgpost_before.php?action=update_action_json&entityid=close_bell&msg='+escape(bmsg)+'&r_rply_id='+msgid+'&callback=?',
				type: 'GET',
				dataType: 'jsonp',     
				success: function(jsonp) { 	
				$.each(jsonp,function(i,v){ 
					document.cs_bell_m3.rmsgid.value=v.ret_txt;
					check_login_m3('41');
					return false;
				});
				}
			});
		}
	}
	else
	{
		alert("Please input your message");
	}
}

function clopen_moremenu(action_val)
{
	if(action_val==1)
	{
		if(more_men==1)
		{
			document.getElementById('moremenu').style.display = 'block';
			more_men=0;
		}
		else
		{
			document.getElementById('moremenu').style.display = 'none';
			more_men=1;
		}
	}
	else if(action_val==2)
	{
		document.getElementById('moremenu').style.display = 'none';
		more_men=1;
	}
}

function trackAndRedirect(srcUrl,trackUrl){
    
    $.ajax({
            url:trackUrl,
            type:"GET",
            cache:true,
            dataType:"jsonp",
            crossDomain:true,
            timeout:3000,
            success:function(x,t,m){
                 window.location=srcUrl;                
            },
            error: function (xhr, ajaxOptions, thrownError) {
                 window.location=srcUrl;                
            }
    });
}
/* Common Autosearch */
function getAutosuggesion(){
	var search_str = $.trim($('#search_str').val());
	var topsearch_type = $.trim($('#topsearch_type').val());
	if(search_str=='Type Here')search_str='';
	var	srch_url='';
    
	if(topsearch_type==2)
		srch_url='https://www.moneycontrol.com/mf/mf_info/mfsearch.php';
	else if(topsearch_type==5)
		srch_url='https://www.moneycontrol.com/commodity/commodity-search/';
	else
		srch_url='https://www.moneycontrol.com/stocks/cptmarket/compsearchnew.php';

	if((topsearch_type==1 || topsearch_type==2 || topsearch_type==3  || topsearch_type==6 || topsearch_type==5 || topsearch_type==9) && search_str.length >= 3)
	{
		search_str = encodeURIComponent(search_str);
		var url = 'https://www.moneycontrol.com/mccode/common/autosuggesion.php';
		$.ajax({
            url: url+'?query='+search_str+'&type='+topsearch_type+'&format=json',
			jsonpCallback:'suggest1',
			cache:true,
            type: 'GET',
            dataType: 'jsonp',         
			success: function(jsonp) { 
				var inM_str='';var inM_ctr=0;var extra_str='';
				$.each(jsonp,function(i,v){	
                                    //inM_str+='<li><a target="_parent" href="'+v.link_src+'">'+v.pdt_dis_nm+'</a></li>';
                                    inM_str+="<li><a target='_parent' href='javascript:void(0);' onClick=\"trackAndRedirect('"+v.link_src+"','"+v.link_track+"')\">"+v.pdt_dis_nm+"</a></li>";
                                    inM_ctr++;
				});
				if(inM_ctr>9 && (topsearch_type==2 || topsearch_type==1 || topsearch_type==5 || topsearch_type==9))
				{
					var srch_url_link = srch_url +'?search_str='+encodeURIComponent(search_str)+'&topsearch_type='+topsearch_type;
					if(topsearch_type == 5)
						srch_url_link= srch_url+search_str+'.html';

					extra_str='<div align="center" style="height:20px;padding-top:5px;"><a href="'+srch_url_link+'" class="bl_12"><B>SEE MORE</B></a></div>';					

				}
				$("#autosugg_mc").html('<ul class="suglist">'+inM_str+'</ul>'+extra_str);
				$("#autosugg_mc").show(); 
				$('.topmnu2').addClass('showDvTpsrp');
				$('.topmnu2').removeClass('hideDvTpsrp');				
            }
        });
	}
}

if($('#autosugg_mc').length) {
	$('#autosugg_mc').on('mouseenter',function() {
		$('#autosugg_mc').mouseenter(function() {
			$('.topmnu2').removeClass('hideDvTpsrp');
			$('.topmnu2').addClass('showDvTpsrp');
		});
	});

	$('#autosugg_mc').on('mouseleave',function() {
		$('#autosugg_mc').mouseleave(function() {
			$('.topmnu2').removeClass('showDvTpsrp');
			$('.topmnu2').addClass('hideDvTpsrp');
		});
	});
}

$(document).ready(function(){
	$('.customDdl').click(function(){
		$(this).find('.customDdl_list').slideToggle();
	}).mouseleave(function(e) {
		$(this).find('.customDdl_list').hide();
	});
	$('.customDdl_list a').click(function(e){
		e.preventDefault();
		var linkTxt = $(this).html(); 
		$(this).parents('.customDdl').find('.selectedText').html(linkTxt);
	});

	$('.suggidclose').click(function(){
		$('.suggidbox').hide();
		$('.suggidbox').html("");
		$('#suggidbox__str').html("");
	});

	$("#srchN").mouseover(function(){
	$(this).addClass('showDv');
	$(this).removeClass('hideDv');
	});
	 $("#srchN").mouseout(function(){
		$(this).addClass('hideDv');
		$(this).removeClass('showDv');
	});

	$("#stkQt .aquot").click(function(){
		$('#stkQt').addClass('showDvQu');
		$('#stkQt').removeClass('hideDvQu');
	});

	$('#stkQt .getquotedrp').mouseover(function(){
		$('#stkQt').removeClass('hideDvQu');
		$('#stkQt').addClass('showDvQu');
	});
	$('#stkQt .getquotedrp').mouseout(function(){
		$('#stkQt').removeClass('showDvQu');
		$('#stkQt').addClass('hideDvQu');
	});
	 
	$('.srch_qote').hover(function(){$('.qubx').show();},function(){$('.qubx').hide();}); 

	$('.topmnu1 .gb_tpnav_sec').mouseenter(function(){
	 var eilthh  = $(this).attr('id').split('gb_tpnav_sec'); ;
	 if(!isNaN(eilthh[1]))
		{
		 $(this).addClass('act');
		 $('.topmnu1 #tpnav_ddl'+eilthh[1]).css('display','block');	
		}
	});

	$('.topmnu1 .gb_tpnav_sec').mouseleave(function(){
	var eilthh  = $(this).attr('id').split('gb_tpnav_sec');
	 if(!isNaN(eilthh[1]) )
		{
			$(this).removeClass('act');
			$('.topmnu1 #tpnav_ddl'+eilthh[1]).css('display','none');			 
		}
	});

	$('.topmnu1 .topnav_ddl').mouseenter(function(){
	var eilthh  = $(this).attr('id').split('tpnav_ddl');
	 if(!isNaN(eilthh[1]))
		{
		$('.topmnu1 #gb_tpnav_sec'+eilthh[1]).addClass('act');
		$(this).css('display','block');	
		}
	});
	$('.topmnu1 .topnav_ddl').mouseleave(function(){
	var eilthh  = $(this).attr('id').split('tpnav_ddl');
	 if(!isNaN(eilthh[1]) && eilthh[1]!=1 )
		{
			$('.topmnu1 #gb_tpnav_sec'+eilthh[1]).removeClass('act');
			$(this).css('display','none');	
		}
	});
});

function suggestuserids(frm)
{
	var regunm = $.trim($('form[name="'+frm+'"] input[name="reguname"]').val());
	if(regunm.length >=4 )
	{
		var suggStr = '<div class="MT10"><a class="suggidclose" href="javascript:;"></a><div class="CL"></div><p class="suggtitle">Suggested Usernames</p><div>';
		$.get('/mccode/common/unameAutosuggest.php?q_f=suggest&uname='+regunm,function(data) 
		{
			if(data.length > 0)
			{
			var suggnm =data.split(",");
			 
			for(var p=0;p<=suggnm.length-1;p++)
			{
				if(p==6)  break;
				if($.trim(suggnm[p])!="")
				{
					suggStr+='<div class="sugginp"><input name="suggrad" onclick="$(\'form[name='+frm+'] input[name=reguname]\').val($(this).val());$(\'#errDIv\').html(\'\');$(\'.errDIv\').html(\'\');" type="radio" value="'+suggnm[p]+'"/><span style="word-wrap: break-word;">'+suggnm[p]+'</span></div>';
				}
			}	suggStr+='<div class="CL"></div> </div> </div>';
				$('form[name="'+frm+'"]').find('.suggidbox').html(suggStr);$('form[name="'+frm+'"]').find('.suggidbox').css('display','block');
			}
			else
			{
				// 
			}
		}
		);
	}
}

/* Portfolio Page Register */
function suggestuserids2(frm) {
    var regunm = $.trim($('form[name="' + frm + '"] input[name="reguname"]').val());
    if (regunm.length >= 4) {
        var suggStr = '<div class="FL lg_b14"><b>Suggested Usernames</b></div><div class="FR"><a class="lg_gd14" onclick="$(\'.suggtBx\').hide()" href="javascript:;">X</a></div><div class="CL"></div>';
        $.get('/mccode/common/unameAutosuggest.php?q_f=suggest&uname=' + regunm, function(data) {
            if (data.length > 0) {
                var suggnm = data.split(",");

                for (var p = 0; p <= suggnm.length - 1; p++) {
                    if (p == 6) break;
                    if ($.trim(suggnm[p]) != "") {
                        suggStr += '<div class="FL PT5 PB5 PR5" style="width:40%;"><input name="suggrad2" type="radio" onclick="$(\'form[name=' + frm + '] input[name=reguname]\').val($(this).val());$(\'.errDIv2\').html(\'\');$(\'.errDIv2\').html(\'\');" value="' + suggnm[p] + '"> <span style="word-wrap: break-word;">'+suggnm[p]+'</span></div>';
                    }
                }
                suggStr += '<div class="CL"></div>';
                $('form[name="' + frm + '"]').find('.suggidbox2').html(suggStr);
                $('form[name="' + frm + '"]').find('.suggidbox2').css('display', 'block');
            }
        });
    }
}

function checkAvailableU(frm)
{ 
	var regunm = $.trim($('form[name="'+frm+'"] input[name="reguname"]').val());
	if(regunm.length >=4 )
	{
		var suggStr = '<div class="MT10"><a class="suggidclose" href="javascript:;"></a><div class="CL"></div><p class="suggtitle">Suggested Usernames</p><div>';
		$.get('/mccode/common/unameAutosuggest.php?q_f=checkuserA&uname='+regunm,function(data) 
		{
			if(data.length > 0)
			{
			  if($.trim(data) == 'Yes')
				{
				    $('form[name="'+frm+'"]').find('.errDIv').removeClass('redesrr'); 
				   $('form[name="'+frm+'"]').find('.errDIv').addClass('greenesrr');
					$('form[name="'+frm+'"]').find('.errDIv').html('<span class="tickkd"></span> Username available');
				}
				else
				{ 
					$('form[name="'+frm+'"]').find('.errDIv').removeClass('greenesrr');
					$('form[name="'+frm+'"]').find('.errDIv').addClass('redesrr'); 
					$('form[name="'+frm+'"]').find('.errDIv').html('<span class="crossd"></span> Username not available');
					suggestuserids(frm);
				}
			}
			else
			{
				// 
			}
		}
		);
	}
	else
	{
		if(regunm.length >0 )
		{
			alert("Username should be atleast 4 characters");
			//document.regmcFrm.reguname.focus();
			return false;
		}
	}

}

/* Portfolio Page Register */
function checkAvailableU2(frm) {
    var regunm = $.trim($('form[name="' + frm + '"] input[name="reguname"]').val());
    if (regunm.length >= 4) {
        var suggStr = '<div class="MT10"><a class="suggidclose" href="javascript:;"></a><div class="CL"></div><p class="suggtitle">Suggested Usernames</p><div>';
        $.get('/mccode/common/unameAutosuggest.php?q_f=checkuserA&uname=' + regunm, function(data) {
            if (data.length > 0) {
                if ($.trim(data) == 'Yes') {
                    $('form[name="' + frm + '"]').find('.errDIv2').removeClass('redesrr');
                    $('form[name="' + frm + '"]').find('.errDIv2').addClass('greenesrr');
                    $('form[name="' + frm + '"]').find('.errDIv2').html('<span class="tickkd"></span> Username available');
					$("#suggidbox2").hide();
                } else {
                    $('form[name="' + frm + '"]').find('.errDIv2').removeClass('greenesrr');
                    $('form[name="' + frm + '"]').find('.errDIv2').addClass('redesrr');
                    $('form[name="' + frm + '"]').find('.errDIv2').html('<span class="crossd"></span> Username not available');
                    suggestuserids2(frm);
                }
            } else {
                // 
            }
        });
    } else {
        if (regunm.length > 0) {
            //alert("Username should be atleast 4 characters");
            
			$('form[name="'+frm+'"]').find('.noUser').addClass('redesrr'); 
			$('form[name="'+frm+'"]').find('.noUser').html('<span class="crossd"></span> Username should be atleast 4 characters');

            //document.regmcFrm.reguname.focus();
            return false;
        }
    }
}

function openURLS(u,v)
{
	window.location=u;
	window.open(v);
}
function loadImage(el)
{
	if(el==0)
	$('#ldimgr').html('<img border="0" src="https://img-d03.moneycontrol.co.in/images/simple_watchlist/ajax-loader.gif" align="absmiddle">');
	else
		$('#ldimgr').html('');

}

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

function mcRegistrationCll()
{
	var reguname = $.trim(document.regmcFrm.reguname.value);
	var regpwd = $.trim(document.regmcFrm.regPwd.value);
	var regconfpwd = $.trim(document.regmcFrm.regConfPwd.value);
	var regemail = $.trim(document.regmcFrm.regemail.value);
	
	var chkFlag= 0 ;
	
	if(reguname == "" || reguname == "Username")
	{
		alert("Please enter username");
		chkFlag =1;
		document.regmcFrm.reguname.focus();
		return false;
	}
	if(reguname.length<=3)
	{
		alert("Username should be atleast 4 characters");
		chkFlag =1;
		document.regmcFrm.reguname.focus();
		return false;
	}
	if(regpwd =="")
	{
		alert("Please enter password");
		chkFlag =1;
		document.regmcFrm.regPwd.focus();
		return false;
	}
	if(regpwd.length<8)
	{
		alert("Password should be 8 or more characters");  
		chkFlag =1;
		return false;
	}
	var patternpw_numeric = new RegExp(/(?=.*\d)/);
	if(!patternpw_numeric.test(regpwd)){
		alert("Password should contain atleast 1 number"); 
		return false;
	}
	var patternpw_caps = new RegExp(/(?=.*[A-Z])/);
	if(!patternpw_caps.test(regpwd)){
		alert("Password should contain atleast 1 upper case letter"); 
		return false;
	}
	var patternpw_symbol = new RegExp(/(?=.*\W)/);
	if(!patternpw_symbol.test(regpwd)){
		alert("Password should contain atleast 1 symbol (except #)"); 
		return false;
	}
	var patternpw = new RegExp(/((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})/);
	if(!patternpw.test(regpwd)){
		alert("Password should be 8 or more characters, atleast 1 number, 1 symbol (except #) and 1 upper case letter"); 
		return false;
	}	
	if(regpwd.match(/#/))
	{
		chkFlag =1; 
		alert("Password should not contain # characters"); 
		return false;
	}	
	if(regconfpwd!=regpwd)
	{
		alert("Password and Confirm password values do not match");  
		chkFlag =1;
		return false;
	}	
	if(regemail=="" || regemail=="Email")
	{
		alert("Please enter email address");  
		chkFlag =1;document.regmcFrm.regemail.focus();
		return false;
	}
	
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	if(!pattern.test(regemail))
	{
		alert("Please enter valid email address");  
		chkFlag =1;document.regmcFrm.regemail.focus();
		return false;
	}
	loadImage(0);
	if(chkFlag == 0)
	{
		$.get('/mccode/common/unameAutosuggest.php?q_f=checkuserA&uname='+reguname,function(data) 
		{
			if(data.length > 0)
			{
				if($.trim(data) == 'Yes')
				{
					if($("#src").length>0){
						GAEventTracker("'"+$("#src").val()+"'", 'Top_MC_Registration', 'MCRegister');
					}
					document.regmcFrm.action = 'https://www.moneycontrol.com/mccode/common/commonRegistration.php';
					document.regmcFrm.submit();						 
				}
				else
				{
					alert("Username not available");loadImage(1);
				}
			}
		});
		
	}
	else
	{
		loadImage(1);
		
	}
	return false;
}

/* Portfolio Page Register */
function mcRegistrationCll2() {
	var frm = 'regmcFrm2';
    var reguname = $.trim(document.regmcFrm2.reguname.value);
    var regpwd = $.trim(document.regmcFrm2.regPwd.value);
    var regconfpwd = $.trim(document.regmcFrm2.regConfPwd.value);
    var regemail = $.trim(document.regmcFrm2.regemail.value);

    var chkFlag = 0;

    if (reguname == "" || reguname == "Username") {
        //alert("Please enter username");
		$('form[name="'+frm+'"]').find('.noUser').addClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noUser').html('<span class="crossd"></span> Please enter username');

        chkFlag = 1;
        document.regmcFrm2.reguname.focus();
        return false;
    }else{
	    $('form[name="'+frm+'"]').find('.noUser').removeClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noUser').html('');
    }

    if (reguname.length <= 3) {
        //alert("Username should be atleast 4 characters");
		$('form[name="'+frm+'"]').find('.noUser').addClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noUser').html('<span class="crossd"></span> Username should be atleast 4 characters');

        chkFlag = 1;
        document.regmcFrm2.reguname.focus();
        return false;
    }else{
    	$('form[name="'+frm+'"]').find('.noUser').removeClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noUser').html('');
    }

    if (regpwd == "") {
        //alert("Please enter password");
        $('form[name="'+frm+'"]').find('.noPass').addClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noPass').html('<span class="crossd"></span> Please enter password');

        chkFlag = 1;
        document.regmcFrm2.regPwd.focus();
        return false;
    }else{
    	$('form[name="'+frm+'"]').find('.noPass').removeClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noPass').html('');
    }

    if (regpwd.match(/#/)) {
        chkFlag = 1;
        //alert("Password should not contain # characters");
        $('form[name="'+frm+'"]').find('.noPass').addClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noPass').html('<span class="crossd"></span> Password should not contain # characters');

        return false;
    }else{
    	$('form[name="'+frm+'"]').find('.noPass').removeClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noPass').html('');
    }

    if (regconfpwd != regpwd) {
        //alert("Password and confirm password values doesnot match");
        $('form[name="'+frm+'"]').find('.noPassMatch').addClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noPassMatch').html('<span class="crossd"></span> Password and confirm password values are not matching');

        chkFlag = 1;
        return false;
    }else{
    	$('form[name="'+frm+'"]').find('.noPassMatch').removeClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noPassMatch').html('');
    }

    if (regpwd.length < 6) {
        //alert("Password should be 6-10 characters");
        $('form[name="'+frm+'"]').find('.noPass').addClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noPass').html('<span class="crossd"></span> Password should be 6-10 characters');

        chkFlag = 1;
        return false;
    }else{
    	$('form[name="'+frm+'"]').find('.noPass').removeClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noPass').html('');
    }

    if (regemail == "" || regemail == "Email") {
        //alert("please enter email address");
        $('form[name="'+frm+'"]').find('.noEmail').addClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noEmail').html('<span class="crossd"></span> Please enter email address');

        chkFlag = 1;
        document.regmcFrm2.regemail.focus();
        return false;
    }else{
    	$('form[name="'+frm+'"]').find('.noEmail').removeClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noEmail').html('');
    }

    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(regemail)) {
        //alert("please enter valid email address");
        $('form[name="'+frm+'"]').find('.noEmail').addClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noEmail').html('<span class="crossd"></span> Please enter valid email address');

        chkFlag = 1;
        document.regmcFrm2.regemail.focus();
        return false;
    }else{
    	$('form[name="'+frm+'"]').find('.noEmail').removeClass('redesrr'); 
		$('form[name="'+frm+'"]').find('.noEmail').html('');
    }

    if (chkFlag == 0) {
		$("#cmdRegSub2").hide();
	    $('#ldimgr2').html('<img border="0" src="https://img-d03.moneycontrol.co.in/images/simple_watchlist/ajax-loader.gif" align="absmiddle">');

        $.get('/mccode/common/unameAutosuggest.php?q_f=checkuserA&uname=' + reguname, function(data) {
            if (data.length > 0) {
                if ($.trim(data) == 'Yes') {
					if($("#src").length>0){
						GAEventTracker("'"+$("#src").val()+"'", 'Portfolio_Signup_Registration', 'MCRegister');
					}
                    document.regmcFrm2.action = 'https://www.moneycontrol.com/mccode/common/commonRegistration.php';
                    document.regmcFrm2.submit();

                } else {
                    //alert("Username not available");
                    checkAvailableU(regmcFrm2);
                    loadImage(1);
                }
            }
        });

    } else {
        $("#cmdRegSub2").show();
		$('#ldimgr2').html('');

    }
    return false;
}

function excludeLogUrl()
{
	var exArr = new Array('portfolio_plus/sso/portfolio_signup.php','/mcplus/portfolio/logout.php');
	var topUrl = window.location.href;
	var mtchs=0;
	mtchs = topUrl.indexOf(exArr[0]);
	if(mtchs == -1)
	{
		mtchs = topUrl.indexOf(exArr[1]); 
	}
	return mtchs;
}
function signinMC(frm)
{
	var f_idval= document.signinfrm.login_id.value;
	var f_fwdval= document.signinfrm.password.value;
	var keepmesignedin = 0;
		 
	var proceed= 0;
	if(f_idval =="" || f_idval == "Username")
	{
		alert("Please enter username");document.signinfrm.login_id.focus();
		return false;
		proceed =1;
	}
	if(f_fwdval == "")
	{
		alert("Please enter password");document.signinfrm.login_id.focus();
		return false;
		proceed =1;
	}
	if(proceed == 0)
	{
		if($('#keepsignin_social').prop('checked')) {
		keepmesignedin =1
		}
		$.post(login_api,{
			sectionid:"MC",
			keep_signed:keepmesignedin,
			username:f_idval,
			password:SHA1(f_fwdval),
			sh:"1"
		}, function(data) 
		{	
			if(data=='alldone')
			{
				
				if($("#src").length>0){
					GAEventTracker("'"+$("#src").val()+"'", 'Top_Signup_Login', 'MCLogin');
				}
				// if(excludeLogUrl()=='-1')
				// { 
					// location.reload();
				// }
				$(".back2").css('display','none');
				$("#backInner2").css('display','none');
				if(work_div == 1)
				{
					console.log(work_div);
					console.log(typparam);
					console.log(typparam1);
					overlayPopup(2,typparam,typparam1);
				}else if(work_div == 2)
				{
					if(call_pg != "")
					{
						pcSavePort(2,call_pg);
					}
					else
					{
						pcSavePort(2);
					}
				}else if(work_div == 3)
				{
					validate_ysu(2);
				}else
				{
					location = 'https://www.moneycontrol.com/bestportfolio/wealth-management-tool/investments';
				}
			}
			else
			{
				alertErrorMsg(data);
			}
		}); 
	}
	return false;
}

var hvr = false;
function imgafterLoad(divID)
{
	if($('#'+divID).attr('src') == 'https://img-d03.moneycontrol.co.in/images/market/white.gif')
	{
		$('#'+divID).attr('src',$('#'+divID).attr('data-original'));
		$('#'+divID).fadeIn();
	}
}

function alertErrorMsg(data)
{
	if(data=='connection')
	{
		alert('Unable to connect, please try after sometime');
	}
	else
	{
		alert('Invalid Username/Password');
	}
}

function show_tpnav_ddl(tabid)
{
	for(var m=1;m<3;m++)
	{
		$('#gb_tpnav_sec'+m).removeClass('act');		 
	}
	$('#gb_tpnav_sec'+tabid).addClass('act');
	//$('#gb_tpnav_sec'+tabid).find('a').eq(0).css('height','24px');
	$('#tpnav_ddl'+tabid).show();
	if(tabid==3)
	{
		imgafterLoad('moneybhaiImg');			
	}
	if(tabid==2)
	{
		imgafterLoad('pytImg');
		imgafterLoad('iwImg');			
	}
}
function hide_tpnav_ddl(tabid)
{
	$('#gb_tpnav_sec'+tabid).removeClass('act');
	$('#tpnav_ddl'+tabid).hide();
	if(tabid==1)mctop_setCookie('cltop',1,1); 
}

function show_loginbox(formId)
{
	closesign();
	closereg();
	 $.blockUI({message: $('#'+formId), css:{top:($(window).height() - 425) /2 + 'px', left: ($(window).width() - 550) /2 + 'px', border:'0'}});
}

function clkreg(){
	$('#registerName').val("");
	document.getElementById('regact').className="selcact";
	document.getElementById('tpnav_ddl4').style.display="block";
	document.getElementById('signact').className="fs_10";
	document.getElementById('tpnav_ddl5').style.display="none";	
}
function closereg(){
	document.getElementById('regact').className="fs_10";
	document.getElementById('tpnav_ddl4').style.display="none";	$('#suggidbox').html("");	
}
function clksign(){
	document.getElementById('signact').className="selcact";
	document.getElementById('tpnav_ddl5').style.display="block";
	document.getElementById('regact').className="fs_10";
	document.getElementById('tpnav_ddl4').style.display="none";	
		
}
function closesign(){
	document.getElementById('signact').className="fs_10";
	document.getElementById('tpnav_ddl5').style.display="none";	
}
//Facebook Login Popup
function openFacebookPopupMC(url){	
	var url = "http://login.moneycontrol.com/social_user/Login_mc.php?fblogin=1&loginsec=mc&returl"+url;
	mctop_setCookie('returl',location.href,1);
	var match = navigator.userAgent.match("MSIE (.)");
	var version = match && match.length > 1 ? match[1] : "";
	if(version != "" && version > 6){ 
		fbLoginWindow = window.open(url,'FacebookLogin','toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=850,height=500,left=180,top=15');
	}else{
		fbLoginWindow = window.open(url,'FacebookLogin','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=850,height=500,left=180,top=15');
	}
	
	if (window.focus){
		fbLoginWindow.focus()
	}
	return false;
}
//Yahoo Login Popup
function yahooLoginPopupMC(url) {
	var url = 'http://login.moneycontrol.com/social_user/Login_mc.php?ylogin&returl='+url;
	mctop_setCookie('returl',location.href,1);
	var match = navigator.userAgent.match("MSIE (.)");
	var version = match && match.length > 1 ? match[1] : "";
	if(version != "" && version > 6){
		yhLoginWindow = window.open(url,'YahooLogin','toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=400,left=230,top=15');
	}else{
		yhLoginWindow = window.open(url,'YahooLogin','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no, width=800,height=400,left=230,top=15');
	}

	if (window.focus){
		yhLoginWindow.focus()
	}
	return false;
}
//Twitter Login Popup
function twitterLoginPopupMC(url) {
	var url = 'http://login.moneycontrol.com/social_user/getTwitterDatamc.php?loginsec=mc&twlogin'+url;
	mctop_setCookie('returl',location.href,1);
	var match = navigator.userAgent.match("MSIE (.)");
	var version = match && match.length > 1 ? match[1] : "";
	if(version != "" && version > 6){
	 	twLoginWindow = window.open(url,'TwitterLogin','toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=400,left=230,top=15');
	}else{
		 twLoginWindow = window.open(url,'TwitterLogin','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=800,height=400,left=230,top=15');
	}

	if (window.focus){
	 	twLoginWindow.focus()
	}
	return false;
}

//Google Login Popup
function googleLoginPopupMC(url) {
var url = 'http://login.moneycontrol.com/social_user/Login_mc.php?loginsec=mc&glogin'+url;
mctop_setCookie('returl',location.href,1);
var match = navigator.userAgent.match("MSIE (.)");
var version = match && match.length > 1 ? match[1] : "";
if(version != "" && version > 6){
	ggLoginWindow = window.open(url,'GoogleLogin','toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=400,left=230,top=15');
}else{
	ggLoginWindow = window.open(url,'GoogleLogin','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=800,height=400,left=230,top=15');
}

if (window.focus){
	ggLoginWindow.focus()
}
return false;
}
/*----------------------*/


function tab_topser(obj)
{
	for(var i=1; i<=9; i++)
	{
		if(obj==i)
		{
			document.getElementById('tab'+i).className = "active";
			document.getElementById('srchR').innerHTML = document.getElementById('tab'+i).innerHTML;
		}
		else
		{
			document.getElementById('tab'+i).className= '';
		}
	}
	document.getElementById('srch').style.display='none';
	document.getElementById('topsearch_type').value=obj;
}

function readCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++)
	{
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return false;
}


/* Modified to support Opera */
function bookmarksite(title,url){
if (window.sidebar) // firefox
	window.sidebar.addPanel(title, url, "");
else if(window.opera && window.print){ // opera
	var elem = document.createElement('a');
	elem.setAttribute('href',url);
	elem.setAttribute('title',title);
	elem.setAttribute('rel','sidebar');
	elem.click();
} 
else if(document.all)// ie
	window.external.AddFavorite(url, title);
}

/* common promo js */

function js_script_tag(js_url,adspot_id)
{
	var is_js_there;
	var scripts = document.getElementsByTagName("script");
	
	for(var i = 0; i < scripts.length; i++) 
	{
		if (scripts[i].src.substr(-js_url.length) == js_url)
		is_js_there = "yes";
	}
	
	if(is_js_there != "yes")
	{	
		var script_tag=document.createElement('script');
		script_tag.setAttribute("type","text/javascript");
		script_tag.setAttribute("src", js_url);
		script_tag.setAttribute("async", true); 
			if(adspot_id==""){
				if (typeof script_tag!="undefined"){
				var inside_head = document.getElementsByTagName('script')[0];
				inside_head.parentNode.insertBefore(script_tag, inside_head);} }
			else{
				var above_adspot = document.getElementById(adspot_id); 
				var parentDiv = above_adspot.parentNode; 
				parentDiv.insertBefore(script_tag, above_adspot);} 
	}
}

function css_link_tag(css_url,adspot_id)
{
	var is_css_there;
	var links = document.getElementsByTagName("link");
	
	for(var i = 0; i < links.length; i++) 
	{
		if (links[i].href.substr(-css_url.length) == css_url)
		is_css_there = "yes";	
	}
	
	if(is_css_there != "yes")
	{
		var link_tag=document.createElement("link");
		link_tag.setAttribute("rel", "stylesheet");
		link_tag.setAttribute("type", "text/css");
		link_tag.setAttribute("href", css_url);
			if(adspot_id==""){
				if (typeof link_tag!="undefined")
				document.getElementsByTagName("head")[0].appendChild(link_tag);}
				else{
				var above_adspot = document.getElementById(adspot_id); 
				var parentDiv = above_adspot.parentNode; 
				parentDiv.insertBefore(link_tag, above_adspot);}
	}
}

function js_script_tag_data(js_code,adspot_id)
{
	var script_tag = document.createElement("script");
	script_tag.setAttribute("type","text/javascript");
	script_tag.innerHTML = js_code;
	if(adspot_id==""){
		if (typeof script_tag!="undefined")
		document.getElementsByTagName("head")[0].appendChild(script_tag);}
		else{
		var above_adspot = document.getElementById(adspot_id);
		var parentDiv = above_adspot.parentNode;
		parentDiv.insertBefore(script_tag, above_adspot);}
}

function css_style_tag_data(css_code,adspot_id)
{
	var style_tag = document.createElement("style");
	style_tag.setAttribute("type","text/css");
	style_tag.innerHTML = css_code;
	if(adspot_id==""){
		if (typeof style_tag!="undefined")
		document.getElementsByTagName("head")[0].appendChild(style_tag);}
		else{
		var above_adspot = document.getElementById(adspot_id);
		var parentDiv = above_adspot.parentNode;
		parentDiv.insertBefore(style_tag, above_adspot);}
}

/*MC COMMON ELEMENTS*/
/*year drop down*/
function yyDrpDwn(name,year,endyear,extra){
	if(typeof year=='undefined' || year==''){var now = new Date();var year = parseInt(now.getFullYear());}
	if(typeof endyear=='undefined' || endyear==''){endyear=10;}
	if(typeof extra=='undefined' || extra==''){extra=''}
	var str='<select name="'+name+'" id="'+name+'" '+extra+'>';
	for(i=year;i>(year-endyear);i--){
       if(year==i)str+='<option value="'+i+'" selected>'+i+'</option>'; 
	   else str+='<option value="'+i+'">'+i+'</option>'; 
	}
    str+='</select>';
	return str;
}
/*month drop down*/
function mmDrpDwn(name,m,extra){
	if(typeof m=='undefined' || m==''){	var now = new Date();var m = now.getMonth();}
	var month= ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	if(typeof extra=='undefined' || extra==''){extra=''}
	var str='<select name="'+name+'" id="'+name+'" '+extra+'>';
	var val='';
	for(i=0;i<12;i++){
       if(i<9)val = '0'+(i+1);
	   else val = (i+1);
       if(m==i)str+='<option value="'+val+'" selected>'+month[i]+'</option>'; 
	   else str+='<option value="'+val+'">'+month[i]+'</option>'; 
	}
    str+='</select>';
	return str;
}
/*Day drop down*/
function ddDrpDwn(name,day,extra){
	if(typeof day=='undefined' || day==''){var now = new Date();var day = now.getDate();}
	var val='';
	if(typeof extra=='undefined' || extra==''){extra=''}
	var str='<select name="'+name+'" id="'+name+'" '+extra+'>';
	for(i=1;i<=31;i++){
	   if(i<10)val='0'+i;else val=i;
       if(day==i)str+='<option value="'+val+'" selected>'+i+'</option>'; 
	   else str+='<option value="'+val+'">'+i+'</option>'; 
	}
    str+='</select>';
	return str;
}


function customDrpDwn(name,hidden,extra){
	var str='<select name="'+name+'" id="'+name+'" '+extra+'>';
	var hidstr = $('#'+hidden).val();
	var arr = hidstr.split(",");
	for(var i=0;i<arr.length;i++){
		var subarr = arr[i].split(":");
		str+='<option value="'+subarr[0]+'">'+subarr[1]+'</option>';
	}
	str+='</select>';
	return str;
}

function customDrpDwn2(name,hidden,extra,defalult){
	var str='<select name="'+name+'" id="'+name+'" '+extra+'>';
	if(typeof defalult!='undefined' || defalult!=''){
		str+='<option value="">'+defalult+'</option>';
	}
	var hidstr = $('#'+hidden).val();
	var arr = hidstr.split(",");
	for(var i=0;i<arr.length;i++){
		str+='<option value="'+arr[i]+'">'+arr[i]+'</option>';
	}
	str+='</select>';
	return str;
}
/*static content*/
function getSectorNameArray(){
	var arr = new Array("Abrasives","Aluminium","Aquaculture","Auto - 2 & 3 Wheelers","Auto - Cars & Jeeps","Auto - LCVs/HCVs","Auto - Tractors",
	"Auto Ancillaries","Banks - Private Sector","Banks - Public Sector","Bearings","Breweries & Distilleries",
	"Cables - Power/Others","Cables - Telephone","Castings & Forgings","Cement - Major","Cement - Mini",
	"Cement - Products/Building Materials","Ceramics/Granite","Chemicals","Cigarettes","Compressors","Computers - Hardware",
	"Computers - Software","Computers - Software - Training","Computers - Software Medium/Small","Construction & Contracting - Civil",
	"Construction & Contracting - Housing","Construction & Contracting - Real Estate","Consumer Goods - Electronic",
	"Consumer Goods - White Goods","Couriers","Detergents","Diamond Cutting/Precious Metals/Jewellery",
	"Diversified","Domestic Appliances","Dry Cells","Dyes & Pigments","Edible Oils & Solvent Extraction",
	"Electric Equipment","Electricals","Electrodes/Graphite","Engineering","Engineering - Heavy","Engines","Fasteners",
	"Fertilisers","Finance - General","Finance - Housing","Finance - Investments","Finance - Leasing & Hire Purchase",
	"Finance - Term Lending Institutions","Food Processing","Glass & Glass Products","Hospitals & Medical Services",
	"Hotels","Leather Products","Lubricants","Machine Tools","Media & Entertainment","Metals - Non Ferrous","Mining/Minerals",
	"Miscellaneous","Oil Drilling And Exploration","Packaging","Paints/Varnishes","Paper","Personal Care","Pesticides/Agro Chemicals",
	"Petrochemicals","Pharmaceuticals","Plantations - Tea & Coffee","Plastics","Power - Generation/Distribution",
	"Power - Transmission/Equipment","Printing & Stationery","Pumps","Refineries","Retail","Rubber","Shipping","Steel - CR/HR Strips",
	"Steel - GP/GC Sheets","Steel - Large","Steel - Medium / Small","Steel - Pig Iron","Steel - Rolling","Steel - Sponge Iron",
	"Steel - Tubes/Pipes","Sugar","Telecommunications - Equipment","Telecommunications - Service","Textiles - Composite Mills",
	"Textiles - Cotton Blended","Textiles - Denim","Textiles - General","Textiles - Hosiery/Knitwear","Textiles - Machinery",
	"Textiles - Manmade","Textiles - Processing","Textiles - Readymade Apparels","Textiles - Spinning - Cotton Blended",
	"Textiles - Spinning - Synthetic Blended","Textiles - Synthetic/Silk","Textiles - Terry Towels","Textiles - Weaving",
	"Textiles - Woollen/Worsted","Trading","Transport","Tyres","Vanaspati/Oils");
	return arr;
}

function mcStaticDataLoad(adspot,name,holdplace,extra,defalult)
{
	if(typeof name=='undefined' || name==''){name='';}if(typeof holdplace=='undefined' || holdplace==''){holdplace='';}if(typeof extra=='undefined' || extra==''){extra='';}if(typeof defalult=='undefined' || defalult==''){defalult='';}
	switch(adspot)
	{	
	   case 'StockQuoteDrpDwn':
			var arr = {'stk_price':'GET QUOTE','techcharts':'Stock Chart','stkfno':'Future price','stkfno':'Option Price','snap':'NAVs','business':'Business','business':'BUSINESS','results':'Earnings','management-interviews':'Management Interviews','corpannounce':'Announcements','stock-views':'Stock Views','brokerage-reports':'Brokerage Reports','board-meetings':'Announcements', 'board-meetings':'Board Meetings','agm-egm':'AGM/EGM','bonus':'Bonus','rights':'Rights','splits':'Splits','dividends':'Dividends','companyhistory':'INFORMATION','companyhistory':'Company History','background':'Background','boardofdirectors':'Board Of Directors','capital-structure':'Capital Structure','listingdetails':'Listing Info','locations':'Locations','blockdeals':'Block Deals','balance':'Financials','balance':'Balance Sheet','profit':'Profit & Loss','quarterly':'Quarterly Results','halfyearly':'Half Yearly Results','ninemths':'Nine Monthly Results','yearly':'Yearly Results','cashflow':'Cash Flow','ratios':'Ratios','directorsreport':'Annual Report','directorsreport':'Directors Report','chairmanspeech':'Chairman\'s Speech','auditorsreport':'Auditors Report','notestoacc':'Notes To Accounts','finishedproducts':'Finished Goods','rawmaterials':'Raw Materials','peer_price':'Peer Comparison', 'peer_price':'Price','peer_price_perf':'Price Performance','mktcap':'Market CAP','netsales':'Net Sales','netprofit':'Net Profit','totassets':'Total Assets'};
			var inarr = {'business':'business','board-meetings':'board-meetings','companyhistory':'companyhistory','balance':'balance','directorsreport':'directorsreport', 'peer_price':'peer_price'};
			var cls='';var strtowrite='<ul id="stkqul">';
			for(key in arr){
				cls='';
				if(typeof inarr[key] !== 'undefined' && inarr[key] !== null){cls='class="qt_hd"'; }
				strtowrite+='<li '+cls+'><a href="javascript:void(0);" onclick="javascript:return ass_pval(\''+key+'\',\''+arr[key]+'\');" title="'+arr[key]+'">'+arr[key]+'</a></li>';
			}
			strtowrite+='</ul>';
			$('#StockQuoteDrpDwn').html(strtowrite);
			break;
	   case 'SectorDrpDwn':
			var arr = getSectorNameArray();
			var str='<select name="'+name+'" id="'+name+'" '+extra+'>';
			if(typeof defalult!='undefined' || defalult!=''){str+='<option value="">'+defalult+'</option>';}
			for(var i=0;i<arr.length;i++){
			  str+='<option value="'+arr[i]+'">'+arr[i]+'</option>';
			}
			str+='</select>';
			$('#'+holdplace).html(str);
			break;
	   case 'SectorDrpDwn2':
			var arr = getSectorNameArray();var topic='';
			var str='<select name="'+name+'" id="'+name+'" '+extra+'>';
			if(typeof defalult!='undefined' || defalult!=''){str+='<option value="">'+defalult+'</option>';}
			for(var i=0;i<arr.length;i++){
			  topic = arr[i];
			  topic=topic.replace(/\//g,""); 
			  topic=topic.replace(/&/g,""); 
			  topic=topic.replace(/ /g,"-"); 
			  topic=topic.replace(/---/g,"-"); 
			  topic=topic.replace(/--/g,"-"); 
			  topic=topic.toLowerCase();
			  str+='<option value="'+topic+'">'+arr[i]+'</option>';
			}
			str+='</select>';
			$('#'+holdplace).html(str);
		  break;
	  case 'SectorDrpDwn3':
			var arr = getSectorNameArray();
			var str='<select name="'+name+'" id="'+name+'" '+extra+'>';
			if(typeof defalult!='undefined' || defalult!=''){str+='<option value="">'+defalult+'</option>';}
			for(var i=0;i<arr.length;i++){
			  str+='<option value="'+(i+1)+'">'+arr[i]+'</option>';
			}
			str+='</select>';
			$('#'+holdplace).html(str);
			break;
	}
}
/*MC COMMON ELEMENTS END*/

function js_customDrpDwnBox(element_name,value_array,element_attribute,defalult_selection)
{
	var str='<select name="'+element_name+'" id="'+element_name+'" '+element_attribute+'>';
	for(var index_array in value_array) 
	{
	  if(index_array == defalult_selection)
		str+='<option value="'+index_array+'" selected>'+ value_array[index_array]+'</option>';
	  else
		str+='<option value="'+index_array+'">'+ value_array[index_array]+'</option>';
	}
	str+='</select>';
	return str;
}

function mctop_setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + "; path=/; domain=.moneycontrol.com; ";
	document.cookie=c_name + "=" + c_value; 
}

function mctop_getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}

function mctop_checkCookie(len)
{
	var pg_round = mctop_getCookie("pg_round");

	if (pg_round!=null && pg_round!="")
	{	
		if(pg_round==len){
			pg_round = 1;
		}else{
			pg_round = parseInt(pg_round) + 1;
		}
		if(pg_round>len)
			pg_round = 1;
		mctop_setCookie("pg_round",pg_round,1);
		return(pg_round);
	}
	else
	{				
		pg_round = 1;
		mctop_setCookie("pg_round",pg_round,1);
		return(pg_round);
	}
}

function getCustomPromoAds(divid,section,size){
	try{ var usernnmc = readCookie("nnmc");}catch(e){ var usernnmc = '';}
	var str='';

	if(section=='pricechart'){
        if(usernnmc!="")terminal_txt = usernnmc;
		else terminal_txt = "User";
        str='<div style="background:url(https://img-d03.moneycontrol.co.in/images/promo/terminal_promo_pc.png) no-repeat 0 0; width:426px; height:68px; font:11px/15px Arial, Helvetica, sans-serif; color:#333;"><div style="padding: 8px 37px 0 15px"><div><div>Dear <strong><em>'+terminal_txt+'</em></strong>,</div><div> <a href="http://www.moneycontrol.com/terminal" style="color:#333;text-decoration:none">We\'ve introduced MC Terminal - an enhanced version of real time price updates. </a> <a href="http://www.moneycontrol.com/terminal" style="color:#003264; font-size:12px;">Click here</a></div></div></div>';
	}else{
		var key_arr = new Array('2511','1981','2331','2311','2301','2071','1841','1931');
		if(section=='portfolio')var br='<br />';
		else var br=' ';
		var text_arr = new Array('Dear user,'+br+'<strong>Multibagger recommendation - Everest Industries</strong><br>Recommended Price: 137.45,Peak after reco: 206.45, Gain +50.20%',
		'Dear user,'+br+'<strong>Multibagger recommendation - Balkrishna Industries</strong><br>Recommended Price: 152.00, Peak after reco: 303.00, Gain +99.34%',
		'Dear user,'+br+'<strong>Multibagger recommendation - Kajaria Ceramics</strong><br>Recommended Price: 111.00, Peak after reco: 190.80, Gain +71.89%',
		'Dear user,'+br+'<strong>Multibagger recommendation - Pratibha Industries</strong><br>Recommended Price: 35.00, Peak after reco: 54.45, Gain +55.57%',
		'Dear user,'+br+'<strong>Multibagger recommendation - HCL Technologies</strong><br>Recommended Price: 388.45, Peak after reco: 523.50, Gain +34.77%',
		'Dear user,'+br+'<strong>Multibagger recommendation - Ajanta Pharma</strong><br>Recommended Price: 318.00, Peak after reco: 803.80, Gain +152.77%',
		'Dear user,'+br+'<strong>Multibagger recommendation - FAG Bearings</strong><br>Recommended Price: 908.00, Peak after reco: 1792.00, Gain +97.36%');
		var rnum = Math.floor((Math.random()*6)); 
		var key = key_arr[rnum];
		var text = text_arr[rnum];
		if(usernnmc!='' && typeof usernnmc!='undefined'){ text=text.replace('Dear user','Dear <strong><em>'+usernnmc+'</em></strong>'); }
		if(size=='426x68'){
			str='<div style="background:#f4e78d url(https://img-d03.moneycontrol.co.in/images/promo/pin_bg.gif) no-repeat right bottom; font: 11px/14px Arial; color:#333; padding: 7px 25px 8px 10px; position:relative;"><span style="position:absolute; right:0; top:-4px"><img src="https://img-d03.moneycontrol.co.in/images/promo/pin.gif" width="26" height="26" alt="" /></span>'+text+'<br /> <a href="https://poweryourtrade.moneycontrol.com/plus/multibagger/multibagger_promo.php?autono='+key+'" style="color:#003264" target="_blank"> Click here for full report</a></div>';
		}else if(size=='158x142'){
			str='<div style="background:#f4e78d url(https://img-d03.moneycontrol.co.in/images/promo/pin_bg.gif?) no-repeat right bottom; font: 11px/15px Arial; color:#333; padding: 9px 25px 9px 10px; position:relative;"><span style="position:absolute; right:0; top:-4px"><img src="https://img-d03.moneycontrol.co.in/images/promo/pin.gif?" width="26" height="26" alt="" /></span>'+text+'<br /> <a href="https://poweryourtrade.moneycontrol.com/plus/multibagger/multibagger_promo.php?autono='+key+'" style="color:#003264" target="_blank"> Click here for full report</a></div>';
		}
	}
	if(str!=''){$('#'+divid).html(str);}
}

function fp_close1(){document.getElementById('floatad_intp').style.height="60px";document.getElementById('flashcontent_tp').className="inth_fl_ad_off";}
function fp_open1(){document.getElementById('floatad_intp').style.height="400px";document.getElementById('flashcontent_tp').className="inth_fl_ad_on";}
function showloadedad(source,target){try{var ad_div = document.getElementById(source);var target_div = document.getElementById(target);if(ad_div!=null || target_div!=null){target_div.style.display='block';var ele_array = new Array();for (i=0;i<ad_div.childNodes.length;i++){if(ad_div.childNodes[i].tagName != '!' && ad_div.childNodes[i].tagName != 'SCRIPT'){ele_array[ele_array.length] = ad_div.childNodes[i];}}for (i=0;i<ele_array.length;i++){target_div.appendChild(ele_array[i]);}}}catch(err){}}

/*function commonPopRHS(n)
{
		var wid = $(window).width();
		var hwid = (wid/2) - 310;
		var wid2 = $(window).height();
		var hwid2 = (wid2/2) - 200;
		 
		document.getElementById('backrhspop').style.width = document.body.clientWidth + "px";
		document.getElementById('backrhspop').style.height = document.body.clientHeight +"px";
		document.getElementById('backrhspop').style.display = 'block';
		jQuery.fn.center = function () {
			this.css("position","absolute");
			 this.css("display","block");
			this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
			this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
			return this;
		}
		$('#'+n).center();

}*/
function commonPopRHS(n){

	var popMargTop =  ( $(window).height() - $('#'+n).height() ) / 2+$(window).scrollTop() ;//($('#'+n).height()) / 2;
	var popMargLeft = ( $(window).width() - $('#'+n).width() ) / 2+$(window).scrollLeft()//($('#'+n).width()) / 2;
	$('#'+n).css({'position':'absolute', 'top' : popMargTop, 'left' : popMargLeft });
	$("#lightbox_cb,#"+n).fadeIn(300);
	$('#lightbox_cb').remove();
	$('body').append('<div id="lightbox_cb"></div>'); 
	 
	$('#lightbox_cb').css({'filter' : 'alpha(opacity=80)'}).fadeIn(); 
}

function closeoverlay(n){
var disArr = new Array('lightbox_cb','backInner1_rhsPop','backInner1_rhsLogin','back','backInner2');
	$('.srch_bx').css('z-index','9999999');
	for(var jj=0;jj<=disArr.length;jj++)
	{
		 $('#'+disArr[jj]).css('display','none');
		 
	}
	if(n!=2)
	 $('input[name=chk_lst_stks]').attr('checked',false);
}
var work_div ='';
var typparam='';
var typparam1='';
var entity_type1='';

function overlayPopup(param,callp,callp1,entity_type)
{
	$('.srch_bx').css('z-index','999');
	if(readCookie('nnmc'))
	{
	if(param==0)
	{
		work_div=1;
		typparam=callp;
		typparam1=callp1;
		entity_type1 = entity_type;
		check_login_pop(1);
	}
	else
	{
	  var lastRsrs =new Array();
	
	$('input[name=chk_lst_stks]:checked').each(function(i,v){
		 
		lastRsrs[i]= $(this).val();		
	});



	if(lastRsrs.length > 0)
	{
		var resStr=''; secglbVar = typparam;
		
		var url = '/mccode/common/saveWatchlist.php';
		$.get( "/mccode/common/rhsdata.html", function( data ) {		
		$('#backInner1_rhsPop').html(data);	
			$.ajax({url:url,
			type:"POST",
			dataType:"json",
			data:{q_f:typparam1,wSec:secglbVar,wArray:lastRsrs,entity_typ:entity_type},			
			success:function(d)	
			{ 		
				var alert_msg = "";
				
				if(lastRsrs.length > 1){
					if(entity_type=='stk'){
						alert_msg = "Stocks";
					}else if(entity_type=='mf'){
						alert_msg = "Mutual funds";
					}else if(entity_type=='comm'){
						alert_msg = "Commodities";
					}
				}else{
					if(entity_type=='stk'){
						alert_msg = "Stock";
					}else if(entity_type=='mf'){
						alert_msg = "Mutual fund";
					}else if(entity_type=='comm'){
						alert_msg = "Commodity";
					}
				}
				var stat = '';
				$.each(d, function(key, val) {
					if(val.status=='success'){
						alert_msg_str = alert_msg+" Successfully added to watchlist."; 
						stat = 'success';
					}				   
				});
				if(stat =='success'){
					// alert(alert_msg_str);
				}else{
					alert_msg_str = alert_msg+' already present in watchlist.';
					// alert(alert_msg_str); 	
				}
				if ($('#mcpcp_addprof_info').length > 0) {
					$('#mcpcp_addprof_info').html(alert_msg_str);
					$('#mcpcp_addprof_info').show();
				}else{
					alert(alert_msg_str); 	
				}

				/*$('#rhsorgtitlepop').show();
				if(typparam=='1') // rhs
				{
					var appndStr='';
					var newappndStr = makeMiddleRDivNew(d); 
					appndStr = newappndStr[0];
					var titStr='';var editw='';
					var typevar='';
					var pparr= new Array('Monitoring your investments regularly is important.','Add your transaction details to monitor your stock`s performance.','You can also track your Transaction History and Capital Gains.');
					var phead ='Why add to Portfolio?';
					if(secglbVar ==1)
					{
						var stkdtxt='this stock';
						var fltxt=' it ';
						typevar ='Stock ';
						if(lastRsrs.length>1){
							stkdtxt='these stocks';
							typevar ='Stocks ';fltxt=' them	';
						}
						titStr='Have you invested in '+stkdtxt+'? You can track'+fltxt+'better in your Portfolio';
						editw ='https://www.moneycontrol.com/bestportfolio/wealth-management-tool/stock_watchlist';'edit_watchlist_rhspop';
					}
					if(secglbVar ==2)
					{
						var stkdtxt=' this scheme'; typevar ='Scheme ';var fltxt=' ';
						if(lastRsrs.length>1){stkdtxt='these schemes';typevar ='Schemes ';fltxt=' them ';}
						titStr='Have you invested in '+stkdtxt+'? You can track'+fltxt+'better in your Portfolio';
						editw = 'https://www.moneycontrol.com/bestportfolio/wealth-management-tool/mfwatchlist_more';
						pparr= new Array('Monitoring your Mutual Fund investments regularly is important.','Add your transaction details to monitor your scheme`s performance.','You can also track your Transaction History and Capital Gains.');
					}
					if(secglbVar ==3)
					{
						titStr='';
						$('#rhsorgtitlepop').hide(); typevar ='Commodity ';
						if(lastRsrs.length>1){typevar ='Commodities ';}
						editw = 'https://www.moneycontrol.com/bestportfolio/wealth-management-tool/comm_watchlist';

						pparr= new Array('You can now monitor LIVE price, volume and open interest of your favourite commodities','You can also monitor the performance of e-Series (NSEL) Commodities in our <a href="javascript:;" onclick="submitFormPortf();" class="bl_12">Commodity Portfolio</a>');
						phead='Tracking Commodities is easier now!';
					}
					var popretStr =lvPOPRHS(phead,pparr); 
					$('#poprhsAdd').html(popretStr);
					$('.btmbgnwr').show();
					var tickTxt ='<span class="arwrhgtnm"></span>';
					if(typparam1==1)
					{
						var existsFlag=$.inArray('added',newappndStr[1]);					 
						$('#toptitleTXT').html(tickTxt+typevar+' to your watchlist');
						if(existsFlag == -1)
						{
							if(lastRsrs.length > 1)
							$('#toptitleTXT').html(tickTxt+typevar+'already exist in your watchlist');
							else
							$('#toptitleTXT').html(tickTxt+typevar+'already exists in your watchlist');

						}


						$('#edit_watchlist_rhspop').html('Edit Watchlist');$('.btmbgnwr').hide();
					}
					else if(typparam1==2 || typparam1==5)
					{
						$('#toptitleTXT').html('Stock added to your portfolio');
						$('.btmbgnwr').hide();
						editw ='https://www.moneycontrol.com/portfolio_new/edit_stock_trans.php';
						titStr ='We recommend you add transactional details to evaluate your investment better';
						$('#edit_watchlist_rhspop').html('Edit Portfolio');
					}
					$('#rhsorgtitlepop').html(titStr);
					$('#edit_watchlist_rhspop').hide();
					if(typparam1==1 || typparam1==5)
					{
						$('#edit_watchlist_rhspop').attr('href',editw);
						$('#edit_watchlist_rhspop').show();
					}
					$('.accdiv').html('');
					$('.accdiv').html(appndStr);	
					if(secglbVar !=3 && d.data.length > 1 )
					{
						$(".acc_downTbb:first").addClass("acc_downTbb_A").show();
						
					}
					else
					{ 
					$('#tdtblhght').attr('height','409');
						if(secglbVar ==3)
						$('#tdtblhght').attr('height','369');

						$('.scroll-pane_rhs').css('height','255px');
						$('.jspContainer').css('height','255px');
						$('.acc_downTbb,.acc_downTbb_A').css('background','none');
					}
									
					$(".acc_phTDbb").hide();
					$(".acc_phTDbb:first").show(); 
				}
				else if(typparam==2) //price chart
				{
					var exstsFlg=0;
					$.each(d.data,function(i,v){
						exstsFlg = v.fl;
					});
					if(exstsFlg =='added')
					{
						$('#mcpcp_addprof_info').css('background-color','#eeffc8');
						$('#mcpcp_addprof_info').css('padding','4px');
						$('#mcpcp_addprof_info').css('text-align','center');
						if(secglbVar == "2")	// MF Watchlist
						{
							adtxt ='<span class="grn_right_mark MR5"></span> <strong>Scheme added to your watchlist</strong> ';
						}
						else
						{
							adtxt ='<span class="grn_right_mark MR5"></span> <strong>Stock added to your watchlist</strong> ';
						}
					}
					else
					{
						$('#mcpcp_addprof_info').css('background-color','#fff5c5');
						$('#mcpcp_addprof_info').css('background-color','#fff5c5');
						$('#mcpcp_addprof_info').css('padding','4px');
						$('#mcpcp_addprof_info').css('text-align','center');

						if(secglbVar == "2")	// MF Watchlist
						{
							adtxt = '<strong>Scheme already exists in your watchlist</strong> ';
						}
						else
						{
							adtxt = '<strong>Stock already exists in your watchlist</strong> ';
						}
					}
					$('#mcpcp_addprof_info').html(adtxt);
					
					$('#mcpcp_addprof_info').show();
					if(secglbVar != "2")
					{
						hideRTimer('#mcpcp_addprof_info',5000);
					}
				}*/
			},
			complete:function(d){
				if(typparam==1)
				{
					watchlist_popup('open');
				} 
			}
		});
		});
		}
		else
		{
			var disNam ='stock';
			if($('#impact_option').html()=='STOCKS')
			 disNam ='stock';
			if($('#impact_option').html()=='MUTUAL FUNDS')
			 disNam ='mutual fund';
			if($('#impact_option').html()=='COMMODITIES')
			 disNam ='commodity';			

			alert('Please select at least one '+disNam);
		}
	}
	}
	else
	{
		work_div=1;
		typparam=callp;
		typparam1=callp1;
		check_login_pop(1);
	}
}
function submitFormPortf()
{
	$('body').append('<form method="post" id="portredirectform" action ="https://www.moneycontrol.com/bestportfolio/wealth-management-tool/investments"><input type=hidden value="spotcomm" name="add_particulars" /><input type=hidden value="0" name="menuid" /></form>'); 
	$('#portredirectform').submit();
}
function lvPOPRHS(head,el)
{
	 
	var retStr='<div class="brdbtmhg"><div class="qutmark"><span class="qmark"></span></div><div class="quetxt">'+head+'</div><div class="CL"></div></div>';
	for(var io=0;io<el.length;io++)
	{
		var fistr='';
		if(io==(el.length-1))
			fistr='last';

		retStr+='<div class="brdffn '+fistr+'"><div class="rhhtl"><span class="vrhtaw"></span></div><div id="pf_chgtxt'+io+'" class="rhhtr bdng13">'+el[io]+'</div><div class="CL"></div></div>';
	}
	return retStr;
}
function makeMiddleRDiv(d)
{
			var accStr= '';
				$.each(d.ac,function(i,v){
					accStr+='<option value='+v.ui+'>'+v.nm+'</option>';
				});
				
				var appndStr='';
				var resStr='';
				var xtrap='';
				if(typparam1==5)
				{
					$.each(d.bdtls,function(i,v){
						xtrap='bid="'+v.id+'"';
					});
				}
				 var chkFlg = new Array();
				$.each(d.data,function(i,v){
				var price = v.cprice;
				var chg=parseFloat(v.chg).toFixed(2);
				var perchg= parseFloat(v.perchg).toFixed(2);
				chkFlg[i]=v.fl;
				var chgclass= '';var perchgclass= '';
				var perchgtxt= '';
				if(chg > 0)
				{
					 chgclass= 'accbd16';
					 perchgclass= 'accbd14';
					 perchgtxt ='+'+perchg;	
				}
				else
				{
					 chgclass= 'accrd16';
					  perchgclass= 'accrd14';
					  perchgtxt =perchg;
				}

				
				 

				var fststr= '';
				if(i==0)
				{
					fststr='first';

				}
				var priceString ='<div class="accbd18 ML30 MT5">'+v.cprice+'<span class="'+chgclass+' ML5">'+chg+'</span> <span class="'+perchgclass+'">('+perchgtxt+'%)</span></div>';
				if(v.cprice == 'NT' || v.cprice <=0)
				{
					priceString ='<div class="accbd18 ML30 MT5">Not Traded</div>';
				}
				resStr+='<h2 class="acc_downTbb '+fststr+'"><div><span class="arwrhgtnm"></span>'+v.sc_comp+'</div>'+priceString+'</h2>';
 					if(secglbVar ==1 || secglbVar == 2)
					{
						var pricestrrr='Shares';
						if(secglbVar==2)
							pricestrrr= 'Units';
						
						$('#calendarDiv').css('z-index','999999');						
						resStr+='<div class="acc_phTDbb" style="display:none"><div class="accact"><p class="gl15a PB10"><strong>Add Transaction details</strong></p><div class="clearfix"><div class="PR10 FL"><p class="gD_14 PB5">Date</p><div class="adInputA clearfix"><div class="FL PT3"><input type="text" name="edit_date1_'+i+'" id="edit_date1_'+i+'" readonly class="brInput dateinp" value="" /></div><div class="FR PT3"><a class="calcb" onclick="displayCalendar(edit_date1_'+i+',\'yyyy-mm-dd\',edit_date1_'+i+');" alt="Click Here to Pick up the date"></a></div></div><p class="gL_10 PT3">Optional</p></div><div class="PR10 FL"><p class="gD_14 PB5">'+pricestrrr+' (Qty)</p><input class="adInputA qtyinp" type="text" /><p class="gL_10 PT3">Optional</p></div><div class="PR10 FL"><p class="gD_14 PB5">Inv. Price</p><input class="adInputA priceinp" type="text" /><p class="gL_10 PT3">Optional</p></div><div class="PR10 FL"><p class="gD_14 PB5">Account</p><select  class="adInputS accinp">'+accStr+'</select></div><div class="FL"><input class="adSaveBtn" type="button" scdispid="'+v.dispid+'" '+xtrap+' value="SAVE TO PORTOLIO" /><div class="loaderImage" style="margin-top:25px;"></div></div></div></div></div>';
					}
					else
					{
						var scname= 'Commodity';
						if(secglbVar ==3)
						{	
						}
						//resStr+='<div class="mcrhspop_added"><span class="vrhtaw MR5"></span><strong>'+scname+' added to your watchlist</strong></div>';
					}
				});
				appndStr+=resStr;
				return Array(appndStr,chkFlg);
}
function makeMiddleRDivNew(d)
{
			var accStr= '';
				$.each(d.ac,function(i,v){
					accStr+='<option value='+v.ui+'>'+v.nm+'</option>';
				});
				
				var appndStr='';
				var resStr='';
				var xtrap='';
				console.log(typparam1);
				if(typparam1==5)
				{
					$.each(d.bdtls,function(i,v){
						xtrap='bid="'+v.id+'"';
					});
				}
				 var chkFlg = new Array();
				$.each(d.data,function(i,v){
				var price = v.cprice;
				var chg=parseFloat(v.chg).toFixed(2);
				var perchg= parseFloat(v.perchg).toFixed(2);
				chkFlg[i]=v.fl;
				var chgclass= '';var perchgclass= '';
				var perchgtxt= '';
				if(chg > 0)
				{
					 chgclass= 'accbd16';
					 perchgclass= 'accbd14';
					 perchgtxt ='+'+perchg;	
				}
				else
				{
					 chgclass= 'accrd16';
					  perchgclass= 'txt16_red';
					  perchgtxt =perchg;
				}

				
				 

				var fststr= '';
				if(i==0)
				{
					fststr='first';

				}
				var priceString ='<p><span class="ops20_bk">'+v.cprice+'</span> <span class="arw_dwn"></span><span class="'+perchgclass+'">'+chg+'('+perchgtxt+'%)</span> </p>';
				if(v.cprice == 'NT' || v.cprice <=0)
				{
					priceString ='<div class="accbd18 ML30 MT5">Not Traded</div>';
				}
				resStr+='<div class="PA25"><p class="txt15_gry M0" id="rhsorgtitlepop">Have you invested in this stock? You can track it better in your Portfolio</p><div class="MT15"><h3 class="head23pp UC">'+v.sc_comp+'</h3>'+priceString+'</div></div>';
 					if(secglbVar ==1 || secglbVar == 2)
					{
						var pricestrrr='Shares';
						if(secglbVar==2)
							pricestrrr= 'Units';
						console.log(pricestrrr);
						$('#calendarDiv').css('z-index','999999');						
						resStr+='<div class="PA25 brdt acc_phTDbb" style="display:none"><div class="clearfix MB20"><ul class="adewatchl"><li><label>Date</label><input type="text" name="edit_date1_'+i+'" id="edit_date1_'+i+'" readonly class="brInput dateinp ic_inputdate" value="" /><a class="calcb" onclick="displayCalendar(edit_date1_'+i+',\'yyyy-mm-dd\',edit_date1_'+i+');" alt="Click Here to Pick up the date"></a></li><li><label>'+pricestrrr+' (Qty)</label><input class="adInputA qtyinp" type="text" /></li><li><label>Investing Price</label><input class="adInputA priceinp ic_inputrs" type="text" /></li><li><label>Account</label><select  class="adInputS accinp">'+accStr+'</select></li></ul></div><p class="PA10 CTR"><a href="javascript:;" scdispid="'+v.dispid+'" '+xtrap+' class="adSaveBtn blue_btn" onclick="savetoport();">SAVE TO PORTOLIO</a></p></div>';

					}
					else
					{
						var scname= 'Commodity';
						if(secglbVar ==3)
						{	
						}
						//resStr+='<div class="mcrhspop_added"><span class="vrhtaw MR5"></span><strong>'+scname+' added to your watchlist</strong></div>';
					}
				});
				appndStr+=resStr;
				return Array(appndStr,chkFlg);
}

function hideRTimer(sel,t)
{
	setTimeout(function(){$(sel).fadeOut('slow');	 
	},t)
}
function mcRegistrationCommon(frm)
{
	 
	var reguname = $.trim($('form[name="'+frm+'"] input[name="reguname"]').val());
	var regpwd = $.trim($('form[name="'+frm+'"] input[name="regPwd"]').val());
	var regconfpwd = $.trim($('form[name="'+frm+'"] input[name="regConfPwd"]').val());
	var regemail = $.trim($('form[name="'+frm+'"] input[name="regemail"]').val());
	
	var chkFlag= 0 ;
	
	if(reguname == "" || reguname == "Username")
	{
		alert("Please enter username");
		chkFlag =1;
		$('form[name="'+frm+'"] input[name="reguname"]').focus();
		return false;
	}
	if(reguname.length<=3)
	{
		alert("Username should be atleast 4 characters");
		chkFlag =1;
		$('form[name="'+frm+'"] input[name="reguname"]').focus();
		return false;
	}
	
	//New password validation Start
	if(regpwd == ""){
		alert("Please enter password");
		chkFlag =1;		 
		$('form[name="'+frm+'"] input[name="regPwd"]').focus();
		return false;
	}	
	
	if(regpwd.length < 8){
		alert("Password should be 8 or more characters");
		chkFlag =1;
		return false;
	}
	
	var patternpw_numeric = new RegExp(/(?=.*\d)/);
	if(!patternpw_numeric.test(regpwd)){
		alert("Password should contain atleast 1 number"); 
		chkFlag =1;
		return false;
	}
	
	var patternpw_caps = new RegExp(/(?=.*[A-Z])/);
	if(!patternpw_caps.test(regpwd)){
		alert("Password should contain atleast 1 upper case letter"); 
		return false;
	}
	var patternpw_symbol = new RegExp(/(?=.*\W)/);
	if(!patternpw_symbol.test(regpwd)){
		alert("Password should contain atleast 1 symbol (except #)"); 
		return false;
	}
	var patternpw = new RegExp(/((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})/);
	if(!patternpw.test(regpwd)){
		alert("Password should be 8 or more characters, atleast 1 number, 1 symbol (except #) and 1 upper case letter"); 
		return false;
	}	
	if(regpwd.match(/#/))
	{
		chkFlag =1; 
		alert("Password should not contain # characters"); 
		return false;
	}
	//New password validation End
	
	if(regconfpwd!=regpwd)
	{
		alert("Password and confirm password values doesnot match");  
		chkFlag =1;
		return false;
	}
	
	if(regemail=="" || regemail=="Email")
	{
		alert("please enter email address");  
		chkFlag =1;$('form[name="'+frm+'"] input[name="regemail"]').focus();
		return false;
	}
	var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(!pattern.test(regemail))
	{
		alert("please enter valid email address");  
		chkFlag =1;
		$('form[name="'+frm+'"] input[name="regemail"]').focus(); 
		return false;
	}
	loadImage(0);
	
	if(chkFlag == 0)
	{
		$.get('/mccode/common/unameAutosuggest.php?q_f=checkuserA&uname='+reguname,function(data) 
		{
			if(data.length > 0)
			{
				if($.trim(data) == 'Yes')
				{
					$.post("/mccode/common/commonRegistration.php?ret=1", $('form[name="'+frm+'"]').serialize(),function(d){
						if(d == 0)
						{
							if(frm!='frmradSign')
							location = 'https://www.moneycontrol.com/registration/commonregthanks.php?log=true';
							else
							{
								$('#regi_pad').html('Registration Successfull,Please Login !!');
								$('form[name=sgradLgfrm] input[name=login_id]').focus();
							}

						}
									
					});
						 
				}
				else
				{
					alert("Username not available");loadImage(1);
				}
			}
		});
		
	}
	else
	{
		loadImage(1);
		
	}
	return false;
}

/* Portfolio Page Register */
function mcRegistrationCommon2(frm) {
    var reguname = $.trim($('form[name="' + frm + '"] input[name="reguname"]').val());
    var regpwd = $.trim($('form[name="' + frm + '"] input[name="regPwd"]').val());
    var regconfpwd = $.trim($('form[name="' + frm + '"] input[name="regConfPwd"]').val());
    var regemail = $.trim($('form[name="' + frm + '"] input[name="regemail"]').val());

    var chkFlag = 0;

    if (reguname == "" || reguname == "Username") {
        alert("Please enter username");
        chkFlag = 1;
        $('form[name="' + frm + '"] input[name="reguname"]').focus();
        return false;
    }
    if (reguname.length <= 3) {
        alert("Username should be atleast 4 characters");
        chkFlag = 1;
        $('form[name="' + frm + '"] input[name="reguname"]').focus();
        return false;
    }
    if (regpwd == "") {
        alert("Please enter password");
        chkFlag = 1;
        $('form[name="' + frm + '"] input[name="regPwd"]').focus();
        return false;
    }
    if (regpwd.match(/#/)) {
        chkFlag = 1;
        alert("Password should not contain # characters");
        return false;
    }
    if (regconfpwd != regpwd) {
        alert("Password and confirm password values doesnot match");
        chkFlag = 1;
        return false;
    }
    if (regpwd.length < 6) {
        alert("Password should be 6-10 characters");
        chkFlag = 1;
        return false;
    }
    if (regemail == "" || regemail == "Email") {
        alert("please enter email address");
        chkFlag = 1;
        $('form[name="' + frm + '"] input[name="regemail"]').focus();
        return false;
    }
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!pattern.test(regemail)) {
        alert("please enter valid email address");
        chkFlag = 1;
        $('form[name="' + frm + '"] input[name="regemail"]').focus();
        return false;
    }
    loadImage(0);

    if (chkFlag == 0) {
        $.get('/mccode/common/unameAutosuggest.php?q_f=checkuserA&uname=' + reguname, function(data) {
            if (data.length > 0) {
                if ($.trim(data) == 'Yes') {
                    $.post("/mccode/common/commonRegistration.php?ret=1", $('form[name="' + frm + '"]').serialize(), function(d) {
                        if (d == 0) {
                            if (frm != 'frmradSign')
                                location = 'https://www.moneycontrol.com/registration/commonregthanks.php?log=true';
                            else {
                                $('#regi_pad').html('Registration Successfull,Please Login !!');
                                $('form[name=sgradLgfrm] input[name=login_id]').focus();
                            }

                        }

                    });

                } else {
                    alert("Username not available");
                    loadImage(1);
                }
            }
        });

    } else {
        loadImage(1);

    }
    return false;
}
function signinMCRHS(frm)
{ 
  
	var f_idval= $('form[name="'+frm+'"] input[name="login_id"]').val();
	var f_fwdval= $('form[name="'+frm+'"] input[name="password"]').val(); 
	var keepmesignedin = 0;
		 
	var proceed= 0;
	if(f_idval =="" || f_idval == "Username")
	{
		alert("Please enter username");$('form[name="'+frm+'"] input[name="login_id"]').focus();
		return false;
		proceed =1;
	}
	if(f_fwdval == "")
	{
		alert("Please enter password");$('form[name="'+frm+'"] input[name="password"]').focus();
		return false;
		proceed =1;
	}
	if(proceed == 0)
	{
		if(jQuery('form[name="'+frm+'"] input[name="keepsignin_social"]').prop('checked')) {
			keepmesignedin =1
		}

		$.post(login_api,{
			sectionid:"MC",
			keep_signed:keepmesignedin,
			username:f_idval,
			password:SHA1(f_fwdval),
			sh:"1"
		}, function(data) 
		{	
			if(data=='alldone')
			{
				 
				if(frm == 'rhsloginfrm')
				{
					closeoverlay(2);
					if(work_div ==1)
					{
						overlayPopup('2'); 
					}
					else if(work_div ==2)
					{
						pcSavePort(2)
					}
					else if(work_div ==3)
					{
						validate_ysu(2)
					}
				}
				else
				{
					location.reload();
				}
			}
			else
			{
				alertErrorMsg(data)
			}
		}); 
	}
	return false;
}

function check_login_pop(work_div,call_pg)
{
	var host ='https://mmb.moneycontrol.com/';
	$.ajax({
            url: 'https://www.moneycontrol.com/mccode/common/m3_common_functions.php?action=update_action',
            type : "POST",
			dataType : "json",
			success : function(json_data) {
				var lgn_status = json_data.lgn_flg;
				console.log('a+'+lgn_status);
				//$.each(jsonp,function(i,v){ 
				
					if(lgn_status == 0 || lgn_status == '0')
					{
						showLoginPop('login');
					}
					else
					{ 
						if(work_div == 1)
						{
							overlayPopup(2,typparam,typparam1,entity_type1);
						}
						else if(work_div == 2)
						{
							if(call_pg != "")
							{
								pcSavePort(2,call_pg,entity_type1);
							}
							else
							{
								pcSavePort(2,'',entity_type1);
							}
						}
                        else if(work_div == 3)
						{
							validate_ysu(2);
						}
					}
				//});
            }
        });
}

var glbbid= 0;
function pcSavePort(param,call_pg,entity_type)
{
	var adtxt='';
	if(param==0)
	{
		work_div=2;
		if(call_pg == "2")
		{
			entity_type1 = entity_type;
			check_login_pop(2,call_pg);	// added by MFG on 10-Nov-14 for add to MF portfolio
		}
		else
		{
			entity_type1 = entity_type;
			check_login_pop(2);
		}
	}
	else
	{
		if(call_pg == "2")
		{
			pass_sec = 2;
		}
		else
		{
			pass_sec = 1;
		}
		var url = '/mccode/common/saveWatchlist.php';
		$.ajax({url:url,
			type:"POST",			
			//data:{q_f:3,wSec:1,dispid:$('input[name=sc_dispid_port]').val()},

			data:{q_f:3,wSec:pass_sec,dispid:$('input[name=sc_dispid_port]').val(),entity_typ:entity_type},
			
			dataType:"json",
			success:function(d)
			{
				if(d['USER_PORT_VIEW']=='4'){
				 	window.location.href = d['REDIRECT_PORT_V4'];
				 }	
				var accStr= '';
				$.each(d.ac,function(i,v)
				{
					accStr+='<option value='+v.ui+'>'+v.nm+'</option>';
				});
				$.each(d.data,function(i,v)
				{
					if(v.flg == '0')
					{
						$('#acc_sel_port').html(accStr);
						$('#mcpcp_addportfolio .form_field, .form_btn').removeClass('disabled');
						$('#mcpcp_addportfolio .form_field input, .form_field select, .form_btn input').attr('disabled', false);
						
						if(call_pg == "2")
						{
							adtxt ='<span class="grn_right_mark"></span> <strong>Scheme added to your portfolio</strong> We recommend you <strong>add transactional details</strong> to evaluate your investment better. <span class="close" onclick="javascript:close_info();">x</span>';
						}
						else
						{
							adtxt ='<span class="grn_right_mark"></span> <strong>Stock added to your portfolio</strong> We recommend you <strong>add transactional details</strong> to evaluate your investment better. <span class="close" onclick="javascript:close_info();">x</span>';
						}
						$('#mcpcp_addprof_info').css('background-color','#eeffc8');	
						$('#mcpcp_addprof_info').html(adtxt);
						$('#mcpcp_addprof_info').show();	
						glbbid=v.id;
					}
				});
			}
		});
	}
}

function updatePortvalues(call_pg)
{
	var dateinput=$('#port_date_val').val();
	var qtyinput=$('#port_shares').val();
	var priceinput=$('#port_price').val();
	var accinput=$('#acc_sel_port').val();
	var dispid=glbbid;
	var proceed=0;

	if(call_pg == "1")
	{
		unit_text = "Shares (Qty)";
		pass_sec = 1;
	}
	else
	{
		unit_text = "Units (Qty)";
		pass_sec = 2;
	}

	if(qtyinput.length>0 && isNaN(qtyinput) && qtyinput != unit_text)
	{
		proceed =1;
		alert('Enter Valid Quantity');
		return false;
	}

	if(priceinput.length>0 && isNaN(priceinput) && priceinput!='Price')
	{
		proceed =1;
		alert('Enter Valid Price');
		return false;
	}
	if(proceed == 0)
	{
		var url = '/mccode/common/saveWatchlist.php';
		$.ajax({url:url,
			type:"POST",			
			//data:{q_f:4,wSec:1,bid:dispid,date:dateinput,qty:qtyinput,price:priceinput,acc:accinput},
			
			data:{q_f:4,wSec:pass_sec,bid:dispid,date:dateinput,qty:qtyinput,price:priceinput,acc:accinput},
			success:function(d)	
			{
				if(d==0)
				{
					$('#mcpcp_addportfolio .form_field, .form_btn').addClass('disabled');
					$('#mcpcp_addportfolio .form_field input, .form_field select, .form_btn input').attr('disabled', true);
					$('#mcpcp_addprof_info').html('<strong class="ML5">Transaction details updated. <a class="bl_12" target="_new" href="https://www.moneycontrol.com/bestportfolio/wealth-management-tool/investments">View Portfolio</a></strong> <span class="close" onclick="javascript:close_info();">x</span>');
					$('#mcpcp_addprof_info').show();
				}
			}
		});
	}	 
}

function cancelRequest()
{
	$('#mcpcp_addportfolio .form_field, .form_btn').addClass('disabled');
	$('#mcpcp_addportfolio .form_field input, .form_field select, .form_btn input').attr('disabled', true);
	$('#mcpcp_addprof_info').hide();
}

function displayRHSSection(el)
{
	var appndStr='';
	var secArray =new Array('','STOCKS','MUTUAL FUNDS','COMMODITIES');
	for(var ii=1;ii<=3;ii++)
	{
		if(ii!=el)
			appndStr+='<li><a value='+ii+'>'+secArray[ii]+'</a></li>';
		
	}
	$('#impact_option').html(secArray[el]);
	$("#filter_category_sector ul").html(appndStr);

	displayRHSSecContent(el);
}

function displayRHSSecContent(sec)
{
	$('#last_visisted_res').html("<div style='text-align:center;'><img src='https://img-d03.moneycontrol.co.in/images/messageboard/mmb_loader.gif' /></div>");
	var url = '/mccode/common/saveWatchlist.php?q_f=gt_r&wSec='+sec;
	$.ajax({
		url:url,
		type:"GET",		
		dataType:"json",
		success:function(d)
			{
				var disNam ='';
				var entity_type = '';
				if(sec==1){
					entity_type = 'stk';
					disNam ='stock';
				}if(sec==2){
					entity_type = 'mf';
					disNam ='mutual fund';
				}if(sec==3){
					entity_type = 'comm';
					disNam ='commodity';	
				}
				var strAppnd='';
				if(d.length > 0)
				{
				$.each(d,function(i,v){
				var price_str=''; var chg_class=''; var perchg_class=''; var chg_img=''
				if(v.chg > 0)
				{
					chg_class = "gr_12";
					perchg_class = "gr_10";
					chg_img = '<span class="arw_grn_rh"></span>';
				}
				else if(v.chg < 0)
				{
					chg_class = "r_12";
					perchg_class = "r_10";
					chg_img = '<span class="arw_rd_rh"></span>';
				}
				else
				{
					chg_class = "b_12";
					perchg_class = "b_10";
					chg_img = '<span class="arw_rd_rh"></span>';
				}
				if(v.cp=='NT')
					price_str=' <p class="gD_13">Not Traded</p>';
				else
				price_str = '<p class="gD_13"><strong>'+v.cp+'</strong> '+chg_img+' <span class="'+chg_class+'"><strong>'+v.chg+'</strong></span> <span class="'+perchg_class+'">('+v.cper+'%)</span></p>';

				 strAppnd+='<div class="PAr stk"><div class="chkbox"><input name="chk_lst_stks" class="chk_lst_stks" value="'+v.sc_dispid+'" section="'+sec+'" name="" type="checkbox" /></div><div class="chkrht"><p><a class="bl_13" href="'+v.url+'">'+v.nm+'</a></p>'+price_str+'</div><div class="CL"></div></div>';			
				});	
				secglbVar=sec;
				$('.btnwatch').show();
				}
				else
				{
					strAppnd='<div class="PAr">No last visited '+disNam+'</div>';
					$('.btnwatch').hide();
				}
				$('#last_visisted_res').html(strAppnd); 
				$("#save_tw").attr("href","javascript:overlayPopup(0,1,1,'"+entity_type+"');");
			}
	
	});
}
$(document).ready(function() {

	$('#backInner1_rhsLogin input[type="text"],#backInner1_rhsLogin input[type="password"]').addClass("idleField");
       		$('#backInner1_rhsLogin input[type="text"]').focus(function() {
       			$(this).removeClass("idleField").addClass("focusField");
    		    if (this.value == this.defaultValue){ 
    		    	this.value = '';
				}
				if(this.value != this.defaultValue){
	    			this.select();
	    		}
    		});
			$('#port_price,#port_shares').focus(function() {
       			$(this).removeClass("idleField").addClass("focusField");
    		    if (this.value == this.defaultValue){ 
    		    	this.value = '';
				}
				if(this.value != this.defaultValue){
	    			this.select();
	    		}
    		});
    		$('#backInner1_rhsLogin input[type="text"]').blur(function() {
    			$(this).removeClass("focusField").addClass("idleField");
    		    if ($.trim(this.value) == ''){
			    	this.value = (this.defaultValue ? this.defaultValue : '');
				}
    		});
			$('.txtbox_lableNXT').on('blur',function(){
				if($(this).val()=='')$(this).next('label').show();
			});
			
			$('.txtbox_lableNXT').on('focus',function(){
			$(this).next('label').hide()
			});
				
			 
	$(".acc_downTbb").on('click',function(){
		$(this).next(".acc_phTDbb").slideDown("slow")
		.siblings(".acc_phTDbb").slideUp("slow");
		$(this).addClass("acc_downTbb_A");
		$(this).siblings("h2").removeClass("acc_downTbb_A");
	});
	 
	$("#impact_option").on('click',function(){ 
		$(this).next().slideDown("fast");
	});
	$('input[name=chk_lst_stks]').on('click',function(){
	secglbVar=$(this).attr('section');
	});
	$("#filter_category_sector ul").on('mouseenter',function(){
		$(this).show();
	});
	$("#filter_category_sector ul").on('mouseleave',function(){
		$(this).slideUp("fast");
	});
	$("#filter_category_sector ul li a").on('click',function(){
		displayRHSSection($(this).attr('value'));
		secglbVar=$(this).attr('value');
		$('input[name=chk_lst_stks]').attr('checked',false);
		$('#sector_im_ul').hide();	
	});

	$("#impact_option").on('mouseout',function(){
	$("#filter_category_sector ul").hide();
	});
	
	
	/*$('.adSaveBtn').on('click',function(){
		alert("wdqwd");
		var ell = $(this);
		var dateinput=$(this).parents('.clearfix').find('input.dateinp').val();
		var qtyinput=$(this).parents('.clearfix').find('input.qtyinp').val();
		var priceinput=$(this).parents('.clearfix').find('input.priceinp').val();
		var accinput=$(this).parents('.clearfix').find('select.accinp').val();
		var dispid=$(this).attr('scdispid');
		var bbiid= $(ell).attr('bid');
		var sendVar =2;
		
		var proceed=0;
		if(qtyinput.length>0 && isNaN(qtyinput))
		{
			proceed =1;
			alert('Enter Valid Quantity');
			return false;
		}

		if(priceinput.length>0 && isNaN(priceinput))
		{
			proceed =1;
			alert('Enter Valid Price');
			return false;
		}

		if(proceed == 0)
		{
			var varData = {q_f:sendVar,wSec:secglbVar,dispid:dispid,date:dateinput,qty:qtyinput,price:priceinput,acc:accinput};

			if($(ell).attr('bid'))
			{
				sendVar=4;
				varData = {q_f:sendVar,wSec:secglbVar,dispid:dispid,format:'json',bid:bbiid,date:dateinput,qty:qtyinput,price:priceinput,acc:accinput};

			}

			
			$(ell).next('.loaderImage').html("<div style='text-align:center;'><img src='https://img-d03.moneycontrol.co.in/images/messageboard/mmb_loader.gif' /></div>");$(ell).hide();
			var url = '/mccode/common/saveWatchlist.php';
			$.ajax({url:url,
				type:"POST",
				dataType:"json",
				data:varData,
				success:function(d)	
				{
					$.each(d,function(i,v)
						{
							if(i=='flg')
							{
								if(v == '0')
								{
								var stkstr ='Stock';
								if(secglbVar ==2)
									 stkstr ='Scheme';
								// Success
									$(ell).parents('.acc_phTDbb .accact').html('<div class="mcrhspop_added"><span class="vrhtaw MR5"></span><strong>'+stkstr+' added to your portfolio</strong></div>');
								}
							}
							if(i=='rs')
							{
								if(v == '0')
								{
									$(ell).parents('.acc_phTDbb .accact').html('<div class="mcrhspop_added"><span class="vrhtaw MR5"></span><strong> Transaction details updated </strong></div>');
									 
								}
							}
						});
				}
			});
		}	 
	}); */
});
function savetoport(){
		var ell = $(this);
		var dateinput= $('input.dateinp').val();
		var qtyinput= $('input.qtyinp').val();
		var priceinput= $('input.priceinp').val();
		var accinput= $('select.accinp').val();
		var dispid= $('.adSaveBtn').attr('scdispid');
		var bbiid= $('.adSaveBtn').attr('bid');
		var sendVar =2;
		
		var proceed=0;
		if(qtyinput.length>0 && isNaN(qtyinput))
		{
			proceed =1;
			alert('Enter Valid Quantity');
			return false;
		}

		if(priceinput.length>0 && isNaN(priceinput))
		{
			proceed =1;
			alert('Enter Valid Price');
			return false;
		}

		if(proceed == 0)
		{
			var varData = {q_f:sendVar,wSec:secglbVar,dispid:dispid,date:dateinput,qty:qtyinput,price:priceinput,acc:accinput};

			if($('.adSaveBtn').attr('bid'))
			{
				sendVar=4;
				varData = {q_f:sendVar,wSec:secglbVar,dispid:dispid,format:'json',bid:bbiid,date:dateinput,qty:qtyinput,price:priceinput,acc:accinput};

			}

			
			$('.adSaveBtn').next('.loaderImage').html("<div style='text-align:center;'><img src='https://img-d03.moneycontrol.co.in/images/messageboard/mmb_loader.gif' /></div>");$('.adSaveBtn').hide();
			var url = '/mccode/common/saveWatchlist.php';
			$.ajax({url:url,
				type:"POST",
				dataType:"json",
				data:varData,
				success:function(d)	
				{
					$.each(d,function(i,v)
						{
							if(i=='flg')
							{
								if(v == '0')
								{
								var stkstr ='Stock';
								if(secglbVar ==2)
									 stkstr ='Scheme';
								// Success
									$('.acc_phTDbb').html('<div class="mcrhspop_added"><span class="vrhtaw MR5"></span><strong>'+stkstr+' added to your portfolio</strong></div>');
								}
							}
							if(i=='rs')
							{
								if(v == '0')
								{
									$('.acc_phTDbb').html('<div class="mcrhspop_added"><span class="vrhtaw MR5"></span><strong> Transaction details updated </strong></div>');
									 
								}
							}
						});
				}
			});
		}
}
/*Add Stock to Watchlist and Portfolio.*/
$(document).ready(function(){ 				
	$('.tbldata14 tr').hover(function(){
		$(this).css('background-color','#e0eef5');
		$(this).find('.addPrWhs').show();
	}, function(){
		$(this).css('background-color','');
		$(this).find('.addPrWhs').hide();
		$('.ddlist').hide();
	});
	$('.addPrWhs').click(function(){
		$(this).find('.ddlist').show();
	});	
		
});
 
function chkbx_val(disp_id,port_watch){
	
	//https://www.moneycontrol.com/portfolio_new/add_stockswl_quick.php
	//https://www.moneycontrol.com/portfolio_new/add_stocks_multi.php

	var lp_watchlist_portfolio;
	if(port_watch=='1'){
		lp_watchlist_portfolio = 'https://www.moneycontrol.com/portfolio_new/add_stockswl_quick.php';
	}else if(port_watch=='5'){
		lp_watchlist_portfolio='https://www.moneycontrol.com/portfolio_new/add_stocks_multi.php';
	}
	
	//$(location).attr('href',lp_watchlist_portfolio);
	//$(location).attr('href',lp_watchlist_portfolio).attr('target','_blank');
	//$(location).attr({"href":lp_watchlist_portfolio,"target" : "_blank"});
	window.open(lp_watchlist_portfolio, "_blank");
	

	/*$("#chk_lst_stks").val('');
	$("#chk_lst_stks").attr("checked", "true");
	$("#chk_lst_stks").attr("section", 1);
	$("#chk_lst_stks").val(disp_id);
	 
	secglbVar=1;
	overlayPopup(0,1,port_watch);*/
}

function get_rhs_login_html(){
	//var logg_html='<h2>India\'s Best Portfolio manager</h2><form onsubmit="return validate_mc_rhslogin();" method="post" name="login"><div class="login_form MT10"><input type="text" onfocus="if($(this).val()==\'username\')$(this).val(\'\');" value="username" id="login_id" name="login_id" /><input type="password" class="MT7" onfocus="if($(this).val()==\'password\')$(this).val(\'\');" value="password" id="password" name="password" /><input type="hidden" style="width:5px;" value="1" id="sh" name="sh" readonly="readonly" /></div><div class="PT3 gL_10"><input type="checkbox" title="Keeps you signed in for a month unless you Sign out" value="1" id="keep_signed" name="keep_signed"> Keep me signed in</div><div><div class="FR"><input type="submit" border="0" class="log_btn_rh" ></div><div class="FL PT3"><a class="bl_11" title="Forgot password" href="https://www.moneycontrol.com/india/bestportfoliomanager/login/forgotpasswd">Forgot password?</a></div><div class="CL"></div></div></form><div class="login_connect MT10 MB10"><p class="connct_txt MB5"><strong>or</strong> Connect With</p><a class="ic_twitter" title="twitter" href="javascript:;" onclick="twitterLoginPopupMC(\'\');"></a><a class="ic_facebook" title="facebook" href="javascript:;" onclick="openFacebookPopupMC(\'\');"></a><a class="ic_google" title="google" href="javascript:;" onclick="googleLoginPopupMC(\'\');"></a><a class="ic_yahoo" title="yahoo" href="javascript:;" onclick="yahooLoginPopupMC(\'\');"></a></div><div class="new_user"><p>Don\'t have an account?</p><a href="javascript:;" onClick="create_one();" title="Create One">Create One</a></div>';
	
	var logg_html = '<div class="log_commonbx log_myspacebx">'+
				'<p class="log_weltxt"><em>Welcome</em>,<br />'+
				'Login for a <strong>better experience</strong></p>'+
				'<p class="MT10"><a href="javascript:;" title="Sign in" class="linkSignIn login_btnacom" data-toggle="modal" data-target="#LoginModal"><strong>Login</strong></a></p>'+
				'<p class="newto MT20">New to Moneycontrol? <a href="javascript:;" class="signup_linkop linkSignUp" data-toggle="modal" data-target="#LoginModal">Sign Up</a></p>'+
			 '</div>';

	
	return logg_html;
}
function setsensex(){
	var change_bse_final=$("#sensex_change").html();
	if(change_bse_final>0)
		$("#sensexval_final").html("<b>Sensex</b> up <font class='gr_12'><b>"+change_bse_final+"</b></font> points");
	else if(change_bse_final<0)$("#sensexval_final").html("<b>Sensex</b> down <font class='r_12'><b>"+change_bse_final+"</b></font> points");
	else{$("#sensexval_final").hide();$("#sensexstatusDiv").hide()}
}
function create_one(){var prop="blogin";$("html,body").animate({scrollTop:$("#"+prop).offset().top+parseInt($("#"+prop).css("padding-top"),10)},"slow");clkreg();$("#registerName").focus()}

function validate_mc_rhslogin() {
	if(document.login.login_id.value == "" || document.login.login_id.value == "username") {
		alert("Please enter your username");
		document.login.login_id.focus();
		return false
	}
	if(document.login.password.value == "") {
		alert("Please enter your password");
		document.login.password.focus();
		return false
	}

	var user_password = document.login.password.value;
	user_password = $.trim(user_password);
	document.login.password.value = SHA1(user_password);

	document.login.action = "https://www.moneycontrol.com/portfolio_plus/sso/login_verify_mc_new1.php";
	document.login.submit();
}

function generate_myspace_html(op){
var str_nick_name = $.trim(readCookie("nnmc"));	//$.trim(json_data.nick_name);
str_nick_name = str_nick_name.replace("%40","@");
str_nick_name = str_nick_name.replace(/\+/g, " ");
str_nick_name = str_nick_name.substring(0, 11);
str_nick_name = str_nick_name+'..'; 

var iwcTxt="";var htmlTx='<div style="border:1px solid #cad0d5" class="brdr_gry MT20 MB20" id="my_space"><h2 class="title">MY SPACE</h2><div class="login_box" style="padding:5px;">';if($.trim(op.first)!=""){htmlTx+='<div class="PA5 brdb"><div class="FL">'+op.first.img+'</div><div class="FL ML5"><p><a href="https://mmb.moneycontrol.com/india/messageboardblog/boarders/'+op.first.uhx+'" class="gD_14" target="_blank"><strong>'+str_nick_name+'</strong></a></p><p class="gL_11">'+
op.first.lvl+' Member</p></div><div class="CL"></div></div>';var priceclass="r_12";var pricedir="down";if(parseFloat(op.first.snx)>0){priceclass="gr_12";pricedir="up"} if(op.first.pdys>3)htmlTx+='<div class="PA5"><p class="gD_12" style="font-weight:bold"><span style="color:red;font-weight:normal">You last checked your Portfolio '+op.first.pdys+' days ago.</span>Regular monitoring of your investments is important.</p></div>';
htmlTx+='<div class="PA5" id="sensexstatusDiv"><p class="gD_12 MB5" id="sensexval_final"><b>Sensex</b> '+
pricedir+' <span class="'+priceclass+'">'+op.first.snx+'</span> points</p><p class="gD_12"><a class="bl_12" href="https://www.moneycontrol.com/india/bestportfoliomanager/investment-tool?utm_source=MYSPACE_RHS"><strong>Check your Portfolio now</strong></a></p></div>';if(op.first.iwc==1)iwcTxt='<div class="MB10 MT10" id="watch_cong"><div class="invst_watch_rhs"><div class="freegift"></div><div class="congrt bdita13"><strong>Congsaveratulations</strong><br />'+
op.first.nc+',</div><div class="MT15 CTR bd12ns"><a href="https://investmentwatch.moneycontrol.com/offers.php" target="_blank" class="bd12ns"><strong>Get</strong> <span><strong>FREE</strong></span> <strong>SMS & Mail alerts</strong> on your <strong>top portfolio stock 24/7</strong> with <strong>Investment Watch</strong></div><div class="MT5 MB5 CTR"><span class="ctrplus"></span></div><div class="bndylw CTR"><span>FREE</span> Trading Account with Sharekhan</div></a><div class="CTR"><a href="https://investmentwatch.moneycontrol.com/offers.php" class="btn_claim" target="_blank"></a></div><div class="MT12 CTR"><p class="vbd11">Compliments from:</p></div><div><div class="FL"><a href="http://www.sharekhan.com/" class="sharekhan"></a></div><div class="FL MT10 ML3"><a href="http://www.moneycontrol.com/stocksmarketsindia/" class="moneycont"></a></div><div class="CL"></div></div></div></div>'}else htmlTx+=
get_rhs_login_html();var lstv="";$(op.second.data).each(function(i,v){var my_currentclose=v.pr;var my_chg=v.chg;var my_perchg=v.pchg;var my_price_str="";if(my_currentclose=="NT")my_price_str="<p class='gD_13'>Not Traded</p>";else{if(my_chg>0){my_chg_class="gr_12";my_perchg_class="gr_10";my_chg_img='<span class="arw_grn_rh"></span>'}else if(my_chg<0){my_chg_class="r_12";my_perchg_class="r_10";my_chg_img='<span class="arw_rd_rh"></span>'}else{my_chg_class="b_12";my_perchg_class="b_10";my_chg_img='<span class="arw_rd_rh"></span>'}my_price_str=
'<p class="gD_13"><strong>'+my_currentclose+"</strong> "+my_chg_img+' <span class="'+my_chg_class+'"><strong>'+my_chg+'</strong></span> <span class="'+my_perchg_class+'">('+my_perchg+"%)</span></p>"}lstv+='<div class="PAr stk"><div class="chkbox"><input name="chk_lst_stks" section="'+op.second.sec+'" class="chk_lst_stks" value="'+v.disid+'" name="" type="checkbox" /></div>\t\t\t\t<div class="chkrht"><p><a class="bl_13" target="_blank" href="'+v.link+'">'+v.nm+"</a></p>"+my_price_str+'</div><div class="CL"></div></div>'});
var sec_dis_txt='STOCKS';
var sec_dis_arr = new Array();
sec_dis_arr[1] ='STOCKS';
sec_dis_arr[2] ='MUTUAL FUNDS';
sec_dis_arr[3] ='COMMODITIES';var sec_dis_t='';
$.each(sec_dis_arr,function(i,vv){
	if(m_selected!=i && i>0)
	sec_dis_t+='<li><a href="javascript:;" value="'+i+'">'+vv+'</a></li>';
});
 var save_watchlst_type = 1;
 var entity_type = 'stk';
if(m_selected==11) {
	sec_dis_txt='COMMODITIES';
	save_watchlst_type = 3;	
	var entity_type = 'comm';
}
else if(m_selected==2){
	sec_dis_txt='MUTUAL FUNDS';
	save_watchlst_type = 2;	
	var entity_type = 'mf';
}

var yml="";if(op.third!==null){yml='<h2  class="MT3"><span class="mc_rhs_plus1_c"></span>You may also like</h2>\t<div class="accord_content MT7" style="display:none"><div class="ymal_video"><div class="accord_title">News</div><ul class="vdo_list">';$(op.third).each(function(i,v){yml+='<li id="My_Space_News_'+i+'"><a class="bl_12" href="'+v.url+'" target="_blank" title="'+v.title+'" alt="'+v.title+'">'+v.title+"</a></li>"});yml+="</ul>\t</div></div>"}htmlTx+=
"</div>"+iwcTxt+'<div class="visited_like"><h2><span class="mc_rhs_minus1_c"></span>Last Visited</h2><div class="accord_content MB15" style="display: block;"><div class="sector_category" id="filter_category_sector"><div class="search_cat" id="impact_option">'+sec_dis_txt+'</div><ul id="sector_im_ul" style="display: none;">'+sec_dis_t+'</ul></div><div id="last_visisted_res">'+lstv+'</div><div id="mcpcp_addprof_info1"></div><div><a href="javascript:overlayPopup(0,'+save_watchlst_type+',1,\''+entity_type+'\');" class="btnwatch" id="save_tw" ></a></div></div>'+
yml+"</div>";

	// htmlTx += '<div><a target="_blank" href="http://terminal.moneycontrol.com/?utm_source=RHS&amp;utm_medium=Link&amp;utm_campaign=MC_RHS_Launch&referral_source=MCRHS_BANNER"><img border="0" alt="" src="https://img-d03.moneycontrol.co.in/images/promo/2014/banner_RHS_180x310.jpg"></a></div>';

return htmlTx
}
function showLoginPop(){
	 $("#myframe").attr('src','https://accounts.moneycontrol.com/mclogin/?d=2&redirect=afterlogin');
	   $("#LoginModal").modal();
}
$(document).ready(function(){if(m_selected=="")m_selected=1;var urltocall="https://appfeeds.moneycontrol.com/mcradar/generic/get_space_info.php?jx_cid="+m_selected;


if($("#STKMF_LV").length){
	$.ajax({url:urltocall,type:"GET",dataType:"jsonp",jsonpCallback:"myspacefunc",cache:true,success:function(jsonp){
		$("#STKMF_LV").html(generate_myspace_html(jsonp));
		$(".linkSignUp").click(function(){
			$("#ifval").val("285px");
			$("#myframe").attr('src',iframe_domain+'mclogin/?formname=register'+redirecturlval);
		});
		$(".linkSignIn").click(function(){
			$("#ifval").val("495px");
			$("#myframe").attr('src',iframe_domain+'mclogin/?d=2'+redirecturlval);
		});
		setInterval("setsensex()",1E4);
	}});

	$(".visited_like h2").on("click",function(d){if($(this).next(".accord_content").is(":visible")){$(this).next(".accord_content").slideUp();$(this).find("span").removeClass("mc_rhs_minus1_c").addClass("mc_rhs_plus1_c")}else{$(".visited_like .accord_content").hide();
	$(".visited_like h2").find("span").removeClass("mc_rhs_minus1_c").addClass("mc_rhs_plus1_c");$(this).next(".accord_content").slideDown();$(this).find("span").removeClass("mc_rhs_plus1_c").addClass("mc_rhs_minus1_c")}})
	}
});


function redirectPortfolio(entity_typ, asset_name) {
	if(USERNMMC != false && USERNMMC != 'false' && USERNMMC != ''){
		var t = "";
		if (USERNMMC) {
			var n = "/mccode/common/saveWatchlist.php";
			$.ajax({
				url: n,
				type: "POST",
				data: {
					q_f: 3,
					asset_name: asset_name,
					entity_typ: entity_typ,
					dispid: $("input[name=sc_dispid_port]").val()
				},
				dataType: "json",
				success: function (d) {
					if(d['REDIRECT_URL'] != "") {
						window.location.href = d['REDIRECT_URL'];						
					}
				}
			})
		}
	}else{
		AFTERLOGINCALLBACK = 'redirectPortfolio()';
		commonPopRHS();
	}
}

var work_div ='';
var typparam='';
var typparam1='';
var entity_type1='';
function assetAddWatchlist(e, t, n,entity_type) {
	typparam = t;
	secglbVar = t;
	typparam1 = n;
    if(e==0)
    {
        work_div=1;
        typparam=t;
        typparam1=n;
        entity_type1 = entity_type;
        check_login_pop(1);
    }
	
	if(USERNMMC != false && USERNMMC != 'false' && USERNMMC != ''){
		$(".srch_bx").css("z-index", "999");
		if (readCookie("nnmc")) {
			if (USERNMMC) {
				var r = new Array;
				$("input[name=chk_lst_stks]:checked").each(function (e, t) {
					r[e] = $(this).val()
				});
				if (r.length > 0) {
					var i = "";
					var s = "/mccode/common/saveWatchlist.php";
					$.get("/mccode/common/rhsdata.html", function (e) {
						$("#backInner1_rhsPop").html(e);
						$.ajax({
							url: s,
							type: "POST",
							dataType: "json",
							data: {
								q_f: typparam1,
								wSec: secglbVar,
                                entity_typ:entity_type,
								wArray: r
							},
							success: function (e) {
								var alert_msg_str = '';
								var alert_msg = '';
                                if(r.length > 1){
                                    if(entity_type=='stk'){
                                        alert_msg = "Stocks";
                                    }else if(entity_type=='mf'){
                                        alert_msg = "Mutual funds";
                                    }else if(entity_type=='comm'){
                                        alert_msg = "Commodities";
                                    }else if(entity_type=='fut'){
                                        alert_msg = "Future";
                                    }
                                }else{
                                    if(entity_type=='stk'){
                                        alert_msg = "Stock";
                                    }else if(entity_type=='mf'){
                                        alert_msg = "Mutual fund";
                                    }else if(entity_type=='comm'){
                                        alert_msg = "Commodity";
                                    }else if(entity_type=='fut'){
                                        alert_msg = "Future";
                                    }
                                }
                                var stat = '';
                                $.each(e, function(key, val) {
                                    if(val=='success'){
                                        alert_msg_str = alert_msg+" Successfully added to watchlist."; 
                                        stat = 'success';
                                    }                  
                                });
                                if(stat =='success'){
                                    // alert(alert_msg_str);
                                }else{
                                    alert_msg_str = alert_msg+' already present in watchlist.';
                                    // alert(alert_msg_str);    
                                }
                                if ($('#mcpcp_addprof_info').length > 0) {
                                    $('#mcpcp_addprof_info').html(alert_msg_str);
                                    $('#mcpcp_addprof_info').show();
                                    }else{
                                    alert(alert_msg_str);   
                                }
							},
							complete: function (e) {
								if (typparam == 1) {
									$(".scroll-pane_rhs").jScrollPane({
										verticalDragMinHeight: 33,
										verticalDragMaxHeight: 33
									})
								}
							}
						})
					})
				} else {
					var o = "stock";
					if ($("#impact_option").html() == "STOCKS") o = "stock";
					if ($("#impact_option").html() == "MUTUAL FUNDS") o = "mutual fund";
					if ($("#impact_option").html() == "COMMODITIES") o = "commodity";
					alert("Please select at least one " + o)
				}
			}
		} else {
			work_div = 1;
			typparam = t;
			typparam1 = n;
			check_login_pop(1)
		}
	}else{
		AFTERLOGINCALLBACK = 'assetAddWatchlist('+e+', '+t+', '+n+', '+entity_type+')';
		commonPopRHS();
	}
}