const express=require("express")
const router=express.Router()
const {ensureAuth,ensureGuest}=require('../middleware/auth')
const Crush=require("../models/Crush")
router.get("/",ensureGuest,(req,res)=>{
    res.render("login",{layout:"login"})
})

router.get("/dashboard",ensureAuth,(req,res)=>
{
    console.log(req.user)
    res.render("dashboard",{name:req.user.firstName})
})
router.post("/dashboard", async (req,res)=>

{
    
    var CurrentDate=Date.now
    console.log(CurrentDate)




    let newCrush= {
        crushName:req.body.crush,
        userName:req.user.firstName,
    }
    try {
        let crush= await Crush.findOne({userName:req.user.firstName})
        if(crush){
            res.send(" can't register again")
        }
        else{
            crush=await Crush.create(newCrush)
            res.send("Okay")
        }
        
    } catch (err) {
        console.log(err)
   } })
     
    router.post('/logout', function(req, res, next){
        req.logout(function(err) {
          if (err) { return next(err)}
          res.redirect('/')
        })
      })



    

module.exports=router