(async()=>{
    //require mongo stuff
    const schema = require("./schema.js")
    const mongoose = require('mongoose');
    const path = require("path")

    //mongo connect
    var connection = await mongoose.connect('mongodb://127.0.0.1:27017/chat')
    console.log("Connected")

    //express
    const express = require('express')
    const app = express()
    const port = 3000
    
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
      res.sendFile(path.resolve("../docs/index.html"))
    })

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


    //start listening on express app
    app.listen(port, () => {
      console.log(`Example app listening on port port`)
    })

})()
