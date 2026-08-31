function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create a 3x3 gameboard
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(0);
        }  
    }

    // Create a function to read the board since the board is a private variable
    const getBoard = () => board;

    // Create a method that will drop a token to the user's desired position in the gameboard
    // Parameters: (1) token, (2) row num, (3) column num
    
    const dropToken = function (player, row, column) {
        // Player parameter is an object. It has two properties: name and token

        // Check if selected cell is empty
        if (board[row][column] === 0) {
            board[row][column] = player.token;
            console.log(`Dropping ${player.name}'s token at row# ${row} column# ${column}.`);
        } else {
            // Return an error if the selected cell is already taken
            console.log("Error: Cell is already taken. Please drop a new token at a different position.");
        }
        printBoard();
    }

    const printBoard = () => {
        console.log(getBoard());
    }

    return { dropToken, getBoard, printBoard };
}

function GameController() {
    const board = Gameboard();

    const players = [
        { name: "playerOne",
          token: "X",
        },
        { name: "playerTwo",
          token: "O",
        }
    ];

    let activePlayer = players[0]; 

    const playRound = (rowNum, colNum) => {
        board.dropToken(activePlayer, rowNum, colNum);
    }

    return { playRound };
}

const game = GameController();

// game.playRound(0, 1);
// game.playRound(1, 2);
// game.playRound(1, 2)