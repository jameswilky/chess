// //Compare two row/col coordinates
// function coordsMatch(coord, piece) {
//   let xmin = piece.x;
//   let xmax = piece.x + TILE_SIZE;

//   let ymin = piece.y;
//   let ymax = piece.y + TILE_SIZE;

//   if (
//     (coord.x >= xmin) &&
//     (coord.x < xmax) &&
//     (coord.y >= ymin) &&
//     (coord.y < ymax)
//   ) {
//     return true
//   }
// }

// chessmen_layer.addEventListener('mousemove', (e) => {
//   if (dragOk == false) {
//     let pos = {
//       //Turn a graphic based x,y position into a logical one on an 8*8 grid
//       x: e.clientX,
//       y: e.clientY
//     };
//     //Check all chessmen and check if clicked location matches a chessman location
//     for (i = 0; i < chessmen.length; i++) {
//       if (coordsMatch(pos, chessmen[i].position.graphical)) {
//         //If true, select that chessman
//         chessmen[i].hover = true;
//       }
//       else {
//         //Otherwise, that chessman was not selected
//         chessmen[i].hover = false;
//       }
//     }
//     render_markers();
//   }
// })

// let dragOk = false;
// let startX;
// let startY;
// //listen for mouse events
// chessmen_layer.onmousedown = myDown;
// selector.onmouseup = myUp;
// selector.onmousemove = myMove;

// function myDown(e) {

//   //tell browser we're handling this mouse event
//   e.preventDefault();
//   e.stopPropagation();

//   let pos = {
//     //Turn a graphic based x,y position into a logical one on an 8*8 grid
//     x: Math.trunc(e.clientX),
//     y: Math.trunc(e.clientY)
//   };
//   dragOk = false;
//   //Check all chessmen and check if clicked location matches a chessman location
//   for (i = 0; i < chessmen.length; i++) {
//     if (coordsMatch(pos, chessmen[i].position.graphical)) {
//       //If true, select that chessman
//       chessmen[i].isDragging = true;
//       dragOk = true;

//       chessmen[i].derender(chessmen_ctx) //clear from chessmen canvas
//       selector.style.top = e.clientY - TILE_SIZE / 2 + "px";
//       selector.style.left = e.clientX - TILE_SIZE / 2 + "px";
//       chessmen[i].render(selector_ctx)//render on selector canvas
//     }
//   }
//   startX = e.clientX;
//   startY = e.clientY;

// }

// function myUp(e) {

//   //tell browser we're handling this mouse event
//   e.preventDefault();
//   e.stopPropagation();

//   let pos = {
//     x: Math.trunc(e.clientX / TILE_SIZE),
//     y: Math.trunc(e.clientY / TILE_SIZE)
//   }

//   //clear selector layer
//   selector_ctx.clearRect(0, 0, TILE_SIZE, TILE_SIZE);

//   //clear all dragging flags
//   dragOk = false;
//   chessmen.forEach(chessman => {
//     if (chessman.isDragging) {
//       moveChessman(pos.x, pos.y, chessman);
//     }
//     chessman.isDragging = false;

//   })
// }

// function myMove(e) {
//   if (dragOk) {
//     //tell browser we're handling this mouse event
//     e.preventDefault();
//     e.stopPropagation();

//     //todo just move selected chess piece canvas
//     let top = parseInt(selector.style.top.replace(/\D/g, '')) + TILE_SIZE / 2; //remove 'px'
//     let left = parseInt(selector.style.left.replace(/\D/g, '')) + TILE_SIZE / 2; //remove 'px'

//     let pos = {
//       x: e.clientX,
//       y: e.clientY
//     }
//     let dpos = {
//       x: pos.x - startX,
//       y: pos.y - startY
//     };

//     //update position
//     top += (dpos.y);
//     left += (dpos.x);

//     //update css
//     selector.style.top = top - TILE_SIZE / 2 + 'px';
//     selector.style.left = left - TILE_SIZE / 2 + 'px';

//     startX = pos.x;
//     startY = pos.y;

//   }
// }

let ball = document.createElement("img");
ball.src = "/images/bishop_black.png"

ball.onmousedown = function (event) {

  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  // ball.style.position = 'absolute';
  // ball.style.zIndex = 1000;
  // document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (3) move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (4) drop the ball, remove unneeded handlers
  ball.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function () {
  return false;
};