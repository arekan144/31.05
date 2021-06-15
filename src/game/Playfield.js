"use strict";

import Palet from "./Paleta.js";
import Playarea from "./Playarea.js";

export default class Playfield {
    constructor(parentNode) {
        window.oncontextmenu = (e) => { e.preventDefault(); }
        this.rootNode = parentNode;
        this.canvasBlock = new Playarea(this.rootNode)
        this.init();
    }
    init = async () => {
        this.palet = new Palet();
        await this.palet.loadMainImage();
        this.canvasBlock.clearBackground(this.palet);
        this.canvasBlock.putOnPage();
        await this.canvasBlock.data;
        this.canvasBlock.init();
        
        window.requestAnimationFrame((t) => this.canvasBlock.update(t))
    }

}