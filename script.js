const gridSize = 4;
let grid = [];

document.addEventListener('DOMContentLoaded', initGame);

function initGame() {
    createGrid();
    addRandomTile();
    addRandomTile();
    updateGrid();
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

    function move(x, y, newX, newY) {
        if (grid[newX][newY] === grid[x][y] && !merged[newX][newY] && !merged[x][y]) {
            grid[newX][newY] *= 2;
            grid[x][y] = 0;
            merged[newX][newY] = true;
            moved = true;
        } else if (grid[newX][newY] === 0) {
            grid[newX][newY] = grid[x][y];
            grid[x][y] = 0;
            moved = true;
        }
    }

    switch (direction) {
        case 'up':
            for (let y = 0; y < gridSize; y++) {
                for (let x = 1; x < gridSize; x++) {
                    if (grid[x][y] !== 0) {
                        let newX = x;
                        while (newX > 0) {
                            move(newX, y, newX - 1, y);
                            newX--;
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
                        while (newX < gridSize - 1) {
                            move(newX, y, newX + 1, y);
                            newX++;
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
                        while (newY > 0) {
                            move(x, newY, x, newY - 1);
                            newY--;
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
                        while (newY < gridSize - 1) {
                            move(x, newY, x, newY + 1);
                            newY++;
                        }
                    }
                }
            }
            break;
    }
    return moved;
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
        2: '#eee4da',
        4: '#ede0c8',
        // 必要に応じて他の値の色を追加
    };
    return colors[value] || '#cdc1b4';
}
