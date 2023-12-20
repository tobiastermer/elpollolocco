/**
 * Represents a level in the game.
 * This class holds information about various elements present in a game level.
 */
class Level {

    enemies;
    clouds;
    backgroundLayers;
    coins;
    collectableThrowableObjects;
    levelEndX;

    constructor(enemies, clouds, backgroundLayers, coins, collectableThrowableObjects, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundLayers = backgroundLayers;
        this.coins = coins;
        this.collectableThrowableObjects = collectableThrowableObjects;
        this.levelEndX = levelEndX;
    }

}