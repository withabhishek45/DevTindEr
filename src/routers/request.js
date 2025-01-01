const express = require("express");
const userAuth = require("../MIDDLEWARE/auth");
const ConnectionRequest = require("../models/connectionRequest");
const mongoose = require("mongoose");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/sent/:status/:toUserID", userAuth, async (req, res) => {
    try {
        console.log("Received request with params:", req.params);
        console.log("Logged-in user ID:", req.user._id);
        
        const fromUserId = req.user._id; // Logged-in user's ID
        const toUserId = req.params.toUserID; // Recipient's User ID
        const status = req.params.status; // Status of the request (e.g., interested, ignored)

        // Validate the status (make sure it's a valid status)
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status provided. Allowed values: interested, ignored." });
        }

        // Check if toUserId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(toUserId)) {
            return res.status(400).json({ message: "Invalid User ID." });
        }

        // Check if the toUser exists in DB or not
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // Ensure the user is not sending a request to themselves
        if (fromUserId.toString() === toUserId.toString()) {
            return res.status(400).json({ message: "You cannot send a connection request to yourself." });
        }

        // Check for existing connection requests (for mutual requests or already existing one)
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        if (existingRequest) {
            return res.status(409).json({
                message: "A connection request already exists between these users.",
                existingRequest,
            });
        }

        // Create a new connection request
        const newConnectionRequest = new ConnectionRequest({
            fromUserId: fromUserId,
            toUserId: toUserId,
            status,
        });

        // Save the connection request to the database
        const data = await newConnectionRequest.save();

        // Respond with success message and saved data
        res.status(201).json({
            message: `${req.user.name} has successfully sent a connection request to ${toUser.name}.`,
            data,
        });
    } catch (err) {
        console.error("Error while creating connection request:", err);
        res.status(500).json({
            success: false,
            message: "An unexpected error occurred. Please try again later.",
            error: err.message, // Display the error message for better debugging
        });
    }
});

module.exports = requestRouter;
