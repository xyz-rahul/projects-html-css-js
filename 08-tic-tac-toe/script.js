const containerDivElement = document.getElementById("container");

const BOX_COUNT = 3;

const boxMatrix = []

let player = 'X';
let movesCount = 0;

//creating boxMatrix with nil(kinda) val
for (let i = 0; i < BOX_COUNT; i++) {
    boxMatrix[i] = [];
    for (let j = 0; j < BOX_COUNT; j++) {
        boxMatrix[i][j] = '';
    }
}

const checkWinner = (i, j, player) => {
    movesCount++;

    const val = boxMatrix[i][j];

    const row = (boxMatrix[i][0] === val) & (boxMatrix[i][1] === val) & (boxMatrix[i][2] === val);
    const col = (boxMatrix[0][j] === val) & (boxMatrix[1][j] === val) & (boxMatrix[2][j] === val);
    const mainDiagonal = (boxMatrix[0][0] === val) & (boxMatrix[1][1] === val) & (boxMatrix[2][2] === val);
    const diagonal = (boxMatrix[2][0] === val) & (boxMatrix[1][1] === val) & (boxMatrix[0][2] === val);

    // Use setTimeout to allow the alert to run asynchronously,
    // addressing an issue where the alert would impact the subsequent color change.
    if (row | col | mainDiagonal | diagonal) {
        setTimeout(() => {

            alert("Winner", player);
        }, 0);
    }
    else if (movesCount == 9) {
        //executes in the end if no winner is chosen
        setTimeout(() => {

            alert("Oops, No winner");
        }, 0);
    }
}

//box matrix creation 
for (let i = 0; i < BOX_COUNT; i++) {
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container");

    for (let j = 0; j < BOX_COUNT; j++) {
        const changePlayer = () => {
            if (player == 'X') {
                player = 'O';
            } else {
                player = 'X';
            }
        }
        //create html component
        const box = document.createElement("div");
        box.classList.add("box");

        box.addEventListener("click", () => {
            if (player == 'X') {
                box.innerHTML = '<p>X</p>';
                changePlayer();
            } else {
                box.innerHTML = '<p>O</p>';
                changePlayer();
            }

            box.style.transform = 'rotateY(180deg)';
            box.style.backgroundColor = 'black';


            boxMatrix[i][j] = player;
            checkWinner(i, j);
        })

        rowContainer.append(box);

    }
    containerDivElement.append(rowContainer);
}






