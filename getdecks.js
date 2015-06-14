var sutil = require("./sutil");
module.exports = sutil.verifyAuth(function(opt, req, res, db){
	// TODO figure out getdecks for not-round-1 & figure out more about recording deck history
	var task = sutil.mkTask(function(result){
		var data = [];
		for(var i=0; i<result.decks.length; i++){
			data.push([result.decks[i], result.sides[i]]);
		}
		res.end(JSON.stringify(data));
	});
	db.lrange("E"+opt.e+":1:DECKS", 0, -1, task("decks"));
	db.lrange("E"+opt.e+":1:SIDES", 0, -1, task("sides"));
	task();
});