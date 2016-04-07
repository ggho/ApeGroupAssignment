var Player = function() {
	this.hand = new Hand();
	this.bestPoint = 0; 
	this.isWin = false;
};
Player.prototype = {
	addHandCard: function(card) {
		this.hand.addCard(card);
	},
	isBust: function() {
		return this.hand.isBust();
	},
	getBestPoint: function(){
		var points= this.hand.getTotalPoints();
		return points[points.length-1];
	},
	handInfoString: function() {

		var handPoints = this.hand.getTotalPoints();

		return this.hand.toString() + ' Total Points: ' + handPoints.toString();
	},
	printHandInfo: function() {
		console.log(this.handInfoString());
	}

};

var PlayerAction = {
	HIT: 1,
	STAND: 2
};

//Dealer extends Player
var Dealer = function() {
	Player.call(this);
};
Dealer.prototype = new Player();
Dealer.prototype.constructor = Dealer;
Dealer.prototype.decideAction = function() {
	var handPoints = this.hand.getTotalPoints();
	var betterHandPoint = handPoints.length > 1 ? handPoints[handPoints.length-1] : handPoints[0];
		
	if (betterHandPoint >= 17) {
		return PlayerAction.STAND;
	} else { //<17
		return PlayerAction.HIT;
	}
};
Dealer.prototype.getUpCard = function(){
	return this.hand.getUpCard();
};

//PlayerBot extends player
var PlayerBot = function() {
	Player.call(this);
};
PlayerBot.prototype = new Player();
PlayerBot.prototype.constructor = PlayerBot;
PlayerBot.prototype.decideAction = function(dealerUpCard) {
	//PlayerBot logic goes here
	var handPoints = this.hand.getTotalPoints();
	var bestHandPoint = handPoints.length > 1 ? handPoints[handPoints.length - 1] : handPoints[0];

	if (bestHandPoint >= 20) {
		return PlayerAction.STAND;
	} else if (bestHandPoint <= 11) {
		return PlayerAction.HIT;
	} else {
		//gray area: 12-19
		if (handPoints.length > 1) {
			//has ACE, lower point : 2-9
			return PlayerAction.HIT;
		} else {
			//no ACE, decide based on dealerUpCard
			if(bestHandPoint >= 17)
				return PlayerAction.STAND;
			else if(bestHandPoint === 12){
				if(4 <= dealerUpCard.point && dealerUpCard.point >= 6)
					return PlayerAction.STAND;
				else
					return PlayerAction.HIT;
			}else{ //point: 13 thr 16
				if(2 <= dealerUpCard.point && dealerUpCard.point >= 6)
					return PlayerAction.STAND;
				else
					return PlayerAction.HIT;		
			}
		}
	}
};

