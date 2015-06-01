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