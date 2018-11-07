const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const height = 480 // Height in pixels
const width = height
const n_rows = 8;
const block_size = height / n_rows; //60

let i, j, x, y = 0;

let prev_color = "black";

for (i = 1; i < n_rows + 1; i++) {
  y = block_size * i;
  for (j = 1; j < n_rows + 1; j++) {
    x = block_size * j;

    ctx.beginPath();
    ctx.rect(x, y, block_size, block_size);

    if (prev_color == "black") {
      prev_color, ctx.fillStyle = "white";
    }
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
