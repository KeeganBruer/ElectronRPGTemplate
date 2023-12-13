import { GameEngine } from "../";

export class GameObject {
    engine:GameEngine
    position:{x:number, y:number} = {x:0, y:0};
    constructor(engine:GameEngine) {
        this.engine = engine
    }
    update() {
    }
    render(ctx:CanvasRenderingContext2D) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, 100, 100)
    }
}