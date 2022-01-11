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
    return this.marker !== Square.UNUSED_SQUARE;
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

  isSquareOccupied(location) {
    return this.squares[location].isOccupied();
  }


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
  }

  emptySquares() {
    let result = [];
    for (let key in this.squares) {
      if (!this.isSquareOccupied(key)) result.push(Number(key));
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
    this.firstPlayer = this.human;
    this.score = { human: 0, computer: 0 };
  }

  static WINNING_SCORE = 3;

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
    this.board.display();
    while (true) {
      this.playRound();
      this.updateScore();
      this.board.displayWithClear();
      this.displayResult();
      if (this.isMatchOver()) break;
      if (this.playAgain() === false) break;
      this.resetBoard();
      this.board.displayWithClear();
      this.switchFirstPlayer();
    }
    this.displayGoodbyeMessage();
  }

  updateScore() {
    if (this.isWinner(this.human)) this.score.human += 1;
    if (this.isWinner(this.computer)) this.score.computer += 1;
  }

  isMatchOver() {
    return (this.score.human > TTTGame.WINNING_SCORE ||
      this.score.computer >= TTTGame.WINNING_SCORE);
  }

  otherPlayer(player) {
    if (player === this.human) return this.computer;
    if (player === this.computer) return this.human;
    // I could add return undefined here to remove the ESLINT error
    // I don't love the idea of hopefully unreachable code. Thoughts?
  }

  playRound() {
    while (true) {
      this.selectMove(this.firstPlayer);
      if (this.gameOver()) break;
      this.board.displayWithClear();
      this.selectMove(this.otherPlayer(this.firstPlayer));
      if (this.gameOver()) break;
      this.board.displayWithClear();
    }
  }

  playAgain() {
    const OPTIONS = ['y', 'n'];
    const Y_INDEX = 0;
    let choice;
    while (true) {
      console.log(`Would you like to play again? (y,n)`);
      choice = rlsync.question().toLowerCase();
      if (OPTIONS.includes(choice)) break;
      console.log('Invalid selection.');
    }
    return choice === OPTIONS[Y_INDEX];
  }

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Tic Tac Toe!');
  }

  resetBoard() {
    this.board = new Board();
  }

  switchFirstPlayer() {
    this.firstPlayer = this.otherPlayer(this.firstPlayer);
  }

  selectMove(player) {
    if (player === this.human) this.humanMoves();
    if (player === this.computer) this.computerMoves();
  }

  humanMoves() {
    let emptySpaces = this.board.emptySquares();
    let choice;
    while (true) {
      console.log(`Please choose a square (${TTTGame.joinOr(emptySpaces)})`);
      choice = parseInt(rlsync.question(), 10);
      if (emptySpaces.includes(choice)) break;
      console.log('Invalid selection.');
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  static joinOr(array) {
    let string;
    if (array.length > 1) {
      string = array.slice(0, array.length - 1).join(', ');
      string += ` or ${array[array.length - 1]}`;
    } else {
      string = array[0];
    }
    return string;
  }

  winningMove(player) {
    let emptySpaces = this.board.emptySquares();
    for (let index = 0; index < emptySpaces.length; index += 1) {
      let location = emptySpaces[index];
      this.board.markSquareAt(location, player.getMarker());
      if (this.gameOver()) {
        this.board.markSquareAt(location, Square.UNUSED_SQUARE);
        return location;
      }
      this.board.markSquareAt(location, Square.UNUSED_SQUARE);
    }
    return undefined;
  }

  randomAvailableSquare() {
    let emptySpaces = this.board.emptySquares();
    let index = Math.floor(Math.random() * emptySpaces.length);
    return emptySpaces[index];
  }

  computerMoves() {
    const CENTER_SQUARE = 5;
    let computerWin = this.winningMove(this.computer);
    let humanWin = this.winningMove(this.human);
    let centerSquare = this.board.isSquareOccupied(CENTER_SQUARE) ?
      undefined : CENTER_SQUARE; //ESLINT?
    let randomSelection = this.randomAvailableSquare();
    let selection = computerWin || humanWin || centerSquare || randomSelection;
    this.board.markSquareAt(selection, this.computer.getMarker());
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
    console.log(`The score is you: ${this.score.human} | computer: ${this.score.computer}`);
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Tic Tac Toe! Goodbye!');
  }
}

let game = new TTTGame();
game.play();