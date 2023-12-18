class SmallChicken extends Chicken {

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    isDeadAudioPlayed = false;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 500 + Math.random() * 2500;
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

}