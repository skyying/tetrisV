import "./style.css";
import {
    playground,
    player,
    cns
} from "./element.js";

const drawTetris = () => {
    //background
    cns.drawRect("#eeeeee", 0, 0, cns.width, cns.height);
    cns.draw(player);
    cns.draw(playground);
};

const drop = () => {
    player.pos.y++;
    let hit = playground.isHit(player);
    if (hit.y) {
        player.pos.y--;
        playground.merge(player);
        playground.sweep();
    }
};


const move = (dir) => {
    player.pos.x += dir;
    let hit = playground.isHit(player).x;
    if (hit) {
        player.pos.x -= dir;
    }
};


const rotate = (dir) => {
    player.rotate(dir);
    while(playground.isHit(player).x){
        if(player.pos.x > 0){
            player.pos.x--; 
        }else{
            player.pos.x++; 
        }
    }
}



let start = new Date().getTime();
const update = () => {
    let current = new Date().getTime(),
        dt = current - start,
        delay = 1000;
    if (dt >= delay) {
        drop();
        start = new Date().getTime();
    }
    drawTetris();
    requestAnimationFrame(update);
};
update();

// 



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
        //
    } else if (e.code === "KeyP") {
        //
    } else if (e.code === "KeyS") {
        //
    }
});
