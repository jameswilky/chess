const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.height = 480;
canvas.width = 480;

const N = 8;
const TILE_SIZE = canvas.height / N; // 60
let primary_color = "#a87e2b";
let secondary_color = "#ffdf9e";

let chessmen = []; // Hold living chest piece objects

//Used for drawing
function drawRect(x, y, color) {
  ctx.beginPath();
  ctx.rect(x, y, TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

//Initialize default locations
let default_locations = [
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

function initialize_board() {
  // Initialize grid
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
//Chest piece constructor
function Chessman(id, type, row, col, faction) {
  this.name = type + "_" + faction + "_" + id;
  this.id = id;
  this.type = type;
  this.position = {
    logical: { col: col, row: row },
    graphical: { //calculate position of chest piece
      x: (col * TILE_SIZE), y: (row * TILE_SIZE)
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
    function calculate_movement_options(options, row, col, type, faction) {
      //This function is used to determine the coordinates of each possible move for a selected tile

      let option = {};
      let j = 0;
      let i = 0; //used to iterate through list of options
      console.log(type, faction, row, col)

      function add_option(row, col) {
        //Used to create a new option and then add that option to the array of options
        option = {};
        option.row = row;
        option.col = col;
        options[i] = option;
        i++;
      }

      //Pawn movement logic
      if (type == "pawn") {
        if (faction == "black") {
          add_option(row + 1, col);
        }
        if (faction == "white") {
          add_option(row - 1, col)

        }
      }

      if (type == "rook") {
        for (j = 0; j < N; j++) {
          add_option(row + j, col);
        }
        for (j = 0; j < N; j++) {
          add_option(row, col + j);
        }
        for (j = 0; j < N; j++) {
          add_option(row - j, col);
        }
        for (j = 0; j < N; j++) {
          add_option(row, col - j);
        }

      }
      console.log(options);
      return options //return array of options containing locations to highlight


    }
    this.options = calculate_movement_options(this.options, this.position.logical.row, this.position.logical.col, this.type, this.faction);
    this.options.forEach(option => {
      //Represent each available movement option with a highlighted tile
      drawRect((option.col * TILE_SIZE), (option.row * TILE_SIZE), "blue");
    })
  }
  this.clear_movement_options = function () {
    function determine_previous_color(row, col) {
      //Determines the previous color of a tile before it was highlighted

      // If row and col are both of the same parity (both even or both odd)
      if (((row % 2 == 0) && (col % 2 == 0)) || ((row % 2 != 0) && (col % 2 != 0))) {
        // Then use primary color
        return primary_color;
      }
      // If row and col are not of the same parity
      else {
        // Then use secondary color
        return secondary_color;
      }
    }
    this.options.forEach(option => {
      let color = determine_previous_color(option.row, option.col);
      drawRect((option.col * TILE_SIZE), (option.row * TILE_SIZE), color);
    })
    this.options = [];

  }
  this.selected = false;
}

function contains_chessman(coord, piece) {
  if ((coord.x == piece.col) && (coord.y == piece.row)) {
    return true;
  }
}

// Populate list of current chess pieces
function init_chessmen() {
  for (let id = 0; id < default_locations.length; id++) {
    chessmen[id] = new Chessman(id, default_locations[id].type, default_locations[id].row, default_locations[id].col, default_locations[id].faction);
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
    else {
      chessman.clear_movement_options();
    }
  });
}

initialize_board();
init_chessmen();

canvas.addEventListener('click', (e) => {
  let pos = {
    //Turn a graphic based x,y position into a logical one on an 8*8 grid
    x: Math.trunc(e.clientX / TILE_SIZE),
    y: Math.trunc(e.clientY / TILE_SIZE)
  };
  //Check all chessmen and check if clicked location matches a chessman location
  for (i = 0; i < chessmen.length; i++) {
    if (contains_chessman(pos, chessmen[i].position.logical)) {
      //If true, select that chessman
      chessmen[i].selected = true;
    }
    else {
      //Otherwise, that chessman was not selected
      chessmen[i].selected = false;
    }
  }
  //Check all chessmen to find if one was selected
  update_chessmen();

})




// //Game Loop
// function update(progress) {
// }
// function draw() {
// }

// function loop(timestamp) {
//   let progress = timestamp - lastRender;

//   update(progress);
//   draw();

//   lastRender = timestamp;
//   window.requestAnimationFrame(loop);
// }

// let lastRender = 0;

// //window.requestAnimationFrame(loop);
