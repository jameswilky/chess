const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.height = 480;
canvas.width = 480;

const n_rows = 8;
const tile_size = canvas.height / n_rows; // 60
let primary_color = "#a87e2b";
let secondary_color = "#ffdf9e";

let chessmen = []; // Hold living chest piece objects


function calculate_movement_options(options, row, col, type, faction) {
  let option = {};
  let i = 0; //used to iterate list
  //console.log(type, faction, row, col)

  //Pawn movement logic
  if (type == "pawn") {
    if (faction == "black") {
      option.row = row + 1;
      option.col = col;
      options[i++] = option;
    }
    if (faction == "white") {

    }
  }
  return options

  //return 2d array of possible locations
}
//Used for drawing
function drawRect(x, y, color) {
  ctx.beginPath();
  ctx.rect(x, y, tile_size, tile_size);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

// //Used for clearing movement spaces
// function clearRect(x,y,color) {
//   ctx.
// }
//Initialize default locations
let init_locations = [
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

  { type: "pawn", row: 6, col: 0, faction: "white" },
  { type: "pawn", row: 6, col: 1, faction: "white" },
  { type: "pawn", row: 6, col: 2, faction: "white" },
  { type: "pawn", row: 6, col: 3, faction: "white" },
  { type: "pawn", row: 6, col: 4, faction: "white" },
  { type: "pawn", row: 6, col: 5, faction: "white" },
  { type: "pawn", row: 6, col: 6, faction: "white" },
  { type: "pawn", row: 6, col: 7, faction: "white" },
  { type: "rook", row: 7, col: 0, faction: "white" },
  { type: "knight", row: 7, col: 1, faction: "white" },
  { type: "bishop", row: 7, col: 2, faction: "white" },
  { type: "king", row: 7, col: 3, faction: "white" },
  { type: "queen", row: 7, col: 4, faction: "white" },
  { type: "bishop", row: 7, col: 5, faction: "white" },
  { type: "knight", row: 7, col: 6, faction: "white" },
  { type: "rook", row: 7, col: 7, faction: "white" },

]

function init_board() {
  // Initialize grid
  let i, j, x, y = 0;
  let prev_color;
  for (i = 0; i < n_rows; i++) {
    y = tile_size * i;
    if (i % 2 == 0) { //If even, start with a black grid
      prev_color = secondary_color;
    }
    else { //If odd, start with a #ffcf7c grid
      prev_color = primary_color;
    }
    for (j = 0; j < n_rows; j++) {
      x = tile_size * j;

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
//Chest piece constructor
function Chessman(id, type, row, col, faction) {
  this.name = type + "_" + faction + "_" + id;
  this.id = id;
  this.type = type;
  this.position = {
    logical: { col: col, row: row },
    graphical: { //calculate position of chest piece
      x: (col * tile_size), y: (row * tile_size)
    }
  }
  this.faction = faction;
  this.sprite = "/images/" + type + "_" + faction + ".png";
  this.options = []; // holds objects containing possible locations to move
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
  this.show_movement_options = function () {
    this.options = calculate_movement_options(this.options, this.position.logical.row, this.position.logical.col, this.type, this.faction);
    this.options.forEach(option => {
      //Draw each available movement option
      drawRect((option.col * tile_size), (option.row * tile_size), "blue");
    })
    // calculate_movement_options(this.position.logical.row, this.position.logical.col, this.type, this.faction);
  }
  this.clear_movement_options = function () {
    this.options.forEach(option => {
      console.log(option);
      ctx.clearRect(option.col * tile_size, option.row * tile_size, tile_size, tile_size);
    })
  }
  this.selected = false;
}

function isSelected(coord, piece) {
  if ((coord.x == piece.col) && (coord.y == piece.row)) {
    return true;
  }
}

// Populate list of current chess pieces
function init_chessmen() {
  for (let id = 0; id < init_locations.length; id++) {
    chessmen[id] = new Chessman(id, init_locations[id].type, init_locations[id].row, init_locations[id].col, init_locations[id].faction);
    chessmen[id].render();
  }
}

// Update location of chest pieces
function update_chessmen() {
  chessmen.forEach(chessman => {
    if (chessman.selected == true) {
      //console.log(chessman.name, "row = ", chessman.position.logical.row, "col = ", chessman.position.logical.col)
      chessman.show_movement_options();
      //chessman.clear_movement_options();
    }
  });
}

init_board();
init_chessmen();

canvas.addEventListener('click', (e) => {
  let pos = {
    //Turn a graphic based x,y position into a logical one on an 8*8 grid
    x: Math.trunc(e.clientX / tile_size),
    y: Math.trunc(e.clientY / tile_size)
  };
  for (i = 0; i < chessmen.length; i++) {
    if (isSelected(pos, chessmen[i].position.logical)) {
      chessmen[i].selected = true;
      update_chessmen();
    }
    else {
      chessmen[i].selected = false;
    }
  }

})