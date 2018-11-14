const WIDTH = 480;
const HEIGHT = 480;

const N = 8;
const TILE_SIZE = HEIGHT / N; // 60

//Used for drawing
function drawRect(ctx, x, y, color) {
  ctx.beginPath();
  ctx.rect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}