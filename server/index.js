(async()=>{
    //require mongo stuff
    const schema = require("./schema.js")
    const creationStuff = require("./creation.js")
    const mongoose = require('mongoose');
    const path = require("path")
    

    //mongo connect
    var connection = await mongoose.connect('mongodb://127.0.0.1:27017/chat')
    console.log("Connected")


    //websockets
    var {WebSocketServer} = require("ws")

    const wss = new WebSocketServer({ port: 8080 });
    
    var sessions = {}
    wss.on('connection', function connection(ws) {
      var session = {}
      ws.on('error', console.error);
    
      ws.on('message', async function message(dataa) {
        try{
        var data = JSON.parse(dataa)
        
        if(data.type=="createUser"){
            let acc = await creationStuff.createUser(data.username,data.password,data.email)

            if(acc.hasOwnProperty("error")){
                ws.send(JSON.stringify({"error":acc.error,"status":409}))
                return
            }
            ws.send(JSON.stringify({"success":"Made account succesfuly!"}))
        }else{
            ws.send(JSON.stringify({"error":"Invalid message type","status":404}))
        }

    }catch(err){
        console.warn(err)
        ws.send(JSON.stringify({"error":"Something went wrong on the server side.","status":500}))
    }
      });
    

    });

})()
