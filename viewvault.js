var sutil = require("./sutil");
module.exports = sutil.verifyAuth(function(opt, req, res, db){
	db.hgetall("E"+opt.e+":VAULT", function(err, vault){
		if (vault){
			delete vault.psw;
			res.writeHead(200, {"Content-Type": "text/json"});
			res.end(JSON.stringify(vault));
		}
	});
});