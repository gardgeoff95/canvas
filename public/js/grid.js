const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let tileWidth = 32;
let tileHeight = 32;
let tileNumber = 10;

canvas.width = tileWidth * tileNumber;
canvas.height = tileHeight * tileNumber;

let images = {
  
  
}

let maps = {
  mapOne: [
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 1],
  ],
}
function spriteLoader(){
  
}
function renderStage(stage) {
  for (var y = 0; y < tileNumber; y++) {
    for (var x = 0; x < tileNumber; x++) {
      switch (maps.mapOne[y][x]) {
        case (0):
          ctx.fillStyle = "black";
          ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
          ctx.stroke();
          break;
        case (1):
          ctx.fillStyle = "blue";
          ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
          break;
        case (3):


      }
    }
  }

}

function gameLoop() {
  renderStage();
 



}



