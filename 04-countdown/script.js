// DOM elements for input and display
const hourInputElement = document.getElementById("hour");
const minutesInputElement = document.getElementById("minutes");
const secondsInputElement = document.getElementById("seconds");

const hourHolder = document.getElementById("hour-holder");
const minuteHolder = document.getElementById("minute-holder");
const secondsHolder = document.getElementById("seconds-holder");

const countdownRunningElement = document.querySelectorAll(".countdown-running");
const inputFieldElement = document.querySelectorAll(".input");

// Initialize the target date
const date = new Date();

let hour = 0;
let min = 0;
let sec = 0;

let flag = true;

// Function to reset input values
const resetValue = () => {
    hourInputElement.value = 0;
    minutesInputElement.value = 0;
    secondsInputElement.value = 0;
};

// Function to set up countdown values
const setUpValue = () => {
    hour = hourInputElement.value;
    min = minutesInputElement.value;
    sec = secondsInputElement.value;
};

// Function to set the countdown target date
const setCountDown = () => {
    const currentDateTime = new Date(); // Get the current date and time
    date.setHours(currentDateTime.getHours() + parseInt(hour, 10));
    date.setMinutes(currentDateTime.getMinutes() + parseInt(min, 10));
    date.setSeconds(currentDateTime.getSeconds() + parseInt(sec, 10));
};

let isFirstRun = true; // Flag to check if it's the first run

// Function to start the countdown
const startCountDown = () => {
    if (isFirstRun) {
        setUpValue();
        isFirstRun = false; // Set the flag to false after the first run
    }
    setCountDown();
    countdownRunningElement.forEach((element) => {
        element.style.display = "block";
    });
    inputFieldElement.forEach((element) => {
        element.style.display = "none";
    });
    setInterval(() => {
        if (flag) {
            const currentDateTime = new Date();

            // Calculate the difference between the target date and current date
            const diff = new Date();
            diff.setHours(date.getHours() - currentDateTime.getHours());
            diff.setMinutes(date.getMinutes() - currentDateTime.getMinutes());
            diff.setSeconds(date.getSeconds() - currentDateTime.getSeconds());

            // Update the HTML elements with the calculated difference
            hourHolder.innerText = diff.getHours();
            minuteHolder.innerText = diff.getMinutes();
            secondsHolder.innerText = diff.getSeconds();
        }
    }, 1000);
};

// Event listener for the start button
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
    flag = true;
    startCountDown();
});

// Function to calculate the time difference
const diffTime = () => {
    const currDate = new Date();
    hour = date.getHours() - currDate.getHours();
    min = date.getMinutes() - currDate.getMinutes();
    sec = date.getSeconds() - currDate.getSeconds();
};

// Event listener for the pause button
const pauseButton = document.getElementById("pause-button");
pauseButton.addEventListener("click", () => {
    diffTime();
    flag = false;
});

// Event listener for the reset button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
    resetValue();
    isFirstRun = true;
    flag = false;

    countdownRunningElement.forEach((element) => {
        element.style.display = "none";
    });
    inputFieldElement.forEach((element) => {
        element.style.display = "block";
    });
});

// Initial reset of values
resetValue();
