const _require = window.require || ((v:any)=>{})
const fs = _require('fs');
const path = _require('path');
export class FileManager {
    constructor() {
        console.log("File Manager, Managing ")

    }
    getFile(name:string) {
        console.log("File Manager, getting "+name)
    }
}
