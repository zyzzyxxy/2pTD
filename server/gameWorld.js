const coordinate = require("./coordinate");
let functions = require("./functions");

var columns = 19; //should be uneven for map to work properly
var rows = 19; //should be uneven for map to work properly
var gameWorld = new Array(rows);
var road = []
const middleCord = new coordinate(Math.floor(rows / 2), Math.floor(columns / 2))


for (var i = 0; i < rows; i++) {
    gameWorld[i] = new Array(columns);
    for(var j=0; j < gameWorld[i].length; j++){
      gameWorld[i][j] = 0;
    } 
}

//TODO should generate a symetric gameworld with roads(OMG this is not delicate)
function generateGameWorld(rows, cols){
  makeRoad3();
  cleanRoad2();
  makeRoadSymmetric();
  mergeRoadToMap();
}

function getRandomFreeCordinate(){
  let row;
  let col;
  while(true){
    row = functions.getRandomInt(0, gameWorld.length -1);
    col = functions.getRandomInt(0, gameWorld[0].length -1);
    if(gameWorld[row][col] == '0'){
      return new coordinate(row, col);
    }
  }
}

function getRandomFreeCordinateAtSide(side){
  let done =false;
  let counter = 0
  let coord = getRandomFreeCordinate();

  if(side=='left'){
      while(true){
      if(cordinateIsAtSide(coord, side)){
        return coord;
      }
      coord.col--
    }
  }  
  if(side=='right'){
      while(true){
        if(cordinateIsAtSide(coord, side)){
          return coord;
        }
      coord.col++
    }
  }
  return null;
}

function cordinateIsAtSide(coord, side){
  if(side=='left'){
      for (let index = coord.col+1; index < columns; index++) {
        if(gameWorld[coord.row][index]=='r' && gameWorld[coord.row][coord.col]!='r'){
          return true;
        }
      }
      return false;
  }  
  if(side=='right'){
      for (let index = coord.col-1; index > -1; index--) {
        if(gameWorld[coord.row][index]=='r'&&gameWorld[coord.row][coord.col]!='r'){
          return true;
        }
      }
      return false;
  }

  return false;
}


function makeRoadSymmetric(){
  road.push(middleCord);
  var length = road.length;
  for(let i = 0; i < length-1; i++){
    let selCord = road[length-2-i]
    let cord = new coordinate(rows - selCord.row - 1, columns -selCord.col -1)
    road.push(cord);
  }
}

function cleanRoad(){
  var cleanRoad = []
  var alreadyVisited=[];
  var neighbours = [];
  for(let i=0; i<rows;i++){
    neighbours[i] = new Array(columns);
  }
  var firsttime = true
  tempCord = road[0]

  //left down right up
  while(!functions.compareCoordinates(tempCord, middleCord)){
    if(!functions.coordinateInArray(tempCord,alreadyVisited)){
      let c = new coordinate(tempCord.row, tempCord.col)
      cleanRoad.push(c);
      alreadyVisited.push(c);
    }
    let left = new coordinate(tempCord.row, tempCord.col-1);
    let down = new coordinate(tempCord.row+1, tempCord.col);
    let right = new coordinate(tempCord.row, tempCord.col+1);
    let up = new coordinate(tempCord.row-1, tempCord.col);

    if(functions.coordinateInArray(left, road) && !functions.coordinateInArray(left,alreadyVisited)){
      tempCord = left;
    }else if(functions.coordinateInArray(down, road) && !functions.coordinateInArray(down,alreadyVisited) ){
      tempCord = down;
    }else if(functions.coordinateInArray(right, road)  && !functions.coordinateInArray(right,alreadyVisited)) {
      console.log('right is good')
      tempCord = right;
    }else if(functions.coordinateInArray(up, road) && !functions.coordinateInArray(up,alreadyVisited) ){
      console.log('up is good')
      tempCord = up;
    }else{console.log('breaking'); break;}
    console.log('added: ', tempCord)

  }

  road = cleanRoad;
}

function cleanRoad2(){
  let cutpairs = [];
  let runAgain = true;
  
    for (let i = 0; i < road.length; i++) {
      const element = road[i];
      let neighbours = functions.getNeighboursFromArray(element, road);
      runAgain = false;
      if(neighbours.length>2){
        //runAgain=true;
        elementIndex = road.indexOf(element);
        furthestNeighbourIndex = 0;
        neighbours.forEach(nghbour =>{
          nghbourIndex = functions.findIndexOfCord(nghbour, road);
          console.log('ngh ind; ',nghbourIndex);
          if(nghbourIndex > furthestNeighbourIndex){
            furthestNeighbourIndex = nghbourIndex;
          }
        }) 
        let difference = furthestNeighbourIndex - elementIndex-1;
        console.log(elementIndex,furthestNeighbourIndex, difference)

        road.splice(elementIndex+1, difference)
      }
    }

}


function makeRoad3(){

  let rndNbr = Math.floor(Math.random()*columns-2) + 1
  let done = false
  let firstTime = true
  let nextRow = 0
  let nextCol = rndNbr;
  let verticalWeight = 0;
  let horizontalWheight = 0;
  let counter = 0;
  while(!done){
    counter++;
    let tempCord = new coordinate(nextRow,nextCol);
    if(counter>100){
      done = true;
    }
    if(!functions.coordinateInArray(tempCord, road)){
      road.push(tempCord)
    }
    if(functions.compareCoordinates(tempCord, middleCord)){
      done=true;
    }
    //fixing wheights
    horizontalWheight += middleCord.col - tempCord.col
    verticalWeight += middleCord.row - tempCord.row
    nextRow = tempCord.row
    nextCol = tempCord.col
    
    //add vertical or horizontal
    let moveHorizontal = false;
    if(Math.random()*Math.abs(horizontalWheight) > Math.random()*Math.abs(verticalWeight)){
      moveHorizontal = true;
    }else{moveHorizontal= false}
    //left or right or still
    if(moveHorizontal){
        //move as wheight
        if(Math.random() * columns < Math.random()*columns*Math.abs(horizontalWheight)){
          nextCol+=1*Math.sign(horizontalWheight);
        }else {
          nextCol +=-1*Math.sign(horizontalWheight);
        }
    }else //up or down;
    {
        //move as wheight
        if(Math.random() * rows < Math.random()*rows*Math.abs(verticalWeight) && nextRow < middleCord.row){
          nextRow+=1*Math.sign(verticalWeight);
        }else {
          nextRow +=-1*Math.sign(verticalWeight);
        }
    }
  }
  // addValueSymmetrically(0,rndNbr, 'e', roadMap); //e for entrance / exit
  // startCord = new coordinate(0, rndNbr)
  // endCord = new coordinate(rows-1, columns-1-rndNbr)
}

function makeRoad(){

  road.push({ row: 0, col:5, symbol:'e' })
  road.push({ row: 1, col:5, symbol:'r' })
  road.push({ row: 2, col:5, symbol:'r' })
  road.push({ row: 3, col:5, symbol:'r' })
  road.push({ row: 4, col:5, symbol:'r' })
  road.push({ row: 5, col:5, symbol:'r' })
  road.push({ row: 6, col:5, symbol:'r' })
  road.push({ row: 7, col:5, symbol:'r' })
  road.push({ row: 7, col:6, symbol:'r' })
  road.push({ row: 7, col:7, symbol:'r' })
  road.push({ row: 8, col:7, symbol:'r' })
  road.push({ row: 9, col:7, symbol:'r' })
  road.push({ row: 10, col:7, symbol:'r' })
  road.push({ row: 11, col:7, symbol:'r' })
  road.push({ row: 12, col:7, symbol:'r' })
  road.push({ row: 13, col:7, symbol:'e' })

}

function makeRoad2(){
  var roadMap = new Array(rows);
  for (var i = 0; i < rows; i++) {
    roadMap[i] = new Array(columns);
    for(var j=0; j < roadMap[i].length; j++){
      roadMap[i][j] = 'r';
    }
  }
  let rndNbr = Math.floor(Math.random()*columns)
  addValueSymmetrically(0,rndNbr, 'e', roadMap); //e for entrance / exit
  startCord = new coordinate(0, rndNbr)
  endCord = new coordinate(rows-1, columns-1-rndNbr)
}

function mergeRoadToMap(){
  road.forEach(element => {
    updateValueInGameworld(element.row, element.col, 'r')
  });
}

generateGameWorld();


function addValueSymmetrically(row, col, symbol, map){
  map[row][col] = symbol;
  map[rows - 1 -row][columns - 1 - col] = symbol;
}

function testMap(map, startCord, endCord){
  let possibleWays = [];
  let alreadyVisited = []
  let done = false;
  let currentCord = startCord;

  while(!done){
    let row = currentCord.row
    let col = currentCord.col
    //check left
    if(checkPossibleMove(map, new coordinate(row, col -1))){
      tempCord = new coordinate(row, col-1);
      if(!checkCordPresent(tempCord, alreadyVisited)){
        possibleWays.push(tempCord);
      }
    }
    //check down
    if(checkPossibleMove(map, new coordinate(row+1, col))){
      tempCord = new coordinate(row+1, col);
      if(!checkCordPresent(tempCord, alreadyVisited)){
        possibleWays.push(tempCord);
      }
    }
    //check up
    if(checkPossibleMove(map, new coordinate(row-1, col))){
      tempCord = new coordinate(row-1, col);
      let addWay = true;
      if(!checkCordPresent(tempCord, alreadyVisited)){
        possibleWays.push(tempCord);
      }
    }
    //check right
    if(checkPossibleMove(map, new coordinate(row, col+1))){
      tempCord = new coordinate(row, col+1);
      let addWay = true;
      if(!checkCordPresent(tempCord, alreadyVisited)){
        possibleWays.push(tempCord);
      }
    }
    alreadyVisited.push(currentCord)
    if(possibleWays.length>0){
      currentCord = possibleWays.shift();
      if(currentCord.row == endCord.row && currentCord.col == endCord.col){
        return true;
      }
    }else{
      done = true;
    }
  }
  return false;
}

function checkCordPresent(cord, array){

  array.forEach(element => {
    if(element.row == cord.row && element.col == cord.col){
      return true;
    }
  });
  return false;
}

function checkPossibleMove(map, cord){
  if(cord.row < 0 || cord.col < 0 || cord.row >= map.length || cord.col >= map[0].length){
    return false;
  }
  if(map[cord.row][cord.col] == 'r'){return true}
  if(map[cord.row][cord.col] == 'e'){return true}
}

function getGameWorld(){
  return gameWorld;
};

function getRoad(){
  return road;
}

function getRows(){
  return gameWorld.length;
}
function getCols(){
  return gameWorld[0].length;
}

function updateValueInGameworld(row, col, value){
  if(row<getRows() && col < getCols()){
    gameWorld[row][col] = value;
    console.log('gameworld updated: ',row, col, value );
  }
}

function test(){return "TestFunciton"; }

module.exports = { 
  getGameWorld, 
  test,
  updateValueInGameworld,
  getCols,
  getRows,
  generateGameWorld,
  getRoad,
  getRandomFreeCordinate,
  getRandomFreeCordinateAtSide,
};
