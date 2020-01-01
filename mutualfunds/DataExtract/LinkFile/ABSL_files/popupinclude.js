var iframehost = window.location.hostname; 
var sevip = $('input[name="ip"]').val();
  if(iframehost == 'pricechart5.moneycontrol.com' || iframehost == 'devnews.moneycontrol.com'){
    var iframe_domain = 'http://dev.accounts.moneycontrol.com/'; 
    var origin_domain = 'http://dev.accounts.moneycontrol.com';
  }else if(sevip == '172.18.31.145' || sevip == '172.18.31.149' || sevip == '172.18.31.185' || iframehost == 'mcistag.moneycontrol.com' || iframehost == 'devmc.moneycontrol.com'){
    var iframe_domain = 'https://stgaccounts.moneycontrol.com/';
    var origin_domain = 'https://stgaccounts.moneycontrol.com'; 
  }else{
    var iframe_domain = 'https://accounts.moneycontrol.com/';
    var origin_domain = 'https://accounts.moneycontrol.com';  
  }

  var bootstrapcss = iframe_domain+'assets/css/mclogin/bootstrap.min.css?v=060920172';
  var loginsignupcss = iframe_domain+'assets/css/mclogin/login_signup_https.css?v=201809151';
  var iframepopupurl = iframe_domain+'mclogin/?id=2';
  var loginsignupjs = iframe_domain+'assets/js/mclogin/login_signup.js?v=20181024';
  var referrer = window.location.pathname;
  var redirecturlval = ''; 
  if(referrer == '/mcplus/portfolio/logout.php'){
    redirecturlval = '&redirect=home';
  }
$(document).ready(function(){
  $(".linkSignUp").click(function(){
    $("#ifval").val("375px");
    $("#myframe").attr('src',iframe_domain+'mclogin/?formname=register'+redirecturlval);
  });
  $(".linkSignIn").click(function(){
	$("#ifval").val("495px");
    $("#myframe").attr('src',iframe_domain+'mclogin/?d=2'+redirecturlval);
  });
  // portfolio redirection
   $(".linkSignUp_port").click(function(){
    $("#ifval").val("375px");
    $("#myframe").attr('src',iframe_domain+'mclogin/?formname=register&redirect=port');
  });
  $(".linkSignIn_port").click(function(){
    $("#ifval").val("495px");
    $("#myframe").attr('src',iframe_domain+'mclogin/?d=2&redirect=port');
  });

  popuphtml();

});

function resizeframe(){
   window.addEventListener("message", function(e){
      if (e.origin == origin_domain){
        if(e.data.height=='' || e.data.height==undefined || e.data.height=='undefined'){
          var hghtval = $("#ifval").val();
		
          if(hghtval == '285px'){
            hghtval = '375px';
          }
          $("#myframe").attr("height",hghtval);
          return false;
        }else{
          $("#myframe").attr("height",e.data.height+"px");
          return false;
        }
      }
      
  }, false);
}
//src="'+iframepopupurl+'"

function popuphtml(){
  var htmlval="";
  htmlval = '<link rel="stylesheet" href="'+bootstrapcss+'">'+
          '<style>#myframe {border:0px;}</style>'+
          '<link rel="stylesheet" href="'+loginsignupcss+'">'+
          '<div class="modal fade loginPP logmodal" id="LoginModal" role="dialog">'+
            '<div class="modal-dialog">'+
              '<div class="modal-content">'+
                 '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                  '<iframe height="495px"  width="320px" id="myframe" onload="resizeframe();" border="0px"></iframe>'+
                '</div>'+
              '</div>'+
            '</div>'+
            '<input type="hidden" id="ifval" name="ifval" value="490px">'
            '<script src="'+loginsignupjs+'"></script>';
  $("#mcloginpopup").html(htmlval);
}