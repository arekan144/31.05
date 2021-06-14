"use strict";

export default class Playarea {
    constructor(parentNode) {
        this.parentNode = parentNode;
        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("playarea")
        // 14, 30, -- 8, 4
        this.canvas.width = 14 * 60
        this.canvas.height = 30 * 32
        this.parentNode.append(this.canvas)
        // console.log("??")
        this.context = this.canvas.getContext('2d')

        
        let img = document.createElement("img")
        this.context.drawImage(img, 0, 0, 60, 32)
        console.log(img)
    }
    // clear = () => {
    //     this.context
    // }
}