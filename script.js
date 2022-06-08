'use strict';

const textSwap = function (textClass, message) {
    document.querySelector(`${textClass}`).textContent = message;
}

const randomNumber = function () {
    return Math.floor(Math.random() * 100 ) + 1;
}
let secretNumber = randomNumber ();

let highScore = 0;
let score = 100;

const input = document.querySelector('.guess'); // Get the input field

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(e) {
  // If the user presses the "Enter" key on the keyboard
  if (e.key === "Enter") {
    // Cancel the default action, if needed
    e.preventDefault();
    // Trigger the button element with a click
    document.querySelector(".check").click();
  }
});

document.querySelector('.check').addEventListener('click', function (e) {
    e.preventDefault();
    const guess = Number(document.querySelector('.guess').value);

    if (!guess) {
        textSwap(".message", "Insert a number!");
    } else if ( score > 1 ) {
        if ( guess === secretNumber ) {
            textSwap(".message", "Bingo! You found the number.");
            textSwap(".reset","Play again!");
            if ( score > highScore ) {
                highScore = score;
                textSwap(".highScore", highScore);
            }
        } else if (guess != secretNumber) {
            textSwap(".message", guess > secretNumber ? "Too high . . ." : "Too low . . .");
            score--;
            textSwap(".score", `Score: ${score}`);
        }
    } else {
        textSwap(".score", `Score: 0`);
        textSwap(".message", "You lose :(");
        textSwap(".reset", "Play again!");
    }
});

document.querySelector('.reset').addEventListener('click', function () {
    score = 100;
    textSwap(".score", `Score: ${score}`);
    document.querySelector('.guess').value =  '';
    secretNumber = randomNumber ();
    textSwap(".message", "Insert number in the square below");
    textSwap(".reset", "Reset");
})