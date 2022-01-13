const rlsync = require('readline-sync');

function Card(rank, suite) {
  this.rank = rank;
  this.suite = suite;
}
const cardPrototype = {
  toString() {
    return `${this.rank} of ${this.suite}`;
  },

  getRank() {
    return this.rank;
  }
};
Object.assign(Card.prototype, cardPrototype);

function Deck(quantity) {
  this.cards = [];
  for (let deckNum = 1; deckNum <= quantity; deckNum += 1) {
    for (let rank of Deck.RANKS) {
      for (let suite of Deck.SUITS) {
        this.cards.push(new Card(rank, suite));
      }
    }
  }
  this.shuffle();
}
Deck.RANKS = ['Ace', 'Ace', 'Ace', 'Ace']// ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
Deck.SUITS = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
const deckPrototype = {
  shuffle() {
    this.cards.sort(() => {
      return 0.5 - Math.random();
    });
  },

  getQuantity() {
    return this.cards.length;
  },

  removeCard() {
    return this.cards.shift();
  }
};
Object.assign(Deck.prototype, deckPrototype);


function Game(names) {
  this.dealer = new Dealer('Dealer');
  this.players = [];
  for (let index = 0; index < names.length; index += 1) {
    this.players.push(new Player(names[index], Game.STARTING_BALANCE));
  }
}
Game.STARTING_BALANCE = 5;
Game.MAX_SCORE = 21;
Game.DEALER_MIN = 17;
Game.CARDS_PER_PLAYER = 2;
Game.MIN_CARDS = 50;
Game.DECK_QUANTITY = 4;
function CardValues() {
  for (let rank = 2; rank <= 10; rank += 1) {
    this[rank] = rank;
  }
  this.Jack = 10;
  this.Queen = 10;
  this.King = 10;
  this.Ace = 11;
}
Game.CARD_VALUES = new CardValues();
const gamePrototype = {
  play() {
    this.clearConsole();
    this.displayWelcomeMessage();
    while (true) {
      this.takeBets();
      this.dealCards();
      this.playPlayersHands();
      if (this.playersStillPlaying()) this.playDealersHand();
      this.determineWinners();
      this.payoutBets();
      this.displayResult();
      this.removeBrokePlayers();
      if (this.anotherRound()) {
        this.resetHands();
      } else break;
      this.clearConsole();
    }
    this.displayGoodbyeMessage();
  },

  removeBrokePlayers() {
    this.players = this.players.filter(player => {
      return (!player.isBroke());
    });
  },

  takeBets() {
    for (let player of this.players) {
      player.getBetFromUser();
    }
  },

  anotherRound() {
    if (this.players.length === 0) {
      console.log('There are no players remaining.');
      return false;
    }
    let response;
    console.log(`Would y'all like to play another round (yes/no)?`);
    response = rlsync.question().toLowerCase();
    return response === 'yes';
  },

  determineWinners() {
    for (let player of this.players) {
      if (player.getWinner() === true || player.getWinner() === false) {
        continue;
      } else if (this.dealer.getWinner() === false) {
        player.setWinner();
      } else if (this.calcScore(player) > this.calcScore(this.dealer)) {
        player.setWinner();
      } else if (this.calcScore(player) < this.calcScore(this.dealer)) {
        player.setLoser();
      }
    }
  },

  dealCards() {
    this.dealer.dealHands(this.players);
  },

  payoutBets() {
    for (let player of this.players) {
      if (player.getWinner()) {
        player.adjustWallet(player.getBet());
        this.dealer.adjustWallet(-player.getBet());
      } else if (player.getWinner() === false) {
        player.adjustWallet(-player.getBet());
        this.dealer.adjustWallet(player.getBet());
      }
    }
  },

  resetHands() {
    for (let player of this.players) {
      player.resetHand();
    }
    this.dealer.resetHand();
  },

  setPlayerWinner(player) {
    player.setWinner();
  },

  setPlayerLoser(player) {
    player.setLoser();
  },

  calcScore(player) {
    let total = 0;
    let acesFound = 0;
    for (let card of player.getCards()) {
      total += Game.CARD_VALUES[card.getRank()];
      if (card.getRank() === 'Ace') acesFound += true;
    }
    for (let aces = 1; aces <= acesFound; aces += 1) {
      if (total > Game.MAX_SCORE) {
        total -= 10;
      }
    }
    return total;
  },

  displayTwentyOneMessage(player) {
    console.log(`${player.name} hit BlacKJack! Bravo!`);
  },

  playPlayersHands() {
    for (let player of this.players) {
      while (true) {
        this.clearConsole();
        this.dealer.showOneCard();
        this.displayPlayersCards(player);
        if (this.didPlayerTwentyOne(player)) {
          this.displayTwentyOneMessage(player);
          player.setWinner();
          break;
        } else if (this.didPlayerBust(player)) {
          this.displayBustedMessage(player);
          player.setLoser();
          break;
        } else if (player.hitFromUser()) this.dealer.dealCard(player);
        else break;
      }
      rlsync.question(`Press enter to move onto the next player`);
    }
  },

  displayBustedMessage(player) {
    console.log(`${player.getName()} has busted and loses`);
  },

  playDealersHand() {
    while (true) {
      this.clearConsole();
      this.displayAllCards();
      if (this.didPlayerBust(this.dealer)) {
        this.dealer.setLoser();
      }
      if (this.didPlayerTwentyOne(this.dealer)) {
        this.dealer.setWinner();
      }
      if (this.dealerHit() === false) break;
      console.log(`Press enter to deal card`);
      rlsync.question();
      this.dealer.dealCard(this.dealer);
    }
  },

  didPlayerBust(player) {
    return (this.calcScore(player) > Game.MAX_SCORE);
  },

  playersStillPlaying() {
    return this.players.some(player => player.getWinner() === undefined);
  },

  didPlayerTwentyOne(player) {
    return (this.calcScore(player) === 21);
  },

  dealerHit() {
    return this.calcScore(this.dealer) < Game.DEALER_MIN;
  },

  displayPlayersCards(player) {
    player.showCards();
    console.log(`${player.getName()} has a score of ${this.calcScore(player)}`);
    console.log();
  },

  displayAllCards() {
    for (let player of this.players) {
      this.displayPlayersCards(player);
    }
    this.displayPlayersCards(this.dealer);
  },

  displayResult() {
    for (let player of this.players) {
      if (player.getWinner() === true) {
        console.log(`${player.getName()} won ${player.getBetString()} and now has ${player.getWalletString()}`);
      } else if (player.getWinner() === false) {
        console.log(`${player.getName()} lost ${player.getBetString()} and now has ${player.getWalletString()}`);
      } else {
        console.log(`${player.getName()} tied the dealer and still has ${player.getWalletString()}.`);
      }
    }
  },

  displayWelcomeMessage() {
    console.log(`Welcome to Twenty-One!`);
  },

  displayGoodbyeMessage() {
    console.log(`Thanks for playing Twenty-One! Have a lovely day!`);
  },

  clearConsole() {
    console.clear();
  },
};
Object.assign(Game.prototype, gamePrototype);


function Participant(name) {
  this.name = name;
  this.cards = [];
  this.winner = undefined;
  this.wallet = 0;
}
const participantPrototype = {
  resetHand() {
    this.cards = [];
    this.winner = undefined;
  },

  getWinner() {
    return this.winner;
  },

  getWallet() {
    return this.wallet;
  },

  getWalletString() {
    return `$${this.wallet.toFixed(2)}`;
  },

  receiveCard(card) {
    this.cards.push(card);
  },

  setWinner() {
    this.winner = true;
  },

  setLoser() {
    this.winner = false;
  },

  adjustWallet(value) {
    this.wallet += value;
  },

  getCards() {
    return this.cards;
  },

  getName() {
    return this.name;
  },

  showCards() {
    console.log(`${this.name} has the following cards:`);
    for (let card of this.cards) {
      console.log(`   ${card.toString()}`);
    }
  }
};
Object.assign(Participant.prototype, participantPrototype);

function Player(name, wallet) {
  Participant.call(this, name);
  this.bet = 0;
  this.wallet = wallet;
}
const playerPrototype = {
  getBetFromUser() {
    while (true) {
      console.log(`How much would ${this.name} like to bet (wallet = ${this.getWalletString()})?`);
      let bet = rlsync.question();
      bet = parseFloat(bet);
      if (bet > 0 && bet <= this.wallet) {
        this.bet = Math.round(bet * 100) / 100;
        break;
      } else {
        console.log('Invalid bet');
      }
    }
  },

  isBroke() {
    return this.wallet <= 0;
  },

  getBet() {
    return this.bet;
  },

  getBetString() {
    return `$${this.bet.toFixed(2)}`;
  },

  hitFromUser() {
    const OPTIONS = ['stay', 'hit'];
    while (true) {
      console.log(`Would ${this.name} like to stay or hit?`);
      let choice = rlsync.question().toLowerCase();
      if (OPTIONS.includes(choice)) {
        return choice === OPTIONS[1];
      }
      console.log('Invalid choice');
    }
  }
};
Player.prototype = Object.create(Participant.prototype);
Player.prototype.constructor = Player;
Object.assign(Player.prototype, playerPrototype);

function Dealer(name) {
  Participant.call(this, name);
  this.deck = new Deck(Game.DECK_QUANTITY);
}
const dealerPrototype = {
  dealHands(players) {
    if (this.deck.getQuantity() < Game.MIN_CARDS) {
      this.deck = new Deck(Game.DECK_QUANTITY);
    }
    for (let card = 1; card <= Game.CARDS_PER_PLAYER; card += 1) {
      for (let player of players) {
        this.dealCard(player);
      }
      this.dealCard(this);
    }
  },

  dealCard(player) {
    player.receiveCard(this.deck.removeCard());
  },

  showOneCard() {
    console.log(`${this.name} has the following cards:`);
    let card = this.cards[0];
    console.log(`   ${card.toString()}`);
    console.log();
  },
};
Dealer.prototype = Object.create(Participant.prototype);
Dealer.prototype.constructor = Dealer;
Object.assign(Dealer.prototype, dealerPrototype);

let game = new Game(['Steve', 'Christen']);
game.play();
