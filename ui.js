"use strict";
exports.mkDeck = function(deck, div){
	if (!div) div = document.createElement("div");
	for(var i=0; i<deck.length; i+=70){
		var img = new Image();
		img.src = "http://dek.im/deck/" + deck.slice(i, i+70).join(" ");
		div.appendChild(img);
	}
	return div;
}
exports.clearDiv = function(div){
	while (div.firstChild) div.firstChild.remove();
}
exports.mkQuery = function(opt){
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
exports.xhrSend = function(url, onload, onerror){
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
