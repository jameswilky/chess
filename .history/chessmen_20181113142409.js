/*TODO, 
change chessman layer to a div which holds all the dynamically drawn 

*/



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

  // //Define canvas that chest piece sits on
  // let canvas = document.createElement('canvas');
  // canvas.id = this.id;
  // canvas.width = TILE_SIZE
  // canvas.height = TILE_SIZE;
  // canvas.style.zIndex = this.id + 3;
  // canvas.style.position = "absolute";
  // canvas.style.left = 0;
  // this.layer = canvas;
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

//Handle marker display when hovering over chest piece
let last_pos = {
  x: -1, //will never be this value
  y: -1
}

//Compare two row/col coordinates
function coordsMatch(coord, piece) {
  let xmin = piece.x;
  let xmax = piece.x + TILE_SIZE;

  let ymin = piece.y;
  let ymax = piece.y + TILE_SIZE;

  if (
    (coord.x >= xmin) &&
    (coord.x < xmax) &&
    (coord.y >= ymin) &&
    (coord.y < ymax)
  ) {
    return true
  }
}

// chessmen_layer.addEventListener('mousemove', (e) => {
//   if (dragOk == false) {
//     let pos = {
//       //Turn a graphic based x,y position into a logical one on an 8*8 grid
//       x: Math.trunc(e.clientX / TILE_SIZE),
//       y: Math.trunc(e.clientY / TILE_SIZE)
//     };

//     //Check If mouse moved and is still on same tile
//     if ((pos.x == last_pos.x) && (pos.y == last_pos.y)) {
//       //if on same tile, reset listener for next mouse movement
//       return
//     }

//     //Check all chessmen and check if clicked location matches a chessman location
//     for (i = 0; i < chessmen.length; i++) {
//       if (coordsMatch(pos, chessmen[i].position.logical)) {
//         //If true, select that chessman
//         chessmen[i].hover = true;
//       }
//       else {
//         //Otherwise, that chessman was not selected
//         chessmen[i].hover = false;
//       }
//     }

//     //update last tile reference
//     last_pos.x = pos.x;
//     last_pos.y = pos.y;

//     render_markers();
//   }



// })

let dragOk = false;
let startX;
let startY;
//listen for mouse events
chessmen_layer.onmousedown = myDown;
selector.onmouseup = myUp;
chessmen_layer.onmousemove = myMove;

function myDown(e) {

  //todo draw new selected chessman canvas - transparent background
  //render the image on to the new canvas
  //clear the image on the main canvas
  //


  //tell browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  let pos = {
    //Turn a graphic based x,y position into a logical one on an 8*8 grid
    x: Math.trunc(e.clientX),
    y: Math.trunc(e.clientY)
  };

  dragOk = false;
  //Check all chessmen and check if clicked location matches a chessman location
  for (i = 0; i < chessmen.length; i++) {
    if (coordsMatch(pos, chessmen[i].position.graphical)) {
      //If true, select that chessman
      chessmen[i].isDragging = true;
      dragOk = true;

      chessmen[i].derender(chessmen_ctx) //clear from chessmen canvas
      selector.style.top = e.clientY - TILE_SIZE / 2 + "px";
      selector.style.left = e.clientX - TILE_SIZE / 2 + "px";
      chessmen[i].render(selector_ctx)//render on selector canvas
    }
  }
  startX = e.clientX;
  startY = e.clientY;

}

function myUp(e) {
  //todo clear slected chessman canvas
  //re render chessman and snap to grid


  //tell browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  //clear selector layer
  selector_ctx.clearRect(0, 0, TILE_SIZE, TILE_SIZE);

  //clear all dragging flags
  dragOk = false;
  //rerender chessmen
  chessmen.forEach(chessman => {
    chessman.isDragging = false;
    chessman.render(chessmen_ctx);

  })
}

function myMove(e) {
  if (dragOk) {
    //tell browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    //todo just move selected chess piece canvas
    console.log(e.clientX, e.clientY);
    let top = parseInt(selector.style.top.replace(/\D/g, '')) + TILE_SIZe / 2; //remove 'px'
    let left = parseInt(selector.style.left.replace(/\D/g, '')) + TILE_SIZE / 2; //remove 'px'

    let pos = {
      x: e.clientX,
      y: e.clientY
    }
    let dpos = {
      x: pos.x - startX,
      y: pos.y - startY
    };

    //update position
    top += (dpos.y);
    left += (dpos.x);

    //update css
    selector.style.top = top - TILE_SIZE / 2 + 'px';
    selector.style.left = left - TILE_SIZE / 2 + 'px';

    startX = pos.x;
    startY = pos.y;

  }
}


