(function(){

var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");
var sprites = [];
var assetsToLoad = [];

var background = Object.create(spriteObject);
background.x = 0;
background.y = 0;
background.sourceY = 32;
background.sourceWidth = 480;
backgrund.sourceHeight = 320;
sprites.push(background);

var cannon = Object.create(spriteObject);
cannon.x = canvas.width/2 - cannon.width/2;
cannon.y = 280;
sprites.push(cannon);

var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/alienArmada.png";
assetsToLoad.push(image);

var assetsLoaded = 0;

var LOADING = 0;
var PLAYING = 1;
var OVER = 2;
var gameState = LOADING;

var RIGHT = 39;
var LEFT = 37;

var moveRight = false;
var moveLeft = false;


window.addEventListener("keydown", function(event)
{
  switch(event.keyCode)
  {
    case LEFT:
      moveLeft = true;
      break;
    case RIGHT:
      moveRight = true;
  }
}, false);

window.addEventListener("keyup", function(event)
{
  switch(event.keyCode)
  {
    case LEFT:
      moveLeft = false;
      break;

    case RIGHT:
      moveRight = false;
  }
}, false);


update();

function update()
{
  requestAnimationFrame(update, canvas);

  switch(gameState)
  {
  case LOADING:
    console.log("loading...");
    break;
  
  case PLAYING:
    playGame();
    break;

  case OVER:
    endGame();
    break;
  }
  render();
}

}());