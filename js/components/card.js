var Card = function(suit, rank) {
	this.suit = suit;
	this.rank = rank;

};
Card.prototype = {
	toString: function() {
		var str = '[';
		switch (this.rank) {
			case Card.RANK.Ace:
				str += 'A';
				break;
			case Card.RANK.JACK:
				str += 'J';
				break;
			case Card.RANK.QUEEN:
				str += 'Q';
				break;
			case Card.RANK.KING:
				str += 'K';
				break;
			default:
				str += this.rank;
		}

		switch (this.suit) {
			case Card.SUIT.DIAMOND:
				str += '♦';
				break;
			case Card.SUIT.HEART:
				str += '♥';
				break;
			case Card.SUIT.CLUB:
				str += '♣';
				break;
			case Card.SUIT.SPADE:
				str += '♠';
				break;
		}

		str += ']';
		return str;
	}
};
Card.SUIT = {
	DIAMOND: 1,
	HEART: 2,
	CLUB: 3,
	SPADE: 4
};
Card.RANK = {//1-13
	ACE: 1,
	JACK: 11,
	QUEEN: 12,
	KING: 13
};

var BlackJackCard = function(suit, rank) {
	Card.call(this, suit, rank);

	switch (rank) {
		case Card.RANK.JACK:
		case Card.RANK.QUEEN:
		case Card.RANK.KING:
			this.point = 10;
			break;
		case Card.RANK.ACE:
			this.point = 1; //OR 11
			break
		default:
			this.point = rank;
	}
};
BlackJackCard.prototype = new Card();
BlackJackCard.prototype.constructor = BlackJackCard;

