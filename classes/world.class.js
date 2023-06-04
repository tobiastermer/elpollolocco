class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    statusbarBottles = statusbar1;
    statusbarHealth = statusbar2;
    statusbarCoins = statusbar3;
    statusbarEndboss = statusbar4;
    statusbarEndbossIcon = new FixedImage(650, 6, 63, 63, './img/7_statusbars/3_icons/icon_health_endboss.png', false);

    thrownObjects = [];

    startScreen = new BackgroundLayer('./img/9_intro_outro_screens/start/startscreen_2.png', 0);
    endScreen = new BackgroundLayer('./img/9_intro_outro_screens/game_over/game over.png', 0);
    

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
            this.checkThrowableObjects();
            this.checkEndbossVisibility();
        }, 200);
        setInterval(() => {
            this.checkCollisions();
        }, 1000 / 60);
    }

    checkEndbossVisibility() {
        if (this.level.enemies[this.level.enemies.length - 1].x - this.character.x < 550) {
            this.statusbarEndboss.isVisible = true;
            this.statusbarEndbossIcon.isVisible = true;
        }
    }

    checkCollisions() {

        this.checkCollectingCoinsBottles(this.level.coins, this.statusbarCoins, this.character.collectedCoins);
        this.checkCollectingCoinsBottles(this.level.collectableThrowableObjects, this.statusbarBottles, this.character.collectedBottles);

        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isDead()) {
                if (this.character.isAboveGround() && this.character.isFallingDown() && enemy instanceof Chicken) {
                    enemy.hit(this.character.damageToOthers)
                    
                } else {
                    this.character.hit(enemy.damageToOthers);
                    this.statusbarHealth.setPercentage(this.character.energy);
                    if (this.character.isDead()) {
                        this.character.die();
                    }
                }
            };
        });

        this.level.enemies.forEach(enemy => {
            this.thrownObjects.forEach(thrownObject => {
                if (thrownObject.isColliding(enemy)) {
                    thrownObject.isSplashed = true;
                    enemy.hit(thrownObject.damageToOthers);
                    this.statusbarEndboss.setPercentage(enemy.energy);
                    if (enemy instanceof Endboss && enemy.isDead()) {
                        enemy.die();
                    }
                };
            });
        });
    }

    checkCollectingCoinsBottles(arr, statusbar, collectedElements) {
        arr.forEach(element => {
            if (this.character.isColliding(element) && !element.isCollected && collectedElements < statusbar.limit) {
                this.character.collect(element);
                statusbar.setPercentage((collectedElements + 1) / statusbar.limit * 100);
                element.isCollected = true;
                element.isVisible = false;
            };
        });
    }

    checkThrowableObjects() {
        if (this.keyboard.THROW && this.character.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 60, this.character.otherDirection, 0, 10);
            this.thrownObjects.push(bottle);
            this.character.collectedBottles -= 1;
            this.statusbarBottles.setPercentage((this.character.collectedBottles) / this.statusbarBottles.limit * 100);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.level.backgroundLayers);
        this.addObjectsToCanvas(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0); // Back
        // begin space for fixed elements *************
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarEndboss);
        this.addToMap(this.statusbarEndbossIcon);
        this.ctx.translate(this.camera_x, 0); // Forwards
        // end space for fixed elements *************

        this.addObjectsToCanvas(this.level.coins);
        this.addObjectsToCanvas(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToCanvas(this.level.collectableThrowableObjects);
        this.addObjectsToCanvas(this.thrownObjects);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {
        if (mo.isVisible) {
            if ((mo instanceof Character || mo instanceof Endboss) && mo.isDead()) {
                this.rotateImage(mo);
            } else if (mo.otherDirection) {
                this.flipImage(mo);
            }

            mo.draw(this.ctx);
            mo.drawRectangle(this.ctx);

            if ((mo instanceof Character || mo instanceof Endboss) && mo.isDead()) {
                this.rotateImageBack(mo);
            } else if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
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

    rotateImage(mo) {
        if (mo.rotatedDeg >= 360) mo.rotatedDeg = 0;
        mo.rotatedDeg += 2;
        let imgPositionX = (mo.x + mo.offsetX + mo.width - 2 * mo.offsetX);
        let imgPositionY = (mo.y + mo.offsetYtop / 2 + mo.height - mo.offsetYtop - mo.offsetYbottom);
        this.ctx.save();
        this.ctx.translate(imgPositionX, imgPositionY);
        this.ctx.rotate(mo.rotatedDeg * Math.PI / 180);
        this.ctx.translate(-imgPositionX, -imgPositionY);
    }

    rotateImageBack(mo) {
        this.ctx.restore();
    }

}