import Position from "./position";

export class Snake {
    body: Position[];
    constructor(initHeadPosition: Position = null) {
        this.body = initHeadPosition? [initHeadPosition] : [];
    }
    getHead(): Position {
        if(this.body.length == 0) return null;
        return { ...this.body[0] };
    }

    getBody():Position[]{
        return [...this.body];
    }

    setHeadPosition(position: Position){
        this.body[0] = position;
    }
}
