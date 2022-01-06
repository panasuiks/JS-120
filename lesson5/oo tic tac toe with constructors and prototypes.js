/*
Two player board game (human and computer)
3x3 grid
The human always selects a space first to start but will be modified later in the game.
Board starts out empty with zero populated spaces
Players alternate selecting spaces
A player wins when they have selected 3 spaces that form a straight line
If all spaces are populated and nobody has won it is a tie

nouns (game, player, human, computer, board (spaces), row)
verbs (selects, wins, full)

game
board
  full
row
square
marker
player
  human
  computer
  selects
  wins

*/

const rlsync = require('readline-sync');

const Square = {
  init() {
    this.marker = Square.UNUSED_SQUARE;
  },

  UNUSED_SQUARE: ' ',
  HUMAN_MARKER: 'X',
  COMPUTER_MARKER: 'O',
  toString() { return this.marker },
  setMarker(marker) { this.marker = marker },
  isOccupied() { return this.marker !== ' ' },
};

const Board = {
  init() {
    this.squares = {};
    for (let index = 1; index <= 9; index += 1) {
      let obj = Object.create(Square)
      obj.init();
      this.squares[index] = obj;
    }
  },

  displayWithClear() {
    console.clear();
    console.log();
    this.display();
  },

  display() {
    console.log();
    console.log(`     |     |     `);
    console.log(`  ${this.squares[1]}  |  ${this.squares[2]}  |  ${this.squares[3]}  `);
    console.log(`     |     |     `);
    console.log(`-----+-----+-----`);
    console.log(`     |     |     `);
    console.log(`  ${this.squares[4]}  |  ${this.squares[5]}  |  ${this.squares[6]}  `);
    console.log(`     |     |     `);
    console.log(`-----+-----+-----`);
    console.log(`     |     |     `);
    console.log(`  ${this.squares[7]}  |  ${this.squares[8]}  |  ${this.squares[9]}  `);
    console.log(`     |     |     `);
  },

  emptySquares() {
    let result = [];
    for (let key in this.squares) {
      if (!this.squares[key].isOccupied()) result.push(Number(key));
    }
    return result;
  },

  markSquareAt(value, mark) {
    this.squares[value].setMarker(mark);
  },

  fullBoard() {
    return this.emptySquares().length === 0;
  },

  getSquares(player) {
    let result = [];
    for (let key in this.squares) {
      if (this.squares[key].marker === player.getMarker()) {
        result.push(Number(key));
      }
    }
    return result;
  }
};

const Player = {
  init(marker) {
    this.marker = marker;
  },

  getMarker() {
    return this.marker;
  }
};

const Human = Object.create(Player);
Human.init = function () {
  Player.init.call(this, Square.HUMAN_MARKER)
};

const Computer = Object.create(Player)

Computer.init = function () {
  Player.init.call(this, Square.COMPUTER_MARKER);
};


const TTTGame = {
  WINNING_ROWS: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ],

  init() {
    this.board = Object.create(Board);
    this.board.init();
    this.human = Object.create(Human);
    this.human.init();
    this.computer = Object.create(Computer)
    this.computer.init();

  },

  play() {
    this.displayWelcomeMessage();
    this.board.display();
    while (true) {
      this.humanMoves();
      console.clear();
      if (this.gameOver()) break;
      this.computerMoves();
      if (this.gameOver()) break;
      this.board.displayWithClear();
    }
    this.board.displayWithClear();
    this.displayResult();
    this.displayGoodbyeMessage();
  },

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
  },

  humanMoves() {
    let emptySpaces = this.board.emptySquares();
    let choice;
    while (true) {
      console.log(`Please choose a square (${emptySpaces.join(', ')})`);
      choice = parseInt(rlsync.question(), 10);
      if (emptySpaces.includes(choice)) break;
      console.log('Invalid selection.');
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  },

  computerMoves() {
    let emptySpaces = this.board.emptySquares();
    let index = Math.floor(Math.random() * emptySpaces.length);
    this.board.markSquareAt(emptySpaces[index], Square.COMPUTER_MARKER);
  },

  displayBoard() {
    console.log(`     |     |     `);
    console.log(`  O  |  X  |  X  `);
    console.log(`     |     |     `);
    console.log(`-----+-----+-----`);
    console.log(`     |     |     `);
    console.log(`  X  |  X  |  X  `);
    console.log(`     |     |     `);
    console.log(`-----+-----+-----`);
    console.log(`     |     |     `);
    console.log(`  X  |  X  |  X  `);
    console.log(`     |     |     `);
  },

  gameOver() {
    return this.board.fullBoard() || this.someoneWon();
  },

  isWinner(player) {
    let squares = this.board.getSquares(player);
    for (let winnerArray of TTTGame.WINNING_ROWS) {
      if (winnerArray.every(value => squares.includes(value))) {
        return true;
      }
    }
    return false;
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  displayResult() {
    if (this.isWinner(this.human)) {
      console.log('Congratulations! You won!');
    } else if (this.isWinner(this.computer)) {
      console.log('The computer won.');
    } else {
      console.log('This game was a tie.');
    }
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }
}

let game = Object.create(TTTGame)
game.init();
game.play();