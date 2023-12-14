import {FileManager} from "../FileManager";
import { GameEngine } from "../";
import { AssetLoader } from "../AssetLoader";
import PlayerGameObject from "../GameObject/player"
import SpriteGameObject from "../GameObject/Sprite"
import {GameObject} from "../GameObject"
export class Level {
    Assets:AssetLoader
    engine:GameEngine
    save_name:string
    levelName:string
    stating_camera_position:{x:number, y:number};
    players:PlayerGameObject[] = []
    GameObjects:GameObject[] = []
    constructor(engine:GameEngine, save_name:string, levelName:string) {
        this.engine = engine
        this.save_name = save_name
        this.levelName = levelName
        this.Assets = new AssetLoader(engine, {
            "background":{
                src:"public/background.png"
            }
        })
        
    }
    async load() {
        let fileManger = new FileManager();
        
        fileManger.getFile(`/saves/${this.save_name}/levels/${this.levelName}/assets.json`);

        await this.Assets.waitForLoad();
        console.log(this.Assets.assets)

    }
    update() {
        for (let i = 0; i < this.GameObjects.length; i++) {
            this.GameObjects[i].update();
        }
    }
    render(ctx:CanvasRenderingContext2D) {
        
        for (let i = 0; i < this.GameObjects.length; i++) {
            this.GameObjects[i].render(ctx);
        }
    }
}