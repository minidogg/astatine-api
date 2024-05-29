(async()=>{
    //require mongo stuff
    const schema = require("./schema.js")
    const creationStuff = require("./creation.js")
    const mongoose = require('mongoose');
    const path = require("path")
    const { createHash } = require('crypto');

    
    //mongo connect
    var connection = await mongoose.connect('mongodb://127.0.0.1:27017/chat')
    console.log("Connected")

    // let channel = await new schema.Channel({"name":"general",messages:[]}).save()
    // await new schema.Server({"name":"The Warehouse",channels:[channel]}).save()

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
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
            ws.send(JSON.stringify({"success":"Made account succesfuly!",status:200}))
        }else if(data.type=="createSession"){
            let user = await schema.User.find({username:data.username})
            if(!user[0]){
                ws.send(JSON.stringify({"error":"That user doesn't exist!",status:404}))
            }
            user = user[0]
            if(user.password == createHash('sha256').update(data.password).digest('hex')){
                session.token = genRanHex(32)
                session.id = user["_id"]
                session.username = data.username
                sessions[user["_id"]] = session
                ws.send(JSON.stringify({"sessionToken":session.token,status:200}))
            }else{
                ws.send(JSON.stringify({"error":"Incorrect password",status:403}))
                
            }

        }else if(data.type=="joinServer"){
            if(session == {}){
                ws.send(JSON.stringify({"error":"You need to create a session!",status:403}))
            }
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
