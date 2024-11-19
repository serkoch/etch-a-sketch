const container = document.querySelector('.container');
const btn = document.querySelector('.btn');
const clear = document.querySelector('.clear');
const containerHeight = 500;
const containerWidth = 500;
const rainbowMode = document.querySelector('.rainbowMode');
const colorMode = document.querySelector('.colorMode');
const eraserMode = document.querySelector('.eraserMode');
const colorPicker = document.querySelector('.colorPicker');

let bgColor = colorPicker.value;
let mode = 'Color';

colorMode.addEventListener('click', function () {
  mode = colorMode.textContent;
  colorMode.classList.add('active');
  rainbowMode.classList.remove('active');
  eraserMode.classList.remove('active');
});
rainbowMode.addEventListener('click', function () {
  mode = rainbowMode.textContent;
  rainbowMode.classList.add('active');
  colorMode.classList.remove('active');
  eraserMode.classList.remove('active');
});
eraserMode.addEventListener('click', function () {
  mode = eraserMode.textContent;
  eraserMode.classList.add('active');
  rainbowMode.classList.remove('active');
  colorMode.classList.remove('active');
});

function getColor() {
  if (mode === 'Color') {
    bgColor = colorPicker.value;
  } else if (mode === 'Rainbow') {
    bgColor = `rgb(${getRandNum()}, ${getRandNum()}, ${getRandNum()})`;
  } else if (mode === 'Eraser') {
    bgColor = 'whitesmoke';
  }
}

function getRandNum() {
  return Math.floor(Math.random() * 255);
}

let draw = false;
document.body.addEventListener('mousedown', function () {
  draw = true;
});
document.body.addEventListener('mouseup', function () {
  draw = false;
});

function grid(num) {
  let width = containerWidth / num;
  let height = containerHeight / num;
  for (let i = 0; i < num * num; i++) {
    const div = document.createElement('div');
    div.setAttribute('draggable', 'false');
    container.setAttribute('draggable', 'false');
    div.style.height = `${height}px`;
    div.style.width = `${width}px`;
    div.classList.add('grid-item');
    container.appendChild(div);
    clear.addEventListener('click', function () {
      div.style.backgroundColor = 'whitesmoke';
    });
    div.addEventListener('mousemove', function () {
      getColor();
      if (draw) {
        div.style.backgroundColor = bgColor;
      }
    });
  }
}

btn.addEventListener('click', function userInput() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  let choice = prompt('Please, enter the canvas size: from 1 to 100');
  userChoice = parseInt(choice);
  if (userChoice > 0 && userChoice <= 100) {
    grid(userChoice);
  } else {
    return userInput();
  }
});

grid(30);
