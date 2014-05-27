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
background.sourceHeight = 320;
background.width = 480;
background.height = 320;
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
var SPACE = 32;

var missiles = [];
var shoot = false;
var spaceKeyIsDown = false;

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
    case SPACE:
      if(!spaceKeyIsDown)
      {
        shoot = true;
        spaceKeyIsDown = true;
      }
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
    case SPACE:
      spaceKeyIsDown = false;
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

function loadHandler()
{
  assetsLoaded++;
  if(assetsLoaded === assetsToLoad.length)
  {
    image.removeEventListener("load", loadHandler, false);
    gameState = PLAYING;
  }
}

function playGame()
{
  if(moveLeft && !moveRight)
  {
    cannon.vx = -8;
  }
  if(moveRight && !moveLeft)
  {
    cannon.vx = 8;
  }
  if(!moveLeft && !moveRight)
  {
    cannon.vx = 0;
  }

  if(shoot)
  {
    fireMissile();
    shoot = false;
  }
  cannon.x = Math.max(0, Math.min(cannon.x + cannon.vx, canvas.width - cannon.width));

  for(var i = 0; i < missiles.length; i++)
  {
    var missile = missiles[i];
    missile.y += missile.vy;
    if(missile.y < 0 - missile.height)
    {
      removeObject(missile, missiles);
      removeObject(missile, sprites);
      i--;
    }
  }
}

function fireMissile()
{
  var missile = Object.create(spriteObject);
  missile.sourceX = 96;
  missile.sourceWidth = 16;
  missile.sourceHeight = 16;
  missile.width = 16;
  missile.height = 16;

  missile.x = cannon.centerX() - missile.halfWidth();
  missile.y = cannon.y - missile.height;
  missile.vy = -8;

  sprites.push(missile);
  missiles.push(missile);
}

function removeObject(ObjectToRemove, array)
{
  var i = array.indexOf(ObjectToRemove);
  if(i !== -1)
  {
    array.splice(i, 1);
  }
}

function endGame()
{

}

function render()
{
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  if(sprites.length !== 0)
  {
    for(var i = 0; i < sprites.length; i++)
    {
      var sprite = sprites[i];
      drawingSurface.drawImage
      (
        image,
        sprite.sourceX, sprite.sourceY,
        sprite.sourceWidth, sprite.sourceHeight,
        Math.floor(sprite.x), Math.floor(sprite.y),
        sprite.width, sprite.height
      );
    }
  }
}





}());