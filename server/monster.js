let functions = require('./functions.js');
let variables = require('./variables.js');

class monster{
    //Speed lower is faster
    //Health higher is better

    constructor(position, route, health, speed, name, level){
        this.alive = true;
        this.active = false;
        this.position = position; 
        this.positionCounter = 0; 
        this.route  = route; 
        this.health = health; 
        this.speed  = speed; 
        this.name = name; 
        this.id = functions.generateId();
        this.moveCounter = 0;
        this.killedBy = '';
        this.inactiveCounter = 0;
        this.direction = '';
    }

    generateAndSetValuesFromLevel(level){
        this.health = Math.ceil(variables.healthConstant*level*Math.random());
        this.speed = Math.ceil(variables.speedConstant-level*Math.random());
        if(this.speed<1){
            this.speed = 1;
        }
    }

    takeDamage(dmg){
        health-=dmg;
        if(health>=0){
            die()
        }
    }

    incrementMovecounter(){
        this.moveCounter++;
        if(this.moveCounter >= this.speed){
            this.move();
            this.moveCounter = 0;
        }
    }

    die(){
        alive = false;
    }

    //First move moves monster into gamingboard
    move(){
        if(this.positionCounter < this.route.length){
            this.positionCounter++;
            this.position = this.route[this.positionCounter];
            if(this.positionCounter +1 < this.route.length){
                let nextPos = this.route[this.positionCounter+1];
                if(this.position.row < nextPos.row){ this.direction='up';}
                if(this.position.row > nextPos.row){ this.direction='down';}
                if(this.position.col < nextPos.col){ this.direction='right';}
                if(this.position.col > nextPos.col){ this.direction='left';}
            }
        }
        else{
            this.active = false;
            this.inactiveCounter++;
        }
    }
}

module.exports = monster;