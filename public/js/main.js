const scale = 1;
const width = 86;
const height = 85;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
const idle = 0;
const facingDown = 1;
const facingUp = 2;
const facingLeft = 3;
const facingRight = 4;
const frameLimit = 12;
const movementSpeed = 5.0;
let array = [ 
    [0, 0, 0, 0],
    [1 ,2 ,2 ,2]
]
array[1][0] = 2
array[1][0 + 1] = 1

let characterPos = {
    row: 1,
    col: 2,
}

// let wall = {
//     x = 
// }


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let cycleLoop = [0, 1, 2, 3, 4];
let attackingLoop = [0, 1, 2];
let currentLoopIndex = 0;
let attackingLoopIndex = 0;
let frameCount = 0;
let currentDirection = facingDown;
let positionX = 0;
let positionY = 0;
let img = new Image();
let attack = new Image();

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
        window.requestAnimationFrame(gameLoop);
    }
}
function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight)

};

function drawAttack(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(attack, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);



}

loadImage();


let fps = 0;

function gameLoop(currentTime) {
    setTimeout(function() {
  
    
        let attacking = false;
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
        } else if (keyPresses.f) {
            attacking = true;
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
        if(attacking && currentDirection === 3) {       
            fps = 100;
            currentLoopindex = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawAttack(attackingLoop[attackingLoopIndex], 0, positionX, positionY);
            attackingLoopIndex ++;
            console.log(attackingLoop);
            console.log(attackingLoopIndex);
            if (attackingLoopIndex > attackingLoop.length) {
                attacking = false;         
                attackingLoopIndex = 0;
                drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY)
            }
    
        } else{
            fps = 10;
            
            drawFrame(cycleLoop[currentLoopIndex], currentDirection, positionX, positionY);
        }    
        window.requestAnimationFrame(gameLoop);


    }, fps)


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