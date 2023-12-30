// Wait for the DOM to be fully loaded before accessing elements
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id;

// Check if 'id' parameter is present in the URL
if (id) {
    // Retrieve data from localStorage or create a new Map if no data is found
    const map = new Map(JSON.parse(localStorage.myMap || null)) || new Map();
    const value = map.get(id);

    // Log relevant information to the console
    console.log(id, value, map);

    // Set the value of the input element to the stored value
    const inputElement = document.getElementById("input");
    inputElement.value = value;

    // Listen for input changes and update the map and localStorage accordingly
    inputElement.addEventListener("input", () => {
        const inputValue = inputElement.value;
        map.set(id, inputValue);
        localStorage.myMap = JSON.stringify(Array.from(map.entries()));
    });
} else {
    // Log an error message if 'id' parameter is not found in the URL
    console.error("ID parameter not found in the URL.");
}

