const chessmen_layer = document.getElementById("chessmen_layer");
const chessmen_ctx = chessmen_ctx.getContext("2d");

chessmen_layer.height = HEIGHT;
chessmen_layer.width = WIDTH;


let chessmen = []; // Hold living chest piece objects

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
      chessmen_ctx.drawImage(img, x, y);
    }
    img.src = this.sprite;
  }
  this.show_movement_options = function () {
    this.options = calculate_movement_options(this.options, this.position.logical.row, this.position.logical.col, this.type, this.faction);
    this.options.forEach(option => {
      //Represent each available movement option with a highlighted tile
      drawRect(chessmen_ctx, (option.col * TILE_SIZE), (option.row * TILE_SIZE), "blue");
    })
  }
  this.clear_movement_options = function () {
    this.options.forEach(option => {
      let color = determine_previous_color(option.row, option.col);
      drawRect(chessmen_ctx, (option.col * TILE_SIZE), (option.row * TILE_SIZE), color);
    })
    this.options = [];

  }
  this.selected = false;
  this.hovered = false;
}

//Initialize default locations
let default_locations = [
  { tile: 0, type: "rook", row: 0, col: 0, faction: "black" },
  { tile: 1, type: "knight", row: 0, col: 1, faction: "black" },
  { tile: 2, type: "bishop", row: 0, col: 2, faction: "black" },
  { tile: 3, type: "king", row: 0, col: 3, faction: "black" },
  { tile: 4, type: "queen", row: 0, col: 4, faction: "black" },
  { tile: 5, type: "bishop", row: 0, col: 5, faction: "black" },
  { tile: 6, type: "knight", row: 0, col: 6, faction: "black" },
  { tile: 7, type: "rook", row: 0, col: 7, faction: "black" },
  { tile: 8, type: "pawn", row: 1, col: 0, faction: "black" },
  { tile: 9, type: "pawn", row: 1, col: 1, faction: "black" },
  { tile: 10, type: "pawn", row: 1, col: 2, faction: "black" },
  { tile: 11, type: "pawn", row: 1, col: 3, faction: "black" },
  { tile: 12, type: "pawn", row: 1, col: 4, faction: "black" },
  { tile: 13, type: "pawn", row: 1, col: 5, faction: "black" },
  { tile: 14, type: "pawn", row: 1, col: 6, faction: "black" },
  { tile: 15, type: "pawn", row: 1, col: 7, faction: "black" },

  { tile: 48, type: "pawn", row: 6, col: 0, faction: "white" },
  { tile: 49, type: "pawn", row: 6, col: 1, faction: "white" },
  { tile: 50, type: "pawn", row: 6, col: 2, faction: "white" },
  { tile: 51, type: "pawn", row: 6, col: 3, faction: "white" },
  { tile: 52, type: "pawn", row: 6, col: 4, faction: "white" },
  { tile: 53, type: "pawn", row: 6, col: 5, faction: "white" },
  { tile: 54, type: "pawn", row: 6, col: 6, faction: "white" },
  { tile: 55, type: "pawn", row: 6, col: 7, faction: "white" },
  { tile: 56, type: "rook", row: 7, col: 0, faction: "white" },
  { tile: 57, type: "knight", row: 7, col: 1, faction: "white" },
  { tile: 58, type: "bishop", row: 7, col: 2, faction: "white" },
  { tile: 59, type: "king", row: 7, col: 3, faction: "white" },
  { tile: 60, type: "queen", row: 7, col: 4, faction: "white" },
  { tile: 61, type: "bishop", row: 7, col: 5, faction: "white" },
  { tile: 62, type: "knight", row: 7, col: 6, faction: "white" },
  { tile: 63, type: "rook", row: 7, col: 7, faction: "white" },

]