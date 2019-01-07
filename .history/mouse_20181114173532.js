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

chessmen_layer.addEventListener('mousemove', (e) => {
  if (dragOk == false) {
    let pos = {
      //Turn a graphic based x,y position into a logical one on an 8*8 grid
      x: e.clientX,
      y: e.clientY
    };
    //Check all chessmen and check if clicked location matches a chessman location
    for (i = 0; i < chessmen.length; i++) {
      if (coordsMatch(pos, chessmen[i].position.graphical)) {
        //If true, select that chessman
        chessmen[i].hover = true;
      }
      else {
        //Otherwise, that chessman was not selected
        chessmen[i].hover = false;
      }
    }
    render_markers();
  }
})

let dragOk = false;

let selector = document.createElement("img");

chessmen_layer.addEventListener('mousedown', (e) => {
  if (dragOk == false) {
    let pos = {
      //Turn a graphic based x,y position into a logical one on an 8*8 grid
      x: e.clientX,
      y: e.clientY
    };
    //Check all chessmen and check if clicked location matches a chessman location
    for (i = 0; i < chessmen.length; i++) {
      if (coordsMatch(pos, chessmen[i].position.graphical)) {
        //If true, select that chessman
        chessmen[i].selected = true;
        chessmen[i].isDragging = true;
        console.log(chessmen[i]);
        // let shiftX = e.clientX - selector.getBoundingClientRect().left;
        // let shiftY = e.clientY - selector.getBoundingClientRect().top;

        chessmen[i].derender();
        selector.style.position = 'absolute';
        selector.src = chessmen[i].sprite;

        document.body.append(selector);

        moveAt(e.clientX, e.clientY);

        // centers the selector at (pageX, pageY) coordinates
        function moveAt(x, y) {
          selector.style.left = x - TILE_SIZE / 2 + 'px';
          selector.style.top = y - TILE_SIZE / 2 + 'px';
        }

        function onMouseMove(event) {
          moveAt(event.clientX, event.clientY);
        }

        // (3) move the selector on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // (4) drop the selector, remove unneeded handlers
        chessmen_layer.onmouseup = function (upevent) {
          document.removeEventListener('mousemove', onMouseMove);
          //clear selector
          selector.src = ""

          let pos = {
            x: Math.trunc(upevent.clientX / TILE_SIZE),
            y: Math.trunc(upevent.clientY / TILE_SIZE)
          }
          //clear all dragging flags
          dragOk = false;
          chessmen.forEach(chessman => {
            if (chessman.isDragging) {
              console.log(pos.x, pos.y)
              moveChessman(pos.x, pos.y, chessman);
            }
            chessman.isDragging = false;

          })
          chessmen_layer.onmouseup = null;
        };



      }
      else {
        //Otherwise, that chessman was not selected
        chessmen[i].selected = false;
      }
    }

  }
})

selector.ondragstart = function () {
  return false;
};