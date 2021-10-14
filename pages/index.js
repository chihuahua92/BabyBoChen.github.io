import { foodma } from "./foodma.js";
import { jQueryHomework } from "./jQuery_homework.js";
import { pairGame } from "./pairGame.js";
import { srtPlayer } from "./srtPlayer.js";
import { stockTw } from "./stock_tw.js";
import { srtPlayerFX } from "./srtPlayerFX.js";
import { kingTut } from "./kingTut.js";
import { eren } from "./eren.js";
import { mikasa } from "./mikasa.js";
import { pwd_manager } from "./pwd_manager.js";
import { haterBoy } from "./haterBoy.js";



/** @type {string} */
const root = window.location.protocol + "//" + window.location.host;

/** @type {HTMLDivElement} */
const main = document.getElementById("main");

function redirect(){
    let rootRe = new RegExp(root);
    let targetPath = window.location.href.replace(rootRe, '').replace("/#!", '').replace('/', '');
    if (targetPath == ""){
        main.innerHTML = "<p>homepage</p>";
    }else if(targetPath == "foodma"){
        main.innerHTML = foodma;
    }else if(targetPath == "jQuery_homework"){
        main.innerHTML = jQueryHomework;
    }else if(targetPath == "pairGame"){
        main.innerHTML = pairGame;
    }else if(targetPath == "srtPlayer"){
        main.innerHTML = srtPlayer;
    }else if(targetPath == "stock_tw"){
        main.innerHTML = stockTw;
    }else if(targetPath == "srtPlayerFX"){
        main.innerHTML = srtPlayerFX;
    }else if(targetPath == "kingTut"){
        main.innerHTML = kingTut;
    }else if(targetPath == "eren"){
        main.innerHTML = eren;
    }else if(targetPath == "mikasa"){
        main.innerHTML = mikasa;
    }else if(targetPath == "pwd_manager"){
        main.innerHTML = pwd_manager;
    }else if(targetPath == "haterBoy"){
        main.innerHTML = haterBoy;
    }
}

window.addEventListener('DOMContentLoaded', (e) => {
    redirect();
});

window.addEventListener('popstate', (e) => {
    redirect();
});

