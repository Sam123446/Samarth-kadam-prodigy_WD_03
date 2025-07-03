let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameMode = "";
let gameActive = true;

document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => handleClick(cell));
});

function startGame(mode) {
    gameMode = mode;
    document.getElementById("status").innerText = `Mode: ${mode === "self" ? "Player vs. Player" : "Player vs. Computer"}`;
}

function handleClick(cell) {
    let index = cell.dataset.index;
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.innerText = currentPlayer;
    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameMode === "computer" && currentPlayer === "O") {
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {
    let availableMoves = board.map((v, i) => (v === "" ? i : null)).filter(v => v !== null);
    if (availableMoves.length === 0) return;

    let randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[randomIndex] = "O";
    document.querySelector(`.cell[data-index='${randomIndex}']`).innerText = "O";
    checkWinner();
    currentPlayer = "X";
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("status").innerText = `Winner: ${board[a]}`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById("status").innerText = "It's a Draw!";
        gameActive = false;
    }
}

function resetGame() {
    board.fill("");
    document.querySelectorAll(".cell").forEach(cell => (cell.innerText = ""));
    gameActive = true;
    currentPlayer = "X";
    document.getElementById("status").innerText = "";
}
