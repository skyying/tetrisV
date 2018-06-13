import { SIZE } from "./size.js";
import { THEME } from "./theme.js";

export default class CanvasTool {
    constructor(parent, width, height){
        this.parent = parent;
        this.ctx = this.init(width, height);
        this.width = width;
        this.height = height;
        this.drawRect("black", 0, 0, width, height);
        this.ctx.scale(SIZE.SCALER, SIZE.SCALER);
    }
    init(w, h){
        let c = document.createElement("canvas");
        c.height = w;
        c.width = h; 
        this.parent.appendChild(c);
        return c.getContext("2d");
    }
    drawRect(color, x, y, w, h){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, w, h);
    }
    draw(piece){
        for(let y = 0; y < piece.matrix.length; y++){
            for(let x = 0; x < piece.matrix[0].length; x++){
                let val = piece.matrix[y][x];
                if( val !== 0){
                    this.drawRect(THEME[val], piece.pos.x + x, piece.pos.y + y, 1, 1);
                }
            }
        }
    }
}


