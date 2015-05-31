var sutil = require("./sutil");
module.exports = function(db){
	return function(req, res, next){
		sutil.verifyAuth(db, req, function(opt){
			db.hgetall("E"+opt.e+":VAULT", function(err, vault){
				var cards = opt.cards.split(" ");
				// TODO correct verify logic
				if (cards.length <= vault.elec){
					db.hset("E"+opt.e+":VAULT", "cards", opt.cards);
				}
			});
		});
	}
}