"use strict";

import EDATA from "./edata.js";
import HandleMouse from "./HandleMouseMovment.js";
import Menu from "./Menu.js"
export default class CanvasBlock {
    constructor(parentNode, colums, rows, chk, evn, plansza) {
        this.parentNode = parentNode;
        this.mainNode = document.createElement("div");
        this.mainNode.draggable = false;
        this.colums = colums;
        this.rows = rows;
        this.canvaslist = new Array();
        this.insertPlane = chk
        EDATA.targetList = [];
        if (plansza) {
            this.plansza = plansza
        }
        if (chk) {
            this.menu = new Menu()
        }
        if (evn) {
            this.menu.evn = evn;
            window.addEventListener('clearBoard', () => {
                EDATA.targetList.forEach(target => {
                    target.getContext('2d').clearRect(0, 0, 60 * 5, 32 * 5)
                })
                this.handlemouse.b.remove();
                EDATA.targetList = [];
                this.update();
            }, false)
            window.addEventListener('update', () => {
                this.update();
            })
            window.addEventListener('saveBoard', () => {
                // console.log(this.canvaslist)
                let doZapisania = new Array();
                this.canvaslist.forEach(canv => {
                    doZapisania.push(canv.toDataURL("png"))
                })
                // let data = new Blob(doZapisania, ArrayBuffer, 'text/plane')
                // console.log(data.text())
                let a = document.createElement("a")
                a.href = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(doZapisania, null, 0))
                // console.log(a)
                a.download = "file" + Math.floor(Math.random() * 100) + ".ald"
                a.click();
            })
            window.addEventListener('loadBoard', (e) => {
                // console.log(e.detail);
                this.canvaslist.forEach((canv, index) => {
                    let img = document.createElement("img");
                    img.src = e.detail[index]

                    canv.getContext('2d').clearRect(0, 0, canv.width, canv.height)
                    setTimeout(() => {
                        canv.getContext('2d').drawImage(img, 0, 0)
                    }, 10);
                })

            })
            this.handlemouse = new HandleMouse(this.mainNode)

            this.mainNode.onmousedown = (ev) => {
                // console.log(this.handlemouse.targetList)
                ev.preventDefault();
                this.handlemouse.moved = false;
                if (ev.button == 0) {
                    this.handlemouse.clicked = true;
                    // console.log(ev)
                    // console.log("start")
                    this.handlemouse.startx = ev.pageX
                    this.handlemouse.starty = ev.pageY
                    this.handlemouse.b.style.width = 0;
                    this.handlemouse.b.style.height = 0;
                    this.handlemouse.createB();
                }
            }
            ////

        }

        this.init();

    }
    init = () => {
        this.mainNode.style.width = 58 * this.colums + "px";
        this.mainNode.style.height = 30 * this.rows + "px";
        for (let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.colums; y++) {
                this.createCanvasBlock(x, y);
            }
        }
        if (this.menu) {
            this.handlemouse.list = this.canvaslist;
        }
        this.parentNode.appendChild(this.mainNode);
    }
    createCanvasBlock = (row, colum) => {
        let canvas = document.createElement("canvas");
        canvas.classList.add("standard");
        canvas.style.top = (row * 30) + "px";
        canvas.style.left = (colum * 58) + "px";
        canvas.draggable = false;

        canvas.onmouseenter = (ev) => {
            ev.target.style.borderColor = "red";
            if (EDATA.targetList.indexOf(ev.target) != -1) {
                if (EDATA.Delete) {
                    EDATA.targetList.splice(EDATA.targetList.indexOf(target), 1)
                }
            }
        }

        canvas.onmouseleave = (ev) => {
            if (EDATA.targetList.indexOf(ev.target) == -1)
                ev.target.style.borderColor = null;
        }
        canvas.onmousedown = this.handleClick;
        canvas.oncontextmenu = this.handleMenu;
        this.canvaslist.push(canvas);
        this.mainNode.appendChild(canvas);
    }

    handleClick = (ev) => {
        // ev.stopPropagation();
        // ev.preventDefault();
        if (!this.insertPlane)
            this.handleBlocks(ev.target)
        else {
            this.handlemouse.cs = [ev.target]
            this.handlemouse.clicked = true;
        }
        this.update()
    }
    handleMenu = (ev) => {
        ev.preventDefault();
        // console.log(EDATA.targetList)
        // console.log(ev)
        if (this.menu) {
            // console.log("MNNIU")
            this.menu.nodeMenu.style.left = ev.clientX + "px"
            this.menu.nodeMenu.style.top = ev.clientY + "px"
            this.menu.nodeMenu.style.display = null;
        }
    }
    handleBlocks = (target) => {
        // this.handlemouse.
        if (EDATA.targetList.length > 0) {
            let doZpisu = new Array();
            EDATA.targetList.forEach(trgt => {
                // console.log(target)
                // doZpisu.push()
                doZpisu.push(trgt.toDataURL("png"))
                trgt.getContext('2d').drawImage(target, 0, 0)

            })
            EDATA.previus = [{ canvs: [...EDATA.targetList], data: [...doZpisu] }, ...EDATA.previus]
            EDATA.next = [];
            console.log(EDATA.previus)
            EDATA.targetList = [];
            this.plansza.update();
        }
    }

    update = () => {
        if (this.menu) {
            this.menu.nodeMenu.style.display = "none";
        }

        this.canvaslist.forEach(elm => {
            if (EDATA.targetList.indexOf(elm) != -1) {
                elm.style.borderColor = "red";
                // console.log(elm)
            }
            else {
                elm.style.borderColor = null;
            }
        })
        if (EDATA.targetList.length > 0) {
            EDATA.selected = true;
        } else {
            EDATA.selected = false;
        }

    }
}