const ROWS = 50, COLUMNS = 50;
const gameBoardElement = document.getElementById("game-board")

//adding grid layout
const gridTemplateRowOrColumn = (rowsOrColumnCount) => {
    let gridTemplateRowsOrColumnString = '';
    for (let i = 0; i < rowsOrColumnCount; i++) {
        gridTemplateRowsOrColumnString += '12px ';
    }
    return gridTemplateRowsOrColumnString;
}
gameBoardElement.style.display = "grid";
gameBoardElement.style.gridTemplateRows = gridTemplateRowOrColumn(ROWS);
gameBoardElement.style.gridTemplateColumns = gridTemplateRowOrColumn(COLUMNS);


const snake = [{ x: ROWS / 2, y: COLUMNS / 2 }];
let snakeDirection = { x: 0, y: 0 };
let playing = true;

let foodPosition = { x: 10, y: 10 }

function generateFoodPosition() {
    const x = Math.floor(Math.random() * 60);
    const y = Math.floor(Math.random() * 60);
    foodPosition = { x, y }
}

function createFood() {
    const foodElement = document.createElement("div");
    foodElement.classList.add("food");

    foodElement.style.gridRow = foodPosition.y;
    foodElement.style.gridColumn = foodPosition.x;

    gameBoardElement.append(foodElement);
}

function setSnake() {
    const newPosition = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
    if (newPosition.x < 0 || newPosition.x > ROWS || newPosition.y < 0 || newPosition.y > COLUMNS) {
        playing = false;
        alert("Game Over");
    }

    //insert new position for snake head
    snake.unshift(newPosition);

    //remove snake tail at each render
    snake.pop(newPosition);
    // document.removeChild(gameBoardElement.snake);

    snake.forEach((coordinate) => {
        const box = document.createElement("div");
        box.classList.add("snake");

        box.style.gridRow = coordinate.y;
        box.style.gridColumn = coordinate.x;
        gameBoardElement.append(box);

    });
}

function changeDirection(event) {
    switch (event.key) {
        case "ArrowUp":
            snakeDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            snakeDirection = { x: 0, y: +1 };
            break;
        case "ArrowLeft":
            snakeDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            snakeDirection = { x: 1, y: 0 };
            break;
    }
}


function isCollision() {
    snake.forEach(coordinate => {
        if (coordinate.x === foodPosition.x && coordinate.y === foodPosition.y) {

            //if snake head makes contact
            if (coordinate.x === snake[0].x && coordinate.y === snake[0].y) {
                const newPosition = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };

                // add one more box to snake length
                //insert new position for snake head
                snake.unshift(newPosition);
            }
            //else food position was randamly chosen inside snake body on grid so generate position again


            generateFoodPosition();
        }
    })
}

let prevTimeStamp = 0;
function refreshGame(timeStamp) {
    if (playing && timeStamp - prevTimeStamp > 100) {
        gameBoardElement.innerHTML = "";
        createFood();
        setSnake();
        isCollision();
        prevTimeStamp = timeStamp;
    }
    window.requestAnimationFrame(refreshGame);
}


document.addEventListener("keydown", changeDirection);
window.requestAnimationFrame(refreshGame);
