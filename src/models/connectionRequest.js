const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is an incorrect status type!",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware for validation
connectionRequestSchema.pre("save", async function (next) {
  const connectionRequest = this;

  // Check if the fromUserId == toUserId (user cannot send a request to themselves)
  if (connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()) {
    // Stop the save operation and send error
    return next(new Error("You can't send a connection request to yourself"));
  }

  try {
    // Check if the user has already sent a connection request to the other user
    const existingConnectionRequest = await mongoose
      .model("ConnectionRequest")
      .findOne({
        $or: [
          { fromUserId: connectionRequest.fromUserId, toUserId: connectionRequest.toUserId },
          { fromUserId: connectionRequest.toUserId, toUserId: connectionRequest.fromUserId },
        ],
      });

    if (existingConnectionRequest) {
      // Stop the save operation and send error
      return next(new Error("A connection request already exists between these users"));
    }

    // If no errors, proceed with the save operation
    next(); // Proceed to save the new connection request

  } catch (err) {
    // Handle any errors during the database query and pass to the next error handler
    return next(err); // Pass the error to the next middleware or error handler
  }
});

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequest;
