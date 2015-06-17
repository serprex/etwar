var qs = require("querystring");
var sutil = require("./sutil");
module.exports = sutil.verifyWmAuth(function(opt, req, res, db){
	var counter = 0, blankpool = [];
	for(var i=0; i<180; i++) blankpool.push("000");
	blankpool = blankpool.join(" ")
	opt.s.forEach(function(sz, i){
		var ele = i+1;
		db.del("E"+ele+":VAULT", "E"+ele+":1:DECKS", "E"+ele+":1:SIDES", function(){
			db.hmset("E"+ele+":VAULT", {elec: sz, ele: ele, cards: blankpool, salvage: "", discard: "", salvagepool: "", discardpool: "", salvagecount: 0, discardcount: 0, relics: 0, psw: "nopass"});
			db.lpush("E"+ele+":1:DECKS", "", "", "", "", "", "");
			db.lpush("E"+ele+":1:SIDES", "", "", "", "", "", "");
			if (++counter == 12){
				require("./generatematches")(req, res, function(){});
			}
		});
	});
});
