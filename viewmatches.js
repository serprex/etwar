var sutil = require("./sutil");
module.exports = sutil.verifyWmAuth(function(opt, req, res, next){
	db.lrange("R"+opt.r, 0, -1, function(err, result){
		res.end(JSON.stringify(result));
	});
});