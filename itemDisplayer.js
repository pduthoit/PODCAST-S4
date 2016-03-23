

function createItemList(newPodcast) {
	var itemDIV=document.getElementById("podcasts_container");
	//itemUL.className="itemList";
	for(var i=0;i<newPodcast.pcItem.length;i++) {
		var item=newPodcast.pcItem[i];
		var itemA=document.createElement("a");
		var itemLI=document.createElement("li");
		var itemTitle=item[0];
		var itemDesc=item[1];
		var itemMediaLink=item[2];
		var itemMediaType=item[3];
		var mediaType=getType(newPodcast);
		//var mediaType="audio";
		var itemId=i;
		
		itemLI.title=itemDesc;
		itemLI.className="podcast";
		itemLI.innerHTML=itemTitle;
		//itemLI.innerHTML="<"+mediaType+" controls><source src=\""+itemMediaLink+"\" type=\""+itemMediaType+"\"></"+mediaType+">";
		
		itemA.href="#"+podcast.pcSRC+"#"+itemId;
		itemA.appendChild(itemLI);
		itemDIV.appendChild(itemA);
	}
}

function getType(newPodcast) {
	for(var i=0;i<newPodcast.pcItem.length;i++) {
		var item=newPodcast.pcItem[i];
		if(item[3].includes("audio"))
			return "audio";
		if(item[3].includes("video"))
			return "video";
	}
	return "none";
}