import "./style.css";
import {
    playground,
    player,
    cns,
    playerHint 
} from "./element.js";



const drawTetris = () => {
    //background
    cns.drawRect("#eeeeee", 0, 0, cns.width, cns.height);
    cns.draw(player);
    cns.draw(playground);
    playerHint.dropHint(player, playground);
    cns.draw(playerHint);
};

const drop = () => {
    player.pos.y++;
    if(playground.isHit(player).y) {
        player.pos.y--;
        clean(player);
    }
};

const clean = (piece) => {
    playground.merge(piece);
    playground.sweep(piece);
    piece.reset();
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
    clean(player);
    // player.updateHit(playground);
};

const gameOver = (piece) => {
    return playground.isHit(piece).y && piece.pos.y === 0;
};

let start = new Date().getTime();
const update = () => {
    let current = new Date().getTime(),
        dt = current - start,
        delay = 1000;
    if (dt >= delay ) {
        drop();
        start = new Date().getTime();
    }
    drawTetris();
    requestAnimationFrame(update);
};
update();


document.addEventListener("keydown", e => {
    if (e.code === "ArrowLeft" || e.code === "KeyH") {
        move(-1);
    } else if (e.code === "ArrowRight" || e.code === "KeyL") {
        move(1);
    } else if (e.code === "ArrowDown" || e.code === "KeyJ") {
        drop();
    } else if (e.code === "ArrowUp" || e.code === "KeyK") {
        rotate(1);
    } else if (e.code === "Space") {
        speedyDrop();
    }
    //} else if (e.code === "KeyP") {
    //    //
    //} else if (e.code === "KeyS") {
    //    //
    //}
});
