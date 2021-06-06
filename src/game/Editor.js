"use strict";

import CanvasBlock from "./CanvasBlock.js";
import Keyboard from "./HandleKeyboard.js"
import Palet from "./Paleta.js"
export default class Editor {
    constructor(parentNode) {
        // console.log("Jestem edytor!!")
        window.oncontextmenu = (e) => { e.preventDefault(); }
        this.rootNode = parentNode;

        this.init();
    }
    init = async () => {
        this.palet = new Palet();
        await this.palet.loadMainImage();
        // console.log("nie ok")
        const eventThatClears = new Event('clearBoard');
        this.keyboard = new Keyboard(eventThatClears);
        this.left = document.createElement("div");
        this.left.style.cssText = " position: relative;display: inline-block;";
        this.left.style.width = 6 * 60 + "px";
        this.left.style.height = 5 * 30 + "px"
        this.right = document.createElement("div");
        this.right.style.cssText = this.left.style.cssText;

        // this.bloczki.canvaslist[0].getContext('2d')
        this.plansza = new CanvasBlock(this.right, 14, 30, true, eventThatClears)
        this.bloczki = new CanvasBlock(this.left, 5, 3, false, false, this.plansza);
        //14 30
        this.bloczki.canvaslist.forEach((can, index) => {
            if (this.palet.BRICKS[index]) {
                // console.log(can, index, this.palet.BRICKS[index])
                can.getContext('2d').scale(5, 5)
                can.getContext('2d').drawImage(
                    this.palet.mainImage,
                    this.palet.BRICKS[index].left,
                    this.palet.BRICKS[index].top,
                    this.palet.BRICKP.width,
                    this.palet.BRICKP.height,
                    0,
                    0,
                    58,
                    28
                )
            }
        })
        this.rootNode.append(this.left, this.right)


    }

}