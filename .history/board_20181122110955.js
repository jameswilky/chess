//Define Globals
const N = 8;
const game_div = document.getElementById("game");
const WIDTH = game_div.offsetWidth;
const HEIGHT = game_div.offsetHeight;
const TILE_SIZE = HEIGHT / N; // 60

console.log(WIDTH, HEIGHT)
//Define board canvas
const board = document.getElementById("board");
const board_ctx = board.getContext("2d");
board.width = WIDTH;
board.height = HEIGHT;
const COL1 = "#a87e2b";
const COL2 = "#ffdf9e";
const COL3 = "#635e55";
const COL4 = "#f2e9d7";
const COL5 = "#DDCBA6"


//Define marker layer
const markers = document.getElementById("markers");
const markers_ctx = markers.getContext("2d");
markers.height = HEIGHT;
markers.width = WIDTH;

//Define chessmen layer
const chessmen_layer = document.getElementById("chessmen_layer");
const chessmen_ctx = chessmen_layer.getContext("2d");
chessmen_layer.height = HEIGHT;
chessmen_layer.width = WIDTH;

//Used for drawing
function drawRect(ctx, x, y, color) {
  ctx.beginPath();
  ctx.rect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function initialize_board() {
  // Initialize graphical and logical board
  let i, j, x, y = 0;
  let prev_color;
  for (i = 0; i < N; i++) {
    y = TILE_SIZE * i;
    if (i % 2 == 0) { //If even, start with a black grid
      prev_color = COL2;
    }
    else { //If odd, start with a #ffcf7c grid
      prev_color = COL1;
    }
    for (j = 0; j < N; j++) {
      x = TILE_SIZE * j;

      if (prev_color == COL1) { //If last block black, make this block #ffcf7c
        prev_color = COL2;
      }
      else if (prev_color == COL2) { //If last block #ffcf7c, make this block black
        prev_color = COL1;
      }
      drawRect(board_ctx, x, y, prev_color);

    }
  }
}

