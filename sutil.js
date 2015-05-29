var qs = require("querystring");
exports.parseOpt = function(req){
	return qs.parse(req.url.slice(2));
}
exports.verifyAuth = function(db, req, cb){
	var opt = exports.parseOpt(req), e = opt.e;
	db.hget("E"+e+":VAULT", "psw", function(err, psw){
		if (!err && psw == opt.auth){
			cb(opt);
		}
	});
}
exports.verifyWmAuth = function(db, req, cb){
	var opt = exports.parseOpt(req);
	db.get("wmauth", function(err, psw){
		if (!err && psw == opt.auth){
			cb(opt);
		}
	});
}