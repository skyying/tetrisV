import "./img/favicon.ico";
import infoImg from "./img/info.png";
import "./style/style.scss";
import { tetrisBg } from "./theme.js";
import {
    playground,
    player,
    cns,
    playerHint
} from "./element.js";



// load image
const scoreWrapper = document.getElementById("scoreWrapper");
const score = document.getElementById("score");


// add instruction image
const info = document.getElementById("info");
info.src = infoImg;

const clean = () => {
    playground.merge(player);
    playground.sweep(player);
    getScore(score);
    resize();
    player.reset();
    playerHint.update(player);
};


const drawTetris = () => {
    cns.drawRect(tetrisBg, 0, 0, cns.width, cns.height);
    cns.draw(playground);
    playerHint.dropHint(player, playground);
    cns.draw(playerHint);
    cns.draw(player);
};

const drop = (callback) => {
    player.pos.y++;
    if(playground.isHit(player).y) {
        player.pos.y--;
        callback();
    }
};

const getScore = (element) => {
    playground.updateScore();
    element.innerHTML = playground.scoreBoard.total; 
};

const move = (dir) => {
    player.pos.x += dir;
    if (playground.isHit(player).x) {
        player.pos.x -= dir;
    }
    playerHint.dropHint(player, playground);
};

const rotate = (dir) => {
    player.rotate(dir);
    playerHint.rotate(dir);
    while(playground.isHit(player).x){
        if(player.pos.x > 0){
            player.pos.x--; 
        }else{
            player.pos.x++; 
        }
    }
};  

const speedyDrop = () => {
    while(!playground.isHit(player).y){
        player.pos.y++; 
    }
    player.pos.y--;
    clean();
};

let start = new Date().getTime();

const update = () => {
    if(playground.over){
        score.innerHTML = "GAME OVER,<br/> press anykey to start";
        resize();
        return; 
    }

    let current = new Date().getTime(),
        dt = current - start,
        delay = 1000;
    if ( dt >= delay ) {
        drop(clean);
        start = new Date().getTime();
    }

    drawTetris();
    requestAnimationFrame(update);
};

const restart= () => {
    player.reset();  
    score.innerHTML = "";
    playground.reset();
    resize();
    update();
};



const resize = () => {
    let currentSize, step = 2,
        margin = 30,
        letterCount = 10,
        unit = "px",
        defaultFontSize = "50px";

    while ((scoreWrapper.offsetWidth - margin) < score.offsetWidth) {
        currentSize = parseFloat(window.getComputedStyle(score, null).getPropertyValue("font-size"));
        score.style.fontSize = (currentSize - step) + unit;
    }

    if (score.innerHTML.length < letterCount) {
        score.style.fontSize = defaultFontSize;
    }
};



document.addEventListener("keydown", e => {

    if(playground.over){
        restart(); 
    }

    if (e.code === "ArrowLeft" || e.code === "KeyH") {
        move(-1);
    } else if (e.code === "ArrowRight" || e.code === "KeyL") {
        move(1);
    } else if (e.code === "ArrowDown" || e.code === "KeyJ") {
        drop(clean);
    } else if (e.code === "ArrowUp" || e.code === "KeyK") {
        rotate(1);
    } else if (e.code === "Space") {
        speedyDrop();
    }

});



update();
