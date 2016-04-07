var Deck = function() {
	this.cards = [];

	for (var suit in Card.SUIT) {
		for (var i = 1; i <= 13; i++) {
			this.cards.push(new BlackJackCard(Card.SUIT[suit], i));
		}
	}
	;
};

Deck.prototype = {
	shuffle: function() {
		var arr = this.cards;
    var j, x, i;
    for (i = arr.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
	},
	pop: function() {
		return this.cards.pop();
	}
};



