var qs = require("querystring");
exports.parseOpts = function(req){
	return qs.parse(req.url.slice(2));
}
exports.verifyAuth = function(db, req, cb){
	var opt = exports.parseOpts(req), e = opts.e;
	db.hget("E"+e+":VAULT", "psw", function(err, psw){
		if (!err && psw == opt.auth){
			cb(opts);
		}
	});
}
exports.verifyWmAuth = function(db, req, cb){
	var opts = exports.parseOpts(req);
	db.get("wmauth", function(err, psw){
		if (!err && psw == opts.auth){
			cb(opts);
		}
	});
}