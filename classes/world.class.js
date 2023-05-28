class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusbars = [statusbarBottles, statusbarHealth, statusbarCoins, statusbarEndboss];
 

    throwableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();    
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
        }, 200);
    }

    checkCollisions() {

        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbars[1].setPercentage(this.character.energy);
            };
        });


    }

    checkThrowableObjects() {
        if (this.keyboard.THROW) {
            let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 60, this.character.otherDirection);
            this.throwableObjects.push(bottle);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.level.backgroundLayers);
        this.addObjectsToCanvas(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Back
        // space for fixed elements *************
        this.addObjectsToCanvas(this.statusbars);

        this.ctx.translate(this.camera_x, 0); // Forwards

        this.addObjectsToCanvas(this.level.coins);
        this.addObjectsToCanvas(this.throwableObjects);
        this.addObjectsToCanvas(this.level.enemies);
        this.addObjectToCanvas(this.character);
        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addObjectToCanvas(object);
        })
    }

    addObjectToCanvas(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawRectangle(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}