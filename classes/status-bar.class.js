class Statusbar extends DrawableObject {

    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    percentage;
    isVisible;

    constructor(images, percentage, x, y, visible) {
        super();
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 200;
        this.IMAGES = images;
        this.isVisible = visible;
        this.loadImages(this.IMAGES);
        this.setPercentage(percentage);
        this.animate();
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else if (this.percentage <= 100) {
            return 5;
        }
    }

    animate() {

        setInterval(() => {

            //this.x = this.world.character.x - 100;

        }, 1000 / 60)

    }

}