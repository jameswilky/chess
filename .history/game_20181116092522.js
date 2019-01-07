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
  // { tile: 8, type: "pawn", row: 1, col: 0, faction: "black" },
  // { tile: 9, type: "pawn", row: 1, col: 1, faction: "black" },
  // { tile: 10, type: "pawn", row: 1, col: 2, faction: "black" },
  // { tile: 11, type: "pawn", row: 1, col: 3, faction: "black" },
  // { tile: 12, type: "pawn", row: 1, col: 4, faction: "black" },
  // { tile: 13, type: "pawn", row: 1, col: 5, faction: "black" },
  // { tile: 14, type: "pawn", row: 1, col: 6, faction: "black" },
  // { tile: 15, type: "pawn", row: 1, col: 7, faction: "black" },

  // { tile: 48, type: "pawn", row: 6, col: 0, faction: "white" },
  // { tile: 49, type: "pawn", row: 6, col: 1, faction: "white" },
  // { tile: 50, type: "pawn", row: 6, col: 2, faction: "white" },
  // { tile: 51, type: "pawn", row: 6, col: 3, faction: "white" },
  // { tile: 52, type: "pawn", row: 6, col: 4, faction: "white" },
  // { tile: 53, type: "pawn", row: 6, col: 5, faction: "white" },
  // { tile: 54, type: "pawn", row: 6, col: 6, faction: "white" },
  // { tile: 55, type: "pawn", row: 6, col: 7, faction: "white" },
  { tile: 56, type: "rook", row: 7, col: 0, faction: "white" },
  { tile: 57, type: "knight", row: 7, col: 1, faction: "white" },
  { tile: 58, type: "bishop", row: 7, col: 2, faction: "white" },
  { tile: 59, type: "king", row: 7, col: 3, faction: "white" },
  { tile: 60, type: "queen", row: 7, col: 4, faction: "white" },
  { tile: 61, type: "bishop", row: 7, col: 5, faction: "white" },
  { tile: 62, type: "knight", row: 7, col: 6, faction: "white" },
  { tile: 63, type: "rook", row: 7, col: 7, faction: "white" },

]

let turn = 0;
let IsWhiteTurn = false;
let IsBlackTurn = false;
let game = true;
let AIOptions = [];


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

function determineAIOptions() {
  let AIOptions = [];
  let i = 0;
  chessmen.forEach(chessman => {
    if (chessman.faction == 'black') {
      chessman.options.forEach(option => {
        let AIOption = {}; //dereference object
        AIOption.row = option.row;
        AIOption.col = option.col;
        if (option.contains) {
          AIOption.points = option.contains.points;
        }
        AIOption.chessman = chessman;
        AIOptions[i] = AIOption;
        i++;
      })
    }
  })
  return AIOptions;

}

function AIMove(options) {
  //let choice = options[Math.floor(Math.random() * options.length)];  //Return a random choice

  let max = options.reduce(function (prev, current) {
    return (prev.points > current.points) ? prev : current,;
  })
  console.log(max);
  choice.chessman.moveTo(choice.col, choice.row)

  //calculate AI
}


//Set up board
initialize_board();
init_chessmen(default_locations);
chessmen.forEach(chessman => {
  chessman.calculate_movement_options();
})
set_turn();
function checkKing() {
  let kings = chessmen.filter(chessman => chessman.isKing == true)
  if (kings.length == 1) {
    alert(kings[0].faction + " Wins!!!")
  }
}

// Listen for movement
document.addEventListener('moved', function (event) {
  //check if king died last turn;
  checkKing();
  set_turn();
  //Calculate new movement positiifons
  chessmen.forEach(chessman => {
    chessman.calculate_movement_options();
  })

  if (IsBlackTurn) {
    //Run black turn AI
    chessmen.forEach(chessman => {
      chessman.calculate_movement_options(); //assign new options
    })
    AIOptions = determineAIOptions();
    AIMove(AIOptions);
  }
}, false);

