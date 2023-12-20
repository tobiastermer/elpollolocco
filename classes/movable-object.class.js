/**
 * Represents a movable object in the game.
 * This class extends DrawableObject and includes additional properties and methods for movement and interaction.
 */
class MovableObject extends DrawableObject {

    speed = 0;
    speedY = 0;
    acceleration = 1.2;
    energy = 100;
    lastAction = 0;
    lastAttack = 0;
    lastHit = 0;
    directionDown = false;
    damageToOthers;
    isCollected = false;

    /**
     * Applies gravity to the object, causing it to fall.
     */
    applyGravity() {
        setInterval(() => {
            if (!gameIsPaused) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y = this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            }
        }, 1000 / 30);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable Object should always fall *** 
            return true
        } else if ((this instanceof Character || this instanceof Endboss) && this.isDead()) {
            return true
        } else {
            return this.y < 175;
        }
    }

    /**
     * Checks if the object is falling down.
     * @returns {boolean} True if the object is falling down, false otherwise.
     */
    isFallingDown() {
        if (this.speedY >= 0) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Plays an animation from a given set of images.
     * @param {string[]} images - An array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation from a given set of images and stops at the last image.
     * @param {string[]} images - An array of image paths.
     */
    playAnimationStopLastImg(images) {
        let i = Math.min(this.currentImage + 1, images.length - 1);
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     * @param {number} speed - The speed at which the object moves.
     */
    moveRight(speed) {
        this.x += this.speed;
        this.setLastAction();
    }

    /**
     * Moves the object to the left.
     * @param {number} speed - The speed at which the object moves.
     */
    moveLeft(speed) {
        this.x -= this.speed;
        this.setLastAction();
    }

    /**
     * Causes the object to jump.
     */
    jump() {
        this.speedY = 22;
        this.setLastAction();
    }

    /**
     * Causes the object to rebounce upon collision with an enemy.
     * @param {MovableObject} enemy - The enemy object collided with.
     */
    rebounceOnCollision(enemy) {
        this.y = enemy.y - this.height;
        this.speedY = 22;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} obj - The other object to check collision with.
     * @returns {boolean} True if colliding, false otherwise.
     */
    isColliding(obj) {
        return (this.x + this.offsetX + this.width - 2 * this.offsetX) >= (obj.x + obj.offsetX) &&
            (this.x + this.offsetX) <= (obj.x + obj.offsetX + obj.width - 2 * obj.offsetX) &&
            (this.y + this.offsetYtop + this.height - this.offsetYtop - this.offsetYbottom) >= (obj.y + obj.offsetYtop) &&
            (this.y + this.offsetYtop) <= (obj.y + obj.offsetYtop + obj.height - obj.offsetYtop - obj.offsetYbottom);
    }

    /**
     * Handles the collection of an object.
     * @param {MovableObject} obj - The object being collected.
     */
    collect(obj) {
        if (obj instanceof Coin) {
            this.collectedCoins += 1;
        } else if (obj instanceof ThrowableObject) {
            this.collectedBottles += 1;
        }
    }

    /**
    * Handles the object being hit and taking damage.
    * @param {number} damage - The amount of damage taken.
    */
    hit(damage) {
        if (this.energy > 0) {
            this.energy -= damage;
            if (this.energy <= 0) {
                this.energy = 0;
                this.lastDead = new Date().getTime();
            } else {
                this.lastHit = new Date().getTime();
            }
            this.setLastAction();
        }
    }

    /**
     * Handles the object attacking.
     */
    attack() {
        this.lastAttack = new Date().getTime();
    }

    /**
     * Checks if the object is currently hurt.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // time since last passive Hit in milliseconds
        return timePassed < 1000;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object is currently attacking.
     * @returns {boolean} True if the object is attacking, false otherwise.
     */
    isAttacking() {
        let timePassed = new Date().getTime() - this.lastAttack; // time since last active Hit in milliseconds
        return timePassed < 1000;
    }

    /**
     * Checks if the object is idling.
     * @returns {boolean} True if the object is idling, false otherwise.
     */
    isIdling() {
        let timePassed = new Date().getTime() - this.lastAction; // time since last Action in milliseconds
        return timePassed > 2000;
    }

    /**
     * Checks if the object is near to the character.
     * @returns {boolean} True if the object is near to the character, false otherwise.
     */
    isNearToCharacter() {
        return (!this.otherDirection && this.x - world.character.x < 300) || (this.otherDirection && world.character.x - this.x < 300);
    }

    /**
     * Handles the death of the object.
     */
    die() {
        if (this instanceof Character) {
            this.x += 20;
            this.speedY = 2;
        } else if (this instanceof Endboss) {
            this.x += 10;
            this.speedY = 1;
        }
        this.acceleration = 0.02;
        this.speed = 0;
        this.applyGravity();
    }

    /**
     * Sets the last action time to the current time.
     */
    setLastAction() {
        this.lastAction = new Date().getTime();
    }
}