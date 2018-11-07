const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const height = 480 // Height in pixels
const width = height
const n_rows = 8;
const block_size = height / n_rows;

let i, j, x, y = 0;

for (i = 0; i < size; i++) {
  y = ;
  for (j = 0; j < size; j++) {
    ctx.beginPath();
    ctx.rect(x, y, 60, 60);
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
