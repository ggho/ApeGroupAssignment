var BlackJackGame = function(numOfBot) {
	//Init deck
	this.deck = new Deck();
	this.deck.shuffle();

	//Init Players
	this.dealer = new Dealer();
	this.players = [];
	for (var i = 0; i < numOfBot; i++)
		this.players.push(new PlayerBot());

	//Init other properties
	this.currentPlayerIdx;
};

BlackJackGame.prototype = {
	start: function() {
		//for each player deal two starting cards
		for (var i = 0; i < this.players.length; i++) {
			for (var j = 0; j < 2; j++)
				this.dealTo(this.players[i]);
		}

		//deal to dealer as well?
		for (var j = 0; j < 2; j++)
			this.dealTo(this.dealer);


		if (this.players.length > 0)
			this.currentPlayerIdx = 0;

		this.playersTurn();
		//all players done, dealer's turn
		this.dealerTurn();

	},
	playersTurn: function() {
		while (this.currentPlayerIdx < this.players.length) {
			var curPlayer = this.players[this.currentPlayerIdx];
			this.waitForPlayerDecision(curPlayer);
			//waiting time...

			this.currentPlayerIdx++;
		}
		return false;
	},
	dealerTurn: function() {
		//check if all players are busted, if yes, return; else play dealer turn
		var eachPlayer, allPlayerBusted = true;
		for (var i = 0; i < this.players.length; i++) {
			eachPlayer = this.players[i];
			if (!eachPlayer.isBust()) {
				allPlayerBusted = false;
				break;
			}
		}

		if (allPlayerBusted)
			return; //finish turn

		//dealer's rules
		var dealerDecision;
		while (dealerDecision !== PlayerAction.STAND) {
			dealerDecision = this.dealer.decideAction();

			if (dealerDecision === PlayerAction.HIT) {
				this.dealTo(this.dealer);

				if (this.dealer.isBust()) {
					//set all player win and return
					for (var i = 0; i <this.players.length; i++) {
						this.players[i].isWin = true;
					}
					return;
				}
			}
		}
		
		//check winner
		this.checkWinningPlayer();
	},
	waitForPlayerDecision: function(player) {
		var playerDecision;
		while (playerDecision !== PlayerAction.STAND) {
			playerDecision = player.decideAction(this.dealer.getUpCard());

			if (playerDecision === PlayerAction.HIT) {
				this.dealTo(player);

				if (player.isBust()) {
					//raise a bust event?
					break; //move on with next player
				}
			}
		}

	},
	checkWinningPlayer: function() {
		var eachPlayer;
		for (var i = 0; i < this.players.length; i++) {
			eachPlayer = this.players[i];
			if (!eachPlayer.isBust() && eachPlayer.getBestPoint() > this.dealer.getBestPoint())
				eachPlayer.isWin = true;
		}
	},
	dealTo: function(player) {
		var card = this.deck.pop();
		player.addHandCard(card);
	},
	printInfo: function() {
		var str = '';
		for (var i = 0; i < this.players.length; i++) {
			str += 'Player' + i + ': ' + this.players[i].handInfoString() + ' ->';
			str += this.players[i].isWin? 'WIN ' : 'LOSS ' ;
			str += '\n';
		}

		str += 'Dealer: ' + this.dealer.handInfoString();
		console.log(str);
	}
};


