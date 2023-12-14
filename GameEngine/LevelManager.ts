import { GameEngine } from "./"
import { Level } from "./Levels"
import { LevelCreator } from "./Levels/levelCreator"

export class LevelManager {
    engine:GameEngine
    currentLevel:Level
    save_name:string
    
    constructor(engine:GameEngine, save_name:string) {
        this.engine = engine;
        this.save_name = save_name;
        
    }
    async setLevel(levelName:string) {
        let nextLevel = new LevelCreator(this.engine, this.save_name, levelName);
        await nextLevel.load();
        this.engine.Camera.setPosition(
            this.engine.Camera.calculateTargetPosition(nextLevel)
        )
        this.currentLevel = nextLevel;
    }
    getCurrentLevel() {
        return this.currentLevel
    }
}