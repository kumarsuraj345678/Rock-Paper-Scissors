// UI elements
const header = document.querySelector(".header");
const rulesBtn = document.querySelector(".rules-btn");
const rulesModal = document.getElementById("rules-modal");
const closeRules = document.getElementById("close-rules");

const gameArea = document.querySelector(".game-area");
const resultScreen = document.getElementById("result-screen");
const hurrayScreen = document.getElementById("hurray-screen");

const userPickUI = document.getElementById("user-pick");
const pcPickUI = document.getElementById("pc-pick");
const resultMessage = document.getElementById("result-message");

const playAgainBtn = document.getElementById("play-again");
const playAgainHurray = document.getElementById("play-again-hurray");

const userScoreUI = document.getElementById("user-score");
const pcScoreUI = document.getElementById("pc-score");

const titleRock = document.getElementById("title-rock");
const titlePaper = document.getElementById("title-paper");
const titleScissors = document.getElementById("title-scissors");
const nextBtn = document.getElementById("next-btn");

// localStorage
let userScore = localStorage.getItem("userScore")
  ? parseInt(localStorage.getItem("userScore"))
  : 0;

let pcScore = localStorage.getItem("pcScore")
  ? parseInt(localStorage.getItem("pcScore"))
  : 0;

userScoreUI.innerText = userScore;
pcScoreUI.innerText = pcScore;

// modal toggle
rulesBtn.addEventListener("click", () => {
  rulesModal.classList.remove("hidden");
});

closeRules.addEventListener("click", () => {
  rulesModal.classList.add("hidden");
});

// game state
let userChoice = null;
let pcChoice = null;
let result = null;
let hurrayTimeout;

// player selection
const choices = document.querySelectorAll(".choice");

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    userChoice = choice.dataset.choice;
    startGame();
  });
});

// generate random PC move
function generatePCChoice() {
  const options = ["rock", "paper", "scissors"];
  pcChoice = options[Math.floor(Math.random() * 3)];
}

function decideWinner() {
  if (userChoice === pcChoice) {
    result = "tie";
  } else if (
    (userChoice === "rock" && pcChoice === "scissors") ||
    (userChoice === "paper" && pcChoice === "rock") ||
    (userChoice === "scissors" && pcChoice === "paper")
  ) {
    result = "win";
  } else {
    result = "lose";
  }
}

// update score and persist
function updateScore() {
  if (result === "win") {
    userScore++;
    localStorage.setItem("userScore", userScore);
  } else if (result === "lose") {
    pcScore++;
    localStorage.setItem("pcScore", pcScore);
  }

  userScoreUI.innerText = userScore;
  pcScoreUI.innerText = pcScore;
}

function highlightWinnerTitle(choice) {
  titleRock.classList.remove("win-highlight");
  titlePaper.classList.remove("win-highlight");
  titleScissors.classList.remove("win-highlight");

  if (choice === "rock") {
    titleRock.classList.add("win-highlight");
  }
  if (choice === "paper") {
    titlePaper.classList.add("win-highlight");
  }
  if (choice === "scissors") {
    titleScissors.classList.add("win-highlight");
  }
}

function getSymbol(choice) {
  if (choice === "rock") {
    return `<img src="./assets/rock.png" alt="rock" class="choice-img" />`;
  }
  if (choice === "paper") {
    return `<img src="./assets/paper.png" alt="paper" class="choice-img" />`;
  }
  if (choice === "scissors") {
    return `<img src="./assets/scissors.png" alt="scissors" class="choice-img" />`;
  }
}

// reset round state and UI
function resetRound() {
  header.classList.remove("hidden");
  gameArea.classList.remove("hidden");
  resultScreen.classList.add("hidden");
  hurrayScreen.classList.add("hidden");
  nextBtn.classList.add("hidden");

  titleRock.classList.remove("win-highlight");
  titlePaper.classList.remove("win-highlight");
  titleScissors.classList.remove("win-highlight");

  userPickUI.classList.remove("winner-glow");
  pcPickUI.classList.remove("winner-glow");

  userPickUI.innerHTML = "";
  pcPickUI.innerHTML = "";

  userPickUI.style.borderColor = "transparent";
  pcPickUI.style.borderColor = "transparent";

  userChoice = null;
  pcChoice = null;
  result = null;
}

playAgainBtn.addEventListener("click", resetRound);
playAgainHurray.addEventListener("click", resetRound);
nextBtn.addEventListener("click", showHurrayScreen);

// celebration screen after win
function showHurrayScreen() {
  resultScreen.classList.add("hidden");
  header.classList.add("hidden");
  hurrayScreen.classList.remove("hidden");
  nextBtn.classList.add("hidden");
}

// game controller
function startGame() {
  generatePCChoice();
  decideWinner();
  updateScore();
  showResultScreen();
}

// colored border for result picks
function getRingColor(choice) {
  if (choice === "rock") return "#0074B6";
  if (choice === "paper") return "#FFA943";
  if (choice === "scissors") return "#BD00FF";
}

// result screen
function showResultScreen() {
  gameArea.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  userPickUI.innerHTML = getSymbol(userChoice);
  pcPickUI.innerHTML = getSymbol(pcChoice);

  userPickUI.style.borderColor = getRingColor(userChoice);
  pcPickUI.style.borderColor = getRingColor(pcChoice);

  userPickUI.classList.remove("winner-glow");
  pcPickUI.classList.remove("winner-glow");

  if (result === "win") {
    resultMessage.innerText = "YOU WIN";
    userPickUI.classList.add("winner-glow");
    nextBtn.classList.remove("hidden");
    highlightWinnerTitle(userChoice);
  } else if (result === "lose") {
    resultMessage.innerText = "YOU LOST";
    pcPickUI.classList.add("winner-glow");
    nextBtn.classList.add("hidden");
  } else {
    resultMessage.innerText = "TIE UP";
    nextBtn.classList.add("hidden");
  }
}
