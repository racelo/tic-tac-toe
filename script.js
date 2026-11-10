function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 3x3 gameboard
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }  
    }

    // Create a function to read the board since the board is a private variable
    const getBoard = () => board;

    // Create a method that will drop a token to the user's desired position in the gameboard
    // Parameters: (1) token, (2) row num, (3) column num
    
    const dropToken = function (player, row, column) {
        board[row][column].addToken(player);
    }

    const printBoard = () => {
        const boardCellValues = board.map(row => 
            row.map(cell => cell.getValue())
        );
        console.log(boardCellValues);
    }

    return { dropToken, getBoard, printBoard };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    }
}

function GameController() {
    const board = Gameboard();

    let gameWon = false;

    let isGameOver = () => gameWon;

    const mappedBoard = () => {
        let boardVal = board.getBoard().map(row => 
        row.map(cell => cell.getValue()));
        return boardVal;
    }

    const players = [
        { name: "playerOne",
          token: "X",
        },
        { name: "playerTwo",
          token: "O",
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const playRound = (rowNum, colNum) => {
        // Check if selected cell is empty
        if (board.getBoard()[rowNum][colNum].getValue() === 0) {
            board.dropToken(getActivePlayer().token, rowNum, colNum);
            console.log(`Dropping ${getActivePlayer().name}'s token at row# ${rowNum} column# ${colNum}.`);

            if(checkWin(mappedBoard(), getActivePlayer().token)) {
                gameWon = true;
                console.log(`Game over. You win ${getActivePlayer().name}`);
            } else {
                switchPlayer();
                printNewRound();
            }

        } else {
        // Return an error if the selected cell is already taken
            console.log("Error: Cell is already taken. Please drop a new token at a different position.");
            board.printBoard();
        };
    }

    const switchPlayer = () => {
        activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`It's ${activePlayer.name}'s turn.`);
    }

    return { 
        playRound, 
        getActivePlayer, 
        getBoard: board.getBoard,
        isGameOver
    };
}

function ScreenController() {
    const game = GameController();
    const board = game.getBoard();

    const boardContainer = document.querySelector(".board-container")
    
    board.forEach((arr, rowNum) => {
        const row = document.createElement("div")
        arr.forEach((cell, colNum) => {
            const button = document.createElement("button");
            button.dataset.row = rowNum;
            button.dataset.col = colNum;
            button.textContent = cell.getValue();
            row.append(button);
        })
        boardContainer.append(row);
    })
    
    const updateScreen = () => {
        board.forEach((arr, rowNum) => {
        const row = document.createElement("div")
        arr.forEach((cell, colNum) => {
            const button = document.createElement("button");
            button.dataset.row = rowNum;
            button.dataset.col = colNum;
            button.textContent = cell.getValue();
            row.append(button);
        })
        boardContainer.append(row);
    })
    }

    function clickBoard(e) {
        if(e.target.dataset) {
            game.playRound(e.target.dataset.row, e.target.dataset.col);
            if(game.isGameOver() === true) {
                document.querySelectorAll("button").forEach(button => button.setAttribute("disabled", "disabled"));
            } else {
                boardContainer.textContent = "";
                updateScreen();
            }

         }
    }
    boardContainer.addEventListener("click", clickBoard)
}
ScreenController();


function checkWin(arr, token) {
    // console.log(arr);
    const winningPatterns = [
        // horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonal
        [0, 4, 8],
        [2, 4, 6]
    ]

    const flatArr = arr.flat();

    return winningCondition = winningPatterns.some(setPattern=>
        setPattern.every(index => flatArr[index] === token));
}



