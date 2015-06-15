#!/usr/bin/node
"use strict";
var fs = require("fs"), urllib = require("urllib");
function download(gid, writeStream, cb){
	urllib.request("https://docs.google.com/spreadsheets/d/1GXFJ19tymWHzgnxj6ltAvMI4VnluE1DShsNk9SjbZVg&gid="+gid, {
		headers: { "GData-Version": "3.0" },
		writeStream: writeStream
	}, cb);
}
var dbgid = [
	["pillar", "0"],
	["weapon", "1863409466"],
	["shield", "457582620"],
	["permanent", "420516648"],
	["spell", "1605384839"],
	["creature", "1045918250"],
];
dbgid.forEach(function(pair){
	if (process.argv.length == 2 || process.argv.some(function(x) { return x.indexOf(pair[0]) == 0; })){
		download(pair[1], fs.createWriteStream(pair[0]+".csv"), function(err, data, res){
			if (err){
				console.log("Failed to download " + pair[0], err.message);
			}else console.log(pair[0]);
		});
	}
});