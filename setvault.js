var sutil = require("./sutil");
var carddb = require("./carddb");
module.exports = sutil.verifyAuth(function(opt, req, res, db){
	db.hgetall("E"+opt.e+":VAULT", function(err, vault){
		var cards = opt.cards.split(" "), cost = 0;
		cards.forEach(function(code){
			var card = carddb[code];
			if (code < "6qo" && code != "4t9" && card && card.type){
				cost += card.price;
			}else{
				cost += vault.elec;
			}
		});
		while (opt.cards.length < 180) opt.cards.push("4t9");
		if (cost <= vault.elec){
			db.hset("E"+opt.e+":VAULT", "cards", opt.cards);
		}else{
			res.writeHead(403);
			res.end();
		}
	});
});