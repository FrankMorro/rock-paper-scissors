let userScore = 0;
let computeScore = 0;

const progressUser = document.getElementById("progress-user");
const circlesUser = document.querySelectorAll(".circle-user");

const progressPC = document.getElementById("progress-pc");
const circlesPC = document.querySelectorAll(".circle-pc");

const activesUser = document.querySelectorAll(".active-user");
const activesPC = document.querySelectorAll(".active-pc");

const optPiedra = document.querySelector(".piedra");
const optPapel = document.querySelector(".papel");
const optTijera = document.querySelector(".tijera");

const options = document.querySelectorAll(".option-img");

let currentActiveUser = 0;
let currentActivePC = 0;

const scores = document.querySelectorAll(".circle");

const IMG_SRC_PIEDRA = "./img/piedra.png";
const IMG_SRC_PAPEL = "./img/paper.png";
const IMG_SRC_TIJERA = "./img/tijera.png";
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";

const imgElementPlayerPC = document.querySelector("#player1");
const imgElementPlayerUser = document.querySelector("#player2");

let messageDisplay = document.querySelector("#display");
let computerSelection = "";
let playerSelection = "";

optPiedra.addEventListener("click", () => {
  updateImgUserPiedra();

  updateScorePC();
  updateScoreUser();
});

function updateScorePC() {
  circlesPC.forEach((circle, idx) => {
    if (idx < currentActivePC) {
      circle.classList.add("active-pc");
    } else {
      circle.classList.remove("active-pc");
    }
  });

  const actives = document.querySelectorAll(".active-pc");

  progressPC.style.width =
    ((actives.length - 1) / (circlesPC.length - 1)) * 100 + "%";

  if (currentActivePC === 1) {
    //prev.disabled = true
  } else if (currentActivePC === circlesPC.length) {
    options.forEach((option) => {
      option.classList.add("not-active");
    });

    display.innerHTML = "YOU LOST! Try again!";
    let audio = document.getElementById("sound-lose");
    audio.play();
  } else {
    //prev.disabled = false
    optPiedra.disabled = false;
  }
}

function updateScoreUser() {
  circlesUser.forEach((circle, idx) => {
    if (idx < currentActiveUser) {
      circle.classList.add("active-user");
    } else {
      circle.classList.remove("active-user");
    }
  });

  const actives = document.querySelectorAll(".active-user");

  progressUser.style.width =
    ((actives.length - 1) / (circlesUser.length - 1)) * 100 + "%";

  if (currentActiveUser === 1) {
    //prev.disabled = true
  } else if (currentActiveUser === circlesUser.length) {
    options.forEach((option) => {
      option.classList.add("not-active");
    });

    display.innerHTML = "CONGRATULATIONS! You are the resounding winner";

    let audio = document.getElementById("sound-win");
    audio.play();
  } else {
    //prev.disabled = false
    optPiedra.disabled = false;
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getComputerChoice = () => {
  let choice = getRandomIntInclusive(1, 3);

  if (choice === 1) {
    imgElementPlayerPC.src = IMG_SRC_PIEDRA;
    return ROCK;
  }

  if (choice === 2) {
    imgElementPlayerPC.src = IMG_SRC_PAPEL;
    return PAPER;
  }

  if (choice === 3) {
    imgElementPlayerPC.src = IMG_SRC_TIJERA;
    return SCISSORS;
  }
};

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toUpperCase();

  if (playerSelection === computerSelection) return -1;

  if (playerSelection === ROCK && computerSelection === PAPER) {
    return 0;
  }

  if (playerSelection === PAPER && computerSelection === SCISSORS) {
    return 0;
  }

  if (playerSelection === SCISSORS && computerSelection === ROCK) {
    return 0;
  }

  return 1;
}

function game() {
  let isGanador = playRound(playerSelection, computerSelection);
  let message = "";
  imgElementPlayerUser.classList.remove("win");
  imgElementPlayerUser.classList.remove("lose");
  imgElementPlayerPC.classList.remove("win");
  imgElementPlayerPC.classList.remove("lose");

  switch (isGanador) {
    case -1:
      message = "No one wins, there was a Draw!";
      imgElementPlayerUser.classList.remove("win");
      imgElementPlayerUser.classList.remove("lose");
      imgElementPlayerPC.classList.remove("win");
      imgElementPlayerPC.classList.remove("lose");
      break;

    case 0:
      message = `You lose!, ${computerSelection} beats ${playerSelection}`;
      imgElementPlayerUser.classList.add("lose");
      imgElementPlayerPC.classList.add("win");
      computeScore++;
      currentActivePC++;
      break;

    case 1:
      message = `You have won this round, ${playerSelection} beats ${computerSelection}`;
      imgElementPlayerUser.classList.add("win");
      imgElementPlayerPC.classList.add("lose");
      userScore++;
      currentActiveUser++;
      break;
  }

  display.innerHTML = message;

  console.log("Your choice....: " + playerSelection);
  console.log("PC Choice......: " + computerSelection);

  console.log(message);
  console.log("PC score....: " + computeScore);
  console.log("User score..: " + userScore);
}

function updateImgUserPiedra() {
  imgElementPlayerUser.src = IMG_SRC_PIEDRA;
  computerSelection = getComputerChoice();
  playerSelection = ROCK;
  game();

  if (currentActiveUser > circlesUser.length) {
    currentActiveUser = circlesUser.length;
  }

  if (currentActivePC > circlesPC.length) {
    currentActivePC = circlesPC.length;
  }
}

const updateImgUserPapel = () => {
  imgElementPlayerUser.src = IMG_SRC_PAPEL;
  computerSelection = getComputerChoice();
  playerSelection = PAPER;

  game();

  if (currentActiveUser > circlesUser.length) {
    currentActiveUser = circlesUser.length;
  }

  if (currentActivePC > circlesPC.length) {
    currentActivePC = circlesPC.length;
  }

  updateScorePC();
  updateScoreUser();
};

const updateImgUserTijera = () => {
  imgElementPlayerUser.src = IMG_SRC_TIJERA;
  computerSelection = getComputerChoice();
  playerSelection = SCISSORS;

  game();

  if (currentActiveUser > circlesUser.length) {
    currentActiveUser = circlesUser.length;
  }

  if (currentActivePC > circlesPC.length) {
    currentActivePC = circlesPC.length;
  }

  updateScorePC();
  updateScoreUser();
};

function resetGame() {
  imgElementPlayerUser.classList.remove("win");
  imgElementPlayerUser.classList.remove("lose");
  imgElementPlayerPC.classList.remove("win");
  imgElementPlayerPC.classList.remove("lose");

  display.innerHTML = "May the best win!!!";

  imgElementPlayerPC.src = "./img/all.png";
  imgElementPlayerUser.src = "./img/all.png";

  circlesUser.forEach((circle, idx) => {
    circle.classList.remove("active-user");
  });

  circlesPC.forEach((circle, idx) => {
    circle.classList.remove("active-pc");
  });

  currentActiveUser = 0;
  currentActivePC = 0;

  progressUser.style.width = 0;
  progressPC.style.width = 0;

  options.forEach((option) => {
    option.classList.remove("not-active");
  });
}
