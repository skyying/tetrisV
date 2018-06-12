// a Arean class to control/detect pieces

export default class Arean {
    constructor(col, row) {
        this.row = row,
        this.col = col,
        this.pos = {
            x: 0,
            y: 0
        };
        this.empty = 0,
        this.matrix = this.create();
        this.over = false;
        this.scoreBoard = {
            total: 0,
            totalLine: 0,
            currentSweepLines: 0
        };
        this.scoreRule = {
            scorePerLine: 100,
            combo : 1.5
        };
    }
    create() {
        return Array.from({ length: this.row })
            .map(row => Array.from({ length: this.col })
            .fill(this.empty));
    }
    reset() {
        this.matrix = this.create();
        this.over = false;
        this.pos = {
            x: 0,
            y: 0
        };
        this.scoreBoard = {
            total : 0,
            line: 0,
            currentSweepLines: 0
        };
    }
    updateScore(){
        let combo = this.scoreBoard.currentSweepLines > 1 ? Math.pow(this.scoreRule.combo, this.scoreBoard.currentSweepLines) : this.scoreRule.combo; 
        this.scoreBoard.total += Math.floor(this.scoreRule.scorePerLine * this.scoreBoard.currentSweepLines * combo);
        this.scoreBoard.totalLine += this.currentSweepLines;
        this.currentSweepLines = 0;
    }
    sweep(piece) {
        this.scoreBoard.currentSweepLines = 0;
        let len = this.matrix[0].length;
        for (let i = piece.pos.y; i < piece.pos.y + piece.matrix.length; i++) {
            if (i >= 0) {
                if (i < this.matrix.length && this.matrix[i].indexOf(0) === -1) {
                    this.scoreBoard.currentSweepLines++;
                    this.matrix.splice(i, 1);
                    this.matrix.unshift(Array.from({
                        length: len
                    }).fill(0));
                }
            }
        }
    }
    merge(piece) {
        piece.matrix.forEach((row, y) => {
            row.forEach((val, x) => {
                if (val !== 0) {
                    try {
                        this.matrix[piece.pos.y + y][piece.pos.x + x] = val;
                    } catch (err) {
                        this.over = true;
                        return;
                    }
                }
            });
        });
    }
    isHit(piece) {
        let m = piece.matrix;
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {

                let aY = piece.pos.y + y,
                    aX = piece.pos.x + x,
                    isPieceXOutOfBounds = aX < 0 || aX > this.matrix[y].length - 1,
                    isPieceYOutOfBounds = aY >= this.matrix.length,
                    isPieceFill = m[y][x] !== 0,
                    isArenaFill = this.matrix[aY] && this.matrix[aY][aX] !== 0;

                if (isPieceFill && isPieceXOutOfBounds) {
                    return {
                        x: true,
                        y: false,
                        any: true
                    };
                }
                if (isPieceFill && (isArenaFill || isPieceYOutOfBounds)) {
                    return {
                        x: false,
                        y: true,
                        any: true
                    };
                }
            }
        }
        return {
            x: false,
            y: false,
            any: false
        };
    }
}
