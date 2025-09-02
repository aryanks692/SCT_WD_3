

const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset");
const winnerMsg = document.getElementById("winner-msg");

let currentPlayer = "X";
let gameActive = true;

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

function handleBoxClick(e) {
  const box = e.target;
  if (box.textContent !== "" || !gameActive || currentPlayer !== "X") return;
  box.textContent = currentPlayer;
  if (checkWinner()) return;
  currentPlayer = "O";
  setTimeout(cpuMove, 500);
}

function cpuMove() {
  let available = [];
  boxes.forEach((box, index) => {
    if (box.textContent === "") available.push(index);
  });
  if (available.length === 0 || !gameActive) return;
  const randomIndex = available[Math.floor(Math.random() * available.length)];
  boxes[randomIndex].textContent = "O";
  if (checkWinner()) return;
  currentPlayer = "X";
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].textContent &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[a].textContent === boxes[c].textContent
    ) {
      winnerMsg.textContent = `${boxes[a].textContent} Wins! 🎉`;
      gameActive = false;
      return true;
    }
  }
  if ([...boxes].every((box) => box.textContent !== "")) {
    winnerMsg.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return true;
  }
  return false;
}

function resetGame() {
  boxes.forEach((box) => (box.textContent = ""));
  winnerMsg.textContent = "";
  currentPlayer = "X";
  gameActive = true;
}

boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
resetBtn.addEventListener("click", resetGame);


