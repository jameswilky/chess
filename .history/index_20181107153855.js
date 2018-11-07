const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const height = 480 // Height in pixels
const width = height
const n_rows = 8;
const block_size = height / n_rows; //60

let i, j, x, y = 0;
let prev_color;


// Initialize grid
for (i = 0; i < n_rows; i++) {
  y = block_size * i;
  if (i % 2 == 0) { //If even, start with a black grid
    prev_color = "#ffcf7c";
  }
  else { //If odd, start with a #ffcf7c grid
    prev_color = "black";
  }
  console.log(prev_color, i, j);

  for (j = 0; j < n_rows; j++) {
    x = block_size * j;

    ctx.beginPath();
    ctx.rect(x, y, block_size, block_size);

    if (prev_color == "black") { //If last block black, make this block #ffcf7c
      prev_color = "#ffcf7c";
      ctx.fillStyle = "#ffcf7c";
    }
    else if (prev_color == "#ffcf7c") { //If last block #ffcf7c, make this block black
      prev_color = "black";
      ctx.fillStyle = "black";
    }

    ctx.fill();
    ctx.closePath();
  }
}

