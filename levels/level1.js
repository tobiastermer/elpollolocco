let level1;

function initLevel1() {

    level1 = new Level(

        [
            new BigChicken(),
            new BigChicken(),
            new SmallChicken(),
            new BigChicken(),
            new BigChicken(),
            new SmallChicken(),
            new BigChicken(),
            new SmallChicken(),
            new BigChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new BigChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss(),
        ],

        [
            new Cloud('./img/5_background/layers/4_clouds/2.png', -719),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 719),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 1438),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 2157),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 2876),
        ],

        [
            new BackgroundLayer('./img/5_background/layers/air.png', -719),
            new BackgroundLayer('./img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundLayer('./img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundLayer('./img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundLayer('./img/5_background/layers/air.png', 0),
            new BackgroundLayer('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundLayer('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundLayer('./img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundLayer('./img/5_background/layers/air.png', 719),
            new BackgroundLayer('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundLayer('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundLayer('./img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundLayer('./img/5_background/layers/air.png', 1438),
            new BackgroundLayer('./img/5_background/layers/3_third_layer/1.png', 1438),
            new BackgroundLayer('./img/5_background/layers/2_second_layer/1.png', 1438),
            new BackgroundLayer('./img/5_background/layers/1_first_layer/1.png', 1438),
            new BackgroundLayer('./img/5_background/layers/air.png', 2157),
            new BackgroundLayer('./img/5_background/layers/3_third_layer/2.png', 2157),
            new BackgroundLayer('./img/5_background/layers/2_second_layer/2.png', 2157),
            new BackgroundLayer('./img/5_background/layers/1_first_layer/2.png', 2157),
            new BackgroundLayer('./img/5_background/layers/air.png', 2876),
            new BackgroundLayer('./img/5_background/layers/3_third_layer/1.png', 2876),
            new BackgroundLayer('./img/5_background/layers/2_second_layer/1.png', 2876),
            new BackgroundLayer('./img/5_background/layers/1_first_layer/1.png', 2876),
        ],

        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],

        [
            new ThrowableObject(350, 380, false, 0, 0),
            new ThrowableObject(380, 380, false, 0, 0),
            new ThrowableObject(410, 380, false, 0, 0),
            new ThrowableObject(450, 380, false, 1, 0),
            new ThrowableObject(480, 380, false, 1, 0),
            new ThrowableObject(850, 380, false, 0, 0),
            new ThrowableObject(880, 380, false, 0, 0),
            new ThrowableObject(910, 380, false, 0, 0),
            new ThrowableObject(950, 380, false, 1, 0),
            new ThrowableObject(980, 380, false, 1, 0),
            new ThrowableObject(1350, 380, false, 0, 0),
            new ThrowableObject(1380, 380, false, 0, 0),
            new ThrowableObject(1410, 380, false, 0, 0),
            new ThrowableObject(1450, 380, false, 1, 0),
            new ThrowableObject(1480, 380, false, 1, 0),
        ],

        2900

    );

}