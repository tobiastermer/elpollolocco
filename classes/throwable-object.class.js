class ThrowableObject extends MovableObject {

    isSplashed = false;

    IMAGES_ONGROUND = [
        './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    IMAGES_ROTATING = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, otherDirection, imgIndex, damageToOthers) {
        super().loadImages(this.IMAGES_ONGROUND);
        this.loadImage(this.IMAGES_ONGROUND[imgIndex]);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.offsetX = 25;
        this.offsetYtop = 15;
        this.offsetYbottom = 10;
        this.speed = 0;
        this.speedY = 15;
        this.damageToOthers = damageToOthers;
        this.otherDirection = otherDirection;
        this.loadImages(this.IMAGES_ONGROUND);
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASH);
        if (this.damageToOthers > 0) {
            this.throw();
        }
    }

    throw() {
        this.applyGravity();
        setInterval(() => {
            if (this.isSplashed) {
                this.playAnimation(this.IMAGES_SPLASH);
                this.damageToOthers = 0;
            } else if (this.otherDirection) {
                this.x -= 20;
                this.playAnimation(this.IMAGES_ROTATING);
            } else {
                this.x += 20;
                this.playAnimation(this.IMAGES_ROTATING);
            }

        }, 1000 / 60);
    }

}