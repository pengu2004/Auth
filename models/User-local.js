const mongoose=require('mongoose')

const User_localSchema= new mongoose.Schema({
    username:String,
    password:String,
})

module.exports=mongoose.model("User_local",User_localSchema)  