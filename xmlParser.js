function init() {
	
}

function getXMLHttpRequest() { // return a valid XMLHttpRequest
	var xhr = null;
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Your browser does not support XMLHTTPRequest object...");
		return null;
	}
	return xhr;
}
/**
 * Create an Array with all the data of one Item.
 */
function createItemData(item) {
	var out=new Array("title","link","description");
	var elem=item.children;
	for(var j=0;j<elemC.length;j++) {
		e=elemC[j];
		if(e.tagName==out[0]) // if no title yet
			out[0]=e.childNodes[0].nodeValue;
		if(e.tagName==out[1]) // if no link yet
			out[1]=e.childNodes[0].nodeValue;
		if(e.tagName==out[2]) // if no description yet
			out[2]=e.childNodes[0].nodeValue;
	}
	return out;
}
/**
 * Create an Array with all the data of one Channel.
 * Use it to create a new podcast.
 */
function getChannelData(rss) { // Retrieve data from a xml file.
	// convert to XML object.
	var xml=rss.responseXML; 
	
	// preparing data holder
	var channels=xml.getElementsByTagName("channel");
	var datas;
	// for each channels
	for(var i=0; i<channels.length;i++) {
		datas=new Array("title","link","description",0);
		datas[3]=new Array();
		var c=channels[i];
		var elemC=c.children;
		for(var j=0;j<elemC.length;j++) {
			e=elemC[j];
			if(e.tagName==datas[0]) // if no title yet
				datas[0]=e.childNodes[0].nodeValue;
			if(e.tagName==datas[1]) // if no link yet
				datas[1]=e.childNodes[0].nodeValue;
			if(e.tagName==datas[2]) // if no descriptino yet
				datas[2]=e.childNodes[0].nodeValue;
			if(e.tagName=="item")
				datas[3][datas[3].length]=getItemData(e);
		}
		createPodcast(datas[0],datas[1],datas[2],datas[3]); // create new podcast
	}
}
function XMLretrieveRequest(req) { // when status change, load new podacst
	if (req.readyState === 4) {
		if(req.status === 200) { // valid answer.
			console.log("AJAX valid answer.");
			getChannelData(req); // loading new podcast
		} else console.log("AJAX invalid answer: "+req.status); // invalid answer
	}
}
function AJAXsendRequest(xhr,target) { // send AJAX request
	// preparing cross domain request for the targeted url.
	xhr.open("GET","http://crossorigin.me/"+target);
	
	// send request
	xhr.send();
	console.log("AJAX request sent.");
}
function loadPodcast(target) { // preapre podcast request
	// create XMLHttpRequest object
	var xhr = getXMLHttpRequest();
	
	// check for validity
	if(xhr == null) {
		console.log("Unable to create XMLHttpRequest object.");
		return false;
	}
	
	// prepare for answer
	xhr.onreadystatechange = function() {
		XMLretrieveRequest(xhr);
	};
	
	// sending
	AJAXsendRequest(xhr,target);
	
	return true;
}