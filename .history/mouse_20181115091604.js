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

let dragging = false
chessmen_layer.addEventListener('mousemove', (e) => {
  if (dragging == false) {
    let pos = {
      x: e.clientX,
      y: e.clientY
    };
    //Check all chessmen and check if clicked location matches a chessman location
    for (i = 0; i < chessmen.length; i++) {
      chessmen.forEach(chessman => {
        if (coordsMatch(pos, chessman.position.graphical)) {
          //If true, select that chessman
          chessman.hover = true;
        }
        else {
          //Otherwise, that chessman was not selected
          chessman.hover = false;
        }
      })

    }
    render_markers();
  }
})

let selector = document.createElement("img");

//Click and drag chessmen
chessmen_layer.addEventListener('mousedown', (e) => {
  dragging = true; //stop markers rendering while dragging pieces
  let pos = {
    x: e.clientX,
    y: e.clientY
  }
  //Check all chessmen and check if clicked location matches a chessman location
  chessmen.forEach(chessman => {
    if (coordsMatch(pos, chessman.position.graphical)) {

      //If true, derender chessman from chessman_layer, and redraw on selector layer
      chessman.derender();

      //draw selector
      selector.style.position = 'absolute';
      selector.src = chessman.sprite;
      //selector.style.zIndex = 4;
      document.body.append(selector);

      //center selector at mouse locaiton
      moveAt(pos.x, pos.y);

      function moveAt(x, y) {
        selector.style.left = x - TILE_SIZE / 2 + 'px';
        selector.style.top = y - TILE_SIZE / 2 + 'px';
      }

      function onMouseMove(moveEvent) {
        moveAt(moveEvent.clientX, moveEvent.clientY);
      }

      // selector will follow mouse on movement
      document.addEventListener('mousemove', onMouseMove);


      // drop the selector, remove unneeded handlers
      chessmen_layer.onmouseup = function (upevent) {
        document.removeEventListener('mousemove', onMouseMove);

        //clear selector
        selector.src = ""

        //convert mouse pos to a row/col logical value
        let dest = {
          x: Math.trunc(upevent.clientX / TILE_SIZE),
          y: Math.trunc(upevent.clientY / TILE_SIZE)
        }

        //Update chessman logical location and snap to grid
        moveChessman(dest.x, dest.y, chessman);
        chessmen_layer.onmouseup = null;

        dragging = false; // allow marker rendering to continue

      };
    }
  })
})

selector.ondragstart = function () {
  return false;
};