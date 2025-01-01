const { default: mongoose } = require("mongoose");
const Mongoose=require("mongoose");

const connectionRequestSchema= new Mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:'{VALUE} is incorrect status type!' 
            }
        },
    
},{
    timestamps:true,
}
)
const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequest;