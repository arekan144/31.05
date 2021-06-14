"use strict";

import MainArcanoid from "./game/MainArcanoid.js";

window.onload = () => {
    let root = document.getElementById("root");
    new MainArcanoid.Playfield(root);
}