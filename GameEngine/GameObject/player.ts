import {GameObject} from "./"
import { GameEngine } from "../";
export default class Player extends GameObject {
    constructor(engine:GameEngine) {
        super(engine);
    }
    update() {
        if (this.engine.KeyboardMouse.keysDown.includes("s")) {
            this.position.y += 3
        }
        if (this.engine.KeyboardMouse.keysDown.includes("w")) {
            this.position.y -= 3
        }
        if (this.engine.KeyboardMouse.keysDown.includes("a")) {
            this.position.x -= 3
        }
        if (this.engine.KeyboardMouse.keysDown.includes("d")) {
            this.position.x += 3
        }
    }
}