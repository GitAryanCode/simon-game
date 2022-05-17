// Main Variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
userClickedPattern = [];
 
// Main Function
function nextSequence() {
  // Level Increase
  level++;
  $("h1").text("Level " + level);

  // Random Number Generator
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
 
  // Sound Player
  var audio = new Audio("sounds/"+randomChosenColor+".mp3");
  gamePattern.push(randomChosenColor);
  
  // Start Game Animation
  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  audio.play();
}
 
// Which Button was clicked
$(".btn").click(function(){
  var userChosenColor = this.id;
  animatePress(this);
  var buttonSound = new Audio("sounds/"+userChosenColor+".mp3");
  buttonSound.play();
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
})
 
// Button Animation 
function animatePress(currentColor) {
  $(currentColor).addClass("pressed");
 
  setTimeout(function(){
    $(currentColor).removeClass("pressed");
  },50);
}
 
// Keydown - Start
 
var pressed = false;
var level = 0;
 
$(document).keydown(function(){
  if(!pressed){
    nextSequence();
    pressed = true;
  }
  $("h2").text("");
})
 

// Checking the user's answer to the game pattern
 
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    var count = 0;
    for (var i = 0; i < gamePattern.length; i++) {
      if(gamePattern[i] === userClickedPattern[i]){
        count++;
      }
    }
    if(count === gamePattern.length){
      console.log("success");
      setTimeout(function(){
          nextSequence();
        }, 1000);
    }
  } else {
    console.log("wrong");
      var wrongAudio = new Audio("sounds/wrong.mp3");
      wrongAudio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over");
      $("h2").text("(Press Any Key to Restart)")
      startOver();
  }
}
 
// Start Over - Game End
 
function startOver(){
  level = 0;
  gamePattern = [];
  pressed = false;
}