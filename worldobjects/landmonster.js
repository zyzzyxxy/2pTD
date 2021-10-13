import {boxSize} from "./globalvariables.js";

export class LandMonster {

    constructor(x_start, y_start, route) {
        this.speed = 0.5;
        this.health = 50;
        this.alive=true;

        this.x = x_start;
        this.y = y_start;
        this.route = route;
        this.routeIndex = 0;

        this.imgAnimation = 1;
        this.animationCounter = 0;
        this.animationLimit = 20;
        this.img = new Image();
        this.img.src = "images/land_monster/idle/frame-1.png";
    }
    alternateImg(){
        if(this.imgAnimation == 1 && this.animationCounter ==this.animationLimit){
            this.img.src = "images/land_monster/idle/frame-2.png";
            this.imgAnimation = 2;
            this.animationCounter = 0;
        }else if(this.animationCounter == this.animationLimit){
            this.img.src = "images/land_monster/idle/frame-1.png";
            this.imgAnimation = 1;
            this.animationCounter = 0;
        }
        this.animationCounter ++;

    }
    
    move() {
        let deltaX = this.route[this.routeIndex].x * boxSize - this.x;
        let deltaY = this.route[this.routeIndex].y * boxSize - this.y;
        this.x += Math.sign(deltaX)*this.speed;
        this.y += Math.sign(deltaY)*this.speed;
        if(this.x == this.route[this.routeIndex].x*boxSize && this.y == this.route[this.routeIndex].y*boxSize){
            this.routeIndex++;
            if(this.routeIndex>this.route.length-1){
                //alert('Im done walking')
                this.die();
            }else{
            }
        }
        this.alternateImg();

    }
    
    die(){
      //  alert('Im dead now')
        this.img.src = "images/land_monster/got_hit/frame.png";
        this.alive=false;
    }

    takeDamage(damage) {
        this.health -=damage;
        if(this.health<0)
            this.die();
    }
    
}