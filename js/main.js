var game = new BlackJackGame(3);
game.start();
console.log('Game results are as follows (refresh for another game):');
game.printInfo();

//TEST cards
//var hand = new Hand();
//hand.addCard(new BlackJackCard(1, 1));
//hand.addCard(new BlackJackCard(1, 2));
//hand.addCard(new BlackJackCard(2, 1));
//hand.addCard(new BlackJackCard(1, 13));
//hand.addCard(new BlackJackCard(1, 4));
//hand.addCard(new BlackJackCard(4, 1));
//hand.addCard(new BlackJackCard(4, 2));
//hand.addCard(new BlackJackCard(4, 2));
//var arr = hand.getTotalPoints();
//console.log(hand.toString() + ' ' + hand.getTotalPoints().toString());