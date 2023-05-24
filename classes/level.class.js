class Level {
    enemies;
    clouds;
    backgroundLayers;
    coins;
    levelEndX;
    
    constructor(enemies, clouds, backgroundLayers, coins, levelEndX) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundLayers = backgroundLayers;
        this.coins = coins;
        this.levelEndX = levelEndX;
    }
}