var qs = require("querystring");
exports.parseOpts = function(req){
	return qs.parse(req.url.slice(2));
}
exports.verifyAuth = function(req, cb){
	var opts = exports.parseOpts(req);
	var e = opts.e;
	db.hget("E"+e+":VAULT", "psw", function(err, psw){
		if (!err && psw == opts.auth){
			cb(opts);
		}
	});
}
exports.verifyWmAuth = function(req, cb){
	var opts = exports.parseOpts(req);
	db.get("wmauth", function(err, psw){
		if (!err && psw == opts.auth){
			cb(opts);
		}
	});
}