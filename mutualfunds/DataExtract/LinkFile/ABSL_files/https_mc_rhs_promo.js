function rhs_promo_adslot(adslot)
{
	switch(adslot)
	{	
		case 'MC_COMM_RHS_CXO_AS':
			var html_str='<a href="https://moneycontrol.com/cxo-dialogue/" target="_blank"><img src="https://img-d01.moneycontrol.co.in/images/promo/smalltab.gif" border="0"></a>';
			$('#MC_COMM_RHS_CXO_AS').show();
			$('#MC_COMM_RHS_CXO_AS').html('');
			$('#MC_COMM_RHS_CXO_AS').html(html_str);
			break;
		case 'MC_COMM_RHS_PYT_AS':
			var rand_no;
			rand_no = Math.floor((Math.random()*3));
			var currentTime = new Date();
			var month = currentTime.getMonth() + 1;if(month<10) month="0"+month;
			var day = currentTime.getDate();if(day<10) day="0"+day;
			var year = currentTime.getFullYear();
			var aaj = year+''+month+''+day; 
			var pyt_img_array=new Array();
			pyt_img_array[0] = '<div style="width:178px; height:158px; border: 1px solid #CCC; background:#f7f7f7"><div style="padding:10px 8px 5px 10px; font: 12px arial; color: #333"><p style="padding:0; margin:0; color: #FF0000; font: bold 18px tahoma; text-align:center"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#FF0000;text-decoration:none">50 Intraday stock tips on SMS </a></p><p style="padding-top:10px; margin:0"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#333;text-decoration:none">Get upto 50 intraday stock tips on mobile daily from experts on CNBC-TV18 for just Rs 1890</a></p> <p style="padding-top:6px; margin:0"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#333; font-size:12px; text-decoration:underline">www.poweryourtrade.com</a></p></div></div>';
			pyt_img_array[1] = '<div style="width:178px; height:148px; border: 1px solid #CCC; background:#f7f7f7"><div style="padding:10px 8px 5px 10px; font: 12px arial; color: #333"><p style="padding:0; margin:0; color: #FF0000; font: bold 18px tahoma; text-align:center"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#FF0000;text-decoration:none">100% Commodity Tips </a></p> <p style="padding-top:10px; margin:0"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#333;text-decoration:none"> Intraday commodity trading</a></p><p style=" margin:0"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#333;text-decoration:none"> calls, news, outlook & reports </a></p><p style="padding-top:6px; margin:0"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#333; font-size:12px; text-decoration:underline">www.poweryourtrade.com</a></p></div></div>';
			pyt_img_array[2] = '<div style="width:178px; height:148px; border: 1px solid #CCC; background:#f7f7f7"><div style="padding:10px 8px 5px 10px; font: 12px arial; color: #333"><p style="padding:0; margin:0; color: #FF0000; font: bold 18px tahoma; text-align:center"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#FF0000;text-decoration:none">For Intraday Traders</a></p><p style="padding-top:10px; margin:0"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#333;text-decoration:none"> Get upto 50 intraday stock tips on mobile daily for just Rs 1890</a></p><p style="padding-top:6px; margin:0"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#333; font-size:12px; text-decoration:underline">www.poweryourtrade.com</a></p></div></div>';
			pyt_img_array[3] = '<div style="width:178px; height:148px; border: 1px solid #CCC; background:#f7f7f7"><div style="padding:10px 8px 5px 10px; font: 12px arial; color: #333"><p style="padding:0; margin:0; color: #FF0000; font: bold 18px tahoma; text-align:center"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#FF0000;text-decoration:none">Best Intraday Tips</a></p><p style="padding-top:10px; margin:0"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#333;text-decoration:none"> <strong>EXCLUSIVE</strong> trading tips for just Rs 1890</a></p><p style="padding-top:6px; margin:0"><a href="http://poweryourtrade.moneycontrol.com/plus/registration/register.php?utm_source=mchp_'+aaj+'" target="_blank" style="color:#333; font-size:12px; text-decoration:underline">www.poweryourtrade.com</a></p></div></div>';
			var html_str=pyt_img_array[rand_no];
			$('#MC_COMM_RHS_PYT_AS').show();
			$('#MC_COMM_RHS_PYT_AS').html('');
			$('#MC_COMM_RHS_PYT_AS').html(html_str);
			break;
		default: 	        
	}
} 