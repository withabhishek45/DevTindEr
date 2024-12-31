const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../MIDDLEWARE/auth");  // Make sure this path is correct
//const User = require("../models/user");  // Ensure this path is correct

// User profile API
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;  // The user is added to the request by the userAuth middleware
    res.send(user);  // Send the user data in the response
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
