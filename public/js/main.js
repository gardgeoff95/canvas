const scale = 1.0;
const width = 86;
const height = 85;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const idle = 0;
const facingDown = 1;
const facingUp = 2;
const facingLeft = 3;
const facingRight = 4;
const attackingRight = 0;
const attackingUp = 1;
const attackingDown = 2;
const attackingLeft = 3;
const frameLimit = 12;
const movementSpeed = 2.0;

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let cycleLoop = [0, 1, 2, 3, 4];
let cycleLoop4 = [0, 1, 2, 3];
let attackingLoop = [0, 1, 2];
let currentLoopIndex = 0;
let attackingLoopIndex = 0;
let frameCount = 0;
let currentDirection = facingDown;
let attackingDirection = attackingRight;
let positionX = 0;
let positionY = 0;
let img = new Image();
let attack = new Image();
let chest = new Image();
let backgroundImg = new Image();
canvas.width = 960;
canvas.height = 580;

let Sprite = function (width, height, canvasX, canvasY, image) {
  this.width = width;
  this.height = height;
  this.x = canvasX;
  this.y = canvasY;
  this.img = image;
};
let background = new Sprite(canvas.width, canvas.height, 0, 0, backgroundImg);
let chestObj = new Sprite(50, 50, 200, 200, chest);
let bigChest = new Sprite(100, 100, 350, 400, chest);
ctx.fillRect(positionX + 50, positionY + 35, 45, 35);
ctx.fillRect(positionX + 10, positionY - 15, 60, 50);

let HitBox = function (x, y, width, height) {
  this.x = x;
  this.y = y;
  (this.width = width), (this.height = height);
};

let obstacleArray = [chestObj, bigChest];
//empty object for keypresses that contain booleans
let keyPresses = {};
window.addEventListener("keydown", keyDownListener, false);
function keyDownListener(event) {
  keyPresses[event.key] = true;
}
window.addEventListener("keyup", keyUpListener, false);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}
//function that loads image then calls gameloop once finished loading
function loadImage() {
  img.src = "/images/knight.png";
  img.onload = () => {
    window.requestAnimationFrame(gameLoop);
  };
  attack.src = "/images/attack.png";
  attack.onload = () => {
    window.requestAnimationFrame(gameLoop);
  };
  chest.src = "/images/chest.png";
  chest.onload = () => {
    window.requestAnimationFrame(gameLoop);
  };
  backgroundImg.src = "/images/woodBackground.png";
}

//draws different objects onto the canvas
function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    img,
    frameX * width,
    frameY * height,
    width,
    height,
    canvasX,
    canvasY,
    scaledWidth,
    scaledHeight
  );
}

function drawAttack(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    attack,
    frameX * width,
    frameY * height,
    width,
    height,
    canvasX,
    canvasY,
    scaledWidth,
    scaledHeight
  );
}
function drawObstacle(object) {
  ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
  ctx.stroke();
}

//calling load image to start the app
loadImage();

//The actual game loop called recursively
function gameLoop(currentTime) {
  //clears the canvas every time gameLoop is called
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //draws obstacles to canvas
  drawObstacle(background);
  obstacleArray.forEach(function (obstacle) {
    drawObstacle(obstacle);
  });

  let hitRight = new HitBox(positionX + 50, positionY + 35, 45, 35);
  let hitTop = new HitBox(positionX, positionY, 70, 35);
  let hitLeft = new HitBox(positionX - 20, positionY + 35, 30, 35);
  let hitDown = new HitBox(positionX + 10, positionY + 35, 60, 60);

  function drawHitbox(name) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(name.x, name.y, name.width, name.height);
  }
  //state booleans
  let attacking = false;
  let hasMoved = false;
  //movement detections call different sprite animations
  if (keyPresses.w) {
    cycleLoop = cycleLoop4;
    moveCharacter(0, -movementSpeed, facingUp);
    attackingDirection = attackingDown;
    hasMoved = true;
  } else if (keyPresses.s) {
    cycleLoop = cycleLoop4;
    moveCharacter(0, movementSpeed, facingDown);
    attackingDirection = attackingUp;
    hasMoved = true;
  } else if (keyPresses.a) {
    cycleLoop = cycleLoop;
    moveCharacter(-movementSpeed, 0, facingRight);
    attackingDirection = attackingLeft;
    hasMoved = true;
  } else if (keyPresses.d) {
    cycleLoop = cycleLoop;
    moveCharacter(movementSpeed, 0, facingLeft);
    attackingDirection = attackingRight;
    hasMoved = true;
  }
  if (keyPresses.f) {
    attacking = true;
  }
  //rotates through sprite animations and keeps animations from moving too fast
  if (hasMoved) {
    frameCount++;
    if (frameCount >= frameLimit) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
      }
    }
  }
  //if not moving set to idle animation and reset sprite index
  if (!hasMoved) {
    if (currentDirection === 4 || currentDirection === 3) {
      currentLoopIndex = 0;
    } else {
      moveCharacter(0, 0, idle);
    }
  }
  //same as movement but for attacking
  if (attacking) {
    // drawHitbox(hitRight);
    // drawHitbox(hitTop);
    // drawHitbox(hitLeft);
    // drawHitbox(hitDown);
    collisionBox(chestObj, hitRight, "right");
    collisionBox(chestObj, hitTop, "top");
    collisionBox(chestObj, hitLeft, "left");
    collisionBox(chestObj, hitDown, "down");


    frameCount++;
    drawAttack(
      attackingLoop[attackingLoopIndex],
      attackingDirection,
      positionX,
      positionY
    );
    window.requestAnimationFrame(gameLoop);
    if (frameCount >= frameLimit) {
      console.log(frameCount);
      frameCount = 0;
      attackingLoopIndex++;
      console.log(attackingLoopIndex);
    }
    if (attackingLoopIndex >= attackingLoop.length) {
      attackingLoopIndex = 0;
      window.cancelAnimationFrame(gameLoop);
      attacking = false;
    }
  } else {
    //resets attacking loop, draws character at current position, then recalls the function
    attackingLoopIndex = 0;
    drawFrame(
      cycleLoop[currentLoopIndex],
      currentDirection,
      positionX,
      positionY
    );
    moveObject(chestObj);

    window.requestAnimationFrame(gameLoop);
  }
}

//function for detecting movement and collision with walls / other objects

function moveObject(object) {
  if (object.y < positionY) {
    object.y += 0.5;
  }
  if (object.y > positionY) {
    object.y -= 0.5;
  }
  if (object.x > positionX) {
    object.x -= 0.5;
  }
  if (object.x < positionX) {
    object.x+= 0.5;
  }


}
function moveCharacter(deltaX, deltaY, direction) {
  function collision(object) {
    if (
      object.x + 35 < positionX + width &&
      object.x - 20 + object.width > positionX &&
      object.y + 5 < positionY + height &&
      object.y - 70 + object.height > positionY
    ) {
      console.log("Getting called!");
      colliding = true;
    }
  }
  let colliding = false;

  collision(chestObj);
  collision(bigChest);
  //bump collisions called when running into an object
  if (colliding && currentDirection === 3) {
    positionX -= movementSpeed;
  } else if (colliding && currentDirection === 4) {
    positionX += movementSpeed;
  } else if (colliding && currentDirection === 1) {
    //down
    positionY -= movementSpeed;
  } else if (colliding && currentDirection === 2) {
    //up
    positionY += movementSpeed;
  }

  //movement / wall collision
  if (
    positionX + deltaX > -20 &&
    positionX + scaledWidth + deltaX < canvas.width + 30
  ) {
    positionX += deltaX;
  }
  if (
    positionY + deltaY > -5 &&
    positionY + scaledHeight + deltaY < canvas.height + 10
  ) {
    positionY += deltaY;
  }
  currentDirection = direction;
}
//function for hitbox with sword

function collisionBox(object1, object2, direction) {
  enemyHit = false;


  if (object1.x < object2.x + object2.width &&
    object1.x + object1.width > object2.x &&
    object1.y < object2.y + object2.height &&
    object1.y + object1.height > object2.y) {
    console.log("HELLO!")
    enemyHit = true;
  }
  if (enemyHit) {
    switch (direction) {
      case "right":
        object1.x += 10;
        break;
      case "top":
        object1.y -= 10;
        break;
      case "left":
        object1.x -= 10;
        break;
      case "down":
        object1.y += 10;
    }

  }


}
