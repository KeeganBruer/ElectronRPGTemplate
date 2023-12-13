import { GameEngine } from "./";
import {LevelManager} from "./LevelManager"

export class SavesManager {
    engine:GameEngine
    LevelManager:LevelManager | undefined
    currentSave:string
    constructor(engine:GameEngine) {
        this.engine = engine;
        this.LevelManager = undefined;
    }
    async createNewSave() {
        this.currentSave = "new_game"
        this.LevelManager = new LevelManager(this.engine, this.currentSave)
        await this.LevelManager.setLevel("Level_1")
        
    }   
    async loadExistingSave(save_name?:string){
        if (save_name == undefined) return;
        this.currentSave = save_name
        this.LevelManager = new LevelManager(this.engine, this.currentSave)
        await this.LevelManager.setLevel("Level_1")

    }
    async saveCurrentGame() {
        console.log("saving ", this.currentSave)
    }
    getLevelManager() {
        return this.LevelManager;
    }
    useLevelManager<T>(cb:(LevelManager:LevelManager)=>T) {
        if (this.LevelManager != undefined) return cb(this.LevelManager)
    }
}