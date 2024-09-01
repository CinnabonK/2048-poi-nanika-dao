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
                        }
                    }
                }
            }
            break;
        // 他の方向についても同様に修正
        // down
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
                        }
                    }
                }
            }
            break;
        // left
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
                        }
                    }
                }
            }
            break;
        // right
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
                        }
                    }
                }
            }
            break;
    }
    return moved;
}
