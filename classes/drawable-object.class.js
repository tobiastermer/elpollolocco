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

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

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