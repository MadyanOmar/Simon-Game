buttons_pressed = [];
buttons_picked = [];
level = 1;
game_over = false;
clicks = 0;
map = new Map();
map.set(0,"green");
map.set(1,"red");
map.set(2,"yellow");
map.set(3,"blue");

$("body").on("keypress", function(event){
  level = 1;
  buttons_pressed = [];
  clicks = 0;
  game_over = false;
  if(event.key==="a")
  {
     StartGame();
  }
});

var buttons = $(".btn");
$(".btn").click(function() {
  for(var i=0; i<map.size;  i++){
    if($(this).attr('id') === map.get(i)){
      buttons_pressed[clicks] = i;
      buttons[i].classList.add("pressed");
      setTimeout(function(){
        buttons[i].classList.remove("pressed");
      },  100);
      clicks++;
      if(CheckButtonPressed(clicks)){
        var audio = new Audio("sounds/" + map.get(i) + ".mp3");
        audio.play();
        if(clicks == level){
          level++;
          buttons_pressed = [];
          clicks = 0;
          StartGame();
        }
      }
      else{
        game_over = true;
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        },  300);
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press any key to Restart");
        }
      break;
    }
  }
});

function StartGame()
{
    if(!game_over){
      $("#level-title").text("Level " + level);
      PickButton(), 100;
    }
}

function PickButton(){
  var button_picked = Math.floor(Math.random() * 4);
  buttons_picked[level-1] = button_picked;
  buttons[button_picked].classList.add("picked");
  setTimeout(function(){
    buttons[button_picked].classList.remove("picked");
  },  300);
}

function CheckButtonPressed(numofbuttonspressed){
  for(var i=0; i<numofbuttonspressed; i++){
    if(buttons_picked[i] != buttons_pressed[i]){
      return false;
    }
  }
  return true;
}
