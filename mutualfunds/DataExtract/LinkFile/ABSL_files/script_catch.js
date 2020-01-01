var _w18tracker = "https://inapi.posst.co/t.js";
var _w18Pingtracker = "https://ping.posst.co/p.js";
var _referrer = _w18trimhash(document.referrer);

function _w18pLoad() {
    _w18trackInit()
    
    /*window._w18hn=='MC' || window._w18hn=='NEWS18' || window._w18hn=='MCWAP' || window._w18hn=='FP' || window._w18hn=='OD' || window._w18hn=='FORBES'*/
    if (window._w18hn=='FP' || window._w18hn=='NEWS18' || window._w18hn=='OD' || window._w18hn=='FORBES' || window._w18hn=='News18' || window._w18hn=='MC') {
    _w18getInit()
    //console.log("inside get data1");
    }
    
}

setTimeout(_w18checkCookie, 800);

function _w18checkCookie(){
    var cookieEnabled=(navigator.cookieEnabled)? true : false;
    if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
        document.cookie="_w18testcookie";
        cookieEnabled=(document.cookie.indexOf("_w18testcookie")!=-1)? true : false;
    }
    return (cookieEnabled)?_w18pLoad():false;
}

function _w18getInit()
{
    var cks = _w18gc();
    //console.log(cks._w18g);
    var uid_to_send = cks._w18g;
    if(cks._w18g == undefined){
	uid_to_send = "";
    }
    _w18fire("https://inapi.posst.co/getUserInterestr/ng.js?uid="+uid_to_send+"&p="+window._w18hn);
}

function _w18trackInit(event, config) {
    
    var x = document.getElementsByTagName("meta");
    var _w18title = document.title; 
    var _id = "";
    var _w18kw = "";
    var _w18cdata = null;
    for (var i = 0, max = x.length; i < max; i++) {
        var y = x[i];
        if (y.name == "_w18Id") {
            _id = y.content
        } else {
            if (y.name.toLowerCase() == "keywords") {
                _w18kw = y.content
            }else if (y.name.toLowerCase() == "w18tracking_cdata") {
                _w18cdata = encodeURIComponent(y.content)
            }
        }
    }
    var cks = _w18gc();
    var pg = cks._w18g;
    var ps = cks._w18s;
    var ud = cks.nnmc;
    var url = _w18tracker + "?url=" + _w18trimhash(window.location.href) + "&referrer=" + _referrer + "&_w18Id=" + _id + "&_w18kw=" + encodeURIComponent(_w18kw) + "&";
    if (pg != null) {
        url = url + "_w18g=" + pg + "&";
    }
    if (ps != null) {
        url = url + "_w18s=" + ps + "&";
    }
    if (ud != null) {
        url = url + "nn2mc=" + ud + "&";
    }
    if (_w18cdata != null) {
        url = url + "_w18cdata=" + _w18cdata + "&";
    }
    if (typeof _w18_config != 'undefined') {
	
	if(!config){
	    config = _w18_config;
	};
        url = url + "_jsondata=" + encodeURIComponent(JSON.stringify(config)) + "&";
    }
    
    url = url + "_w18hn=" + _w18hn + "&"; 
    url = url + "_w18title=" + encodeURIComponent(_w18title) + "&";
    _w18fire(url);

    /*var stillAlive = setInterval(function(){
 *      var pingUrl = _w18Pingtracker + "?url=" + _w18trimhash(window.location.href) + "&_w18hn=" + _w18hn + "&_w18title=" + encodeURIComponent(_w18title) +
 *      "&sec=" + 25 + "&pg="+ pg;
 *              _w18fire(pingUrl);
 *                      
 *                          }, 25000);*/
    
}
/* Set User Behaviour -> Start */
function _w18sub() {
	var _w18userinfo_out = {};
	if( typeof localStorage !== "undefined" ) {
		if( localStorage.getItem( "_w18userinfo" ) !== null ) {
			_w18userinfo_out = localStorage.getItem( "_w18userinfo" );
			_w18userinfo_out = unescape( _w18userinfo_out );
			var contact = JSON.parse( _w18userinfo_out );
			//console.log('_w18userinfo_out = ', contact);
			for(var contactItem in contact){
			    //console.log("Key="+contactItem);
			    //console.log(contact[contactItem]);
			    if(contactItem == 'interest_channel' || contactItem == 'interest_bucket' || contactItem == 'logged_in' || contactItem == 'extra'){
				//console.log(contact[contactItem]);
				for(var contactItemVal in contact[contactItem]){
				    //console.log(contact[contactItem][contactItemVal]+"<<<<<<<<<<<>>>>>>>>>>>"+contactItemVal);
				    googletag.pubads().setTargeting( contactItemVal,contact[contactItem][contactItemVal] );
				}
			    }
			    else if(contactItem == 'vernacular' )
			    {
				//console.log(contact[contactItem]);
				googletag.pubads().setTargeting( contactItem,contact[contactItem] );
			    }
			    else if(contactItem == 'interest_platform' )
			    {
				//console.log("interest_platform");
				//console.log(contact[contactItem]);
				for(var contactItemVal in contact[contactItem])
				{
				    //console.log("interest_platform");
				    //console.log(contactItemVal);
				    //console.log(contact[contactItem][contactItemVal]);
				    googletag.pubads().setTargeting( contactItemVal,contact[contactItem][contactItemVal]);
				    for(var platform_name in contact[contactItem][contactItemVal] )
				    {
					//console.log(contact[contactItem][contactItemVal][platform_name]);
					//googletag.pubads().setTargeting( contactItemVal,contact[contactItem][contactItemVal][platform_name] );
				    }
				}
			    }
			};
		}
	}
	return false;
}
/* End <- Set User Behaviour */

/* FUNCTION TO SEND UNIQUE ID TO GOOGLE TAG MANAGER */
function _w18ppid() {
    var _w18_uni_id = _w18gc('_w18g');
    _w18_uni_id=_w18_uni_id._w18g;
    //console.log(_w18_uni_id);
    
    googletag.pubads().enableSyncRendering();
    googletag.pubads().setPublisherProvidedId(_w18_uni_id);
    googletag.enableServices();
};
/* END OF UNIQUE ID FUNCTION */

/* Save in Local Storage -> Start */
function _w18sl( l_name, value ) {
	var l_value = escape( value );
	localStorage.setItem( l_name, l_value );
}
/* End <- Save in Local Storage */

/* Get values from Local Storage -> Start */
function _w18gl( l_name ) {
	var local_storage = localStorage[ l_name ];
	return local_storage;
}
/* End <- Get values from Local Storage */

function _w18sc(c_name, value) {
    var c_value = escape(value);
    if (c_name == "_w18g") {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + 36500);
        c_value = c_value + ";expires=" + exdate.toUTCString()
    }
    document.cookie = c_name + "=" + c_value
}
function _w18gc(wg) {
    var i, x, y, cl = document.cookie.split(";");
    var out = {};
    var c = 0;
    for (i = 0; i < cl.length; i++) {
        x = cl[i].substr(0, cl[i].indexOf("="));
        y = cl[i].substr(cl[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == "nnmc") {
                out.nnmc = unescape(y);
                c = c + 1
        } else if (x == "_w18g") {
                out._w18g = unescape(y);
                c = c + 1
        } else if (x == "_w18s") {
                out._w18s = unescape(y);
                c = c + 1
        }

        if (c == 3) {
            return out
        }
    }
    return out
}

function _w18fire(url) {
    var _w18j = document.createElement("script");
    _w18j.setAttribute("type", "text/javascript");
    _w18j.setAttribute("src", url);
    _w18j.async = true;	
    document.getElementsByTagName("head")[0].appendChild(_w18j)
}

function _w18trimhash(url) {
    var idx = url.indexOf("#");
    if (idx != -1) {
        url = url.substring(0, idx)
    }
    return encodeURIComponent(url)
};

//ANALYTICS EVENT FUNCTIONALITY
var dimensionval = {
    "OD": "dimension3",
    "NEWS18": "dimension5",
    "FP": "dimension3",
    "TOPPER": "dimension5",
    "MC": "dimension30"
};

function _w18_a(property, cat, act, lab){
    ga('set', dimensionval[property], lab);
    ga('send', 'event', "DMP", cat, act, 1, { nonInteraction: true });
}
