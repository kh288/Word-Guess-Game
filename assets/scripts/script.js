var results = document.querySelector("#results");
var wins = document.querySelector("#wins");
var losses = document.querySelector("#losses");
var userInput = document.querySelector("#text-input");
var timer = document.querySelector("#timer");
var startButton = document.querySelector("#start");

var countdown = 11;

// Timer function
startButton.addEventListener("click", function(event) {
    // prevents page refreshing
    event.preventDefault();
    // function to change the number as it counts down
    var timerInterval = setInterval(function() {
        // Subtract 1 from timer, then change the current timer
        countdown--;
        timer.textContent = countdown;
        // if countdown hits 0, stop timer from continueing to subtract past 0
        if(countdown === 0) {
            clearInterval(timerInterval);
            console.log("Timer Reached 0");
        }
    }, 1000);
});