const express=require("express")
const router=express.Router()
const {ensureAuth,ensureGuest}=require('../middleware/auth')
const Crush=require("../models/Crush")
router.get("/",ensureGuest,(req,res)=>{
    res.render("login",{layout:"login"})
})

router.get("/dashboard",ensureAuth,(req,res)=>
{
    console.log(req.session.loggedin)
    if(req.session.loggedin!=true){
    res.render("dashboard",{name:req.user.firstName})}
    else{
        res.render("dashboard",{name:req.session.username})}
    }
)
router.post("/dashboard",ensureAuth, async (req,res)=>

{
    
    
    if(req.session.loggedin!=true){
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
   }
}
    else{
        let newCrush= {
            crushName:req.body.crush,
            userName:req.session.username,
        }
        try {
            let crush= await Crush.findOne({userName:req.session.username})
            if(crush){
                res.send(" can't register again")
            }
            else{
                crush=await Crush.create(newCrush)
                res.send("Okay")
            }
            
        } catch (err) {
            console.log(err)
       }
    }

     })
     
    router.post('/logout', function(req, res, next){
        req.logout(function(err) {
          if (err) { return next(err)}
          res.redirect('/')
        })
      })



    

module.exports=router