var gameStarted = false;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  $("body").removeClass("game-over");
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audioButton = new Audio();
  audioButton.src = "sounds/" + name + ".mp3";
  audioButton.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
    $("body").addClass("game-over");
    $("h1").text("Game Over! Press Any Key To Restart");
    var audioWrong = new Audio();
    audioWrong.src = "sounds/wrong.mp3";
    audioWrong.play();
    console.log("wrong");
    startOver();
  }
}

function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

$(".btn").click(function() {
  var userChosenColor = this.id;
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function() {
  if (gameStarted === false) {
    nextSequence();
    gameStarted = true;
    $("h1").text("Level " + level);
  }
});
