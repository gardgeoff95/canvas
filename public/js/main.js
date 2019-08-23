const scale = 1;
const width = 85;
const height = 85;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const idle = 0;
const facingDown = 1;
const facingUp = 2;
const facingLeft = 3;
const facingRight = 4;
const frameLimit = 12;
const movementSpeed = 5;

let cycleLoop = [0, 1, 2, 3, 4];
let cycleLoop6 = [0, 1, 2, 3, 4, 5];
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let currentLoopIndex = 0;
let frameCount = 0;
let currentDirection = facingDown;
let positionX = 0;
let positionY = 0;
let img = new Image();

canvas.width = 500;
canvas.height = 500;


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

}
function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight)

};
loadImage();



function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let hasMoved = false;

    if (keyPresses.w) {
        moveCharacter(0, -movementSpeed, facingUp);
        hasMoved = true;
    } else if (keyPresses.s) {
        moveCharacter(0, movementSpeed, facingDown);
        hasMoved = true;
    } else if (keyPresses.a) {
        moveCharacter(-movementSpeed, 0, facingRight);
        hasMoved = true;
    } else if (keyPresses.d) {
        moveCharacter(movementSpeed, 0, facingLeft);
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
        console.log(currentDirection);
    
        // moveCharacter(0, 0, idle);
    }

    drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);
    window.requestAnimationFrame(gameLoop);
}


function moveCharacter(deltaX, deltaY, direction) {
    if (positionX + deltaX > 0 && positionX + scaledWidth + deltaX < canvas.width) {
        positionX += deltaX;

    }
    if (positionY + deltaY > 0 && positionY + scaledHeight + deltaY < canvas.height){
        positionY += deltaY;
    }


    currentDirection = direction;
}