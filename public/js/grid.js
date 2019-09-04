const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
scale = 2;
const tileWidth = 32 * scale;
const tileHeight = 32 * scale;
const bTiles = new Image();
const charSprite = new Image();

let frameLimit = 5;
let frameCount = 0;
let directionIdle = 0;
let directionLeft = 1;
let directionRight = 2;
let directionDown = 3;
let directionUp = 4;

let character = {
  moveLoopIndex: 0,
  animationLoop: [0, 1, 2, 3],
  direction: directionRight,
  row: 5,
  col: 5,
  speed: 10,
  x: 4,
  y: 32
};

let maps = {
  mapOne: [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 2],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
    [3, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 4],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
  ]
};

canvas.width = tileWidth * maps.mapOne[0].length;
canvas.height = tileHeight * maps.mapOne.length;
function loadImage() {
  bTiles.src = "/images/woodTilesetGrid.png";
  bTiles.onload = () => {
    window.requestAnimationFrame(gameLoop);
  };
  charSprite.src = "/images/character.png";
  bTiles.onload = () => {
    window.requestAnimationFrame(gameLoop);
  };
}

let keyPresses = {};
window.addEventListener("keydown", keyDownListener, false);
function keyDownListener(event) {
  keyPresses[event.key] = true;
}
window.addEventListener("keyup", keyUpListener, false);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}
loadImage();
//0 = background 1 = corner 2 = edge

function draw(sx, sy, x, y) {
  ctx.drawImage(
    bTiles,
    sx * 32,
    sy * 32,
    32,
    32,
    x * tileWidth,
    y * tileHeight,
    tileWidth,
    tileHeight
  );
}
function drawChar(image, frameX, frameY, cx, cy) {
  ctx.drawImage(
    image,
    frameX * 32,
    frameY * 32,
    32,
    32,
    cx,
    cy,
    tileWidth,
    tileHeight
  );
}

function renderStage() {
  for (var y = 0; y < maps.mapOne.length; y++) {
    for (var x = 0; x < maps.mapOne[y].length; x++) {
      switch (maps.mapOne[y][x]) {
        case 0:
          draw(1, 1, x, y);
          break;
        case 1:
          draw(0, 0, x, y);
          break;
        case 2:
          draw(2, 0, x, y);
          break;
        case 3:
          draw(0, 2, x, y);
          break;
        case 4:
          draw(2, 2, x, y);
          break;
        case 5:
          draw(0, 1, x, y);
          break;
        case 6:
          draw(1, 0, x, y);
          break;
        case 7:
          draw(2, 1, x, y);
          break;
        case 8:
          draw(1, 2, x, y);
          break;

        default:
          ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
          ctx.stroke();
      }
    }
  }
}
console.log
function gameLoop() {
  frameCount++;
  if (frameCount < frameLimit) {
    window.requestAnimationFrame(gameLoop);
    return;
  }
  frameCount = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderStage();

  


  let hasMoved = false;
  if (keyPresses.w) {

    character.direction = directionUp;
    character.animationLoop = [0, 1, 2, 3];
    hasMoved = true;
    moveCharacter("up")
  } else if (keyPresses.s) {
  
    character.direction = directionDown;
    character.animationLoop = [0, 1, 2, 3];
    hasMoved = true;
    moveCharacter("down")
  } else if (keyPresses.a) {
 
    character.direction = directionLeft;
    character.animationLoop = [0, 1, 2, 3];
    hasMoved = true;
    moveCharacter("left")

  } else if (keyPresses.d) {
   
    character.direction = directionRight;
    character.animationLoop = [0, 1, 2, 3];
    hasMoved = true;
    moveCharacter("right")
  }

  if (hasMoved) {
    
    frameCount++;
    if (frameCount >= frameLimit) {
      frameCount = 0;
      character.moveLoopIndex++;
      if (character.moveLoopIndex >= character.animationLoop.length) {
        character.moveLoopIndex = 0;
      }
    }
  }

  if (!hasMoved) {
    
    character.direction = 0;
    character.animationLoop = [0, 1, 2, 3, 4, 5, 6, 7];
  }
  drawChar(
    charSprite,
    character.animationLoop[character.moveLoopIndex],
    character.direction,
    character.x,
    character.y
  );
  character.moveLoopIndex++;
  if (character.moveLoopIndex >= character.animationLoop.length) {
    character.moveLoopIndex = 0;
  }

  window.requestAnimationFrame(gameLoop);
}
function moveCharacter(direction){

  if(direction === "left") {
    character.x -= character.speed;
    character.row -= character.speed / 10;
    console.log(character.row)
  } else if (direction === "right") {
    character.x += character.speed;
  } else if (direction === "up") {
    character.y -= character.speed;
  } else if (direction === "down") {
    character.y += character.speed;
  }

 
  // if (direction === "left" && maps.mapOne[character.col][character.row -1] <=8) {
  //   character.row -= 1;
  // } else if (direction === "right" && maps.mapOne[character.col][character.row +1] <= 8) {
  //   character.row += 1;
  // } else if (direction === "down" && maps.mapOne[character.col +1][character.row] !=-1) {
  //   character.col +=1;
  //  } else if (direction === "up" && maps.mapOne[character.col - 1][character.row] != -1) {
  //   console.log("hello?")
  //   character.col -=1;
  // }

}