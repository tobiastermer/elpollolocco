let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.THROW = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.THROW = false;
  }
});
