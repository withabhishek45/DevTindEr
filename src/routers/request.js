const express = require("express");
const userAuth = require("../MIDDLEWARE/auth");
const ConnectionRequest = require("../models/connectionRequest");
const mongoose = require("mongoose");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/sent/:status/:toUserID", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id; // Logged-in user's ID
        const toUserId = req.params.toUserID; // Recipient's User ID
        const status = req.params.status; // Status of the request (e.g., interested, ignored)

        // Validate the status
        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status provided. Allowed values: interested, ignored." });
        }

        // Fixing the issue if toUser === fromUser
        if (fromUserId == toUserId) {
            return res.status(400).json({ message: "You cannot send a request to yourself." });
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

        // Check for existing connection requests (for mutual requests or already existing one)
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        if (existingRequest) {
            return res.status(409).json({
                message: "Connection request already exists.",
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
            message: "Connection Request Sent successfully.",
            data,
        });
    } catch (err) {
        console.error("Error while creating connection request:", err);
        res.status(500).json({
            error: "An unexpected error occurred. Please try again later.",
        });
    }
});

module.exports = requestRouter;
