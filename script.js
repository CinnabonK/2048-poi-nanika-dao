const gridSize = 4;
let grid = [];
let score = 0;
let highScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadHighScore();
    initGame();
    document.getElementById('reset-button').addEventListener('click', resetGame);
    setupTouchControls();
});

function initGame() {
    createGrid();
    addRandomTile();
    addRandomTile();
    updateGrid();
    updateScore(0);
    hideGameOver();
    document.addEventListener('keydown', handleKeyPress);
}

function createGrid() {
    grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    for (let i = 0; i < gridSize * gridSize; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        gridContainer.appendChild(tile);
    }
}

function handleKeyPress(event) {
    let moved = false;
    switch (event.key) {
        case 'ArrowUp':
            moved = moveTiles('up');
            break;
        case 'ArrowDown':
            moved = moveTiles('down');
            break;
        case 'ArrowLeft':
            moved = moveTiles('left');
            break;
        case 'ArrowRight':
            moved = moveTiles('right');
            break;
    }

    if (moved) {
        addRandomTile();
        updateGrid();
        if (checkGameOver()) {
            showGameOver();
        }
    }
}

function moveTiles(direction) {
    let moved = false;
    let merged = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

    switch (direction) {
        case 'up':
            for (let y = 0; y < gridSize; y++) {
                for (let x = 1; x < gridSize; x++) {
                    if (grid[x][y] !== 0) {
                        let newX = x;
                        while (newX > 0 && grid[newX - 1][y] === 0) {
                            grid[newX - 1][y] = grid[newX][y];
                            grid[newX][y] = 0;
                            newX--;
                            moved = true;
                        }
                        if (newX > 0 && grid[newX - 1][y] === grid[newX][y] && !merged[newX - 1][y]) {
                            grid[newX - 1][y] *= 2;
                            grid[newX][y] = 0;
                            merged[newX - 1][y] = true;
                            moved = true;
                            updateScore(grid[newX - 1][y]);
                        }
                    }
                }
            }
            break;
        case 'down':
            for (let y = 0; y < gridSize; y++) {
                for (let x = gridSize - 2; x >= 0; x--) {
                    if (grid[x][y] !== 0) {
                        let newX = x;
                        while (newX < gridSize - 1 && grid[newX + 1][y] === 0) {
                            grid[newX + 1][y] = grid[newX][y];
                            grid[newX][y] = 0;
                            newX++;
                            moved = true;
                        }
                        if (newX < gridSize - 1 && grid[newX + 1][y] === grid[newX][y] && !merged[newX + 1][y]) {
                            grid[newX + 1][y] *= 2;
                            grid[newX][y] = 0;
                            merged[newX + 1][y] = true;
                            moved = true;
                            updateScore(grid[newX + 1][y]);
                        }
                    }
                }
            }
            break;
        case 'left':
            for (let x = 0; x < gridSize; x++) {
                for (let y = 1; y < gridSize; y++) {
                    if (grid[x][y] !== 0) {
                        let newY = y;
                        while (newY > 0 && grid[x][newY - 1] === 0) {
                            grid[x][newY - 1] = grid[x][newY];
                            grid[x][newY] = 0;
                            newY--;
                            moved = true;
                        }
                        if (newY > 0 && grid[x][newY - 1] === grid[x][newY] && !merged[x][newY - 1]) {
                            grid[x][newY - 1] *= 2;
                            grid[x][newY] = 0;
                            merged[x][newY - 1] = true;
                            moved = true;
                            updateScore(grid[x][newY - 1]);
                        }
                    }
                }
            }
            break;
        case 'right':
            for (let x = 0; x < gridSize; x++) {
                for (let y = gridSize - 2; y >= 0; y--) {
                    if (grid[x][y] !== 0) {
                        let newY = y;
                        while (newY < gridSize - 1 && grid[x][newY + 1] === 0) {
                            grid[x][newY + 1] = grid[x][newY];
                            grid[x][newY] = 0;
                            newY++;
                            moved = true;
                        }
                        if (newY < gridSize - 1 && grid[x][newY + 1] === grid[x][newY] && !merged[x][newY + 1]) {
                            grid[x][newY + 1] *= 2;
                            grid[x][newY] = 0;
                            merged[x][newY + 1] = true;
                            moved = true;
                            updateScore(grid[x][newY + 1]);
                        }
                    }
                }
            }
            break;
    }
    return moved;
}

function updateScore(value) {
    score += value;
    document.getElementById('score').textContent = score;
    if (score > highScore) {
        highScore = score;
        document.getElementById('high-score').textContent = highScore;
        saveHighScore(highScore);
    }
}

function resetGame() {
    score = 0;
    updateScore(0);
    createGrid();
    addRandomTile();
    addRandomTile();
    updateGrid();
    hideGameOver();
}

function addRandomTile() {
    const emptyCells = getEmptyCells();
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.x][randomCell.y] = Math.random() > 0.1 ? 2 : 4;
    }
}

function getEmptyCells() {
    const emptyCells = [];
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (grid[x][y] === 0) {
                emptyCells.push({ x, y });
            }
        }
    }
    return emptyCells;
}

function updateGrid() {
    const tiles = document.querySelectorAll('.tile');
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            const tileValue = grid[x][y];
            const tile = tiles[x * gridSize + y];
            tile.textContent = tileValue === 0 ? '' : tileValue;
            tile.style.backgroundColor = getTileColor(tileValue);
        }
    }
    if (checkGameOver()) {
        showGameOver();
    }
}

function getTileColor(value) {
    const colors = {
        0: '#cdc1b4',
        2: '#ffeb3b',
        4: '#ff9800',
        8: '#ff5722',
        16: '#f44336',
        32: '#e91e63',
        64: '#9c27b0',
        128: '#673ab7',
        256: '#3f51b5',
        512: '#2196f3',
        1024: '#00bcd4',
        2048: '#009688',
        4096: '#4caf50',
        8192: '#8bc34a',
    };
    return colors[value] || '#000000';
}

// ハイスコアを localStorage から読み込む
function loadHighScore() {
    const savedHighScore = localStorage.getItem('2048HighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore, 10);
        document.getElementById('high-score').textContent = highScore;
    }
}

// ハイスコアを localStorage に保存する
function saveHighScore(score) {
    localStorage.setItem('2048HighScore', score);
}

// スワイプ操作のためのタッチイベントのセットアップ
function setupTouchControls() {
    let touchStartX = null;
    let touchStartY = null;

    document.addEventListener('touchstart', function(event) {
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    });

    document.addEventListener('touchmove', function(event) {
        if (!touchStartX || !touchStartY) {
            return;
        }

        const touchEndX = event.touches[0].clientX;
        const touchEndY = event.touches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                handleKeyPress({ key: 'ArrowRight' });
            } else {
                handleKeyPress({ key: 'ArrowLeft' });
            }
        } else {
            if (deltaY > 0) {
                handleKeyPress({ key: 'ArrowDown' });
            } else {
                handleKeyPress({ key: 'ArrowUp' });
            }
        }

        touchStartX = null;
        touchStartY = null;
    });
}

// ゲームオーバーをチェックする
function checkGameOver() {
    if (getEmptyCells().length > 0) return false;

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            const tile = grid[x][y];
            if (x < gridSize - 1 && grid[x + 1][y] === tile) return false;
            if (y < gridSize - 1 && grid[x][y + 1] === tile) return false;
        }
    }
    return true;
}

// ゲームオーバー表示
function showGameOver() {
    document.getElementById('game-over').classList.remove('hidden');
}

// ゲームオーバーを隠す
function hideGameOver() {
    document.getElementById('game-over').classList.add('hidden');
}
