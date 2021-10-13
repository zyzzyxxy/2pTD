//Imports
//import {handleMouseEvent } from './events.js';
//const myEvents = require('./events.js');


//Get game canvas for drawing
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gameCanvas = canvas.getContext('2d');
const borderWidth = 2;

const animationTime = 7;
var animationCounter = 0;

var monsterImageMap = new Map();

const canvasWidth = canvas.getBoundingClientRect().width - 2*borderWidth;
const canvasHeight = canvas.getBoundingClientRect().height - 2*borderWidth;

canvas.addEventListener("mousemove", function(e){
    animateMouse(e.offsetX, e.offsetY);
})

function animateMouse(x,y){
    console.log(clientSocket);
}

function getMyId(){
    
}


//Setting up eventhandlers  
//window.addEventListener("keydown", myEvents.handleKeyEvent);

function handleMouseEvent(event){
    //alert(event.offsetX + "  "  + event.offsetY);
    document.getElementById("testh2").innerHTML = 'mouseEvent: ' + event.which;


    //mouseOver
    if(event.which == 0) {
        if(event.target.nodeName == "CANVAS"){
            // gameCanvas.fillStyle = 'rgba(0,0,0,1.0)';
            // ctx.beginPath();
            // ctx.arc(event.offsetX, event.offsetY, 50, 0, 2 * Math.PI);
            // ctx.stroke();
        }

    }else if(event.which == 1){
        rows = gameWorld.length;
        cols = gameWorld[0].length;
    
        let blockSizeHeight = canvasHeight / rows;
        let blockSizeWidth = canvasWidth / cols;
    
        if(event.target.nodeName == "CANVAS"){
     
            let varX = Math.floor(event.offsetX / blockSizeWidth )
            let varY = Math.floor(event.offsetY / blockSizeHeight )
                
            clientSocket.emit('mouseClick', {
                player: player.value,
                x: varX,
                y: varY,
                symbol: 't'
            });
        }  
    }



}

window.addEventListener("mousedown", handleMouseEvent);
window.addEventListener("mouseover", handleMouseEvent);



function getMousePos(canvas, evt) {
    let yPos = evt.offsetY;
    let xPos = evt.offsetX;
    return {
        x: xPos,
        y: yPos
    };
}


//TODO exchange for sprites
const colorMap = new Map();
colorMap.set(1,'rgba(0, 0, 255, 0.5)');
colorMap.set(2,'rgba(0, 255, 0, 0.5)');
colorMap.set(3,'rgba(255, 0, 0, 0.5)');
colorMap.set('o',"rgb(255,0,0)");

//Fixing images
let testCanvas = document.getElementById('testCanvas').getContext('2d');
let testCanvas2 = document.getElementById('testCanvas2').getContext('2d');

let towerImg = new Image();
towerImg.onload = function(){
    testCanvas2.drawImage(towerImg,100*Math.random(),100*Math.random(),50,50);
}
towerImg.src = "../resources/tower_round.png";

let monsterImg = new Image();
monsterImg.onload = function(){
    // testCanvas2.drawImage(monsterImg,100*Math.random(),100*Math.random(),20,20);
}
monsterImg.src = "../resources/land_monster/idle/frame-1.png";

let monsterImg2 = new Image();
monsterImg2.onload = function(){
    testCanvas2.drawImage(monsterImg,100*Math.random(),100*Math.random(),20,20);
    console.log('monImg2Loaded');
}
monsterImg2.src = "../resources/land_monster/idle/frame-2.png";


let grassImg = new Image();
grassImg.onload = function() {
    testCanvas.drawImage(grassImg,100,0,100,50);
};
grassImg.src = "../resources/grass3.png";

let dirtImg = new Image();
dirtImg.onload = function() {
    testCanvas.drawImage(dirtImg,10,50,100,50);
};
dirtImg.src = "../resources/Dirt2.jpg";


//
var gameWorld;
var monsters;
var gameCounter;
//Make connection
var clientSocket = io.connect("http://localhost:4002");

//QueryDom
var message = document.getElementById('message');
    player =  document.getElementById('player');
    btn =  document.getElementById('send');
    output =  document.getElementById('output');

//Emit events

btn.addEventListener('click', function(){
    clientSocket.emit('chat', {
        message: message.value,
        player: player.value
    })
})

document.addEventListener('keydown', function(event){
    
    if(event.key == "ArrowUp"){
        clientSocket.emit('movement', {
            player: player.value,
            movement: event.key
        });
    }    
    if(event.key == "ArrowDown"){
        clientSocket.emit('movement', {
            player: player.value,
            movement: event.key
        });
    }    
    if(event.key == "ArrowRight"){
        clientSocket.emit('movement', {
            player: player.value,
            movement: event.key
        });
    }    
    if(event.key == "ArrowLeft"){
        clientSocket.emit('movement', {
            player: player.value,
            movement: event.key
        });
    }
} );

//Listen for events
clientSocket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.player + ': </strong>' +
    data.message + '</p>';
})

clientSocket.on('gameWorldUpdate', function(data){
    updateGameWorld(data);
    console.log(gameWorld);
    paintGameworld();
})

clientSocket.on('infoUpdate', function(data){
    gameCounter = data.gamecounter;
    monsters = data.monsters
    document.getElementById('testh1').innerHTML = 'gameCounter: ' + JSON.stringify(gameCounter) + '\n monsters: '+ monsters.length;
    paintOverlay();
})

//Helper functions
function paintGameworld(){
    gameCanvas.clearRect(0,0,window.innerWidth, window.innerHeight);
    if(typeof this.gameWorld !== 'undefined'){
        console.log("World is good");

        rows = gameWorld.length;
        cols = gameWorld[0].length;

        let blockSizeHeight = window.innerHeight / rows;
        let blockSizeWidth = window.innerWidth / cols;

        console.log(blockSizeHeight, canvasHeight)

        for (let row = 0; row < gameWorld.length; row++) {
            for (let col = 0; col < gameWorld[0].length; col++) {
                paintSpecificCoordinateInGameWorld({"row": row, "col":col})
            }
        }
    }else{
        console.log("World undefined");
    }
}

function paintSpecificCoordinateInGameWorld(coordinate){

    rows = gameWorld.length;
    cols = gameWorld[0].length;

    let blockSizeHeight = window.innerHeight / rows;
    let blockSizeWidth = window.innerWidth / cols;

    let symbol = gameWorld[coordinate.row][coordinate.col];
    let x = blockSizeWidth * coordinate.col;
    let y = blockSizeHeight * coordinate.row;
    gameCanvas.drawImage(grassImg,x,y, blockSizeWidth, blockSizeHeight)

    if(symbol != '0'){
       
        if(symbol.toString().includes('1')){
            gameCanvas.fillStyle = 'rgba(0,0,255,0.8)';
        }                        
        else if(symbol.toString().includes('2')){
            gameCanvas.fillStyle = 'rgba(255,0,0,0.9)';
        }else{
            gameCanvas.fillStyle = 'rgba(0,0,0,0.0)';
        }
        gameCanvas.fillRect(x,y, blockSizeWidth, blockSizeHeight)
        
        //PlayerTower
        if(symbol == '1t'){
            gameCanvas.drawImage(towerImg,x,y, blockSizeWidth, blockSizeHeight)
        }                    
        if(symbol == '2t'){
            gameCanvas.drawImage(towerImg,x,y, blockSizeWidth, blockSizeHeight)
        }

        //PlayerHero
        if(symbol.toString() == '1'){
            gameCanvas.drawImage(towerImg,x,y, blockSizeWidth, blockSizeHeight)
        }                    
        if(symbol.toString() == '2'){
            gameCanvas.drawImage(towerImg,x,y, blockSizeWidth, blockSizeHeight)
        }

        //Road
        if(symbol == 'r' || symbol == 'e'){
            gameCanvas.drawImage(dirtImg,x,y, blockSizeWidth, blockSizeHeight)
        }
        //Get the color or faded-black if nonexisting

    }
}

function paintOverlay(){
    paintMonsters();
}

//Painting monsters

function paintMonsters(){

    let blockSizeHeight = window.innerHeight / rows;
    let blockSizeWidth = window.innerWidth / cols;

    if(monsters != undefined){
        paintGameworld();

        for (let i = 0; i < monsters.length; i++) {
            let monster = monsters[i];
            if(!monsterImageMap.has(monster.id)){
                let img = new Image();
                img.source = "../resources/land_monster/idle/frame-1.png";
                monsterImageMap.set(monster.id, img);
                console.log(monsterImageMap.keys())
                console.log(monsterImageMap.values())
            }
            if(monster.position!=undefined){
                //paintSpecificCoordinateInGameWorld(monster.position);

                let progression = monster.moveCounter/monster.speed;
                let row = monster.position.row * blockSizeHeight;
                let col = monster.position.col * blockSizeWidth;

                if(monster.direction == 'up'){ row +=blockSizeHeight*progression; } 
                if(monster.direction == 'down'){ row -=blockSizeHeight*progression }
                if(monster.direction == 'right'){ col += blockSizeWidth*progression }
                if(monster.direction == 'left'){ col -= blockSizeWidth*progression }
                if(Math.floor(progression*10)%2==0){
                    gameCanvas.drawImage(monsterImg2, col, row, blockSizeWidth, blockSizeHeight );
                }else{
                    gameCanvas.drawImage(monsterImg, col, row, blockSizeWidth, blockSizeHeight );
                }
            }

        }
    }
}

function updateGameWorld(data){
    this.gameWorld = data;
}

