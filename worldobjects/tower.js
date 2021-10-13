import {boxSize} from "./globalvariables.js";
import {LandMonster} from "./landmonster.js";

export class Tower {

    constructor(x, y) {
        this.speed = 1;
        this.damage = 10;
        this.radius = 100;
        this.health = 200;
        this.alive=true;
        this.firerate = 1;

        this.lastShot = 0;

        this.x = x;
        this.y = y;
        
        this.img = new Image();
        this.img.src = "images/tower_round.png";
        this.sound = document.createElement("audio");
        this.sound.src = "sounds/bang_05.ogg";

        //this.sound = new sound("sounds/bang_01.ogg");
        
    }
    alternateImg(){
        if(this.imgAnimation == 1){
            this.img.src = "images/land_monster/idle/frame-2.png";
            this.imgAnimation = 2;
        }else{
            this.img.src = "images/land_monster/idle/frame-1.png";
            this.imgAnimation = 1;
        }

    }
    timeToShoot(){
        return (Date.now()-this.lastShot)/1000 > this.firerate;
    }
    shoot(){
       this.sound.play();
       this.lastShot = Date.now();
    }
    upgrade(){

    }
    
    
    die(){
        this.alive=false;
    }

    takeDamage() {

    }
    
}