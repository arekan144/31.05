"use strict";

import Plieczka from "./Pileczka.js";

export default class Playarea {
    constructor(parentNode) {
        this.parentNode = parentNode;
        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("playarea")
        this.canvas.draggable = false;
        // 14, 30, -- 8, 4
        this.canvas.width = 14 * 60
        this.canvas.height = 30 * 32
        this.parentNode.append(this.canvas)
        // console.log("??")
        this.context = this.canvas.getContext('2d')
        this.data = null;
        this.move = {
            left: false,
            right: false,
        }
        this.elemnty = [];
        this.gracz = { x: (840 - 186 - 55) / 2, y: 922 - 152, pos: { left: 1082, top: 954, width: 110, height: 26 } }
        this.pileczka = new Plieczka()
    }
    clearBackground(palet) {
        this.palet = palet;
        // console.log(palet)

        this.context.drawImage(
            this.palet.mainImage,
            this.palet.AROUND.left * this.palet.mnoznik,
            this.palet.AROUND.top * this.palet.mnoznik,
            this.palet.AROUNDP.width * this.palet.mnoznik,
            this.palet.AROUNDP.height * this.palet.mnoznik,
            0,
            0,
            this.canvas.width,
            this.canvas.height)

        this.context.drawImage(
            this.palet.mainImage,
            this.palet.BACKGROUND[4].left * this.palet.mnoznik,
            this.palet.BACKGROUND[4].top * this.palet.mnoznik,
            this.palet.BACKGROUNDP.width * this.palet.mnoznik,
            this.palet.BACKGROUNDP.height * this.palet.mnoznik,
            64,
            172,
            this.canvas.width - 117,
            this.canvas.height - 160)


    }
    putOnPage() {
        let input = document.createElement("input")
        input.type = "file";
        this.data = new Promise((resolve, reject) => {
            window.addEventListener('loadeddata', (e) => {
                this.click.remove();
                resolve(this.data = e.detail);
            })

        })
        // button.click();
        input.onchange = (e) => {
            var file = e.target.files[0];
            let filereader = new FileReader();
            filereader.readAsText(file);
            filereader.onload = () => {
                let data = JSON.parse(filereader.result);
                const LoadBoard = new CustomEvent("loadeddata", { "detail": data });
                window.dispatchEvent(LoadBoard)
            }
        }

        this.click = document.createElement("button")
        this.click.innerHTML = "Załaduj plik"
        this.click.onclick = () => {
            input.click();
        }
        this.parentNode.append(this.click)
        this.handleKeyboard();

    }
    init() {
        let empty = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC"
        let x = 0;
        console.log("init")
        this.data.forEach((d, index) => {
            if (d != empty) {
                let img = document.createElement("img");
                img.src = d;
                this.elemnty.push({
                    img: img,
                    poz: { x: index % 14, y: Math.floor(index / 14) },
                    sha: { x: index % 14 + 0.2, y: Math.floor(index / 14) + 0.2 }
                })
            }
        });

    }
    handleKeyboard() {
        window.onkeydown = (e) => {
            switch (e.code) {
                case "KeyA": case "ArrowLeft":
                    this.move.left = true;
                    break;
                case "KeyD": case "ArrowRight":
                    this.move.right = true;
                    break;
            }
        }
        window.onkeyup = (e) => {
            switch (e.code) {
                case "KeyA": case "ArrowLeft":
                    this.move.left = false;
                    break;
                case "KeyD": case "ArrowRight":
                    this.move.right = false;
                    break;
            }
        }
    }


    update(time) {
        // console.log("frame", time)
        this.context.fillRect(
            64,
            172,
            this.canvas.width - 117,
            this.canvas.height - 160
        )
        this.context.drawImage(
            this.palet.mainImage,
            this.palet.AROUND.left * this.palet.mnoznik,
            this.palet.AROUND.top * this.palet.mnoznik,
            this.palet.AROUNDP.width * this.palet.mnoznik,
            this.palet.AROUNDP.height * this.palet.mnoznik,
            0,
            0,
            this.canvas.width,
            this.canvas.height)

        this.context.drawImage(
            this.palet.mainImage,
            this.palet.BACKGROUND[4].left * this.palet.mnoznik,
            this.palet.BACKGROUND[4].top * this.palet.mnoznik,
            this.palet.BACKGROUNDP.width * this.palet.mnoznik,
            this.palet.BACKGROUNDP.height * this.palet.mnoznik,
            64,
            172,
            this.canvas.width - 117,
            this.canvas.height - 160)

        this.context.fillStyle = "rgba(0,0,0,0.5)";
        this.context.beginPath()
        this.elemnty.forEach(el => {
            if (el.poz.x != 13) {
                // console.log("ot", el.sha)
                this.context.rect(
                    60 + Math.floor(el.sha.x * 52),
                    162 + Math.floor(el.sha.y * 29),
                    50,
                    28
                )
            } else {
                // console.log("it", el.sha)
                // this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
                this.context.rect(
                    60 + Math.floor(el.sha.x * 52),
                    162 + Math.floor(el.sha.y * 29),
                    40,
                    29
                )
            }
        })
        // this.context.rect(60 + this.gracz.x, 152 + this.gracz.y, this.gracz.pos.width, this.gracz.pos.height)


        this.context.fill();
        // this.context.fillStyle = "rgba(0,0,0,1)";
        this.elemnty.forEach(el => {
            this.context.drawImage(
                el.img,
                0, //source x,
                0, //source y,
                el.img.width, //source width,
                el.img.height, //source height,
                60 + el.poz.x * 52, //na canvasie x
                162 + el.poz.y * 29, //na canvasie y
                52, //na canvasie width
                29 // na canvasie heigth
            )
        })
        this.context.drawImage(
            this.palet.mainImage,
            this.pileczka.pos.left,
            this.pileczka.pos.top,
            this.pileczka.pos.width,
            this.pileczka.pos.height,
            60 + this.pileczka.x,
            162 + this.pileczka.y,
            this.pileczka.pos.width,
            this.pileczka.pos.height,
        )

        this.context.drawImage(
            this.palet.mainImage,
            this.gracz.pos.left,
            this.gracz.pos.top,
            this.gracz.pos.width,
            this.gracz.pos.height,
            60 + this.gracz.x,
            152 + this.gracz.y,
            this.gracz.pos.width,
            this.gracz.pos.height,
        )
        if ((this.move.left || this.move.right) && (this.move.left ^ this.move.right)) {
            this.gracz.x += 6 - 12 * this.move.left;
            if ((this.gracz.x <= -5) || (this.gracz.x + this.gracz.pos.width >= this.canvas.width - 115)) {
                this.gracz.x -= 6 - 12 * this.move.left;
            }
        }

        this.pileczka.update();
        if (this.pileczka.x + this.pileczka.pos.width >= this.canvas.width - 110 || this.pileczka.x <= 0) {
            // console.log(this.pileczka.x)
            this.pileczka.vector.x *= -1;
        }
        if (this.pileczka.y <= 0) {
            // console.log(this.pileczka.y)
            this.pileczka.vector.y *= -1;
        }
        // console.log(this.pileczka.x, this.pileczka.y, this.gracz.x, this.gracz.x + this.gracz.pos.width)

        this.elemnty.forEach((el, index) => {
            //poz: { x: index % 14, y: Math.floor(index / 14) },
            //  el.poz.x * 52, el.poz.y * 29
            let elpoz = {
                x: el.poz.x * 52, y: el.poz.y * 29,
                width: 52, height: 29,
            }
            let pipoz = {
                x: this.pileczka.x, y: this.pileczka.y,
                width: this.pileczka.pos.width, height: this.pileczka.pos.height,
            }
            if (pipoz.x < elpoz.x + elpoz.width
                && pipoz.x + pipoz.width > elpoz.x
                && pipoz.y < elpoz.y + elpoz.height
                && pipoz.y + pipoz.height > elpoz.y
            ) {

                if (
                    pipoz.x + pipoz.width <= elpoz.x + elpoz.width && pipoz.x >= elpoz.x
                ) {
                    // while (pipoz.x < elpoz.x + elpoz.width
                    //     && pipoz.x + pipoz.width > elpoz.x
                    //     && pipoz.y < elpoz.y + elpoz.height
                    //     && pipoz.y + pipoz.height > elpoz.y) {
                    //     this.pileczka.x += this.pileczka.spd / 100 * (this.pileczka.vector.x * -1)
                    //     this.pileczka.y += this.pileczka.spd / 100 * (this.pileczka.vector.y * -1)
                    //     pipoz = {
                    //         x: this.pileczka.x, y: this.pileczka.y,
                    //         width: this.pileczka.pos.width, height: this.pileczka.pos.height,
                    //     }
                    // }

                    this.pileczka.vector.y *= -1
                    this.elemnty.splice(index, 1)
                }
                if (
                    pipoz.y + pipoz.height <= elpoz.y + elpoz.height && pipoz.y >= elpoz.y
                ) {
                    // while (pipoz.x < elpoz.x + elpoz.width
                    //     && pipoz.x + pipoz.width > elpoz.x
                    //     && pipoz.y < elpoz.y + elpoz.height
                    //     && pipoz.y + pipoz.height > elpoz.y) {
                    //     this.pileczka.x += this.pileczka.spd / 100 * (this.pileczka.vector.x * -1)
                    //     this.pileczka.y += this.pileczka.spd / 100 * (this.pileczka.vector.y * -1)
                    //     pipoz = {
                    //         x: this.pileczka.x, y: this.pileczka.y,
                    //         width: this.pileczka.pos.width, height: this.pileczka.pos.height,
                    //     }
                    // }
                    this.pileczka.vector.x *= -1
                    this.elemnty.splice(index, 1)
                }
                // console.log("kolizja: id:" + index)
                // this.elemnty.splice(index, 1)
            }


        })

        if (!this.pileczka.odbity
            && this.pileczka.y + this.pileczka.pos.height >= this.gracz.y
            && this.pileczka.y < this.gracz.y + this.gracz.pos.height / 4
            && this.pileczka.x >= this.gracz.x
            && this.pileczka.x < this.gracz.x + this.gracz.pos.width
        ) {
            this.pileczka.vector.y *= -1;
            this.pileczka.odbity = true;
            setTimeout(() => {
                this.pileczka.odbity = false;
            }, 500)
            // if ( //niby ok, ale to okazuje się trochę lepsze
            //     this.pileczka.x + this.pileczka.pos.width <= this.gracz.x + this.gracz.pos.width && this.pileczka.x >= this.gracz.x
            // ) {
            //     this.pileczka.vector.y *= -1;
            //     this.pileczka.odbity = true;
            //     setTimeout(() => {
            //         this.pileczka.odbity = false;
            //     }, 500)
            // }
            // if (
            //     this.pileczka.y + this.pileczka.pos.height <= elpoz.y + elpoz.height && pipoz.y >= elpoz.y
            // ) {
            //     this.pileczka.vector.x *= -1;
            //     this.pileczka.odbity = true;
            //     setTimeout(() => {
            //         this.pileczka.odbity = false;
            //     }, 500)
            // }
        }
        window.requestAnimationFrame((t) => this.update(t))
    }
}