const board = document.getElementById("board");
const board_ctx = board.getContext("2d");

board.height = HEIGHT + 200;
board.width = WIDTH;

let primary_color = "#a87e2b";
let secondary_color = "#ffdf9e";

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
      drawRect(board_ctx, x, y, prev_color);

    }
  }
}

initialize_board();