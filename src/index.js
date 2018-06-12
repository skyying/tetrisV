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
const info = document.getElementById("info");
info.src = infoImg;


// set variable for canvas update
let animation, pause = false;



const drawTetris = () => {
    //background
    cns.drawRect(tetrisBg, 0, 0, cns.width, cns.height);
    cns.draw(player);
    cns.draw(playground);
    playerHint.dropHint(player, playground);
    cns.draw(playerHint);
};

const drop = (cb) => {
    // if(isOver()){
    //     stop();
    // }else{
    player.pos.y++;
    if(playground.isHit(player).y) {
        player.pos.y--;
        cb();
    }
    // }
};




let score = document.getElementById("score");



const isOver = () => {
    let over = playground.over || (player.pos.y === playerHint.pos.y && playerHint.pos.y <= player.getDefaultY());
    if(over){
        console.log("playground.over", playground.over);
        return true;
    }
    return false;
};

const clean = () => {
    playground.merge(player);
    playground.sweep(player);
    player.reset();
    playerHint.update(player);
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
        score.innerHTML = "GAME OVER";
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
    animation = requestAnimationFrame(update);
};


const reStart= () => {
    player.reset();  
    score.innerHTML = ""
    playground.reset();
    update();
};



document.addEventListener("keydown", e => {
    if (e.code === "KeyS"){
        reStart();
    }else if(e.code==="KeyP"){
        stop();
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
    // }
});



update();
