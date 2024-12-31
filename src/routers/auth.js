const express=require("express");
const AuthRouter= express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {validateSingupData}=require("../utilies/valdation")







// Sign up of the users
AuthRouter.post("/signup", async (req, res) => {

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
 AuthRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if email exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("Email not found");
      }
  
      // Validate password
      const isValidPassword = await user.validatePassword(password);
      if (isValidPassword) {
       // Create JWT token
       const token = await user.getJWT();
        // Add the token to the cookie
      res.cookie("token", token, {
       httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
       maxAge: 3600000, // 1 hour in milliseconds
     });
 
     // Send success response
     res.send("Login successful!");
     }
     } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred. Please try again.");
    }
  });
// AuthRouter.post("/login", async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       // Check if email exists
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ success: false, message: "Email not found" });
//       }
  
//       // Validate password using schema method
//       const isValidPassword = await user.validatePassword(password);
//       if (!isValidPassword) {
//         return res.status(401).json({ success: false, message: "Invalid password" });
//       }
  
//       // Generate and send JWT token
//       const token = await user.getJWT();
//       res.cookie("token", token, {
//         httpOnly: true,
//         maxAge: 3600000,
//       });
  
//       res.status(200).json({ success: true, message: "Login successful" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: "An error occurred. Please try again." });
//     }
//   });
  

  //Logout of the users
  AuthRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("Logged out successfully");
    });

module.exports=AuthRouter;