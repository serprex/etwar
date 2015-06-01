var sutil = require("./sutil");
module.exports = function(db){
	return function(req, res, next){
		sutil.verifyWmAuth(db, req, function(opt){
			var task = sutil.mkTask(function(result){
				var matches = [], memberlists = [];
				for(var i=0; i<12; i++){
					var count = result[i].cards.split(" ").length;
					var members = count < 75 ? 0 :
						count < 110 ? 2 :
						count < 145 ? 3 :
						count < 180 ? 4 :
						count < 215 ? 5 : 6;
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
							matches.push(i|j<<4|chosen[0]<<8|chosen[1]<<12);
						}
					}
				}
				db.rpush("R"+(parseInt(data.round)+1), matches);
			});
			db.get("ROUND", task("round"));
			for(var i=0; i<12; i++){
				db.hgetall("E"+i+":VAULT", task(i));
			}
		});
	}
}