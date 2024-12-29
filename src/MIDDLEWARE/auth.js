// const express=require("express")

// const app=express()

const adminAuth=(res,req,next)=>{
    console.log("Admin Auth is getting checked!")
    const token="xyz"
    const isCorrect = token === "xyz"
    if(!isCorrect){
        res.status(401).send("Unauthorised Request..")
    }
    else{
        next();
        }
}

const userAuth=(res,req,next)=>{
    console.log("User Auth is getting checked!")
    const token="xyz"
    const isCorrect = token === "xyz"
    if(!isCorrect){
        res.status(401).send("Unauthorised Request..")
    }
    else{
        
        }
}
module.exports={
    adminAuth,userAuth
    

}
//  app.listen(3000,()=>{
//     console.log('server is running on port 3000')
// });
