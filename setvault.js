var sutil = require("./sutil");
var util = require("./util");
var Cards = require("./Cards");
module.exports = sutil.verifyAuth(function(opt, req, res, db){
	db.hgetall("E"+opt.e+":VAULT", function(err, vault){
		var cost = 0, cards = util.decodeDeck(opt.cards).filter(function(code){
			var card = Cards[code];
			if (code < "6qo" && card && card.price && card.type){
				cost += card.price;
				return true;
			}else{
				return false;
			}
		});
		if (cost <= vault.elec){
			while (opt.cards.length < 180) opt.cards.push("4t9");
			db.hset("E"+opt.e+":VAULT", "cards", util.encodeDeck(opt.cards), function(err, result){
				if (!err) res.end(opt.cards);
			});
		}else{
			sutil.reject(res);
		}
	});
});