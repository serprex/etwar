var qs = require("querystring");
var sutil = require("./sutil");
module.exports = sutil.verifyWmAuth(function(opt, req, res, db){
	var counter = 0, blankpool = "5k4t9";
	opt.s.forEach(function(sz, i){
		var ele = i+1;
		db.del("E"+ele+":VAULT", "E"+ele+":1:DECKS", "E"+ele+":1:SIDES", "E"+ele+":1:ROLES");
		db.hmset("E"+ele+":VAULT", {elec: sz, ele: ele, cards: blankpool, salvage: "", discard: "", salvagepool: "", discardpool: "", salvagecount: 0, discardcount: 0, relics: 0, psw: "nopass"});
		db.rpush("E"+ele+":1:DECKS", "", "", "", "", "", "");
		db.rpush("E"+ele+":1:SIDES", "", "", "", "", "", "");
		db.rpush("E"+ele+":1:ROLES", "Gen", "Lt", "Sld", "Sld", "Sld", "Sld");
	});
	require("./generatematches")(req, res, function(){});
});
