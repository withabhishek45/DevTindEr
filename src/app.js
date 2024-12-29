const express=require('express')
const connectDB=require("./config/database")
const USer=require("./models/user")
const app=express();

app.post("/signup",async(req,res)=>{
  
   //  creating new user model
   const user=new USer({
      name:"Abhishek kr",
      email:"abhishek123@gmail.com",
      password:"123456789",
      phone:"015157",
      address:"RAnchi jh",
      role:"Student"
   });
   await user.save();
   res.send("User created successfully");
})
   

connectDB()
.then(()=>{
    console.log("MongoDB DataBase  connected Successfuly ");
    app.listen(3000,()=>{
      console.log('server is running on port 3000')
  });
    }).catch(err=>{
        console.log("Database not connected");
        });
    


