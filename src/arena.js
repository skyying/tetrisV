
// a Arean class to control/detect pieces

export default class Arean {
    constructor(col, row) {
        this.row = row,
        this.col = col,
        this.pos = {
            x:0,
            y:0
        }
        this.empty = 0,
        this.matrix = this.create();
    }
    create() {
        return Array.from({length: this.row})
            .map( row => Array.from({length:this.col}).fill(this.empty));
    }
    reset(){
        this.matrix = this.create();
    }
    sweep(){
        let len = this.matrix[0].length;
        for(let i = 0; i < this.matrix.length; i++){
            if(this.matrix[i].every((val) => val !== this.empty )){
                this.matrix.splice(i, 1);
                this.matrix.unshift(Array.from({length:len}).fill(this.empty));
            }
        }
    }
    merge(piece){
        for(let y = 0; y < piece.matrix.length; y++){
            for(let x = 0; x < piece.matrix[y].length; x++){
                this.matrix[piece.pos.y + y][piece.pos.x + x] = piece.matrix[y][x];
            }
        }
    }
    isHit(piece){
        let m = piece.matrix;
        for(let y = 0; y < m.length; y++){
            for(let x = 0; x < m[y].length; x++){

                let aY = piece.pos.y + y,
                    aX = piece.pos.x + x,
                    isPieceXOutOfBounds = aX < 0 || aX > this.matrix[y].length - 1,
                    isPieceYOutOfBounds = aY >= this.matrix.length,
                    isPieceFill = m[y][x] !== 0,
                    isArenaFill = this.matrix[aY] && this.matrix[aY][aX] !== 0;

                if( isPieceFill && isPieceXOutOfBounds ){
                    return {x:true, y: false, any: true};
                }
                if(isPieceFill && (isArenaFill || isPieceYOutOfBounds)){
                    return {x:false, y: true, any: true};
                }
            }
        }
        return {x: false, y: false, any: false};
    }
}





