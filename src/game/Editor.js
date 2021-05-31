"use strict";

import CanvasBlock from "./CanvasBlock.js";

export default class Editor {
    constructor(parentNode) {
        // console.log("Jestem edytor!!")
        this.rootNode = parentNode;

        this.init();
    }
    init = () => {
        this.bloczki = new CanvasBlock(this.rootNode, 3, 5)
    }
}