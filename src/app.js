const express=require('express')
const connectDB=require("./config/database")
const User=require("./models/user")
const {validateSingupData}=require("./utilies/valdation")
const bcrypt=require("bcrypt");


const app=express();
app.use(express.json())

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




// Sign up of the users

// app.post("/signup",async(req,res)=>{


//    console.log(req.body)
  
//    //  creating new user model
//    const user=new User(req.body)
//    // const user=new USer({
//    //    name:"Abhishek kr",
//    //    email:"abhishek123@gmail.com",
//    //    password:"123456789",
//    //    phone:"015157",
//    //    address:"RAnchi jh",
//    //    role:"Student"
//    // });
//    try{  
//        await user.save()
//   .then((user) => console.log("User created:", user))
//   .catch((err) => {
//     if (err.code === 11000) {
//       console.log("Duplicate key error. User already exists.");
//     } else {
//       console.log("Error:", err.message);
//     }
//   });
//    res.send("User created successfully");
//    }catch(err){
//       res.status(400).send("User Data Not Saved  "+err.message);
//       }
// })

// app.post("/signup", async (req, res) => {

//    // SignUp  vaildations

//    const  vaildData=validateSingupData(req);
//    if(!vaildData) return res.status(400).send("Invalid Data");
  

//    console.log(req.body);
 
//    // Extract email and name from request body
//    const { email, name } = req.body;
 
//    try {
       

//      // Check if the email already exists in the database
//      const existingUserByEmail = await User.findOne({ email });
//      if (existingUserByEmail) {
//        return res.status(400).send("Email already in use.");
//      }
 
//      // Check if the name already exists in the database
//      const existingUserByName = await User.findOne({ name });
//      if (existingUserByName) {
//        return res.status(400).send("Name already in use.");
//      }
 
//      // Create a new user instance if no duplicates found
//      const user = new User(req.body);
 
//      // Save the new user to the database
//      await user.save();
 
//      // Send success response after saving
//      res.send("User created successfully.");
//    } catch (err) {
//      // Catch any errors that occur during the save process
//      res.status(400).send("User data not saved: " + err.message);
//    }
//  });
 
app.post("/signup", async (req, res) => {

   // SignUp validations
   const validData = validateSingupData(req);
   if (validData) {
     return res.status(400).send(validData.error); // Send the actual error message from validation
   }

   // Encrypt the password
   const{phone,password,address,role,gender}=req.body
   const pwdHash= await bcrypt.hash(password,10)// 10X no of round encryption 
   console.log(pwdHash)
   // console.log(req.body);
 
   // Extract email and name from request body
   const { email, name } = req.body;
 
   try {
     // Check if the email already exists in the database
     const existingUserByEmail = await User.findOne({ email });
     if (existingUserByEmail) {
       return res.status(400).send("Email already in use.");
     }
 
     // Check if the name already exists in the database
     const existingUserByName = await User.findOne({ name });
     if (existingUserByName) {
       return res.status(400).send("Name already in use.");
     }
 
     // Create a new user instance if no duplicates found
     const user = new User({
      email,name,phone,password:pwdHash,address,role,gender
     });
 
     // Save the new user to the database
     await user.save();
 
     // Send success response after saving
     res.send("User created successfully.");
   } catch (err) {
     // Catch any errors that occur during the save process
     res.status(400).send("User data not saved: " + err.message);
   }
 });
 
 
 // Login  and validate emil pwd
 app.post("/login", async (req, res) => {
   // Login validations
   try{
      const {email,password}=req.body
      // check email
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).send("Email not found");
         }
         // check password
    const isPwdValid=await bcrypt.compare(password,user.password)
    if(!isPwdValid){
      return res.status(400).send("Invalid password");
      }
      // Send success response after validation
      res.send("Login successful !!!");

   }catch(err){
      res.status(400).send("Invalid email or password");
   }
 });
   

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


