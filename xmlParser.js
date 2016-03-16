
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
function getItemData(item) {
	var out=new Array("title","description","enclosure");
	var elem=item.children;
	for(var j=0;j<elem.length;j++) {
		var e=elem[j];
		if(e.tagName==out[0]) { // if no title yet
			out[0]=e.childNodes[0].nodeValue;
			//console.log("Item Child: "+e+" ("+e.tagName+") "+e.childNodes[0].nodeValue);
		}
		if(e.tagName==out[1]) { // if no link yet
			out[1]=e.childNodes[0].nodeValue;
			//console.log("Item Child: "+e+" ("+e.tagName+") "+e.childNodes[0].nodeValue);
		}
		if(e.tagName==out[2]) { // if no enclosure yet
			out[2]=[e.getAttribute("url"),e.getAttribute("type")];
			//console.log("Item Child: "+e+" ("+e.tagName+") "+out[3]);
		}
	}
	return out;
}

/**
 * Retrieve data from XML and create new podcast.
 */
 function retrievePodcastData(rss) {
	createPodcast(getChannelData(rss));
 }
/**
 * Create an Array with all the data of one Channel.
 * Use it to create a new podcast.
 */
function getChannelData(rss) { // Retrieve data from a xml file.
	// convert to XML object.
	var xml=rss.responseXML; 
	
	if(xml==undefined)
		console.log("Problem with XML");
	
	// preparing data holder
	var channels=xml.getElementsByTagName("channel");
	var datas;
	// for each channels
	for(var i=0; i<channels.length;i++) {
		datas=new Array("title","link","description","image",0);
		datas[4]=new Array();
		var c=channels[i];
		var elemC=c.children;
		for(var j=0;j<elemC.length;j++) {
			e=elemC[j];
			if(e.tagName==datas[0]) // if no title yet
				datas[0]=e.childNodes[0].nodeValue;
			if(e.tagName==datas[1]) // if no link yet
				datas[1]=e.childNodes[0].nodeValue;
			if(e.tagName==datas[2]) // if no description yet
				datas[2]=e.childNodes[0].nodeValue;
			if(e.tagName==datas[3]) { // if no image yet
				datas[3]=e.children[0].childNodes[0].data;
				console.log("Channel Data: "+e+" ("+e.tagName+") "+datas[3]);
			}
			if(e.tagName=="item")
				datas[4][datas[4].length]=getItemData(e);
		}
		//createPodcast(datas[0],datas[1],datas[2],datas[3]); // create new podcast
		return datas;
	}
}
function XMLretrieveRequest(req) { // when status change, load new podacst
	if (req.readyState === 4) {
		if(req.status === 200) { // valid answer.
			console.log("AJAX valid answer.");
			retrievePodcastData(req); // loading new podcast
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