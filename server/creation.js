const mongoose = require('mongoose');
const schema = require("./schema.js")


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
    if(!/[a-z]/g.test(password)||!/[A-Z]/g.test(password)||!/\W/g.test(password)){
        return {error:"Invalid password"}
    }
    console.log("E")

    return {}
}


module.exports = { createUser };