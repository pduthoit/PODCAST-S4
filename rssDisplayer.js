/**
 * Globals
 */

var podcastList=new Array();
/**
 * Init function.
 */
function init() {
	console.log("onload -> init() successful");
}
/**
 * Sceondary functions.
 */
function createPodcast(data) {

	var ID=podcastList.length;
	var holder=document.getElementById("podcasts_container");
	var newPodcast = {
		id:ID,
		pcTitle:data[0],
		pcLink: data[1],
		pcDesc: data[2],
		pcImage:data[3],
		pcItem: data[4],

		/*
		<div id="podcast_page_container">
			<div id="podcast_video_container">
				<div id="podcast_video"></div>
				<div id="podcast_description">
					<h2 id="podcast_title_desc">Description</h2>
					<p id="podcast_p_desc">	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco la
						boris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor int.</p>
				</div>
			</div>
		</div>
		*/
		/*<div class="podcast">
			<h3 class="podcast_mini_title">This is</h3>
		</div>*/

		podcastMini:document.createElement("div"),
		miniTitle:document.createElement("h3")

		/*desc = getElementById()*/

	}

	newPodcast.podcastMini.className="podcast";
	console.log("class: "+newPodcast.podcastMini.className);
	
	newPodcast.podcastMini.style.backgroundImage="url("+newPodcast.pcImage+")";
	console.log("image: "+newPodcast.podcastMini.style.backgroundImage);
	
	newPodcast.miniTitle.className="podcast_mini_title";
	newPodcast.miniTitle.innerHTML=newPodcast.pcTitle;
	console.log("title: "+newPodcast.miniTitle.className);
	/*
	newPodcast.podcastMini.addEventListener("click",function(){stopAlarm(newPodcast)});;
	newPodcast.li.appendChild(newPodcast.CBactive);

	newPodcast.NumberHour.type="number";
	newPodcast.NumberHour.name="hour";
	newPodcast.NumberHour.className="number";
	newPodcast.NumberHour.max=23;
	newPodcast.NumberHour.min=0;
	newPodcast.NumberHour.value=0;
	newPodcast.li.appendChild(newPodcast.NumberHour);

	newPodcast.NumberMinute.type="number";
	newPodcast.NumberMinute.name="minute";
	newPodcast.NumberMinute.className="number";
	newPodcast.NumberMinute.max=59;
	newPodcast.NumberMinute.min=0;
	newPodcast.NumberMinute.value=0;
	newPodcast.li.appendChild(newPodcast.NumberMinute);

	newPodcast.TextName.type="text";
	newPodcast.TextName.name="name";
	newPodcast.TextName.className="name";
	newPodcast.TextName.value="Nouvelle alarme "+ID;
	newPodcast.li.appendChild(newPodcast.TextName);

	newPodcast.SelectSound.name="sound";
	for(var index = 0; index < soundList.length; index++) {
		var s=soundList[index];
		var selected="";
		if(s.selected)
			selected=" selected";
		newPodcast.SelectSound.innerHTML+='<option value="'+s.path+'" '+selected+'>'+s.name+'</option>';
	}
	newPodcast.SelectSound.addEventListener("change",function() {
		var current=newPodcast.Audio.src;
		var selected=newPodcast.SelectSound.options[newPodcast.SelectSound.selectedIndex].value;
		if(current!==selected) {
			newPodcast.Audio.pause();
			newPodcast.Audio.src=selected;
			newPodcast.Audio.load();
		}
		console.log("Selected sound changed");
	});
	newPodcast.li.appendChild(newPodcast.SelectSound);

	newPodcast.ButtonDelete.type="button";
	newPodcast.ButtonDelete.name="delete";
	newPodcast.ButtonDelete.className="button";
	newPodcast.ButtonDelete.value="-";
	newPodcast.ButtonDelete.addEventListener("click",function() {
		deleteAlarm(newPodcast);
	});
	newPodcast.li.appendChild(newPodcast.ButtonDelete);

	newPodcast.Audio.src=newPodcast.SelectSound.options[newPodcast.SelectSound.selectedIndex];
	newPodcast.Audio.load();
	newPodcast.li.appendChild(newPodcast.Audio);
	*/
	podcastList[ID] = newPodcast;
	createItemList(newPodcast);
	//newPodcast.podcastMini.appendChild(newPodcast.miniTitle);
	//holder.appendChild(newPodcast.podcastMini);
	
	console.log("onclick -> createAlarm() successful");
}

function deleteAlarm(alarm) {
	stopAlarm(alarm);
	var holder=document.getElementById("alarmHolder");
	holder.removeChild(alarm.li);
}
/**
 * Start the sound for the current alarm if not playing.
 * Change the url if alarm choice changed.
 * Change style.
 */
function startAlarm(alarm) {
	if(alarm.Audio.paused===true) {
		alarm.Audio.play();
		alarm.li.className="alarmActive";
		console.log("startAlarm() successful");
		console.log(alarm.Audio.src);
		console.log("Play -> is paused: "+alarm.Audio.paused);
	}
}
/**
 * Stop sound.
 * Change style.
 */
function stopAlarm(alarm) {
	if(alarm.Audio) {
		alarm.Audio.pause();
	}
	alarm.li.className="alarm";
}
/**
 * Other functions
 */
 function toStr(numeric) {
	 if(numeric<10)
		 return "0"+numeric;
	 else
		return ""+numeric;
 }

window.addEventListener("load", init);
