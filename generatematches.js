var sutil = require("./sutil");
module.exports = sutil.verifyWmAuth(function(opt, req, res, db){
	var task = sutil.mkTask(function(result){
		var matches = [], memberlists = [];
		for(var i=0; i<12; i++){
			var count = result[i].cards.split(" ").length;
			var members = count < 60 ? 0 :
				count < 90 ? 2 :
				count < 120 ? 3 :
				count < 150 ? 4 :
				count < 180 ? 5 : 6;
			memberlists[i] = new Array(members);
		}
		for(var i=0; i<12; i++){
			for(var j=0; j<memberlists[i].length; j++){
				if (memberlists[i][j]) continue;
				var candidates = [];
				for (var k=0; k<12; k++){
					if (k == i) continue;
					for(var l=0; l<memberlists[k].length; l++){
						candidates.push([k, l]);
					}
				}
				if (candidates.length == 0) console.log("TODO: handle byes (skipping here is not random)");
				else{
					var chosen = candidates[Math.floor(Math.random()*candidates.length)];
					memberlists[i][j] = chosen;
					memberlists[chosen[0]][chosen[1]] = [i, j];
					matches.push(i|j<<4|chosen[0]<<8|chosen[1]<<12|0xFF0000);
				}
			}
		}
		db.rpush("R"+result.round, matches, function(err){
			if (!err) res.end(JSON.stringify(matches));
		});
	});
	db.incr("ROUND", task("round"));
	for(var i=0; i<12; i++){
		db.hgetall("E"+(i+1)+":VAULT", task(i));
	}
	task();
});