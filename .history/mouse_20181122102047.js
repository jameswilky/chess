let dragging = false;
let selector = document.createElement("img");
;

selector.ondragstart = function () {
  return false;
};

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

//Listen for when we hover over a chest piece, then draw the movement options
chessmen_layer.addEventListener('mousemove', (e) => {
  if (dragging == false) {
    let pos = {
      x: e.clientX - Math.floor((document.body.clientWidth - WIDTH) / 2),
      y: e.clientY - Math.floor((document.body.clientHeight - HEIGHT) / 2)
    }
    console.log(pos.x, pos.y)
    //Check all chessmen and check if clicked location matches a chessman location
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
    render_markers();
  }
})

//Click and drag chessmen
chessmen_layer.addEventListener('mousedown', (e) => {

  dragging = true; //stop markers rendering while dragging pieces
  let pos = {
    x: e.clientX - Math.floor((document.body.clientWidth - WIDTH) / 2),
    y: e.clientY - Math.floor((document.body.clientHeight - HEIGHT) / 2)
  }

  //Check all chessmen and check if clicked location matches a chessman location
  chessmen.forEach(chessman => {
    if (coordsMatch(pos, chessman.position.graphical)) {
      if (chessman.faction == "black") {
        dragging = false;
        return
      }
      //If true, derender chessman from chessman_layer, and redraw on selector layer
      chessman.derender();

      //draw selector
      selector.style.position = 'absolute';
      selector.src = chessman.sprite;
      selector.id = 'selector';
      document.body.append(selector);

      //center selector at mouse locaiton
      moveAt(pos.x, pos.y);

      function moveAt(x, y) {
        selector.style.left = x - TILE_SIZE / 2 + 'px';
        selector.style.top = y - TILE_SIZE / 2 + 'px';
      }

      function onMouseMove(moveEvent) {
        let x = e.clientX - Math.floor((document.body.clientWidth - WIDTH) / 2);
        let y = e.clientY - Math.floor((document.body.clientHeight - HEIGHT) / 2);
        moveAt(moveEvent.x, moveEvent.y);
      }

      // selector will follow mouse on movement
      document.addEventListener('mousemove', onMouseMove);


      // drop the selector, remove unneeded handlers
      chessmen_layer.onmouseup = function (upevent) {
        document.removeEventListener('mousemove', onMouseMove);

        //clear selector
        selector.src = ""

        //get offset
        let x = e.clientX - Math.floor((document.body.clientWidth - WIDTH) / 2);
        let y = e.clientY - Math.floor((document.body.clientHeight - HEIGHT) / 2);
        //convert mouse pos to a row/col logical value
        let dest = {
          x: Math.trunc(x / TILE_SIZE),
          y: Math.trunc(y / TILE_SIZE)
        }

        //console.log("Event 1")
        dragging = false; // allow marker rendering to continue
        chessmen_layer.onmouseup = null;
        //Update chessman logical location and snap to grid
        chessman.moveTo(dest.x, dest.y)
      };
    }
  })
})


