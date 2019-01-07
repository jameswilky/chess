let chessmen = []; // Hold living chest piece objects

// Populate list of current chess pieces
function init_chessmen(items) {
  for (let id = 0; id < items.length; id++) {
    chessmen[id] = new Chessman(id, items[id].type, items[id].row, items[id].col, items[id].faction);
    chessmen[id].render(chessmen_ctx);
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
  this.render = function (ctx) {
    //Draws the chest piece
    let img = new Image();

    let x = this.position.graphical.x;
    let y = this.position.graphical.y;

    if (ctx == selector_ctx) {
      x = 0;
      y = 0;
    }
    img.onload = function () {
      //Loads when img.src is called
      ctx.drawImage(img, x, y);
    }
    img.src = this.sprite;
  }
  this.derender = function (ctx) {
    ctx.clearRect(this.position.graphical.x, this.position.graphical.y, TILE_SIZE, TILE_SIZE);
  }
  this.calculate_movement_options = function () {
    //This function is used to determine the coordinates of each possible move for a selected tile
    let j = 0;
    let i = 0; //used to iterate through list of options
    //console.log(type, faction, row, col)
    let r = this.position.logical.row;
    let c = this.position.logical.col;

    let options = this.options;

    function check_tile(row, col) {
      //Checks the status of the board to see if the chessman can move to selected tile

      let option = { faction: faction };
      //Check tile does not exceed bounds of the board
      if (row > 7 || row < 0 || col > 7 || col < 0) {
        return false;
      }

      //Check if target tile contains a chessman of same faction
      let isFriendly = false;
      let isEnemy = false;

      chessmen.forEach(chessman => {
        if (chessman.position.logical.row == row && chessman.position.logical.col == col) { //Check if position is occupied
          if (chessman.faction == faction) {
            isFriendly = true;
          }
          else { //tile is occupied by enemy
            isEnemy = true;
          }
        }
      })

      //if tile does not contain friendly chessmen, or if its an enemy create new option
      if (!isFriendly || isEnemy) {
        option.row = row;
        option.col = col;
        options[i] = option;
        i++;
      }

      return isFriendly || isEnemy;

    }

    if (this.type == "pawn") {
      if (this.faction == "black") {
        check_tile(r + 1, c);
      }
      if (this.faction == "white") {
        check_tile(r - 1, c);
      }
    }
    if (this.type == "rook") {
      for (j = 0; j < N; j++) {// South
        if (check_tile(r + j + 1, c) == true) break
      }
      for (j = 0; j < N; j++) {// East
        if (check_tile(r, c + j + 1) == true) break
      }
      for (j = 0; j < N; j++) {// North
        if (check_tile(r - j - 1, c) == true) break
      }
      for (j = 0; j < N; j++) {// West
        if (check_tile(r, c - j - 1) == true) break
      }
    }
    if (this.type == "bishop") {
      for (j = 0; j < N; j++) { // South East
        if (check_tile(r + 1 + j, c + 1 + j) == true) break
      }
      for (j = 0; j < N; j++) { // South West
        if (check_tile(r + 1 + j, c - 1 - j) == true) break
      }
      for (j = 0; j < N; j++) { // North East
        if (check_tile(r - 1 - j, c + 1 + j) == true) break
      }
      for (j = 0; j < N; j++) { // North west
        if (check_tile(r - 1 - j, c - 1 - j) == true) break
      }
    }
    if (this.type == "queen") {
      for (j = 0; j < N; j++) { // South East
        if (check_tile(r + 1 + j, c + 1 + j) == true) break
      }
      for (j = 0; j < N; j++) { // South West
        if (check_tile(r + 1 + j, c - 1 - j) == true) break
      }
      for (j = 0; j < N; j++) { // North East
        if (check_tile(r - 1 - j, c + 1 + j) == true) break
      }
      for (j = 0; j < N; j++) { // North west
        if (check_tile(r - 1 - j, c - 1 - j) == true) break
      }
      for (j = 0; j < N; j++) {// South
        if (check_tile(r + j + 1, c) == true) break
      }
      for (j = 0; j < N; j++) {// East
        if (check_tile(r, c + j + 1) == true) break
      }
      for (j = 0; j < N; j++) {// North
        if (check_tile(r - j - 1, c) == true) break
      }
      for (j = 0; j < N; j++) {// West
        if (check_tile(r, c - j - 1) == true) break
      }
    }
    if (this.type == "king") {
      check_tile(r + 1, c + 1) //South East
      check_tile(r + 1, c - 1) //South West
      check_tile(r - 1, c + 1) // North East
      check_tile(r - 1, c - 1) //North West
      check_tile(r + 1, c) //south
      check_tile(r, c + 1) //east
      check_tile(r - 1, c) //north
      check_tile(r, c - 1) //west

    }
    if (this.type == "knight") {
      // Check each tile in clockwise order
      check_tile(r - 2, c + 1)
      check_tile(r - 1, c + 2)
      check_tile(r + 1, c + 2)
      check_tile(r + 2, c + 1)
      check_tile(r + 2, c - 1)
      check_tile(r + 1, c - 2)
      check_tile(r - 1, c - 2)
      check_tile(r - 2, c - 1)
    }

    //return array of options containing locations to highlight


  }
  this.show_movement_options = function () {
    this.options.forEach(option => {
      //Represent each available movement option with a highlighted tile
      drawRect(markers_ctx, (option.col * TILE_SIZE), (option.row * TILE_SIZE), "blue");
    })
  }
  this.selected = false;
  this.hover = false;
  this.isDragging = false;
}

// Update location of chest pieces
function render_markers() {
  //Clear all markers
  markers_ctx.clearRect(0, 0, HEIGHT, WIDTH);

  //find chessman that matches mouse location and show movement markers
  chessmen.forEach(chessman => {
    if (chessman.hover == true) {
      chessman.show_movement_options();
    }
  });
}

function moveIsValid(r1, r2, c1, c2, chessman) {
  let valid = false;

  if ((r1 == r2) && (c1 == c2)) {
    // if logical position is the same, no move was made
    console.log("didnt move");
    valid = false;
  }
  chessman.options.forEach(option => {
    if (option.row == r2 && option.col == c2) {
      //todo check faction
      console.log("valid move")
      valid = true;
    }
  })
}
//Update graphical and logical position
function moveChessman(col, row, chessman) {
  if (moveIsValid(chessman.position.logical.row, row, chessman.position.logical.col, col, chessman)) {
    chessman.position.logical.col = col;
    chessman.position.logical.row = row;
    chessman.position.graphical.x = chessman.position.logical.col * TILE_SIZE;
    chessman.position.graphical.y = chessman.position.logical.row * TILE_SIZE;
    chessman.render(chessmen_ctx);
  };

  else {
    console.log("no move made")
  }


}