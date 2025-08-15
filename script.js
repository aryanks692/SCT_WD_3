const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset");
const winnerMsg = document.getElementById("winner-msg");

let turnX = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.textContent !== "" || winnerMsg.textContent !== "") return;

        box.textContent = turnX ? "X" : "O";

        if (checkWinner()) {
            winnerMsg.textContent = `🎉 Congratulations! Player ${turnX ? "X" : "O"} wins! 🎉`;
            highlightWinner();
            return;
        }

        if ([...boxes].every(b => b.textContent !== "")) {
            winnerMsg.textContent = "😐 It's a draw!";
            return;
        }

        turnX = !turnX;
    });
});

function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        if (
            boxes[a].textContent !== "" &&
            boxes[a].textContent === boxes[b].textContent &&
            boxes[a].textContent === boxes[c].textContent
        ) {
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
            return true;
        }
        return false;
    });
}

function highlightWinner() {
    document.querySelectorAll(".win").forEach(box => {
        box.style.backgroundColor = "lightgreen";
    });
}

function resetGame() {
    boxes.forEach(box => {
        box.textContent = "";
        box.classList.remove("win");
        box.style.backgroundColor = "white";
    });
    winnerMsg.textContent = "";
    turnX = true;
}

resetBtn.addEventListener("click", resetGame);

