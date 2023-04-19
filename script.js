let userScore = 0;
let computeScore = 0;

function getRandomIntInclusive(min, max) {
  // return Math.floor(Math.random() * max);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getComputerChoice() {
  let choice = getRandomIntInclusive(1, 3);
  //console.log("Computer selection: " + choice);

  if (choice === 1) return "ROCK";
  if (choice === 2) return "PAPER";
  if (choice === 3) return "SCISSORS";
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toUpperCase();

  if (playerSelection === computerSelection) return -1;

  if (playerSelection === "ROCK" && computerSelection === "PAPER") {
    return 0;
  }

  if (playerSelection === "PAPER" && computerSelection === "SCISSORS") {
    return 0;
  }

  if (playerSelection === "SCISSORS" && computerSelection === "ROCK") {
    return 0;
  }

  return 1;
}

function game() {
  let count = 5;

  for (let index = 1; index <= count; index++) {
    let message = "";
    let computerSelection = getComputerChoice();
    let playerSelection = prompt(
      "Write your choice of ROCK, PAPER OR SCISSORS, to play"
    );

    playerSelection = playerSelection.toUpperCase();

    let isGanador = playRound(playerSelection, computerSelection);

    switch (isGanador) {
      case -1:
        message = "No one wins, there was a Draw!";
        break;

      case 0:
        message = `You lost, ${playerSelection} loses to ${computerSelection}`;
        computeScore++;
        break;

      case 1:
        message = `EXCELLENT, You have won this round, ${playerSelection} beat ${computerSelection}`;
        userScore++;
        break;
    }

    console.log("Your choice....: " + playerSelection);
    console.log("PC Choice......: " + computerSelection);

    console.log(message);
    console.log("PC:...: " + computeScore);
    console.log("User..: " + userScore);
  }
}

// We start the game
game();

if (userScore === computeScore) {
  console.log("TIE! nobody wins");
} else if (userScore > computeScore) {
  console.log("CONGRATULATIONS! You are the resounding winner");
} else {
  console.log("YOU LOST! Try again!");
}
