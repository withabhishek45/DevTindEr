const express=require('express')

const app=express();
app.use("/",(err,req,res,next)=>{
   if(err){
      //log your error
      res.status(400).send("Internal Server Error");
   }
});

app.get("/getUserData",(req,res,next)=>{
   try{
      
   throw new Error("Internal  Error");
   res.send("Data send successfully...")

   }
   catch(err){
res.status(500).send("Something Went Wrong...  Contact Support Team ")

   }

   
})


app.listen(3000,()=>{
    console.log('server is running on port 3000')
});
