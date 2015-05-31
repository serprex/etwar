module.exports = function(db){
	return function(req, res, next){
		var standings = new Array(12), hgcounter = 0;
		for(var i=0; i<12; i++){
			(function(i){
				db.hget("E"+(i+1)+":VAULT", "cards", function(err, cards){
					standings[i] = cards.split(" ").length;
					if (++hgcounter == 12){
						res.end(JSON.stringify(standings));
					}
				});
			})(i);
		}
	}
}