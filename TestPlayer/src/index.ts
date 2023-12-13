window.require = ()=>{}

import { GameEngine } from "./GameEngine"

console.log("hi")
window.onload = async ()=>{
    let engine:GameEngine = new GameEngine();
    engine.setConfigs({
        app_path:"http://localhost:3000",
        type:"new_campaign"
    })
    await engine.onDOMLoaded();

}