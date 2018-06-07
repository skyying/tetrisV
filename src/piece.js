import { pieces } from "./pieces.js";

export default class Piece {
    constructor() {
        this.pos = {
            x: 0,
            y: 0
        };
        this.hint = {
            pos: this.pos,
            matrix: this.matrix,
        };

        this.matrix = this.getRandomPiece();
    }
    getRandomPiece() {
        let pieceList = Object.keys(pieces),
            i = Math.floor(Math.random() * pieceList.length) || 0;
        return pieces[Object.keys(pieces)[i]];
    }
    setPos(x, y){
        this.pos.x = x;
        this.pos.y = y;
    }
    reset() {
        this.pos = {
            x: 0,
            y: 0
        };
        this.hint.pos = this.pos;
        this.matrix = this.getRandomPiece();
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
            } // end of for loop
        }
    }
}


