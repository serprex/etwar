function mkDeck(deck){
	var div = document.createElement("div");
	for(var i=0; i<deck.length; i+=70){
		var img = new Image();
		img.src = "http://dek.im/deck/" + deck.slice(i, i+70).join(" ");
		div.appendChild(img);
	}
	return div;
}
function clearDiv(div){
	while (div.firstChild) div.firstChild.remove();
}
function mkQuery(opt){
	var r=[];
	for(var key in opt){
		var val = opt[key];
		if (val instanceof Array){
			val.forEach(function(x){
				r.push(key+"="+encodeURIComponent(x));
			});
		}else{
			r.push(key+"="+encodeURIComponent(val));
		}
	}
	return r.join("&");
}
function xhrSend(url, onload, onerror){
	var xhr = new XMLHttpRequest();
	if (onload){
		xhr.addEventListener("load", function(){
			if (this.status == 200) onload.call(this);
			else if (onerror) onerror.call(this);
		});
	}
	if (onerror) xhr.addEventListener("error", onerror);
	xhr.open("GET", url, true);
	xhr.send();
}
function isUpped(code){
	return code>="6qo";
}
function parseMatch(matchval){
	return {team: [match&15, (match>>8)&15], mem: [(match>>4)&15, (match>>12)&15], res: [(match>>16)&15, (match>>20)&15]};
}
function matchToString(mres){
	return (mres.res[0] == 15 ? "" : mres.res[0] + "-" + mres.res[1] + ", ") + mres.team[0] + ":" + mres.mem[0] + " - " + mres.team[1] + ":" + mres.mem[1];
}
var Enames = ["Underworld", "Entropy", "Death", "Gravity", "Earth", "Life", "Fire", "Water", "Light", "Air", "Time", "Darkness", "Aether"];