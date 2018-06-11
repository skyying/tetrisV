import {
    pieces
} from "./pieces.js";
import {
    SIZE
} from "./size.js";
export default class Piece {
    constructor() {
        this.matrix = this.getRandomPiece();
        this.pos = this.resetPos();
    }
    getRandomPiece() {
        let pieceList = Object.keys(pieces),
            i = Math.floor(Math.random() * pieceList.length) || 0;
        return pieces[Object.keys(pieces)[i]];
    }
    getDefaultY(){
        for(let i = this.matrix.length - 1; i >= 0 ; i--){
            if(this.matrix[i].some((x) => x > 0)) {
                return 0 - (i + 1); 
            }
        } 
    }
    resetPos() {
        return {
            x: Math.floor((SIZE.ARENA_WIDTH - this.matrix.length) / 2),
            y: this.getDefaultY()
        };
    }
    reset() {
        this.matrix = this.getRandomPiece();
        this.pos = this.resetPos();
    }
    rotate(direction) {
        // counterClockwise : -1, clockWise : 1
        let len = this.matrix.length,
            layerCount = Math.floor(len / 2);

        for (let i = 0; i < layerCount; i++) {

            let first = i,
                last = this.matrix.length - first - 1;

            for (let j = first; j < last; j++) {

                let offset = j - first,
                    topElement = this.matrix[first][j],
                    rightElement = this.matrix[j][last],
                    bottomElement = this.matrix[last][last - offset],
                    leftElement = this.matrix[last - offset][first];

                this.matrix[j][last] = direction > 0 ? topElement : bottomElement;
                this.matrix[last][last - offset] = direction > 0 ? rightElement : leftElement;
                this.matrix[last - offset][first] = direction > 0 ? bottomElement : topElement;
                this.matrix[first][j] = direction > 0 ? leftElement : rightElement;
            }
        }
    }

}


// module.exports = Piece;
