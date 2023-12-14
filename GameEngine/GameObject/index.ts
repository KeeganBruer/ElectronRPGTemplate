import { GameEngine } from "../";
import { Level } from "../Levels";
import { Position } from "../Position";

export class GameObject {
    id:string
    engine:GameEngine
    level:Level
    position:Position = new Position({x:0, y:0});
    velocity:Position = new Position({x:0, y:0});
    acceleration:Position = new Position({x:0, y:0});
    has_gavity:boolean = false;
    constructor(engine:GameEngine, level:Level) {
        this.id = crypto.randomUUID()
        this.engine = engine
        this.level = level
    }
    update(cb?:Function) {
        this.acceleration = new Position({x:0, y:0});
        if (this.has_gavity == true) {
            this.acceleration.y = 1
        }
        if (cb) cb();
        //physic calculations

        //acceleration 
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        //velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    render(ctx:CanvasRenderingContext2D) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, 100, 100)
    }
}