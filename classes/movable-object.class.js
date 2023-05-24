class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 50;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;


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

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(speed) {
        setInterval(() => {
            this.x = this.x + speed;
        }, 60)
    }


    moveLeft(speed) {
        setInterval(() => {
            this.x = this.x - speed;
        }, 60)
    }
}