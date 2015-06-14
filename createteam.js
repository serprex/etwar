var qs = require("querystring");
var sutil = require("./sutil");
module.exports = sutil.verifyWmAuth(function(opt, req, res, db){
	opt.s.forEach(function(sz, i){
		var ele = i+1;
		db.del("E"+ele+":VAULT", "E"+ele+":1:DECKS", "E"+ele+":1:SIDES", function(){
			db.hmset("E"+ele+":VAULT", {elec: sz, ele: ele, cards: "", salvage: "", discard: "", salvagepool: "", discardpool: "", salvagecount: 0, discardcount: 0, relics: 0, psw: "nopass"});
			db.lpush("E"+ele+":1:DECKS", "", "", "", "", "", "");
			db.lpush("E"+ele+":1:SIDES", "", "", "", "", "", "");
		});
	});
});
