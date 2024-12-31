const express=require("express");
const profileRouter=express.Router();

const {userAuth}=require("../MIDDLEWARE/auth")


/// User profile API
profileRouter.get("/profile", userAuth, async (req, res) => {
    try{
        const user=req.user;
        res.send(user);
    }
    catch(err){
     res.status(404).send("Error" +err.message)
    }
   });
  



module.exports=profileRouter;