/**
 * Represents the game world, including canvas and various game objects and actions.
 */
class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    gameOver = false;
    thrownObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.initWorld();
    }

    /**
     * Initializes the game world.
     */
    initWorld() {
        this.setWorldToCharacterClass();
        this.setStatusbars();
        this.setStatusbarsPercentages();
        this.ctx.imageSmoothingEnabled = false
        this.draw();
        this.runGameLoop();
    }

    /**
     * Sets the world reference for the character.
     */
    setWorldToCharacterClass() {
        this.character.world = this;
    }

    /**
     * Initializes the status bars for the game.
     */
    setStatusbars() {
        this.statusbarBottles = statusbar1;
        this.statusbarHealth = statusbar2;
        this.statusbarCoins = statusbar3;
        this.statusbarEndboss = statusbar4;
        this.statusbarEndboss.isVisible = false;
        this.statusbarEndbossIcon = new FixedImage(650, 6, 63, 63, './img/7_statusbars/3_icons/icon_health_endboss.png', false);
    }

    /**
     * Sets the initial percentages for the status bars.
     */
    setStatusbarsPercentages() {
        this.statusbarBottles.setPercentage(0);
        this.statusbarHealth.setPercentage(100);
        this.statusbarCoins.setPercentage(0);
        this.statusbarEndboss.setPercentage(100);
    }

    /**
     * Runs the main game loop.
     */
    runGameLoop() {
        setInterval(() => {
            if (!gameIsPaused) {
                this.checkThrowableObjects();
            }
        }, 500);
        setInterval(() => {
            if (!gameIsPaused) {
                this.checkEndbossVisibility();
                this.checkCollisions();
            }
        }, 1000 / 30);
    }

    /**
     * Checks and updates the visibility of the endboss based on its position relative to the character.
     */
    checkEndbossVisibility() {
        const endboss = this.level.enemies[this.level.enemies.length - 1];
        if (endboss.x - this.character.x < 550) {
            this.statusbarEndboss.isVisible = true;
            this.statusbarEndbossIcon.isVisible = true;
        }
    }

    /**
     * Checks for collisions between the character and other game objects.
     */
    checkCollisions() {
        this.checkCollectingItems(this.level.coins, this.statusbarCoins, this.character.collectedCoins);
        this.checkCollectingItems(this.level.collectableThrowableObjects, this.statusbarBottles, this.character.collectedBottles);
        this.checkEnemyCollisions();
    }

    /**
     * Checks if the character is collecting items like coins or throwable objects.
     * @param {MovableObject[]} arr - The array of collectable items.
     * @param {Statusbar} statusbar - The status bar associated with the items.
     * @param {number} collectedElements - The number of items already collected.
     */
    checkCollectingItems(arr, statusbar, collectedElements) {
        arr.forEach(element => {
            if (this.character.isColliding(element) && !element.isCollected && collectedElements < statusbar.limit) {
                this.character.collect(element);
                statusbar.setPercentage((collectedElements + 1) / statusbar.limit * 100);
                element.isCollected = true;
                element.isVisible = false;
                playAudioMultiple(element.soundCollected);
            };
        });
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            this.checkCharacterEnemyCollision(enemy);
            this.checkThrownObjectsCollision(enemy);
        });
    }

    /**
     * Checks for collisions between the character and a specific enemy.
     * @param {MovableObject} enemy - The enemy to check for collision.
     */
    checkCharacterEnemyCollision(enemy) {
        if (this.isCharacterCollidesWithEnemy(enemy)) {
            if (this.isChickenHitByCharacter(enemy)) {
                this.handleCharacterHitsChicken(enemy);
            } else {
                this.handleChickenHitsCharacter(enemy);
            }
        };
    }

    /**
     * Determines if the character is colliding with an enemy.
     * @param {MovableObject} enemy - The enemy to check for collision.
     * @returns {boolean} True if the character is colliding with the enemy, false otherwise.
     */
    isCharacterCollidesWithEnemy(enemy) {
        return this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isDead();
    }

    /**
     * Checks if the character hits a chicken while jumping.
     * @param {MovableObject} enemy - The enemy to check.
     * @returns {boolean} True if the character hits the chicken, false otherwise.
     */
    isChickenHitByCharacter(enemy) {
        return this.character.isAboveGround() && this.character.isFallingDown() && enemy instanceof Chicken;
    }

    /**
     * Handles the interaction when the character hits a chicken.
     * @param {MovableObject} enemy - The chicken that was hit.
     */
    handleCharacterHitsChicken(enemy) {
        enemy.hit(this.character.damageToOthers)
        if (enemy.isDead()) {
            this.character.rebounceOnCollision(enemy);
        }
    }

    /**
     * Handles the interaction when a chicken hits the character.
     * @param {MovableObject} enemy - The chicken that hits the character.
     */
    handleChickenHitsCharacter(enemy) {
        this.character.hit(enemy.damageToOthers);
        this.statusbarHealth.setPercentage(this.character.energy);
        enemy.attack();
        if (this.character.isDead()) {
            this.character.die();
            this.gameOver = true;
            lostGame();
        }
    }

    /**
     * Checks for collisions between thrown objects and enemies.
     * @param {MovableObject} enemy - The enemy to check for collisions with thrown objects.
     */
    checkThrownObjectsCollision(enemy) {
        this.thrownObjects.forEach(thrownObject => {
            if (thrownObject.isColliding(enemy)) {
                thrownObject.isSplashed = true;
                enemy.hit(thrownObject.damageToOthers);
                this.statusbarEndboss.setPercentage(enemy.energy);
                if (enemy instanceof Endboss && enemy.isDead()) {
                    enemy.die();
                    wonGame();
                }
            };
        });
    }

    /**
     * Checks and handles the throwing of objects by the character.
     */
    checkThrowableObjects() {
        if (this.keyboard.THROW && this.character.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 10, this.character.y + 60, this.character.otherDirection, 0, 10);
            this.thrownObjects.push(bottle);
            this.character.collectedBottles -= 1;
            this.character.setLastAction();
            this.statusbarBottles.setPercentage((this.character.collectedBottles) / this.statusbarBottles.limit * 100);
        }
    }

    /**
     * Draws the game world and its objects.
     */
    draw() {
        if (!gameIsPaused) {
            this.updateCamera();
            this.clearAndTranslateCanvas();
            this.drawGameObjects();
            this.resetCanvasTranslation();
        }
        this.requestNextFrame();
    }

    /**
     * Clears and translates the canvas for drawing.
     */
    clearAndTranslateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws all game objects onto the canvas.
     */
    drawGameObjects() {
        this.addObjectsToCanvas(this.level.backgroundLayers);
        this.addObjectsToCanvas(this.level.clouds);
        this.drawFixedElements();
        this.addObjectsToCanvas(this.level.coins);
        this.addObjectsToCanvas(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToCanvas(this.level.collectableThrowableObjects);
        this.addObjectsToCanvas(this.thrownObjects);
    }

    /**
     * Draws fixed elements that do not move with the camera.
     */
    drawFixedElements() {
        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusbarBottles);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarEndboss);
        this.addToMap(this.statusbarEndbossIcon);
        this.ctx.translate(this.camera_x, 0); // Forwards
    }

    /**
     * Resets the translation of the canvas to its original state.
     */
    resetCanvasTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Requests the next animation frame for the game loop.
     */
    requestNextFrame() {
        // Anfordern des nächsten Frames für die Animation
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the canvas.
     * @param {DrawableObject[]} objects - The array of drawable objects to add.
     */
    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    /**
     * Adds a single movable object to the canvas.
     * @param {MovableObject} mo - The movable object to add.
     */
    addToMap(mo) {
        if (mo.isVisible) {
            this.rotateOrFlipImage(mo);
            mo.draw(this.ctx);
            //mo.drawRectangle(this.ctx);
            this.rotateOrFlipImageBack(mo);
        }
    }

    /**
     * Rotates or flips an image based on the object's state.
     * @param {MovableObject} mo - The movable object to transform.
     */
    rotateOrFlipImage(mo) {
        if ((mo instanceof Character || mo instanceof Endboss) && mo.isDead()) {
            this.rotateImage(mo);
        } else if (mo.otherDirection) {
            this.flipImage(mo);
        }
    }

    /**
     * Resets the rotation or flip of an image to its original state.
     * @param {MovableObject} mo - The movable object to reset.
     */
    rotateOrFlipImageBack(mo) {
        if ((mo instanceof Character || mo instanceof Endboss) && mo.isDead()) {
            this.rotateImageBack(mo);
        } else if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally.
     * @param {MovableObject} mo - The movable object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Resets the flip of an image to its original state.
     * @param {MovableObject} mo - The movable object whose image flip is to be reset.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Rotates an image.
     * @param {MovableObject} mo - The movable object whose image is to be rotated.
     */
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

    /**
     * Resets the rotation of an image to its original state.
     * @param {MovableObject} mo - The movable object whose image rotation is to be reset.
     */
    rotateImageBack(mo) {
        this.ctx.restore();
    }

    /**
     * Updates the camera position based on the character's movement.
     */
    updateCamera() {
        if (this.character.world.keyboard.RIGHT || this.character.world.keyboard.LEFT) {
            const targetCameraX = this.character.otherDirection ? -this.character.x + 500 : -this.character.x + 100;
            this.camera_x += Math.round((targetCameraX - this.camera_x) * 0.05);
        }
        // this.camera_x = -this.character.x + 120;
    }

}