const rlsync = require('readline-sync');
const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choicesString = CHOICES[0]
      for (let index = 1; index < CHOICES.length; index += 1) {
        if (index === CHOICES.length - 1) {
          choicesString += ` or ${CHOICES[index]}`
        } else {
          choicesString += `, ${CHOICES[index]}`
        }
      }
      let choice;
      while (true) {
        console.log(`Please choose ${choicesString}:`);
        choice = rlsync.question().toLowerCase();
        if (CHOICES.includes(choice)) break;
        console.log('Invalid choice selected.');
      }
      this.move = choice;
      this.moveHistory[choice].count += 1;
    },
  };

  return Object.assign(playerObject, humanObject);

}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      let thresholds = this.getThresholds()
      let randomIndex = Math.random();
      for (let index = 0; index < thresholds.length; index += 1) {
        if (randomIndex < thresholds[index]) {
          let choice = CHOICES[index]
          this.move = choice;
          this.moveHistory[choice].count += 1;
          break
        }
      }
    },

    getThresholds() {
      const DEFAULTODDS = 0.2;
      const VARIABLEODDS = 0.1;
      let percentages = this.getLossPercentages();
      let weighted = percentages.map(percent => {
        return DEFAULTODDS - percent * VARIABLEODDS
      });
      let totalWeighted = weighted.reduce((prev, current) => prev + current, 0);
      let result = 0;
      let thresholds = weighted.map(value => {
        result += value * 1 / totalWeighted;
        return result;
      });
      thresholds[thresholds.length - 1] = 1;
      return thresholds;
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createPlayer() {
  let playerObject = {

    move: null,
    score: 0,
    moveHistory: {},

    recordSelection(selection, result) {
      this.moveHistory[selection].count += 1;
      if (result === 'loss') {
        this.moveHistory[selection].losses += 1;
      }
    },

    getLossPercentages() {
      let result = [];
      for (let selection of CHOICES) {
        let percentage = this.moveHistory[selection].losses / this.moveHistory[selection].count || 0;
        result.push(percentage);
      }
      return result;
    },

    recordWin() {
      this.score += 1;
    },

    recordLoss() {
      this.moveHistory[this.move].losses += 1;
    },

    createBlankHistory() {
      let obj = {};
      for (let index = 0; index < CHOICES.length; index += 1) {
        obj[CHOICES[index]] = { losses: 0, count: 0 };
      }
      this.moveHistory = obj;
    },

    resetScore() {
      this.score = 0;
    }
  };
  playerObject.createBlankHistory();
  return playerObject;
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  maxScore: 5,

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.displayScore();
      this.human.choose();
      this.computer.choose();
      this.determineAndDisplayRoundWinner();
      this.displayGameWinner();
      if (!this.playAgain()) break;
      console.clear();
    }
    this.displayGoodbyeMessage();
  },

  displayGameWinner() {
    if (this.didComputerWinGame() || this.didHumanWinGame()) {
      let winner;
      let loser;
      if (this.didComputerWinGame()) {
        winner = 'computer';
        loser = 'human';
      } else {
        winner = 'human';
        loser = 'computer'
      }
      console.log(`The game was won by ${winner} with a score of ${this[winner].score} to ${this[loser].score}`);
      this.resetScores();
    }
  },

  resetScores() {
    this.human.resetScore();
    this.computer.resetScore();
  },

  playAgain() {
    let selection;
    const CHOICES_YN = ['y', 'n'];
    while (true) {
      console.log('Would you like to play again? (yes/no)');
      selection = rlsync.question().toLowerCase()[0];
      if (CHOICES_YN.includes(selection)) return (selection === CHOICES_YN[0]);
      console.log('Invalid selection');
    }
  },

  didComputerWinGame() {
    return this.computer.score >= this.maxScore
  },

  didHumanWinGame() {
    return this.human.score >= this.maxScore
  },


  displayScore() {
    let humanScore = this.human.score;
    let computerScore = this.computer.score;
    console.log(`The score is human: ${humanScore}  |  computer: ${computerScore}`);
  },

  displayWelcomeMessage() {
    console.clear();
    console.log('Welcome to Rock, Papers, Scissors, Lizard, Spock!');
  },

  displayGoodbyeMessage() {
    console.log('Thank you for playing Rock, Paper, Scissors, Lizard, Spock! Have a nice day!');
  },

  determineAndDisplayRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);

    if (humanMove === computerMove) {
      console.log('This round is a tie!');
    } else if ((humanMove === 'rock' && (computerMove === 'scissors' || computerMove === 'lizard')) ||
      (humanMove === 'paper' && (computerMove === 'rock' || computerMove === 'spock')) ||
      (humanMove === 'scissors' && (computerMove === 'paper' || computerMove === 'lizard')) ||
      (humanMove === 'lizard' && (computerMove === 'spock' || computerMove === 'paper')) ||
      (humanMove === 'spock' && (computerMove === 'rock' || computerMove === 'scissors'))) {
      this.human.recordWin();
      this.computer.recordLoss();
      console.log('You won this round!');
    } else {
      this.human.recordLoss();
      this.computer.recordWin();
      console.log('Computer won this round!');
    }
  }
};

RPSGame.play();

