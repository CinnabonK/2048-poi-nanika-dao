document.addEventListener('DOMContentLoaded', () => {
    const gridSize = 4;
    const grid = [];
    let score = 0;

    // ゲームの初期化
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

    // ランダムな場所にタイルを追加
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

    // タイルの値を設定
    function setTileValue(row, col, value) {
        const tile = document.querySelector(`.grid-row:nth-child(${row + 1}) .grid-cell:nth-child(${col + 1})`);
        updateTile(tile, value);
    }

    // タイルの画像を更新
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

    // スコアの更新
    function updateScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = `スコア: ${score}`;
    }

    // タイルを移動する
    function moveTiles(direction) {
        let moved = false;
        // タイル移動のロジックを実装
        // 上、下、左、右への移動処理
        // 各方向に対して、タイルを移動させて合体させる

        if (moved) {
            addRandomTile();
            updateScore();
            if (checkGameOver()) {
                alert('ゲームオーバー!');
            }
        }
    }

    // ゲームオーバーの確認
    function checkGameOver() {
        // 移動可能なタイルがあるかどうかを確認
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

    // リセットボタンの処理
    document.getElementById('reset-button').addEventListener('click', initGame);

    // キー入力処理
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

    initGame(); // ゲームの初期化を呼び出す
});
