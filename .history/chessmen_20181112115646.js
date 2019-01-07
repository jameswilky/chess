let chessmen = []; // Hold living chest piece objects

function calculate_movement_options(options, row, col, type, faction) {
  //This function is used to determine the coordinates of each possible move for a selected tile
  let j = 0;
  let i = 0; //used to iterate through list of options
  //console.log(type, faction, row, col)

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

  if (type == "pawn") {
    if (faction == "black") {
      check_tile(row + 1, col);
    }
    if (faction == "white") {
      check_tile(row - 1, col);
    }
  }
  if (type == "rook") {
    for (j = 0; j < N; j++) {// South
      if (check_tile(row + j + 1, col) == true) break
    }
    for (j = 0; j < N; j++) {// East
      if (check_tile(row, col + j + 1) == true) break
    }
    for (j = 0; j < N; j++) {// North
      if (check_tile(row - j - 1, col) == true) break
    }
    for (j = 0; j < N; j++) {// West
      if (check_tile(row, col - j - 1) == true) break
    }
  }
  if (type == "bishop") {
    for (j = 0; j < N; j++) { // South East
      if (check_tile(row + 1 + j, col + 1 + j) == true) break
    }
    for (j = 0; j < N; j++) { // South West
      if (check_tile(row + 1 + j, col - 1 - j) == true) break
    }
    for (j = 0; j < N; j++) { // North East
      if (check_tile(row - 1 - j, col + 1 + j) == true) break
    }
    for (j = 0; j < N; j++) { // North west
      if (check_tile(row - 1 - j, col - 1 - j) == true) break
    }
  }
  if (type == "queen") {
    for (j = 0; j < N; j++) { // South East
      if (check_tile(row + 1 + j, col + 1 + j) == true) break
    }
    for (j = 0; j < N; j++) { // South West
      if (check_tile(row + 1 + j, col - 1 - j) == true) break
    }
    for (j = 0; j < N; j++) { // North East
      if (check_tile(row - 1 - j, col + 1 + j) == true) break
    }
    for (j = 0; j < N; j++) { // North west
      if (check_tile(row - 1 - j, col - 1 - j) == true) break
    }
    for (j = 0; j < N; j++) {// South
      if (check_tile(row + j + 1, col) == true) break
    }
    for (j = 0; j < N; j++) {// East
      if (check_tile(row, col + j + 1) == true) break
    }
    for (j = 0; j < N; j++) {// North
      if (check_tile(row - j - 1, col) == true) break
    }
    for (j = 0; j < N; j++) {// West
      if (check_tile(row, col - j - 1) == true) break
    }
  }
  if (type == "king") {
    check_tile(row + 1, col + 1) //South East
    check_tile(row + 1, col - 1) //South West
    check_tile(row - 1, col + 1) // North East
    check_tile(row - 1, col - 1) //North West
    check_tile(row + 1, col) //south
    check_tile(row, col + 1) //east
    check_tile(row - 1, col) //north
    check_tile(row, col - 1) //west

  }
  if (type == "knight") {
    // Check each tile in clockwise order
    check_tile(row - 2, col + 1)
    check_tile(row - 1, col + 2)
    check_tile(row + 1, col + 2)
    check_tile(row + 2, col + 1)
    check_tile(row + 2, col - 1)
    check_tile(row + 1, col - 2)
    check_tile(row - 1, col - 2)
    check_tile(row - 2, col - 1)
  }

  return options //return array of options containing locations to highlight


}

// Populate list of current chess pieces
function init_chessmen(items) {
  for (let id = 0; id < items.length; id++) {
    chessmen[id] = new Chessman(id, items[id].type, items[id].row, items[id].col, items[id].faction);
    chessmen[id].render();
  }
}

function contains_chessman(coord, piece) {
  if ((coord.x == piece.col) && (coord.y == piece.row)) {
    return true;
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
      chessmen_ctx.drawImage(img, x, y);
    }
    img.src = this.sprite;
  }
  this.show_movement_options = function () {
    this.options.forEach(option => {
      //Represent each available movement option with a highlighted tile
      drawRect(markers_ctx, (option.col * TILE_SIZE), (option.row * TILE_SIZE), "blue");
    })
  }
  this.clear_movement_options = function () {
    this.options.forEach(option => {
      let color = determine_previous_color(option.row, option.col);
      drawRect(markers_ctx, (option.col * TILE_SIZE), (option.row * TILE_SIZE), color);
      markers_ctx.clearRect((option.col * TILE_SIZE), (option.row * TILE_SIZE), TILE_SIZE, TILE_SIZE);
    })

  }
  this.selected = false;
  this.hovered = false;
}

//refactor
// chessmen_layer.addEventListener('click', (e) => {
//   //
//   let pos = {
//     //Turn a graphic based x,y position into a logical one on an 8*8 grid
//     x: Math.trunc(e.clientX / TILE_SIZE),
//     y: Math.trunc(e.clientY / TILE_SIZE)
//   };
//   console.log(e.clientX, e.clientY);
//   //Check all chessmen and check if clicked location matches a chessman location
//   for (i = 0; i < chessmen.length; i++) {
//     if (contains_chessman(pos, chessmen[i].position.logical)) {
//       //If true, select that chessman
//       chessmen[i].selected = true;
//     }
//     else {
//       //Otherwise, that chessman was not selected
//       chessmen[i].selected = false;
//     }
//   }
//   //Check all chessmen to find if one was selected
//   // update_chessmen();

// })