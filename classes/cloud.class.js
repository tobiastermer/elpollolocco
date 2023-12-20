/**
 * Represents a cloud in the game.
 */
class Cloud extends MovableObject {

    y = 0;
    width = 720;
    height = 480;
    speed = 1;

    constructor(path, x) {
        super();
        this.x = x;
        this.loadImage(path);
        this.animate();
    }

    animate() {
        setInterval(() => this.moveCloud(), 1000 / 30);
    }

    moveCloud() {
        if (!gameIsPaused) {
            this.moveLeft(this.speed);
        }
    }

}