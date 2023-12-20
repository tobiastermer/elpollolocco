/**
 * Represents a status bar in the game, such as health or energy bars.
 * This class extends DrawableObject and includes functionality for displaying a status bar.
 */
class Statusbar extends DrawableObject {

    percentage;
    limit;

    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    constructor(images, percentage, limit, x, y, visible, otherDirection) {
        super();
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 200;
        this.IMAGES = images;
        this.isVisible = visible;
        this.otherDirection = otherDirection;
        this.limit = limit;
        this.loadImages(this.IMAGES);
        this.setPercentage(percentage);
    }

    /**
     * Sets the percentage of the status bar and updates its image.
     * @param {number} percentage - The new percentage of the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image to be displayed based on the current percentage.
     * @returns {number} The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }

}