import Piece from "./piece.js";

export default class Hint extends Piece {
    constructor(owner) {
        super();
        this.matrix = this.getMatrix(owner);
        this.pos = {
            x: owner.pos.x,
            y: owner.pos.y
        };
    }
    update(owner) {
        let n = owner.pos.x;
        this.pos.x = n;
        this.matrix = this.getMatrix(owner);
    }
    getMatrix(owner) {
        let m = Array.from({
            length: owner.matrix.length
        }).fill([]);
        for (let i = 0; i < owner.matrix.length; i++) {
            m[i] = owner.matrix[i].map((val) => val > 0 ? 8 : 0);
        }
        return m;
    }
    //set hint's y position to simulate dropped
    dropHint(owner, arena) {
        let n = owner.pos.x,
            m = owner.pos.y;
        this.pos = {
            x: n,
            y: m
        };
        while (!arena.isHit(this).any) {
            this.pos.y++;
        }
        this.pos.y--;
        while (arena.isHit(this).any) {
            this.pos.y--;
        }
    }
}
