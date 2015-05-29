var qs = require("querystring");
exports.parseOpts = function(req){
	return qs.parse(req.url.slice(2));
}
exports.verifyAuth = function(req, cb){
	var opts = exports.parseOpts(req);
	var e = opts.e;
	db.hget("E"+e+":VAULT", "psw", function(psw){
		if (psw == opts.auth){
			cb(opts);
		}else{
			cb(null);
		}
	});
}