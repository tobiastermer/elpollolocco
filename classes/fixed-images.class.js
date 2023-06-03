class FixedImage extends DrawableObject {

    constructor(x, y, width, height, img, isVisible) {
        super().loadImage(img);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isVisible = isVisible;
    }

}