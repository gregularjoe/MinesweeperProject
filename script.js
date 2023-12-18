// /*
// *TODO:
// * Put in Winning Condition
// * Re-read instructions to make sure i have all parts
// * Fix the tile counter, so it counts the tiles revealed during recursion
// * Add "Play Again"
// * Find alternative to alert, something like a window popping?
// * convert appropriate functions to evt handlers
// * fix timer, its counting double time when a new board is shown
// * Use imageArray: try imageArray[i].
// *
// */
//
//
// document.addEventListener("contextmenu", function(event) {
//     event.preventDefault();
// });
// // document.addEventListener("DOMContentLoaded", (event) => {
//
// const imageArray = [
//     {
//         name: 'blank',
//         image: 'images/blank.jpg'
//     },
//     {
//         name:'stop',
//         image: 'images/stop.jpg'
//     },
//     {
//         name: 'empty',
//         image: 'images/empty.jpg'
//     },
//     {
//         name: 'one',
//         image: 'images/one.jpg'
//     },
//     {
//         name: 'two',
//         image: 'images/two.jpg'
//     },
//     {
//         name: 'three',
//         image: 'images/three.jpg'
//     },
//     {
//         name: 'four',
//         image: 'images/four.jpg'
//     },
//     {
//         name: 'mine',
//         image: 'images/mine.jpg'
//     }
// ];
// //Initialize dom elements needed
// const timer = document.getElementById('timer');
// const rules = document.getElementById('rulesButton');
// const beginnerGridDisplay = document.getElementById('beginnerGrid');
// const intermediateGridDisplay = document.getElementById('intermediateGrid');
// const expertGridDisplay = document.getElementById('expertGrid');
// const difficultySelection = document.getElementById('difficulty');
// const newGame = document.getElementById('newGameButton');
// const tilesClearedElement = document.getElementById('tilesCleared');
// const startGameText = document.getElementById('startGameText');
// const playAgain = document.getElementById('playAgain');
// //Initialize variables needed
// let playAgainButton;
// let board = [];
// let minesLocation = [];
// // let tilesClicked = 0;
// let gameOver = false;
//
// let numberOfRows;
// let numberOfColumns;
// let numberOfMines;
// let minutes;
// let seconds;
// let totalSeconds = 0;
// let intervalId;
// function updateTimer() {
//     minutes = Math.floor(totalSeconds / 60);
//     seconds = totalSeconds % 60;
//     timer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//     totalSeconds++;
// }
//     rules.addEventListener('click',showRules);
//     function showRules() {
//         alert('    Rules of BombSweeper\n' +
//             '    1. Click on a square to reveal what\'s underneath.\n' +
//             '    2. If you reveal a bomb, you lose.\n' +
//             '    3. Right click a square to place a flag, if you suspect a bomb.\n' +
//             '    4. Numbers indicate how many bombs are adjacent to that square.\n' +
//             '    5. Use logic to determine the safe squares and avoid the bombs.\n' +
//             '    6. Clear all non-bomb squares to win the game.')
//     }
//
// newGame.addEventListener('click', startNewGame);
// playAgain.addEventListener('click',startNewGame);
// difficultySelection.addEventListener('change',startNewGame);
//
//
// function startNewGame(){
//     clearInterval(intervalId)
//     totalSeconds = 0;
//     minutes = 0;
//     seconds = 0;
//     board = [];
//     minesLocation = [];
//     gameOver = false;
//     document.querySelectorAll("#grid img")
//         .forEach(img => img.remove());
//     document.querySelectorAll("#grid button")
//         .forEach(img => img.remove());
//     let difficulty = difficultySelection.value;
//     if (difficulty === 'beginner') {
//         numberOfRows = 9;
//         numberOfColumns = 9;
//         numberOfMines = 10;
//         generateBeginnerGameBoard(numberOfRows, numberOfColumns, numberOfMines);
//         intervalId = setInterval(updateTimer, 1000);
//         console.log(difficulty)
//     }
//     else if (difficulty === 'intermediate') {
//         numberOfRows = 16;
//         numberOfColumns = 16;
//         numberOfMines = 40;
//         intermediateGameBoard(numberOfRows, numberOfColumns, numberOfMines);
//         intervalId = setInterval(updateTimer, 1000);
//         console.log(difficulty)
//     }
//     else if (difficulty === 'expert') {
//         numberOfRows = 22;
//         numberOfColumns = 22;
//         numberOfMines = 99;
//         expertGameBoard(numberOfRows, numberOfColumns, numberOfMines);
//         intervalId = setInterval(updateTimer, 1000);
//         console.log(difficulty)
//     }
// }
//
//
// function setMines(){
//
//     let minesLeft = numberOfMines;
//     while (minesLeft > 0) {
//         let r = Math.floor(Math.random() * numberOfRows);
//         let c = Math.floor(Math.random() * numberOfColumns);
//         let id = r.toString() + '-' + c.toString();
//
//         if (!minesLocation.includes(id)) {
//             minesLocation.push(id);
//             minesLeft -= 1;
//         }
//     }
// }
//
// const placeFlag = evt => {
//     if (evt.target.getAttribute('src') === 'images/stop.jpg') {
//         evt.target.setAttribute('src','images/blank.jpg');
//     }
//     else if (evt.target.getAttribute('src') === 'images/blank.jpg') {
//         evt.target.setAttribute('src','images/stop.jpg');
//     }
//
// }
//
//
// function generateBeginnerGameBoard(numberOfRows, numberOfColumns, numberOfMines) {
//     tilesCleared = 0;
//     tilesClearedElement.innerText = tilesCleared;
//
//     setMines();
//
//     //populate game board
//     for (let r = 0; r < numberOfRows; r++) {
//         let row = [];
//         for (let c = 0; c < numberOfColumns; c++) {
//             let tile = document.createElement('img');
//             tile.setAttribute("src", "images/blank.jpg")
//             tile.id = r.toString() +'-' + c.toString();
//             tile.addEventListener('click',flipTile);
//             tile.addEventListener('contextmenu',placeFlag);
//             beginnerGridDisplay.append(tile);
//             row.push(tile);
//         }
//         board.push(row);
//         console.log(board)
//     }
// }
//     function intermediateGameBoard(numberOfRows, numberOfColumns, numberOfMines) {
//         tilesCleared = 0;
//         tilesClearedElement.innerText = tilesCleared;
//
//         setMines();
//         for (let r = 0; r < numberOfRows; r++) {
//             let row = [];
//             for (let c = 0; c < numberOfColumns; c++) {
//                 let tile = document.createElement('img');
//                 tile.setAttribute("src", "images/blank.jpg")
//                 tile.id = r.toString() +'-' + c.toString();
//                 tile.addEventListener('click',flipTile);
//                 tile.addEventListener('contextmenu',placeFlag);
//                 intermediateGridDisplay.append(tile);
//                 row.push(tile);
//             }
//             board.push(row);
//         }
//     }
// function expertGameBoard(numberOfRows, numberOfColumns, numberOfMines) {
//     tilesCleared = 0;
//     tilesClearedElement.innerText = tilesCleared;
//
//     setMines();
//     for (let r = 0; r < numberOfRows; r++) {
//         let row = [];
//         for (let c = 0; c < numberOfColumns; c++) {
//             let tile = document.createElement('img');
//             tile.setAttribute("src", "images/blank.jpg")
//             tile.id = r.toString() +'-' + c.toString();
//             tile.addEventListener('click',flipTile);
//             tile.addEventListener('contextmenu',placeFlag);
//             expertGridDisplay.append(tile);
//             row.push(tile);
//         }
//         board.push(row);
//         console.log(board)
//     }
// }
//
// let tilesCleared = 0;
// function flipTile(){
//     // tilesCleared += 1;
//     tilesClearedElement.innerText = tilesCleared;
//     if (gameOver) {
//         return;
//     }
//     let tile = this;
//
//     if (minesLocation.includes(tile.id)) {
//
//         alert('Game Over');
//         gameOver = true;
//         clearInterval(intervalId);
//         revealMines();
//         playAgain.innerHTML = "<button id='playAgainButton'>Play Again </button";
//         return;
//     }
//     let coordinates = tile.id.split("-");
//     let r = parseInt(coordinates[0]);
//     let c = parseInt(coordinates[1]);
//     checkMine(r,c);
//     if (tilesCleared === numberOfRows * numberOfColumns - numberOfMines) {
//         console.log(numberOfRows * numberOfColumns - numberOfMines)//14clicks
//         alert('All Clear, You Win!!!')
//         gameOver = true;
//         playAgain.innerHTML = "<button id='playAgainButton'>Play Again </button";
//     }
// }
//
// function revealMines(){
//     for (let r = 0; r< numberOfRows; r++) {
//         for (let c = 0; c < numberOfColumns; c++) {
//             let tile = board[r][c];
//             if (minesLocation.includes(tile.id)) {
//                 tile.setAttribute("src", "images/mine.jpg");
//             }
//         }
//     }
// }
//
// function checkMine(r,c) {
//     if ( r < 0 || r >= numberOfRows || c < 0 || c >= numberOfColumns) {
//         return;
//     }
//     if (board[r][c].classList.contains('tile-clicked')){
//         return;
//     }
//
//     board[r][c].classList.add('tile-clicked');
//     tilesCleared += 1;
//     tilesClearedElement.innerText = tilesCleared;
//     let minesFound = 0;
//     //top 3
//     minesFound += checkTile(r - 1, c - 1); // top left
//     minesFound += checkTile(r - 1, c); // top
//     minesFound += checkTile(r - 1, c + 1); // top right
//
//     //left and right
//     minesFound += checkTile(r, c - 1); // left
//     minesFound += checkTile(r, c + 1); // right
//
//     //bottom 3
//     minesFound += checkTile(r + 1, c - 1); // bottom left
//     minesFound += checkTile(r + 1, c); // bottom
//     minesFound += checkTile(r + 1, c + 1); // bottom right
//
//     if (minesFound === 0 &&  !minesLocation.includes(r.toString() + "-" + c.toString()) ){
//         board[r][c].setAttribute("src", "images/0.jpg");
//         // tilesCleared += 1;
//     }
//     if (minesFound > 0) {
//         board[r][c].setAttribute("src", "images/"+minesFound.toString()+".jpg");
//         // tilesCleared += 1;
//     }
//
//     else {
//         //top 3
//         checkMine(r - 1, c - 1); //top left
//         checkMine(r -1, c); // top
//         checkMine(r - 1, c + 1); // top right
//         //left and right
//         checkMine(r, c - 1); // left
//         checkMine(r, c + 1); // right
//         // bottom 3
//         checkMine(r * 1, c - 1); //bottom left
//         checkMine(r + 1, c); // bottom
//         checkMine(r + 1, c + 1); // bottom right
//     }
// }
//
// function checkTile(r,c) {
//     if ( r < 0 || r >= numberOfRows || c < 0 || c >= numberOfColumns) {
//         return 0;
//     }
//     if(minesLocation.includes(r.toString() + "-" + c.toString())) {
//         return 1;
//     }
//     return 0;
// }
// });
