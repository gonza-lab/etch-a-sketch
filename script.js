console.log("hello world :D");

function addBlock(rows) {
  const paper = document.getElementById("paper");
  const block = document.createElement("div");

  block.style.cssText =
    `width: ${100 / rows}%;` +
    `height: ${100 / rows}%;` +
    `border: 0.01px dashed black;`;
  block.classList.add("block");

  for (let i = 0; i < rows ** 2; i++) {
    paper.append(block.cloneNode());
  }
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function changeColor(mode, color) {
  let blocks = document.querySelectorAll(".block");
  blocks.forEach((block) => {
    block.addEventListener("mouseover", (event) => {
      let block = event.target;
      blockSibling = event.target.previousSibling;
      let colorRandom = "";

      if (mode === "simple") {
        block.style.cssText += `background-color: #${color};`;
      } else if (mode === "random") {
        colorRandom = aleatorio(1, 16777215).toString(16);
        block.style.cssText += `background-color: #${colorRandom};`;
      }
    });
  });
}

function showGrid(show) {
  let blocks = document.querySelectorAll(".block");

  blocks.forEach((block) => {
    if (show) {
      block.style.border = "0.01px dashed black";
    } else {
      block.style.border = "none";
    }
  });
}

function removeAllBlocks() {
  const blocks = document.querySelectorAll(".block");

  if (blocks) {
    blocks.forEach((block) => {
      block.parentNode.removeChild(block);
    });
  }
}

function clearAllBlocks() {
  const blocks = document.querySelectorAll(".block");
  if (blocks) {
    blocks.forEach((block) => {
      block.style.backgroundColor = "white";
    });
  }
}

let color = "000000";
let mode = "simple";
let show = true;

const btnResize = document.getElementById("resize");
const btnRandomColor = document.getElementById("randomColor");
const btnColor = document.getElementById("color");
const btnGrid = document.getElementById("grid");
const btnClear = document.getElementById("clear");

btnResize.addEventListener("click", () => {
  removeAllBlocks();
  addBlock(Number(prompt("Enter a row")));
  changeColor(mode, color);
  showGrid(show);
});

btnRandomColor.addEventListener("click", () => {
  mode = "random";
  changeColor(mode);
});

btnColor.addEventListener("click", (event) => {
  color = aleatorio(1, 16777215).toString(16);
  mode = "simple";

  changeColor(mode, color);
});

btnGrid.addEventListener("click", () => {
  show = !show;
  showGrid(show);
});

btnClear.addEventListener("click", () => {
  clearAllBlocks();
});

addBlock(10);
changeColor("simple", color);
