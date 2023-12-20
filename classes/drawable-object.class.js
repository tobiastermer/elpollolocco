/**
 * Represents a drawable object in the game.
 * This class provides basic functionality for loading and drawing images.
 */
class DrawableObject {

    x;
    y;
    offsetX;
    offsetYtop;
    offsetYbottom;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    rotatedDeg = 0;
    isVisible = true;

    /**
     * Loads an image from a given path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths.
     * @param {string[]} arr - An array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context to draw to.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a rectangle around the object. Used for debugging.
     * @param {CanvasRenderingContext2D} ctx - The rendering context to draw to.
     */
    drawRectangle(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = "6";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offsetX, this.y + this.offsetYtop, this.width - 2 * this.offsetX, this.height - this.offsetYtop - this.offsetYbottom);
            ctx.stroke();
        }
    }

}