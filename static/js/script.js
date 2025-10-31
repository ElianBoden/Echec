let board = null;
let game = new Chess(); // for UI (client-side view)

function updateStatus(turn) {
    let status = '';
    let moveColor = turn === 'white' ? 'White' : 'Black';

    if (game.isCheckmate()) {
        status = 'Game over, ' + moveColor + ' is checkmated.';
    } else if (game.isDraw()) {
        status = 'Game over, draw.';
    } else {
        status = 'Turn: ' + moveColor;
        if (game.inCheck()) status += ', ' + moveColor + ' is in check.';
    }
    $('#status').text(status);
}

function onDrop(source, target) {
    // try move on the backend
    fetch('/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: source, to: target })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'ok') {
            game.load(data.fen);
            board.position(data.fen);
            updateStatus(data.turn);
        } else {
            // illegal move → snap back
            board.position(game.fen());
        }
    });
}

function initBoard() {
    board = Chessboard('board', {
        draggable: true,
        position: 'start',
        onDrop: onDrop
    });
    updateStatus('white');
}

$('#reset').on('click', () => {
    fetch('/reset', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
            game.load(data.fen);
            board.start();
            updateStatus('white');
        });
});

$(document).ready(initBoard);