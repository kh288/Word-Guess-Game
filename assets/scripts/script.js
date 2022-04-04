var results = document.querySelector("#results");
var winScore = document.querySelector("#wins");
var lossScore = document.querySelector("#losses");
var scoreStatus = document.querySelector("#score-status");

var wins = 0;
if (localStorage.getItem("wins")) {
    wins = JSON.parse(localStorage.getItem("wins"));
    winScore.textContent = localStorage.getItem("wins", wins);
}

var loss = 0;
if (localStorage.getItem("loss")) {
    loss = JSON.parse(localStorage.getItem("loss"));
    lossScore.textContent = localStorage.getItem("loss", loss);
}

var timer = document.querySelector("#timer");

var userInput = document.querySelector("#text-input");
var userForm = document.querySelector("#input-form");
var startButton = document.querySelector("#start");

var countdown = 10;
var inputArray = [];
var hiddenWord =[];
var currentGuess = "";

var currentWord = "";
var wordLibrary = 
["jumping",
"singer",
"foreign",
"height",
"chunky",
"flavor",
"indigo"];

// Timer function
function startTimer(event) {
    // prevents page refreshing and bubbling
    event.preventDefault();
    // We run this function here because its ran per "run"
    drawHiddenWord();
    // startButton HIDE BUTTON ON PRESS
    startButton.setAttribute("style", "display: none");
    userInput.setAttribute("style", "display: initial");
    // function to change the number as it counts down
    var counter = setInterval(function() {
        // textContent ACTUALLY changes the text for the timer
        timer.textContent = countdown;
        // console.log(localStorage.getItem("CurrentWord"));

        // WIN
        if (currentGuess == currentWord) {
            console.log("Win!");
            results.setAttribute("style", "color: green");
            wins++;
            localStorage.setItem("wins", wins);
            winScore.textContent = localStorage.getItem("wins", wins);
            countdown = 0;
            scoreStatus.textContent = "You win!";
            scoreStatus.setAttribute("style", "color: green");
        }

        // if countdown hits 0, stop timer from continueing to subtract past 0
        if(countdown === 0) {
            // LOSS
            if (currentGuess != currentWord) {
                results.setAttribute("style", "color: red");
                loss++;
                localStorage.setItem("loss", loss);
                lossScore.textContent = localStorage.getItem("wins", loss);
                scoreStatus.textContent = "You lost!";
                scoreStatus.setAttribute("style", "color: red");
            }
            clearInterval(counter);
            console.log("Timer Reached 0, game done");
            // Show startButton again on completion of function
            startButton.setAttribute("style", "display: initial");
            userInput.setAttribute("style", "display: none");
            // resets time back to where it should be.
            countdown = 10;
            return;
        }
        // Subtract 1 from timer, then change the current timer
        countdown--;
    }, 1000);
}

function drawResult() {
    // take that random word and put it into browser local storage
    localStorage.setItem("CurrentWord", currentWord);

    // Iterates through the hidden word.
    for (x = 0; x < currentWord.length; x++) {
        // console.log("Checking for: " + currentWord[x] + " in the " + x + " slot");
        for (y = 0; y < currentGuess.length; y++) {
            if (currentGuess[y] === currentWord[x]) {
                // console.log(currentWord[y] + " is a Match!"); // debugging
                hiddenWord[x] = currentGuess[y].toUpperCase();
            }
        }
    }

    // join removes the space and stores it into a string from an array
    results.setAttribute("style", "#ccc");
    var wordResult = hiddenWord.join(" ");
    results.textContent = wordResult;
}

function drawHiddenWord() {
    // Selects a new random word from our wordLibrary array
    currentWord = wordLibrary[Math.floor(Math.random() * wordLibrary.length)];

    // Wipes hidden word then forms a new blank hidden word
    hiddenWord = [];
    for (k = 0; k < currentWord.length; k++) {
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
    currentGuess = userInput.value.trim(); // is a clean string word
    // takes cleaned up input var and pushes it into input array (stores all guesses)
    inputArray.push(currentGuess);
    // Sets input value to a cleaned up variable to store in the browser with "setItem"
    localStorage.setItem("guess", JSON.stringify(inputArray));
    // console.log(wordLibrary[0].includes(input));
    drawResult();
    // Sets HTML input value back to nothing
    userInput.value = "";
}

startButton.onclick = startTimer;
userForm.addEventListener("submit", checkInput);
