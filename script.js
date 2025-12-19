let selectTool;
let vw, vh;
let sizes, strokes;
let count = 0;
let isDrawing = false;

let toolbar = document.getElementById("toolbar");
let colours;

let hues = 0;
let customColor = [0, 255, 255];

function setup() {
  vw = window.visualViewport.width;
  vh = window.visualViewport.height;

  let canvas = createCanvas(vw, vh);
  canvas.style("display", "block");
  background(0);
  rectMode(CENTER);

  sizes = createSlider(10, 200, 70);
  sizes.addClass("sizes");
  sizes.parent("sizebar");

  strokes = createSlider(1, 100, 1);
  strokes.addClass("strokes");
  strokes.parent("strokebar");

  sizes.elt.addEventListener("mousedown", (e) => e.stopPropagation());
  strokes.elt.addEventListener("mousedown", (e) => e.stopPropagation());

  sizes.elt.addEventListener("touchstart", (e) => e.stopPropagation());
  strokes.elt.addEventListener("touchstart", (e) => e.stopPropagation());
}

function drawing(x, y, px, py) {
  if (!selectTool) return;
  colorMode(HSL, 360, 100, 100, 100);

  isDrawing = true;
  let s = sizes.value();
  let str = strokes.value();

  strokeWeight(str);

  //fill Modes
  switch (count) {
    case 0: //No fill
      noFill();
      stroke(255);
      break;

    case 1: //Black
      fill(0);
      stroke(255);
      break;

    case 2: //Pastel
      fill(random(360), 100, 80);

      if (selectTool === "lines") {
        stroke(random(360), 80, 75);
      } else {
        stroke(255);
      }

      break;

    case 3: //Rainbow
      fill(hues, 100, 60);

      if (selectTool === "lines") {
        stroke(hues, 100, 60);
      } else {
        stroke(255);
      }

      hues = (hues + 1) % 360;
      break;

    default:
      count = 0;
      stroke(255);
      noFill();
  }

  //Drawing section
  if (selectTool === "circles") {
    ellipse(x, y, s, s);
  } else if (selectTool === "squares") {
    rect(x, y, s);
  } else if (selectTool === "lines") {
    line(px, py, x, y);
  }

  if (isDrawing && document.activeElement.tagName !== "INPUT") {
    toolbar.style.display = "none";
  }
}

//Desktop Drawing
function mouseDragged(e) {
  if (e.target.tagName === "CANVAS") {
    drawing(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mouseReleased() {
  isDrawing = false;
  toolbar.style.display = "flex";
}
//Mobile Drawing
function touchMoved(e) {
  if (e.target.tagName === "CANVAS") {
    drawing(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function touchStarted() {
  isDrawing = true;
}

function touchEnded() {
  isDrawing = false;
  toolbar.style.display = "flex";
}

function windowResized() {
  vw = window.innerWidth;
  vh = window.innerHeight;

  resizeCanvas(vw, vh);
}

document.addEventListener("DOMContentLoaded", function () {
  colours = document.getElementById("colours");

  //Save function
  document.getElementById("saveBtn").addEventListener("click", function () {
    saveCanvas("Abstract", "png");
  });
  document.getElementById("saveBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    saveCanvas("Abstract", "png");
  });

  //Clear function
  document.getElementById("clearBtn").addEventListener("click", function () {
    background(0);
    resetTool();
  });
  document.getElementById("clearBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    background(0);
    resetTool();
  });

  //Shape Declaration
  document.getElementById("circles").addEventListener("click", function () {
    selectTool = "circles";
    selectedShape("circles");
    showSize();
    showStroke();
  });
  document.getElementById("circles").addEventListener("touchstart", (e) => {
    e.preventDefault();
    selectTool = "circles";
    selectedShape("circles");
    showSize();
    showStroke();
  });

  document.getElementById("squares").addEventListener("click", function () {
    selectTool = "squares";
    selectedShape("squares");
    showSize();
    showStroke();
  });
  document.getElementById("squares").addEventListener("touchstart", (e) => {
    e.preventDefault();
    selectTool = "squares";
    selectedShape("squares");
    showSize();
    showStroke();
  });

  document.getElementById("lines").addEventListener("click", function () {
    selectTool = "lines";
    selectedShape("lines");
    hideSize();
    showStroke();
  });
  document.getElementById("lines").addEventListener("touchstart", (e) => {
    e.preventDefault();
    selectTool = "lines";
    selectedShape("lines");
    hideSize();
    showStroke();
  });

  //Color button
  document.getElementById("colours").addEventListener("click", function () {
    count = count + 1;
    if (count >= 4) count = 0;

    colorButton();
  });
  document.getElementById("colours").addEventListener("touchstart", (e) => {
    e.preventDefault();
    count = count + 1;
    if (count >= 4) count = 0;

    colorButton();
  });

  //Adding selected style to shape buttons
  function selectedShape(shape) {
    document
      .querySelectorAll(".shapes")
      .forEach((shape) => shape.classList.remove("active"));

    document.getElementById(shape).classList.add("active");
  }

  //Display Size Slider
  function showSize() {
    sizes.style("display", "block");
  }
  function hideSize() {
    sizes.style("display", "none");
  }

  //Display Stroke Slider
  function showStroke() {
    strokes.style("display", "block");
  }
  function hideStroke() {
    strokes.style("display", "none");
  }

  //Resetting after ClearCanvas
  function resetTool() {
    selectTool = null;
    document
      .querySelectorAll(".shapes")
      .forEach((shape) => shape.classList.remove("active"));

    hideSize();
    hideStroke();
  }
});

//Change fill button colors
function btnColor(border, color) {
  colours.style.border = `2px solid ${border}`;
  colours.style.color = color;
}

function colorButton() {
  switch (count) {
    case 0:
      btnColor("#eb5002", "#eb5002");
      break;

    case 1:
      btnColor("black", "black");
      break;

    case 2:
      btnColor("pink", "pink");
      break;

    case 3:
      btnColor("gray", "gray");
      break;

    case 4:
      btnColor("black", "black");
      break;
  }
}
