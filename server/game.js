let gameWorld = require('./gameWorld'); 
let coordinate = require('./coordinate.js'); 
let player = require('./player.js');
let monsterController = require('./monsterController.js');
let functions = require('./functions.js')

// let monster_generator = require('./monster_generator');
// let monster = require('./monster');
//let mGenerator = new monster_generator();

var gameCounter = 0;

//var updateInterval = 100 //milli seconds

//init monstercontroller
monsterController.setRoute( gameWorld.getRoad());


let playerList = [];
const playerSymbols = [1,2,3,4,5,6,7,8,9]
let lastPlayerSymbol = 0;

const maxPlayers = 4;

let worldGenerated = false;

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
  }
function symbolIsFree(symbol){
  let symbolIsFree = true;
  playerList.forEach(player => {
    if(player.symbol == symbol){
      symbolIsFree = false;
    }
  });
  return symbolIsFree;
}

  function getFreeSymbol(){
    for(let i=1; i < maxPlayers; i++){
      if(symbolIsFree(i)){
        return i;
      }
    }
    return -1;
  }


  function addPlayer(socketId){

    if(playerList.length<maxPlayers){
      let side;
      //spawn to left side
      if(playerList.length == 0){
        side = 'left';
      }//spawn to rigt side
      else{
        if(playerList[0].side=='left'){
          side = 'right';
        }
        if(playerList[0].side=='right'){
          side = 'left';
        }
      }

      let coord = gameWorld.getRandomFreeCordinateAtSide(side);
      let symbol = getFreeSymbol();
      let newPlayer = new player(symbol,coord,socketId, side);
      gameWorld.updateValueInGameworld(coord.row, coord.col, symbol);

      playerList.push(newPlayer);
      console.table(playerList);
    }
  }

  function gameWorldCoordIsFree(row, col){
    if (gameWorld.getGameWorld()[row][col] == 0){
      return true;
    }
    return false;
  }

  //Should return which side of road the cordinate belongs to, or 'none' if coord is on road or invalid.
  function sideOfRoad(coordinate){
    //Check if road
    if(gameWorld[coordinate.row][coordinate.col] == 'r'){
      return none;
    }
    
  }

  function removePlayer(id){
    for (let i = 0; i < playerList.length; i++) { 
      if (playerList[i].playerId == id) { 
          let crd = playerList[i].coordinate;
          gameWorld.updateValueInGameworld(crd.row, crd.col, 0);
          playerList.splice(i, 1); 
      } 
    } 
    console.log('removed: ' + id);
    console.table(playerList);
  }

  function playerCommand(socketId, data){
    // let x = Math.floor( data.x / gameWorld.getCols());
    // let y = Math.floor(data.y / gameWorld.getRows());    
    let col = data.x;
    let row = data.y;
    let playerSymbol = getPlayerFromId(socketId).symbol;
    let combinedSymbol = playerSymbol+data.symbol
    if(gameWorldCoordIsFree(row,col)){
      gameWorld.updateValueInGameworld(row, col,  combinedSymbol);
    }
    
  }

  function playerMovement(playerId, movement){
    let player = getPlayerFromId(playerId);
    let newCoordinate;
    if(player!=undefined){
      newCoordinate = new coordinate(player.coordinate.row, player.coordinate.col);
      if(movement == "ArrowUp"){
        if(newCoordinate.row>0){
          newCoordinate.row --;
        }
      }
      if(movement == "ArrowDown"){
        if(newCoordinate.row<gameWorld.getRows()-1){
          newCoordinate.row ++;
        }
      }
      if(movement == "ArrowRight"){
        if(newCoordinate.col<gameWorld.getCols()-1){
          newCoordinate.col ++;
        }
      }
      if(movement == "ArrowLeft"){
        if(newCoordinate.col>0){
          newCoordinate.col --;
        }
      }
      if(newCoordinate != undefined && gameWorld.getGameWorld()[newCoordinate.row][newCoordinate.col] == 0){
        player.oldCoordinate = player.coordinate;
        player.coordinate = newCoordinate;
  
        //Set new value
        gameWorld.updateValueInGameworld(player.coordinate.row, player.coordinate.col, player.symbol);
        //Remove old value
        gameWorld.updateValueInGameworld(player.oldCoordinate.row, player.oldCoordinate.col, 0);
  
      }
    }
  }

  function getPlayerFromId(playerId){
    for(let i = 0; i< playerList.length; i++){
      if(playerList[i].playerId == playerId){
        return playerList[i];
      }
    }
  }

  //
  function getGameInfo(){
    let gameInfo = {
      players: playerList,

    }

    return gameInfo;
  }

  // Controls what happens in game every tick
  function tick(){
    monsterController.tick();
    return {  gamecounter: ++gameCounter,
              monsters: monsterController.active_monsters
            } ;
  }


  module.exports = { 
    addPlayer, 
    removePlayer,
    playerMovement,
    playerCommand,
    getGameInfo,
    tick
  };

  
