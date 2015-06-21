var util = require("./util");
var sutil = require("./sutil");
var Cards = require("./Cards");
function countSide(deck, mark){
	var ups = 0;
	return deck.every(function(code, ele, mark){
		if (!~util.fromTrueMark(code)) return true;
		var card = Cards[code];
		if (util.isUpped(code)){
			if (card.ele == ele || (mark == ele && util.isPend(code))){
				ups += 2/3;
			}else ups++;
		}
		return card;
	}) ? ups : -1;
}
function countDeck(deck, ele, mark){
	var inelement = 0, ups = 0;
	var legal = deck.every(function(code){
		if (!~util.fromTrueMark(code)) return true;
		var card = Cards[code];
		if (!card) return false;
		if (card.ele == ele || (mark == ele && util.isPend(code))){
			inelement++;
			if (util.isUpped(code)) ups += 2/3;
		}else if (util.isUpped(code)) ups++;
	});
	return legal && inelement > deck.length/2 ? ups : -1;
}
module.exports = sutil.verifyAuth(function(opt, req, res, db){
	var main = opt.main, side = opt.side, role = opt.role, n = parseInt(opt.n) || 0, e = opt.e;
	if (typeof main !== "string" || typeof side != "string" || typeof role != "string" || ((role == "Gen") != (n == 0))){
		return sutil.reject(res);
	}
	main = main.split(" ");
	side = side.split(" ");
	if (main.length < 32 || main.length > 61 || side.length != 6) return sutil.reject(res);
	var mark = util.fromTrueMark(main[main.length-1]);
	if (mark == -1) return sutil.reject(res);
	var mainCount = countMain(main, e, mark), sideCound = countSide(side, e, mark);
	if (mainCount == -1 || sideCount == -1){
		return sutil.reject(res);
	}

});