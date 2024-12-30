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
// app.patch("/user/:id" ,async(req,res)=>{
//    const id=req.params?.id;
//    const data=req.body
 

//    try{
//        // Upadting Certain item , not sensitive item and not insert dummy key-value
//   const UpadteAllowed=[
//    // not email allowed
//    "name","password","role","address","gender", ]
//    const isUpadteAllowed=Object.keys(data).every((k)=>
//       UpadteAllowed.includes(k)
//    );
//    if(!isUpadteAllowed){
//       throw new Error("Invalid fields to update , Update Not Allowed" )

//    }
//       const user=await User.findByIdAndUpdate(id,{data},{returnDocument:"after"});
//          console.log(user)
//          res.send("Data Updated Successfully...")
//          }
//          catch(err){
//             res.status(404).send("something went wrong!" + err.message)
//             }



// })
// Update Data of the user
app.patch("/user/:id", async (req, res) => {
   const id = req.params?.id; // Extracting ID from route parameters
   const data = req.body; // Extracting the data to update from the request body

   try {
       // Allowable fields for update
       const allowedUpdates = ["name", "password", "role", "address", "gender"];
       
       // Check if all keys in data are allowed for update
       const isValidOperation = Object.keys(data).every((key) =>
           allowedUpdates.includes(key)
       );

       if (!isValidOperation) {
           return res.status(400).send({ 
               success: false, 
               message: "Invalid fields to update. Update not allowed." 
           });
       }

       // Find the user by ID and update with valid fields
       const user = await User.findByIdAndUpdate(id, data, {
           new: true, // Return the updated document
           runValidators: true, // Ensure Mongoose validation rules are applied
       });

       if (!user) {
           return res.status(404).send({
               success: false,
               message: "User not found.",
           });
       }

       res.send({
           success: true,
           message: "Data updated successfully.",
           data: user,
       });
   } catch (err) {
       res.status(500).send({ 
           success: false, 
           message: "Something went wrong!", 
           error: err.message 
       });
   }
});



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
      res.status(400).send("User Data Not Saved  "+err.message);
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


