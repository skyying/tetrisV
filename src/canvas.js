import { SIZE } from "./size.js";
import Piece from "./piece.js";
import Arean from "./arena.js";
import { THEME } from "./theme.js";

export default class CanvasTool {
    constructor(parent, width, height){
        this.parent = parent;
        this.ctx = this.init(width, height);
        this.drawRect("black", [0, 0, width, height]);
        this.ctx.scale(SIZE.SCALER, SIZE.SCALER);
    }
    init(w, h){
        let c = document.createElement("canvas");
        c.height = w;
        c.width = h; 
        this.parent.appendChild(c);
        return c.getContext("2d");
    }
    drawRect(color, attr){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(...attr);
    }
    draw(piece){
        for(let y = 0; y < piece.matrix; y++){
            for(let x = 0; x < piece.matrix[y]; x++){
                let val = piece.matrix[y][x];
                if( val !== piece.empty ){
                    let attr = [ x + (piece.pos.x || 0) , y + (piece.pos.y || 0), 1, 1];
                    this.drawRect("yellow", attr);
                }
            }
        }
    }
}



