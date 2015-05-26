function renderDeck(deck){
	var div = document.createElement("div");
	for(var i=0; i<deck.length; i+=70){
		var img = new Image();
		img.src = "http://dek.im/deck/" + deck.slice(i, i+70).join(" ");
		div.appendChild(img);
	}
	return div;
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