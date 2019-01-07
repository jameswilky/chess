const WIDTH = 480;
const HEIGHT = 480;

const N = 8;
const TILE_SIZE = board.height / N; // 60

//Used for drawing
function drawRect(x, y, color) {
  board_ctx.beginPath();
  board_ctx.rect(x, y, TILE_SIZE, TILE_SIZE);
  board_ctx.fillStyle = color;
  board_ctx.fill();
  board_ctx.closePath();
}