"use strict";

export default class Menu {
    constructor() {
        this.nodeMenu = document.createElement("div");
        this.nodeMenu.classList.add("menu");
        this.nodeMenu.style.display = "none";
        window.onclick = (e) => { this.nodeMenu.style.display = "none" }
        this.nodeMenu.oncontextmenu = (e) => { e.preventDefault(); }
        this.nodeMenu.onclick = (e) => { e.stopPropagation(); }
        document.body.appendChild(this.nodeMenu);
        this.options = new Array();
    }
    initOptions = () => {

    }



}