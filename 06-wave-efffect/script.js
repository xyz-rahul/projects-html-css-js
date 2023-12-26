const containerDivElement = document.getElementById("container");
const BOX_COUNT = 20; // Adjust the BOX value based on your requirements

const arr = [];

for (let i = 0; i < BOX_COUNT; i++) {
    arr[i] = [];
    const rowContainer = document.createElement("div");
    rowContainer.classList.add('row-container');
    for (let j = 0; j < BOX_COUNT; j++) {
        const box = document.createElement("div");
        box.classList.add("circle");
        rowContainer.append(box);

        arr[i][j] = box;

        box.addEventListener("mouseover", () => {
            start(i, j);
        });
    }
    containerDivElement.append(rowContainer);
}

function start(x, y) {
    const grow = (i, j) => {
        if (i >= 0 && i < arr.length && j >= 0 && j < arr[0].length && !arr[i][j].classList.contains("grow")) {

            const box = arr[i][j]
            box.classList.add("grow");


            setTimeout(() => {

                grow(i + 1, j);
                grow(i - 1, j);
                grow(i, j + 1);
                grow(i, j - 1);
            }, 100)
            setTimeout(() => {
                box.classList.remove("grow");
            }, 400);
        }
    }
    grow(x, y);
}
