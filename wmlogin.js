var sutil = require("./sutil");
module.exports = function(db){
	return function(req, res, next){
		sutil.verifyWmAuth(db, req, function(opt){
			res.end("{}");
		});
	}
}