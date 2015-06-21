#!/usr/bin/node
var fs = require("fs"), sutil = require("./sutil");
var carddb = "", things = ["pillar", "weapon", "shield", "permanent", "spell", "creature"];
var task = sutil.mkTask(function(res){
	var carddb = {};
	things.forEach(function(name, type){
		var csv = res[name].toString().split("\n");
		var keys = csv[0].split(",");
		for(var i=1; i<csv.length; i++){
			var row = csv[i].split(",");
			var card = carddb[row[2]] = {type:type};
			keys.forEach(function(key, i){
				card[key] = i==1 || i==2 ? row[i] : parseInt(row[i]);
			});
		}
	});
	fs.writeFileSync("Cards.js", "module.exports="+JSON.stringify(carddb));
});
things.forEach(function(name){
	fs.readFile(name+".csv", task(name));
});
task();