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
        board[row][column] = player.token;
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

    const printTempBoard = () => board.getBoard();

    // Create a random input for a bot player
    // const getComputerChoice = () => {
        // const randomNum = Math.floor(Math.random * 3);
        // Create a filter of all the empty cells in the row. Separate the empty rows and columns
        // let row = board.getBoard().filter()
        // let column = randomNum();

        // return [row, column];
    // }

    const getActivePlayer = () => activePlayer;

    const playRound = (rowNum, colNum) => {
        // Check if selected cell is empty
        if (board.getBoard()[rowNum][colNum] === 0) {
            board.dropToken(activePlayer, rowNum, colNum);
            console.log(`Dropping ${activePlayer.name}'s token at row# ${rowNum} column# ${colNum}.`);
            switchPlayer();
            printNewRound();
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

    return { playRound, getActivePlayer, printTempBoard};
}

const game = GameController();

console.log(game.getActivePlayer());
// game.playRound(0, 0);
// game.playRound(1, 0)
// game.playRound(1, 1)
// game.playRound(2, 0)
// game.playRound(0, 2);
// game.playRound(2, 1);
// game.playRound(2, 2);

// console.log(game.printTempBoard());
function checkWin(arr, token) {
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

    // const checkCell = cell => cell === token; 
    let newArr = arr.flat();

    // return winningCondition = winningPatterns.some(setPattern=>
    //     setPattern.every(index => newArr[index] === token));

    // let winningPattern;
    // let winningCondition = winningPatterns.some(setArr => {
    //     if(setArr.every(index => newArr[index] === token)){
    //         winPattern = setArr;
    //         return true; 
    //     }
    // })
    //    console.log(winPattern);

    // let mappedBoard = winningPatterns.map(pattern => pattern.map(index => newArr[index]));
    // console.log(mappedBoard);
        
//    console.log(winningCondition);
}

checkWin(game.printTempBoard(), "X");


