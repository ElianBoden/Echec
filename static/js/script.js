const board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: handleMove
});

let gameOver = false;

async function handleMove(source, target) {
    if (gameOver) return 'snapback';
    
    const response = await fetch('/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: source, to: target })
    });

    const data = await response.json();

    if (data.status === 'ok') {
        board.position(data.fen);
        document.getElementById('status').innerText = 
            data.is_game_over ? 'Game Over!' : `Turn: ${data.turn}`;
        gameOver = data.is_game_over;
    } else {
        return 'snapback';
    }
}

document.getElementById('reset').onclick = async () => {
    const response = await fetch('/reset', { method: 'POST' });
    const data = await response.json();
    if (data.status === 'reset') {
        board.position('start');
        document.getElementById('status').innerText = 'Turn: white';
        gameOver = false;
    }
};