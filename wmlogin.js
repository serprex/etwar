var sutil = require("./sutil");
module.exports = sutil.verifyWmAuth(function(opt, req, res, db){
	res.end("{}");
});