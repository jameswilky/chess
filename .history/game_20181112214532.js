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
  KC
  { tile: 56, type: "rook", row: 7, col: 0, faction: "white" },
  { tile: 57, type: "knight", row: 7, col: 1, faction: "white" },
  { tile: 58, type: "bishop", row: 7, col: 2, faction: "white" },
  { tile: 59, type: "king", row: 7, col: 3, faction: "white" },
  { tile: 60, type: "queen", row: 7, col: 4, faction: "white" },
  { tile: 61, type: "bishop", row: 7, col: 5, faction: "white" },
  { tile: 62, type: "knight", row: 7, col: 6, faction: "white" },
  { tile: 63, type: "rook", row: 7, col: 7, faction: "white" },

]

init_chessmen(default_locations);

let turn = 0;
let IsWhiteTurn = false;
let IsBlackTurn = false;

function set_turn() {
  if (turn % 2 == 0) {
    IsWhiteTurn = true;
    IsBlackTurn = false;
    console.log("White players turn")
  }
  else {
    IsBlackTurn = true;
    IsWhiteTurn = false;
    console.log("Black players turn")
  }
  turn += 1;
}

chessmen.forEach(chessman => {
  chessman.calculate_movement_options();
})

set_turn();
/*
Draw board
Draw chest pieces
Calculate available movement options


--

set_turn();
 
*/


