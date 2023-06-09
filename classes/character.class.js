class Character extends MovableObject {

    world;
    walking_sound = new Audio('./audio/running.mp3');
    collectedCoins = 0;
    collectedBottles = 0;

    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        // './img/2_character_pepe/5_dead/D-56.png',
        // './img/2_character_pepe/5_dead/D-57.png',
    ];

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.x = 120;
        this.y = 175;
        this.height = 250;
        this.width = 100;
        this.offsetX = 20;
        this.offsetYtop = 90;
        this.offsetYbottom = 10;

        this.speed = 10;
        this.damageToOthers = 20;
        this.rotatedDeg = 0;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {

            this.walking_sound.pause();

            // irgendwas mit !isDead ergänzen

            if (this.isDead()) {
                
            } else {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.walking_sound.play();
                }
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.walking_sound.play();
                }

                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                }


                this.world.camera_x = -this.x + 120;
                //this.world.level.statusbar.x = this.x -100;
            }

        }, 1000 / 60)

        setInterval(() => {

            if (this.isDead()) {
                // this.playAnimation(this.IMAGES_DEAD);
                this.playAnimationStopLastImg(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                // walk animation
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 50)
    }

}