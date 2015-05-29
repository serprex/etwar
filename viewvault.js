var sutil = require("./sutil");
module.exports = function(db){
	return function(req, res, next){
		sutil.verifyAuth(db, req, function(opt){
			db.hgetall("E"+opt.e+":VAULT", function(err, vault){
				if (vault){
					delete vault.psw;
					res.writeHead(200, {"Content-Type": "text/json"});
					res.end(JSON.stringify(vault));
				}
			});
		});
	}
}