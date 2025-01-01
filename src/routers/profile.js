const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../MIDDLEWARE/auth");  // Make sure this path is correct
const { validate } = require("../models/User");
const { validateEditProfileData} = require("../utilies/valdation");
//const User = require("../models/user");  // Ensure this path is correct

// User profile view API
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;  // The user is added to the request by the userAuth middleware
    res.send(user);  // Send the user data in the response
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
});
 //  Profile Edit Api
 profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData){
            throw new Error("Invalid edit Request!")
        }
        const loggedInUser=req.user;
        console.log("The Logged user is : " + loggedInUser);

       // Upadte the pre data to recived data after vaildate edit profile
        Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key])
        console.log("The updated user is : " + loggedInUser);
        // Save the updated user to the database
          await loggedInUser.save()

        res.json({
            message:'${loggedInUser.name} your profile update sucessfully!',
            data:loggedInUser,
        })
    }
   catch(err){
    res.status(404).send("Error: " + err.message);
    }
});

module.exports = profileRouter;
