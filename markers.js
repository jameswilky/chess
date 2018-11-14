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