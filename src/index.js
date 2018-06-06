import './style.css';
import * as Shape from './shape.js';


let canvas = document.getElementById("tetris");
let action = document.getElementById('action');
let ctx =  canvas.getContext("2d"), scaler = 26 ;

const [AREAN_WIDTH, areanH] = [12, 20];

let [cw, ch] = [AREAN_WIDTH * scaler, areanH * scaler ];

ctx.canvas.width = cw;
ctx.canvas.height = ch;
ctx.fillStyle = "#F7F7F7";
ctx.fillRect(0, 0, cw, ch); 
ctx.scale(scaler, scaler);





function drawMatrix(matrix, offset){
    matrix.forEach((row, y) => {
        row.forEach((val, x)=>{
            if( val !== 0){
                ctx.fillStyle =  Shape.color[val] ;
                ctx.fillRect( x + offset.x,
                    y + offset.y,
                    1, 1);
            }

        });
    });
}


function rotate(matrix, dir){
    // direction :  -1 = coutnerClockwise, 1 = clockwise
    let len = matrix.length;
    let layerCount = Math.floor(len/2);

    for(let i=0; i<layerCount; i++){
        let first = i;
        let last = len - 1 - first;
        for(let j = first; j < last; j++){

            let offset = j - first;

            let topElement = matrix[first][j];
            let rightElement = matrix[j][last];
            let bottomElement = matrix[last][last-offset];
            let leftElement = matrix[last-offset][first];

            matrix[j][last] = dir > 0 ? topElement : bottomElement;
            matrix[last][last-offset] = dir > 0 ? rightElement : leftElement;
            matrix[last-offset][first] = dir > 0 ? bottomElement : topElement;
            matrix[first][j] = dir > 0 ? leftElement : rightElement;

        } // end of for loop
    }

    return matrix;
}

/*
 * return 1 if x bump 2 if y bump
 */

function destory(player, arena, scoreBoard){
    const [matrix, pos]  = [player.matrix, player.pos];
    let destoryLinesCount = 0;
    for(let Y = pos.y ; Y < pos.y + matrix.length ; Y++){
        if (Y < arena.length && arena[Y].indexOf(0) === -1 ){
            destoryLinesCount++;
            arena.splice(Y, 1) ;
            arena.unshift(Array.from({length:AREAN_WIDTH}).fill(0));
        }
    }

    const comboMultiply =  destoryLinesCount > 1  ? Math.pow(scoreRule.combo, destoryLinesCount)  : 1;
    scoreBoard.total += Math.floor( scoreRule.perLine * destoryLinesCount * comboMultiply);
    scoreBoard.line += destoryLinesCount;
    updateScore(scoreBoard);

}

function isBump(player, arena){
    const [matrix, pos] = [player.matrix, player.pos];

    for( let mY = 0; mY < matrix.length; mY++){
        for(let mX = 0; mX < matrix[mY].length; mX++){
            let aY = pos.y + mY;
            let aX = pos.x + mX;
            let isMatrixVal = matrix[mY][mX] > 0;
            let isArenaVal = arena[aY] && arena[aY][aX] > 0;
            if(isMatrixVal && (aX < 0 || aX > AREAN_WIDTH - 1)){
                return "X";
            }
            if(isMatrixVal && (isArenaVal || aY >= arena.length)) {
                return "Y";

            }
        }
    }
    return false;
}



function merge(player, arena){
    player.matrix.forEach((row, y)=> {
        row.forEach((val, x)=>{
            if(val!==0){
                arena[player.pos.y + y][player.pos.x + x] = val ;
            }
        });
    })
}

function createMatrix(w, h){
    const matrix = Array.from({length:h});
    return matrix.map((m) => Array.from({length:w}).fill(0));
}

function createPlayer(){
    const shape = Object.keys(Shape.matrix);
    let randomIndex = Math.floor(Math.random() * shape.length);
    return Shape.matrix[shape[randomIndex || 0]];
}

function createHint(matrix){
    const hintMatrix = createMatrix(matrix[0].length, matrix.length) ;
    hintMatrix.forEach((row, y) => {
        row.forEach((val , x) => {
            hintMatrix[y][x] = matrix[y][x] > 0 ? (Shape.color.length - 1)  :  0;
        })
    })
    return hintMatrix;
}


function resetPlayer( ){
    const m = createPlayer();
    player.matrix = m;
    player.hint.matrix = createHint(m);
    player.pos.x = Math.floor((AREAN_WIDTH - player.matrix.length) / 2);
    player.hint.pos.x = player.pos.x;
    player.pos.y = 0; 
    player.hint.pos.y = 0;
    updateHintPoistion();
    if(isBump(player, arena)){
        isGameOver = true;
        // isPause = true;
        pause();

    }
}

function resetScoreBorad(){
    scoreBoard.total = 0;
    scoreBoard.line = 0;
    updateScore(scoreBoard);
}

const scoreBoard = {
    total: 0,
    line: 0,
}

const scoreRule = {
    perLine :100,
    combo: 1.5,
}

const arena = createMatrix(AREAN_WIDTH, areanH);

const player = {
    matrix: null,
    pos: {x: 0, y: 0},
    score: 0,
    hint: {
        matrix: null,
        pos: {
            x: 0,
            y: 0,
        }
    }
}


function draw(){
   ctx.fillStyle = "#F7F7F7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(player.hint.matrix, player.hint.pos )
    drawMatrix(player.matrix, player.pos);
    // drawOutline(player.matrix, player.pos);
    drawMatrix(arena, {x: 0, y:0});
}

function playerRotate(dir){
    rotate(player.matrix, dir);
    rotate(player.hint.matrix, dir);
    while(isBump(player, arena)==="X"){
        if(player.pos.x > 0){
            player.pos.x--;
        }else{
            player.pos.x++;
        }
    }
    updateHintPoistion();
}

function playerMove(direction){

    player.pos.x += direction;
    if(isBump(player, arena)){
        player.pos.x -= direction;
    }
    updateHintPoistion();
}

function playerDrop(){
    player.pos.y++;
    console.log(player.pos.y);
    if(isBump(player, arena)){
        player.pos.y--;
        merge(player, arena);
        destory(player, arena, scoreBoard)
        if(!isGameOver) {
            resetPlayer();
        }else{
            pause();
        }
        // player.pos.y = 0;
    }
    dropCount = 0;
}

function fastDrop(){
    while(!isBump(player, arena)){
        player.pos.y++;
    }
    player.pos.y--;
    merge(player, arena);
    destory(player, arena, scoreBoard)
    if(!isGameOver) {
        resetPlayer();
    }else{
        pause();
    }
    // player.pos.y = 0;
    dropCount = 0;
}

function updateHintPoistion(){
    player.hint.pos.x = player.pos.x;
    player.hint.pos.y = 0;
    while( !isBump(player.hint, arena)){
        player.hint.pos.y++;
    }
    player.hint.pos.y--;
    while( isBump(player.hint, arena) === "X" || isBump(player.hint, arena)==="Y"){
        player.hint.pos.y--; 
    }
}

let dropCount = 0;
let dropInterval = 1000;
let lastTime = 0;
let isPause = false;
let isGameOver = false;

function updateScore(scoreBoard){
    let scoreBlock = document.getElementById('score');
    let line = document.getElementById('line');
    scoreBlock.innerHTML = scoreBoard.total;;
    // line.innerHTML = scoreBoard.line;
}
let anim;
function update(time = 0){
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCount += deltaTime;
    if(dropCount > dropInterval){
        playerDrop();

    }
    draw();
    anim = requestAnimationFrame(update);
}

function start(){
    if(!isPause){
        resetPlayer();
    }else if(isGameOver){
        resetPlayer();
        arena.forEach((row, y) =>  row.fill(0));
        resetScoreBorad();
        isPause = false;
        isGameOver = false;
        action.innerHTML = "pause";
    }else{
        ctx.restore();
        isPause = false;
        action.innerHTML = "Pause";
    }
    update();
}

function pause(){
    ctx.save();
    window.cancelAnimationFrame(anim);
    isPause = true;
    action.innerHTML = isGameOver ? "start" : "resume";
}
document.addEventListener('keydown', e => {
    if(!isPause && (e.code === "ArrowLeft" || e.code === "KeyH")){ 
        playerMove(-1);
    }else if( !isPause && (e.code==="ArrowRight"  || e.code === "KeyL" )){
        playerMove(1);
    }else if( !isPause && (e.code === "ArrowDown" || e.code === "KeyJ" )){
        playerDrop();
    }else if(!isPause && (e.code === "ArrowUp" || e.code === "KeyK")){
        playerRotate(1);
    }else if( !isPause && e.code ==="Space"){
        fastDrop();
    }else if(e.code === "KeyP"){
        pause();
    }else if(e.code === "KeyS"){
        start();
    }
})

action.addEventListener('click', function(){
    if(isPause){
        start();
    }else{
        pause();
    }
})

resetPlayer();
// function resizeInstruction(canvas){
//     canvas.width = window.innerWidt//todo
//
//  / initialize的狀態還沒弄好
//  所以一開始按Start會Fail
//     canvas.height = window.innerHeight;
// }
// let b = document.getElementsByTagName('body');
// b.onresize(resizeInstruction(i_canvas));
// start();
//todo
//
// initialize的狀態還沒弄好
// 所以一開始按Start會Fail
//   
