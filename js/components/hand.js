var Hand = function() {
	this.cards = [];

};
Hand.prototype = {
	addCard: function(card) {
		this.cards.push(card);
	},
	removeCardByIdx: function(cardIdx) {
		return this.cards.splice(cardIdx, 1);
	},
	getUpCard: function() {
		//in blackjack game, first card is always up
		return this.cards.length > 0 ? this.cards[0] : null;
	},
	getTotalPoints: function() {
		var result = [0];
		var i, eachCard, j;
		for (i = 0; i < this.cards.length; i++) {
			eachCard = this.cards[i];
			result[0] += eachCard.point;
		}

		//for each ACE, add 10 to make 1 more possible value
		for (i = 0; i < this.cards.length; i++) {
			eachCard = this.cards[i];
			if (eachCard.rank === Card.RANK.ACE && result[result.length - 1] <= 11) {
				result.push(result[result.length - 1] + 10);
			}
		}

		return result;
	},
	isBust: function() {
		return this.getTotalPoints()[0] > 21 ? true : false;
	},
	toString: function() {
		var str = '';
		for (var i = 0; i < this.cards.length; i++) {
			str += this.cards[i].toString() + ' ';
		}
		return str;
	}
};



