const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const height = 480 // Height in pixels
const width = height
const size = 8 //Number of grids in a line


for (let i = 0; i < size; i++) {
  for (let j = 0; j < 8; j++) {
    ctx.beginPath();
    ctx.rect(, 0, 60, 60);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  }
}
ctx.beginPath();
ctx.rect(0, 0, 60, 60);
ctx.fillStyle = "white";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(60, 0, 60, 60);
ctx.fillStyle = "blue";
ctx.fill();
