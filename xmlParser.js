function init() {
	
}

function getXMLHttpRequest() { // renvoit un objet XMLHttpRequest valide
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
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
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
function getChannelData(rss) { // Lorsque qu'un podcast est récupéré, on l'affiche.
	// transformation de la requête en objet XML
	var xml=rss.responseXML; 
	
	// récupération des données
	var channels=xml.getElementsByTagName("channel");
	var datas;
	// pour chaque channels:
	for(var i=0; i<channels.length;i++) {
		datas=new Array("title","link","description",0);
		datas[3]=new Array();
		var c=channels[i];
		var elemC=c.children;
		for(var j=0;j<elemC.length;j++) {
			e=elemC[j];
			if(e.tagName==datas[0]) // if no title yet
				datas[0]=e.childNodes[0].nodeValue;
			if(e.tagName==datas[1]) // if no ling yet
				datas[1]=e.childNodes[0].nodeValue;
			if(e.tagName==datas[2]) // if no descriptino yet
				datas[2]=e.childNodes[0].nodeValue;
			if(e.tagName=="item")
				datas[3][datas[3].length]=getItemData(e);
		}
		createPodcast(datas[0],datas[1],datas[2],datas[3]); // création d'un noveau Podcast
	}
}
function XMLretrieveRequest(req) { // lorsque le status change, vérifie si on a reçu un XML.
	if (req.readyState === 4) {
		if(req.status === 200) { // répose valide.
			console.log("AJAX valid answer.");
			getChannelData(req); // chargement d'un nouveau podcast.
		} else console.log("AJAX invalid answer: "+req.status); // réponse invalide.
	}
}
function AJAXsendRequest(xhr,target) { // envoit la requête AJAX
	// prépapre la récupératino du XML à l'adresse "target"
	xhr.open("GET",target);
	
	// envoit requête
	xhr.send();
	console.log("AJAX request sent.");
}
function loadPodcast() { // met en place la récupération d'un podcast
	// création objet XMLHttpRequest
	var xhr = getXMLHttpRequest();
	
	// vérification validité
	if(xhr == null) {
		console.log("Unable to create XMLHttpRequest object.");
		return false;
	}
	
	// préparation de la réception
	xhr.onreadystatechange = function() {
		XMLretrieveRequest(xhr);
	};
	
	// préparation de l'envoi
	var target = window.location.hash.substring(1);
	if(target=="")
		target="1";
	
	// envoi
	AJAXsendRequest(xhr,target);
	
	return true;
}