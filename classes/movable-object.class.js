class MovableObject extends DrawableObject {

    speed = 0;
    speedY = 0;
    acceleration = 1.2;
    energy = 100;
    lastHit = 0;
    lastDead = 0;
    directionDown = false;
    damageToOthers;
    isCollected = false;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y = this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable Object should always fall *** 
            return true
        } else if ((this instanceof Character || this instanceof Endboss) && this.isDead()) {
            return true
        } else {
            return this.y < 175;
        }
    }

    isFallingDown() {
        if (this.speedY >= 0) {
            return false;
        } else {
            return true;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationStopLastImg(images) {
        let i = Math.min(this.currentImage + 1, images.length - 1);
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(speed) {
        this.x += this.speed;
    }


    moveLeft(speed) {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 22;
    }

    isColliding(obj) {
        return (this.x + this.offsetX + this.width - 2 * this.offsetX) >= (obj.x + obj.offsetX) &&
            (this.x + this.offsetX) <= (obj.x + obj.offsetX + obj.width - 2 * obj.offsetX) &&
            (this.y + this.offsetYtop + this.height - this.offsetYtop - this.offsetYbottom) >= (obj.y + obj.offsetYtop) &&
            (this.y + this.offsetYtop) <= (obj.y + obj.offsetYtop + obj.height - obj.offsetYtop - obj.offsetYbottom);
        // &&o bj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    collect(obj) {
        if (obj instanceof Coin) {
            this.collectedCoins += 1;
        } else if (obj instanceof ThrowableObject) {
            this.collectedBottles += 1;
        }
    }

    hit(damage) {
        if (this.energy > 0) {
            this.energy -= damage;
            if (this.energy <= 0) {
                this.energy = 0;
                this.lastDead = new Date().getTime();
            } else {
                this.lastHit = new Date().getTime();
            }
            // console.log(this, ', Energy: ', this.energy);
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // time since last Hit in milliseconds
        return timePassed < 1000;
    }

    isDead() {
        // let timePassed = new Date().getTime() - this.lastDead; // time since last Hit in milliseconds
        // return timePassed < 1000
        return this.energy == 0;
    }

    die() {
        if (this instanceof Character) {
            this.x += 20;
            this.speedY = 3;
        } else if (this instanceof Endboss) {
            this.x += 10;
            this.speedY = 2;
        }
        this.acceleration = 0.02;
        this.speed = 0;
        this.applyGravity();
    }
}