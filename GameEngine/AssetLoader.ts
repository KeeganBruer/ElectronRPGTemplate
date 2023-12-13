import { GameEngine } from "./"

export class AssetLoader {
    engine:GameEngine
    assets:{
        [key:string]:{
            isLoaded:boolean,
            image:HTMLImageElement
        }
    }
    assetDetails:{
        [key:string]:{
            src:string
        }
    }
    constructor(engine:GameEngine, assetDetails:{
        [key:string]:{
            src:string
        }
    }) {
        this.engine = engine;
        this.assets = {};
        this.assetDetails = assetDetails;
    }
    loadAssets(assetDetails:{
        [key:string]:{
            src:string
        }
    }) {
        const path = window.require("path")
        const app_path = this.engine.config.app_path
        console.log(app_path)
        let keys = Object.keys(assetDetails);
        for (let i = 0; i < keys.length; i++) {
            let details = assetDetails[keys[i]];
            
            let img = new Image();
            img.onload = ()=>{
                this.assets[keys[i]].isLoaded = true;
            }
            img.src = app_path.includes("http://") ? `${app_path}/${details.src}` : path.join(app_path, "../", details.src);
            console.log("Loading image",  img.src)
            this.assets[keys[i]] = {
                isLoaded:false,
                image:img
            }
        }
    }
    isLoaded() {
        let keys = Object.keys(this.assets);
        for (let i = 0; i < keys.length; i++) {
            if (this.assets[keys[i]].isLoaded == false) return false;
        }
        return true;
    }
    waitForLoad() {
        this.loadAssets(this.assetDetails)
        return new Promise<void>((resolve)=>{
            setTimeout(()=>{
                if (this.isLoaded() == true) resolve()
            }, 100)
        })
    }
    getImageAsset(assetName:string) {
        return this.assets[assetName].image
    }
}