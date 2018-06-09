import {
    pieces
} from "./pieces.js";
import {
    SIZE
} from "./size.js";
export default class Piece {
    constructor() {
        this.pos = {
            x: 0,
            y: 0
        };
        this.matrix = this.getRandomPiece();
        this.hint = {
            pos: this.pos,
            matrix : []
        };
        // this.setHintMatrix();
        this.resetPos();
        // this.updateHint(arena);
    }
    // setHintMatrix(){
    //     this.hint.matrix = this.matrix.slice();
    //     for(let i = 0; i < this.hint.matrix.length; i++){
    //         for(let j = 0; j < this.hint.matrix[0].length; j++){
    //             if(this.hint.matrix[i][j] !== 0){
    //                 this.hint.matrix[i][j] = 8; 
    //             }else{
    //                 this.hint.matrix[i][j] = 0;  
    //             }
    //         }
    //     }
    // }
    getRandomPiece() {
        let pieceList = Object.keys(pieces),
            i = Math.floor(Math.random() * pieceList.length) || 0;
        return pieces[Object.keys(pieces)[i]];
    }
    resetPos() {
        this.pos.x = Math.floor(( SIZE.ARENA_WIDTH - this.matrix.length) / 2);
        this.pos.y = 0;
    }
    // updateHint(arena){
    //     this.hint.pos = this.pos;
    //     console.log("before", this.hint.pos);
        
    //     let self = this.hint;
    //     while(!arena.isHit(self).any){
    //         this.hint.pos.y++; 
    //     } 
    //     this.hint.pos.y--;
    //     while(arena.isHit(self).any){
    //         this.hint.pos.y--; 
    //     }
    //     console.log("after", this.hint.pos);
    // }
    reset() {
        this.matrix = this.getRandomPiece();
        // this.setHintMatrix();
        this.resetPos();
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
        // this.setHintMatrix(); 
    }

}
