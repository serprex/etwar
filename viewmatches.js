var sutil = require("./sutil");
module.exports = sutil.noVerify(function(opt, req, res, db){
	db.lrange("R"+opt.r, 0, -1, function(err, result){
		res.end(JSON.stringify(result));
	});
});