/**
 * Represents the main character in the game.
 * This class handles the character's animations, movements, and actions.
 */
class Character extends MovableObject {

    world;
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
    ];

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONGIDLE = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
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
        this.damageToOthers = 10;
        this.rotatedDeg = 0;
        this.lastAction = new Date().getTime();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Sets intervals for character movement and animation.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 30);
        setInterval(() => this.playCharacter(), 100);
    }

    /**
     * Handles the character's movement based on keyboard input.
    */
    moveCharacter() {
        if (!gameIsPaused && !this.isDead()) {
            if (this.canMoveRight()) {
                this.moveRight();
            }
            if (this.canMoveLeft()) {
                this.moveLeft();
            }
            if (this.canJump()) {
                this.jump();
            }
        }
    }

    /**
     * Controls the character's animations based on their current state and actions.
    */
    playCharacter() {
        if (!gameIsPaused) {
            if (this.isDead()) {
                this.playDead();
            } else if (this.isHurt()) {
                this.playHurt();
            } else if (this.isAboveGround()) {
                this.playJump();
            } else if (this.isWalking()) {
                this.playWalking();
            } else if (this.isIdling()) {
                this.playLongIdling();
            } else {
                this.playIdling();
            }
        }
    }

    /**
     * Checks if the character can move to the right.
     * @returns {boolean} True if the character can move right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
    }

    /**
     * Moves the character to the right.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        this.lastAction = new Date().getTime();
        playAudio("characterWalking");
    }

    /**
     * Checks if the character can move to the left.
     * @returns {boolean} True if the character can move left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves the character to the left.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.lastAction = new Date().getTime();
        playAudio("characterWalking");
    }

    /**
     * Checks if the character is currently walking.
     * @returns {boolean} True if the character is walking, false otherwise.
     */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Plays the walking animation for the character.
     */
    playWalking() {
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Checks if the character can jump.
     * @returns {boolean} True if the character can jump, false otherwise.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Makes the character jump.
     */
    jump() {
        super.jump();
        this.lastAction = new Date().getTime();
        playAudio("characterJump");
    }

    /**
     * Plays the jumping animation for the character.
     */
    playJump() {
        this.playAnimation(this.IMAGES_JUMPING);
        pauseAudio("characterWalking");
    }

    /**
     * Plays the death animation and sound for the character.
     */
    playDead() {
        this.playAnimationStopLastImg(this.IMAGES_DEAD);
        playAudio("characterDies");
        playAudio("gameLost");
    }

    /**
     * Plays the hurt animation and sound for the character.
     */
    playHurt() {
        this.playAnimation(this.IMAGES_HURT);
        playAudio("characterGetHurt");
        pauseAudio("characterWalking");
    }

    /**
     * Plays the long idling animation and sound for the character.
     */
    playLongIdling() {
        this.playAnimation(this.IMAGES_LONGIDLE);
        pauseAudio("characterWalking");
        playAudio("characterSleeps");
    }

    /**
     * Plays the idling animation for the character.
     */
    playIdling() {
        this.playAnimation(this.IMAGES_IDLE);
        pauseAudio("characterWalking");
    }

}