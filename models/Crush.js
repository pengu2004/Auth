const mongoose=require('mongoose')

const CrushSchema= new mongoose.Schema({
    crushName:String,
    userName:String,
})

module.exports=mongoose.model("Crush",CrushSchema)  