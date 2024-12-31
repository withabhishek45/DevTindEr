const jwt = require("jsonwebtoken");
const User= require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication token not found. Please log in." });
    }

    // Verify the token
    const decodedObj = jwt.verify(token, "Abjisjk@#123");
    const userId = decodedObj._id; // Extract the user ID from the payload

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User associated with the token not found." });
    }

    // Attach the user object to the request
    req.user = user;
    next();
  } catch (err) {
    // Handle different error types explicitly
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Authentication token has expired. Please log in again." });
    }
    
    console.error("Authentication error:", err); // Log error details for debugging
    res.status(401).json({ success: false, message: `Authentication failed: ${err.message}` });
  }
};

module.exports = userAuth;
