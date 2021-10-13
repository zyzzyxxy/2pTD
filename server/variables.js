tickRate = 100; //ms

healthConstant = 10;
speedConstant = 50;

wave_length = 20;

monsterInactiveBeforeRemovedTime = 1 //second;

function getSecondsToTockRatio(){
    return 1000 / tickRate;
}


module.exports = {
    healthConstant,
    speedConstant,
    tickRate,
    getSecondsToTockRatio,
    monsterInactiveBeforeRemovedTime,
    wave_length
}