const rotateElement = (element, degree) => {
    element.style.transform = `rotate(${-90 + degree}deg)`;
};

const s = document.getElementById("second");
const m = document.getElementById("minute");
const h = document.getElementById("hour");

setInterval(() => {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const secDegree = sec * 6;
    rotateElement(s, secDegree);

    const minDegree = min * 6;
    rotateElement(m, minDegree);

    const hourDegree = hour * 30;
    rotateElement(h, hourDegree);
}, 1000);
