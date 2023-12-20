/**
 * Represents the Endboss character in the game.
 * This class extends MovableObject and includes specific animations and behaviors for the Endboss.
 */
class Endboss extends MovableObject {

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
        this.x = 2900;
        this.y = 112;
        this.height = 320;
        this.width = 240;
        this.offsetX = 12;
        this.offsetYtop = 55;
        this.offsetYbottom = 10;
        this.speed = 1 + Math.random() * 1;
        this.energy = 100;
        this.damageToOthers = 3;
        this.rotatedDeg = 0;
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    /**
     * Sets intervals for Endboss actions and animations.
     */
    animate() {
        setInterval(() => this.chooseDirection(), 1500);
        setInterval(() => this.moveEndboss(), 1000 / 30);
        setInterval(() => this.playEndboss(), 100)
    }

    /**
     * Chooses the direction for the Endboss based on the character's position.
     */
    chooseDirection() {
        if (world.character.x > this.x) {
            this.otherDirection = true;
        } else {
            this.otherDirection = false;
        }
    }

    /**
     * Handles the movement of the Endboss.
     */
    moveEndboss() {
        if (!gameIsPaused && !this.isDead()) {
            if (this.otherDirection) {
                this.moveRight(this.speed);
            } else {
                this.moveLeft(this.speed);
            }
        }
    }

    /**
     * Controls the Endboss's animations based on their current state and actions.
     */
    playEndboss() {
        if (!gameIsPaused) {
            if (this.isDead()) {
                this.playDead();
            } else if (this.isHurt()) {
                this.playHurt();
            } else if (this.isAttacking()) {
                this.playAttack();
            } else if (this.isNearToCharacter()) {
                this.playAlert();
            } else {
                this.playWalking();
            }
        }
    }

    /**
     * Plays the death animation and sound for the Endboss.
     */
    playDead() {
        this.playAnimationStopLastImg(this.IMAGES_DEAD);
        playAudio("endbossDies");
        playAudio("gameWon");
    }

    /**
     * Plays the hurt animation and sound for the Endboss.
     */
    playHurt() {
        this.playAnimation(this.IMAGES_HURT);
        playAudio("endbossHurt");
    }

    /**
     * Plays the attack animation for the Endboss.
     */
    playAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
        playAudio("endbossAttack");
    }

    /**
     * Plays the alert animation for the Endboss.
     */
    playAlert() {
        this.playAnimation(this.IMAGES_ALERT);
        playAudio("endbossAlert");
    }

    /**
     * Plays the walking animation for the Endboss.
     */
    playWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

}