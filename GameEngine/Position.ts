export class Position {
    x: number
    y: number
    constructor(pos?:{x:number, y:number}) {
        this.x = pos?.x || 0
        this.y = pos?.y || 0
    }
    add(pos:Position) {
        let x = this.x + pos.x;
        let y = this.y + pos.y;
        return new Position({x, y})
    }
    inBox(box:Box) {
        if (this.x < box.x) return false;
        if (this.x > box.x + box.width) return false;

        if (this.y < box.y) return false;
        if (this.y > box.y + box.height) return false;

        return true;
    }
    copy() {
        return new Position({x:this.x, y:this.y})
    }
    getDistanceToLine(A:Position, B:Position) {
        let C = this;
        let numerator = Math.abs((B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x))
        let denominator = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))
        return numerator / denominator;
    }
    getDistance(pos:Position) {
        return Math.sqrt(Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2))
    }
}

export class Box {
    x:number
    y:number
    width:number
    height:number
    constructor(box:{
        x:number,
        y:number,
        width:number,
        height:number
    }) {
        this.x = box.x;
        this.y = box.y;
        this.width = box.width;
        this.height = box.height;
    }
    getPoints():Position[] {
        return [
            new Position({x:this.x, y:this.y}),
            new Position({x:this.x+this.width, y:this.y}),
            new Position({x:this.x+this.width, y:this.y+this.height}),
            new Position({x:this.x, y:this.y+this.height}),
        ]
    }
    colliding(box:Box):{
        colliding:boolean, //overlapping
        side?:"left"|"right"|"top"|"bottom"
    } {
        //boundb == this;
        //innerb == box
        if (this.x > box.x + box.width) return {colliding:false, side:"right"}; //right
        if (box.x > this.x + this.width) return {colliding:false, side:"left"}; //left
        if (this.y > box.y + box.height) return {colliding:false, side:"bottom"}; //bottom
        if (box.y > this.y + this.height) return {colliding:false, side:"top"}; //top
        
        return {colliding:true}
    }
}