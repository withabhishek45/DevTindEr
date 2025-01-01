const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided. Authentication is required." });
    }

    console.log('Token:', token); // Log token to check if it's being received properly

    const decodedObj = jwt.verify(token, process.env.JWT_SECRET || "Abjisjk@#123");
    const userId = decodedObj._id; // Extract user ID

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User associated with the token not found." });
    }

    req.user = user; // Attach user to the request
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired. Please log in again." });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }

    res.status(500).json({ success: false, message: "Server error occurred during authentication." });
  }
};


// const userAuth = async (req, res, next) => {
//   try {
//     // Read the token from cookies or headers
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided. Authentication is required.",
//       });
//     }

//     // Verify the token
//     const decodedObj = jwt.verify(token, process.env.JWT_SECRET || "Abjisjk@#123");
//     const userId = decodedObj._id; // Extract the user ID from the payload

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User associated with the token not found.",
//       });
//     }

//     // Attach the user object to the request
//     req.user = user;
//     next();
//   } catch (err) {
//     // Handle specific JWT errors
//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication token has expired. Please log in again.",
//       });
//     }

//     console.error("Authentication error:", {
//       message: err.message,
//       name: err.name,
//       stack: err.stack,
//       token: req.cookies.token,
//     });

//     res.status(401).json({
//       success: false,
//       message: `Authentication failed: ${err.message}`,
//     });
//   }
// };

module.exports = userAuth;

// const jwt = require("jsonwebtoken");
// const User= require("../models/user");

// const userAuth = async (req, res, next) => {
//   try {
//     // Read the token from cookies
//     const { token } = req.cookies;
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Authentication token not found. Please log in." });
//     }

//     // Verify the token
//     const decodedObj = jwt.verify(token, "Abjisjk@#123");
//     const userId = decodedObj._id; // Extract the user ID from the payload

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User associated with the token not found." });
//     }

//     // Attach the user object to the request
//     req.user = user;
//     next();
//   } catch (err) {
//     // Handle different error types explicitly
//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ success: false, message: "Authentication token has expired. Please log in again." });
//     }
    
//     console.error("Authentication error:", err); // Log error details for debugging
//     res.status(401).json({ success: false, message: `Authentication failed: ${err.message}` });
//   }
// };

// module.exports = userAuth;

