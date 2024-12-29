const express=require('express')

const app=express();

const {adminAuth, userAuth}=require("./MIDDLEWARE/auth")

app.use("/admin", adminAuth);

app.get("/user",userAuth,(res,req)=>{
   res.send("User Data send....");
});


 
//

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
