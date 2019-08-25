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
const attackingRight = 0
const attackingUp = 1
const attackingDown = 2
const attackingLeft = 3


const frameLimit = 12;
const movementSpeed = 5.0;

let mapArray = [
    [0, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
]
let characterObj = {
    col : 0,
    row : 0,

}
console.log(mapArray[0].length)
$(document).keydown(function(e){
    if (e.key === "w") {

    }
}) 

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let cycleLoop = [0, 1, 2, 3, 4];
let cycleLoop4 = [0, 1, 2, 3];
let attackingLoop = [0, 1, 2];
let currentLoopIndex = 0;
let attackingLoopIndex = 0;
let frameCount = 0;
let currentDirection = facingDown;
let attackingDirection = attackingRight
let positionX = 0;
let positionY = 0;
let img = new Image();
let attack = new Image();
let chest = new Image();

canvas.width = 500;
canvas.height = 500;
attacking = false;

let keyPresses = {};


window.addEventListener("keydown", keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true;



};
window.addEventListener("keyup", keyUpListener, false);
function keyUpListener(event) {

    keyPresses[event.key] = false;


}


function loadImage() {
    img.src = "/images/knight.png";
    img.onload = () => {
        window.requestAnimationFrame(gameLoop);
    };
    attack.src = "/images/attack.png";
    attack.onload = () => {
        attacking = false;
        window.requestAnimationFrame(gameLoop);
    };
    chest.src = "/images/chest.png"
    chest.onload = () => {
        window.requestAnimationFrame(gameLoop);
    };
}
function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);

};


function drawAttack(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(attack, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}
function drawChest() {
    ctx.drawImage(chest, 0, 0, 50, 50);
}



loadImage();


let fps = 0;

function gameLoop(currentTime) {
    
    if (frameCount > frameLimit) {
        frameCount = 0;
    }



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawChest();

    let hasMoved = false;


    if (keyPresses.w) {
        cycleLoop = cycleLoop4
        moveCharacter(0, -movementSpeed, facingUp);
        attackingDirection = attackingDown;
        if (keyPresses.f) {
            attacking = true;
        }
        hasMoved = true;
    } else if (keyPresses.s) {
        moveCharacter(0, movementSpeed, facingDown);
        attackingDirection = attackingUp;
        if (keyPresses.f) {
            attacking = true;
        }
        hasMoved = true;
    } else if (keyPresses.a) {
        moveCharacter(-movementSpeed, 0, facingRight);
        attackingDirection = attackingLeft;
        if (keyPresses.f) {
            attacking = true;
        }
        hasMoved = true;

    } else if (keyPresses.d) {
        moveCharacter(movementSpeed, 0, facingLeft);
        attackingDirection = attackingRight;
        if (keyPresses.f) {
            attacking = true;
        }
        hasMoved = true;

    }
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
    if (!hasMoved) {
        if (currentDirection === 4 || currentDirection === 3) {
            currentLoopIndex = 0;
        } else {
            moveCharacter(0, 0, idle);
        }
    }

    if (attacking) {

        frameCount++
        drawAttack(attackingLoop[attackingLoopIndex], attackingDirection, positionX, positionY)
        console.log("do something");
        window.requestAnimationFrame(gameLoop);
        if (frameCount >= frameLimit) {
            console.log(frameCount)
            frameCount = 0;
            attackingLoopIndex++;
            console.log(attackingLoopIndex)
        } if (attackingLoopIndex >= attackingLoop.length) {
            console.log("AYY")
            attackingLoopIndex = 0;
            attacking = false;
            window.cancelAnimationFrame(gameLoop);

        }


    } else {
        fps = 0;
        attackingLoopIndex = 0;
        drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);
        window.requestAnimationFrame(gameLoop);


    }

}
function moveCharacter(deltaX, deltaY, direction) {
    if (positionX + deltaX > -20 && positionX + scaledWidth + deltaX < canvas.width + 30) {
        positionX += deltaX;

    }
    if (positionY + deltaY > -5 && positionY + scaledHeight + deltaY < canvas.height + 10) {
        positionY += deltaY;
    }
    currentDirection = direction;
}