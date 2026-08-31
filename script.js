
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
    
    const dropToken = function (token, row, column) {
        // check if the selected cell in the gameboard is empty
        if(board[row][column] === 0) {
            board[row][column] = token;
        } else {
            // return an error if the selected cell is already taken
            console.log("Error: Cell is already taken");
        }
    }

    const printBoard = () => {
        console.log(getBoard());
    }

    return { dropToken, getBoard, printBoard };
}


const newGB = Gameboard();
// newGB.dropToken("X", 1, 0);
// newGB.printBoard();
// console.log(newGB.dropToken("X", 1, 0));
// newGB.printBoard();
