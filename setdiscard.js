var sutil = require("./sutil");
module.exports = function(db){
	return function(req, res, next){
		sutil.verifyAuth(function(opt){
		});
	}
}