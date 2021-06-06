"use strict";

export default class Palet {
    constructor() {
        this.mainImage = null;
        // this.scale = 1
        // this.loadMainImage();
        // this.initBricks();
        // this.init();
    }
    // init = async () => {
    //     console.log("ok")
    // }
    loadMainImage = () => {
        return new Promise((resolve, reject) => {
            this.mainImage = new Image();
            this.mainImage.width = 512
            this.mainImage.height = "auto"
            this.mainImage.onload = () => {
                this.initBricks();
                resolve(true);
            }
            this.mainImage.onerror = reject
            this.mainImage.src = 'src/game/assets/arkanoid.png'
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
}