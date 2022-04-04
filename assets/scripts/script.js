var results = document.querySelector("#results");
var wins = document.querySelector("#wins");
var losses = document.querySelector("#losses");

var timer = document.querySelector("#timer");

var userInput = document.querySelector("#text-input");
var userForm = document.querySelector("#input-form");
var startButton = document.querySelector("#start");

var countdown = 11;
var textInputStore = "";
var inputArray = [];
var hiddenWord =[];

var guessLibrary = 
["jumping",
"singer",
"foreign",
"height",
"chunky"];

// randomly chooses the current word
var currentWord = guessLibrary[Math.floor(Math.random() * guessLibrary.length - 1)];

// Timer function
function startTimer(event) {
    // prevents page refreshing and bubbling
    event.preventDefault();
    // startButton HIDE BUTTON ON PRESS
    startButton.setAttribute("style", "display: none");
    userInput.setAttribute("style", "display: initial");
    // function to change the number as it counts down
    var counter = setInterval(function() {
        // Subtract 1 from timer, then change the current timer
        countdown--;
        // console.log("Countdown: " + countdown);
        // textContent ACTUALLY changes the text for the timer
        timer.textContent = countdown;

        // if countdown hits 0, stop timer from continueing to subtract past 0
        if(countdown === 0) {
            clearInterval(counter);
            console.log("Timer Reached 0, game done");
            // Show startButton again on completion of function
            startButton.setAttribute("style", "display: initial");
            userInput.setAttribute("style", "display: none");
            // resets time back to where it should be.
            countdown = 11;
        }
    }, 1000);
}

function drawResult(stringInput) {
    // take that random word and put it into browser local storage
    localStorage.setItem("Current Word", currentWord);

    // Iterates through the hidden word.
    for (x = 0; x < currentWord.length; x++) {
        console.log("Checking for: " + currentWord[x] + " in the " + x + " slot");
        for (y = 0; y < stringInput.length; y++) {
            if (stringInput[y] === currentWord[x]) {
                console.log("Match!");
                hiddenWord[x] = stringInput[y].toUpperCase();
            }
        }
    }

    if (stringInput === currentWord[0]) {
        console.log("Win!");
    }

    // join removes the space and stores it into a string from an array
    var wordResult = hiddenWord.join(" ");
    results.textContent = wordResult;
}

function drawHiddenWord() {
    // Should only be ran per "run"
    // Variable to represent the currently selected word but in _ _ _ format

    for (k = 0; k < guessLibrary[0].length; k++) {
        hiddenWord.push("_");
    }
    // join removes the space and stores it into a string from an array
    var wordResult = hiddenWord.join(" ");
    results.textContent = wordResult;
}

// Check text field input
function checkInput(event) {
    event.preventDefault();
    // cleanup input
    var input = userInput.value.trim(); // is a clean string word
    // takes cleaned up input var and pushes it into input array (stores all guesses)
    inputArray.push(input);

    // Sets input value to a cleaned up variable to store in the browser with "setItem"
    localStorage.setItem("guess", JSON.stringify(inputArray));
    // console.log(guessLibrary[0].includes(input));
    drawResult(input);
    // if (guessLibrary[0] === input) {
    //     console.log("Wow! you guessed the word!");
    // }
    // if (guessLibrary[0].includes(input)) {
    //     console.log(input + ": contains a character from: " + guessLibrary[0]);
    // } else {
    //     console.log(input + ": input does not contain a letter from: " + guessLibrary[0]);
    // }
    // Sets HTML input value back to nothing
    userInput.value = "";
}

function playGame() {
    startButton.onclick = startTimer;
    userForm.addEventListener("submit", checkInput);
    drawHiddenWord();
}

playGame();