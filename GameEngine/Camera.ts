import { GameEngine } from "./";
import { Level } from "./Levels";

export class Camera {
    engine:GameEngine
    position:{x:number, y:number} = {x:0, y:0};
    target_position:{x:number, y:number} = {x:0, y:0};
    screen: { width: number; height: number; };
    constructor(engine:GameEngine) {
        this.engine = engine;
    }
    setPosition(position?:{x:number, y:number}) {
        if (position == undefined) return;
        this.position = position
    }
    calculateTargetPosition(_level?:Level) {
        const getAveragePlayerPosition = (level:Level)=>{
            let players = level.players;
            let xSum = players.reduce((last, curr)=>{return {sum:last.sum + curr.position.x, count:last.count+1}}, {sum:0, count:0})
            let ySum = players.reduce((last, curr)=>{return {sum:last.sum + curr.position.y, count:last.count+1}}, {sum:0, count:0})
            let x = xSum.sum / xSum.count
            let y = ySum.sum / ySum.count
            x -= this.screen.width / 2
            y -= this.screen.height * (2/3)
            return {x, y}
        }
        if (_level) {
            return getAveragePlayerPosition(_level)
        }
        return this.engine.SavesManager.useLevelManager((levels)=>{
            let level = levels.getCurrentLevel()
            return getAveragePlayerPosition(level);
        })
    }
    update() {
        this.target_position = this.calculateTargetPosition() || this.target_position;
        let camera_speed = 2.5;
        if (this.position.x < this.target_position.x)
            this.position.x += camera_speed
        if (this.position.x > this.target_position.x)
            this.position.x -= camera_speed

        if (this.position.y < this.target_position.y)
            this.position.y += camera_speed
        if (this.position.y > this.target_position.y)
            this.position.y -= camera_speed
    }
    useCameraPosition(ctx:CanvasRenderingContext2D, cb:(ctx:CanvasRenderingContext2D)=>void) {
        ctx.translate(-this.position.x, -this.position.y)
        cb(ctx);
        ctx.translate(this.position.x, this.position.y)

    }
    
}