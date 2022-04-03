var results = document.querySelector("#results");
var wins = document.querySelector("#wins");
var losses = document.querySelector("#losses");

var timer = document.querySelector("#timer");

var userInput = document.querySelector("#text-input");
var startButton = document.querySelector("#start");

var countdown = 11;

// Timer function
startButton.addEventListener("click", function(event) {
    // prevents page refreshing and bubbling
    event.preventDefault();
    // startButton HIDE BUTTON ON PRESS
    startButton.setAttribute("style", "visibility: hidden");

    // function to change the number as it counts down
    var counter = setInterval(function() {
        // Subtract 1 from timer, then change the current timer
        countdown--;
        console.log("Countdown: " + countdown);
        timer.textContent = countdown;
        // if countdown hits 0, stop timer from continueing to subtract past 0
        if(countdown === 0) {
            clearInterval(counter);
            console.log("Timer Reached 0, game done");
            // Show startButton again on completion of function
            startButton.setAttribute("style", "visibility: visible");
            // resets time back to where it should be.
            countdown = 11;
        }
    }, 1000);
});