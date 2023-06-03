class Chicken extends MovableObject {

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 340;
        this.height = 80;
        this.width = 60;
        this.offsetX = 5;
        this.offsetYtop = 5;
        this.offsetYbottom = 5;
        this.damageToOthers = 1;
        this.energy = 20;
        this.speed = 1 + Math.random() * 1;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {

        setInterval(() => {

            if (!this.isDead()) {
                this.moveLeft(this.speed);
            }

        }, 1000 / 60);

        setInterval(() => {

            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 100);
    }
}