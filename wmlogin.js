var sutil = require("./sutil");
module.exports = sutil.verifyWmAuth(function(opt, req, res, db){
	db.get("ROUND", function(err, round){
		if (!err) res.end(round);
	});
});