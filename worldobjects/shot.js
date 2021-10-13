export class Shot {

    constructor(x_start, y_start, x_end, y_end, spawnTime) {

        this.x_start = x_start;
        this.y_start = y_start;
        this.x_end = x_end;
        this.y_end = y_end;

        this.spawnTime = spawnTime;
        this.lifespan = 0.5;
        this.alive=true;
        
    }
    update(){
        return (Date.now()-this.lastShot)/1000 > this.firerate;
    }
    
    
}