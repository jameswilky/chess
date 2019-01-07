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
  this.render = function () {
    //Draws the chest piece
    let img = new Image();
    let x = this.position.graphical.x;
    let y = this.position.graphical.y;

    img.onload = function () {
      //Loads when img.src is called
      chessmen_ctx.beginPath();
      chessmen_ctx.drawImage(img, x, y);
      chessmen_ctx.closePath();
    }
    img.src = this.sprite;
  }
  this.derender = function () {
    chessmen_ctx.beginPath();
    chessmen_ctx.clearRect(this.position.graphical.x, this.position.graphical.y, TILE_SIZE, TILE_SIZE);
    chessmen_ctx.closePath();
  }
  this.calculate_movement_options = function () {
    //This function is used to determine the coordinates of each possible move for a selected tile
    this.options = []; //clear last options
    let j = 0;
    let i = 0; //used to iterate through list of options
    //console.log(type, faction, row, col)
    let r = this.position.logical.row;
    let c = this.position.logical.col;

    let options = this.options;

    function check_tile(row, col, diag, isPawn) {
      //diag is an optional variable for pawn sideways movement logic
      diag = diag || false;
      isPawn = isPawn || false;

      //Checks the status of the board to see if the chessman can move to selected tile

      let option = {}; //edited, used to hold {faction:faction}
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
          option.contains = chessman;
        }
      })

      //pawn logic
      if (diag && isEnemy) {
        option.row = row;
        option.col = col;
        options[i] = option;
        i++;
        console.log('found target')
      }
      if (diag && !isEnemy) {
        return
      }

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
        check_tile(r + 1, c);//south
        check_tile(r + 1, c + 1, true) // south East
        check_tile(r + 1, c - 1, true) //south West
        if (this.nMoves == 0) {
          check_tile(r + 2, c); //Extra move on first turn
        }
      }
      if (this.faction == "white") {
        check_tile(r - 1, c); //north
        check_tile(r - 1, c + 1, true) // North East
        check_tile(r - 1, c - 1, true) //North West
        if (this.nMoves == 0) {
          check_tile(r - 2, c); //Extra move on first turn
        }
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
  this.hover = false;
  this.isKing = false;
  if (this.type == "king") {
    this.isKing = true;
  }

  this.nMoves = 0;
  this.points;
  if (this.type == "king") {
    this.points = 10;
  }
  if (this.type == "queen") {
    this.points = 9;
  }
  if (this.type == "bishop") {
    this.points = 3;
  }
  if (this.type == "knight") {
    this.points = 3;
  }
  if (this.type == "rook") {
    this.points = 5;
  }
  if (this.type == "pawn") {
    this.points = 1;
  }

  //Update graphical and logical position
  this.moveTo = function (col, row) {


    function moveIsValid(r1, r2, c1, c2, options) {
      let valid = false;

      if ((r1 == r2) && (c1 == c2)) {
        // if logical position is the same, no move was made
        valid = false;
      }
      options.forEach(option => {
        if (option.row == r2 && option.col == c2) {
          //todo check faction
          valid = true;
        }
      })
      return valid
    }

    if (moveIsValid(this.position.logical.row, row, this.position.logical.col, col, this.options)) {
      //If valid, Check if enemy chessman has been killed
      //check if desination contains an enemy
      let target = chessmen.find(chessman => {
        return (chessman.position.logical.row == row && chessman.position.logical.col == col)
      })

      // then render at new position and update logical position
      //console.log("Changed position of", chessman, "from row:", chessman.position.logical.row, " col:", chessman.position.logical.col, " to row:", row, "col:", col)

      this.derender(); //De render previous position
      this.position.logical.col = col;
      this.position.logical.row = row;
      this.position.graphical.x = this.position.logical.col * TILE_SIZE;
      this.position.graphical.y = this.position.logical.row * TILE_SIZE;
      this.derender(); //remove any chess pieces
      this.render();

      //If destination contains emeny, remove it from list of active chessmen
      if (target) {
        chessmen.splice(chessmen.indexOf(target), 1);
      }

      this.nMoves++; //used to testing if pawn is moved
      // // trigger movement event
      let event = new CustomEvent('moved');
      document.dispatchEvent(event);
    }
    else {
      //re-render original position
      this.render();
    }
  }
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

