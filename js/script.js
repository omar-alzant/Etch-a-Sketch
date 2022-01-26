const container = document.querySelector(".container");
const d = document.querySelector('.wrapper');    
const div = document.createElement("div");
const Bdef = document.getElementById("def");
const Brand = document.getElementById("rand");
const Icolor = document.getElementById("gridColor");
const clr = document.getElementById("clear");
const erase = document.getElementById("erase");
const c = document.getElementById("favcolor");
const showVal = document.getElementById("showVal");
const GridVal = document.getElementById("gridV");

// let n =16;

      // **************************************************

      // GridVal.addEventListener("input", () => {
      //   const n = parseInt(GridVal.value);
      //   d.style.gridTemplateColumns = `repeat(${n},auto)`;
      //   d.style.gridTemplateRows = `repeat(${n},auto)`;
      //   container.appendChild(d);
      // });
    

      // **************************************************
      GridVal.onmousemove = (e) => updateSize(e.target.value);
      changeSize(16);

      GridVal.onchange = (e) => changeSize(e.target.value);
      // erase.onclick = () => { div.style.background = `#ffc0cb`; };

// d.style.cssText = `width:${w}px; height:${h}px; border: 5px solid black;`;

// **************************************************

c.addEventListener("input", () => {
  let bcolor = c.value;
  d.style.background = `${bcolor}`;
   container.appendChild(d);
});

// **************************************************

clr.addEventListener("click", () => {
  window.location.reload();
});

// **************************************************

function changeSize(value) {

  d.innerHTML = '';

for (i = 0; i < value; i++) {
  for(j = 0; j < value; j++){
    
  const div = document.createElement("div");
  
  d.style.border = '1px solid blue';
  d.style.width = '650px';
  d.style.height = '650px';
  d.style.gridTemplateColumns = `repeat(${value},auto)`;
  d.style.gridTemplateRows = `repeat(${value},auto)`;

      // **************************************************

      erase.addEventListener("click", () => {
        let bcolor = c.value;
        div.addEventListener("touchmove", () => {
          div.style.background = `#ffc0cb`;
        });
      });
      erase.addEventListener("click", () => {
        let bcolor = c.value;
        div.addEventListener("mouseover", () => {
          div.style.background = `#ffc0cb`;
        });
      });
    
    
          // **************************************************
    
      Icolor.addEventListener("input", () => {
        div.addEventListener("touchmove", () => {
          let gcolor = Icolor.value;
          div.style.cssText = `background-color : ${gcolor};`;
        });
      });
      Icolor.addEventListener("input", () => {
        div.addEventListener("mouseover", () => {
          let gcolor = Icolor.value;
          div.style.cssText = `background-color : ${gcolor};`;
        });
      });
    
          // **************************************************
    
      Bdef.addEventListener("click", () => {
        div.addEventListener("touchmove", () => {
          div.style.cssText = ` background-color : black;`;
        });
      });
    
      Bdef.addEventListener("click", () => {
        div.addEventListener("mouseover", () => {
          div.style.cssText = ` background-color : black;`;
        });
      });
    
          // **************************************************
    
      Brand.addEventListener("click", () => {
        div.addEventListener("mouseover", () => {
          div.style.cssText = ` background-color: ${random_rgba()};`;
        });
      });
    

      Brand.addEventListener("click", () => {
        div.addEventListener("touchmove", () => {
          div.style.cssText = ` background-color: ${random_rgba()};`;
        });
      });
        // **************************************************

      // **************************************************

  d.appendChild(div);
  // container.appendChild(d);
    };
    '<br>'
};

};


// ******************** Functions  ***************************

function updateSize(value){
  showVal.textContent = `${value} x ${value}`;
};

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
}


function updateTextInput(a) {
  showVal.textContent = `${a} x ${a}`;
  return a;
}
