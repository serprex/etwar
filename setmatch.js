var sutil = require("./sutil");
module.exports = sutil.verifyWmAuth(function(opt, res, req, db){
	db.lindex("R"+opt.r, function(err, rnum){
		rnum = (rnum&0xFFFF) | opt.t1<<16 | opt.t2<<20;
		db.lset("R"+opt.r, opt.n, rnum, function(err){
			if (!err) res.end(rnum.toString());
		});
	});
	opt.t1
});