var sutil = require("./sutil");
module.exports = sutil.verifyAuth(function(opt, req, res, db){
	res.end("{}");
});