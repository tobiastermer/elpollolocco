let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false; // Variable zum Speichern des Vollbildstatus
let intervalIDs = [];
let gameIsPaused = false;
let gameIsWon = false;

function startGame() {
  clearAllIntervals();
  initLevel1();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  hideElement('screen-start');
  hideElement('screen-loose');
  hideElement('screen-win');
  hideElement('btn-start');
  showElement('canvas');
  showElement('btn-gameoverlay');
  showElement('btn-pause');
  gameIsPaused = false;
  initBackgroundMusic();
}

function pauseGame() {
  gameIsPaused = true;
  togglePlayPauseButton();
}

function resumeGame() {
  gameIsPaused = false;
  togglePlayPauseButton();
}

/**
 * Initializes the background music for the game.
 */
function initBackgroundMusic() {
  const backgroundAudio = audios.find((a) => a.audioName === "backgroundMusic");
  if (backgroundAudio) {
      playAudio("backgroundMusic");
      backgroundAudio.isPlaying = true;
  }
}

function togglePlayPauseButton() {
  document.getElementById('btn-play').classList.toggle('d-none');
  document.getElementById('btn-pause').classList.toggle('d-none');
}

function wonGame() {
  gameIsWon = true;
  finishGame();
}

function lostGame() {
  gameIsWon = false;
  finishGame();
}

function finishGame() {

  setTimeout(() => {
    pauseGame();
    if (gameIsWon) {
      showElement('screen-win');
    } else {
      showElement('screen-loose');
    }
    document.getElementById('btn-pause').classList.add('d-none');
    gameIsPaused = true;

    // showElement('screen-start');
    showElement('btn-start');
    // hideElement('canvas');
    hideElement('btn-gameoverlay');
    hideElement('btn-pause');

  }, 1500);

}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function showElement(element) {
  // document.getElementById('image-layer').classList.remove('d-none');
  document.getElementById(element).classList.remove('d-none');
}

function hideElement(element) {
  // document.getElementById('image-layer').classList.add('d-none');
  document.getElementById(element).classList.add('d-none');
}
function toggleFullscreen() {
  let fullscreenElement = document.getElementById('content');

  if (!isFullscreen) {
    enterFullscreen(fullscreenElement);
  } else {
    exitFullscreen();
  }

  isFullscreen = !isFullscreen; // Umschalten des Status
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {  // iOS Safari
    element.webkitRequestFullscreen();
  }
  resizeCanvas();
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  resizeCanvas();
}

function resizeCanvas() {
  let canvas = document.getElementById('canvas');
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    // Im Vollbildmodus
    let aspectRatio = 16 / 9;
    let newWidth = window.innerWidth;
    let newHeight = newWidth / aspectRatio;
    if (newHeight > window.innerHeight) {
      newHeight = window.innerHeight;
      newWidth = newHeight * aspectRatio;
    }
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;
  } else {
    // Nicht im Vollbildmodus
    canvas.style.width = '720px';
    canvas.style.height = '480px';
  }
}

// Event-Listener für Vollbildänderungen
document.addEventListener('fullscreenchange', resizeCanvas);
document.addEventListener('webkitfullscreenchange', resizeCanvas); // Für Safari


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
