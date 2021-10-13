let coordinate = require('./coordinate.js');

function compareCoordinates(cord1, cord2){
    if(cord1.row == cord2.row && cord1.col == cord2.col){
        return true;
    }
    return false;
}

function coordinateInArray(cord, array){
    let result = false;
    array.forEach(element => {
       if(compareCoordinates(element,cord)){
           result = true;
       } 
    });
    return result;
}

function getNeighboursFromArray(coord, array){
    let neighbours = [];
    let row = coord.row;
    let col = coord.col;

    let potentialNeighbours =[new coordinate(row-1, col),new coordinate(row, col-1),new coordinate(row, col+1), new coordinate(row+1, col)]
    potentialNeighbours.forEach(element =>{
        if(coordinateInArray(element, array)){
            neighbours.push(element);
        }
    })

    return neighbours;
}

//Not done... maby not needed?
function findIndexOfCord(coord, route){
    for (let i = 0; i < route.length; i++) {
        const element = route[i];
        if(compareCoordinates(coord, element)){
            return i;
        }
    }
    return -1;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function generateId(){
    return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      
}

module.exports = {
    compareCoordinates,
    coordinateInArray,
    getNeighboursFromArray,
    findIndexOfCord,
    getRandomInt,
    generateId
}