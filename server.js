#!/usr/bin/node
"use strict";
process.chdir(__dirname);
var db = require("redis").createClient();
var app = require("connect")().
	use(hiderdb).
	use(require("compression")()).
	use(require("serve-static")(__dirname, { maxAge: 2626262000 }));
// TODO WM interfaces for setting match results, match generator, assigning penalty, dead line logic
["setdeck", "getdecks", "setdiscard", "setsalvage", "viewvault", "setvault", "standings", "wmlogin", "createteam", "teamlogin", "generatematches"].forEach(function(mod){
	app.use("/"+mod, require("./"+mod)(db));
});
app.listen(80);
function hiderdb(req, res, next){
	if (req.url.slice(-4) == ".rdb"){
		res.writeHead(403);
		res.end();
	}else{
		next();
	}
}