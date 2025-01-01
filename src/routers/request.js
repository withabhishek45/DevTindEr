const express=require("express");
const userAuth = require("../MIDDLEWARE/auth");
const ConnectionRequest=require("../models/connectionRequest")
const requestRouter =express.Router();

// requestRouter.post("/request/sent/:status/:toUserID",userAuth,async(req, res) => {
//     try{
//         const fromUserId=req.user._id;
//         const toUserId=req.params.toUserID;
//         const status=req.params.status;

//         // New instance of conn req model
//         const newConnectionRequest = new ConnectionRequest({
//             fromUser:fromUserId,
//             toUser:toUserId,
//             status:status
//             });
//         // save the data in db
//         const data= await ConnectionRequest.save();

//         res.status(201).json({message:"Connection Request Sent successfully",data});


//     }catch(err){
//         res.status(400).send(err.msg)
//     }


    
//  });

requestRouter.post("/request/sent/:status/:toUserID", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id; // Logged-in user's ID
        const toUserId = req.params.toUserID; // Recipient's User ID
        const status = req.params.status; // Status of the request (e.g., pending, accepted)

        // API using for only ignoed and interested then
        const allowedStatus=["interested","ignored"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status"})
            }
        

        // Create a new instance of the ConnectionRequest model
        const newConnectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        // Save the new connection request to the database
        const data = await newConnectionRequest.save();

        // Respond with success message and saved data
        res.status(201).json({
            message: "Connection Request Sent successfully",
            data,
        });
    } catch (err) {
        res.status(400).json({
            error: "Error! " + err.message,
        });
    }
});




module.exports=requestRouter;