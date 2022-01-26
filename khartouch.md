<!-- Mouse-Up-   &&  Mouse-Down- -->

<p>A paragraph with a <button>button</button>.</p>
<script>
  let para = document.querySelector("p");
  let button = document.querySelector("button");
  para.addEventListener("mouseup", () => {
    console.log("Handler for paragraph.");
  });
  button.addEventListener("mousedown", event => {
    console.log("Handler for button.");
    if (event.button == 2) event.stopPropagation();
  });
</script>


<!-- *********************************** -->


<!-- make a dot point when pressing on mouse -->

<style>
  body {
    height: 200px;
    background: beige;
  }
  .dot {
    height: 8px; width: 8px;
    border-radius: 4px; /* rounds corners */
    background: blue;
    position: absolute;
  }
</style>
<script>
  window.addEventListener("click", event => {
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + "px";
    dot.style.top = (event.pageY - 4) + "px";
    document.body.appendChild(dot);
  });
</script>

<!-- *************************************** -->

<script>


function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.innerText = (c + 1);
    container.appendChild(cell).className = "grid-item";
  };
};

makeRows(16, 16);
</script>



*********************** Canvas js **************************

<script>
const cnv = document.createElement('canvas');

cnv.classList.add('grid');
cnv.style.cssText = 'width: 500px; height: 500px; border: 5px solid black;';

let ctx = cnv.getContext('2d');

for(i = 0; i < 500; i=i+6){
  ctx.moveTo(i,0);
  ctx.lineTo(i,500);

  ctx.moveTo(0,i);
  ctx.lineTo(500,i);

  ctx.strokeStyle = '#f0f0f0';
  ctx.stroke();

};

ctx.beginPath();

for(i = 0; i < 500; i=i+30){
  ctx.moveTo(i,0);
  ctx.lineTo(i,500);

  ctx.moveTo(0,i);
  ctx.lineTo(500,i);

  ctx.strokeStyle = '#c0c0c0';
  ctx.stroke();
};

container.appendChild(cnv);


</script>

**********************************************************************



<script>

let gridSize = 24;

function createGrid() {
  // having the grid with each item at 1fr would leave left over space at the end of the grid
  //  when there were lots of items, doing it this way seemed to fill in that extra space.
  // however the grid broke when there were 3 or less items, so the if statment fixes that
  let gridWidth = container.offsetWidth / gridSize;
  container.style.gridTemplateColumns = `repeat(${gridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;
  container.style.gridTemplateRows = `repeat(${gridSize - 3}, ${gridWidth}px) 1fr 1fr 1fr`;
  if (gridSize < 4) {
    container.style.gridTemplateColumns = `repeat(${gridSize},1fr`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr`;
  }

  for (let i = 0; i < gridSize ** 2; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-item');
    square.setAttribute('draggable', 'false');
    square.style.backgroundColor = 'transperent';
    container.appendChild(square);

square.classList.add('border-top-left');
  }
  //add a right border the the right most items
  const rightItems = document.querySelectorAll(`.grid-item:nth-child(${gridSize}n)`);
  for (let i = 0; i < rightItems.length; i++) {
    rightItems[i].setAttribute('data-right', 'true');
    rightItems[i].classList.toggle('border-right');
  }

  // add a bottom border to the bottom most items
  let gridItems = document.querySelectorAll('.grid-item');
  const lastItems = Array.from(gridItems).slice(-`${gridSize}`);
  for (let i = 0; i < lastItems.length; i++) {
    lastItems[i].setAttribute('data-bottom', 'true');
    lastItems[i].classList.toggle('border-bottom');
  }
}




function rangeSlider(value) {
  let gridLabels = document.querySelectorAll('#range-value');
  progressBar.style.width = (value / 60) * 100 + '%';
  for (let i = 0; i < gridLabels.length; i++) {
    gridLabels[i].textContent = value;
  }
  // document.querySelectorAll('#range-value').textContent = value;
  gridSize = parseInt(value);
  deleteGrid();
  createGrid();
  listen();
  reInit();
  // turn the grid button back on if it is off.
  const gridButton = document.querySelector('#grid-btn');
  if (gridButton.classList.contains('btn-on')) {
    //pass
  } else {
    gridButton.classList.toggle('btn-on');
  }
}


function getAdjacent1D(x, gridX, gridY) {
  let xAbove = null;
  let xBellow = null;
  let xLeft = null;
  let xRight = null;

  // make sure x is not in the top row before returning the cell above
  if (gridX != 0) {
    xAbove = [x - gridSize];
  }
  // make sure x is not in the bottom row before returning the cell bellow
  if (gridX != gridSize - 1) {
    xBellow = [x + gridSize];
  }
  // make sure x is not in the left column before returning the cell to its left
  if (gridY != 0) {
    xLeft = [x - 1];
  }
  // make sure x is not in the right column before returning the cell to its right
  if (gridY != gridSize - 1) {
    xRight = [x + 1];
  }

  // console.log(xAbove, xBellow, xLeft, xRight);
  return [xAbove, xBellow, xLeft, xRight];
}


function colorFill(e) {
  if (fill) {
    //get index of the clicked grid cell
    let ogIndex = Array.from(e.target.parentElement.children).indexOf(e.target);
    // console.log(ogIndex);

    // create a list of items to color
    let toFill = [ogIndex];
    let addedToFill = 1;

    gridItems = document.querySelectorAll('.grid-item');
    let gridItemsArray = Array.from(gridItems);
    // console.log(gridItemsArray.length);

    // create grid-like representation of grid items
    let gridItemsArray2D = toMatrix(gridItemsArray, gridSize);
    // console.log(gridItemsArray2D);

    // get index of clicked item in 2d array
    let gridX = Math.floor(ogIndex / gridSize);
    let gridY = ogIndex % gridSize;
    // console.log(gridX);
    // console.log(gridY);

    // console.log(getAdjacent2D(gridX, gridY));

    // console.log(getAdjacent1D(ogIndex, gridX, gridY));

    // toFill=[12, 13, 11, 17, 7, 2, 6, 8, 22, 16, 18, 10, 14];
    while (addedToFill != 0) {
      let toCheck = toFill.slice(-addedToFill);
      // toCheck = [2, 6, 8, 22, 16, 18, 10, 14];
      let addedItems = [];
      // console.log(toCheck);
      addedToFill = 0;
      for (let j = 0; j < toCheck.length; j++) {
        // console.log(toCheck[j]);
        let toAdd = getAdjacent1D(toCheck[j], gridX, gridY);
        // console.log(toAdd);
        for (let i = 0; i < toAdd.length; i++) {
          if (toAdd[i] != null) {
            if (!toFill.includes(toAdd[i][0])) {
              // for some reason it was adding items above the top line
              // and bellow the bottom line, i couldnt work it out so
              // added this if. It would also add string numbers if i changed
              // the grid size with the slider
              if (
                toAdd[i][0] >= 0 &&
                toAdd[i][0] < gridSize ** 2 &&
                typeof toAdd[i][0] == 'number'
              ) {
                // only color in the surounding items if they are the same color as the selected item
                if (
                  e.target.parentElement.children[toAdd[i][0]].style.backgroundColor ==
                  e.target.style.backgroundColor
                ) {
                  toFill.push(toAdd[i][0]);
                  addedItems.push(toAdd[i][0]);
                }
              }
            }
          }
        }
      }
      addedToFill = addedItems.length;
      // console.log(addedItems.length);
      // console.log(addedItems);
    }

    // console.log(toFill);
  }
};



</script>















// listen for events
function listen() {
  gridItems = document.querySelectorAll(".grid-item");
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("mousedown", drawClick);
    // listen for a mouse over and change colour only if mouse button is pressed
    gridItems[i].addEventListener("mouseenter", drawClickHover);
  }

  //listen for clicks on all grid items when grab is true (color picker)
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", (e) => {
      if (grab) {
        ink = e.target.style.backgroundColor;
        // if trying to grab the color of the background (transperent cell)
        if (ink == "") {
          colorPicker.value = bgColor;
        } else {
          colorPicker.value = RGBToHex(ink);
        }
        dropper.classList.remove("btn-on");
        grab = false;

        // once color has been grabbed, turn off other buttons so you can draw with the new color without
        // having to toggle the other button manually
        rainbow = false;
        rainbowButton.classList.remove("btn-on");
        shading = false;
        shaderButton.classList.remove("btn-on");
        lighten = false;
        lightenButton.classList.remove("btn-on");
        eraser = false;
        eraserButton.classList.remove("btn-on");
      }
    });
  }

  // listen for clicks on all grid items when fill is true (colour fill)
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", colorFill);
  }

  bgColorPicker.addEventListener("input", (e) => {
    gridItems = document.querySelectorAll(".grid-item");
    bgColor = e.target.value;
    for (let i = 0; i < gridItems.length; i++) {
      if (!gridItems[i].dataset.inked) {
        container.style.backgroundColor = bgColor;
      }
      // carry over shading when the bg color changes
      //set all shaded items to bg color, so that the shading ran be re-applyed to the new bg color

      // dont change the color of shaded inked cells, only background cells that have been shaded
      if (!gridItems[i].dataset.inked) {
        if (gridItems[i].dataset.shade) {
          gridItems[i].style.backgroundColor = bgColor;
          // grab the value of data-shade (the amount of times the cell has been shaded)
          let shadeAmount = parseInt(gridItems[i].getAttribute("data-shade"));
          // multiply the default shading intensity by shadeAmount, then apply this ammount
          //of shading to the cell
          let reshadeValue = shadeAmount * -15;
          gridItems[i].style.backgroundColor = adjust(
            RGBToHex,
            gridItems[i].style.backgroundColor,
            reshadeValue
          );
        }
      }
    }
  });

  // toggle grid lines
  const gridButton = document.querySelector("#grid-btn");

  gridButton.addEventListener("click", () => {
    for (i = 0; i < gridItems.length; i++) {
      //toggle top and left cell borders
      gridItems[i].classList.toggle("border-top-left");
      //toggle the remaining right borders
      if (gridItems[i].dataset.right) {
        gridItems[i].classList.toggle("border-right");
      }
      // toggle the remaining bottom borders
      if (gridItems[i].dataset.bottom) {
        gridItems[i].classList.toggle("border-bottom");
      }
    }
  });
}



<!-- ************************************** -->

<script>
const sizeSlider = document.getElementById('sizeSlider')

clearBtn.onclick = () => reloadGrid()



sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)


// ************** functions //*****************

function changeSize(value) {

  sizeValue.innerHTML = `${value} x ${value}`
  grid.innerHTML = ''
  grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${value}, 1fr)`

  for (let i = 0; i < value * value; i++) {
    const gridElement = document.createElement('div')
    gridElement.addEventListener('mouseover', changeColor)
    grid.appendChild(gridElement)
  }
}



function changeColor(e) {
  if (currentMode === 'rainbow') {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#fefefe'
  }
}



</script>