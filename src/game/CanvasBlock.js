"use strict";

export default class CanvasBlock {
    constructor(parentNode, colums, rows) {
        this.parentNode = parentNode;
        this.mainNode = document.createElement("div");
        this.colums = colums;
        this.rows = rows;
        this.init();
    }
    init = () => {
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.colums; y++) {
                this.createCanvasBlock(x, y);
            }
        }
        this.parentNode.appendChild(this.mainNode);
    }
    createCanvasBlock = (row, colum) => {
        let canvas = document.createElement("canvas");
        canvas.classList.add("standard");
        canvas.style.top = (row * 10) + "px";
        canvas.style.left = (colum * 50) + "px";
        this.mainNode.appendChild(canvas);
    }
}