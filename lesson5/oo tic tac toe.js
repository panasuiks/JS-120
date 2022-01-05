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

class Square {
  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  static UNUSED_SQUARE = ' ';
  static HUMAN_MARKER = 'X';
  static COMPUTER_MARKER = 'O';

  toString() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isOccupied() {
    return this.marker !== ' ';
  }
}

class Board {
  constructor() {
    this.squares = {};
    for (let index = 1; index <= 9; index += 1) {
      this.squares[index] = new Square();
    }
  }

  displayWithClear() {
    console.clear();
    console.log();
    this.display();
  }

  display(welcome = false) {
    if (welcome === false) {
      console.log();
    }
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
  }

  emptySquares() {
    let result = [];
    for (let key in this.squares) {
      if (!this.squares[key].isOccupied()) result.push(Number(key));
    }
    return result;
  }

  markSquareAt(value, mark) {
    this.squares[value].setMarker(mark);
  }

  fullBoard() {
    return this.emptySquares().length === 0;
  }

  getSquares(player) {
    let result = [];
    for (let key in this.squares) {
      if (this.squares[key].marker === player.getMarker()) {
        result.push(Number(key));
      }
    }
    return result;
  }

}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}


class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  static WINNING_ROWS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  play() {
    this.displayWelcomeMessage();
    this.board.display(true);
    while (true) {
      this.humanMoves();
      console.clear();
      if (this.gameOver()) break;
      this.computerMoves();
      if (this.gameOver()) break;
      this.board.display();
    }
    this.board.display();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
  }

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
  }

  computerMoves() {
    let emptySpaces = this.board.emptySquares();
    let index = Math.floor(Math.random() * emptySpaces.length);
    this.board.markSquareAt(emptySpaces[index], Square.COMPUTER_MARKER);
  }

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
  }

  gameOver() {
    return this.board.fullBoard() || this.someoneWon();
  }

  isWinner(player) {
    let squares = this.board.getSquares(player);
    for (let winnerArray of TTTGame.WINNING_ROWS) {
      if (winnerArray.every(value => squares.includes(value))) {
        return true;
      }
    }
    return false;
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  displayResult() {
    if (this.isWinner(this.human)) {
      console.log('Congratulations! You won!');
    } else if (this.isWinner(this.computer)) {
      console.log('The computer won.');
    } else {
      console.log('This game was a tie.');
    }
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }
}

let game = new TTTGame();
game.play();