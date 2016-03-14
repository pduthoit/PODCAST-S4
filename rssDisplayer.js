/**
 * Globals
 */

var podcastList=new Array();
/**
 * Init function.
 */
function init() {
	document.getElementById("createButton").addEventListener("click",createAlarm);
	
	for(var index = 0; index < soundList.length; index++) {
		var s=soundList[index];
	}


	console.log("onload -> init() successful");
}
/**
 * Sceondary functions.
 */
function createPodcast() {
	var ID=podcastList.length;
	var holder=document.getElementById("alarmHolder");
	var newPodcast = {
		id:ID,
		pcTitle:
		pcLink:
		pcDesc:
		pcImage:

		li:document.createElement("li"),
		CBactive:document.createElement("input"),
		NumberHour:document.createElement("input"),
		NumberMinute:document.createElement("input"),
		TextName:document.createElement("input"),
		SelectSound:document.createElement("select"),
		ButtonDelete:document.createElement("input"),
		Audio:document.createElement("audio")


	}
	newPodcast.li.name="alarm";
	newPodcast.li.className="alarm";

	newPodcast.CBactive.type="checkbox";
	newPodcast.CBactive.name="active";
	newPodcast.CBactive.className="checkbox";
	newPodcast.CBactive.addEventListener("click",function(){stopAlarm(newPodcast)});;
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

	podcastList[ID]=newPodcast;

	holder.appendChild(newPodcast.li);

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
