var express = require('express');
var socket = require('socket.io');
var variables = require('./server/variables.js');
var gameData='';
let gameWorld = require('./server/gameWorld.js');
let game = require('./server/game.js');

//Need to run this before all else... Wait sync... And it should kill for ports
// const { exec } = require("child_process");

// let b = exec("ls -la", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
// });

//App setup
var app = express();
var port = 4002;


// Cors config
var cors = require('cors');
app.use(cors())

var server = app.listen(port, function(){
    console.log("listening to request on port: " + port)
});


//Static files
//app.use(express.static('frontend'));

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send('Hi there...');
    console.log(req);
})

//Socket setup
//var io = socket(server);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
// message: message.value,
// handle: handle.values

io.on('connection', function(socket){
    console.log('Made socket connection', socket.id)
    game.addPlayer(socket.id);


    broadCastGameWorld();          
    console.log ('Client Count: ' + io.engine.clientsCount );

    //For chatting
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    })

    //For gameworld movement
    socket.on('movement', function(data){
        console.log('movement recieved: ' + data.movement + ' from: ' + socket.id);
        game.playerMovement(socket.id, data.movement);
        broadCastGameWorld();
    })

   //For gameworld towers
   socket.on('mouseClick', function(data){
    console.log('click recieved: ' + data + ' from: ' + socket.id);
    game.playerCommand(socket.id, data);
    broadCastGameWorld();
     })

    socket.on('disconnect' , function (data) 
       {
          console.log ( socket.id );
          game.removePlayer(socket.id );
          broadCastGameWorld();
          console.log ('Client Count: ' + io.engine.clientsCount );
       })
})


//Broadcasting the gameworld
function broadCastGameWorld(){
    io.sockets.emit('gameWorldUpdate', gameWorld.getGameWorld());
}

//Broadcasting the gameworld
function broadCastGameWorldChanges(){
    io.sockets.emit('gameWorldChanges', gameWorld.getGameWorld());
}

//Broadcasting the gameworld
function broadCastInfo(data){
    io.sockets.emit('infoUpdate', data);
}

setInterval(runGameCycle,variables.tickRate);


function runGameCycle(){
    let data = game.tick();
    if(data != gameData){
        gameData = data;
        broadCastInfo(data);
    }
}
    
