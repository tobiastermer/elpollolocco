class Coin extends MovableObject {

    IMAGES_WALKING = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('./img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1500;
        this.y = 100;
        this.height = 120;
        this.width = 120;
        this.offsetX = 40;
        this.offsetYtop = 40;
        this.offsetYbottom = 40;
        this.speed = 0;
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