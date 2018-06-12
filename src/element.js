import { SIZE } from "./size.js";
import Arena from "./arena.js";
import Piece from "./piece.js";
import CanvasTool from "./canvas.js";
import Hint from "./hint.js";
import infoImg from "./img/info.png";

// dom element
const canvas = document.getElementById("canvas");
const info = document.getElementById("info");


// objects
export const playground = new Arena(SIZE.ARENA_WIDTH, SIZE.ARENA_HEIGHT);
export const player = new Piece();
export const cns = new CanvasTool(canvas, SIZE.ARENA_HEIGHT * SIZE.SCALER, SIZE.ARENA_WIDTH * SIZE.SCALER);
export const playerHint = new Hint(player);
