class Chicken extends MovableObject {

    y = 340;
    height = 80;
    width = 60;
    

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.speed = 1 + Math.random() * 1;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {

        this.moveLeft(this.speed);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100)
    }
}