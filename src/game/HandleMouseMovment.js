"use strict";

import EDATA from "./edata.js"

export default class HandleMouse {
    constructor(mainNode, list) {
        this.updateBoard = new Event('update');
        this.mainNode = mainNode;
        this.clicked = false;
        this.b = document.createElement("div");
        this.b.classList.add("blona");
        this.list = null;
        this.init();
        this.test = true;
        this.cs = [];
        this.moved = false;
        // console.log(EDATA.targetList)
    }
    init = () => {
        window.onmousemove = this.handleMouseMove

        window.onmouseup = (ev) => {
            // if (this.moved) {
            // console.log("evi", this.cs, EDATA.targetList)
            this.clicked = false;

            if (EDATA.ControlLeft) {

                // console.log(this.cs[0], this.cs[this.cs.length - 1])
                this.cs.forEach((el, index) => {

                    if (EDATA.targetList.indexOf(el) == -1) {
                        EDATA.targetList.push(el); //add
                    } else { //remove
                        EDATA.targetList.splice(EDATA.targetList.indexOf(el), 1)
                    }
                })

                // console.log(this.cs)
                this.b.remove()
            }
            else {
                EDATA.targetList = [...this.cs]
            }
            // console.log(this.cs)
            this.cs = []
            window.dispatchEvent(this.updateBoard)
            this.moved = false;

        }
    }
    createB = () => {
        // console.log(this.list)
        this.b.style.left = this.startx + "px"
        this.b.style.top = this.starty + "px"
        document.body.appendChild(this.b)
        this.b.onmouseup = (ev) => {
            // console.log("?")
            if (this.clicked) {
                this.clicked = false;
                // console.log(ev.pageX)
                this.b.remove()
            }
        }
        // this.b.onmousemove = this.handleMouseMove
    }
    handleMouseMove = (ev) => {

        if (this.clicked) {

            // console.log(this.cs)
            // console.log(this.b.getBoundingClientRect())
            if (ev.pageX - this.startx >= 0) {
                this.b.style.width = ev.pageX - this.startx + "px"
            }
            else {
                this.b.style.left = ev.pageX + "px";
                this.b.style.width = this.startx - ev.pageX + "px"
            }
            if (ev.clientY - this.starty >= 0) {
                this.b.style.height = ev.clientY - this.starty + ev.view.scrollY + "px"
            } else {
                this.b.style.top = ev.clientY + "px";
                this.b.style.height = this.starty - ev.clientY + ev.view.scrollY + "px"
            }
            this.cs = []
            this.list.forEach((el, index) => {
                // console.log(this.list[15])
                let r1 = el.getBoundingClientRect();
                let r2 = this.b.getBoundingClientRect();
                let test =
                    (r1.bottom >= r2.bottom && r1.bottom - r1.height <= r2.bottom &&
                        r1.left <= r2.left && r1.left + r1.width >= r2.left) ||

                    (r1.top <= r2.top && r1.top + r1.height >= r2.top &&
                        r1.right >= r2.right && r1.right - r1.width <= r2.right) ||

                    (r1.bottom >= r2.bottom && r1.bottom - r1.height <= r2.bottom &&
                        r1.right >= r2.right && r1.right - r1.width <= r2.right) ||

                    (r1.top <= r2.top && r1.top + r1.height >= r2.top &&
                        r1.left <= r2.left && r1.left + r1.width >= r2.left)
                    //punkty

                    || (r2.left >= r1.left && r2.left <= r1.right && r2.top < r1.top && r2.bottom > r1.bottom)
                    || (r2.right <= r1.right && r2.right >= r1.left && r2.top < r1.top && r2.bottom > r1.bottom)
                    //boki lewo + prawo

                    || ((r1.left > r2.left && r1.right < r2.right && r2.top >= r1.top && r2.top <= r1.bottom) ||
                        (r1.left > r2.left && r1.right < r2.right && r2.bottom <= r1.bottom && r2.bottom >= r1.top))
                    //boki góra + dół

                    || (r1.left >= r2.left && r1.top >= r2.top && r1.bottom <= r2.bottom && r1.right <= r2.right ||
                        r1.left <= r2.left && r1.top <= r2.top && r1.bottom >= r2.bottom && r1.right >= r2.right)
                //środek

                if (test && this.cs.indexOf(el) == -1) {
                    // console.log(el)
                    this.cs.push(el)
                }
            })
            // for (let x = 0; x < this.cs.length; x++)
            //     if ()
            // console.log(this.cs[0], this.cs[this.cs.length - 1])
            // console.log(cs)
            // if (EDATA.ControlLeft) {

            //     EDATA.targetList = [...EDATA.targetList, ...cs]
            // }
            // else
            //     EDATA.targetList = [...cs]
            // // console.log(EDATA.targetList)
            // console.log(this.cs)
            window.dispatchEvent(this.updateBoard)
            if (this.cs.length > 1)
                this.cs.forEach(el => {
                    if (el.style.borderColor == "red" && EDATA.ControlLeft)
                        el.style.borderColor = ""
                    else
                        el.style.borderColor = "red"
                })

        }
    }
}