#!/usr/bin/node
"use strict";
process.chdir(__dirname);
var db = require("redis").createClient();
var app = require("connect")().
	use(require("compression")()).
	use(require("serve-static")(__dirname, { maxAge: 2626262000 })).
	use("/setdeck", require("./setdeck")(db)).
	use("/getdecks", require("./getdecks")(db)).
	use("/standings", require("./standings")(db));
