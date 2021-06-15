"use strict";

export default class Palet {
    constructor() {
        this.mainImage = null;
        // this.scale = 1
        // this.loadMainImage();
        // this.initBricks();
        // this.init();
    }

    loadMainImage = () => {
        return new Promise((resolve, reject) => {
            this.mainImage = new Image();
            this.mainImage.width = 512
            this.mainImage.height = "auto"
            this.mainImage.onload = () => {
                this.initBricks();
                this.initBackground();
                this.initAround();
                resolve(true);
            }
            this.mainImage.onerror = reject
            this.mainImage.src = 'src/game/assets/arkanoid4.png'
            this.mnoznik = 4;
        })
    }
    initBricks = () => {
        this.BRICKP = { width: 8, height: 4 }
        this.BRICKS = [
            { top: 216, left: 5 }, { top: 216, left: 15 }, { top: 216, left: 25 }, { top: 216, left: 35 }, { top: 216, left: 45 },
            { top: 221, left: 5 }, { top: 221, left: 15 }, { top: 221, left: 25 }, { top: 221, left: 35 }, { top: 221, left: 45 },
            { top: 226, left: 5 }, { top: 226, left: 15 }, { top: 226, left: 25 }, { top: 226, left: 35 }, { top: 226, left: 45 },
        ]
    }
    initBackground = () => {
        this.BACKGROUNDP = { width: 128, height: 128 }
        this.BACKGROUND = [{ top: 256, left: 0 }, { top: 256, left: 128 }, { top: 256, left: 256 }, { top: 256, left: 384 },
        { top: 384, left: 0 }, { top: 384, left: 128 }, { top: 384, left: 256 }
        ]
    }
    initAround = () => {
        this.AROUNDP = { width: 128, height: 127 }
        this.AROUND = { top: 128, left: 256 }
    }
}