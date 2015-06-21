"use strict";
exports.isUpped = function(code){
	return code>="6qo";
}
exports.parseMatch = function(match){
	return {team: [match&15, (match>>8)&15], mem: [(match>>4)&15, (match>>12)&15], res: [(match>>16)&15, (match>>20)&15]};
}
exports.matchToString = function(mres){
	return (mres.res[0] == 15 ? "" : mres.res[0] + "-" + mres.res[1] + ", ") + mres.team[0] + ":" + mres.mem[0] + " - " + mres.team[1] + ":" + mres.mem[1];
}
exports.fromTrueMark = function(x){
	var code = parseInt(x, 32);
	return code >= 9010 && code <= 9022 ? code-9010 : -1;
}
exports.toTrueMark = function(n){
	return (n+9010).toString(32);
}
exports.Enames = Object.freeze(["Underworld", "Entropy", "Death", "Gravity", "Earth", "Life", "Fire", "Water", "Light", "Air", "Time", "Darkness", "Aether"]);
exports.PillarList = Object.freeze(["4sa", "4vc", "52g", "55k", "58o", "5bs", "5f0", "5i4", "5l8", "5oc", "5rg", "5uk", "61o"]);
exports.PendList = Object.freeze(["4sc", "50u", "542", "576", "5aa", "5de", "5gi", "5jm", "5mq", "5pu", "5t2", "606", "63a"]);
exports.NymphList = Object.freeze([undefined, "500", "534", "568", "59c", "5cg", "5fk", "5io", "5ls", "5p0", "5s4", "5v8", "62c"]);
exports.AlchemyList = Object.freeze([undefined, "4vn", "52s", "55v", "595", "5c7", "5fb", "5ig", "5lj", "5om", "5rr", "5uu", "621"]);
exports.ShardList = Object.freeze([undefined, "50a", "53e", "56i", "59m", "5cq", "5fu", "5j2", "5m6", "5pa", "5se", "5vi", "62m"]);
