const form = document.getElementById("signup-form")
const usernameElement = document.getElementById("username_input");
const emailElement = document.getElementById("email_input");
const passwordElement = document.getElementById("password_input");
const confirmPasswordElement = document.getElementById("confirm_password_input");
const errorElement = document.getElementById("error");


const setError = function(message) {
    errorElement.innerText = message;
}

const validateUsername = function() {
    const username = usernameElement.value;
    const regex = /^([^\s]*[A-Za-z0-9]\s{0,1})[^\s]*$/;

    if (regex.test(username)) {
        setError("");
        return true;
    } else {
        setError("username invalid");
    }

    return false;
}
const validateEmail = function() {
    const email = emailElement.value;
    const regex = /^(([^<>() [\]\\.,;:\s@"]+(\.[^<>() [\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email)) {
        setError("");
        return true;
    } else {
        setError("email invalid");
    }

    return false;
}
const validatePassword = function() {
    const password = passwordElement.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (regex.test(password)) {
        setError("");
        return true;
    } else {
        setError("password invalid");
    }

    return false;
}
const validateCofirmPassword = function() {
    const confirmPassword = confirmPasswordElement.value.trim();
    const password = passwordElement.value.trim();

    if (password === confirmPassword) {
        setError("");
        return true;
    } else {
        setError("cofirmPassword invalid");
    }

    return false;
}
const selectValidatorToRun = (event) => {

    switch (event.target.id) {
        case "username_input":
            validateUsername();
            break
        case "email_input":
            validateEmail();
            break
        case "password_input":
            validatePassword();
            break
        case "confirm_password_input":
            validateCofirmPassword();
            break
    }
}
const debouncer = function(callback, delay = 500) {
    let timeoutId;

    return function(...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}
/*
    * debouncer is executed
    * return function(...args) { } is mounted 
    * args accepts event and gives it to callback 
*/

form.addEventListener("input", debouncer(selectValidatorToRun))


form.addEventListener("submit", (event) => {
    console.log(event);
    event.preventDefault();
    if (validateUsername && validateEmail && validatePassword && validateCofirmPassword) {

        alert("Good ✅✅");
    }
})
