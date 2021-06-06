"use strict";
import EDATA from "./edata.js"
export default class Keyboard {
    constructor(evn) {
        window.onkeydown = this.handleKeyDown
        window.onkeyup = this.handleKeyUp
        this.evn = evn
        // window.addEventListener('clearBoard', function () {
        //     console.log("xd")
        // }, false)
    }
    handleKeyDown = (ev) => {
        // console.log(ev.code)

        switch (ev.key) {
            case "Control": case "Meta":
                EDATA.ControlLeft = true;
                break;
            case "Shift":
                EDATA.ShiftLeft = true;
                break;
            case "Delete": case "Backspace":
                if (!EDATA.Delete) {
                    EDATA.Delete = true;
                    window.dispatchEvent(this.evn)
                }
                break;
        }

    }
    handleKeyUp = (ev) => {

        // console.log(ev)
        switch (ev.key) {
            case "Control": case "Meta":
                EDATA.ControlLeft = false;
                break;
            case "Shift":
                EDATA.ShiftLeft = false;
                break;
            case "Delete": case "Backspace":
                EDATA.Delete = false;
                break;

        }

    }

}