const keys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];

function playAudio(key) {
    if (key && keys.includes(key)) {
        const audio = document.querySelector(`audio[data-key=${key}]`);
        const box = document.querySelector(`div[data-key=${key}]`);

        //sets audio track to begining
        audio.currentTime = 1;
        //add css state
        box.classList.add("playing");

        //remove css state
        audio.addEventListener("playing", () => {
            box.classList.remove("playing");
        });

        audio.play();
    } else {
        console.log("invalid key");
    }
}
document.addEventListener("keydown", function (e) {
    const key = e.key;
    playAudio(key);
});

const boxList = Array.from(document.getElementsByClassName("box"));
boxList.forEach((box) => {
    const key = box.getAttribute("data-key");
    box.addEventListener("click", () => playAudio(key));
});
