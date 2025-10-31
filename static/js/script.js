// Using chess.js for logic
const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: handleMove
});

const game = new Chess();

function handleMove(source, target) {
  const move = game.move({ from: source, to: target, promotion: 'q' });

  if (move === null) return 'snapback'; // illegal move

  window.setTimeout(makeRandomMove, 250);
}

function makeRandomMove() {
  const possibleMoves = game.moves();
  if (game.game_over()) return alert('Game over!');

  const randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.position(game.fen());
}