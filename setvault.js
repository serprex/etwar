var sutil = require("./sutil");
var carddb = require("./carddb");
module.exports = function(db){
	return function(req, res, next){
		sutil.verifyAuth(db, req, function(opt){
			db.hgetall("E"+opt.e+":VAULT", function(err, vault){
				var cards = opt.cards.split(" "), cost = 0;
				cards.forEach(function(code){
					var card = carddb[code];
					if (card){
						cost += card.tier;
					}
				});
				if (cost <= vault.elec){
					db.hset("E"+opt.e+":VAULT", "cards", opt.cards);
				}
			});
		});
	}
}