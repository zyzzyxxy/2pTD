let monster = require('./monster.js');
let gameWorld = require('./gameWorld.js'); 
let monster_wave = require('./monster_wave.js');
let functions = require('./functions.js');
var variables = require('./variables.js');

//const { tick } = require('./game.js');
let wave = 0;
let active_monsters = [];
let routeForward = [];
let routeBackward = [];
let spawn_time = 2000; //ms

let active_wave = null;
let last_wave = null;
var monsterSpawnTime = 5; // sec
var monsterSpawnCounter = 0; //sec
var waveIdleTime = 1; //sec
var idle_wave_counter = 0;

function spawnNewWave(){
    let wave = getNewWave();
    last_wave = active_wave;
    active_wave = wave;
    active_wave.activate();
    //printMonsterInfo();

}

function getNewWave(){
    wave++;
    let m = new monster(null, null, 1,1,'monsterlvl: ' + wave, wave)
    m.generateAndSetValuesFromLevel(wave);
    return getWaveFromMonster(m);
}

function getWaveFromMonster(m){
    setRoute(gameWorld.getRoad());
    monsterArrForward = getMonsterCopies(m, variables.wave_length, routeForward);
    monsterArrBackward = getMonsterCopies(m, variables.wave_length, routeBackward);
    return new monster_wave(monsterArrForward, monsterArrBackward, spawn_time);
}

function getMonsterCopies(m, len, route){
    let resArr = [];
    for (let i = 0; i < len; i++) {
        //position, route, health, speed, name, level
        resArr.push(new monster(m.position, route, m.health, m.speed, m.name, m.level));
    }
    return resArr;
}

function setRoute(route){
    routeForward = [...route];
    routeBackward = [...route];
    routeBackward.reverse();
}

function tick(){
    waveTick();
    if(active_wave != null && active_wave.active){
        monsterTick();
    }
}

function waveTick(){   
    //In between waves
    if(active_wave==null || active_wave.active==false){ 
        idle_wave_counter++;    
    }
    if(idle_wave_counter>waveIdleTime*10){ 
        idle_wave_counter=0; 
        spawnNewWave();
    }

    //in active waves
    if(active_wave != null && active_wave.active){
        monsterSpawnCounter++;
        if(monsterSpawnCounter >= (monsterSpawnTime * 1000 / variables.tickRate ) ){
            monsterSpawnCounter=0;

            let newMonsters = active_wave.getNext2Monsters();
            activateMonsters(newMonsters);  
        }
        if(active_monsters.length > 0 && nbrOfMonstersActive()==0){
            active_wave.deactivate();
        }
    }
}

function nbrOfMonstersActive(){
    let counter = 0
    if(active_monsters != null){
        active_monsters.forEach(mon =>{
            if(mon.active){
                counter++;
            }
        })
    }
    return counter;
}

function monsterTick(){
    var removeIds = [];

    active_monsters.forEach( mon =>{
        mon.incrementMovecounter();
        if(mon.inactiveCounter > variables.monsterInactiveBeforeRemovedTime * variables.getSecondsToTockRatio()){
            removeIds.push(mon.id);
        }
    })

    if(removeIds.length > 0){
        for (let i = 0; i < active_monsters.length; i++) {
            if(removeIds.includes(active_monsters[i].id)){
                // console.log('id to remove: ', monsterId)
                let removedMonster = active_monsters.splice(i,1);
                i--;
            }
        }
    }
}

function activateMonsters(monsters){
    if(monsters!=null){
        monsters.forEach(mon => {
            mon.active = true;            
            active_monsters.push(mon);
        });
    }
}

function printMonsterInfo(){

}

function getRouteForward(){ return routeForward;}
function getRouteBackward(){ return routeBackward;}

module.exports = {
    setRoute,
    getNewWave,
    getRouteForward,
    getRouteBackward,
    tick,
    active_monsters
}


