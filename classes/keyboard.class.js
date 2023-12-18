class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    THROW = false;

    constructor() {
        // ... Ihre vorhandenen Event-Listener ...

        this.initializeTouchControls();
    }

    initializeTouchControls() {
        
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
