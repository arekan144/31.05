"use strict";

import EDATA from "./edata.js";
class Opt {
    constructor(stringL, stringR, rootNode) {
        this.mainNode = document.createElement("div");
        this.mainNode.classList.add("opt")
        let text1 = document.createElement("div")
        text1.innerText = stringL
        text1.style.float = "left"
        let text2 = document.createElement("div")
        text2.innerText = stringR
        text2.style.float = "right"
        this.mainNode.append(text1, text2)
        rootNode.appendChild(this.mainNode)
    }

}
export default class Menu {
    constructor(ev) {
        this.nodeMenu = document.createElement("div");
        this.nodeMenu.classList.add("menu");
        this.nodeMenu.style.display = "none";
        window.onclick = (e) => { this.nodeMenu.style.display = "none" }
        this.nodeMenu.oncontextmenu = (e) => { e.preventDefault(); }
        this.nodeMenu.onclick = (e) => { e.stopPropagation(); }
        document.body.appendChild(this.nodeMenu);
        this.options = new Array();
        this.evn = null;
        this.initOptions();
    }
    initOptions = () => {
        //undo
        this.undo = new Opt("Undo", "Ctrl + Z", this.nodeMenu)
        this.undo.mainNode.onclick = (e) => {
            e.stopImmediatePropagation;
            this.undoFun();
        }

        //redo
        this.redo = new Opt("Redo", "Ctrl + Y", this.nodeMenu)
        this.redo.mainNode.onclick = (e) => {
            e.stopImmediatePropagation;
            this.reduFun();
        }

        //save
        this.save = new Opt("Save to file", "Ctrl + S", this.nodeMenu)
        this.save.mainNode.onclick = (e) => {
            e.stopImmediatePropagation;
            this.saveFun();
        }
        this.load = new Opt("Load from file", "Ctrl + L", this.nodeMenu)
        this.load.input = document.createElement("input")
        this.load.input.type = "file"; this.load.input.style.display = "none"
        this.load.mainNode.onclick = (e) => {
            e.stopImmediatePropagation;
            this.loadFun();
        }



        //keypress
        window.onkeypress = (e) => {
            if (EDATA.ControlLeft && e.code === 'KeyZ') {
                // console.log(EDATA.ControlLeft)
                this.undoFun();
            }
            if (EDATA.ControlLeft && e.code === 'KeyY') {
                // console.log(EDATA.ControlLeft)
                this.reduFun();
            }
            if (EDATA.ControlLeft && e.code === 'KeyS') {
                e.preventDefault();
                e.stopPropagation();
                this.saveFun();
            }
            if (EDATA.ControlLeft && e.code === 'KeyL') {
                e.preventDefault();
                e.stopPropagation();
                this.loadFun();
            }
        }
    }
    undoFun() {
        if (EDATA.previus.length > 0) {
            let toNext = [];
            EDATA.previus[0].canvs.forEach((canv, index) => {
                let img = new Image()
                img.src = EDATA.previus[0].data[index];
                toNext.push(canv.toDataURL("png"))
                // document.body.append(img)
                // console.log("YEs", canv, EDATA.previus.data[index])

                canv.getContext('2d').clearRect(0, 0, canv.width, canv.height)
                setTimeout(() => {
                    canv.getContext('2d').drawImage(img, 0, 0)
                }, 10);
            })
            let dot = EDATA.previus.shift()
            EDATA.next.unshift({ canvs: [...dot.canvs], data: [...toNext] });
            console.log("next:", EDATA.next, "prev:", EDATA.previus)
        }
    }
    reduFun() {
        if (EDATA.next.length > 0) {
            let toPrev = [];
            EDATA.next[0].canvs.forEach((canv, index) => {
                let img = new Image()
                img.src = EDATA.next[0].data[index];
                toPrev.push(canv.toDataURL("png"))

                canv.getContext('2d').clearRect(0, 0, canv.width, canv.height)
                setTimeout(() => {
                    canv.getContext('2d').drawImage(img, 0, 0)
                }, 10);
            })
            let dot = EDATA.next.shift()
            EDATA.previus.unshift({ canvs: [...dot.canvs], data: [...toPrev] });
            console.log("next:", EDATA.next, "prev:", EDATA.previus)
        }
    }
    saveFun() {
        const SaveBoard = new Event("saveBoard");
        window.dispatchEvent(SaveBoard);
    }
    loadFun() {
        this.load.input.click();
        this.load.input.onchange = (e) => {
            var file = e.target.files[0];
            let filereader = new FileReader();
            filereader.readAsText(file);
            filereader.onload = function () {
                let data = JSON.parse(filereader.result);
                const LoadBoard = new CustomEvent("loadBoard", { "detail": data });
                // filereader.result
                window.dispatchEvent(LoadBoard)
                // console.log(data)
            }

        }
    }
}