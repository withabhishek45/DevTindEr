const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
   try{
     // Read the tokens from the req cokkies
     const {token}=req.cookies;
     if(!token){
        throw new Error("token not found.")
     }
     const decodedObj= await jwt.verify(token,"Abjisjk@#123")
     const {id}=decodedObj
     const user=await User.findById(id);
     if(!user){
         throw new Error("User not found.")
     }
     else{
        req.user=user;
         next();
     }
   }
   catch(err){
    res.status(404).send("Error! "+ err.message )
    
   }






    //Validate the token


    //Find the user

}

module.exports={
    userAuth
    

}
