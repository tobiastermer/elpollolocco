const level1 = new Level(

    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
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

    2900

);

