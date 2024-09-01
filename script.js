const gridSize = 4;
let grid = [];
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    initGame();
    document.getElementById('reset-button').addEventListener('click', resetGame);
});

function initGame() {
    createGrid();
    addRandomTile();
    addRandomTile();
    updateGrid();
    updateScore(0);
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
}

function resetGame() {
    score = 0;
    updateScore(0);
    createGrid();
    addRandomTile();
    addRandomTile();
    updateGrid();
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
}

function getTileColor(value) {
    const colors = {
        0: '#cdc1b4',
        2: '#ffeb3b',   // 黄色
        4: '#ff9800',   // オレンジ
        8: '#ff5722',   // 濃いオレンジ
        16: '#f44336',  // 赤
        32: '#e91e63',  // ピンク
        64: '#9c27b0',  // 紫
        128: '#673ab7', // 濃い紫
        256: '#3f51b5', // 青
        512: '#2196f3', // 明るい青
        1024: '#00bcd4',// シアン
        2048: '#009688',// 緑
        4096: '#4caf50',// 明るい緑
        8192: '#8bc34a',// ライム
    };
    return colors[value] || '#000000'; // 他の値に対しては黒色
}
