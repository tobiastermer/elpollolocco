/**
 * Represents the keyboard and touch controls for the game.
 * This class handles the state of different keys and touch controls.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    THROW = false;

    constructor() {
        this.initKeyboardControls();
        this.initTouchControls();
    }

    /**
     * Initializes keyboard event listeners for game controls.
     */
    initKeyboardControls() {
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
    }

    /**
     * Initializes mobile event listeners for game controls.
     */
    initTouchControls() {

        const btnLeft = document.getElementById('btn-left');
        if (btnLeft) {
            btnLeft.addEventListener('touchstart', () => {
                this.LEFT = true;
            });
            btnLeft.addEventListener('touchend', () => {
                this.LEFT = false;
            });
        }

        const btnRight = document.getElementById('btn-right');
        if (btnRight) {
            btnRight.addEventListener('touchstart', () => {
                this.RIGHT = true;
            });
            btnRight.addEventListener('touchend', () => {
                this.RIGHT = false;
            });
        }

        const btnThrow = document.getElementById('btn-throw');
        if (btnThrow) {
            btnThrow.addEventListener('touchstart', () => {
                this.THROW = true;
            });
            btnThrow.addEventListener('touchend', () => {
                this.THROW = false;
            });
        }

        const btnJump = document.getElementById('btn-jump');
        if (btnJump) {
            btnJump.addEventListener('touchstart', () => {
                this.SPACE = true;
            });
            btnJump.addEventListener('touchend', () => {
                this.SPACE = false;
            });
        }
    }

}
