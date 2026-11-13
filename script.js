const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("start-button");
const comparison = document.getElementById("comparison");
const piInput = document.getElementById("pi-input");
const checkbutton = document.getElementById("check-button");
const result = document.getElementById("result");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const resetButton = document.getElementById("reset-button");


piInput.value = localStorage.getItem("savedInput") || "";


startButton.addEventListener("click", function() {
    homeScreen.hidden = true;
    gameScreen.hidden = false;
});


checkbutton.addEventListener("click", function() {

    const userInput = piInput.value.replace(/\s/g, "");

    let correctCount = 0;
    let hasErrors = false;

    comparison.innerHTML = "";

    for (let i = 0; i < userInput.length; i++) {

        const digit = document.createElement("span");
        digit.textContent = userInput[i];

        if (userInput[i] === pi[i]) {
            digit.style.color = "#A6FF8F";
            correctCount++;
        } else {
            digit.style.color = "#FF7777";
            hasErrors = true;
        }

        comparison.appendChild(digit);
    }

    
    progressText.textContent = `Правильно: ${correctCount} из ${userInput.length}`;

    
    const percentage = userInput.length === 0
        ? 0
        : (correctCount / userInput.length) * 100;

    progressFill.style.width = percentage + "%";

    
    if (hasErrors) {
        result.textContent = "Есть ошибки!";
    } else {
        result.textContent = "Ошибок нет!";
    }

});


piInput.addEventListener("input", function() {
    localStorage.setItem("savedInput", piInput.value);
});

resetButton.addEventListener("click", function() {

    piInput.value = "";

    localStorage.removeItem("savedInput");

    comparison.innerHTML = "";
    result.textContent = "";
    progressText.textContent = "";
    progressFill.style.width = "0%";

});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
}