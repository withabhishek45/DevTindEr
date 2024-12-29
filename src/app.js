const express=require('express')

const app=express();

app.get("/getUserData",(req,res,next)=>{
   console.log("get user data");

   throw new console.error("Internal  Error");
   res.send("Data send successfully...")
   


})

app.use("/",(err,req,res,next)=>{
   if(err){
      //log your error
      res.status(400).send("Internal Server Error");
   }
});
app.listen(3000,()=>{
    console.log('server is running on port 3000')
});
