// Get the container element from the HTML document
const containerDivElement = document.getElementById("container");

// Retrieve data from local storage or initialize an empty Map
const map = new Map(JSON.parse(localStorage.myMap || null)) || new Map();

// Create and append a button to add new boxes
const addBox = document.createElement("div");
addBox.classList.add("add");
addBox.innerHTML = `<p>+</p>`
addBox.addEventListener("click", generateBox);
containerDivElement.append(addBox);

//put html div for notes stored in local storage
const keysArray = Array.from(map.keys());
map.forEach((value, id) => {
    const boxElement = createDiv(id);
    const messageElement = boxElement.querySelector(".message")
    messageElement.innerText = value;
    redirectToNotePage(messageElement, id);
});

// Function to generate a new box when the add button is clicked
function generateBox(event) {
    event.preventDefault();

    const id = () => {
        const keysArray = Array.from(map.keys());
        const lastKey = keysArray.length > 0 ? parseInt(keysArray[keysArray.length - 1]) : 0;
        return lastKey + 1;
    }

    // Create a new box and assign a unique ID
    const box = createDiv(id);
    // Set a default note for the new box, update local storage, and redirect to the note page
    const customInput = "write your note here";
    map.set(id, customInput);
    localStorage.myMap = JSON.stringify(Array.from(map.entries()));
    redirectToNotePage(box, id);
}

// Function to redirect to the note page when a box is clicked
function redirectToNotePage(boxElement, id) {
    boxElement.addEventListener("click", () => {
        const url = `note.html?id=${id}`;
        window.location.href = url;
    });
}

// Function to create a new box with a cross button and a message area
function createDiv(id) {
    const box = document.createElement("div");
    box.classList.add("box");
    containerDivElement.append(box);

    const cross = document.createElement("div");
    cross.innerText = 'x';
    cross.classList.add("button");

    // Remove the box when the cross button is clicked
    cross.addEventListener("click", (e) => {
        e.preventDefault();
        box.remove()
        map.delete(id);

        localStorage.myMap = JSON.stringify(Array.from(map.entries()));
    });

    // Append cross button and message area to the box
    box.append(cross);
    const message = document.createElement("div");
    message.classList.add("message");
    box.append(message);

    return box;
}

