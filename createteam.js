var qs = require("querystring");
module.exports = function(db){
	return function(req, res, next){
		var opt = qs.parse(req.query);
		// TODO verify opt.auth
		var ele = opt.e, elec = opt.s;
		db.hsetall("E"+ele+":VAULT", /*TODO*/);
	}
}