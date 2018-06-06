import { SIZE } from "./size.js";
import Arena from "./arena.js";
import Piece from "./piece.js";
import CanvasTool from "./canvas.js";

// dom element
const main = document.getElementById("main");

// objects
export const playground = new Arena(SIZE.ARENA_WIDTH, SIZE.ARENA_HEIGHT);
export const player = new Piece();
export const cns = new CanvasTool(main, SIZE.ARENA_WIDTH * SIZE.SCALER, SIZE.ARENA_HEIGHT * SIZE.SCALER);
