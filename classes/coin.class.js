class Coin extends MovableObject {
    y = 100;
    height = 120;
    width = 120;
    speed = 0;
    

    IMAGES_WALKING = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1000;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {

        this.moveLeft(this.speed);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100)
    }
}