const board = document.getElementById("board");
const board_ctx = board.getContext("2d");

board.height = 480;
board.width = 480;

const N = 8;
const TILE_SIZE = board.height / N; // 60
let primary_color = "#a87e2b";
let secondary_color = "#ffdf9e";

//Used for drawing
function drawRect(x, y, color) {
  board_ctx.beginPath();
  board_ctx.rect(x, y, TILE_SIZE, TILE_SIZE);
  board_ctx.fillStyle = color;
  board_ctx.fill();
  board_ctx.closePath();
}

function initialize_board() {
  // Initialize graphical and logical board
  let i, j, x, y = 0;
  let prev_color;
  for (i = 0; i < N; i++) {
    y = TILE_SIZE * i;
    if (i % 2 == 0) { //If even, start with a black grid
      prev_color = secondary_color;
    }
    else { //If odd, start with a #ffcf7c grid
      prev_color = primary_color;
    }
    for (j = 0; j < N; j++) {
      x = TILE_SIZE * j;

      if (prev_color == primary_color) { //If last block black, make this block #ffcf7c
        prev_color = secondary_color;
      }
      else if (prev_color == secondary_color) { //If last block #ffcf7c, make this block black
        prev_color = primary_color;
      }
      drawRect(x, y, prev_color);

    }
  }
}

initialize_board();