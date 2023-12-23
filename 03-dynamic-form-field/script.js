const container = document.getElementById("container");

const field = (value, id) => `
    <div id="${id}" class="field"> 
        <input type="text" value="${value}"/>
        <button id="${id}" class="cross-button">X</button> 
    </div>
`;

let arr = [];
arr.push("");

const refreshFields = () => {
    container.innerHTML = arr
        .map((value, index) => field(value, index))
        .join("");

    //add remove event listener on every render as index changes (id is index)
    const cross = Array.from(document.querySelectorAll(".cross-button"));
    cross.forEach((e) => {
        e.addEventListener("click", () => {
            const id = e.getAttribute("id");
            remove(id);
            console.log("remove");
        });
    });
};

const add = document.getElementById("add");
add.addEventListener("click", () => {
    arr.push("");
    refreshFields();
});

const remove = (id) => {
    arr = arr.filter((e, index) => index !== parseInt(id));
    refreshFields();
};

// Initial rendering on page startup
refreshFields();
