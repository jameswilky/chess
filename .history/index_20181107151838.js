const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const height = 480 // Height in pixels
const width = height
const n_rows = 8;
const block_size = height / n_rows; //60

let i, j, x, y = 0;

let prev_color = "black";

// Initialize grid
for (i = 0; i < n_rows; i++) {

  y = block_size * i;
  for (j = 0; j < n_rows; j++) {
    x = block_size * j;

    ctx.beginPath();
    console.log(x, y, block_size, block_size);
    ctx.rect(x, y, block_size, block_size);

    if (prev_color == "black") { //If last block black, make this block white
      prev_color = "white";
      ctx.fillStyle = "white";
    }

    else if (prev_color == "white") { //If last block white, make this block black
      prev_color = "black";
      ctx.fillStyle = "black";
    }
    ctx.fill();
    ctx.closePath();
  }
}

