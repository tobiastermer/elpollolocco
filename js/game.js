let canvas;
let world;
let keyboard = new Keyboard();
let isFullscreen = false; // Variable zum Speichern des Vollbildstatus
let intervalIDs = [];
let gameIsPaused = false;
let gameIsWon = false;

/**
 * Starts the game by initializing game elements and setting up the UI.
 */
function startGame() {
  initGame();
  setCanvasAndWorld();
  configureGameUI();
  initBackgroundMusic();
}

/**
 * Initializes the game by clearing intervals and setting initial game state.
 */
function initGame() {
  clearAllIntervals();
  initLevel1();
  gameIsPaused = false;
}

/**
 * Sets up the canvas and world objects for the game.
 */
function setCanvasAndWorld() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

/**
 * Configures the game user interface.
 */
function configureGameUI() {
  toggleScreensAndButtons(['screen-start', 'screen-loose', 'screen-win', 'btn-start', 'btn-play', 'btn-column-2-1'], false);
  toggleScreensAndButtons(['canvas', 'btn-pause', 'btn-column-1-2', 'btn-column-3-2', 'btn-column-2-3', 'btn-restart'], true);
  world.keyboard.initTouchControls();
}

/**
 * Pauses the game.
 */
function pauseGame() {
  gameIsPaused = true;
  toggleScreensAndButtons(['btn-play'], true);
  toggleScreensAndButtons(['btn-pause'], false);
}

/**
 * Resumes the game from a paused state.
 */
function resumeGame() {
  gameIsPaused = false;
  toggleScreensAndButtons(['btn-play'], false);
  toggleScreensAndButtons(['btn-pause'], true);
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

/**
 * Handles the event when the game is won.
 */
function wonGame() {
  gameIsWon = true;
  finishGame();
}

/**
 * Handles the event when the game is lost.
 */
function lostGame() {
  gameIsWon = false;
  finishGame();
}

/**
 * Finalizes the game and shows the appropriate end screen.
 */
function finishGame() {
  setTimeout(() => {
    pauseGame();
    toggleScreensAndButtons(['screen-win', 'btn-start'], gameIsWon);
    toggleScreensAndButtons(['screen-loose'], !gameIsWon);
    configureEndGameUI();
  }, 1500);
}

/**
 * Configures the user interface elements for the end of the game.
 */
function configureEndGameUI() {
  toggleScreensAndButtons(['btn-pause', 'btn-column-1-2', 'btn-column-3-2', 'btn-column-2-3', 'btn-restart'], false);
  toggleScreensAndButtons(['btn-column-2-1', 'btn-start'], true);
}

/**
 * Clears all intervals that have been set.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Toggles the visibility of specified screen elements and buttons.
 * @param {string[]} elements - Array of element IDs to toggle.
 * @param {boolean} show - Whether to show or hide the elements.
 */
function toggleScreensAndButtons(elements, show) {
  elements.forEach(element => {
    const el = document.getElementById(element);
    if (el) {
      el.classList.toggle('d-none', !show);
    }
  });
}

/**
 * Toggles the fullscreen mode of the game.
 */
function toggleFullscreen() {
  let fullscreenElement = document.getElementById('content');
  isFullscreen ? exitFullscreen() : enterFullscreen(fullscreenElement);
  isFullscreen = !isFullscreen;
}

/**
 * Enters fullscreen mode for a specified element.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  resizeCanvas();
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  resizeCanvas();
}

/**
 * Resizes the canvas when toggling fullscreen mode.
 */
function resizeCanvas() {
  let canvas = document.getElementById('canvas');
  let content = document.getElementById('content');
  const isFullScreen = document.fullscreenElement || document.webkitFullscreenElement;

  canvas.style.width = isFullScreen ? '100%' : '720px';
  canvas.style.height = isFullScreen ? '100%' : '480px';
  canvas.style.borderRadius = isFullScreen ? '0' : '16px';
  content.style.borderRadius = isFullScreen ? '0' : '16px';
}

/**
 * Toggles the visibility of the game controls.
 */
function toggleGamecontrols() {
  document.getElementById('gamecontrols-container').classList.toggle('d-none');
}

// Event listeners for fullscreen changes
document.addEventListener('fullscreenchange', resizeCanvas);
document.addEventListener('webkitfullscreenchange', resizeCanvas); // Für Safari

// Event listener for orientationchange of device
window.addEventListener("orientationchange", function() {
  if (window.orientation === 0 || window.orientation === 180) {
      // Gerät steht hochkant
      pauseGame();
  } else {
      // Gerät ist im Querformat
      resumeGame();
  }
});
