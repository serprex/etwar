var sutil = require("./sutil");
module.exports = sutil.verifyAuth(function(opt, req, res, db){
	// TODO figure out getdecks for not-round-1 & figure out more about recording deck history
	db.get("ROUND", function(err, round){
		if (err) return sutil.reject(res);
		var prefix = "E"+opt.e+":"+round+":";
		var task = sutil.mkTask(function(result){
			var data = [];
			for(var i=0; i<result.decks.length; i++){
				data.push([result.decks[i], result.sides[i], result.roles[i]]);
			}
			res.end(JSON.stringify(data));
		});
		db.lrange(prefix+"DECKS", 0, -1, task("decks"));
		db.lrange(prefix+"SIDES", 0, -1, task("sides"));
		db.lrange(prefix+"ROLES", 0, -1, task("roles"));
		task();
	});
});