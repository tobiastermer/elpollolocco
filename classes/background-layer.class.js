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