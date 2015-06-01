var sutil = require("./sutil");
module.exports = function(db){
	return function(req, res, next){
		var task = sutil.mkTask(function(result){
			var data = []; // Convert object to array
			for(var i=0; i<12; i++){
				data.push(result[i]);
			}
			res.end(JSON.stringify(data));
		});
		for(var i=0; i<12; i++){
			db.hget("E"+(i+1)+":VAULT", "cards", task(i));
		}
		task();
	}
}