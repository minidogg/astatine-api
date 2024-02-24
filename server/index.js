(async()=>{
    //require mongo stuff
    const schema = require("./schema.js")
    const mongoose = require('mongoose');
    const path = require("path")

    //mongo connect
    var connection = await mongoose.connect('mongodb://127.0.0.1:27017/chat')
    console.log("Connected")


    //websockets
    var {WebSocketServer} = require("ws")

    const wss = new WebSocketServer({ port: 8080 });
    
    wss.on('connection', function connection(ws) {
      ws.on('error', console.error);
    
      ws.on('message', function message(data) {
        console.log('received: %s', data);
      });
    
      ws.send('something');
    });

})()
