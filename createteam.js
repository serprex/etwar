var qs = require("querystring");
module.exports = function(db){
	return function(req, res, next){
		// TODO verify opt.auth
		var opt = qs.parse(req.query), ele = opt.e;
		db.hsetall("E"+ele+":VAULT", {elec: opt.s, ele: ele, cards: "", salvage: "", discard: "", salvagepool: "", discardpool: "", salvagecount: 0, discardcount: 0, relics: 0, psw: "nopass"});
		db.lpush("E"+ele+":1:DECKS", "", "", "", "", "", "");
		db.lpush("E"+ele+":1:SIDES", "", "", "", "", "", "");
	}
}