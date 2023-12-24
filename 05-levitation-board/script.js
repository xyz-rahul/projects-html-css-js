const containerDivElement = document.getElementById("container");
const colors = [
    "#e74c3c",
    "#8e44ad",
    "#3498db",
    "#e67e22",
    "#2ecc71",
    "#f2e335",
    "#ef4a92",
];
const defaultColor = "#444f7c";

//number of square in board
const BOXES = 513;
for (let i = 0; i < BOXES; i++) {
    const box = document.createElement("div");
    box.addEventListener("mouseover", () => {
        setColor(box);
    });
    box.addEventListener("mouseout", () => {
        removeColor(box);
    });

    containerDivElement.append(box);
}

function setColor(box) {
    box.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
}
function removeColor(box) {
    box.style.backgroundColor = defaultColor;
}
