const mongoose = require('mongoose');
const schema = require("./schema.js")
const { createHash } = require('crypto');

async function createUser(username,password,email){
    if(await schema.User.find({ username: username })[0]){
        return {error:"Account already exists"}
    }
    if(/[^\w]/g.test(username)){
        return {error:"Invalid username"}
    }
    if(username.length<=3||username.length>25){
        return {error:"Invalid username length"}
    }
    if(password.length<8||password.length>100){
        return {error:"Invalid password length"}
    }
    if(!(/[a-z]/g.test(password)||/[A-Z]/g.test(password)||/\W/g.test(password))){
        return {error:"Invalid password"}
    }


    await new schema.User({username:username,password:createHash('sha256').update(password).digest('hex'),email:(typeof(email)=="undefined"?"none":email)}).save()
    

    return {}
}


module.exports = { createUser };