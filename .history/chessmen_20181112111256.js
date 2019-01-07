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
      drawRect((option.col * TILE_SIZE), (option.row * TILE_SIZE), "blue");
    })
  }
  this.clear_movement_options = function () {
    this.options.forEach(option => {
      let color = determine_previous_color(option.row, option.col);
      drawRect((option.col * TILE_SIZE), (option.row * TILE_SIZE), color);
    })
    this.options = [];

  }
  this.selected = false;
}