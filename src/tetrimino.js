import { pieces } from "./piece.js";

export default class Tetrimino {
    constructor() {
        this.pos = {
            x: 0,
            y: 0
        };
        this.hint = {
            pos: this.pos,
            piece: this.piece,
        };

        this.piece = this.getRandomPiece();
    }
    getRandomPiece() {

        let pieceList = Object.keys(pieces),
            i = Math.floor(Math.random() * pieceList.length) || 0;

        return pieces[Object.keys(pieces)[i]];
    }
    reset() {
        this.pos = {
            x: 0,
            y: 0
        };
        this.hint.pos = this.pos;
        this.piece = this.getRandomPiece();
    }
    rotate(direction) {
        // counterClockwise : -1, clockWise : 1
        let len = this.piece.length,
            layerCount = Math.floor(len / 2);

        for (let i = 0; i < layerCount; i++) {

            let first = i,
                last = this.piece.length - first - 1;

            for (let j = first; j < last; j++) {

                let offset = j - first,
                    topElement = this.piece[first][j],
                    rightElement = this.piece[j][last],
                    bottomElement = this.piece[last][last - offset],
                    leftElement = this.piece[last - offset][first];

                this.piece[j][last] = direction > 0 ? topElement : bottomElement;
                this.piece[last][last - offset] = direction > 0 ? rightElement : leftElement;
                this.piece[last - offset][first] = direction > 0 ? bottomElement : topElement;
                this.piece[first][j] = direction > 0 ? leftElement : rightElement;
            } // end of for loop
        }
    }
}

