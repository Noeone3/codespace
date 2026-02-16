const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetGuessBtn = document.getElementById("resetGuessBtn");
const guessMessage = document.getElementById("guessMessage");

let secretNumber = randomNumber();

function randomNumber() {
  return Math.floor(Math.random() * 20) + 1;
}

guessBtn.addEventListener("click", () => {
  const value = Number(guessInput.value);

  if (!value || value < 1 || value > 20) {
    guessMessage.textContent = "Enter a valid number from 1 to 20.";
    return;
  }

  if (value === secretNumber) {
    guessMessage.textContent = "🎉 Correct! You found the number.";
  } else if (value < secretNumber) {
    guessMessage.textContent = "Too low. Try again!";
  } else {
    guessMessage.textContent = "Too high. Try again!";
  }
});

resetGuessBtn.addEventListener("click", () => {
  secretNumber = randomNumber();
  guessInput.value = "";
  guessMessage.textContent = "Game reset. Start guessing!";
});

const board = document.getElementById("board");
const tttStatus = document.getElementById("tttStatus");
const resetBoardBtn = document.getElementById("resetBoardBtn");

let cells = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((value, idx) => {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.type = "button";
    cell.textContent = value;
    cell.setAttribute("aria-label", `cell ${idx + 1}`);
    cell.addEventListener("click", () => playTurn(idx));
    board.appendChild(cell);
  });
}

function checkWinner() {
  for (const [a, b, c] of winPatterns) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  if (!cells.includes("")) return "draw";
  return null;
}

function playTurn(index) {
  if (gameOver || cells[index]) return;

  cells[index] = currentPlayer;
  const result = checkWinner();

  if (result === "draw") {
    tttStatus.textContent = "It's a draw!";
    gameOver = true;
  } else if (result) {
    tttStatus.textContent = `Winner: ${result}`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    tttStatus.textContent = `Current turn: ${currentPlayer}`;
  }

  renderBoard();
}

resetBoardBtn.addEventListener("click", () => {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  tttStatus.textContent = "Current turn: X";
  renderBoard();
});

renderBoard();
