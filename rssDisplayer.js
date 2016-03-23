/**
 * Globals
 */

var podcastItemList=0;
var podcast;
var podcast_img;
var podcast_title;
var podcast_desc;
var podcast_media_container;

/**
 * Init function.
 */
function init() {
	
	podcast_img=document.getElementById("podcast_img");
	podcast_title=document.getElementById("podcast_title_desc");
	podcast_desc=document.getElementById("podcast_p_desc");
	podcast_media_container=document.getElementById("podcast_media_container");
	
	console.log(podcast_img);
	
	console.log("onload -> init() successful");
	
	hashParser();
}

window.addEventListener("load",init);
window.addEventListener("hashchange",hashParser);

/**
 * Sceondary functions.
 */
function hashParser() {
	var urlHash = window.location.hash.substring(1);
	if(urlHash=="")
		 return;
	var args = urlHash.split("#");
	console.log(args.length+" "+podcastItemList);
	if(args.length>0) {
		var mediaSRC=args[0];
		console.log("src: "+mediaSRC);
		if(args.length>1) {
			var id=args[1];
			console.log(id);
			loadMedia(id);
		} else loadPodcast("id: "+mediaSRC);
	}
}
function loadMedia(id) {
	console.log(podcastItemList);
	if(podcastItemList.length>=id) {
		var pod=podcastItemList[id];
		podcast_media_container.innerHTML="<audio controls><source src=\""+pod[2]+"\" type=\"audio/mpeg\"></audio>";
		podcast_desc.innerHTML="<h3>"+pod[0]+"</h3>"+pod[1];
	} console.log("Can't load media: no podcast loaded yet.");
}
function createPodcast(data) {
	var holder=document.getElementById("podcasts_container");
	var newPodcast = {
		pcSRC:document.getElementById('podcastURL').value,
		pcTitle:data[0],
		pcLink: data[1],
		pcDesc: data[2],
		pcImage:data[3],
		pcItem: data[4],
	}
	
	podcastItemList=newPodcast.pcItem;
	
	podcast_img=document.getElementById("podcast_img");
	podcast_title=document.getElementById("podcast_title_desc");
	podcast_desc=document.getElementById("podcast_p_desc");
	podcast_media_container=document.getElementById("podcast_media_container");
	
	podcast_img.src=newPodcast.pcImage;
	console.log("image: "+podcast_img.src);
	
	podcast_title.innerHTML=newPodcast.pcTitle;
	console.log("title: "+podcast_title.innerHTML);
	
	podcast_desc.innerHTML=newPodcast.pcDesc;
	console.log("desc: "+podcast_desc.innerHTML);

	podcast = newPodcast;
	createItemList(newPodcast);
}

