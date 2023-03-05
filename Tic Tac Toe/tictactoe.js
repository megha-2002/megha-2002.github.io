const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const restartButton = document.querySelector('.restart');
let currentPlayer;
let gameOver;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  currentPlayer = X_CLASS;
  gameOver = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setStatus('');
}

function handleClick(e) {
  const cell = e.target;
  if (gameOver || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
    return;
  }
  placeMark(cell, currentPlayer);
  if (checkWin(currentPlayer)) {
    gameOver = true;
    setStatus(`${currentPlayer} wins!`);
    return;
  }
  if (checkDraw()) {
    gameOver = true;
    setStatus('Draw!');
    return;
  }
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
  placeComputerMark();
  if (checkWin(O_CLASS)) {
    gameOver = true;
    setStatus(`${O_CLASS} wins!
