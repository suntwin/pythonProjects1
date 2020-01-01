
//$(document).load(function() {
	//console.log('window is loaded');
	var m_pg=2;
	
var tabsn = new Array();
var ind = 0;
var win_focblur_flg_new = 1;
var selectionArray = new Array(); 
var portvar ='';
var watchvar = '';
var selS=0;
var cbr_loaded = false;
var stackE=1;var pg=0;var addedfl =0;
var stopFlag =true;
var time_out='';
var Stkarray = new Object();
var errorCntr=0;
var errFlg=true;
var s1cntr=0; var adglb=0;
var turl='//appfeeds.moneycontrol.com/mcradar/';
var iurl='//www.moneycontrol.com/mccode/stock_radar';
var akurl ='https://indices.moneycontrol.com/';
// var login_api = '/watchlist1/login_check.php';
var login_api = 'https://www.moneycontrol.com/portfolio_new/mc_login_check.php';

var f_out=0;
//var callTimeout=15000;  Comment on 1Jul2015
var callTimeout=20000;
var timerc =0;
var bool_complete_flag = 0;
var focusinval = 0;

/*Get current date (Start)*/
var obj_dt = new Date();
var curr_day = obj_dt.getDate();
var curr_month = obj_dt.getMonth()+1;
var curr_year = obj_dt.getFullYear();

var CURR_STR_DATE = curr_day+''+curr_month+''+curr_year;
/*Get current date (End)*/

var window_focus = 0;
var chkpriceval = 1;
var chkpricevalcntr = 0;

window.onblur = function() { window_focus = 1; }
window.onfocus = function() { window_focus = 0; }

function callbackfnct(data){

	
	alert(data);
}
function rotateStacks(){
	
		$('.stockDsl .mrdBox').each(function(e){
			$(this).find('.moveBx').eq(0).addClass('current');
			var nextclassid = $(this).children().next().attr("id");
			var priceval = $("#pricevalcntr").val();
			
			var apiurl_aws = '';;
			var pgurl_aws = '';
			var dtsym_aws = '';
			//var type_aws = $(this).children().next().attr("data-ty");
			var grp = '';
			var symb = '';
			var stkname='';
			var grphtml = '';
			var priceapi = '';
			var appendid = '';
			if( typeof nextclassid!="undefined" && nextclassid!="undefined" && nextclassid!= undefined ){
				appendid = nextclassid;
				apiurl_aws = $(this).children().next().attr("data-apiurl");
				pgurl_aws = $(this).children().next().attr("data-pgurl");
				dtsym_aws = $(this).children().next().attr("data-symbol");
				grp = $(this).children().next().attr("data-grp");
			}else{
				appendid =  $(this).children().attr("id");
				apiurl_aws = $(this).children().attr("data-apiurl");
				pgurl_aws = $(this).children().attr("data-pgurl");
				dtsym_aws = $(this).children().attr("data-symbol");
				grp = $(this).children().attr("data-grp");
			}
			
			if(typeof dtsym_aws!="undefined" && dtsym_aws!="undefined" && dtsym_aws!='' && dtsym_aws!=undefined){
				if(apiurl_aws!=''){
					if(chkpricevalcntr < priceval || (focusinval == 0 && $("#pricevalcntr").val() == 0)){
						
					$.ajax({
						url:apiurl_aws,
						type:"GET",
						dataType: 'json',
						cache:true,
						success:function(result)
						{ 	
							
							if(result.code == 200){
								chkpricevalcntr++;

								if(chkpricevalcntr == priceval){
									$("#pricevalcntr").val(0);
								}
								var arr='grArrow';var arr1='gr_13';
								var chgchk = parseFloat(result.data.pricechange);
								
								if(result.data.ty==4){
									var exdt = result.data.expirydate;
									var date = new Date(exdt);
									var daynm = date.toDateString();
									var parts = daynm.split(" ");
									var dt =parts[2]+parts[1]+parts[3];
									symb = result.data.symbol;
									stkname=result.data.company+' '+ dt;
								}else{
									symb = result.data.symbol;
									stkname=result.data.company;
								}
								
								
								if(chgchk <0)
								{
									arr='rdArrow';
									arr1='r_13';
								}
								var link =pgurl_aws;
								
								var perchg= parseFloat(result.data.pricepercentchange);
								 perchg= perchg.toFixed(2);
								if(perchg >0)
									perchg='+'+perchg;

								if(grp==1){
									grphtml = '<p align="center" class="gl_16 PT5"><strong class="hdgrp">'+getTopText(grp)+'</strong><span class="btArrow ML5"></span></p>';
								}
								
								var stackhtml = grphtml+'<p><a target="_new" href="'+link+'" rid="'+symb+'" class="bl_12 nm_a">'+stkname+'</a></p><p class="MT2mns"><span class="gd_15"><strong class="prc">'+result.data.pricecurrent+'</strong></span> <span class="'+arr+' ML2 MR2"></span> <span class="'+arr1+'"><strong class="chg">'+chgchk+'</strong></span> <span class="prchg '+arr1+'">('+perchg+'%)</span></p>';
								$("#"+appendid).html(stackhtml);
							}

						}
					});
					}
				}
			}

			if($(this).children().length > 1)
			{
					
					$(this).find('.moveBx.current').animate({'top':'-46px'},1000,function(){
						var t = $(this).clone();
						$(this).removeClass('current').attr('style','');
						var t = $(this).clone();
						$(this).parent('.mrdBox').append(t);
						$(this).remove();
					}).next('.moveBx').animate({'top':'0px'},1000);
			}
			
		});
	
}
function mrfl_close()
{ 	
	$('#ld_add').html($('#img_ad_rad_d').html());	
	startTicker();
}
/* Ads Expand */
function adsExpnd(){	
	 $('#ld_add').html($('#flash_ad_rad_d').html());
}
var flpcntr=1;

function disp_edtstckTip(elem){
	//$('.cstck_ttip').hide();
	$('#cstck_ttip'+elem).show();	
}
function hide_edtstckTip(elem)
{
	$('#cstck_ttip'+elem).hide();
}
function stopFliper()
{
	stopFlag =false;
	 
}
function startFliper(elchk)
{
	stopFlag =true;
	if(elchk == 1)
	{
		//####loadStacks('LTD',1);
	}
	else
	{
		//####loadStacks('cbr',1);
	}
}
/*var inter;*/
function change(stringref){
	$('.tabn:not(#' + stringref + ')').hide();
	if ($.browser.msie && $.browser.version.substr(0,3) == "6.0")
		$('.tabn#' + stringref).show();
	else 
		$('.tabn#' + stringref).fadeIn();
	$('.tab1s a:not(#' + stringref + 't)').removeClass('act');
	$('.tab1s a[href=#' + stringref + ']').addClass('act');
}
function next(){
	change(tabsn[ind++]);
	if(ind >= tabsn.length)
		ind = 0;
}

function loadStacks(callback,el)
{  
	
	/*if(f_out == 0)
	{*/
		var useridval = '';
		if(readCookie("nnmc")){
			useridval = readCookie("nnmc");
		}

		//var hours = 24; // Reset when storage is more than 24hours
		var hours = 1; // Reset when storage is more than 1 hours
		var now = new Date().getTime();
		var setupTime = localStorage.getItem('setupTime');
		if (setupTime == null) {
		    if(useridval!='' && localStorage.getItem('radstk_'+useridval)!=null){ 
	       		localStorage.removeItem('radstk_'+useridval);
	       	}
	       	if(localStorage.getItem('radstk')!=null && useridval==''){
	        	localStorage.removeItem('radstk');
	    	}
		} else {
		    if(now-setupTime > hours*60*60*1000) {
		        if(useridval!='' && localStorage.getItem('radstk_'+useridval)!=null){ 
		       		localStorage.removeItem('radstk_'+useridval);
		       	}
		       	if(localStorage.getItem('radstk')!=null && useridval==''){
		        	localStorage.removeItem('radstk');
		    	}

		        
		    }
		}
		//if(readCookie("nnmc") && localStorage.getItem('radstk')!=null){
		if(useridval!='' && localStorage.getItem('radstk_'+useridval)!=null){ // if user is loggin
			cbr_loaded = false;
			
			var  stackLocalVal = localStorage.getItem('radstk_'+useridval);
			var  stackJsonVal = JSON.parse(stackLocalVal);
			Stkarray =stackJsonVal;
			if(cbr_loaded == false){
				
				cbr_localstorage(Stkarray);
				
			}
					
		

		}else if(localStorage.getItem('radstk')!=null && useridval==''){ // if user is not login
			cbr_loaded = false;
			
			var  stackLocalVal = localStorage.getItem('radstk');
			var  stackJsonVal = JSON.parse(stackLocalVal);
			Stkarray =stackJsonVal;

			if(cbr_loaded == false){
				
				cbr_localstorage(Stkarray);
			
			}
					
		
		}else{
			
			var url= turl+'processing_aws.php?q_a=d&ep'+ct_v;
			$.ajax({
				url:url,
				type:"GET",
				dataType:"jsonp",
				cache:true,		
				timeout:10000,
				error:function(error){
					errorCntr++;
					errFlg = false;
					bool_complete_flag = 0;

					if(errorCntr <=1)
					{
						if(cbr_loaded == false)
							
							loadStacks('cbr',1);
					} 
				},
				jsonpCallback:callback,
				success:function(callbk)
				{ 	
					
					bool_complete_flag = 1;
					Stkarray =callbk;
					
					// set localstorage
					if(readCookie("nnmc")){
						localStorage.setItem('radstk_'+useridval, JSON.stringify(Stkarray));
						localStorage.setItem('setupTime', now);
					}else{
						localStorage.setItem('radstk', JSON.stringify(Stkarray));
						localStorage.setItem('setupTime', now);
					}
					
					
				}
			});	
		}
		timerc = 0;ct_v++;		
	/*} 
	else
	{
		timerc = 1;
		
	}*/
}

function LTD(Stkarray)
{
	
	var cntr =0;
	//indicereq(Stkarray.sn);
	var mc_nws_alert = readCookie("mc_nws_alert_cc");

	$.each(Stkarray,function(i,v)
	{
		if(i=="alts"){//Mc News Alerts
			var id = "";
			var head = "";
			var url = "";
			var cntr_alt = 0;

			if(v.length>0 && $("#newsAlrts").length>0){
				$.each(v,function(g,s){
					id = s.id;
					hd = s.hed;
					url = s.url;

					if(url==""){
						url = "//www.moneycontrol.com/";
					}

					if(cntr_alt==0 && (mc_nws_alert<id || mc_nws_alert==false) && $("#newsAlrts").css('display')=='none'){
						$("#mc_nws_alert").html('<a href="'+url+'" class="liks">'+hd+'<span class="ar">&raquo;</span></a>');
						$("#newsAlrts").show();
						GAEventTracker("News_Alert", "MC_News_Alert_open", "MC_News_Alert");

						cntr_alt++;
						radar_setCookie("mc_nws_alert_cc", id, 1);
						setTimeout(function(){
							$("#newsAlrts").hide();
							GAEventTracker("News_Alert", "MC_News_Alert_Close", "MC_News_Alert");
						}, 120000);
					}
				});
			}
		}else if(i!='sn'){
			$.each(v,function(g,s)
			{
				var rid = $('#ind_glb'+i).find('a.nm_a').eq(0).attr('rid');			 
				if(rid == g.icd)
				{
				 
				var rettxt = s.nm;
				if(s.nm.length > 26)
				{
					rettxt =rettxt.substring(0,26);
					$('#ind_glb'+cntr).find('strong.hdind').eq(0).attr('title',s.nm);
				}
				var chg ='';
				if(s.chg!='')
				{
					chg = s.chg;				 
				}
				var perchg ='';
				if(s.pchg!='')perchg = s.pchg; 
				 
				if(perchg >0)
				perchg='+'+s.pchg;
				else
				perchg=s.pchg;


				$('#ind_glb'+cntr).find('strong').eq(0).html(rettxt);
				$('#ind_glb'+cntr).find('.prc').html(s.pr);
				$('#ind_glb'+cntr).find('.chg').html(s.chg);
				$('#ind_glb'+cntr).find('span.prchg').html('('+perchg+'%)');
				$('#ind_glb'+cntr).find('span').eq(1).attr('class','');
				$('#ind_glb'+cntr).find('span').eq(2).attr('class','');
				 
				

				var arw= 'grArrow';var arf='gr_13';			
				if(parseFloat(chg) <0)
				{	
					arw= 'rdArrow';
					arf='r_13';
				}
				 
				$('#ind_glb'+cntr).find('span').eq(1).attr('class',arw);				
				$('#ind_glb'+cntr).find('span').eq(2).attr('class',arf);
				$('#ind_glb'+cntr).find('span.prchg').removeClass('gr_13');
				$('#ind_glb'+cntr).find('span.prchg').removeClass('r_13');
				$('#ind_glb'+cntr).find('span.prchg').addClass(arf);
				
				}
				cntr++;
			});
		}
	});
	
}
function shortenTxt(txt,len)
{
		
		
		var rettxt;
		if(typeof txt != "undefined"){
			if(txt.length > len)
			{
				rettxt ='<strong class="hdind" title="'+txt+'">'+txt.substring(0,len)+'...</strong>';
			}
			else
			{
				rettxt = '<strong>'+txt+'</strong>';
			}
		}
	 return rettxt;
}
function getTopText(el)
{
	
	
	var resV;	 
	if(el !='undefined')
	{
	var elth = el.split('-');	
	
	switch (elth[0]) {
		case "ma":
			resV ='MOST ACTIVE';
		break;
		case "tpg":	
		case "tgl":	
			resV ='TOP GAINERS';
		break;
		case "tpl":
			resV ='TOP LOSERS';
		break;		
		case "ac":
			resV ='ACTIVE CALLS';
		break;		
		case "ap":
			resV ='ACTIVE PUTS';
		break;
		case "52wklow":
			resV ='52 WEEK LOW';
		break;	
		case "52wkhigh":
			resV ='52 WEEK HIGH';
		break;	
	}
	var exnm=elth[2];
	switch(elth[2]){
	case "N":
		exnm='NSE';
		break;
	case "B":
		exnm='BSE';
		break;

	}
		if(elth[1]=='futstk')
		{
			if(elth[0] =='ma')
				resV = resV+" Futures";
			else
			resV = 'Futures '+resV;
		}
		else
		resV = exnm+' '+resV;
	}
	return resV;
}

function cbr(d)
{
	
	//indicereq(d.sn);
	if(cbr_loaded==false)
	{
		cbr_loaded = true;
	//if(start_counter==true)
	//{
		
		var s1mkStr='';var s2mkStr='';var s3mkStr='';var s4mkStr='';var s5mkStr='';
		var s1cntr=0; var stk1c=0;var stk2c=0;var stk3c=0;var stk4c=0;
		var tmpv;var tmps2;var tmps1;var tmps4;var tmps5;
		$.each(d,function(i,v){
				for(var k=0;k<v.length;k++)
				{ 
					var link = '//www.moneycontrol.com/';
					var awsUrl = 'https://priceapi.moneycontrol.com/pricefeed/';
					var priceapi_awsUrl = 'https://priceapi-aws.moneycontrol.com/pricefeed/';
					var apiurlaws='';
					var expiryval = '';
					var prefix = '';
					if(i=='s1')
					{
						var arr='grArrow';var arr1='gr_13';
						 
						var perchg= v[k].pchg;
						if(perchg >0)
							perchg='+'+perchg;
						var chgchk = parseFloat(v[k].chg);
						if(chgchk <0)
						{
							arr='rdArrow';
							arr1='r_13';
						}
						if(v[k].link!='' && v[k].link!='undefiend'){
							link = link + v[k].link;
						}else{
							link = '';
						}
						
						if(v[k].ty ==1) // stocks
						{
							prefix ='/equitycash/';
							
						}
						else if(v[k].ty ==5) // indian indices
						{
							prefix ='/inidicesindia/';
							
						}else if(v[k].ty == 6) // global indices
						{
							prefix ='/indicesglobal/';	
							
						}else if(v[k].ty == 3) // commodity
						{
							prefix ='/commodityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}else if(v[k].ty == 7) // currency
						{
							prefix ='/currencyspot/';	
							
						}else if(v[k].ty == 2) // mf
						{
							prefix ='/mutualfund/';	
							
						}else if(v[k].ty == 4) // future
						{
							prefix ='/equityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}
						//if((v[k].ex == 'bse' || v[k].ex == 'BSE') && v[k].ty ==1){	
						if(v[k].ty ==1 || v[k].ty ==5){							
							apiurlaws = priceapi_awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}else{
							apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}
						
						var txtnm = shortenTxt(v[k].nm,24);
						var tophdr='';
						if(v[k].grp!=1)
						{
							if(tmps1 != v[k].grp)
							{
								//s1cntr++;
								tophdr='<div class="moveBx" id="ind_glb_'+s1cntr+'" data-grp="'+v[k].grp+'" data-pgurl="'+link+'"> <p align="center" class="gl_16 PT5"><strong class="hdgrp">'+getTopText(v[k].grp)+'</strong><span class="btArrow ML5"></span></p></div>';
							    tmps1 =v[k].grp;
							}							 
						}
						s1mkStr+=tophdr;
						s1mkStr+='<div class="moveBx" id="ind_glb'+s1cntr+'" data-symbol="'+v[k].icd+'" data-apiurl="'+apiurlaws+'" data-pgurl="'+link+'"><p><a target="_new" href="'+link+'" rid="'+v[k].icd+'" class="bl_12 nm_a">'+txtnm+'</a></p><p class="MT2mns"><span class="gd_15"><strong class="prc">'+v[k].pr+'</strong></span> <span class="'+arr+' ML2 MR2"></span> <span class="'+arr1+'"><strong class="chg">'+v[k].chg+'</strong></span> <span class="prchg '+arr1+'">('+perchg+'%)</span></p></div>';
						
						stk1c++;
					}					 
					if(i=='s2')
					{
						var arr='grArrow';var arr1='gr_13';
						var chgchk = parseFloat(v[k].chg);
						if(chgchk <0)
						{
							arr='rdArrow';
							arr1='r_13';
						}
						if(v[k].link!='' && v[k].link!='undefiend'){
							link = link + v[k].link;

						}else{
							link ='';
						}
						
						if(v[k].ty ==1) // stocks
						{
							prefix ='/equitycash/';
							
						}
						else if(v[k].ty ==5) // indian indices
						{
							prefix ='/inidicesindia/';
							
						}else if(v[k].ty == 6) // global indices
						{
							prefix ='/indicesglobal/';	
							
						}else if(v[k].ty == 3) // commodity
						{
							prefix ='/commodityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}else if(v[k].ty == 7) // currency
						{
							prefix ='/currencyspot/';	
							
						}else if(v[k].ty == 2) // mf
						{
							prefix ='/mutualfund/';	
							
						}else if(v[k].ty == 4) // future
						{
							prefix ='/equityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}

						//if((v[k].ex == 'bse' || v[k].ex == 'BSE') && v[k].ty ==1){						
						if(v[k].ty ==1 || v[k].ty ==5){	
							apiurlaws = priceapi_awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}else{
							apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}
						var perchg= v[k].pchg;
						if(perchg >0)
							perchg='+'+perchg;

						var txtnm = shortenTxt(v[k].nm,26);						 
						var tophdr='';
						if(v[k].grp!=1)
						{
							 
							if(tmps2 != v[k].grp)
							{
								//s1cntr++;
								tophdr='<div class="moveBx" id="ind_glb_'+s1cntr+'"  data-grp="'+v[k].grp+'" data-pgurl="'+link+'"> <p align="center" class="gl_16 PT5"><strong class="hdgrp">'+getTopText(v[k].grp)+'</strong><span class="btArrow ML5"></span></p></div>';
							    
							    tmps2 =v[k].grp;
							}							
						}	
						 

						s2mkStr+=tophdr;
						s2mkStr+='<div class="moveBx" id="ind_glb'+s1cntr+'" data-symbol="'+v[k].icd+'" data-apiurl="'+apiurlaws+'" data-pgurl="'+link+'"><p><a target="_new" href="'+link+'" rid="'+v[k].icd+'" class="bl_12 nm_a">'+txtnm+'</a></p><p class="MT2mns"><span class="gd_15"><strong class="prc">'+v[k].pr+'</strong></span> <span class="'+arr+' ML2 MR2"></span> <span class="'+arr1+'"><strong class="chg">'+v[k].chg+'</strong></span> <span class="prchg '+arr1+'">('+perchg+'%)</span></p></div>';
						
						
						stk2c++;
					}
					if(i=='s3')
					{
						var arr='grArrow';var arr1='gr_13';
						var chgchk = parseFloat(v[k].chg);
						if(chgchk <0)
						{
							arr='rdArrow';
							arr1='r_13';
						}
						if(v[k].link!='' && v[k].link!='undefiend'){
							link = link + v[k].link;
						}else{
							link = '';
						}
						
						if(v[k].ty ==1) // stocks
						{
							prefix ='/equitycash/';
							
						}
						else if(v[k].ty ==5) // indian indices
						{
							prefix ='/inidicesindia/';
							
						}else if(v[k].ty == 6) // global indices
						{
							prefix ='/indicesglobal/';	
							
						}else if(v[k].ty == 3) // commodity
						{
							prefix ='/commodityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}else if(v[k].ty == 7) // currency
						{
							prefix ='/currencyspot/';	
							
						}else if(v[k].ty == 2) // mf
						{
							prefix ='/mutualfund/';	
							
						}else if(v[k].ty == 4) // future
						{
							prefix ='/equityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}
						//apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						//if((v[k].ex == 'bse' || v[k].ex == 'BSE') && v[k].ty ==1){						
						if(v[k].ty ==1 || v[k].ty ==5){
							apiurlaws = priceapi_awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}else{
							apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}
						var txtnm = shortenTxt(v[k].nm,26);
						var perchg= v[k].pchg;
						if(perchg >0)
							perchg='+'+perchg;
						var tophdr='';
						if(v[k].grp!=1)
						{
							 
							if(tmpv != v[k].grp)
							{
											

								tophdr='<div class="moveBx" id="ind_glb_'+s1cntr+'" data-grp="'+v[k].grp+'" data-pgurl="'+link+'"> <p align="center" class="gl_16 PT5"><strong class="hdgrp">'+getTopText(v[k].grp)+'</strong><span class="btArrow ML5"></span></p></div>';
							    tmpv =v[k].grp;
							}
						}
						 
						s3mkStr+=tophdr;						

						s3mkStr+='<div class="moveBx" id="ind_glb'+s1cntr+'" data-symbol="'+v[k].icd+'" data-apiurl="'+apiurlaws+'" data-pgurl="'+link+'"><p><a target="_new" href="'+link+'" rid="'+v[k].icd+'" class="bl_12 nm_a">'+txtnm+'</a></p><p class="MT2mns"><span class="gd_15"><strong class="prc">'+v[k].pr+'</strong></span> <span class="'+arr+' ML2 MR2"></span> <span class="'+arr1+'"><strong class="chg">'+v[k].chg+'</strong></span> <span class="prchg '+arr1+'">('+perchg+'%)</span></p></div>';	


						stk3c++;

					}
					if(i=='s4')
					{
						var arr='grArrow';var arr1='gr_13';
						var chgchk = parseFloat(v[k].chg);
						if(chgchk <0)
						{
							arr='rdArrow';
							arr1='r_13';
						}
						if(v[k].link!='' && v[k].link!='undefiend'){
							link = link + v[k].link;

						}else{
							link ='';
						}
						
						if(v[k].ty ==1) // stocks
						{
							prefix ='/equitycash/';
							
						}
						else if(v[k].ty ==5) // indian indices
						{
							prefix ='/inidicesindia/';
							
						}else if(v[k].ty == 6) // global indices
						{
							prefix ='/indicesglobal/';	
							
						}else if(v[k].ty == 3) // commodity
						{
							prefix ='/commodityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}else if(v[k].ty == 7) // currency
						{
							prefix ='/currencyspot/';	
							
						}else if(v[k].ty == 2) // mf
						{
							prefix ='/mutualfund/';	
							
						}else if(v[k].ty == 4) // future
						{
							prefix ='/equityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}
						//apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						//if((v[k].ex == 'bse' || v[k].ex == 'BSE') && v[k].ty ==1){							
						if(v[k].ty ==1 || v[k].ty ==5){	
							apiurlaws = priceapi_awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}else{
							apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}

						var txtnm = shortenTxt(v[k].nm,26);
						var perchg= v[k].pchg;
						if(perchg >0)
							perchg='+'+perchg;
						var tophdr='';
						if(v[k].grp!=1)
						{
							 
							if(tmps4 != v[k].grp)
							{
								//s1cntr++;
								tophdr='<div class="moveBx" id="ind_glb_'+s1cntr+'" data-grp="'+v[k].grp+'" data-pgurl="'+link+'"> <p align="center" class="gl_16 PT5"><strong class="hdgrp">'+getTopText(v[k].grp)+'</strong><span class="btArrow ML5"></span></p></div>';
							    tmps4 =v[k].grp;
							}							 						 
						}						 
						s4mkStr+=tophdr;
						s4mkStr+='<div class="moveBx" id="ind_glb'+s1cntr+'" data-symbol="'+v[k].icd+'" data-apiurl="'+apiurlaws+'" data-pgurl="'+link+'"><p><a target="_new" href="'+link+'" rid="'+v[k].icd+'" class="bl_12 nm_a">'+txtnm+'</a></p><p class="MT2mns"><span class="gd_15"><strong class="prc">'+v[k].pr+'</strong></span> <span class="'+arr+' ML2 MR2"></span> <span class="'+arr1+'"><strong class="chg">'+v[k].chg+'</strong></span> <span class="prchg '+arr1+'">('+perchg+'%)</span></p></div>';
						stk4c++;						 
					}
					s1cntr++;
					 
					
				} 
	});	 
	var timerA=new Array(stk1c,stk2c,stk3c,stk4c);
	var minval = Math.min.apply(Math,timerA);	 
	if(minval <=2)
		callTimeout = 10000;
	if(minval == 3)
		callTimeout = 15000;
	if(s1cntr == 4)
		callTimeout = 20000;
	if(s1cntr >= 5)
		callTimeout = 25000;

	
		var advDiv='';
		if($.trim($('#fliper_ad_rad_d').html())!='')
		advDiv= '<div class="moveBx" align="center" id="ind_glb">'+$('#fliper_ad_rad_d').html()+'</div>';

		$('#elm1').html(s1mkStr);$('#elm2').html(s2mkStr);$('#elm3').html(s3mkStr+advDiv);$('#elm4').html(s4mkStr);$('#elm5').html(s5mkStr);	
		$('.loaderRd').remove();
		 
		$('.stockDsl .mrdBox').each(function(e){
		$(this).find('.moveBx').eq(0).addClass('current');});
		setInterval('rotateStacks()',5000);
	}
	 
			 
}

function cbr_localstorage(d)
{
	
	//indicereq(d.sn);
	if(cbr_loaded==false)
	{
		cbr_loaded = true;
	//if(start_counter==true)
	//{
		
		var s1mkStr='';var s2mkStr='';var s3mkStr='';var s4mkStr='';var s5mkStr='';
		var s1cntr=0; var stk1c=0;var stk2c=0;var stk3c=0;var stk4c=0;
		var tmpv;var tmps2;var tmps1;var tmps4;var tmps5;
		
		var s1cn = 0; var s2cn=0; var s3cn=0; var s4cn=0;
		$.each(d,function(i,v){
				for(var k=0;k<v.length;k++)
				{ 
					var curprice = ''; var chngprice = '';
					var percentagechng = 0;
					var arrowtextclor='grArrow';var arrowclor='gr_13';
					var expirydate = '';
					var link = '//www.moneycontrol.com/';
					var awsUrl = 'https://priceapi.moneycontrol.com/pricefeed/';
					var priceapi_awsUrl = 'https://priceapi-aws.moneycontrol.com/pricefeed/';
					var apiurlaws='';
					var expiryval = '';
					var prefix = '';
					
					if(i=='s1')
					{
						var arr='grArrow';var arr1='gr_13';
						 
						var perchg= v[k].pchg;
						if(perchg >0)
							perchg='+'+perchg;
						var chgchk = parseFloat(v[k].chg);
						if(chgchk <0)
						{
							arr='rdArrow';
							arr1='r_13';
						}
						if(v[k].link!='' && v[k].link!='undefiend'){
							link = link + v[k].link;
						}else{
							link = '';
						}
						
						if(v[k].ty ==1) // stocks
						{
							prefix ='/equitycash/';
							
						}
						else if(v[k].ty ==5) // indian indices
						{
							prefix ='/inidicesindia/';
							
						}else if(v[k].ty == 6) // global indices
						{
							prefix ='/indicesglobal/';	
							
						}else if(v[k].ty == 3) // commodity
						{
							prefix ='/commodityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}else if(v[k].ty == 7) // currency
						{
							prefix ='/currencyspot/';	
							
						}else if(v[k].ty == 2) // mf
						{
							prefix ='/mutualfund/';	
							
						}else if(v[k].ty == 4) // future
						{
							prefix ='/equityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}
						//apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						//if((v[k].ex == 'bse' || v[k].ex == 'BSE') && v[k].ty ==1){							
						if(v[k].ty ==1 || v[k].ty ==5){	
							apiurlaws = priceapi_awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}else{
							apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}
						var txtnm = shortenTxt(v[k].nm,24);
						
						if(s1cn == 0){
							$.ajax({
								url:apiurlaws,
								type:"GET",
								dataType: 'json',
								cache:true,
								async:false,
								success:function(result)
								{ 	
									
									if(result.code == 200){
										var arr='grArrow';var arr1='gr_13';
										var chgchk = parseFloat(result.data.pricechange);
									
										chgchk = parseFloat(result.data.pricechange);
										if(chgchk <0)
										{
											arr='rdArrow';
											arr1='r_13';
										}
										//var link =pgurl_aws;
										
										var perchg= parseFloat(result.data.pricepercentchange);
										 perchg= perchg.toFixed(2);
										if(perchg >0)
											perchg='+'+perchg;										


										curprice = result.data.pricecurrent;
										chngprice = chgchk;
										arrowtextclor = arr;
										arrowclor =arr1;
										percentagechng = perchg;
										expirydate = result.data.expirydate;
									}

								}
							});
							
							
						}else{
							/*curprice= v[k].pr;
							chngprice = v[k].chg;
							arrowtextclor = arr;
							arrowclor =arr1;
							percentagechng = perchg;
							*/
							curprice= 0;
							chngprice = 0;
							percentagechng = 0;
						}
						var tophdr='';
							if(v[k].grp!=1)
							{
								if(tmps1 != v[k].grp)
								{
									//s1cntr++;
									tophdr='<div class="moveBx" id="ind_glb_'+s1cntr+'" data-grp="'+v[k].grp+'" data-pgurl="'+link+'"> <p align="center" class="gl_16 PT5"><strong class="hdgrp">'+getTopText(v[k].grp)+'</strong><span class="btArrow ML5"></span></p></div>';
								    tmps1 =v[k].grp;
								}							 
							}

							if( v[k].grp==4){
								txtnm = txtnm + ' '+expirydate;
							}else{
								txtnm = txtnm;
							}
							s1mkStr+=tophdr;
							s1mkStr+='<div class="moveBx" id="ind_glb'+s1cntr+'" data-symbol="'+v[k].icd+'" data-apiurl="'+apiurlaws+'" data-pgurl="'+link+'"><p><a target="_new" href="'+link+'" rid="'+v[k].icd+'" class="bl_12 nm_a">'+txtnm+'</a></p><p class="MT2mns"><span class="gd_15"><strong class="prc">'+curprice+'</strong></span> <span class="'+arrowtextclor+' ML2 MR2"></span> <span class="'+arrowclor+'"><strong class="chg">'+chngprice+'</strong></span> <span class="prchg '+arrowclor+'">('+percentagechng+'%)</span></p></div>';
						
						
						stk1c++;
						s1cn++;
					}					 
					if(i=='s2')
					{
						var arr='grArrow';var arr1='gr_13';
						var chgchk = parseFloat(v[k].chg);
						if(chgchk <0)
						{
							arr='rdArrow';
							arr1='r_13';
						}
						if(v[k].link!='' && v[k].link!='undefiend'){
							link = link + v[k].link;

						}else{
							link ='';
						}
						if(v[k].ty ==1) // stocks
						{
							prefix ='/equitycash/';
							
						}
						else if(v[k].ty ==5) // indian indices
						{
							prefix ='/inidicesindia/';
							
						}else if(v[k].ty == 6) // global indices
						{
							prefix ='/indicesglobal/';	
							
						}else if(v[k].ty == 3) // commodity
						{
							prefix ='/commodityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}else if(v[k].ty == 7) // currency
						{
							prefix ='/currencyspot/';	
							
						}else if(v[k].ty == 2) // mf
						{
							prefix ='/mutualfund/';	
							
						}else if(v[k].ty == 4) // future
						{
							prefix ='/equityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}
						//apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						//if((v[k].ex == 'bse' || v[k].ex == 'BSE') && v[k].ty ==1){							
						if(v[k].ty ==1 || v[k].ty ==5){	
							apiurlaws = priceapi_awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}else{
							apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}
						var perchg= v[k].pchg;
						if(perchg >0)
							perchg='+'+perchg;

						var txtnm = shortenTxt(v[k].nm,26);						 
						

						if(s2cn == 0){
							
							$.ajax({
								url:apiurlaws,
								type:"GET",
								dataType: 'json',
								cache:true,
								async:false,
								success:function(result)
								{ 	
									
									if(result.code == 200){
										var arr='grArrow';var arr1='gr_13';
										var chgchk = parseFloat(result.data.pricechange);
										
										chgchk = parseFloat(result.data.pricechange);
										if(chgchk <0)
										{
											arr='rdArrow';
											arr1='r_13';
										}
										//var link =pgurl_aws;
										
										var perchg= parseFloat(result.data.pricepercentchange);
										 perchg= perchg.toFixed(2);
										if(perchg >0)
											perchg='+'+perchg;										


										curprice = result.data.pricecurrent;
										chngprice = chgchk;
										arrowtextclor = arr;
										arrowclor =arr1;
										percentagechng = perchg;
										expirydate = result.data.expirydate;
										
									}

								}
							});
							
							
						}else{
							
							/*curprice= v[k].pr;
							chngprice = v[k].chg;
							arrowtextclor = arr;
							arrowclor =arr1;
							percentagechng = perchg;*/
							curprice= 0;
							chngprice = 0;
							percentagechng = 0;
							
						}
						var tophdr='';
						if(v[k].grp!=1)
						{
							 
							if(tmps2 != v[k].grp)
							{
								//s1cntr++;
								tophdr='<div class="moveBx" id="ind_glb_'+s1cntr+'" data-grp="'+v[k].grp+'" data-pgurl="'+link+'"> <p align="center" class="gl_16 PT5"><strong class="hdgrp">'+getTopText(v[k].grp)+'</strong><span class="btArrow ML5"></span></p></div>';
							    
							    tmps2 =v[k].grp;
							}							
						}	
						 
						if( v[k].grp==4){
								txtnm = txtnm + ' '+expirydate;
							}else{
								txtnm = txtnm;
							}
						s2mkStr+=tophdr;
						s2mkStr+='<div class="moveBx" id="ind_glb'+s1cntr+'" data-symbol="'+v[k].icd+'" data-apiurl="'+apiurlaws+'" data-pgurl="'+link+'"><p><a target="_new" href="'+link+'" rid="'+v[k].icd+'" class="bl_12 nm_a">'+txtnm+'</a></p><p class="MT2mns"><span class="gd_15"><strong class="prc">'+curprice+'</strong></span> <span class="'+arrowtextclor+' ML2 MR2"></span> <span class="'+arrowclor+'"><strong class="chg">'+chngprice+'</strong></span> <span class="prchg '+arrowclor+'">('+percentagechng+'%)</span></p></div>';
						
						
						stk2c++;
						s2cn++;
					}
					if(i=='s3')
					{
						var arr='grArrow';var arr1='gr_13';
						var chgchk = parseFloat(v[k].chg);
						if(chgchk <0)
						{
							arr='rdArrow';
							arr1='r_13';
						}
						if(v[k].link!='' && v[k].link!='undefiend'){
							link = link + v[k].link;
						}else{
							link = '';
						}
						if(v[k].ty ==1) // stocks
						{
							prefix ='/equitycash/';
							
						}
						else if(v[k].ty ==5) // indian indices
						{
							prefix ='/inidicesindia/';
							
						}else if(v[k].ty == 6) // global indices
						{
							prefix ='/indicesglobal/';	
							
						}else if(v[k].ty == 3) // commodity
						{
							prefix ='/commodityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}else if(v[k].ty == 7) // currency
						{
							prefix ='/currencyspot/';	
							
						}else if(v[k].ty == 2) // mf
						{
							prefix ='/mutualfund/';	
							
						}else if(v[k].ty == 4) // future
						{
							prefix ='/equityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}
						//apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						//if((v[k].ex == 'bse' || v[k].ex == 'BSE') && v[k].ty ==1){							
						if(v[k].ty ==1 || v[k].ty ==5){	
							apiurlaws = priceapi_awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}else{
							apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}

						var txtnm = shortenTxt(v[k].nm,26);
						var perchg= v[k].pchg;
						if(perchg >0)
							perchg='+'+perchg;
						

						if(s3cn == 0){
							$.ajax({
								url:apiurlaws,
								type:"GET",
								dataType: 'json',
								cache:true,
								async:false,
								success:function(result)
								{ 	
									
									if(result.code == 200){
										var arr='grArrow';var arr1='gr_13';
										var chgchk = parseFloat(result.data.pricechange);
										
										chgchk = parseFloat(result.data.pricechange);
										if(chgchk <0)
										{
											arr='rdArrow';
											arr1='r_13';
										}
										//var link =pgurl_aws;
										
										var perchg= parseFloat(result.data.pricepercentchange);
										 perchg= perchg.toFixed(2);
										if(perchg >0)
											perchg='+'+perchg;										


										curprice = result.data.pricecurrent;
										chngprice = chgchk;
										arrowtextclor = arr;
										arrowclor =arr1;
										percentagechng = perchg;
										expirydate = result.data.expirydate;
										
									}

								}
							});
							
							
						}else{
							/*curprice= v[k].pr;
							chngprice = v[k].chg;
							arrowtextclor = arr;
							arrowclor =arr1;
							percentagechng = perchg;*/
							curprice= 0;
							chngprice = 0;
							percentagechng = 0;
							
						}
						var tophdr='';
						if(v[k].grp!=1)
						{
							 
							if(tmpv != v[k].grp)
							{
											

								tophdr='<div class="moveBx" id="ind_glb_'+s1cntr+'"  data-grp="'+v[k].grp+'" data-pgurl="'+link+'"> <p align="center" class="gl_16 PT5"><strong class="hdgrp">'+getTopText(v[k].grp)+'</strong><span class="btArrow ML5"></span></p></div>';
							    tmpv =v[k].grp;
							}
						}
						 
						s3mkStr+=tophdr;						
						if( v[k].grp==4){
								txtnm = txtnm + ' '+expirydate;
							}else{
								txtnm = txtnm;
							}
						s3mkStr+='<div class="moveBx" id="ind_glb'+s1cntr+'" data-symbol="'+v[k].icd+'" data-apiurl="'+apiurlaws+'" data-pgurl="'+link+'"><p><a target="_new" href="'+link+'" rid="'+v[k].icd+'" class="bl_12 nm_a">'+txtnm+'</a></p><p class="MT2mns"><span class="gd_15"><strong class="prc">'+curprice+'</strong></span> <span class="'+arrowtextclor+' ML2 MR2"></span> <span class="'+arrowclor+'"><strong class="chg">'+chngprice+'</strong></span> <span class="prchg '+arrowclor+'">('+percentagechng+'%)</span></p></div>';	
						

						stk3c++;
						s3cn++;

					}
					if(i=='s4')
					{
						var arr='grArrow';var arr1='gr_13';
						var chgchk = parseFloat(v[k].chg);
						if(chgchk <0)
						{
							arr='rdArrow';
							arr1='r_13';
						}
						if(v[k].link!='' && v[k].link!='undefiend'){
							link = link + v[k].link;

						}else{
							link ='';
						}
						if(v[k].ty ==1) // stocks
						{
							prefix ='/equitycash/';
							
						}
						else if(v[k].ty ==5) // indian indices
						{
							prefix ='/inidicesindia/';
							
						}else if(v[k].ty == 6) // global indices
						{
							prefix ='/indicesglobal/';	
							
						}else if(v[k].ty == 3) // commodity
						{
							prefix ='/commodityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}else if(v[k].ty == 7) // currency
						{
							prefix ='/currencyspot/';	
							
						}else if(v[k].ty == 2) // mf
						{
							prefix ='/mutualfund/';	
							
						}else if(v[k].ty == 4) // future
						{
							prefix ='/equityfuture/';	
							expiryval= '?expiry='+v[k].expiry;
							
						}
						//apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						//if((v[k].ex == 'bse' || v[k].ex == 'BSE') && v[k].ty ==1){							
						if(v[k].ty ==1 || v[k].ty ==5){	
							apiurlaws = priceapi_awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}else{
							apiurlaws = awsUrl+v[k].ex+prefix+v[k].symbol+expiryval;
						}
						var txtnm = shortenTxt(v[k].nm,26);
						var perchg= v[k].pchg;
						if(perchg >0)
							perchg='+'+perchg;
						
						if(s4cn == 0){
							$.ajax({
								url:apiurlaws,
								type:"GET",
								dataType: 'json',
								cache:true,
								async:false,
								success:function(result)
								{ 	
									
									if(result.code == 200){
										var arr='grArrow';var arr1='gr_13';
										var chgchk = parseFloat(result.data.pricechange);
									
										chgchk = parseFloat(result.data.pricechange);
										if(chgchk <0)
										{
											arr='rdArrow';
											arr1='r_13';
										}
										//var link =pgurl_aws;
										
										var perchg= parseFloat(result.data.pricepercentchange);
										 perchg= perchg.toFixed(2);
										if(perchg >0)
											perchg='+'+perchg;										


										curprice = result.data.pricecurrent;
										chngprice = chgchk;
										arrowtextclor = arr;
										arrowclor =arr1;
										percentagechng = perchg;
										expirydate = result.data.expirydate;
										
									}

								}
							});
							
							
						}else{
							/*curprice= v[k].pr;
							chngprice = v[k].chg;
							arrowtextclor = arr;
							arrowclor =arr1;
							percentagechng = perchg;*/
							curprice= 0;
							chngprice = 0;
							percentagechng = 0;
							
						}
						var tophdr='';
						if(v[k].grp!=1)
						{
							 
							if(tmps4 != v[k].grp)
							{
								//s1cntr++;
								
								tophdr='<div class="moveBx" id="ind_glb_'+s1cntr+'" data-grp="'+v[k].grp+'" data-pgurl="'+link+'"> <p align="center" class="gl_16 PT5"><strong class="hdgrp">'+getTopText(v[k].grp)+'</strong><span class="btArrow ML5"></span></p></div>';
							    tmps4 =v[k].grp;

							}							 						 
						}						 
						s4mkStr+=tophdr;
						if( v[k].grp==4){
								txtnm = txtnm + ' '+expirydate;
							}else{
								txtnm = txtnm;
							}
						s4mkStr+='<div class="moveBx" id="ind_glb'+s1cntr+'" data-symbol="'+v[k].icd+'" data-apiurl="'+apiurlaws+'" data-pgurl="'+link+'"><p><a target="_new" href="'+link+'" rid="'+v[k].icd+'" class="bl_12 nm_a">'+txtnm+'</a></p><p class="MT2mns"><span class="gd_15"><strong class="prc">'+curprice+'</strong></span> <span class="'+arrowtextclor+' ML2 MR2"></span> <span class="'+arrowclor+'"><strong class="chg">'+chngprice+'</strong></span> <span class="prchg '+arrowclor+'">('+percentagechng+'%)</span></p></div>';
						
						stk4c++;	
						s4cn++;					 
					}
					s1cntr++;
					 
					
				} 
	});	 
	var timerA=new Array(stk1c,stk2c,stk3c,stk4c);
	var minval = Math.min.apply(Math,timerA);	 
	if(minval <=2)
		callTimeout = 10000;
	if(minval == 3)
		callTimeout = 15000;
	if(s1cntr == 4)
		callTimeout = 20000;
	if(s1cntr >= 5)
		callTimeout = 25000;

	
		var advDiv='';
		if($.trim($('#fliper_ad_rad_d').html())!='')
		advDiv= '<div class="moveBx" align="center" id="ind_glb">'+$('#fliper_ad_rad_d').html()+'</div>';
		$("#pricevalcntr").val(s1cntr);
		$('#elm1').html(s1mkStr);$('#elm2').html(s2mkStr);$('#elm3').html(s3mkStr+advDiv);$('#elm4').html(s4mkStr);$('#elm5').html(s5mkStr);	
		$('.loaderRd').remove();
		 
		$('.stockDsl .mrdBox').each(function(e){
		$(this).find('.moveBx').eq(0).addClass('current');});
		setInterval('rotateStacks()',5000);
	}
	 
			 
}		

 function detectBrowserVer_(){
 
	var userAgent = navigator.userAgent.toLowerCase();
	$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
	var version = 0;
	var bsr_n = '';
	
	if($.browser.msie){
	userAgent = $.browser.version;
	userAgent = userAgent.substring(0,userAgent.indexOf('.'));
	version = userAgent;
	bsr_n = 'msie';
	}
	else if($.browser.chrome){
	userAgent = userAgent.substring(userAgent.indexOf('chrome/') +7);
	userAgent = userAgent.substring(0,userAgent.indexOf('.'));
	version = userAgent;	
	bsr_n = 'chrome';
	}
	else if($.browser.safari){
	userAgent = userAgent.substring(userAgent.indexOf('safari/') +7);
	userAgent = userAgent.substring(0,userAgent.indexOf('.'));
	version = userAgent;
	bsr_n = 'safari';
	}
	else if($.browser.mozilla){	
	if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
	userAgent = userAgent.substring(userAgent.indexOf('firefox/') +8);
	userAgent = userAgent.substring(0,userAgent.indexOf('.'));
	version = userAgent;
	bsr_n = 'mozilla';
	}
	else{}
	}
	else if($.browser.opera){
	userAgent = userAgent.substring(userAgent.indexOf('version/') +8);
	userAgent = userAgent.substring(0,userAgent.indexOf('.'));
	version = userAgent;
	bsr_n = 'opera';
	}

	return bsr_n+"||"+version;
}
function makeVHTML(cb,sec,left)
{
	
	var inSehtml ='<div class="tabdb"><p class="bd15nv PL5 PT5"> No Details Found!!</div>';
	var txxt='';var mult=3;
	 
	if(cb.length >0)
	{
	var cssF=''; var cssTF='PT5';
	var widAr = new Array('lastvisited','asm','sstat','comstat','search_mf','search_tcom','search_com','watch_com','port_com','port_mf','watch_mf','srch_'+left,'search_'+left,'eum','usm','tcom','futstat');
	var widIncl = $.grep(widAr, function(n) { return n.toLowerCase() == sec.toLowerCase()});

	if(widIncl.length>0)
	{
		cssF='width:235px';
	}
	if(sec =='srch')
	{
		cssTF='PT15';
	}
	var mod=5;
	if(sec=='tcom' || sec=='search_tcom')
	{
		mod=4;
		mult=2;
	}
	if(sec=='search_currency')
	{
		mod=4;
		cssF='';
	}
	
	if(sec=='6bi'||sec=='6si')
	{
		mod=5;
		cssF='';
	}
	if(sec=='port_mf' || sec=='watch_mf' || sec=='watch_com' || sec=='search_mf'|| sec=='search_stk' || sec=='search_com' || sec=='search_com')
	{
		mod=5;mult=2;
	}
	var tot =mod*mult;

	var inSehtml ='<div class="tabdb">';
	if(cb[0].sg ==1)
	{
		inSehtml+='<p class="bd15nv MB5 PL5"><strong>Sorry, there are no matches for your search. Search Suggestions</strong></p>';
	}
	if(sec!='sstat' && sec!='comstat' && sec!='futstat' )
	{
				inSehtml+='<p class="bd15nv '+cssTF+' PL5">'+
					'<input type="checkbox" id="'+left+'-select" name="selectall" class="selectall" value="'+sec+'" class="checkBox">'+
						'<span class="PL5" style="font-size:12px;">Select  All / None </span></p>';
	}
	
	inSehtml+='<div class="mstactdvv MT10 '+sec+'" style="'+cssF+'"><ul class="'+sec+'-ullist">';
	var h=1;
	
	var cntrrdata=0;
	$.each(cb,function(i,v){
		 
		 
		if(v.nm!='cntt')
		{
		 //
		var selData = v.nm+'#'+v.icd+"#"+left;			
		var retData = $.grep(selectionArray, function(n) { return n.toLowerCase() == selData.toLowerCase()});
		
		if(retData.length >0)
		{
			liex ='class="lichk"';
			chke = 'checked';
		}
		else
		{
			liex ='';
			chke = '';

		}
		var titnm = v.nm;
		 
		var genId= v.nm+'_'+v.icd+'_'+left;
		//genId = genId.replace(/ /\g,'');
		genId = genId.replace(/ /g,"-");		 
		genId =genId.replace(/&/g,"amp");		
		genId =genId.replace(/;/g,"semi");
		genId =genId.replace('$$',"dollar");

		inSehtml+='<li '+liex+' id="'+genId+'" ><input '+chke+' type="checkbox" class="lvvalues"  sec="'+left+'" value="'+v.icd+'" class="checkBox"><span>'+v.nm+'</span></li>';
		if(i>0 && h%mod==0) 
		{
			inSehtml+='</ul></div><div class="mstactdvv MT10 '+sec+'" style="'+cssF+'"><ul class="'+sec+'-ullist">';
		}
		


		if(h==tot)
			return false;
		
		h++;
		// alert(inSehtml) 
		}
		
	});
	
	inSehtml+='</div><div class="CL"></div>';
	 if(txxt!='')inSehtml+='<div class="PA5">'+txxt+'</div>';
	inSehtml+='</div>';
		var pga=pg+1;
		var pgs=pg-1;
		if(pga ==0 )pga=1;		if(pgs ==0 )pgs=1;

		if(pgs <0)
			pgs=1;
		var func = pagingFunc(sec);		 
		if(func!='0')
		{
			var sectx= sec;
			if(sec =='watch_stk' || sec =='port_stk')
				sectx=1;
			if(sec =='watch_mf' || sec =='port_mfk')
				sectx=2;
			if(sec =='watch_com' || sec =='port_com')
				sectx=3;

			inSehtml+='<div class="TAR MR25">';
			if(pg>1)
			inSehtml+='<a href="javascript:;" onclick="'+func+'(\''+sectx+'\','+pgs+')" class="larwmkt"></a>';
			
			if(h==tot)
			inSehtml+='<a href="javascript:;" onclick="'+func+'(\''+sectx+'\','+pga+')" class="rarwmkt ML5"></a>';

			inSehtml+='</div>';	
		}
		else
		{
			$.each(cb,function(i,v){if(v.nm=='cntt')cntrrdata=v.icd});
       
			//if()
			{
				if(cntrrdata == 1)
				{
					var pga=pg+1;
					var pgs=pg-1;
					if(pga ==0 )pga=1;		if(pgs ==0 )pgs=1;

					if(pgs <0)
					pgs=1;
					var seFun='searchData';

					

					inSehtml+='<div class="TAR MR25">';
					if(pg>1)
						{
							if(sec !='search_tcom')
							{
								inSehtml+='<a href="javascript:;" onclick="searchData(\'sdHndlr\',0,'+pgs+')" class="larwmkt"></a>';
							}
							else
							{
								inSehtml+='<a href="javascript:;" onclick="commoditySearch('+pgs+')" class="larwmkt"></a>';
							}
						}

						if(h==tot)
						{
							
							if(sec !='search_tcom')
							{
								inSehtml+='<a href="javascript:;" onclick="searchData(\'sdHndlr\',0,'+pga+')" class="rarwmkt ML5"></a>';
							}
							else
							{
								inSehtml+='<a href="javascript:;" onclick="commoditySearch('+pga+')" class="rarwmkt ML5"></a>';
							}
						}

					inSehtml+='</div>';	

				}
			}
		}
	}
	return inSehtml;																
	
}
var lastVSec = 0;var indSec = 0;
function pagingFunc(sec)
{
	
	var secarr =new Array();
	//secarr['6bi'] = 'loadIndices'; 
	secarr['6si'] = 'loadIndices'; 
	secarr['watch_stk'] =  'loadWatchlistData';
	secarr['watch_mf'] =  'loadWatchlistData';
	secarr['watch_com'] =  'loadWatchlistData';
	secarr['port_com'] =  'loadPortFolioData';
	secarr['port_stk'] =  'loadPortFolioData';
	secarr['port_mf'] =  'loadPortFolioData';	
	secarr['tcom'] = 'loadTopComm'; 
 	if(typeof secarr[sec] != 'undefined')
	{
			return secarr[sec];
	}
	else
		return 0;

}
function lastvH(cb)
{
	
	 
	var secc='';
	if(lastVSec==1)
	{
		secc='stk';
	}
	else if(lastVSec==2)
	{
		secc='mf';
	}
	else if(lastVSec ==3)
	{
		secc='commodity';
	}
	 
	if($(cb).size() >  0)
	{
		 $('#stkx'+lastVSec).html(makeVHTML(cb,'lastvisited',secc));
		 
	}
	else
	{
		$('#stkx'+lastVSec).html('No Results');
	}
	$('.tabn').css('display','none');
	$('#stkx'+lastVSec).css('display','block');
	  
}
var srchLastsec= 0;
function srchlastv(cb)
{
	 
	var secc='';
	if(srchLastsec==1)
	{
		secc='stk';
	}
	else if(srchLastsec==2)
	{
		secc='mf';
	}
	else if(srchLastsec ==3)
	{
		secc='commodity';
	}
	$('#srcgfst'+srchLastsec).html(makeVHTML(cb,'srch_'+secc,secc));
	$('#srch1t').addClass('act');
	$('#srch2t').removeClass('act');
	$('.tab1sCont2 .tabn').css('display','none');
	$('#srch1').css('display','block');
	$('#srcgfst'+srchLastsec).css('display','block');
}
function searchLastV(lastVSec)
{
		
		srchLastsec = lastVSec;
		var urltocall =iurl+'/rprocessing_aws.php?q_f=lastv&q_a='+lastVSec;
		$.ajax({	
				url:urltocall,
				type:"GET",
				dataType:"jsonp",
				jsonpCallback:"srchlastv",
				cache:true,
				success:function(d)
				{
					
				}
			});
	
}
 
function lastVisitedCall(sec)
{
	
	$('.tab1s li a').removeClass('act');
	$('#stkx'+sec+'t').addClass('act');
	$('#stkx'+sec).html('Loading...');
	lastVSec=sec;
	var urltocall = '//www.moneycontrol.com/mccode/stock_radar/rprocessing_aws.php?q_f=lastv&q_a='+lastVSec;
	$.ajax({	
			url:urltocall,
			type:"GET",
			dataType:"jsonp",
			jsonpCallback:"lastvH",
			cache:true,
			success:function(d)
			{
				
			}
		});
}
function searchResults()
{
	 
	$('#thnkyumsg').css('display','none');
	$('#srch2t').addClass('act');
	$('#srch1t').removeClass('act');
	$('.tab1sCont2 .tabn').css('display','none');
	$('#srch2t').css('display','block');
	$('#srchhead').css('display','block');
	$('#srch2').css('display','block');
}
function showIndIndices(elf)
{
	 
	$('#brdindt,#secindt').removeClass('act');
	$('#'+elf+'t').addClass('act');
	$('#brdind').css('display','none');
	$('#secind').css('display','none');	
	var el='';
	if(elf=='secind')el='6si';
	if(elf=='brdind')el='6bi';

	loadIndices(el,1);
	$('#'+elf).css('display','block');
}
function inHand(cb)
{ 
	  	
	  	var indTxt ='';
		if(indSec =='6bi' || indSec =='6si')
		{
			indTxt ='indices_i';	
			if(indSec =='6bi')
			{
						
				if(cb.bi.length >  0)
				{				

				var strres=makeVHTML(cb.bi,'6bi',indTxt);
				$('#brdind').html(strres);
				$('#brdind').css('display','block');
				
				}
				else
				{
					$('#stkx'+lastVSec).html('No Results');
				}
			}
			if(indSec =='6si')
			{
				var strres=makeVHTML(cb.si,'6si',indTxt);
				$('#secind').html(strres);
				$('#secind').css('display','block');
			}
			
			else
			{
				$('#stkx'+lastVSec).html('No Results');
			}
		}
		else
		{
			if(cb.usm.length >  0)
			{
				indTxt ='indices_g';				 
				$('#usmakt').html(makeVHTML(cb.usm,"usm",indTxt));
				$('#eromkt').html(makeVHTML(cb.em,"eum",indTxt));
				$('#asiamkt').html(makeVHTML(cb.asm,"asm",indTxt));
				$('#nsemkt').html(makeVHTML(cb.nse,"nnse",indTxt));
				$('#usmakt').css('display','block');
			 }
		} 		
	 $('.whtbgl .listCont'+indSec).css('display','block');
}
function showGLBIndices(elf)
{
		 
		$('#usmaktt,#eromktt,#asiamktt,#nsemktt').removeClass('act');
		$('#'+elf+'t').addClass('act');
		$('#usmakt').css('display','none');
		$('#eromkt').css('display','none');
		$('#asiamkt').css('display','none');
		$('#nsemkt').css('display','none');
		$('#'+elf).css('display','block');
}
function loadIndices(el,pgno)
{
	 
	indSec =el;
	pg= pgno;
	var urltocall =iurl+'/rprocessing_aws.php?q_f=ind&q_a='+el+'&pg='+pgno;
	$.ajax({	
			url:urltocall,
			type:"GET",
			dataType:"jsonp",
			jsonpCallback:"inHand",
			cache:true,
			success:function(d)
			{
				
			}
		});
}
function topcmh(cb)
{	 
	 
	var reshtml = makeVHTML(cb,'tcom','commodity');
	$('#commd1').html(reshtml);$('#srchTxtinpt').val('');
	$('#commd1').show();
}
function loadTopComm(el,pgno)
{
	 
	indSec =el;
	pg= pgno;
	var urltocall =turl+'processing_aws.php?q_a=topc&pg='+pgno;
	$.ajax({	
			url:urltocall,
			type:"GET",
			dataType:"jsonp",
			jsonpCallback:"topcmh",
			cache:true,
			success:function(d)
			{
				
			}
		});
}
len = function(obj) {
    var L=0;
    $.each(obj, function(i, elem) {
        L++;
    });
    return L;
}

function addtoDiv(selData)
{
	
	var findArray = new Array('&',' ','#','amp;');	 
	var dispVal = selData.split('#');	
	var adva=0;
	var retData = $.grep(selectionArray, function(n) { return n == selData; });	 
	if(retData.length <=0)
	{
		if(dispVal[0]!="")
		{
			selectionArray.push(selData);			
			//var html ='<li><input type="checkbox" class=" checkBox" value="'+selData+'" /><div class="FL w125">'+dispVal[0]+'</div><a href="javascript:;"  class="closevv"></a><div class="CL"></div></li>';
			$('#selectedDiv ul.sortable li').each(function(i,v){
				var this_it =$(v).find('.checkBox').attr('value');
				this_it=this_it.replace('&',"&amp;");
				if( this_it ==selData)
				{
					$(v).find('.checkBox').attr('checked',true);
					adva=1;
				}				 
				
			});
			if(adva ==0)
			{
				var html ='<li><div class="FL w125">'+dispVal[0]+'</div><div class="FR"><input name="chkbxSelected" type="checkbox" class="checkBox" checked value="'+selData+'" /></div><div class="CL"></div></li>';
				$(html).hide().prependTo('#selectedDiv .scroll-pane ul').fadeIn('slow');
			}
			 
		}
	}
	else
	{
		 
		
	}
	$( ".sortable" ).sortable();
	$( ".sortable" ).disableSelection();
	 
}
function removeStackEntry()
{
	 
	selectionArray.length=0;
	addedfl=0;
	$('#selectedDiv .scroll-pane ul li').remove();
	$('.mstactdvv li').removeClass('lichk');
	$('.mstactdvv li input:checkbox.lvvalues').attr('checked',false);
	$('.selectall').attr('checked',false);
}
function getSortedStackList()
{
	
	var selectionArray = new Array();
	var senObj = new Object();	 var cc=0;
	$('#selectedDiv .scroll-pane ul li').each(function(i,v)
	{
		if($(this).find('input[type=checkbox]').attr('checked'))
		{			 
			selectionArray.push($(this).find('input[type=checkbox]:checked').val());
			var f = $(this).find('input[type=checkbox]:checked').val().split('#');		 
			senObj[cc] = f[1]+'#'+f[2];
			cc++
		}
	});
	if(cc >0)
	return senObj;
	else
	return 0;
}
function refreshSelectedArray()
{
	/*
	if(selectionArray.length > 0)
	{
		for(var j=0;j<selectionArray.length;j++)
		{ 
			var data =selectionArray[j];			 
			data =data.split('#');	 
			html+='<li><input type=hidden value="'+selectionArray[j]+'" /><div class="FL w125">'+data[0]+'</div><a href="javascript:;"  class="closevv"></a><div class="CL"></div></li>';
		}
	}
	else
	{
		//$('#selectedDiv .scroll-pane ul li').remove();
	}
	$('#selectedDiv .scroll-pane ul li').remove();
	//$(html).hide().prependTo('#selectedDiv .scroll-pane ul').fadeIn('slow');
/*	$('.scroll-pane').jScrollPane(
		{verticalDragMinHeight: 30,
		verticalDragMaxHeight: 30
	});*/
	 
}
String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  var regex; 
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace);
  }
  return replaceString;
};
function removeFromDiv(removeItem,el)
{
	
	if(el == 1)
	{
		selectionArray = $.grep(selectionArray, function(value) {	 	 
			return removeItem.toLowerCase() != value.toLowerCase();			 
		});

		$('#selectedDiv .scroll-pane li').each(function(i,v){
			var thisit =$(this).find('input:checkbox').attr('value');
			 
			//thisit =thisit.replace(/ /g,"-");		
			/*thisit =thisit.replace(/&/g,"amp");		
			thisit =thisit.replace(/;/g,"semi");	*/
			thisit =thisit.replace('&',"&amp;");
			 
			if(thisit.toLowerCase() == removeItem.toLowerCase())
			{
				 /*$(this).fadeOut('slow',function(){
					$(this).remove();
				}); 
				 */
				 $(this).find('input:checkbox').attr('checked',false);
				 $('.mstactdvv ul li#'+$(this).find('input:checkbox').attr('value')).removeClass('lichk');
				 $('.mstactdvv ul li#'+$(this).find('input:checkbox').attr('value')).find('input:checkbox').attr('checked',false);
			}
		});
	}
	else if(el == 2)
	{
		laststkVisited = $.grep(laststkVisited, function(value) {	 	 
			return removeItem.toLowerCase() != value.toLowerCase();	
		});

		$('#sidevList ul li').each(function(i,v){
			var thisit =$(this).find('div').eq(0).attr('value');		
			thisit=thisit.replace('&','&amp;');
			if(thisit == removeItem)
			{
				$(this).fadeOut('slow',function(){
					$(this).remove();
				});
				//$(this).find('input:checkbox').attr('checked',false);
			}
		});
	}
}
function ShowSideLinks(el)
{
	 
		
		var addEditp ;
		var addEdit ;
		var fullv;
		if(el == 1 ) //lastv
		{
			addEditp ='<a href="javascript:void(0);" onclick="addEdit_portfolio(\'addPortfolio\',1)"><span class="icon_add"></span> Add to Portfolio</a>';
			addEdit='<a href="javascript:void(0);" onclick="addEdit_portfolio(\'addEdit_portfolio\',1)" class="ML20"><span class="icon_add"></span> Add/Edit</a>';
			fullv='<a href="//www.moneycontrol.com/watchlist1/last_visited_fullview.php" class="ML20"><span class="icon_fullView"></span> Full View</a>';
			refresh='<a href="javascript:;" onclick="showLastVisited(1);" class="ML20"><span class="mr_icon_refresh MR5"></span>Refresh</a>';
		}
		if(el == 11) // watchlist
		{
			//onclick="addEdit_portfolio(\'addEdit_portfolio\',11)" 
			addEditp ='<a href="//www.moneycontrol.com/portfolio_new/add_stocks_multi.php?add_wl_flg=true"><span class="icon_add"></span> Add to Portfolio</a>';

			addEdit='<a href="//www.moneycontrol.com/bestportfolio/wealth-management-tool/stock_watchlist" class="ML20"><span class="icon_add"></span> Add/Edit</a>';

			//addEdit='<a onclick="addEdit_portfolio(\'addEdit_portfolio\',11)" href="javascript:;" class="ML20"><span class="icon_add"></span> Add/Edit</a>';

			fullv='<a href="//www.moneycontrol.com/bestportfolio/wealth-management-tool/stock_watchlist" class="ML20"><span class="icon_fullView"></span> Full View</a>';
			 refresh='<a href="javascript:;"  onclick="showWPStk(11,\'wlst\');"  class="ML20"><span class="mr_icon_refresh MR5"></span>Refresh</a>';
		}
		if(el == 12) // port
		{
			addEdit='<a href="//www.moneycontrol.com/portfolio_new/add_stocks_multi.php" class="ML20"><span class="icon_add"></span> Add Stocks</a>';
			fullv='<a href="//www.moneycontrol.com/bestportfolio/wealth-management-tool/investments" class="ML20"><span class="icon_fullView"></span> Full View</a>';
			addEditp='';
			refresh='<a href="javascript:;"  onclick="showWPStk(12,\'plst\');" class="ML20"><span class="mr_icon_refresh MR5"></span>Refresh</a>';
		}
		if(el==0)
		{
			addEdit='';
			fullv='';
			addEditp='';
			refresh='<a href="javascript:;"  onclick="showMktradar();" class="ML20 FR"><span class="mr_icon_refresh MR5"></span>Refresh</a>';
		}
	 
	$('.prtf_links').html(addEditp+addEdit+fullv+refresh);
}
var totLastVstks=0;
function showWatchListEdit(sec)
{
	
	$('#marketR,#lastStock,#watchList,#port').css('display','none');
	var urltocall =turl+'processing_aws.php?q_a=getFwatch';
	$.ajax({	
			url:urltocall,
			type:"GET",
			dataType:"jsonp",
			jsonpCallback:"getFwatch",
			cache:true,
			success:function(d)
			{
				
			}
		});
	

}
function getFwatch(d)
{
	 
	var fiRes;
	var res='<ul class="sortable">';
	$.each(d.stk,function(i,v){

		res+='<li><div class="FL w125" value="'+v.icd+'">'+v.nm+'</div><input type="checkbox" name="sidewv" class="sidelvalues" checked="" value="'+v.nm+'_'+v.icd+'" /><div class="CL"></div></li>';	
	});
	res+='</ul>'
	$('#add_edit_portfolio').html('');
	var searchitems='<div id="srchLstvSe"></div>';
	fiRes='<div id="addEdit_portfolio" class="clearfix" style="display:block;"><div class="whtbgl"> <h2>Add/Edit</h2><div class="MT15"><div class="srchmktbg1 PR">	<input type="text" value="Type Here" onfocus="if($(this).val()==\'Type Here\')$(this).val(\'\');" class="txtbxmktrad" id="txtlvserch" name="txtlvserch"><div class="CL"></div></div>			<div><a onclick="searchData(\'tpLstv\',1,1);" href="javascript:;" class="btnmktsrch"></a></div>			<div class="CL"></div></div>'+searchitems+'</div><div class="whtbgr"><div class="listCont6"><p class="w16"><strong>My List</strong></p><div class="MT20"><div id="sidevList" class="scroll-pane">'+res+'</div></div><div class="MT20 ML20"> <a href="javascript:;" onclick="sidevListSave(\'watch\');" class="bluebtn">SAVE</a><a href="javascript:;" onclick="$(\'#addEdit_portfolio\').hide();showWPStk(11,\'wlst\');"class="nobgdbtn">CANCEL</a> </div></div></div></div>';
	$('#add_edit_portfolio').html(fiRes);
	$('#add_edit_portfolio').show();
}
function showHeadSection(t,se)
{
	
	$('#marketR,#lastStock,#watchList,#port').css('display','none');
	var lsv='';var fiRes;
	if(se == 1 )
	{
		
		if(t==1)
		{
			var nc=1;
			$('#lastStock table tr').each(function(i,v){

				if($(this).find('td').eq(0).html()!=null && $(this).find('td').eq(1).html()!='<span class="">NT</span>')
				{
					var sc = $(this).find('td').eq(0).find('a').attr('value');
					var sccmp =$(this).find('td').eq(0).find('a strong').html();
					lsv+='<tr class="lsvtbl"><td width="200"><input type=hidden value="'+sccmp+'" name="stk_'+nc+'" id="stk_'+nc+'" /><input type=hidden value="'+sc+'" name="scid_'+nc+'" id="scid_'+nc+'" />'+$(this).find('td').eq(0).html()+'</td><td align=right>'+$(this).find('td').eq(1).html()+'</td><td><input name="add_date1_'+nc+'"  id="add_date1_'+nc+'" type="text" /><a class="calcb" onclick="displayCalendar(add_date1_'+nc+',\'dd-mm-yyyy\',add_date1_'+nc+');" alt="Click Here to Pick up the date"></a></td><td><input id="qty_'+nc+'" name="qty_'+nc+'" type="text" /></td><td><input id="price_'+nc+'" name="price_'+nc+'" type="text" /></td></tr>';
					totLastVstks++;nc++;
				}
			});
			fiRes= '<div id="addPortfolio" style="display:none;"><h2>Add to Portfolio</h2>		<table cellpadding="0" cellspacing="0" border="0" width="100%" class="MT12"><thead>	<th width="110">Company</th>	<th width="100" style="text-align:right">Live Price</th><th width="155">Investment Date</th><th width="155">Quantity</th><th>Avg. Price</th></tr></thead><tbody>'+lsv+'</tbody></table><div class="MT20 MR50 clearfix FR"><a onclick="save_radartrans();" class="bluebtn" href="javascript:;" >SAVE</a><a class="nobgdbtn" id="shwlstvisited" href="javascript:;" onclick="$(\'#addPortfolio\').hide();showLastVisited(1);" >CANCEL</a></div><div class="CL"></div></div>';
		}
		if(t==2)
		{
			var searchitems='<div id="srchLstvSe"></div>';
			fiRes='<div id="addEdit_portfolio" class="clearfix" style="display:none;"><div id="srchnnn" class="whtbgl"> <h2>Add/Edit Stocks you last visited </h2><div class="ML10 MT5">You can search and add stocks to your list</div><div class="MT15"><div class="srchmktbg1 PR">	<input type="text" value="Type Here" onfocus="if($(this).val()==\'Type Here\')$(this).val(\'\');" class="txtbxmktrad" id="txtlvserch" name="txtlvserch"><div class="CL"></div></div>			<div><a onclick="searchData(\'tpLstv\',1,1);" href="javascript:;" class="btnmktsrch"></a></div>			<div class="CL"></div></div>'+searchitems+'</div><div class="whtbgr"><div class="listCont6"><p class="w16"><strong>My List</strong></p><div class="MT20"><div id="sidevList" class="scroll-pane"></div></div><div class="MT20 ML20"> <a href="javascript:;" onclick="sidevListSave(\'cookie\');" class="bluebtn">SAVE</a><a href="javascript:;" onclick="$(\'#addEdit_portfolio\').hide();showLastVisited(1);"class="nobgdbtn">CANCEL</a> </div></div><div class="CL"></div><div style="margin-top:5px;font-size:11px;color:white">* Drag the stocks to re-arrange their order</div></div></div>';
		}
	}
		
	$('#add_edit_portfolio').html(fiRes);
	 showLVList(1);
	$('#add_edit_portfolio').show();

}
var laststkVisited = new Array();

function sidevListSave(el)
{
	
	if(el =='cookie')
	{
		var ttn='';
		$('#sidevList ul li').each(function(i,v){
			if($(this).find('input:checkbox').attr('checked'))
				ttn+='|'+$(this).find('input:checkbox').eq(0).attr('value');
		});
		 
		var ajx_path = "/watchlist1/add_stocks.php?section_main="+el+"&stocks_list="+escape(ttn);

		$.get(ajx_path,function(data) 
		{	  
			if(data!='')
			{
				var brokenscid=data.split("|");						
				for(var i=0; i < brokenscid.length-1; i++) 
				{
					add_to_mrcookie(brokenscid[i]);
				}
				$('#add_edit_portfolio').css('display','none');
				showLastVisited(1);
			}
		}); 
	}
	else
	{
		var lastRsrs ='';
		$('input[name=sidewv]:checked').each(function(i,v){
			lastRsrs+=$(this).val()+'|';		
		});	
		lastRsrs = lastRsrs.slice(0,-1);
		 
		//http://www.moneycontrol.com/watchlist1/add_stocks.php?section_main=watchlist&fact=del&sc_id=DC01
		var ajx_path = "/watchlist1/add_stocks.php?section_main=watchlist&stocks_list="+escape(lastRsrs);
		$.get(ajx_path, function(data) 
		{	  
			$('#add_edit_portfolio').css('display','none');
			showWPStk(11,'wlst');
		});
		
	}
	 
}
function save_radartrans()
{
	 
	
	var i;
	var cv=0;	
	var trans_comp="";
	var trans_date="";
	var trans_price="";
	var trans_qty="";
	var trans_scid="";
	var passing_data="";	
	var trans_total_stocks=totLastVstks;
	var minus_total=trans_total_stocks;	
	//$('#sv_ldr').html(loadingStr());
	for(iii=1; iii<=trans_total_stocks; iii++)
	{
		trans_comp=document.getElementById("stk_"+iii).value;
		trans_scid=document.getElementById("scid_"+iii).value;
		trans_date=document.getElementById("add_date1_"+iii).value;
		trans_qty=document.getElementById("qty_"+iii).value;
		trans_price=document.getElementById("price_"+iii).value;	

		var i_Chars = ".";
		
		if(trans_date!="" || trans_qty!="" || trans_price!="")
		{			
			if (isNaN(parseInt(trans_qty)) && trans_qty!="")
			{
				alert("Only number input allowed");
				document.getElementById("qty_"+iii).value="";
				document.getElementById("qty_"+iii).focus();
				return false;
			}

			if (isNaN(parseInt(trans_price)) && trans_price!="")
			{
				alert("Only number input allowed");
				document.getElementById("price_"+iii).value="";
				document.getElementById("price_"+iii).focus();
				return false;
			}
		 
			for (var i = 1; i < trans_qty.length; i++)
			{
				if (i_Chars.indexOf(trans_qty.charAt(i)) != -1)
				{
					 alert ("Please enter your Buy Quantity in numbers. No Decimals allowed");
					 document.getElementById("qty_"+iii).value="";
					 document.getElementById("qty_"+iii).focus();
					 return false;
				}
			}
			
			passing_data=passing_data+trans_comp+"_"+trans_scid+"_"+trans_date+"_"+trans_qty+"_"+trans_price+"|";
			cv++;	

			trans_comp="";
			trans_scid="";
			trans_date="";
			trans_qty="";
			trans_price="";
		}			
			
	}//end of for loop
 
	if(cv>0)
	{
		var url = "/watchlist1/update_trans.php?";
		var params = "passing_data="+encodeURIComponent(passing_data);
		
		$.get(url+params,function(data) 
		{	  
			 
			 $('.whtBx ul.tbs li').removeClass('act');
			 $('.whtBx ul.tbs').find('li').eq(3).addClass('act');
			 $('#add_edit_portfolio').css('display','none');//$('#sv_ldr').html('');
			 showWPStk(12,'plst'); 		 
			
		});
		totLastVstks=0;
	}
	else
	{
		alert('Please enter values');
	}
	
}
function showLVList(el)
{
	
	
	var ckData;var res='';
	if(el ==1)
	{
		if(readCookie('stocks'))
		{
			ckData =mctop_getCookie('stocks');
			var sd = ckData.split('|');
			for(var l=0;l<=sd.length-1;l++)
			{ 
				if(sd[l]!='')
				{
					var rd =sd[l].split('_');		
					var scid = rd[1].split('~');	
					var divv = rd[0]+'_'+scid[0];
					rd[0]=rd[0].replace(/\./g," ");
					res+='<li><div class="FL w125" value="'+divv+'">'+rd[0]+'</div><input type="checkbox" class="sidelvalues" checked="" value="'+divv+'" /><div class="CL"></div></li>';				 
					$('#sidevList').html('<ul class="sortable">'+res+'</ul>');
				}
			}
		}
		else
		{
			$('#sidevList').html(loadingStr());
			var urltocall ='/mccode/stock_radar/rprocessing_aws.php?q_f=lastv&q_a=1';	 
			$.ajax({	
					url:urltocall,
					type:"GET",
					dataType:"jsonp",
					cache:false,
					jsonpCallback:"sideListH",
					success:function(d)
					{
						 
					}
				});
		}
		
	}
	
}
function sideListH(d)
{
	var res='';
	$(d).each(function(i,v){
		res+='<li><div class="FL w125" value="'+v.nm+'_'+v.icd+'">'+v.nm+'</div><input type="checkbox" class="sidelvalues" checked="" value="'+v.nm+'_'+v.icd+'" /><div class="CL"></div></li>';	
	});
	$('#sidevList').html('<ul class="sortable">'+res+'</ul>');
}
function getcookie(cookiename) 
{
	 var cookiestring=document.cookie;
	 var i=0;
	 var index1=cookiestring.indexOf(cookiename);
	 if (index1==-1 || cookiename=="") return ""; 
	 var index2=cookiestring.indexOf(';',index1);
	 if (index2==-1) index2=cookiestring.length; 
	 return unescape(cookiestring.substring(index1+cookiename.length+1,index2));
}
function add_to_mrcookie(cookie_scid)
{
	var cookie_en = navigator.cookieEnabled;
	if(cookie_en == 0)
		alert("You need to enable cookies for this site to load properly!");

	cookie_name = "stocks";
	cookie_value = cookie_scid;

	var expDays = 30;
	var exp = new Date(); 
	exp.setTime(exp.getTime() + (expDays*24*60*60*1000));
	var val1="";

	if(cookie_value.length>3)
		mraddcookievalue(cookie_name,cookie_value);
	 

	function mraddcookievalue(name, value)
	{
		other_value = "";
		new_value = "";
		var m_newstr=1;
		old_value = getcookie(name);
		//old_value='|Aban.Offshore_AL~4|Mah.and.Mah_MM~1|Satyam_SCS~1|SPIC_SPI05~2|Integ.Fin.Co_IFC01~10|ACC_ACC~18|KS.Oils_KSO~2|Dabur.India_DI~3|Punj.Lloyd_PL9~2|NTPC_NTP~1|Mah.and.Mah_MM~1|Integ.Fin.Co_IFC01~10|Satyam_SCS~1|SPIC_SPI05~2';
		//old_value='|Aban.Offshore_AL~4|Mah.and.Mah_MM~1|Integ.Fin.Co_IFC01~10';
		 
		if((old_value).match(value) == null)
		{
			mstr = old_value.split("|");
			for(var k=1;k<mstr.length;k++)
			{
				if(k<11)
					val1 = val1+"|"+mstr[k];			
			}
			val1=val1.replace('||','|');
			document.cookie = name + "=|" + escape(value) + "~1" + val1 + "; expires=" + exp.toGMTString() + "; path=/; domain=.moneycontrol.com; ";
		}
		else
		{
			mstr = old_value.split("|");
			for(var k=1;k<mstr.length;k++)
			{
				if(k<11)
					val1 = val1+"|"+mstr[k];			
			}
			val1=val1.replace('||','|');

			m_str = val1.substring(old_value.indexOf(value));
			/*if(m_str.indexOf("|") != -1)
			m_str = m_str.substring(0,m_str.indexOf("|"));*/

			m_val = m_str.split("~");
			m_newstr = eval(parseInt(m_val[1])+1);
			if(m_newstr<1)
				m_newstr=1;
			m_str = m_val[0] + "~" + eval(parseInt(m_val[1]));

			val1=val1.replace(m_str,'');
			val1=val1.replace('||','|');

			document.cookie = name + "=|" + escape(value) + "~"+m_newstr +'' + val1 + "; expires=" + exp.toGMTString() + "; path=/; domain=.moneycontrol.com; ";
		}
	}
}
var sidPg=0;
function tpLstv(cb)
{
	 $('#srchLstvSe').html('');
	 cb=cb.stks;
	 
	var inSehtml ='<div class="tabdb"><p class="bd15nv PL5 PT5"> No Details Found!!</div>'
	if(cb.length >0)
	{
	var cssF='width:200px'; var cssTF='PT5';
	var mod=5;	 
	var tot =mod*2;
	var sec='shh';var left='sah'; 
	var inSehtml ='<div class="tabdb">';
	if(cb[0].sg ==1)
	{
		inSehtml+='<p class="bd15nv MB5 PL5"><strong>Sorry, there are no matches for your search. Search Suggestions</strong></p>';
	}
	inSehtml+='<div class="mstactdvv MT10 '+sec+'" style="'+cssF+'"><ul class="'+sec+'-ullist">';
	var h=0;
	var totcnt =0;
	$.each(cb,function(i,v){
		if(v.nm!='cntt')
		{
		 //
			var selData = v.nm+'#'+v.icd+"#"+left;			
			var retData=''; ;//= $.grep(selectionArray, function(n) { return n == selData; });
			
			if(retData.length >0)
			{
				liex ='class="lichk"';
				chke = 'checked';
			}
			else
			{
				liex ='';
				chke = '';
			}
			var titnm = v.nm;
			inSehtml+='<li '+liex+'><input '+chke+' type="checkbox" class="sidevalues"  sec="'+left+'" value="'+v.icd+'" class="checkBox"><span>'+v.nm+'</span></li>';
			if(i>0 && (h+1)%mod==0) 
			{
				inSehtml+='</ul></div><div class="mstactdvv MT10 '+sec+'" style="'+cssF+'"><ul class="'+sec+'-ullist">';
			}
			h++;
		}
		else
		{
			totcnt = v.icd;
		}

	});

	inSehtml+='</div><div class="CL"></div>';
		var pga=sidPg+1;
		var pgs=sidPg-1;
		if(pga ==0 )pga=1;		if(pgs ==0 )pgs=1;

		if(pgs <0)
		pgs=1;
		inSehtml+='<div  style="width:450px" class="TAR MR25">';
		 
		if(sidPg>1)
		{
			inSehtml+='<a href="javascript:;" onclick="searchData(\'tpLstv\',1,'+pgs+')" class="larwmkt"></a>';
		}

		if(h==tot)
		{
			inSehtml+='<a href="javascript:;" onclick="searchData(\'tpLstv\',1,'+pga+')" class="rarwmkt ML5"></a>';
		}

	}

	$('#srchLstvSe').html(inSehtml);	
}

function searchSideData(elpg)
{
	var inpval =''; 
	 inpval = $('#txtlvserch').val();
	 
	if(inpval.length> 2 && $.trim(inpval)!="")
	{
	 
		var calUrl =turl+'processing_aws.php?q_a=search&inpval='+encodeURIComponent(inpval)+'&typ='+typ+'&pg='+elpg;
		$.ajax({
		url:calUrl,
		type:"GET",
		cache:true,
		dataType:"jsonp",
		jsonpCallback:"tpLstv",
		success:function(d){
		}
		});
	}
	 
}

function addtoSideList(el)
{ 
	var fi=0;
	var lastven = $('#sidevList ul li .sidelvalues:checked').size();
	 
	if(lastven<10)
	{
		var np= el.split('_');var exsts=0;
		$('#sidevList ul li .sidelvalues:checked').each(function(i,v){
			if($(this).attr('value').split('_')[1] == np[1])
			{
				exsts=1;
			}
		});
		if(exsts ==0)
		{
			fi=1;
			var ppnd='<li><div class="FL w125" value="'+el+'">'+np[0].replace(/\./g," ")+'</div><input '+chke+' type="checkbox" class="sidelvalues" name="sidewv" checked value="'+el+'" class="checkBox"><div class="CL"></div></li>';	
			$(ppnd).hide().prependTo('#sidevList ul').fadeIn('slow');
		}
		else
		{
			alert('Stock already exists in your list');
		}
	}
	else
	{
		fi=0;
		alert('You can add only 10 stocks to your list. Please uncheck stocks from "My List" before adding.')
	}
	 
	 return fi;
}
function addEdit_portfolio(tabId,sec)
{
	//$('.tbs li').removeClass('act').eq(3).addClass('act');
	$('.marketRdr .tbsCont .content').hide();
	$('.marketRdr .tbsCont #add_edit_portfolio').fadeIn();
	switch(tabId)
	{
		case 'addPortfolio':
		if(readCookie('nnmc'))
		{
			showHeadSection(1,sec);
			$('#addEdit_portfolio').hide();
			$('#addPortfolio').show();
		}
		else
		{
			$('#lastStock').hide();
			$('#add_edit_portfolio').html(loginPData(15));
			$('#add_edit_portfolio').show();
		}
			 
		break;
		case 'addEdit_portfolio':
			if(sec == 11)
			{
				showWatchListEdit(sec);
			}
			else
			{ 
				showHeadSection(2,sec);
				$('#addPortfolio').hide();
				$('#addEdit_portfolio').show();
			}
		break;
		default:
		break;
	}
	$( ".sortable" ).sortable();
	$( ".sortable" ).disableSelection();
}
function showLastVisited(el)
{
	$('#lastStock').removeClass('content');
	ShowSideLinks(1);
	wdiv=1;
	$('#lastStock').html(loadingStr());$('#lastStock').css('display','block');
	var urltocall =turl+'processing_aws.php?q_a=lastv';	 
		$.ajax({	
				url:urltocall,
				type:"GET",
				dataType:"jsonp",
				cache:false,
				jsonpCallback:"sLstV",
				success:function(d)
				{
					if(d ==0 )
					{
						 
					}
				}
			});
	GAEventTracker('MARKETRADAR', 'QUICKVIEW', 'LASTVISITED');
}
function loadingStr()
{
	return '<div style="margin:20px;text-align:center"><img src="//img.moneycontrol.co.in/images/mcradar/ajax-loader.png"></div>';
}
function getClrCss(val)
{
	var chg_c='r_13';

	if(val >0)
	{
		chg_c='gr_13';		 
	}
	if(val == 0)
	{
		chg_c='';		 
	}
	return chg_c;
}
function sLstV(d)
{
	var mkstr='';
	 
	if($(d).size() > 0)
	{ 
		mkstr ='<table width="100%;" cellspacing="0" cellpadding="0" border="0" class="tblsPort2"><tbody><tr><th width="150" align="left">COMPANY</th><th>LIVE PRICE</th><th>CHANGE</th><th>VOLUME</th><th>HIGH</th><th>LOW</th><th>BID PRICE</th><th>BID QTY</th><th>OFFER PRICE</th><th>OFFER QTY</th></tr>';

		if(wdiv == 12)
		{
			mkstr ='<table width="100%;" cellspacing="0" cellpadding="0" border="0" class="tblsPort2"><tbody><tr><th width="150" align="left">COMPANY</th><th>LIVE PRICE</th><th>CHANGE</th><th>SHARES</th><th> INV.PRICE</th><th>MKT VALUE</th><th>DAY\'S GAIN</th><th>DAY\'S GAIN%</th><th>OVERALL GAIN</th><th>OVERALL GAIN%</th></tr>';
			 
		}
		var cntr=0;
		if(wdiv == 12)
		{
			$.each(d,function(i,v){
				var scnm = v.nm;
				var pr=v.cp;
				var vol =v.vol;
				var hgh =v.hg;var low =v.lw;var bdp =v.bdp;var bdq =v.bdq;var ofp = v.ofp;
				var ofq =v.ofq;
				var pr_c='r_13';
				//if(pr > 0)
					
				var chg_a='rdArrow2';
				var chg_c='r_13';
				var chg=v.chg;
				if(chg >0){chg_c='gr_13';chg_a='grArrow2';pr_c='gr_13';}
				if(chg ==0)
				{
					chg_c='';chg_a='';
				}
				if(chg =='-')
				{
					chg_c='';chg_a='';pr_c='';
				}
				var greyc= '';
				var link_u = '//www.moneycontrol.com/';
				var l_url=link_u+v.link;
				if(cntr%2==0)
					greyc= 'grey';
				var ogainptxt='';

				if(v.ogainp=='-')
					ogainptxt ='-';
				else 
					ogainptxt =v.ogainp+'%';
				var vgainptxt='';
				if(v.tpgain=='-')
					vgainptxt ='-';
				else 
					vgainptxt =v.tpgain+'%'; 
				 
				 
				mkstr+='<tr class="'+greyc+'"><td width="150" style="text-align:left;"><a target="_new" class="initcap bl_13" value="'+v.icd+'" href="'+l_url+'"><strong>'+scnm+'</strong></a></td><td><span class="'+pr_c+'">'+pr+'</span></td>			<td><span class="'+chg_a+'"></span> <span class="'+chg_c+'">'+chg+'</span></td><td>'+vol+'</td><td>'+v.invp+'</td>	<td>'+nformat(v.mktval,'',0)+'</td><td><span class="'+getClrCss(v.tgain)+'">'+nformat(v.tgain,'',0)+'</span></td><td><span class="'+getClrCss(v.tpgain)+'">'+vgainptxt+'</span></td><td><span class="'+getClrCss(v.ogain)+'">'+nformat(v.ogain,'',0)+'</span></td><td><span class="'+getClrCss(v.ogainp)+'">'+ogainptxt+'</span></td></tr>';
				cntr++;
			});
			mkstr+='</table>';
		}
		else
		{
			$.each(d,function(i,v){
				var scnm = v.nm;
				var pr=v.cp;
				var vol =v.vol;
				var hgh =v.hg;var low =v.lw;var bdp =v.bdp;var bdq =v.bdq;var ofp = v.ofp;
				var ofq =v.ofq;
				var pr_c='r_13';
				//if(pr > 0)
					
				var chg_a='rdArrow2';
				var chg_c='r_13';
				var chg=v.chg;
				if(chg >0){chg_c='gr_13';chg_a='grArrow2';pr_c='gr_13';}
				if(chg ==0)
				{
					chg_c='';chg_a='';
				}
				if(chg =='-')
				{
					chg_c='';chg_a='';pr_c='';
				}
				var greyc= '';
				var link_u = '//www.moneycontrol.com/';
				var l_url=link_u+v.link;
				if(cntr%2==0)
					greyc= 'grey';

				mkstr+='<tr class="'+greyc+'"><td width="150" style="text-align:left;"><a target="_new" class="initcap bl_13" value="'+v.icd+'" href="'+l_url+'"><strong>'+scnm+'</strong></a></td><td><span class="'+pr_c+'">'+pr+'</span></td>			<td><span class="'+chg_a+'"></span> <span class="'+chg_c+'">'+chg+'</span></td><td>'+vol+'</td><td>'+hgh+'</td>	<td>'+low+'</td><td>'+bdp+'</td><td>'+bdq+'</td><td>'+ofp+'</td><td>'+ofq+'</td></tr>';
				cntr++;
			});
			mkstr+='</table>';

		}

	}
	else
	{

		if(wdiv ==12)
		mkstr = '<div class="PA10">'+AddnOw('Stocks','Portfolio','//www.moneycontrol.com/portfolio_new/add_stocks_multi.php');+'</div>';
		if(wdiv ==11) 
		mkstr ='<div class="PA10">'+AddnOw('Stocks','Watchlist','//www.moneycontrol.com/portfolio_new/add_stockswl_quick.php')+'</div>';
	}

	$('#lastStock').css('width','');
	$('#lastStock').html(mkstr).hide().fadeIn();
	//$('#lastStock').show();
}
var wdiv ='';
function showWPStk(wd,el)
{
	ShowSideLinks(wd); 
	$('#lastStock').removeClass('content');	
	$('#lastStock').html(loadingStr());$('#lastStock').css('display','block');
	wdiv =wd;
	if(readCookie('nnmc'))
	{
		var urltocall =turl+'processing_aws.php?q_a='+el;	 
		$.ajax({	
				url:urltocall,
				type:"GET",
				dataType:"jsonp",
				cache:true,
				jsonpCallback:"sLstV",
				success:function(d)
				{
					
				}
			});
		
	}
	else
	{ 
		//alert(wd)
		checkSession(wd);
	}
	if(wd==11)
		GAEventTracker('MARKETRADAR', 'QUICKVIEW', 'WATCHLIST');
	else
		GAEventTracker('MARKETRADAR', 'QUICKVIEW', 'PORTFOLIO'); 
}
function detachWindow()
{
	$('.custmzPop_close').trigger('click');
	var settings ='directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=970,height=110';
	var url ='https://www.moneycontrol.com/mccode/stock_radar/mcradard.php';	
	window.open(url, 'Radar', settings);
}
function SlideRadar()
{
	
}
function showMktradar()
{
	$('.prtf_links').html('');
	ShowSideLinks(0);
	
	$('#lastStock').removeClass('content')
	$('#lastStock').html(loadingStr());$('#lastStock').css('display','block');
	$('.whtBx ul.tbs li').removeClass('act');
	$('.whtBx ul.tbs li:first').addClass('act')
	var wdiv =13;
	//if(readCookie('nnmc'))
	//{
		var str ='';
		var urltocall = '/mccode/stock_radar/marketradar_element.json'; 
		$.ajax({	
				url:urltocall,
				type:"GET",
				dataType:"json",
				cache:true,
				success:function(d)
				{
					var cntrr=1;
					$.each(d.STOCKS,function(i,v)
					{
						var chgc='r_14';
						if(v.CHNG >0)
							chgc='gr_14';

						if(v.CHNG == 0)
							chgc='';

						var chg_a ='rdArrow';

						if(v.CHNG >0)
						chg_a ='grArrow';
					
						if(v.CHNG == 0)
							chg_a='';
						var bg='';					
						if(cntrr%2==0)
							bg='bggrey';

						 
						if(v.STOCK_NAME!='' && v.STOCK_NAME!=undefined)
						{
						str+='<div class="PT15 PB15 PR12 PL12 clearfix '+bg+'"><div class="FL MR5 W255"><p class="MB5"><a target="_new" href="'+v.STOCK_URL+'" class="bl_15"><strong>'+v.STOCK_NAME+'</strong></a></p><p class="MT2mns"><span class="gd_14"><strong>'+v.CURRENT_CLOSEPRICE+'</strong></span> <span class="'+chg_a+' ML2 MR2"></span> <span class="'+chgc+'"><strong>'+v.CHNG+'</strong></span><span class="'+chgc+'">('+v.CHNG_PER+'%)</span> <span class="gl_12a">Vol :'+v.VOLUME+'</span></p></div><div class="FL"><span class="nxtAr"></span></div><div class="FL PL25 W580"><div class="b_14" >'+v.TEXT+'</div></div></div>';
						cntrr++;
						}
					});
					 
					$('#lastStock').css('width','');
					
					$('#lastStock').html(str).hide().fadeIn();
				}
			});
	GAEventTracker('MARKETRADAR', 'QUICKVIEW', 'STKINNEWS');	
	 
}
function checkDisplayMessage(msg,type)
{
	var cssclr;var extraH='';
	if(type== 1)
	{
		cssclr='pink_clr';
	}
	if(type== 2)
	{
		cssclr='yellow_clr';
		
	}
	if(type== 0)
	{
		cssclr='green_clr';
		extraH='<p class="MT5">Do you want to continue? <a href="javascript:close_notification();" class="notbtn">Yes</a> <a onclick="$(\'.closePnl\').click();" class="notbtn" href="javascript:;" >No I am done</a></p>';
	}

	if(type == 0 )
	{
		
		for(var f=1;f<=11;f++)
		{ 
			$('.listCont'+f).css('display','none');
		}
		$('.listCont11').css('display','block');
		$('#srch1').css('display','block');$('#srch2').css('display','none');$('#srchhead').css('display','none')
		$('#selectedDiv').find('.save_msg').remove();		
		$('#selectedDiv').prepend('<div class="save_msg PR"><a onclick="$(\'.save_msg\').hide();" class="close_savemsg" href="javascript:void(0);"></a>Selection Saved</div>');
	}
	else
	{
		for(var f=1;f<=11;f++)
		{
			if($('.listCont'+f).css('display') =='block')
			{
				 
				if($('.listCont'+f).find('div.notification').html()!=null)
				{
					$('.listCont'+f).find('div.notification').removeClass('yellow_clr');
					$('.listCont'+f).find('div.notification').removeClass('green_clr');
					$('.listCont'+f).find('div.notification').removeClass('pink_clr');
					$('.listCont'+f).find('div.notification').addClass(cssclr);
					var divmat='<span class="FL">'+msg+''+extraH+'</span><a href="javascript:close_notification();" class="close_noti">X</a>';
					$('.listCont'+f).find('div.notification').html(divmat);
				}
				else
				{
					var divmat = '<div class="notification '+cssclr+' clearfix"><span class="FL">'+msg+''+extraH+'</span><a href="javascript:close_notification();" class="close_noti">X</a></div>';
					if($('.listCont'+f).find('div.tabdb').html()!=null)
					{$('.listCont'+f).find('div.tabdb').eq(0).prepend(divmat);}
					else
					{
						$('.listCont11').find('div.tabdb').eq(0).prepend(divmat);
						$('.listCont11').css('display','block');
					}
				}
			}
		}
	}
	
}
function close_notification()
{
	$('.notification').slideUp();
	$('.notification').remove();
}
function saveSelectedData()
{
	var senObj = getSortedStackList();	 
	if(readCookie('nnmc'))
	{	
		if(senObj!=0)
		{
		var urltocall =iurl+'/rprocessing_aws.php?q_f=save';	 		
		$.ajax({	
				url:urltocall,
				type:"POST",
				data:{"data":senObj,"stack":stackE},
				cache:true,
				success:function(d)
				{
					if(d ==0 )
					{
						//alert('Your market radar has been customized as per your liking');
						//location.reload();
						checkDisplayMessage('Your market radar has been customized as per your liking',0);
						addedfl=0;
						var usridval = readCookie("nnmc");
						if(readCookie("nnmc")){
							localStorage.removeItem('radstk_'+usridval);
						}else{
							localStorage.removeItem('radstk');
						}
						
						//console.log('deleted local storage');
						//startFliper();
					//	$('.closePnl').trigger('click');
						//$('.closePnl2').trigger('click');
						
					}
				}
			});
		}
		else
		{
			//alert('Your stack is blank - You will need at least one item to save your custom stack');
			checkDisplayMessage('Your stack is blank - You will need at least one item to save your custom stack',2)
		}
	}
	else
	{
		checkSession(5);
	}
}
function cancelS()
{
	removeStackEntry();
	refreshSelectedArray();	
	$('.closePnl').trigger('click');
	$('.closePnl2').trigger('click');
}
function uncheckLi(sec,val,nm)
{
	
}
function listTabs(a)
{
	var pg=0;
	if(a==3)
	{
		lastVisitedCall('1');
	}
	/*else if(a==11)
	{
		 //searchLastV(1);
	}*/
	else if(a==6)
	{
		loadIndices('6bi',1);
	}
	else if(a==2)
	{
		loadIndices(2,1);
	}
	else if(a==5)
	{
		loadTopComm(5,1);$('#commd2t').css('display','none');
	}
	else if(a==11)
	{
		
		sechtab1(1);
	}
	 

	for(i=1; i<=11; i++)
	{
		
		$('.listCont' + i).hide();
		$('.tabn').hide();
		$('#lstabs' + i).removeClass('act');	
		$('.listCont' + a).find('.tab1s li a').removeClass('act');$('#thnkyumsg').css('display','none');
	}
	if(a==11)
	{
		$('#srch1').css('display','block');$('#srchhead').css('display','none');
	}
	
	if(a==7)
	{
		stkStats('bse_smst');
	}
	if(a==8)
	{
		comStats('mcxt');
	}
	if(a==9)
	{
		$('#srchTxtinpt_c').val('');$('#currd2t').css('display','none');
		loadSpotCur();
		//currencySearch();
	}
	
	if(a==10)
	{
		fnoStats();
	}
		if(a!=4 && a!=1)
		{ 
		$('.listCont' + a).fadeIn(500);
		$('.listCont' + a).find('.tab1s li:first a').addClass('act');
		
			var gtVar=$('.listCont' + a).find('.tab1s li:first a').attr('href');
			$(gtVar).show();
		}
		$('#lstabs' + a).addClass('act');	
		if(a==4 || a==1)
		{
			checkSession(a);		 
		}
	
	
	
	/*$('.scroll-pane').jScrollPane(
		{verticalDragMinHeight: 32,
		verticalDragMaxHeight: 32
	});*/
}

function radar_setCookie(e, t, n) {
    var r = new Date;
    r.setDate(r.getDate() + n);
    var i = escape(t) + (n == null ? "" : "; expires=" + r.toUTCString()) + "; path=/; domain=.moneycontrol.com; ";
    document.cookie = e + "=" + i
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return false;
}
function AddnOw(sec,type,url)
{
	return reshtml ='No '+sec+' in your '+type+'  <a href="'+url+'" class="bl12nc"><strong>Add now</strong></a>';
}
function wtchH(d)
{
	$('.watch_login').html('');
	$('.watch_login').hide();
	var reshtml = '';
	if(watchvar==1)
	{
		 
		if($(d.stk).size() >0)
		reshtml = makeVHTML(d.stk,'watch_stk','stk');
		else
		reshtml =AddnOw('Stocks','Watchlist','https://www.moneycontrol.com/portfolio_new/add_stockswl_quick.php');

		
	}
	else if(watchvar==2)
	{
		if($(d.mf).size() >0)
		reshtml = makeVHTML(d.mf,'watch_mf','mf');
		else
		reshtml =AddnOw('Mutual Funds','Watchlist','https://www.moneycontrol.com/portfolio_new/add_mfwl_quick.php');
			 

	}
	else if(watchvar==3)
	{
		if($(d.commodity).size() >0)
			reshtml = makeVHTML(d.commodity,'watch_com','commodity');
		else
			reshtml =AddnOw('Commodities','Watchlist','https://www.moneycontrol.com/portfolio_new/add_comm_wl.php');
			 
	}
	else if(watchvar==4)
	{
		reshtml = makeVHTML(d.fut,'watch_fut','fut');
	}
//	console.log(d);

	$('#stks'+watchvar).html(reshtml);	 
	$('.listCont4').show();
	$('#watch_data').show();	 
	for(var f=1;f<=4;f++)
	{
		$('#stks'+f).hide();
		$('#stks'+f+'t').removeClass('act');
	}
	$('#stks'+watchvar+'t').addClass('act');
	$('#stks'+watchvar).show();
	$('#watch_data').show();
}

function loadWatchlistData(el,pgno)
{
	watchvar = el;pg= pgno;
	if(readCookie('nnmc'))
	{	 
		var ul = turl+'processing_aws.php?q_a=watch&rp='+watchvar+'&pg='+pgno;
		$.ajax({
		url:ul,
		type:"GET",
		dataType:"jsonp",
		cache:true,
		jsonpCallback:"wtchH",
		success:function(d)
			{
				
			}
		});
	}
	else
	{
		checkSession(4);
	}
}
function portfH(d)
{
	$('.port_login').html('');
	$('.port_login').hide();
	var reshtml = '';
	if(portvar==1)
	{
		if($(d.stk).size()>0)
			reshtml = makeVHTML(d.stk,'port_stk','stk');
		else
			reshtml = AddnOw('Stocks','Portfolio','https://www.moneycontrol.com/portfolio_new/add_stocks_multi.php');
	}
	else if(portvar==2)
	{
		if($(d.mf).size()>0)
		reshtml = makeVHTML(d.mf,'port_mf','mf');
		else
			reshtml = AddnOw('Mutual Funds','Portfolio','https://www.moneycontrol.com/portfolio_new/add_mf_multi.php');
	}
	else if(portvar==3)
	{
		if($(d.commodity).size()>0)
		reshtml = makeVHTML(d.commodity,'port_com','commodity');
		else
			reshtml = AddnOw('Commodities','Portfolio','https://www.moneycontrol.com/portfolio_new/add_spotcomm_multi.php');
	}
	else if(portvar==4)
	{
		 
		reshtml = makeVHTML(d.fut,'port_fut','fut');
	}

	$('#port'+portvar+'d').html(reshtml);	 
	$('.listCont1').show();
	$('#port_data').show();	 
	for(var f=1;f<=4;f++)
	{
		$('#port'+f+'d').hide();
		$('#port'+f+'t').removeClass('act');
	}
	$('#port'+portvar+'t').addClass('act');
	$('#port'+portvar+'d').show();
}

function loadPortFolioData(el,pgno)
{
	portvar = el;  
	pg =pgno;
	if(readCookie('nnmc'))
	{	 
		var ul = turl+'processing_aws.php?q_a=port&rp='+portvar+'&pg='+pgno;
		$.ajax({
		url:ul,
		type:"POST",
		dataType:"jsonp",
		cache:true,
		jsonpCallback:"portfH",
		success:function(d)
		{
			
		}
		});
	}
	else
	{
		checkSession(1);
	}
}
function checkSession(wdiv)
{
	if(readCookie('nnmc'))
	{
		if(wdiv == 4)
		{
			loadWatchlistData(1,1);
		}							
		else if(wdiv == 1)
		{
			loadPortFolioData(1,1);
		}
		else if(wdiv == 5)
		{
			saveSelectedData();			 
		}
		else if(wdiv == 11)
		{
			showWPStk(11,'wlst')
		}
		else if(wdiv == 12)
		{
			showWPStk(12,'plst')
		}
		else if(wdiv == 13)
		{
			showMktradar();
		}
		else if(wdiv == 14)
		{
			 saveTickerStat();
		}
	}
	else
	{
		 
		if(wdiv == 4)
		{	
			
			var loginStr = loginPData(4);	
			$('.listCont1 .port_login').html('');
			$('.listCont4 #watch_data').hide();
			$('.listCont4 .watch_login').html(loginStr);
			$('.listCont4, .watch_login').css('display','block');
		}							
		else if(wdiv == 1)
		{
			
			
			var loginStr = loginPData(1);	
			$('.listCont4 .watch_login').html('');
			$('.listCont1 #port_data').hide();
			$('.listCont1 .port_login').html(loginStr);
			$('.listCont1, .port_login').css('display','block');
			$('.listCont1').show();
		}
		else if(wdiv == 5)
		{
			for(i=1; i<=11; i++)
			{
			$('.listCont' + i).hide();
			$('.tabn').hide();
			$('#lstabs' + i).removeClass('act');	
			 
			}
			var loginStr = loginPData(5);	
			$('#log_regtbl').remove();
			$('.listCont1 .port_login').html(loginStr);
			$('.listCont1, .port_login').css('display','block');
			$('.listCont1').show();
		}
		
		else if(wdiv == 13 || wdiv == 12 || wdiv == 11)
		{
			$('#lastStock').addClass('port_login');
			//$('#lastStock').css('width','500px');
			
			
			
			var loginStr = loginPData(wdiv);	
			$('#lastStock').html(loginStr);
			 
			$('#lastStock').removeClass('content')
			$('#lastStock').css('display','block');
                        
                        $(".linkSignUp").click(function(){
                            $("#ifval").val("285px");
                            $("#myframe").attr('src',iframe_domain+'mclogin/?formname=register'+redirecturlval);
                        });
                        $(".linkSignIn").click(function(){
                            $("#ifval").val("495px");
                            $("#myframe").attr('src',iframe_domain+'mclogin/?d=2'+redirecturlval);
                        });
		}
		else if(wdiv == 14)
		{
			 var loginStr = loginPData(wdiv);
			$('#tkrSet').append('<div class="tbsCont prtf_bggry PA10 MT10"><div class="FL ML10">'+loginStr+'</div><div class="FR MR10 MT20"><img src="https://img.moneycontrol.co.in/images/mcradar/member_priv_ticker.jpg"></div><div class="CL"></div>');
			 
		}
	}
}
function signinRadar(frm,secLg)
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
		 
		if($('form[name="'+frm+'"] input[id="keepsignin_social"]').prop('checked')) {
			keepmesignedin =1;
		}
		$.post(login_api,{
			sectionid:"MKT_RADAR",
			keep_signed:keepmesignedin,
			username:f_idval,
			password:SHA1(f_fwdval),
			sh:"1"
		}, function(data) 
		{	
			if(data=='alldone')
			{
				 
				if(frm == 'sgradLgfrm')
				{
					 if(secLg == 1)
					{
						loadPortFolioData(1,1);
					}
					else if(secLg == 4)
					{
						loadWatchlistData(1,1);
					}
					else if(secLg == 11)
					{
						showWPStk(11,'wlst')
					}
					else if(secLg == 12)
					{
						showWPStk(12,'plst')
					}
					else if(secLg == 13)
					{
						showMktradar(1);
					}
					else if(secLg == 14)
					{
						 saveTickerStat();
					}
					else if(secLg == 5)
					{
						saveSelectedData();//loadPortFolioData(1);
					}
					else if(secLg == 15)
					{
						addEdit_portfolio('addPortfolio',1); 
					}
				}
				else
				{
					 
				}
			}
			else
			{
				alert('Invalid Username/Password');
				return false;
			}
		}); 
	}
	return false;
}
function sdHndlr(d)
{
	$.each(d,function(i,v){
		
		if(i=='stks')
		{
			$('#srcgsnd1').html(makeVHTML(d.stks,'search_stk','stk'));
		}
		if(i=='mf')
		{
			$('#srcgsnd1').html(makeVHTML(d.mf,'search_mf','mf'));
		}
		if(i=='commodity')
		{
			$('#srcgsnd1').html(makeVHTML(d.commodity,'search_com','commodity'));
		}
		if(i=='fut')
		{
			$('#srcgsnd1').html(makeVHTML(d.fut,'search_fut','fut'));
		}
	});
	searchResults();
}
function searchData(hndlr,typ,pgno)
{
	pg =pgno;sidPg=pgno;
	var inpval =''; 
	if(hndlr =='tpLstv')
	{
		inpval = $('#txtlvserch').val();
		if(inpval=='Type Here'){
			$('#txtlvserch').focus();
			inpval='';
		}
	}
	else
	{
		inpval = $('#srchnnn .txtbxmktrad').val();
		
	}
	if(inpval.length> 2 && $.trim(inpval)!="")
	{
		if(typ==0)
		{
			var drpty= $('#srchdrphead').html(); 
			if(drpty =='STOCK')typ=1;
			if(drpty =='MUTUAL FUND')typ=2;
			if(drpty =='COMMODITY')typ=3;
			if(drpty =='FUTURES')typ=4;
		}
		var calUrl =turl+'processing_aws.php?q_a=search&inpval='+encodeURIComponent(inpval)+'&typ='+typ+'&pg='+pgno;
		$.ajax({
		url:calUrl,
		type:"GET",
		cache:true,
		dataType:"jsonp",
		jsonpCallback:hndlr,
		success:function(d){
		}
		});
	}
	else
	{
		alert("Please enter minimum 3 characters for search");
	}
}
function sechtab1(a)
{
	 //searchLastV(a);
	 

for(i=1; i<=5; i++)
	{
	$('#srcgfst' + i).hide();
	$('#srchclfst' + i).removeClass('act');
	}
	$('#srcgfst' + a).fadeIn(500);
	$('#srchclfst' + a).addClass('act');$('input[name=main_search_txt]').val('');
	$('#srch1').css('display','block');
}
function loginPData(params)
{
	$('#log_regtbl').remove();	
	/*var strBuild = '<table id="log_regtbl" class="MT20"  border="0" cellspacing="0" cellpadding="0"><tr><td align="left" valign="top" width="233" class="brdrht"><p class="bd18ns">Already a user! Sign In</p><div class="MT25 portlogbtmlin PB40"><div class="MR15"><form name="sgradLgfrm" method="POST" onsubmit="return signinRadar(\'sgradLgfrm\','+params+')"><div class="signtxtbg"><input onfocus="if($(this).val()==\'Username\')$(this).val(\'\')" type="text" value="Username" class="signtxtfld" name="login_id" id="signuname"></div><div class="signtxtbg MT12 PR"><input type="password" value="" class="signtxtfld" name="password" id="signpwd"></div><div><div class="MT10 TAR FL chktxtnb"><input type="checkbox" title="Keeps you signed in for a month unless you Sign out" style="padding-top:5px;" value="1" id="keepsignin_social" name="keepsignin"> Keep me signed in </div><div class="MT10 TAR FR"><input type="submit" class="btnsigns" value="" name="cmdsubmit"></div><div class="CL"></div><div class="MT10 FR"><a class="blit12" href="http://www3.in.com/sso/forgotpwd.php?ref=MC" target="_new" >Forgot password?</a></div></div><div class="CL"></div></form></div></div><!--<div class="socialsinmktrd"><p>connect with</p><div class="MT7"> <a class="socising_twt1" onclick="twitterLoginPopupMC(\'\');" href="javascript:;"></a> <a onclick="openFacebookPopupMC(\'\');" class="socising_fb1" href="javascript:;"></a> <a class="socising_gplus1" onclick="googleLoginPopupMC(\'\');" href="javascript:;"></a> <a class="yahoo_ico1" onclick="yahooLoginPopupMC(\'\');" href="javascript:;"></a> </div>--></div></td><td align="left" valign="top"><div class="rhtcol"><div id="regi_pad"><form onsubmit="return mcRegistrationCommon(\'frmradSign\');" method="POST" name="frmradSign"><input type="hidden" name="src" value="MC"><input type="hidden" name="registration" value="newreg"><p class="regtptx"><strong>New user - </strong> Sign up now</p><p class="redit13">Its easy and FREE! </p><div class="MT12 PR"><input type="text" value="" class="status txtbox_lableNXT idleField" onblur="checkAvailableU(\'frmradSign\');" onblur=" if($(this).val().length==0)$(this).next(\'label\').show()" onfocus="$(this).next(\'label\').hide()" name="reguname"><label  style="display: block;" class="txtbox_lable">Username</label></div><div id="autosugg"><div class="userchar MT5">Username should be atleast 4 characters</div><div class="redesrr MT3 errDIv"></div><div class="suggidbox" style="display:none" id="suggidbox"></div></div><div class="MT12 PR"><input type="password" value="" class="status txtbox_lableNXT idleField" name="regPwd"><label style="display: block;" class="txtbox_lable">Password</label></div>				<div class="userchar MT5" style="width:242px;">Password should be 8 or more characters, atleast 1 number, 1 symbol (except #) & 1 upper case letter</div><div class="MT12 PR"><input type="password" value="" class="status txtbox_lableNXT idleField" name="regConfPwd"><label style="display: block;" class="txtbox_lable">Confirm Password</label></div><div class="MT12 PR"><input type="text" value="" class="status txtbox_lableNXT idleField" name="regemail"><label style="display: block;" class="txtbox_lable">Email</label></div><div class="MT7 MR10 PB10"><input type="submit" class="btnregs" value="" name="cmdregSubmit"></div><div class="CL"></div></form></div></div><div class="CL"></div></td></tr></table>';*/
	var strBuild = '<div class="log_commonbx log_radarbx">'+
										'<div class="clearfix">'+
											'<div class="radr_leftlog">'+
												'<div class="rdr_loginwrap">'+
													'<p class="log_weltxt"><em>Welcome,</em> Login to access your <strong>Portfolio</strong></p>'+
													'<p class="MT10"><a href="javascript:;" title="Sign in" class="linkSignIn login_btnacom"  onclick="mclogincall(\'signin\')"><strong>Login</strong></a></p>'+
													'<p class="newto MT20">New to Moneycontrol? <a href="javascript:;" class="signup_linkop linkSignUp" onclick="mclogincall(\'register\')">Sign Up</a></p>'+
												'</div>'+
											'</div>'+
											'<div class="rdr_rightlog">'+
												'<ul class="clearfix mc_rdrprvlist">'+
													'<li>'+
														'<p class="radar_titlelog"><span class="radar_ic"></span>moneycontrol <span class="yltxt_rdr">member privileges</span></p>'+
													'</li>'+
													'<li>'+
														'<p><span class="yel_lable">PORTFOLIO</span></p>'+
														'<p class="MT5"><em><strong>FREE access to Portfolio Manager,</strong> where you can track your investments, cashflow and assets with <strong class="normtxt">LIVE</strong> price updates.</em></p>'+
													'</li>'+
													'<li>'+
														'<p><span class="yel_lable">WATCHLIST</span></p>'+
														'<p class="MT5"><em><strong>Stay updated</strong> on stocks, mutual funds, commodities, futures and currencies you want to track closely with our Watchlist.</em></p>'+
													'</li>'+
												'</ul>'+
											'</div>'+
										'</div>'+
									'</div>';

	return strBuild;
}
function loadEditRadarHTML()
{
	 
	var stats= '';
	stats= '<li onclick="listTabs(9);" id="lstabs9"><a href="javascript:;">Currency</a></li><li onclick="listTabs(7);" id="lstabs7"><a href="javascript:;">Stock Market Stats</a></li> <li onclick="listTabs(8);" id="lstabs8"><a href="javascript:;">Commodity Stats</a></li> <li onclick="listTabs(10);" id="lstabs10"><a href="javascript:;">Future Stats</a></li>';

	
	var tbtxt='<span style="font-size:14px"> - Choose what you want to display on your stack </span>';

	var strHT ='<span class="arwht"></span><div><div class="edtrf"><div class="w22b" id="custmizeStk">You are customizing Stack 1 <span>&raquo;</span></div><div class="whtbgl MT15"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td align="left" valign="top" width="224"><div class="lftcold"><ul> <li onclick="listTabs(11);" id="lstabs11"><div class="srchbv"><a href="javascript:;">Search</a></div></li> <li onclick="listTabs(6);" id="lstabs6"><a href="javascript:;">Indian Indices</a></li> <li onclick="listTabs(2);" id="lstabs2"><a href="javascript:;">Global Indices</a></li> <li onclick="listTabs(3);" id="lstabs3"><a href="javascript:;">Last Visited</a></li> <li onclick="listTabs(4);" id="lstabs4"><a href="javascript:;">Watchlist</a><li onclick="listTabs(1);" id="lstabs1"><a href="javascript:;">Portfolio</a></li></li> <li onclick="listTabs(5);" id="lstabs5"><a href="javascript:;">Commodity</a></li> '+stats+'</ul></div></td><td align="left" valign="top">   <div class="listCont6" style="display:none;"> <p class="bd20 MT10">Indian Indices'+tbtxt+'</p>   <div class="tabdb"> <ul class="tab1s"> <li><a onclick="showIndIndices(\'brdind\')" href="javascript:;" id="brdindt">Broader Indices</a></li> <li><a onclick="showIndIndices(\'secind\')" href="javascript:;" id="secindt">Sectoral Indices</a></li></ul> <div class="tab1sCont"> <div class="tabsn"> <div class="tabn" id="brdind">  </div> <div class="tabn" id="secind">  </div></div> </div>   </div>   </div>   </div>   <div class="listCont2" style="display:none;">   <p class="bd20 MT10">Global Indices'+tbtxt+'</p>   <div class="tabdb"> <ul class="tab1s"> <li><a onclick="showGLBIndices(\'usmakt\')" href="javascript:;" id="usmaktt">US Markets</a></li> <li><a onclick="showGLBIndices(\'eromkt\')" href="javascript:;" id="eromktt">European Markets</a></li> <li><a onclick="showGLBIndices(\'asiamkt\')" href="javascript:;" id="asiamktt">Asian Markets</a></li> </ul> <div class="tab1sCont"> <div class="tabsn"> <div class="tabn" id="usmakt">  </div> <div class="tabn" id="eromkt">  </div> <div class="tabn" id="asiamkt">  </div> </div> </div>   </div>   </div>   <div class="listCont3" style="display:none;">   <p class="bd20 MT10">Last Visited'+tbtxt+'</p>   <div class="tabdb"> <ul class="tab1s"> <li><a onclick="lastVisitedCall(1)" href="javascript:;" id="stkx1t">Stocks</a></li> <li><a onclick="lastVisitedCall(2)" href="javascript:;" id="stkx2t">Mutual Funds</a></li> <li><a onclick="lastVisitedCall(3)" href="javascript:;" id="stkx3t">Commodities</a></li> </ul> <div class="tab1sCont"> <div class="tabsn"> <div class="tabn" id="stkx1">  </div> <div class="tabn" id="stkx2">  </div> <div class="tabn" id="stkx3">  </div> <div class="tabn" id="stkx4">  </div> </div> </div>   </div>   </div>   <div class="listCont4" style="display:none;">   <div class="watch_login" style="display:none;">   </div>   <div id="watch_data"  style="display:none;">   <div class="MT10"> <p class="bd20nol FL" >Watchlist'+tbtxt+'</p><div class="CL"></div>   </div>   <div class="tabdb"> <ul class="tab1s"> <li><a href="javascript:;" onclick="loadWatchlistData(1,1)" id="stks1t">Stocks</a></li> <li><a href="javascript:;" onclick="loadWatchlistData(2,1)" id="stks2t">Mutual Funds</a></li> <li><a href="javascript:;" onclick="loadWatchlistData(3,1)" id="stks3t">Commodities</a></li> </ul> <div class="tab1sCont"> <div class="tabsn">  <div class="tabn" id="stks1">   </div>  <div class="tabn" id="stks2">  </div>  <div class="tabn" id="stks3">  </div>  <div class="tabn" id="stks4">  </div> </div> </div>   </div>   </div>  </div>   <div class="listCont5" style="display:none;">   <p class="bd20 MT10">Commodity'+tbtxt+'</p>   <div class="MT12"> <div class="srchmktbg1"> <div><input name="srchTxtinpt" id="srchTxtinpt" type="text" class="txtbxmktrad" value=""/></div> <div class="CL"></div> </div> <div><a onclick="commoditySearch(1);" class="btnmktsrch" href="javascript:;"></a></div> <div class="CL"></div>   </div>   <div class="tabdb"> <ul class="tab1s"> <li><a onclick="shwComDis(1)" href="javascript:;" id="commd1t">Top Commodities</a></li><li><a href="javascript:;" onclick="shwComDis(2)"  id="commd2t" style="display:none">Search Results</a></li> </ul> <div class="tab1sCont1"> <div class="tabsn"> <div class="tabn" id="commd1">  </div> <div  class="tabn" id="commd2"> </div> </div> </div>   </div>   </div>   <div class="listCont1">   <div class="port_login" style="display:none;">   </div>   <div id="port_data" style="display:none;"> <p class="bd20 MT10">Portfolio'+tbtxt+'</p> <div class="tabdb"> <ul class="tab1s"> <li><a href="javascript:;" onclick="loadPortFolioData(1,1)" id="port1t">Stocks</a></li> <li><a href="javascript:;" onclick="loadPortFolioData(2,1)" id="port2t">Mutual Funds</a></li> <li><a href="javascript:;" onclick="loadPortFolioData(3,1)" id="port3t">Commodities</a></li> </ul> <div class="tab1sCont"> <div class="tabsn">  <div class="tabn" id="port1d"></div>  <div class="tabn" id="port2d"></div>  <div class="tabn" id="port3d"></div>  <div class="tabn" id="port4d"></div> </div> </div> </div>   </div></div> <div class="listCont7" style="display:none">   <p class="bd20 MT10">Stock Market Stats'+tbtxt+'</p><div class="tabdb"> <ul class="tab1s"> <li><a href="javascript:;" onclick="stkStats(\'bse_smst\');" id="bse_smst">BSE</a></li> <li><a onclick="stkStats(\'nse_smst\');"href="javascript:;" id="nse_smst">NSE</a></li> </ul> <div class="tab1sCont"> <div class="tabsn"> <div class="tabn" id="bse_sms">  </div> </div> </div>   </div>   </div>   <div class="listCont8" style="display:none">   <p class="bd20 MT10">Commodity Stats'+tbtxt+'</p>   <div class="tabdb"> <ul class="tab1s"> <li><a href="javascript:;" onclick="comStats(\'mcxt\');" id="mcxt">MCX</a></li> <li><a href="javascript:;" onclick="comStats(\'nselt\');"  id="nselt">NSEL</a></li> <li><a href="javascript:;" onclick="comStats(\'acet\');"  id="acet">ACE</a></li> </ul> <div class="tab1sCont"> <div class="tabsn"> <div class="tabn" id="mcx_stats">  </div> </div> </div>   </div>   </div>   <div class="listCont9" style="display:none;">   <p class="bd20 MT10">Currency'+tbtxt+'</p>   <div class="MT12"> <div class="srchmktbg1"> <div><input name="srchTxtinptC" id="srchTxtinpt_c" type="text" class="txtbxmktrad" value=""/></div> <div class="CL"></div> </div> <div><a onclick="currencySearch();" class="btnmktsrch" href="javascript:;"></a></div> <div class="CL"></div>   </div>   <div class="tabdb"> <ul class="tab1s"> <li><a onclick="shwCurDis(1)" href="javascript:;" id="currd1t">Spot Currencies</a></li><li><a href="javascript:;" onclick="shwCurDis(2)"  id="currd2t" style="display:none">Search Results</a></li> </ul> <div class="tab1sCont1"> <div class="tabsn"> <div class="tabn" id="currn1">  </div> <div  class="tabn" id="currn2"> </div> </div> </div>   </div>   </div>   <div class="listCont10" style="display:none">   <p class="bd20 MT10 PL5">Futures Stats'+tbtxt+'</p>  <div class="tabdb"><ul class="tab1s"> <li><a href="javascript:;" id="nset_fno">NSE</a></li></ul><div class="tab1sCont"> <div class="tabsn"><div class="tabn" id="fut_dvb"> </div> </div> </div> </div>   </div> <div class="listCont11" id="srchnnn" style="display:block;"> <div class="MT25 clearfix"><div class="srchmktbg1 PR"><input name="main_search_txt" type="text" class="txtbxmktrad" value="" style="width:220px;"/><div id="srchdrphead" class="FL srchmktBy">STOCK</div><a href="javascript:;" class="drpsrch" onclick="javascript:shdrpsrch();" onmouseout="javascript:hderpsrch();"></a><div class="CL"></div><div class="srchDD" id="srchDD" onmouseout="javascript:hderpsrch();" onmouseover="javascript:shdrpsrch();"> <span class="tarrow"></span><ul><li><a href="javascript:;">STOCK</a></li><li><a href="javascript:;">MUTUAL FUND</a></li><li><a href="javascript:;">COMMODITY</a></li><li class="lst"><a href="javascript:;">FUTURES</a></li></ul></div></div>	<div><a class="btnmktsrch" onclick="searchData(\'sdHndlr\',0,1);" href="javascript:;"></a></div><div class="CL"></div> </div>   <div class="tabdb"> <ul id="srchhead" class="tab1s"  style="display:none;" > <li><a onclick="searchResults()" id="srch2t">Search Results</a></li> </ul> <div class="tab1sCont2"> <div class="tabsn">   <div class="tabn" id="srch1"> <div class="custbg"><p class="title">You can now customize your<br />stacks as per your liking!</p><div class="MT15 poibull">			<ul><li>Select any item from the left side to be displayed on your stack.</li><li>Search and add any Stocks, MFs, Commodities to be displayed here</li><li>You can also choose to display your watchlist and portfolio here.</li><li>Moneycontrol has chosen a default set in each stack.</li>	</ul></div></div> </div><div id="thnkyumsg" class="thankm ML15"></div><div class="tabn" id="srch2"> <div class="tabdb">  <!--<div>  <ul class="tabsrch">   <li><a href="javascript:;" id="srchclsnd1" onclick="javascript:sechtab2(1);" class="act">Stocks</a></li>   <li><a href="javascript:;" id="srchclsnd2" onclick="javascript:sechtab2(2);">Mutual Funds</a></li>   <li><a href="javascript:;" id="srchclsnd3" onclick="javascript:sechtab2(3);">commodities</a></li>   <li><a href="javascript:;" id="srchclsnd4" onclick="javascript:sechtab2(4);">Future</a></li>  </ul>  <div class="CL"></div> </div>-->  <div id="srcgsnd1">  </div>  <div id="srcgsnd2" style="display:none;">  </div>  <div id="srcgsnd3" style="display:none;">  </div>  <div id="srcgsnd4" style="display:none;">  </div> </div> </div> </div> </div>   </div>   </div></td></tr>		</table></div></div><div class="whtbgr"><div class="ML10"><p class="w16b" id="stk_selection"></p> <div class="PT5 PR" style="z-index:1;">	<a value=1 id="gtdefSel" href="javascript:void(0);" class="bl11nc switchpop">View default stack settings</a><div id="switch_ds1" style="display:none;"><span class="arwdtop"></span><div id="switch_ds"><div class="swtch_back"></div><div id="deftitTxt" class="w13 UC ML5"><span class="arwdwn"></span></div><div id="defSelection" class="defSel"></div><div class="MT20 ML10"> <a class="bluebtndc" href="javascript:;" id="swdbtn" value="1">CONFIRM</a><a class="nobgdbtndc" onclick="$(\'#switch_ds1\').css(\'display\',\'none\')" href="javascript:;">CANCEL</a> </div><div class="CL"></div></div></div></div></div><div ><div class="MT12"><div class="ML10" id="selectedDiv"><div  class="scroll-pane"><ul class="sortable"> </ul> </div> </div> </div> <div class="MT20 ML20"> <a href="javascript:;" onclick="saveSelectedData();" class="bluebtn">SAVE</a><a href="javascript:;" onclick="cancelS();" class="nobgdbtn">CANCEL</a> </div><div class="CL"></div><div class="PA5 MT10"style="margin-top:5px;font-size:11px;color:white">*Drag the items above to rearrange order</div></div>';
	var pstr='';
	for(var i=1;i<=4;i++)
	{
		
		pstr+='<div class="mrdBox"> <a href="javascript:;" value="'+i+'" id="overClr-'+i+'" class="overClr">Customize this Stack</a>';
		pstr+=$('#elm'+i+' .moveBx:eq(0)').html();
		pstr+='</div>';
	}
	
	var extra='<div class="stockDsl overx" style="display: none;margin-left:26px;">'+pstr+'</div>';	 
	$('.bggrnd').html('<span id="stackNm" class="skcNo0" style="display: none;">Stack <b>1</b></span>		<span id="stackNm" class="skcNo1" >Stack <b>2</b></span>		<span id="stackNm" class="skcNo2" >Stack <b>3</b></span>		<span id="stackNm" class="skcNo3" style="display: none;">Stack <b>4</b></span>');
	$('.overx').remove();
	 
	$('#ovrl__y').html(extra);
	$('#editstk').html(strHT);
}
function currencySearch()
{
	
	var inpval = $('#srchTxtinpt_c').val();
	if(inpval.length<=0){inpval='rupee';$('#srchTxtinpt_c').val(inpval)}

	if(inpval.length>=3 && $.trim(inpval)!="")
	{
		var calUrl =turl+'processing_aws.php?q_a=search&inpval='+inpval+'&typ=7';
		$.ajax({
		url:calUrl,
		type:"GET",
		cache:true,
		dataType:"jsonp",
		jsonpCallback:"curHndlr",
		success:function(d){
		}
		});
	}
	else
	{
		alert("Please enter minimum 3 characters for search");$('#srchTxtinpt_c').focus();
	}

}
function curHndlr(d)
{
	$('#currn1').css('display','none');
	$('#currd1t').removeClass('act');
	$('#currd2t').addClass('act');
	$('#currd2t').show();
	 
	$.each(d,function(i,v){
		
		if(i=='cur')
		{
			$('#currn2').html(makeVHTML(d.cur,'search_currency','currency'));
		}
	});
	$('#currn2').show();
}
function shwCurDis(ee)
{
	for(var i=1;i<=2;i++)
	{
		$('#currd'+i+'t').removeClass('act');
		$('#currn'+i).hide();
	}
	$('#currd'+ee+'t').addClass('act');
	$('#currn'+ee).show();
}
function loadSpotCur(el)
{
	indSec =el;
	 
	var urltocall =iurl+'/rprocessing_aws.php?q_f=spotcur&q_a=7'; 
	$.ajax({	
			url:urltocall,
			type:"GET",
			dataType:"jsonp",
			jsonpCallback:"spthndlr",
			cache:true,
			success:function(d)
			{
				
			}
		});
}
function spthndlr(d)
{
	var reshtml = makeVHTML(d,'spotcur','currency');	 
	$('#currn1').html(reshtml);
	$('#currn1').show();
}
function comStats(el)
{
	$('#mcxt').removeClass('act');
	$('#nselt').removeClass('act');
	$('#acet').removeClass('act');
	$('#'+el).addClass('act');	 
	var optionArr=[];
	optionArr['mcxt']={"comstat":[{"icd":"ma_mcx", "nm":"MCX Most Active (5)"},{"icd":"tpl_mcx", "nm":"MCX Top Losers (5)"},{"icd":"tgl_mcx", "nm":"MCX Top gainers (5)"}]};
	optionArr['nselt']={"comstat":[{"icd":"ma_nsel", "nm":"NSEL Most Active (5)"},{"icd":"tpl_nsel", "nm":"NSEL Top Losers (5)"},{"icd":"tgl_nsel", "nm":"NSEL Top gainers (5)"}]}
	optionArr['acet']={"comstat":[{"icd":"ma_ace", "nm":"ACE Most Active (5)"},{"icd":"tpl_ace", "nm":"ACE Top Losers (5)"},{"icd":"tgl_ace", "nm":"ACE Top gainers (5)"}]}
	var sthtml = makeVHTML(optionArr[el].comstat,'comstat','comstat');

	$('#mcx_stats').html(sthtml);$('#mcx_stats').css('display','block');
}
 
function fnoStats()
{
	var optionArr=[];
	optionArr['nse']={"fnostat":[{"icd":"ma", "nm":"Most Active Futures (5)"},{"icd":"tpl", "nm":"Futures Top Losers (5)"},{"icd":"tgl", "nm":"Futures Top gainers (5)"}]};
	var sthtml = makeVHTML(optionArr['nse'].fnostat,'futstat','futstat');
	$('#fut_dvb').html(sthtml);$('#fut_dvb').css('display','block');
}
function stkStats(el)
{
	$('#bse_smst').removeClass('act');
	$('#nse_smst').removeClass('act');
	$('#'+el).addClass('act');	 
	var optionArr=[];
	optionArr['bse_smst']={"sstat": [{"icd":"ma_b", "nm":"BSE Stocks Most Active (5)"},{"icd":"tpg_b","nm":"BSE Stocks Top gainers (5)"},{"icd":"tpl_b", "nm":"BSE Stocks Top Losers (5)"}/*,{"icd":"52wkhigh_b", "nm":"BSE Stocks 52-week highs (5)"},{"icd":"52wlow_b", "nm":"BSE Stocks 52-week lows (5)"}*/]} ;	
	optionArr['nse_smst']={"sstat": [{"icd":"ma_n", "nm":"NSE Stocks Most Active (5)"},{"icd":"tpl_n", "nm":"NSE Stocks Top Losers (5)"},{"icd":"tpg_n","nm":"NSE Stocks Top gainers (5)"}/*,{"icd":"52wkhigh_n", "nm":"NSE Stocks 52-week highs (5)"},{"icd":"52wklow_n", "nm":"NSE Stocks 52-week lows (5)"}*/]} ;	
	
	var sthtml = makeVHTML(optionArr[el].sstat,'sstat','sstat');
	$('#bse_sms').html(sthtml);
	//$('#bse_sms').css('display','block');
	$('#bse_sms').css('display','block');
	 
}
function loadEditTickerHTML()
{
	if(readCookie('nnmc'))
	{
		var url= turl+'processing_aws.php?q_a=Tkval';
		$.ajax({
		url:url,
		type:"GET",
		dataType:"jsonp",
		cache:true,
		jsonpCallback:"tickHT",
		success:function()
			{

			}
		});
	}
	else
	{
		tickHT('');
	}
}
function tickHT(d)
{
	var optc1='checked';var optc3='';var optc2='checked';
	if(d!='')
	{
		if(d.opt1==1)
			optc1='checked';
		else
			optc1='';

		if(d.opt2==1)
			optc2='checked';
		else
			optc2='';

		if(d.opt3==1)
			optc3='checked';
		else
			optc3='';

	}
	//<!--<div class="clearfix FL" style="width:160px;"><div class="FL PR10"><input '+optc3+' value="1" name="chktkrdt3" type="checkbox" /></div><div class="FL b_13">News on your stocks</div></div>-->

	var editStr ='<span class="arwht"></span><div><div class="FL w22b wdt574">You are customizing Ticker</div>				<!--<div class="FR"><a class="slvbtn" href="javascript:;">switch to default</a></div>--><div class="CL"></div>			</div><div class="MT15"><div class="whtbgl PA30"><div class="FL"><div class="clearfix PB20 FL" style="width:160px;"><div class="FL PR10"><input '+optc1+' name="chktkrdt1" value="1" type="checkbox" /></div>		<div class="FL b_13">Stocks in News</div></div><div class="clearfix PB20 FL" style="width:160px;">		<div class="FL PR10"><input  value="1" name="chktkrdt2" '+optc2+' type="checkbox" /></div><div class="FL b_13">Top News</div></div><div class="clearfix FL" style="width:160px;"><div class="FL PR10"><input '+optc3+' value="1" name="chktkrdt3" type="checkbox" /></div><div class="FL b_13">News on your stocks</div></div> <div class="CL"></div></div><div class="FR"><a class="blackbtn" onclick="saveTickerStat();" id="saveTickerDta" href="javascript:;">SAVE</a> <a class="blkbtn" onclick="$(\'.closePnl2\').trigger(\'click\');" href="javascript:;">CANCEL</a></div><div class="CL"></div></div><div class="CL"></div></div>';

	$('#tkrSet').html(editStr);
}

function sechtab2(a)
{
for(i=1; i<=5; i++)
	{
	$('#srcgsnd' + i).hide();
	$('#srchclsnd' + i).removeClass('act');
	}
	$('#srcgsnd' + a).fadeIn(500);
	$('#srchclsnd' + a).addClass('act');	
}
function LstHndlr(d)
{
	 
	$('.ttp').remove();
	selectionArray.length=0;
	var totCnt=0;
	if(d!="")
	{
		var ind=0;var glb=0;var sst=0;var cst=0;var fst=0;
		$.each(d,function(i,v){
			$.each(v,function(a,b)
			{
				addtoDiv(b.nm+'#'+b.icd+'#'+i);
				if(i=='indices_i')ind++;if(i=='sstat')sst++;if(i=='fnostat')fst++;
				if(i=='indices_g')glb++;if(i=='comstat')cst++;

				totCnt++;
			});			
		});
	}
	else
	{
		refreshSelectedArray();
	}
	$('#stk_selection').html('Stack '+stackE+' Selection ('+totCnt+')');
	
}
function addApnndCount(cnt,el)
{
	var retXt='';
	if(el == 1) //update
	{
		retXt = cnt+'<p class="tooladd" style="display: none;"></p>';
	}
	else
	{
		retXt = '<span class="ttp ML3">'+cnt+'<p class="tooladd" style="display: none;"></p></span>';
	}
	return retXt;
}
function shwComDis(el)
{
	for(var i=1;i<=2;i++)
	{
		$('#commd'+i+'t').removeClass('act');
		$('#commd'+i).hide();
	}
	$('#commd'+el+'t').addClass('act');
	$('#commd'+el).show();
}
function commoditySearch(elp)
{
	pg=elp
	var inpval = $('#srchTxtinpt').val();
	if(inpval.length> 0 && $.trim(inpval)!="")
	{
		var calUrl =turl+'processing_aws.php?q_a=search&inpval='+inpval+'&typ=3&pg='+pg;
		$.ajax({
		url:calUrl,
		type:"GET",
		dataType:"jsonp",
		jsonpCallback:"comHndlr",
		success:function(d){
		}
		});
	}
}
function comHndlr(d)
{
	$('#commd1').hide();
	$('#commd1t').removeClass('act');
	$('#commd2t').addClass('act');
	$('#commd2t').show();
	$.each(d,function(i,v){
		if(i=='commodity')
		{
			$('#commd2').html(makeVHTML(d.commodity,'search_tcom','commodity'));
		}
	});
	$('#commd2').show();
	
}
function initLddata(el)
{
		var calUrl =turl+'processing_aws.php?q_a=stackList&sid='+el;
		$.ajax({
			url:calUrl,
			type:"GET",
			cache:true,
			dataType:"jsonp",
			jsonpCallback:"LstHndlr",
			success:function(d){
			}
		});
}
function portdata(){
	document.getElementById('port_login').style.display = 'none';
	document.getElementById('port_data').style.display = 'block';	
}
function shdrpsrch(){
	document.getElementById('srchDD').style.display = 'block';
}
function hderpsrch(){
	document.getElementById('srchDD').style.display = 'none';
}

function showstack(a)
{
for(i=1; i<=6; i++)
	{
	$('#editstk' + i).hide();
	}
	$('#editstk' + a).fadeIn(500);	
}
 
$(document).ready(function () {
 
$('#marketRadar').css('display','block');
$('#srchDD ul li a').live('click',function(){
	$('#srchdrphead').html($(this).text());
	$('#srchDD').hide();
});

$( ".sortable" ).sortable();
$( ".sortable" ).disableSelection();
	//loadTickerData();
	//setInterval("loadTickerData()", 10000);
	$('.lvvalues').live('click',function(){
		var selData = $(this).next('span').html()+'#'+$(this).attr('value')+"#"+$(this).attr('sec');
		if($(this).attr('checked'))
		{
						
			addtoDiv(selData);
			addedfl=1;
			$(this).parent('li').addClass('lichk');
				
		}
		else
		{
			 
			$(this).parent('li').removeClass('lichk');
			uncheckLi($(this).attr('sec'),$(this).attr('value'),$(this).next('span').html())
			removeFromDiv(selData,1);
			$('.selectall').attr('checked',false);
			
		}
		 
	});
	$('.sidevalues').live('click',function(){
		var ttmm = $(this).next('span').html().replace(/ /g,".")+'_'+$(this).attr('value');
		if($(this).attr('checked'))
		{			
			if(addtoSideList(ttmm))
			{
				$(this).parent('li').addClass('lichk');				
			}
			else
			{
				$(this).attr('checked',false)
			}
		}
		else
		{
			$(this).parent('li').removeClass('lichk');
			removeFromDiv(ttmm,2);
			$('.selectall').attr('checked',false);
		}
	});
	$('#yourImg').click(function(e){
		var x = e.pageX - e.target.offsetLeft,
		y = e.pageY - e.target.offsetTop;
	});
	
	$('.txtbox_lable').live('click',function(){
		$(this).hide();$(this).prev('input').focus();
	});

	$('.closevv').live('click',function(){
			var elths= $(this).parent('li').find('input:hidden').val(); 		 
			 
			removeFromDiv(elths,1);
			$(this).parent('li').fadeOut('slow',function(){
			$(this).remove();
			});
		 
	});
	$('.selectall').live('click',function(){ 
		var frmd =  $(this).attr('value');
		if($(this).attr('checked'))
		{
			
			$('ul.'+frmd+'-ullist li').addClass('lichk');
			$('ul.'+frmd+'-ullist li input:checkbox').each(function(i,v)
			{
				$(this).attr('checked',true);
				var selData = $(this).next('span').html()+'#'+$(this).attr('value')+"#"+$(this).attr('sec');
				addtoDiv(selData);
			});
		}
		else
		{
			$('ul.'+frmd+'-ullist li').removeClass('lichk');
			$('ul.'+frmd+'-ullist li input:checkbox').each(function(i,v)
			{
				$(this).attr('checked',false);
				var selData = $(this).next('span').html()+'#'+$(this).attr('value')+"#"+$(this).attr('sec');
				removeFromDiv(selData,1);				
			});
			refreshSelectedArray();
		}
	});

	$(window).bind('blur', function(){
		focusinval = 1;
        win_focblur_flg_new = 0; 
		stopTicker();
		if(m_pg ==2)
		f_out=1;  
    });
    $(window).bind('focus', function(){
    	focusinval = 0;
         win_focblur_flg_new = 1;
		 startTicker();
		 if(m_pg ==2)f_out=0;   
		 if(timerc==1 && m_pg==2)
			{
				
				//loadStacks('LTD',0);
				loadStacks('cbr',1);
			}
    });     
    $(document).bind('focusout', function(){
    	focusinval = 1;
        win_focblur_flg_new = 0;  
		stopTicker();if(m_pg==2)f_out=1;  
    });
    $(document).bind('focusin', function(){
    	focusinval = 0;
       win_focblur_flg_new = 1; 
	   startTicker();
	   if(m_pg==2)f_out=0;  
	   if(timerc==1 && m_pg==2)
		{  
			//loadStacks('LTD',0);
			loadStacks('cbr',1);
		}	 
    });	
   	
	
	
	//####setInterval("loadStacks('LTD',0)", callTimeout);
	
	
	$('.marketRdr .tbs li').click(function(){
		$('.marketRdr .tbs li').removeClass('act');
		$('.marketRdr .tbs li').removeClass('prvs');
		$('.marketRdr .tbsCont .content').hide();
		$(this).addClass('act');
		$(this).next().addClass('prvs');
		var gtValue = $(this).find('a').attr('href');
		$(gtValue).show();
		return false;
	});
	$('.chkMrkRdr a.icon').click(function(){
		$('.htip').hide();	 
		$('.whtBx ul.tbs li').removeClass('act');
		$(this).toggleClass('act');
		//$(this).next().slideToggle('fast');
		if(($(this).hasClass('act')))
		{
			$('.marketRdr').slideDown();
			showMktradar();
			resizeWindow(5,0);
			
		}
		else
		{
			resizeWindow(0,2);
			 $('.marketRdr').slideUp();
		}

		return false;
	}); 
	$('input[name=sidewv]').live('click',function(v){ 
		if($(this).attr('checked'))
		{
			 
		}
		else
		{
			$(this).parent('li').fadeOut();
			//http://www.moneycontrol.com/watchlist1/add_stocks.php?section_main=watchlist&fact=del&sc_id=DC01
			var sc = $(this).attr('value').split('_');
			var ajx_path = "/watchlist1/add_stocks.php?section_main=watchlist&fact=del&sc_id="+escape(sc[1]);	 
			$.get(ajx_path, function(data) 			{	  
				
			});
		}
	});
	$('#snws,#slvstd,#spw,#spo').click(function(){			 
		$('.marketRdr').css('display','block');	 
		$('.chkMrkRdr a.icon').addClass('act');
		$('.marketRdr ul.tbs li').eq($(this).attr('value')).find('a').click();
	});
	 
	$('.chkMrkRdr').mouseenter(function(){
		$(this).find('.MrkRdr_tt').fadeIn('fast');	
	 	
	});
	$('.custmzPop_close').click(function(){
		$('.MrkRdr_tt').css('display','none');
	});
	$('.editRadar a.cust').click(function(){
		$('.editRadar .MrkRdr_tt').fadeIn('fast'); 
	});

	$('.chkMrkRdr').mouseleave(function(){
		$(this).find('.MrkRdr_tt').fadeOut();	
	 	
	});

	$('#sChksall').live('click',function(){
		if($(this).attr('checked'))
		{
			$('#selectedDiv .scroll-pane ul li').each(function(i,v){
				$(this).find('input[type="checkbox"]').attr('checked',true);
				//addtoDiv($(this).find('input[type="checkbox"]').attr('value'));
			});
		}
		else
		{
			$('#selectedDiv .scroll-pane ul li').each(function(i,v){
				$(this).find('input[type="checkbox"]').attr('checked',false);
				var selectionArray = new Array();
				var thisit=$(this).find('input[type="checkbox"]').attr('value');
				//thisit=thisit.replace('&','amp');
				//removeFromDiv(thisit,1);
				$('#selectedDiv ul li').fadeOut();
				$('.mstactdvv ul li').removeClass('lichk');
					$('.mstactdvv ul li .lvvalues').attr('checked',false);
			});

		}
	});
	 
	 
	$('#editDD').live('blur',function(){$('.editRadar .editDD').toggle();})

	$('.editRadar span.icon').click(function(){ 
		resizeWindow(1,0);$('.htip').hide();
		$('.editRadar .editDD').toggle();
		return false;
	});
	$('.editRadar .editDD li').click(function(){
		$('.editRadar .editDD').hide();	
	});
	/*$('.editDD .edtRadar').click(function(){
		stopFliper();addedfl=0;
		resizeWindow(2,0);
		stopTicker();
		loadEditRadarHTML();
		$('.radarBack1, .overx, .closePnl, #editstk, #stackNm').show();
		$('.overClr:first, .marketRdr').css('display','none');
		$('.icon').removeClass('act');
		listTabs(11);
		initLddata(1);
	});*/
	
	$('input[name="chkbxSelected"]').live('click',function(i,v){
		if($(this).attr('checked') == 'checked')
		{
			selectionArray.push($(this).attr('value'));
		}
		else
		{
			
			var elg =$(this).attr('value').replace(/#/g,"_");
			elg =elg.replace(/ /g,"-");		
			elg =elg.replace(/&/g,"amp");		
			elg =elg.replace(/;/g,"semi");
			elg =elg.replace('$$',"dollar");
 
			$('li#'+elg).removeClass('lichk');
			$('li#'+elg).find('input:checkbox').attr('checked',false);
			// $(this).parents('li').fadeOut();
			removeFromDiv($(this).attr('value'),1);
		}
	});
	var nlDArr =new Array();
	$('#gtdefSel').live('click',function(){
//		var disap = new Array('Indian Indices','Commodities','Global Indices','');
		var stack = $(this).attr('value');
		//if(readCookie('nnmc'))
		{
				var purl=turl+'processing_aws.php?q_a=defList&stack='+stack;
				$.ajax({
					url:purl,
					type:"GET",	
					dataType:"jsonp",
					cache:true,
					jsonpCallback:"ldDfList",
					timeout:6000,			
					success:function(d){
					 nlDArr =d;
						$('.swtch_back').html('Switch back to the<br> default stack '+stack+' setting?');
						$('#deftitTxt').html('');
					}
				});
				$('#switch_ds').css('display','block');	
		}
	}); 
	$('#swdbtn').live('click',function(){

		var stack = $(this).attr('value');
		 
		if(readCookie('nnmc'))
		{		
			if(stack > 0 )
			{
				var ee =confirm("Are you sure you want to switch back to the default stack "+stack+" settings? Your radar customization will be reversed.");
				if(ee)
					{
					var purl=iurl+'/rprocessing_aws.php?q_f=st_d';
					$.ajax({
						url:purl,
						type:"POST",
						data:{stk:stack},
						success:function(d){
						 if(d== 0)
							 alert("You have switched back to the default stack "+stack+" settings. ");
							 stopFliper();
							 $('.closePnl').trigger('click');
						}
					});
				}
			}
		}
		else
		{
			// Not logged In Users replace selected list
			//ldDfList(nlDArr);.
			var items='';;
			var defArr = new Array('','indices_i','commodity','indices_g','stk');
			$.each(nlDArr,function(i,v){
				var seldat = v.nm+'#'+v.icd+'#'+defArr[stack];
				selectionArray.push(seldat);
				items+='<li><div class="FL w125">'+v.nm+'</div><div class="FR"><input name="chkbxSelected" type="checkbox" class="checkBox" checked value="'+seldat+'" /></div><div class="CL"></div></li>';
			});
			listTabs(11);
			$('#selectedDiv .scroll-pane ul.sortable').html(items);
			$('#switch_ds1').css('display','none');
		}
	});
	 

	$('#marketRadar .stockDsl.overx a.overClr').live('click',function(){

		if(selectionArray.length>0 && addedfl==1)
		{
			var e =confirm("You have not saved your selected items for stack "+ stackE +",Do you really want to continue?")
			 
			if(e)
			{
				if(!isNaN($(this).attr('value')))
				{
					stackE = $(this).attr('value');						
					 editStackOpen(stackE);
					
				}
			}
			else
			{
				//ev.stopImmediatePropagation();
				return false;
			}
		}
		else
		{
				if(!isNaN($(this).attr('value')))
				{
					$('.notification').remove(); 
					stackE = $(this).attr('value');	
					editStackOpen(stackE);
				}
		}
	});
	$('.closevvside').live('click',function(){
			var elths= $(this).parent('li').find('div').eq(0).attr('value'); 
			removeFromDiv(elths,2);
			$(this).parent('li').fadeOut('slow',function(){
			$(this).remove(); 
			});

	});
	$('.sidelvalues').live('click',function(){
		 
		if($(this).attr('checked'))
		{
		}
		else
			$(this).parent('li').fadeOut();
	});

	$('#marketRadar .closePnl').live('click',function(){
		resizeWindow(0,1);
		$('.radarBack1, .overx, .closePnl, .editcon, #stackNm').hide();
		$('#marketRadar .stockDsl.overx a.overClr').show();
		//startTicker();stopFliper();
		//startFliper(0);	
		location.reload(); //commented here
	});
	$('.edtTkr').click(function(){
		resizeWindow(3,0)
		loadEditTickerHTML();
		$('.btSec').addClass('actUp');
		$('.radarBack1, #tkrSet, .closePnl2').show();
		$('.marketRdr').hide();$('.custmzPop_close').trigger('click');
		$('.icon').removeClass('act');
		GAEventTracker('MARKETRADAR', 'CUSTOMIZE', 'TICKER');
	});
	
	$('#marketRadar .closePnl2').live('click',function(){	
		resizeWindow(0,1);
		$('.btSec').removeClass('actUp');
		$('.radarBack1, #tkrSet, #tkrSpeed, .closePnl2').hide();
		startTicker();
			
	});
	
	$(".tabn").map(function(){
		tabsn[ind++] = $(this).attr("id");
	})
	ind = 1;
	$(".tabn:not(:first)").hide();
	$(".tabn:first").show();
	$('#' + tabsn[0] + 't').addClass('act');
	
	 
	
	$('.indicess input:checkbox').change(function(){
        if($(this).is(":checked")) {
           $(this).parent().addClass("lichk");
        } 
		else {
           $(this).parent().removeClass("lichk");
        }
    });	 
	
});
function saveTickerStat()
{
    var d1 = $('input[name="chktkrdt1"]:checked').val();
	var d2 = $('input[name="chktkrdt2"]:checked').val();
	var d3 = $('input[name="chktkrdt3"]:checked').val();
	var url =iurl+'/rprocessing_aws.php?q_f=savetick';
	if(d1=='1' || d2==='1' || d3==='1')
	{
		if(readCookie('nnmc'))
		{
			$.ajax({
				url:url,
				type:"POST",
				data:{'opt1':d1,'opt2':d2,'opt3':d3},
				success:function(i)
				{
					alert('Your ticker has been customized as per your liking');
					location.reload();
					$('.closePnl2').trigger('click');
				}
			});	
		}
		else
		{
			checkSession(14);
		}
	}
	else
	{
		alert('Please select at least one option');
	} 
}
function editStackOpen(s)
{
	stopFliper();
	addedfl=0;
	resizeWindow(2,0);
	stopTicker();
	loadEditRadarHTML();
	$('.radarBack1, .overx, .closePnl, #editstk, #stackNm').show();
	var t=0;if(s == 0)t=1;else t=s-1;
	 
	$('.marketRdr').css('display','none');
	 
	$('.icon').removeClass('act');
	listTabs(11); 
	stackE = s;
	removeStackEntry();
	$('#swdbtn').attr('value',stackE);
	$('#gtdefSel').attr('value',stackE);					
	refreshSelectedArray();
	initLddata(stackE);
	var nnm ='';
	if(readCookie('nnmc'))
	{
		nnm	= readCookie('nnmc');
		nnm = nnm.replace('+',' ')
	}
	var disTxt ='You are customizing Stack '+stackE+' <span>&raquo;</span><div style="font-size:12px;color:#fff"> - Choose from the options below to change what you want to see on the stack</div>'
	if(readCookie('nnmc'))
	{
	nnm	= readCookie('nnmc');
	nnm = nnm.replace('+'," ");
	//nnm = nnm.replace(/([\+\])/mg, " ");
	disTxt =nnm+', '+disTxt;
	}
	$('#custmizeStk').html(disTxt);
	$('#switch_ds1').css('display','none');
	//$('#stk_selection').html('Stack'+stackE+' Selection');
	$('.custmzPop_close').trigger('click');
	$('#marketRadar .stockDsl.overx a.overClr, #editstk, #stackNm').show();
	var crntPrtOff = $('#marketRadar').offset().left;
	var crntOff = $('#overClr-'+s).parent().offset().left;
	var crntOff2 = crntOff-45;$('#custmizeStk').html(disTxt);
	$('#editstk .arwht').css('left',crntOff2-crntPrtOff);
	$('#overClr-'+s).css('display','none');
	GAEventTracker('MARKETRADAR', 'CUSTOMIZE', 'STACK'+stackE);
}
var curStkD=new Array();
function ldDfList(cb)
{
	curStkD =cb;
   var txt='<div><ul>';
	$.each(cb,function(i,v){
		txt+='<li><a style="cursor:default">'+v.nm+'</a></li>';
	});
	txt+='</ul></div>';
	
	$('#defSelection').html(txt);
	$('#switch_ds1').css('display','block');
}
function resizeWindow(ds,ex)
{
	if(m_pg==1)
	{
		var w=980;var h=600;
		if(ds==1)
		{	
			if(ex==0)
			{
				w=980;h=210;
			}
			if(ex==1)
			{
				w=980;h=30;
			}
		}
		if(ds==2)
		{
			w=980;h=620;
		}
		if(ds==5)
		{
			w=980;h=650;
		}
		if(ds==3 || ds==4)
		{
			w=980;h=380;
		}
		if(ds==0)
		{ 
			w=980;h=150;
		}
		window.resizeTo(w,h);
	}
}
function initWebticker(speed)
{
	var rss= 'https://indices.moneycontrol.co.in/sensex_nifty/radtkr.json?v='+CURR_STR_DATE;
	if(readCookie('nnmc'))
	{
		//rss = turl+'processing.php?q_a=tic';
	}
	$("#stockTicker").webTicker({duplicate:false, speed: speed, direction: 'left', rssurl:rss,rssfrequency:3,startEmpty:true, hoverpause:true});	
	
}
 /*
function loadTickData()
{
	var rss= 'http://indices.moneycontrol.co.in/sensex_nifty/radtkr.json';
		if(readCookie('nnmc'))
		{
			rss = turl+'processing.php?q_a=tic';
		}
		$.ajax({
		url:rss,
		type:"GET",
		dataType:"jsonp",
		cache:true,
		jsonpCallback:"tickerdat",
		timeout:6000,					
		success:function(callbk)
		{ 

		}});	
}
*/
var tickAr = new Array();

function tickerdat(d)
{
	tickAr = d;
	ticker_dat();
}
function ticker_dat()
{
	
	var finalStr = '';
	$.each(tickAr,function(i,v)
	{
 
		if(i=='tpn')
		{
			finalStr= '<li class="titleSec ML5">Top News >></li>';
			 
			$.each(v,function(a,b)
			{
				 
				var link = b.link;
				var title = b.title;
				finalStr+='<li><a class="bl_12 MR2"  target="_new" href="'+link+'">'+title+'</a>';
				if(a < v.length - 1 )
				{
					finalStr+='<span class="devider"></span>';
				}
				finalStr+='</li>';	
				if(a > 0 && a%5==0)
				{
					 
					var tpnAd = $.trim($('#tckr_ad_rad_d').html());
					if(tpnAd.length>0)
					{
						finalStr+='<li style="padding-top:1px;">'+tpnAd+'</li>';
					}
				}
			});
		}
		if(i=='stw')
		{
			finalStr+= '<li class="titleSec ML5">Stocks in News >></li>';
			$.each(v,function(c,d)
			{
				var link = d.link;
				var title = d.title;
				var cp = d.cp;
				var chg=d.chg;
				var chgc='grArrow2';var chgcc='gr_13';
				if(chg < 0)
				{
					chgc= 'rdArrow2';chgcc='r_13';
				}
				finalStr+='<li><div class="stkDtls FL"> <a target="_new" href="'+link+'" class="bl_12 MR2"><b>'+title+'</b></a> <span class="gd_13"><strong>'+cp+'</strong></span> <span class="'+chgc+' ML2 MR2"></span> <span class="'+chgcc+' MR5">'+chg+'</span><span>'+d.text+'</span></div>';
				if(c < v.length - 1 )
				{
					finalStr+='<span class="devider"></span>';
				}
				finalStr+='</li>';
				if(c>0 && c%5==0)
				{
					var tpnAd = $.trim($('#tckr_ad_rad_d').html());
					if(tpnAd.length>0)
					{
						finalStr+='<li style="padding-top:1px;">'+tpnAd+'</li>';
					}
				}				 
			});
		}
		if(i=='nws')
		{
			finalStr+='<li style="width:190px;" class="titleSec ML5">News on your Stocks >></li>';	
			if($(v).size()>0)
			{
			$.each(v,function(e,f)
			{
				var link = f.link;
				var title = f.title;
				var newsh = f.nw;
//								finalStr+='<li>'+title+' : <a  target="_new" class="bl_12 MR2" href="'+link+'">'+newsh+'</a>';
				finalStr+='<li><a  target="_new" class="bl_12 MR2" href="'+link+'">'+newsh+'</a>';
				if(e < v.length - 1 )
				{
					finalStr+='<span class="devider"></span>';
				}
				finalStr+='</li>';
				 
				if(e>0 && e%5==0 )
				{
					   var tpnAd = $.trim($('#tckr_ad_rad_d').html());
						if(tpnAd.length>0)
						{
							finalStr+='<li style="padding-top:1px;">'+tpnAd+'</li>';
						}
					 
				}

			});
			}
			else
				finalStr+='<li style="padding-top:4px;">No stocks in your Portfolio</li>';

		}
	}); 
	//$('#stockTicker').append(finalStr);
	$('#stockTicker').webTicker('update', finalStr, 'swap',false,false);
}
function stopTicker()
{
	//$('#stockTicker').webTicker('stop');
}

function startTicker()
{
	//$('#stockTicker').webTicker('cont');
}
function loadTickerData()
{
	var url ='https://indices.moneycontrol.co.in/sensex_nifty/radtkr.json?v='+CURR_STR_DATE;
	if(readCookie('nnmc'))
	{

	}
	 
	$.ajax({
		url:url,
		type:"GET",
		dataType:"jsonp",
		cache:true,
		jsonpCallback:"tickerdat",
		timeout:6000,					
		success:function(callbk)
		{ 
			
		}});
}
function showMRhelp(){
	$('#MR_help').show();
	/*$('.chkMrkRdr a.icon').trigger('click');
	$('.chkMrkRdr a.icon').trigger('click');*/
}
function closeMRhelp(){
	$('#MR_help').hide();
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function indicereq(){
	if(typeof(from_mkt_page) != "undefined"){
	/**START: call to price api for BSE**/
	var currentcloseprice_bse = 0;
	var change_bse = 0;
	var pchange_bse = 0;
	var bse_add = 0;
	var nse_add = 0;
	var imgcss_arr_bse = "uparrow_grn_rad";
	var imgcss_arr_bse = "uparrow_rd_rad";

	var currentcloseprice_nse = 0;
	var change_nse = 0;
	var pchange_nse = 0;

	$.ajax({
		url:'https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BSEN',
		type:"GET",
		dataType: 'json',
		cache:true,
		async:false,
		success:function(result)
		{ 	
			
			if(result.code == 200){
				currentcloseprice_bse = parseFloat(result.data.pricecurrent);
				currentcloseprice_bse = currentcloseprice_bse.toFixed(2);
				change_bse = parseFloat(result.data.pricechange);
				change_bse = change_bse.toFixed(2);
				pchange_bse = parseFloat(result.data.pricepercentchange);
				pchange_bse = pchange_bse.toFixed(2);
				bse_add = 0;

				if(change_bse > 0){
					imgcss_arr_bse = "uparrow_grn_rad";
				}else{
					imgcss_arr_bse = "uparrow_rd_rad";
					bse_add = 1;
				}
			}

		}
	});
	/**END: call to price api**/
	/**START: call to price api for NSE**/
	
	var nse_add = 0;
	$.ajax({
		url:'https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/in%3BNSX',
		type:"GET",
		dataType: 'json',
		cache:true,
		async:false,
		success:function(result)
		{ 	
			
			if(result.code == 200){
				currentcloseprice_nse = parseFloat(result.data.pricecurrent);
				currentcloseprice_nse = currentcloseprice_nse.toFixed(2);
				change_nse = parseFloat(result.data.pricechange);
				change_nse = change_nse.toFixed(2);
				pchange_nse = parseFloat(result.data.pricepercentchange);
				pchange_nse = pchange_nse.toFixed(2);

				
				if(change_nse > 0){
					imgcss_arr_nse = "uparrow_grn_rad";
				}else{
					imgcss_arr_nse = "uparrow_rd_rad";
					nse_add = 1;
				}
			}

		}
	});
	/**END: call to price api**/
			
				var bsecurr_old = parseFloat(document.getElementById("sensex_val_top").innerHTML);
				var nsecurr_old = parseFloat(document.getElementById("nifty_val_top").innerHTML);

				document.getElementById("sensex_val_top").innerHTML=currentcloseprice_bse;
				if(bsecurr_old>currentcloseprice_bse)
					fade_inshow('sensex_val_top','cc0000','FFF','000');
				else if(bsecurr_old<currentcloseprice_bse)
					fade_inshow('sensex_val_top','006600','FFF','000');
				
				if($('#mkt_rdr_add2').length){
					if(bse_add==1 && nse_add==1){
						$("#mkt_rdr_add1").show();
						$("#mkt_rdr_add2").hide();
					}else{
						$("#mkt_rdr_add1").hide();
						$("#mkt_rdr_add2").show();
					}
		        }
			
				

				document.getElementById("sensex_change").innerHTML=change_bse;
				document.getElementById("sensex_pchange").innerHTML='(' + pchange_bse + '%)';

				document.getElementById("nifty_val_top").innerHTML=currentcloseprice_nse;
				if(nsecurr_old>currentcloseprice_nse)
					fade_inshow('nifty_val_top','cc0000','FFF','000');
				else if(nsecurr_old<currentcloseprice_nse)
					fade_inshow('nifty_val_top','006600','FFF','000');
				
				document.getElementById("nifty_change").innerHTML=change_nse;
				document.getElementById("nifty_pchange").innerHTML='(' + pchange_nse + '%)';
				document.getElementById("bse_img_top").className=imgcss_arr_bse;
				document.getElementById("nse_img_top").className=imgcss_arr_nse;

										
					if(change_bse > 0)
						var imgcss_arr_bse = "arw_grn_rh";
					else
						var imgcss_arr_bse = "arw_rd_rh";
					if(change_nse > 0)
						var imgcss_arr_nse = "arw_grn_rh";
					else
						var imgcss_arr_nse = "arw_rd_rh";

					document.getElementById("mkt_sensex").innerHTML=currentcloseprice_bse;

					document.getElementById("mkt_sensex_cng").innerHTML=change_bse;
					document.getElementById("mkt_nifty").innerHTML=currentcloseprice_nse;
					
					document.getElementById("mkt_nifty_cng").innerHTML=change_nse;
					document.getElementById("mkt_chgimgbse").className=imgcss_arr_bse;
					document.getElementById("mkt_chgimgnse").className=imgcss_arr_nse;

					document.getElementById("mkt_sensex_percng").innerHTML='(' + pchange_bse + '%)';
					document.getElementById("mkt_nifty_percng").innerHTML='(' + pchange_nse + '%)';
					//setInterval('indicereq()',60000);
					setTimeout('indicereq()',60000);
			}
}
function fade_inshow(obj,bcolor,fcolor,olcolor)
{
	var objid=eval("document.getElementById('"+obj+"')");
	objid.style.background='#'+bcolor;
	objid.style.color='#'+fcolor;
	setTimeout("fade_outshow('"+obj+"','','#"+olcolor+"')",3000);
}

function fade_outshow(obj,bcolor,fcolor)
{
	var objid=eval("document.getElementById('"+obj+"')");
	objid.style.background = bcolor;
	objid.style.color = fcolor;
}
function sensex_ajax_auto(fival)
{
	var call_js_sen_new = 1;
	if(!fival)
	{		
		var bv_chk = detectBrowserVer_().split("||");
		if((bv_chk[0]=='msie' && bv_chk[1]>=6) || (bv_chk[0]=='chrome' && bv_chk[1]>=5) || (bv_chk[0]=='mozilla' && bv_chk[1]>=3) || (bv_chk[0]=='safari' && bv_chk[1]>=4) || (bv_chk[0]=='opera' && bv_chk[1]>=9))
		{
			if(win_focblur_flg_new == 0)
				call_js_sen_new = 0;
		}
	}	
	
	if(call_js_sen_new == 1)
	{		
		//$.ajax({url: "http://indices.moneycontrol.co.in/sensex_nifty/indtick.json",dataType: "jsonp",cache: true,type: "GET",jsonpCallback: "indicereq",success: function(data)	{}});
	}
}
function nformat(n, sep, decimals) {
    sep = sep || ".";  
    decimals = decimals || 2;  

    return n.toLocaleString().split(sep)[0]        
         
}

function close_mcalerts(){
	$('#newsAlrts').hide();
	GAEventTracker("News_Alert", "MC_News_Alert_Close", "MC_News_Alert");
}
function mclogincall(signinform){
 	if(signinform == 'register'){
 		$("#ifval").val("285px");
     	$("#myframe").attr('src','https://accounts.moneycontrol.com/mclogin/?formname=register');
 	}else{
 		$("#ifval").val("495px");
         $("#myframe").attr('src','https://accounts.moneycontrol.com/mclogin/?d=2');
 	}
 	$("#LoginModal").modal();
 	
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
/*START: load radar data after all elements get loaded*/
$(window).on('load', function() {
  //console.log('All assets are loaded');
  indicereq();

  loadStacks('cbr',1);
  initWebticker(40);
});
/*END: load radar data after all elements get loaded*/
//});