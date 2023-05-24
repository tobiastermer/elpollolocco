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
        this.moveLeft(this.speed);
    }

}