const express=require("express")
const passport=require("passport")
const User_local=require("../models/User-local")

const router=express.Router()

router.get("/google",passport.authenticate('google',{scope:['profile']}))

router.get("/google/callback",passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
    res.redirect('/dashboard')
})



router.post('/local',async(req,res)=>{

    let newUser= {
        username:req.body.username,
        password:req.body.pwd,
    }
    try {
        let user_local= await User_local.findOne({username:req.body.username})
        if(user_local){
            if(user_local.password==newUser.password){
                req.session.loggedin = true;
                req.session.username=req.body.username
                console.log(req.body.username)
                res.redirect("/dashboard")
            }
            else{
                console.log("Password does'nt match")
            }
        }
        else{
            user_local=await User_local.create(newUser)
            res.send(req.body.username)
        }
        
    } catch (err) {
        console.log(err)
   }

   

})
router.get("/logout",(req,res)=>{
    req.logout()
    res.redirect("/")
})
module.exports=router 