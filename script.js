document.addEventListener('DOMContentLoaded', () => {
    const gridSize = 4;
    const grid = [];
    let score = 0;

    function initGame() {
        for (let i = 0; i < gridSize; i++) {
            grid[i] = [];
            for (let j = 0; j < gridSize; j++) {
                grid[i][j] = 0;
                setTileValue(i, j, 0);
            }
        }
        score = 0;
        updateScore();
        addRandomTile();
        addRandomTile();
    }

    function addRandomTile() {
        let emptyTiles = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === 0) {
                    emptyTiles.push({ row: i, col: j });
                }
            }
        }
        if (emptyTiles.length > 0) {
            const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            grid[randomTile.row][randomTile.col] = Math.random() < 0.9 ? 2 : 4;
            setTileValue(randomTile.row, randomTile.col, grid[randomTile.row][randomTile.col]);
        }
    }

    function setTileValue(row, col, value) {
        const tile = document.querySelector(`.grid-row:nth-child(${row + 1}) .grid-cell:nth-child(${col + 1})`);
        updateTile(tile, value);
    }

    function updateTile(tile, value) {
        const tileImage = tile.querySelector('.tile-image');
        if (value > 0) {
            tileImage.src = `images/${value}.svg`;
            tileImage.style.display = 'block';
        } else {
            tileImage.src = '';
            tileImage.style.display = 'none';
        }
    }

    function updateScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `スコア: ${score}`;
    }

    function moveTiles(direction) {
        let moved = false;

        if (direction === 'up') {
            for (let col = 0; col < gridSize; col++) {
                let combined = Array(gridSize).fill(false);
                for (let row = 1; row < gridSize; row++) {
                    if (grid[row][col] !== 0) {
                        let newRow = row;
                        while (newRow > 0 && grid[newRow - 1][col] === 0) {
                            grid[newRow - 1][col] = grid[newRow][col];
                            grid[newRow][col] = 0;
                            newRow--;
                            moved = true;
                        }
                        if (newRow > 0 && grid[newRow - 1][col] === grid[newRow][col] && !combined[newRow - 1]) {
                            grid[newRow - 1][col] *= 2;
                            grid[newRow][col] = 0;
                            combined[newRow - 1] = true;
                            score += grid[newRow - 1][col];
                            moved = true;
                        }
                    }
                }
            }
        }

        // ここに他の方向（down, left, right）の処理を追加します

        if (moved) {
            addRandomTile();
            updateScore();
            if (checkGameOver()) {
                alert('ゲームオーバー!');
            }
        }
    }

    function checkGameOver() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (grid[i][j] === 0) return false;
                if (i > 0 && grid[i][j] === grid[i - 1][j]) return false;
                if (i < gridSize - 1 && grid[i][j] === grid[i + 1][j]) return false;
                if (j > 0 && grid[i][j] === grid[i][j - 1]) return false;
                if (j < gridSize - 1 && grid[i][j] === grid[i][j + 1]) return false;
            }
        }
        return true;
    }

    document.getElementById('reset-button').addEventListener('click', initGame);

    // キーイベントをリスナーで設定
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                moveTiles('up');
                break;
            case 'ArrowDown':
                moveTiles('down');
                break;
            case 'ArrowLeft':
                moveTiles('left');
                break;
            case 'ArrowRight':
                moveTiles('right');
                break;
        }
    });

    initGame();
});
