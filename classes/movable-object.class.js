class MovableObject extends DrawableObject {


    speedY = 0;
    acceleration = 1.2;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y = this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable Object should always fall
            return true
        } else {
            return this.y < 175;
        }
    }



    playAnimation(images) {
        let i = this.currentImage % images.length;
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
        return (this.x + this.width) >= obj.x &&
            this.x <= (obj.x + obj.width) &&
            (this.y + this.height) >= obj.y &&
            (this.y) <= (obj.y + obj.height);
        // &&o bj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // time since last Hit in milliseconds
        return timePassed < 1000;
    }

    isDead() {
        return this.energy == 0;
    }
}