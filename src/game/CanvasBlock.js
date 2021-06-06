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
            window.addEventListener('clearBoard', () => {
                EDATA.targetList.forEach(target => {
                    target.getContext('2d').clearRect(0, 0, 60 * 5, 32 * 5)
                })
                EDATA.targetList = [];
                // console.log("update!")
                this.update();
            }, false)
            window.addEventListener('update', () => {
                this.update();
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
        console.log(ev)
        if (this.menu) {
            // console.log("MNNIU")
            this.menu.nodeMenu.style.left = ev.clientX + "px"
            this.menu.nodeMenu.style.top = ev.clientY + "px"
            this.menu.nodeMenu.style.display = null;
        }
    }
    handleBlocks = (target) => {
        // this.handlemouse.
        EDATA.targetList.forEach(trgt => {
            // console.log(target)
            trgt.getContext('2d').drawImage(target, 0, 0)
        })
        EDATA.targetList = [];
        this.plansza.update();


    }
    handleBoard = (target) => {
        // console.log(target, this.canvaslist.indexOf(target));

        // if (this.handlemouse.cs.length < 0)
        //     if (EDATA.ControlLeft) {
        //         if (EDATA.targetList.indexOf(target) == -1) EDATA.targetList = [...EDATA.targetList, target]
        //         else EDATA.targetList.splice(EDATA.targetList.indexOf(target), 1)
        //     } else {
        //         if (EDATA.targetList.indexOf(target) == -1)
        //             EDATA.targetList = [target];
        //         else
        //             EDATA.targetList = [];
        //     }
        // console.log(EDATA.targetList)

        // console.log(EDATA.targetList)
        // target.style. = ""
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