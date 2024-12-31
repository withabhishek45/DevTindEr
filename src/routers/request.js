const express=require("express");
const requestRouter =express.Router();

requestRouter.post("/sendConnectionRequest", (req, res) => {
    console.log("Request Body:", req.body); // Log the incoming body
    res.send("Request received!");
 });





module.exports=requestRouter;