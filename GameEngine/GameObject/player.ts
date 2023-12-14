import {GameObject} from "./"
import { GameEngine } from "../";
import { Level } from "../Levels";
import CollidableGameObject from "./CollisionBox";
import { Box, Position } from "../Position";
export default class Player extends CollidableGameObject {
    speed:number
    controlled_velocity:Position = new Position()
    constructor(engine:GameEngine, level:Level) {
        super(engine, level, new Box({
            x: 0,
            y: 0,
            width: 100,
            height: 100
        }));
        this.has_gavity = true;
        this.speed = 5;
    }
    update() {
        let previous_pos = this.position.copy()
        super.update(()=>{
            // if (this.engine.KeyboardMouse.keysDown.includes("s")) {
            //     this.position.y += 3
            // }
            if (this.engine.KeyboardMouse.keysDown.includes("w")) {
                this.controlled_velocity.y = -15
            }
            if (this.engine.KeyboardMouse.keysDown.includes("a") && this.velocity.x > -1) {
                this.controlled_velocity.x -= 5
            }
            if (this.engine.KeyboardMouse.keysDown.includes("d") && this.velocity.x < 1) {
                this.controlled_velocity.x += 5
            }
            let future_y_position = this.position.copy().add(new Position({y:this.velocity.y + this.controlled_velocity.y,x:0}))
            let future_x_position = this.position.copy().add(new Position({x:this.velocity.x + this.controlled_velocity.x, y:0}))
            let objects = this.level.GameObjects;
            for (let i = 0; i < objects.length; i++) {
                if (this.id == objects[i].id) continue; //don't check itself
                let check_y = this.isColliding(objects[i], future_y_position);
                let check_x = this.isColliding(objects[i], future_x_position);
                //console.log("Collision for", objects[i].id, check_y?.colliding, check_y?.side)
                if (check_y?.colliding)  {
                    this.acceleration = new Position({x:this.acceleration.x, y:0})
                    this.velocity = new Position({x:this.velocity.x, y:0})
                    if (this.velocity.x != 0) {
                        if (Math.abs(this.velocity.x) > 0.1)  {
                            let dir = this.velocity.x / Math.abs(this.velocity.x)
                            this.velocity.x -= dir * 0.1
                            //console.log("slow down velocity", dir) 
                        } else this.velocity.x = 0;

                    }
                    return false;
                }
                if (check_x?.colliding)  {
                    this.acceleration = new Position({y:this.acceleration.y, x:0})
                    this.velocity = new Position({y:this.velocity.y, x:0})
                    return false;
                }
            }
            this.position = this.position.add(this.controlled_velocity)
        })

    }
}