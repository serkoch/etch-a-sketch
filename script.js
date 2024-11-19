const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const clear = document.querySelector(".clear");
const containerHeight = 500;
const containerWidth = 500;
const mode = document.querySelector(".mode");
const colorPicker = document.querySelector('.colorPicker');

function getRandNum() {
  return Math.floor(Math.random() * 255);
}

let draw = false;
document.body.addEventListener("mousedown", function () {
  draw = true;
});
document.body.addEventListener("mouseup", function () {
  draw = false;
});

mode.addEventListener("click", function () {
  if (mode.textContent === "Rainbow mode") {
    mode.textContent = "Color mode";
  } else {
    mode.textContent = "Rainbow mode";
  }
});

function grid(num) {
  let width = containerWidth / num;
  let height = containerHeight / num;
  console.log(height);
  for (let i = 0; i < num * num; i++) {
    const div = document.createElement("div");
    div.setAttribute("draggable", "false");
    container.setAttribute("draggable", "false");
    div.style.height = `${height}px`;
    div.style.width = `${width}px`;
    div.classList.add("grid-item");
    container.appendChild(div);
    clear.addEventListener("click", function () {
      div.style.backgroundColor = "whitesmoke";
    });
    div.addEventListener("mousemove", function () {
      if (draw) {
        if (mode.textContent === "Color mode") {
          div.style.backgroundColor = `rgb(${getRandNum()}, ${getRandNum()}, ${getRandNum()})`;
        } else {
          div.style.backgroundColor = colorPicker.value;
        }
      }
    });
  }
}

btn.addEventListener("click", function userInput() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  let choice = prompt("Please, enter the canvas size: from 1 to 100");
  userChoice = parseInt(choice);
  if (userChoice > 0 && userChoice <= 100) {
    grid(userChoice);
  } else {
    return userInput();
  }
});

grid(30);
