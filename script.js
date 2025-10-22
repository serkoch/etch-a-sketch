const container = document.querySelector('.container');
const btn = document.querySelector('.btn');
const clear = document.querySelector('.clear');
const rainbowMode = document.querySelector('.rainbowMode');
const colorMode = document.querySelector('.colorMode');
const eraserMode = document.querySelector('.eraserMode');
const colorPicker = document.querySelector('.colorPicker');
const saveBtn = document.querySelector('.save');

const containerSize = 500;
let draw = false;
let mode = 'Color';
let bgColor = colorPicker.value;

function setMode(newMode, activeBtn) {
  mode = newMode;
  [colorMode, rainbowMode, eraserMode].forEach((btn) => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

colorMode.addEventListener('click', () => setMode('Color', colorMode));
rainbowMode.addEventListener('click', () => setMode('Rainbow', rainbowMode));
eraserMode.addEventListener('click', () => setMode('Eraser', eraserMode));

function getColor() {
  if (mode === 'Color') return colorPicker.value;
  if (mode === 'Rainbow') return `rgb(${rand()}, ${rand()}, ${rand()})`;
  if (mode === 'Eraser') return 'whitesmoke';
}

function rand() {
  return Math.floor(Math.random() * 256);
}

document.body.addEventListener('mousedown', () => (draw = true));
document.body.addEventListener('mouseup', () => (draw = false));

function createGrid(size) {
  container.innerHTML = '';

  const cellSize = containerSize / size;

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    div.style.width = `${cellSize}px`;
    div.style.height = `${cellSize}px`;
    div.style.backgroundColor = 'whitesmoke';
    div.setAttribute('draggable', 'false');

    div.addEventListener('mousemove', () => {
      if (!draw) return;
      div.style.backgroundColor = getColor();
    });

    div.addEventListener('mousedown', () => {
      div.style.backgroundColor = getColor();
    });

    container.appendChild(div);
  }
}

clear.addEventListener('click', () => {
  document.querySelectorAll('.grid-item').forEach((div) => {
    div.style.backgroundColor = 'whitesmoke';
  });
});

btn.addEventListener('click', function changeSize() {
  const input = prompt('Enter grid size (1-100):');
  const size = parseInt(input);

  if (!size || size < 1 || size > 100) {
    alert('Please enter a number between 1 and 100.');
    return;
  }
  createGrid(size);
});

saveBtn.addEventListener('click', () => {
  html2canvas(container).then((canvas) => {
    const link = document.createElement('a');
    link.download = 'etch-a-sketch.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

createGrid(30);
