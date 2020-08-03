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

function createColorPicker() {
  const pickr = Pickr.create({
    el: ".color-picker",
    theme: "nano", // or 'monolith', or 'nano'

    swatches: [
      "rgba(244, 67, 54, 1)",
      "rgba(233, 30, 99, 0.95)",
      "rgba(156, 39, 176, 0.9)",
      "rgba(103, 58, 183, 0.85)",
      "rgba(63, 81, 181, 0.8)",
      "rgba(33, 150, 243, 0.75)",
      "rgba(3, 169, 244, 0.7)",
      "rgba(0, 188, 212, 0.7)",
      "rgba(0, 150, 136, 0.75)",
      "rgba(76, 175, 80, 0.8)",
      "rgba(139, 195, 74, 0.85)",
      "rgba(205, 220, 57, 0.9)",
      "rgba(255, 235, 59, 0.95)",
      "rgba(255, 193, 7, 1)",
    ],

    components: {
      // Main components
      preview: true,
      opacity: true,
      hue: true,

      // Input / output Options
      interaction: {
        hex: true,
        rgba: true,
        hsla: true,
        hsva: true,
        cmyk: true,
        input: true,
        clear: true,
        save: true,
      },
    },
  });

  return pickr;
}

let color = "000000";
let mode = "simple";
let show = true;

const btnResize = document.getElementById("resize");
const btnRandomColor = document.getElementById("randomColor");
const btnColor = document.getElementById("color");
const btnGrid = document.getElementById("grid");
const btnClear = document.getElementById("clear");
const pickr = createColorPicker();

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
  pickr.show();
});

btnGrid.addEventListener("click", () => {
  show = !show;
  showGrid(show);
});

btnClear.addEventListener("click", () => {
  clearAllBlocks();
});

pickr.on("save", (colorPicked) => {
  color  = colorPicked.toHEXA()[0] + colorPicked.toHEXA()[1] + colorPicked.toHEXA()[2];
  changeColor("simple", color);
});



addBlock(10);
changeColor("simple", color);
