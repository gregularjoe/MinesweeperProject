// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", (event) => {
    //Disabling the context menu to allow right click to add flag
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

//Initialize DOM elements
    const timer = document.getElementById('timer');
    const rules = document.getElementById('rulesButton');
    const beginnerGridDisplay = document.getElementById('beginnerGrid');
    const intermediateGridDisplay = document.getElementById('intermediateGrid');
    const expertGridDisplay = document.getElementById('expertGrid');
    const difficultySelection = document.getElementById('difficulty');
    const newGame = document.getElementById('newGameButton');
    const tilesClearedElement = document.getElementById('tilesCleared');
    const startGameText = document.getElementById('startGameText');
    const playAgain = document.getElementById('playAgain');

//Initialize variables
    let board = [];
    let minesLocation = [];
    let gameOver = false;
    let gridDisplay;
    let numberOfRows;
    let numberOfColumns;
    let numberOfMines;
    let minutes;
    let seconds;
    let totalSeconds = 0;
    let intervalId;

// Function to update the timer displayed on the page
    function updateTimer() {
        minutes = Math.floor(totalSeconds / 60);
        seconds = totalSeconds % 60;
        timer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        totalSeconds++;
    }

    // Event listener for the rules button, displays rules when clicked
    rules.addEventListener('click', showRules);

    // Function to display game rules in an alert
    function showRules() {
        alert('    Rules of BombSweeper\n' +
            '    1. Click on a square to reveal what\'s underneath.\n' +
            '    2. If you reveal a bomb, you lose.\n' +
            '    3. Right click a square to place a flag, if you suspect a bomb.\n' +
            '    4. Numbers indicate how many bombs are adjacent to that square.\n' +
            '    5. Use logic to determine the safe squares and avoid the bombs.\n' +
            '    6. Clear all non-bomb squares to win the game.')
    }

    // Event listeners for new game, play again button, and difficulty selection dropdown
    newGame.addEventListener('click', startNewGame);
    playAgain.addEventListener('click', startNewGame);
    difficultySelection.addEventListener('change', startNewGame);

// Class representing the game board
    class GameBoard {
        constructor(numberOfRows,numberOfColumns,gridDisplay) {
            this.numberOfRows = numberOfRows;
            this.numberOfColumns = numberOfColumns;
            this.gridDisplay = gridDisplay;
        }
        // Method to generate the game board
        generateGameBoard() {
            tilesCleared = 0;
            tilesClearedElement.innerText = tilesCleared;
            setMines();

            //Populate game board with values from gameBoard object.
            for (let r = 0; r < this.numberOfRows; r++) {
                let row = [];
                for (let c = 0; c < this.numberOfColumns; c++) {
                    let tile = document.createElement('img');
                    tile.setAttribute("src", "images/blank.jpg")
                    tile.id = r.toString() + '-' + c.toString();
                    tile.addEventListener('click', flipTile);
                    tile.addEventListener('contextmenu', placeFlag);
                    this.gridDisplay.append(tile);
                    row.push(tile);
                }
                board.push(row);
                console.log(board)
            }
        }
    }
    // Function that resets all required variables, prepares parameters and then calls
    // generateGameBoard method based on the users selections.
    function startNewGame() {
        // Clear any existing interval to stop the timer
        // Reset timer variables
        clearInterval(intervalId)
        totalSeconds = 0;
        minutes = 0;
        seconds = 0;
        // Reset game board and mine locations and sets gameOver to false.
        board = [];
        minesLocation = [];
        gameOver = false;
        // Remove all images from the grid
        document.querySelectorAll("#grid img")
            .forEach(img => img.remove());
        // Remove all buttons from the grid
        document.querySelectorAll("#grid button")
            .forEach(img => img.remove());
        // Get the selected difficulty level
        let difficulty = difficultySelection.value;
        // Set up game board size based on difficulty level
        if (difficulty === 'beginner') {
            numberOfRows = 9;
            numberOfColumns = 9;
            numberOfMines = 10;
            // Create a new GameBoard instance with beginner grid display
            let beginnerGameBoard = new GameBoard(numberOfRows, numberOfColumns, beginnerGridDisplay);
            gridDisplay = beginnerGridDisplay;
            // Generate the game board
            beginnerGameBoard.generateGameBoard()
            // Start the timer
            intervalId = setInterval(updateTimer, 1000);

        } else if (difficulty === 'intermediate') {
            // Code similar to the beginner level with different parameters
            numberOfRows = 16;
            numberOfColumns = 16;
            numberOfMines = 40;
            let intermediateGameBoard = new GameBoard(numberOfRows, numberOfColumns, intermediateGridDisplay);
            gridDisplay = intermediateGridDisplay;
            intermediateGameBoard.generateGameBoard()
            intervalId = setInterval(updateTimer, 1000);

        } else if (difficulty === 'expert') {
            // Code similar to the beginner level with different parameters
            numberOfRows = 22;
            numberOfColumns = 22;
            numberOfMines = 99;
            let expertGameBoard = new GameBoard(numberOfRows, numberOfColumns, expertGridDisplay);
            gridDisplay = expertGridDisplay;
            expertGameBoard.generateGameBoard()
            intervalId = setInterval(updateTimer, 1000);
        }
    }

// Function to randomly set mines on the game board
    function setMines() {
        // Initialize the number of mines left to be placed
        let minesToGo = numberOfMines;
        // Continue placing mines until the desired number is reached
        while (minesToGo > 0) {
            // Generate random row and column indices
            let r = Math.floor(Math.random() * numberOfRows);
            let c = Math.floor(Math.random() * numberOfColumns);
            // Create a unique identifier for the cell using row and column indices
            let id = r.toString() + '-' + c.toString();
            // Check if the generated cell already contains a mine
            if (!minesLocation.includes(id)) {
                // If not, add the cell to the minesLocation array and decrement the number of mines left
                minesLocation.push(id);
                minesToGo -= 1;
            }
        }
    }

    // Event handler function to toggle flags on right-click
    const placeFlag = evt => {
        // Check the current source attribute of the clicked cell's image
        if (evt.target.getAttribute('src') === 'images/stop.jpg') {
            // If it's a flag, change it to a blank image
            evt.target.setAttribute('src', 'images/blank.jpg');
        } else if (evt.target.getAttribute('src') === 'images/blank.jpg') {
            // If it's a blank cell, change it to a flag
            evt.target.setAttribute('src', 'images/stop.jpg');
        }
    }

    // Variable to keep track of the number of cleared tiles
    let tilesCleared = 0;
    // Function to flip a tile and check game conditions
    function flipTile() {
        // Update the displayed count of cleared tiles
        tilesClearedElement.innerText = tilesCleared;
        // If the game is already over, do nothing
        if (gameOver) {
            return;
        }
        // Get the clicked tile
        let tile = this;
        // Check if the clicked tile contains a mine
        if (minesLocation.includes(tile.id)) {
            // If it does, end the game and reveal all mines
            alert('Game Over');
            gameOver = true;
            clearInterval(intervalId);
            revealMines();
            playAgain.innerHTML = "<button id='playAgainButton'>Play Again </button";
            return;
        }
        // Extract row and column coordinates from the tile's id
        let coordinates = tile.id.split("-");
        let r = parseInt(coordinates[0]);
        let c = parseInt(coordinates[1]);
        // Check the clicked tile for mines and update the game state
        checkMine(r, c);
        // Check if all non-mine tiles have been cleared
        if (tilesCleared === numberOfRows * numberOfColumns - numberOfMines) {
            // If so, the player wins the game, player is offered to play again.
            alert('All Clear, You Win!!!')
            revealMines();
            gameOver = true;
            clearInterval(intervalId);
            playAgain.innerHTML = "<button id='playAgainButton'>Play Again </button";
        }
    }
    // Function to reveal all mines on the game board
    function revealMines() {
        // Iterate through each row
        for (let r = 0; r < numberOfRows; r++) {
            // Iterate through each column in the current row
            for (let c = 0; c < numberOfColumns; c++) {
                // Get the tile at the current row and column
                let tile = board[r][c];
                // Check if the current tile contains a mine
                if (minesLocation.includes(tile.id)) {
                    // If it does, set the image source to the mine image
                    tile.setAttribute("src", "images/mine.jpg");
                }
            }
        }
    }
// Recursive function to check for mines around a clicked tile
    function checkMine(r, c) {
        // Check if the provided indices are within the valid range of the game board
        if (r < 0 || r >= numberOfRows || c < 0 || c >= numberOfColumns) {
            return;
        }
        // Check if the tile has already been clicked, if so nothing happens
        if (board[r][c].classList.contains('tile-clicked')) {
            return;
        }
        // Mark the current tile as clicked
        board[r][c].classList.add('tile-clicked');

        tilesCleared += 1;
        tilesClearedElement.innerText = tilesCleared;
        let minesFound = 0;
        // Check tiles in the surrounding area (top, left, right, bottom, and diagonals)
        //top 3
        minesFound += checkTile(r - 1, c - 1); // top left
        minesFound += checkTile(r - 1, c); // top
        minesFound += checkTile(r - 1, c + 1); // top right

        //left and right
        minesFound += checkTile(r, c - 1); // left
        minesFound += checkTile(r, c + 1); // right

        //bottom 3
        minesFound += checkTile(r + 1, c - 1); // bottom left
        minesFound += checkTile(r + 1, c); // bottom
        minesFound += checkTile(r + 1, c + 1); // bottom right
        // If no mines are found in the surrounding area and the
        // current tile is not a mine,
        // set the image source to indicate no adjacent mines
        if (minesFound === 0 && !minesLocation.includes(r.toString() + "-" + c.toString())) {
            board[r][c].setAttribute("src", "images/0.jpg");
        }
        // If there are adjacent mines, set the image source to
        // indicate the number of adjacent mines
        if (minesFound > 0) {
            board[r][c].setAttribute("src", "images/" + minesFound.toString() + ".jpg");
        } else {
            // Recursive calls to check the surrounding tiles for mines
            //top 3
            checkMine(r - 1, c - 1); //top left
            checkMine(r - 1, c); // top
            checkMine(r - 1, c + 1); // top right
            //left and right
            checkMine(r, c - 1); // left
            checkMine(r, c + 1); // right
            // bottom 3
            checkMine(r * 1, c - 1); //bottom left
            checkMine(r + 1, c); // bottom
            checkMine(r + 1, c + 1); // bottom right
        }
    }
// Function to check if a tile at given indices contains a mine
// Returns 1 if the tile contains a mine, 0 otherwise
    function checkTile(r, c) {
        // Check if the provided indices are within the valid range of the game board
        if (r < 0 || r >= numberOfRows || c < 0 || c >= numberOfColumns) {
            // Return 0 if the indices are out of bounds
            return 0;
        }
        // Check if the current tile contains a mine
        if (minesLocation.includes(r.toString() + "-" + c.toString())) {
            // Return 1 if a mine is found
            return 1;
        }
        // Return 0 if the tile does not contain a mine
        return 0;
    }
});