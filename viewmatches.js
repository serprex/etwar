var sutil = require("./sutil");
module.exports = function(db){
	return function(req, res, next){
		sutil.verifyWmAuth(db, req, function(opt){
			db.lrange("R"+opt.r, 0, -1, function(err, result){
				res.end(JSON.stringify(result));
			});
		}
	}
}