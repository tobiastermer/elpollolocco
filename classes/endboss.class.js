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

    animate() {

        // wird gebraucht, damit der Endboss nicht zu ruckartig seine Richtung verändert
        setInterval(() => {
            if (world.character.x > this.x) {
                this.otherDirection = true;
            } else {
                this.otherDirection = false;
            }
        }, 1500);

        setInterval(() => {
            if (!gameIsPaused) {
                if (this.isDead()) {
                    // this.x += 1;                
                } else if (this.otherDirection) {
                    this.moveRight(this.speed);
                } else {
                    this.moveLeft(this.speed);
                }
            }
        }, 1000 / 30);

        setInterval(() => {
            if (!gameIsPaused) {
                if (this.isDead()) {
                    this.playAnimationStopLastImg(this.IMAGES_DEAD);
                    playAudio("endbossDies");
                    playAudio("gameWon");
                } else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                    playAudio("endbossHurt");
                } else if (this.isAttacking()) {
                    this.playAnimation(this.IMAGES_ATTACK);
                    playAudio("endbossAttack");
                } else if (this.isNearToCharacter()) {
                    this.playAnimation(this.IMAGES_ALERT);
                    playAudio("endbossAlert");
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 1000 / 30)
    }
}