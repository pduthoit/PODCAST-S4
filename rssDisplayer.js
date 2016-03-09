function init() {
	loadChapter(); // charge un premier chapitre
	window.addEventListener("hashchange",loadChapter); // charge un chapitre à chaque fois que l'url change
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
function changeChapter(cptr) { // Lorsque qu'un chapitre est récupéré depuis le serveur, l'affiche.
	// transformation de la requête en objet
	var j=JSON.parse(cptr); 
	
	// récupération des données
	var chapterText=j.txt;
	var chapterLinks=j.links;
	
	// on affiche le nouveau text.
	document.getElementById("chapterText").innerHTML=chapterText;
	
	var links=document.getElementById("chapterLinks");
	
	// on suppriemtous les liens existants.
	while(links.firstChild)
		links.removeChild(links.firstChild);
	
	// on créé les nouveaux liens
	for(var i=0;i<chapterLinks.length;i++) {
		var li=document.createElement("li");
		li.className="link";
		var a=document.createElement("a");
		a.href=chapterLinks[i].link;
		li.innerHTML=chapterLinks[i].txt;
		a.appendChild(li);
		links.appendChild(a);
	}
}
function AJAXretrieveRequest(req) { // lorsque le status change, vérifie si on a reçu un chapitre.
	if (req.readyState === 4) {
		if(req.status === 200) { // répose valide.
			console.log("AJAX valid answer.");
			changeChapter(req.responseText); // changement de chapitre avec les nouvelels données.
		} else console.log("AJAX invalid answer: "+req.status); // réponse invalide.
	}
}
function AJAXsendRequest(xhr,target) { // envoit la requête AJAX
	// prépapre la récupératino du chapitre dont le numéros est "target"
	xhr.open("GET", "http://crossorigin.me/http://iutdoua-webetu.univ-lyon1.fr/~p1402828/S4-CWR/TP2/AJAX/chapitre"+target+".json");
	
	// envoyer requête
	xhr.send();
	console.log("AJAX request sent.");
}
function loadChapter() { // met en palce la récupération d'un chapitre
	// création objet XMLHttpRequest
	var xhr = getXMLHttpRequest();
	
	// vérification validité
	if(xhr == null) {
		console.log("Unable to create WMLHttpRequest object.");
		return false;
	}
	
	// préparation de la réception
	xhr.onreadystatechange = function() {
		AJAXretrieveRequest(xhr);
	};
	
	// préparation de l'envoi
	var target = window.location.hash.substring(1);
	if(target=="")
		target="1";
	
	// envoi
	AJAXsendRequest(xhr,target);
	
	return true;
}

// lorsque le chargement de la page est terminé, on initialise.
window.addEventListener("load",init);