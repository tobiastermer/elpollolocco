/**
 * Represents a throwable object in the game, such as a bottle.
 * This class extends MovableObject and includes specific animations and behaviors for throwable objects.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {

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

    isSplashed = false;
    isSplashedAudioPlayed = false;
    isThrownAudioPlayed = false;
    soundCollected = 'bottleCollect';

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
        this.speed = 20;
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

    /**
    * Initiates the throwing action of the object.
    */
    throw() {
        this.applyGravity();
        setInterval(() => {
            if (!gameIsPaused) {
                if (this.isSplashed) {
                    this.splash();
                } else if (this.otherDirection) {
                    this.throwLeft();
                } else {
                    this.throwRight();
                }
            }
        }, 1000 / 30);
    }

    /**
     * Handles the splash animation and sound when the object hits a target.
     */
    splash() {
        this.playAnimation(this.IMAGES_SPLASH);
        this.damageToOthers = 0;
        if (!this.isSplashedSoundPlayed) {
            playAudioMultiple("bottleSplash");
            this.isSplashedSoundPlayed = true;
        }
    }

    /**
     * Handles the movement and animation when the object is thrown to the left.
     */
    throwLeft() {
        this.moveLeft(this.speed);
        this.playAnimation(this.IMAGES_ROTATING);
        if (!this.isThrownSoundPlayed) {
            playAudioMultiple("bottleThrow");
            this.isThrownSoundPlayed = true;
        }
    }

    /**
     * Handles the movement and animation when the object is thrown to the right.
     */
    throwRight() {
        this.moveRight(this.speed);
        this.playAnimation(this.IMAGES_ROTATING);
        if (!this.isThrownSoundPlayed) {
            playAudioMultiple("bottleThrow");
            this.isThrownSoundPlayed = true;
        }
    }
}