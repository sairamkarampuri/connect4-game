var playerGreen = "G";
var playerRed = "R";
var currPlayer = playerGreen;

var gameOver = false;
var board;
var currColumns = [5, 5, 5, 5, 5, 5, 5]; // Tracks the current available row for each column

var rows = 6;
var columns = 7;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [];

    // Get the board element from the DOM
    var boardElement = document.querySelector('.board');

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            // Create a tile element
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece); // Add click event listener to each tile

            // Append the tile to the board element
            boardElement.appendChild(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c]; // Get the current available row for this column
    if (r < 0) {
        return; // Column is full, do nothing
    }

    if (board[r][c] !== ' ') {
        // Check if the slot is already occupied
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currPlayer == playerGreen) {
        tile.classList.add("green-piece");
        currPlayer = playerRed; // Switch to the next player
    } else {
        tile.classList.add("red-piece");
        currPlayer = playerGreen; // Switch to the next player
    }

    currColumns[c]--; // Move to the next available row for this column

    // Call a function to check for a winner or tie
    checkWinner();
}

function checkWinner() {
    // Check for horizontal wins
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ') {
                if (board[r][c] === board[r][c + 1] &&
                    board[r][c + 1] === board[r][c + 2] &&
                    board[r][c + 2] === board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check for vertical wins
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== ' ') {
                if (board[r][c] === board[r + 1][c] &&
                    board[r + 1][c] === board[r + 2][c] &&
                    board[r + 2][c] === board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check for diagonal wins (down-right)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ') {
                if (board[r][c] === board[r + 1][c + 1] &&
                    board[r + 1][c + 1] === board[r + 2][c + 2] &&
                    board[r + 2][c + 2] === board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check for diagonal wins (down-left)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ') {
                if (board[r][c] === board[r - 1][c + 1] &&
                    board[r - 1][c + 1] === board[r - 2][c + 2] &&
                    board[r - 2][c + 2] === board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // Check for a tie
    if (board.every(row => row.every(cell => cell !== ' '))) {
        setTie();
    }
}
function setWinner(r, c) {
    let winnerElement = document.querySelector('.winner');
    if (board[r][c] === playerGreen) {
        winnerElement.innerText = "Black Wins!";
    } else {
        winnerElement.innerText = "Red Wins!";
    }

    gameOver = true;
}

function setTie() {
    let winnerElement = document.querySelector('.winner');
    winnerElement.innerText = "It's a Tie!";
    gameOver = true;
}