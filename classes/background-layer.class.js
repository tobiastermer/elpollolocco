/**
 * Represents a background layer in the game.
 * This class is responsible for rendering a background image at a specific position with specific height and width.
 */
class BackgroundLayer extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    constructor(path, x) {
        super();
        this.x = x;
        this.loadImage(path);
    }
}