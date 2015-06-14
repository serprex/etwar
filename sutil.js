var qs = require("querystring");
exports.mkTask = function(cb){
	var params = {}, cbCount = 1;
	function cbCheck(){
		if (--cbCount == 0){
			cb(params);
		}
	}
	return function(param){
		if (arguments.length == 0){
			cbCheck();
		}else{
			cbCount++;
			return function(err, res){
				params[param] = res;
				if (err){
					if (!params.err) params.err = {};
					params.err[param] = err;
				}
				cbCheck();
			}
		}
	}
}
exports.parseOpt = function(req){
	return qs.parse(req.url.slice(2));
}
exports.db = null;
var wmauth = null;
exports.init = function(cb){
	exports.db = require("redis").createClient();
	exports.db.get("wmauth", function(err, psw){
		if (!err){
			wmauth = psw;
			cb();
		}
	});
}
exports.verifyAuth = function(func){
	return function(req, res, next){
		var opt = exports.parseOpt(req);
		exports.db.hget("E"+opt.e+":VAULT", "psw", function(err, psw){
			if (!err && psw == opt.auth){
				func(opt, req, res, exports.db);
			}else{
				res.writeHead(403);
				res.end();
			}
		});
	}
}
exports.verifyWmAuth = function(func){
	return function(req, res, next){
		var opt = exports.parseOpt(req);
		if (opt.auth == wmauth){
			func(opt, req, res, exports.db);
		}else{
			res.writeHead(403);
			res.end();
		}
	}
}
exports.noVerify = function(func){
	return function(req, res, next){
		func(exports.parseOpt(req), req, res, exports.db);
	}
}