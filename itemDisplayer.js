/**
 * Globals
 */

/**
 * Secondary functions.
 */
function createItemList(newPodcast) {
	var itemDIV=document.getElementById("podcasts_container");
	//itemUL.className="itemList";
	for(var i=0;i<newPodcast.pcItem.length;i++) {
		var item=newPodcast.pcItem[i];
		var itemLI=document.createElement("div");
		itemLI.className="podcast";
		itemLI.innerHTML="<a href='#"+item[2][0]+"'>"+item[0]+" ("+item[2][1]+")</a>";
		itemDIV.appendChild(itemLI);
	}
}

function getType(newPodcast) {
	var audio=false;
	var video=false;
	for(var i=0;i<newPodcast.pcItem.length;i++) {
		var item=newPodcast.pcItem[i];
		if(item[2][1].includes("audio"))
			audio=true;
		if(item[2][1].includes("video"))
			video=true;
	}
	var out="none";
	if(audio)
		out="audio";
	if(video) {
		if(audio)
			out+=" and video";
		else
			out="video";
	}
	return out;
}