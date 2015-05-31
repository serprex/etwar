var sutil = require("./sutil");
module.exports = function(db){
	return function(req, res, next){
		sutil.verifyAuth(db, req, function(opt){
			// TODO figure out getdecks for not-round-1 & figure out more about recording deck history
			var deckdata = [], lcounter = 0;
			function postBoth(){
				if (++lcounter == 2){
					res.end(JSON.stringify(deckdata));
				}
			}
			db.lrange("E"+opt.e+":1:DECKS", 0, 10, function(err, decks){
				decks.forEach(function(deck, i){
					if (!deckdata[i]) deckdata[i] = [deck, ""];
					else deckdata[i][0] = deck;
				});
				postBoth();
			});
			db.lrange("E"+opt.e+":1:SIDES", 0, 10, function(err, decks){
				decks.forEach(function(deck, i){
					if (!deckdata[i]) deckdata[i] = ["", deck];
					else deckdata[i][1] = deck;
				});
				postBoth();
			});
		});
	}
}