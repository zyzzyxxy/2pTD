class monster_wave{

    constructor(monsters_from_top, monsters_from_bottom, spawn_time){
        this.monsters_from_top = monsters_from_top;
        this.monsters_from_bottom = monsters_from_bottom;
        this.spawn_time = spawn_time;
        this.active = false;
            
    }

    activate(){
        this.active = true;
    }

    deactivate(){
        this.active = false;
    }

    getNext2Monsters(){
        let monster1 = null;
        let monster2 = null;

        if(this.monsters_from_top.length > 1){
            monster1 = this.monsters_from_top.shift();
        }        
        if(this.monsters_from_bottom.length > 1){
            monster2 = this.monsters_from_bottom.shift();
        }

        if(this.monsters_from_top.length == 0 && this.monsters_from_bottom.length == 0){
            this.deactivate();
        }
        if(monster1!=null &&monster2!=null){
            return [monster1, monster2];
        }
    }

    waveIsDone(){

    }
}

module.exports = monster_wave;