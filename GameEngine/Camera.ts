import { GameEngine } from "./";
import { Level } from "./Levels";
import { Position } from "./Position";

export class Camera {
    engine:GameEngine
    position:Position = new Position({x:0, y:0});
    target_position:Position = new Position({x:0, y:0});
    screen: { width: number; height: number; };
    constructor(engine:GameEngine) {
        this.engine = engine;
    }
    setPosition(position?:Position) {
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
            return new Position({x, y})
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
        let distance = this.position.getDistance(this.target_position)
        if (distance < 100) return;
      
        let camera_speed = map(distance, 100, 1000, 0.1, 60)
        console.log(distance, camera_speed)
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

export function clamp(input: number, min: number, max: number): number {
    return input < min ? min : input > max ? max : input;
  }
  
  export function map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    return clamp(mapped, out_min, out_max);
  }