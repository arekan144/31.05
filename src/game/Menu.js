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
        this.initOptions();
    }
    initOptions = () => {
        this.undo = document.createElement("div")
        this.undo.classList.add("opt")
        let text1 = document.createElement("div")
        text1.innerText = "Undo"
        text1.style.float = "left"
        let text2 = document.createElement("div")
        text2.innerText = "Control + Z"
        text2.style.float = "right"
        this.undo.append(text1, text2)
        this.nodeMenu.appendChild(this.undo)
        this.undo.onclick = (e) => { e.stopImmediatePropagation; console.log("undo") }
    }



}