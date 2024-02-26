let registeredMathString = "";

document.querySelectorAll(".operation").forEach(button => {
    button.addEventListener("click", function (e) {
        if (/^[0-9]$/.test(registeredMathString[registeredMathString.length - 1])) registeredMathString += e.target.getAttribute("data-operation");
        else registeredMathString[registeredMathString.length - 1] = e.target.getAttribute("data-operation");
        updateDisplay(registeredMathString);
    });
});

document.querySelector(".equals").addEventListener("click", function () {
    let result = "" + Function(`'use strict'; return ${registeredMathString}`)();
    updateDisplay(result);
    registeredMathString = (result == "Infinity" ? "0" : result);
});

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", function (e) {
        registeredMathString += e.target.textContent;
        updateDisplay(registeredMathString);
    });
});

document.body.addEventListener("keydown", function (e) {
    if (/^[0-9]$/.test(e.key)) {
        registeredMathString += e.key;
        updateDisplay(registeredMathString);
    }
});

function updateDisplay(value) {
    value = value.replaceAll("/", "÷").replaceAll("*", "×");
    document.getElementById("display").value = value;
}

function getDisplayedValue() { return document.getElementById("display").value; }

function appendToDisplay(value) { updateDisplay(getDisplayedValue() + value); }