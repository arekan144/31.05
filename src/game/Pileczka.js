export default class Plieczka {
    constructor() {
        this.x = (840 - 130 - 8) / 2;
        this.y = 902 - 162;
        this.pos = { left: 1268, top: 900, width: 16, height: 16 };
        this.vector = { x: 1, y: -1 }
        this.spd = 2;
        this.odbity = false;
        // { x: 1, y: -1 } prawo-góra
        // { x: 1, y: 1 } prawo-dół
        // { x: -1, y: -1 } lewo-góra
        // { x: -1, y: 1 } lewo-dół
    }
    update() {
        this.x += this.vector.x * this.spd;
        this.y += this.vector.y * this.spd;
    }
}