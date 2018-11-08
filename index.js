const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.height = 480;
canvas.width = 480;

const n_rows = 8;
const block_size = canvas.height / n_rows; //60
const chessman_size = 20;

let i, j, x, y = 0;
let prev_color;
let primary_color = "#a87e2b";
let secondary_color = "#ffdf9e";



// Initialize grid
for (i = 0; i < n_rows; i++) {
  y = block_size * i;
  if (i % 2 == 0) { //If even, start with a black grid
    prev_color = secondary_color;
  }
  else { //If odd, start with a #ffcf7c grid
    prev_color = primary_color;
  }
  for (j = 0; j < n_rows; j++) {
    x = block_size * j;

    ctx.beginPath();
    ctx.rect(x, y, block_size, block_size);

    if (prev_color == primary_color) { //If last block black, make this block #ffcf7c
      prev_color = secondary_color;
      ctx.fillStyle = secondary_color;
    }
    else if (prev_color == secondary_color) { //If last block #ffcf7c, make this block black
      prev_color = primary_color;
      ctx.fillStyle = primary_color;
    }

    ctx.fill();
    ctx.closePath();
  }
}

//Initialize chest chessmens

//Chpieceest piece constructor
function Chessman(id, type, row, col, faction) {
  this.id = id;
  this.type = type;
  this.position = {
    logical: { row: row, col: col },
    graphical: { //calculate position of chest piece
      x: (col * block_size), y: (row * block_size)
    }
  }
  this.faction = faction;
  this.sprite = "/images/" + type + "_" + faction + ".png";

  this.render = function () {
    //Draws the chest piece
    let img = new Image();
    let x = this.position.graphical.x;
    let y = this.position.graphical.y;
    img.onload = function () {
      //Loads when img.src is called
      ctx.drawImage(img, x, y);
    }
    img.src = this.sprite;
  }
}

let start_locations = [
  { type: "rook", row: 0, col: 0, faction: "black" },
  { type: "knight", row: 0, col: 1, faction: "black" },
  { type: "bishop", row: 0, col: 2, faction: "black" },
  { type: "king", row: 0, col: 3, faction: "black" },
  { type: "queen", row: 0, col: 4, faction: "black" },
  { type: "bishop", row: 0, col: 5, faction: "black" },
  { type: "knight", row: 0, col: 6, faction: "black" },
  { type: "rook", row: 0, col: 7, faction: "black" },
  { type: "pawn", row: 1, col: 0, faction: "black" },
  { type: "pawn", row: 1, col: 1, faction: "black" },
  { type: "pawn", row: 1, col: 2, faction: "black" },
  { type: "pawn", row: 1, col: 3, faction: "black" },
  { type: "pawn", row: 1, col: 4, faction: "black" },
  { type: "pawn", row: 1, col: 5, faction: "black" },
  { type: "pawn", row: 1, col: 6, faction: "black" },
  { type: "pawn", row: 1, col: 7, faction: "black" },

  { type: "rook", row: 7, col: 0, faction: "white" },
  { type: "knight", row: 7, col: 1, faction: "white" },
  { type: "bishop", row: 7, col: 2, faction: "white" },
  { type: "king", row: 7, col: 3, faction: "white" },
  { type: "queen", row: 7, col: 4, faction: "white" },
  { type: "bishop", row: 7, col: 5, faction: "white" },
  { type: "knight", row: 7, col: 6, faction: "white" },
  { type: "rook", row: 7, col: 7, faction: "white" },
  { type: "pawn", row: 6, col: 0, faction: "white" },
  { type: "pawn", row: 6, col: 1, faction: "white" },
  { type: "pawn", row: 6, col: 2, faction: "white" },
  { type: "pawn", row: 6, col: 3, faction: "white" },
  { type: "pawn", row: 6, col: 4, faction: "white" },
  { type: "pawn", row: 6, col: 5, faction: "white" },
  { type: "pawn", row: 6, col: 6, faction: "white" },
  { type: "pawn", row: 6, col: 7, faction: "white" },

]

let chessmen = [];
function setup_chessmen() {
  for (let id = 0; id < start_locations.length; id++) {
    chessmen[id] = new Chessman(id, start_locations[id].type, start_locations[id].row, start_locations[id].col, start_locations[id].faction);
    chessmen[id].render();
  }
}

setup_chessmen();