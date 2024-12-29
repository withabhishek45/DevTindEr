const express=require('express')
const connectDB=require("./config/database")
const User=require("./models/user")
const app=express();
app.use(express.json(   ))

//Getting a user by Role
app.get("/user",async (req,res)=>{
   const role=req.body.role;
   try{
      const user=await User.find({role:role});
      res.send(user)

   }
   catch(err){
      res.status(404).send("something went wrong!" + err.message)
   }

})

// find by id and Delte the user 
app.delete("/user",async (req,res)=>{
   const id=req.body.id;
   try{
      const user=await User.findByIdAndDelete(id);
      //res.send(user)
      res.send("User deleted succesfully.." )
      }
      catch(err){
         res.status(404).send("something went wrong!" + err.message)
         }
      }
)
// Update Data of the user
app.patch("/user" ,async(req,res)=>{
   const id=req.body.id;
   const role=req.body.role;
   const email=req.body.email;
  const name=req.body.name;
   try{
      const user=await User.findByIdAndUpdate(id,{name,role,email},{returnDocument:"after"});
         console.log(user)
         res.send("Data Updated Successfully...")
         }
         catch(err){
            res.status(404).send("something went wrong!" + err.message)
            }



})


// Fetch Api  - all the user

app.get("/feed",async(req,res)=>{

   try{
      const user=await User.find({});
      res.send(user)
   }
   catch(err){
      res.status(404).send("something went wrong!" + err.message)
      }
})






app.post("/signup",async(req,res)=>{


   console.log(req.body)
  
   //  creating new user model
   const user=new User(req.body)
   // const user=new USer({
   //    name:"Abhishek kr",
   //    email:"abhishek123@gmail.com",
   //    password:"123456789",
   //    phone:"015157",
   //    address:"RAnchi jh",
   //    role:"Student"
   // });
   try{  
       await user.save();
   res.send("User created successfully");
   }catch(err){
      res.status(400).send("User Data Not Saved"+err.message);
      }
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
    

        //


