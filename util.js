"use strict";
exports.isUpped = function(code){
	return code>="6qo";
}
exports.parseMatch = function(matchval){
	return {team: [match&15, (match>>8)&15], mem: [(match>>4)&15, (match>>12)&15], res: [(match>>16)&15, (match>>20)&15]};
}
exports.matchToString = function(mres){
	return (mres.res[0] == 15 ? "" : mres.res[0] + "-" + mres.res[1] + ", ") + mres.team[0] + ":" + mres.mem[0] + " - " + mres.team[1] + ":" + mres.mem[1];
}
exports.Enames = ["Underworld", "Entropy", "Death", "Gravity", "Earth", "Life", "Fire", "Water", "Light", "Air", "Time", "Darkness", "Aether"];