const express=require('express')

const app=express();


app.use("/user",(req,res,next)=>{
    console.log("Handling the !st route user....");
  // res.send('Response!!!');
   next();
},
    (req,res,next)=>{
        console.log("Handling the 2nd route user....");
      //  res.send(' Second Response!!!');
      next();
    
},
(req,res,next)=>{
    console.log("Handling the 3rd route user....");
   // res.send(' Third Response!!!');
   next();

},
(req,res)=>{
    console.log("Handling the 4th route user....");
    res.send(' Fourth Response!!!');

});
// app.get("/user",(req,res)=>{
//     res.send({fname:"Abhishek",lname:"Kumar"})
// })
// app.post("/user",(req,res)=>{
//     res.send("Succesfully saved to Database....")
// })
// app.delete("/user",(req,res)=>{
//     res.send("Data deleted sucessfully.....")
// })
// app.use("/home",(req,res)=>{
//     res.send('Hello World')
// })

// app.use("/login",(req,res)=>{
//     res.send('Login here')
// })

// app.use("/",(req,res)=>{
//     res.send('Welcome')
// })
app.listen(3000,()=>{
    console.log('server is running on port 3000')
});
