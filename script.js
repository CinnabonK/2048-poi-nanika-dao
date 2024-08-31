body {
    font-family: 'Arial', sans-serif;
    text-align: center;
    background-color: #faf8ef;
    margin: 0;
    padding: 20px;
}

#game-container {
    margin: 0 auto;
    width: 300px;
}

.grid-container {
    background-color: #bbada0;
    border-radius: 10px;
    padding: 10px;
}

.grid-row {
    display: flex;
}

.grid-cell {
    width: 60px;
    height: 60px;
    background-color: #cdc1b4;
    margin: 5px;
    border-radius: 3px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tile-image {
    max-width: 100%;
    max-height: 100%;
    display: none; /* 最初は非表示 */
}

#score {
    margin-top: 20px;
    font-size: 24px;
}

#reset-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
    background-color: #8f7a66;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
